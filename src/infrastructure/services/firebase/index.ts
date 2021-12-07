import { initializeApp } from "@firebase/app";

import { firebaseConfig } from "../../../firebase_config";
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore/lite';


export default {

    getAllExpenses: async ()=> {
        console.log('response')

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const expanseCol = collection(db, 'expenses');

        const response = await getDocs(expanseCol);
        console.log(response)

        return response;
    },

    removeExpense: async (uid:string)=>{

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);


        const response = await deleteDoc(doc(db, 'expenses', uid),);
        console.log(response)

    },

    addExpense: async (name: string, amount: number, date: string)=>{

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);


        const docRef = await addDoc(collection(db, 'expenses',),{
            name: name,
            price: amount,
            date: date
        });

        return docRef.id;

    }

}