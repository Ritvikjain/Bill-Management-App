import { UPDATE_ADD_EDIT_BILL_DATA, UPDATE_ADD_EDIT_BILL_VISIBLE_MODAL } from "../types/ModalTypes"

export const updateAddEditBillModalVisible = (visible) => {
    return {
        type: UPDATE_ADD_EDIT_BILL_VISIBLE_MODAL,
        payload: visible
    }
}

export const updateAddEditBillData = (bill) => {
    return {
        type: UPDATE_ADD_EDIT_BILL_DATA,
        payload: bill
    }
}