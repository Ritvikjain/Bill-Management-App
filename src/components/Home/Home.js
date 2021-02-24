import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    EditOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import './Home.css'
import { Option } from 'antd/lib/mentions';
import AddEditBillModal from '../Modals/AddEditBillModal/AddEditBillModal';
import { updateAddEditBillData, updateAddEditBillModalVisible } from '../../redux/actions/ModalActions';
import { deleteBill } from '../../functions/BillFunctions';

export default function Home() {
    const bills = useSelector(state => state.billsData.bills);
    const [billsList,setBillsList]  = useState([]);
    const [selectedEditBill, setSelectedEditBill] = useState(null);
    const categories = useSelector(state => state.billsData.categories);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [totalBillAmount, setTotalBillAmount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setBillsList(bills)
        let amount = 0;
        bills.forEach(bill => {
            amount = amount + parseInt(bill.amount);
        })
        setTotalBillAmount(amount);
    }, [bills])

    if(selectedCategory == 'all' && billsList.length != bills.length) {
        setBillsList(bills)
    }
    const handleBillEdit = (bill) => {
        setSelectedEditBill(bill)
        dispatch(updateAddEditBillModalVisible(true))
    }

    const billRows = billsList.map((bill)=>{
        return (
            <tr>
                <th scope="row">{bill.id}</th>
                <td>{bill.description}</td>
                <td>{bill.category}</td>
                <td>{bill.amount}</td>
                <td>{bill.date}</td>
                <td>
                    <EditOutlined className="mx-2 table-icons" onClick={()=>handleBillEdit(bill)}/>
                    <DeleteOutlined className="mx-2 table-icons" onClick={()=>deleteBill(bill)}/>
                </td>
            </tr>
        )
    })

    const handleCategoryChange = (value) => {
        setSelectedCategory(value)
        if(value == 'all') {
            setBillsList(bills);
            let amount = 0;
            bills.forEach(bill => {
                amount = amount + parseInt(bill.amount);
            })
            setTotalBillAmount(amount);
        } else {
            const selectedBills = bills.filter(bills => bills.category === value)
            let amount = 0;
            selectedBills.forEach(bill => {
                amount = amount + parseInt(bill.amount);
            })
            setTotalBillAmount(amount);
            setBillsList(selectedBills)
        }
    }

    const categoriesOption = categories.map(category => {
        return <Option value={category}>{category}</Option>
    })

    return (
        <div className="p-1">
            <div className="d-flex justify-content-center my-3">
                <h3>Bills Dashboard</h3>
            </div>
            <div className="d-flex justify-content-end my-3 px-5 mx-5">
                <p className="mx-2 mt-2" style={{fontSize: '16px'}}>Select Category :</p>
                <Select className="mr-5" defaultValue="all" size='large' style={{width:'120px'}} onChange={handleCategoryChange}>
                    <Option value="all">All</Option>
                    {categoriesOption}
                </Select>
                <Button className="mx-3" shape="round" size='large' onClick={()=>dispatch(updateAddEditBillModalVisible(true))}>Add New Bill</Button>
            </div>
            <div className="d-flex justify-content-center mx-5">
                <p className="m-0">Total Bill Amount : ₹{totalBillAmount}</p>
            </div>
            <div className="d-flex justify-content-center">
                <table class="table table-dark  mt-4 text-center" style={{maxWidth:'90%'}}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Amount (INR)</th>
                            <th scope="col">Date</th>
                            <th scope="col">Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {billRows}
                    </tbody>
                </table>
            </div>
            <AddEditBillModal selectedEditBill={selectedEditBill} setSelectedEditBill={setSelectedEditBill}></AddEditBillModal>
        </div>
    )
}
