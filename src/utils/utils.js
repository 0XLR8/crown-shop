export const formatError = (er) => {
    if(er.includes('weak-password')){
        return 'Password should be at least 6 characters.';
    }
    if(er.includes('email-already-in-use')){
        return 'Email is already used.';
    }
    if(er.includes('user-not-found')){
        return 'Email was not found.';
    }
    if(er.includes('wrong-password')){
        return 'Password provided is wrong.';
    }
    
    return 'Error occured, please try again later.';
}

export const completeCheckout = () => new Promise((res, rej) => {
    setTimeout(() => {
        res('Complete checkout');
    }, 2000)
})

export const convertDate = (date) => {
    return date.toDate().toDateString();
}