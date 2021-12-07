import { ExpenseActionType } from "../action-types/expense-type";
import { ExpensePayload } from "../interfaces/expense-interface";


interface AddAction {
    type: ExpenseActionType.ADD,
    payload: {
        name: string,
        date: string,
        amount: number,
        uid: string,
    },
}
interface RemoveAction {
    type: ExpenseActionType.REMOVE,
    payload: {
        name: string,
        date: string,
        amount: number,
        uid: string,

    },
}

interface InitialAction {
    type: ExpenseActionType.INITIAL,
    payload: ExpensePayload[]
}


export type ExpenseAction = AddAction | RemoveAction | InitialAction;