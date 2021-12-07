import { Dispatch } from "redux";
import { ExpenseAction } from "../actions/expense-action";
import { ExpenseActionType } from "../action-types/expense-type";

import database from "../../infrastructure/services/firebase/index"
import { ExpensePayload } from "../interfaces/expense-interface";

export const addExpense = (name: string, price: number, date: string) => {
    return async (dispatch: Dispatch<ExpenseAction>) => {
        let docId = await database.addExpense(name,price,date);
        
        let object:ExpensePayload = {name:name,amount:price,date:date,uid:docId}

        dispatch({
            type: ExpenseActionType.ADD,
            payload: object,
        })
    }
}

export const removeExpense = (object: ExpensePayload) => {
    return (dispatch: Dispatch<ExpenseAction>) => {
        database.removeExpense(object.uid);
        dispatch({
            type: ExpenseActionType.REMOVE,
            payload: object
        })
    }
}

export const getInitialData = () => {
    return async (dispatch: Dispatch<ExpenseAction>) => {
        console.log('el')

        let data = await database.getAllExpenses();
        console.log(data);
        let itemList: ExpensePayload[] = [];

        data.docs.map(doc => {

            console.log(doc.id)
            itemList.push({ name: doc.data()['name'], amount: doc.data()['price'], date: doc.data()['date'], uid: doc.id });
        })



        dispatch({
            type: ExpenseActionType.INITIAL,
            payload: itemList
        })
    }
}