import { useState, useEffect, createContext } from "react";
import { authObserver, getUser } from "../firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
	const [authPending, setAuthPending] = useState(true);

	useEffect(() => {
		authObserver(async (user) => {
			if(user){
				const currentUser = await getUser(user.uid);
				setAuth(currentUser);
			} else {
				setAuth(null);
			}
			setAuthPending(false)
		})
	}, [])

    return(
        <AuthContext.Provider value={{
            auth,
            authPending
        }}>
            {children}
        </AuthContext.Provider>
    )
}