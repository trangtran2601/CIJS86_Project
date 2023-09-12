import { createContext, useContext } from 'react';
import {db, auth }from '../services/firebase';
import { collection } from 'firebase/firestore'
import { GoogleAuthProvider } from "firebase/auth";



const FirebaseContext = createContext();
export const useFirebase = () => {
   return useContext(FirebaseContext)
}



const FirebaseProvider = ({children}) => {
    const GoogleProvider = new GoogleAuthProvider();
    const productCollection = collection(db, "products")
    const orderCollection = collection(db, "orders")
    const userCollection = collection(db, "users")
    const contextvalue = {
        GoogleProvider,
        productCollection,
        orderCollection,
        userCollection
    }
    return (
        <FirebaseContext.Provider value={contextvalue}>
                {children}
        </FirebaseContext.Provider>
    )
}


export default FirebaseProvider