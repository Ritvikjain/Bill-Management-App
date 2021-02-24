import { Button, Card, Input, Select } from 'antd'
import { Option } from 'antd/lib/mentions';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './MonthlyBudget.css'
export default function MonthlyBudget(props) {
    const year = [2019,2020,2021];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const bills = useSelector(state => state.billsData.bills)
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [budget, setBudget] = useState(null);
    const [paidBills, setPaidBills] = useState([]);
    const [selectedMonthsBills, setSelectedMonthBills] = useState([])
    const [totalAmount, setTotalAmount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const handleDropdownSelect = (value, type) => {
        if(type == 'year') {
            setSelectedYear(value);
        } else {
            setSelectedMonth(value);
        }
    }
    const handleInputChange = (event, type) => {
        if(type == 'budget') {
            setBudget(event.target.value);
        }
    }
    const yearOptions = year.map(yr => {
        return (
            <Option value={yr}>{yr}</Option>
        )
    })
    const monthOptions = months.map(month=>{
        return (
            <Option value={month}>{month}</Option>
        )
    })
    const calculateBillToPay = () => {
        if(selectedYear == null || selectedMonth == null || budget == null) {
            setErrorMessage("Please fill all mandatory fields.");
            return;
        }
        setErrorMessage(null);
        let currentYear = selectedYear;
        let currentMonth = months.findIndex((mon) => mon === selectedMonth)+1;
        let selectedMonthBills = bills.filter(bill => {
            return parseInt(bill.date.split('-')[0]) == currentMonth && parseInt(bill.date.split('-')[2]) == currentYear
        })
        setSelectedMonthBills(selectedMonthBills);
        selectedMonthBills.sort((a,b)=>{return b.amount-a.amount})
        let toBePaid = []
        let totalAmount = 0;
        for(let i=0;i<selectedMonthBills.length;i++){
            if(totalAmount+parseInt(selectedMonthBills[i].amount) <= budget) {
                totalAmount = totalAmount + parseInt(selectedMonthBills[i].amount);
                toBePaid.push(selectedMonthBills[i].id);
            }
        }
        setPaidBills(toBePaid);
        setTotalAmount(totalAmount);
    }

    const billRows = selectedMonthsBills.map(bill => {
        let toBePaid = paidBills.indexOf(bill.id) != -1;
        return (
            <tr className={toBePaid ? 'pay-bill-row':''}>
                <th scope="row" className={toBePaid ? 'pay-bill-row':''}>{bill.id}</th>
                <td className={toBePaid ? 'pay-bill-row':''}>{bill.description}</td>
                <td className={toBePaid ? 'pay-bill-row':''}>{bill.category}</td>
                <td className={toBePaid ? 'pay-bill-row':''}>{bill.amount}</td>
                <td className={toBePaid ? 'pay-bill-row':''}>{bill.date}</td>
            </tr>
        )
    })
    return (
        <div className="p-1 flex-column">
            <div className="d-flex justify-content-center my-3">
                <h3>Monthly Budget</h3>
            </div>
            <div className="d-flex justify-content-center my-3">
                <Card  style={{ width: '70%' }}>
                    {errorMessage!=null && errorMessage!="" && <div className="text-end">
                        <p className="error-text">* {errorMessage}</p>
                    </div>}
                    <div className="d-flex justify-content-around">
                        <div className="my-2 mx-1" >
                            <p className="m-0 p-0">Select Year *</p>
                            <Select  style={{width:'180px'}} onChange={(value) => handleDropdownSelect(value,'year')}>
                                {yearOptions}
                            </Select>
                        </div>
                        <div className="my-2 mx-1">
                            <p className="m-0 p-0">Select Month *</p>
                            <Select  style={{width:'180px'}} onChange={(value) => handleDropdownSelect(value,'month')}>
                                {monthOptions}
                            </Select>
                        </div>
                        <div className="my-2 mx-1">
                            <p className="m-0 p-0">Enter Monthly Budget *</p>
                            <Input type='number' shape='round' onChange={(event) => handleInputChange(event, 'budget')}/>
                        </div>
                    </div>
                    <div className="my-3 text-center">
                        <Button className="mt-2" shape='round' size='middle' onClick={calculateBillToPay}>Calculate Bills to be Paid</Button>
                    </div>
                    {totalAmount!=null && <div className="my-3 text-center">
                        <p className="m-0">Total Number of Bills that can be paid: {paidBills.length}</p>
                        <p className="m-0">Total Amount to be Paid: ₹{totalAmount}</p>
                        <p className="m-0">Amount Saved: ₹{budget-totalAmount}</p>
                    </div>}
                </Card>
            </div>
            <div className="d-flex justify-content-end mt-3" style={{width:'95%'}}>
                <span className="dot"></span><p className="m-0 mx-2"> Denotes bills that can be paid.</p>
            </div>
            <div className="d-flex justify-content-center my-2">
                <table class="table table-dark  mt-4 text-center" style={{maxWidth:'90%'}}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Amount (INR)</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {billRows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
