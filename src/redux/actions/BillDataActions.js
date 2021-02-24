import { UPDATE_BILL_DATA, UPDATE_CATEGORIES } from "../types/BillDataTypes"

export const updateBills = (bills) => {
    return {
        type: UPDATE_BILL_DATA,
        payload: bills
    }
}

export const updateCategories = (categories) => {
    return {
        type: UPDATE_CATEGORIES,
        payload: categories
    }
}