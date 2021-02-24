import { UPDATE_BILL_DATA, UPDATE_CATEGORIES } from "../types/BillDataTypes";


const initialState = {
    bills: [],
    categories: ['Food & Dining','Utility','Shopping','Education','Personal Care','Travel']
}
const BillDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_BILL_DATA: return {
          ...state,
          bills: action.payload
      }
      case UPDATE_CATEGORIES: return {
        ...state,
        categories: action.payload
      }
      default: return state
    }
  }
  
  export default BillDataReducer;