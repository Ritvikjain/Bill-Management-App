import { updateBills } from "../redux/actions/BillDataActions"
import { updateAddEditBillModalVisible } from "../redux/actions/ModalActions";
import store from "../redux/store"

export const updateBillData = (bills) => {
    store.dispatch(updateBills(bills));
}

export const addNewBill = (bill) => {
    let bills = store.getState().billsData.bills
    let maxId = 0
    bills.forEach(bill => {
        if(bill.id > maxId) {
            maxId = bill.id
        }
    });
    bill.id = maxId+1;
    let tempList = []
    bills.forEach(bill=>tempList.push(bill))
    tempList.push(bill);
    store.dispatch(updateBills(tempList));
}

export const deleteBill = (billObj) => {
    let bills = store.getState().billsData.bills;
    let tempList = bills.filter(bill => bill.id!=billObj.id);
    store.dispatch(updateBills(tempList));
}

export const updateBill = (billObj) => {
    let bills = store.getState().billsData.bills;
    let tempList = []
    bills.forEach(bill=>{
        if(bill.id != billObj.id)
            tempList.push(bill)
    })
    tempList.push(billObj);
    console.log(billObj)
    store.dispatch(updateBills(tempList));
}