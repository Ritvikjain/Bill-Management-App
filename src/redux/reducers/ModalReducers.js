import { UPDATE_ADD_EDIT_BILL_DATA, UPDATE_ADD_EDIT_BILL_VISIBLE_MODAL } from "../types/ModalTypes"



const initialState = {
    addEditBillModalVisible: false,
    addEditBillData: null
}
const ModalReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ADD_EDIT_BILL_VISIBLE_MODAL: return {
          ...state,
          addEditBillModalVisible: action.payload
      }
      case UPDATE_ADD_EDIT_BILL_DATA: return {
        ...state,
        addEditBillData: action.payload
    }
      default: return state
    }
  }
  
  export default ModalReducer;