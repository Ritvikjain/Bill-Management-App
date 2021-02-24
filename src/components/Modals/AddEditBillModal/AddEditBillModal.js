import { Button, Input, Select } from 'antd'
import { Option } from 'antd/lib/mentions';
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewBill, updateBill } from '../../../functions/BillFunctions';
import { updateAddEditBillData, updateAddEditBillModalVisible } from '../../../redux/actions/ModalActions';

export default function AddEditBillModal(props) {

    const visible = useSelector(state => state.modals.addEditBillModalVisible);
    const categories = useSelector(state => state.billsData.categories);
    const [billDescription, setBillDescription] = useState(null);
    const [billAmount, setBillAmount] = useState(null);
    const [billDate,setBillDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        let selectedBill = props.selectedEditBill
        if(selectedBill != null) {
            setBillDescription(selectedBill.description)
            setBillAmount(selectedBill.amount)
            setSelectedCategory(selectedBill.category)
            let date = selectedBill.date
            setBillDate(date.split('-')[2]+"-"+date.split('-')[0]+"-"+date.split('-')[1])
        }
    },[props.selectedEditBill])

    const resetState = () => {
        setBillDate(null)
        setBillDescription(null)
        setBillAmount(null)
        setSelectedCategory(null)
    }

    const handleOk = () => {
        if(billDescription == null || selectedCategory == null || billAmount == null || billDate == null){
            setErrorMessage("Please fill all manadatory fields.")
            return;
        }
        setErrorMessage(null);
        let bill = {
            description: billDescription,
            category: selectedCategory,
            amount: billAmount,
            date: billDate.split('-')[1]+"-"+billDate.split('-')[2]+"-"+billDate.split('-')[0]
        }
        if(props.selectedEditBill == null) {
            addNewBill(bill);
        } else {
            bill.id = props.selectedEditBill.id
            updateBill(bill)
        }
        props.setSelectedEditBill(null);
        dispatch(updateAddEditBillModalVisible(false));
        resetState();
    }
    const handleCancel = () => {
        props.setSelectedEditBill(null)
        dispatch(updateAddEditBillModalVisible(false));
        resetState();
    }
    const handleInputChange = (event,type) => {
        if(type === 'description'){
            setBillDescription(event.target.value);
        } else if(type === 'amount') {
            setBillAmount(event.target.value);
        } else if(type === 'date') {
            setBillDate(event.target.value);
            console.log(event.target.value)
        }
    }
    const handleCategoryChange = (value) => {
        setSelectedCategory(value)
    }

    const categoriesOption = categories.map(category => {
        return <Option value={category}>{category}</Option>
    })

    return (
        <Modal
            visible={visible}
            title={props.selectedEditBill == null ? "Add New Bill" : "Edit Bill"}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
            <Button key="back" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
            Submit
            </Button>,
            ]}
        >
            {errorMessage!=null && errorMessage!="" && <div className="text-end error-text" style={{width:'100%'}}>
                <p className="m-0 p-0">* {errorMessage}</p>
            </div>}
            <div className="my-2" style={{width:'100%'}}>
                <p className="m-0 p-0">Bill Description *</p>
                <Input onChange={(e)=>handleInputChange(e,'description')} shape='round' value={billDescription}/>
            </div>
            <div className="my-2" style={{width:'100%'}}>
                <p className="m-0 p-0">Bill Category *</p>
                <Select value={selectedCategory} style={{width:'100%'}} onChange={handleCategoryChange}>
                    {categoriesOption}
                </Select>
            </div>
            <div className="my-2" style={{width:'100%'}}>
                <p className="m-0 p-0">Bill Amount *</p>
                <Input type='number' onChange={(e)=>handleInputChange(e,'amount')} shape='round' value={billAmount}/>
            </div>
            <div className="my-2" style={{width:'100%'}}>
                <p className="m-0 p-0">Bill Date *</p>
                <Input type='date' onChange={(e)=>handleInputChange(e,'date')} shape='round' value={billDate}/>
            </div>
        </Modal>
    )
}
