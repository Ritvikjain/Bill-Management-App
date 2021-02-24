import Modal from 'antd/lib/modal/Modal';
import { combineReducers } from 'redux';
import BillDataReducer from './reducers/BillDataReducer';
import ModalReducer from './reducers/ModalReducers';

const rootReducer = combineReducers({
    billsData: BillDataReducer,
    modals: ModalReducer
})

export default rootReducer;