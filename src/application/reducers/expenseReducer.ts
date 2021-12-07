import { ExpenseActionType } from "../action-types/expense-type";
import { ExpenseAction } from "../actions/expense-action";
import { ExpensePayload } from "../interfaces/expense-interface";

const initialState: ExpensePayload[] = [];

const reducer = (state: ExpensePayload[] = initialState, action: ExpenseAction): {}[] => {

    switch (action.type) {
        case ExpenseActionType.ADD:
            return [...state, action.payload];
        case ExpenseActionType.REMOVE:
            state.forEach((item, index) => {
                if (item == action.payload) state.splice(index, 1);
            })
            return [...state];
        case ExpenseActionType.INITIAL:
            
            return [...action.payload];
        default:
            return state;
    }

}

export default reducer;