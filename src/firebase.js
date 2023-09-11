import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVDApeYyy-TAJr8zwf2dWm4gb4hd1NuDc",
  authDomain: "crown-clothing-d71d1.firebaseapp.com",
  projectId: "crown-clothing-d71d1",
  storageBucket: "crown-clothing-d71d1.appspot.com",
  messagingSenderId: "895025154473",
  appId: "1:895025154473:web:65d1cc02b4e5c86ee59cb8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const signInUser = async (email, password) => await signInWithEmailAndPassword(auth, email, password);
export const signUserOut = () => signOut(auth);
export const signUpUserWithEmailAndPassword = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);

export const addUser = async (userId, {email, displayName}) => await setDoc(doc(db, 'users', userId), {
	email,
	displayName,
	createdAt: new Date()
})
export const getUser = async (userId) => {
	const docRef = doc(db, 'users', userId);
	const docSnap = await getDoc(docRef);

	if(docSnap.exists()){
		const {email, displayName} = docSnap.data();
		return {
			id: userId,
			email,
			displayName
		}
	}else{
		console.log('no user found');
	}
}

export const authObserver = (callback) => onAuthStateChanged(auth, callback)

export const getCategories = async () => {
	const categoriesSnapshot = await getDocs(collection(db, 'categories'));
	const categories = categoriesSnapshot.docs.map(doc => {
		return {
			...doc.data(),
			id: doc.id
		}
	});
	return categories;
}

export const resetPassword = async (email) => await sendPasswordResetEmail(auth, email);

export const addOrder = async (userId, orderItems) => {
	const categories = await getCategories();

	await addDoc(collection(db, 'orders'), {
		userId,
		createdAt: new Date(),
		orderItems
	})

	await Promise.all(orderItems.map(async orderItem => {
		const categRef = doc(db, 'categories', orderItem.categoryId);
		const newCategoryItems = categories.map(category => {
			if(category.id === orderItem.categoryId){
				const newItems = category.items.map(categoryItem => {
					if(categoryItem.id === orderItem.id){
						categoryItem.stock = categoryItem.stock - orderItem.count;
					}
					return categoryItem;
				})

				category.items = newItems;
			}
			return category;
		}).find(value => value.id === orderItem.categoryId).items
		
		await updateDoc(categRef, {
			items: newCategoryItems
		});
	}))
}

export const getOrders = async (uid) => {
	const querySnapshot = await getDocs(collection(db, "orders"));

	let orderArray = []
	
	querySnapshot.forEach((doc) => {
	  	if(uid === doc.data().userId){
			orderArray.push({
				orderId: doc.id,
				createdAt: doc.data().createdAt,
				orderItems: doc.data().orderItems
			})
		}
	});

	return orderArray;
}