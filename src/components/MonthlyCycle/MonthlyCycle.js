import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Chart from './Chart/Chart';

export default function MonthlyCycle() {
    const bills = useSelector(state => state.billsData.bills);
    const [series, setSeries] = useState([]);
    const [selectedYear, setSelectedYear] = useState("2021")
    useEffect(() => {
        generateGraphData()
    }, [bills,selectedYear])
    const generateGraphData = () => {
        let seriesList = [0,0,0,0,0,0,0,0,0,0,0,0];
        bills.forEach(bill => {
            let date = bill.date;
            let year = date.split('-')[2];
            let month = parseInt(date.split('-')[0]);
            let day = date.split('-')[1];
            if(year === selectedYear)
            seriesList[month-1] += parseInt(bill.amount)
        });
        setSeries(seriesList);
    }
    const handleYearChange = (year) => {
        setSelectedYear(year);
        generateGraphData();
    }
    return (
        <div className="p-1 flex-column">
            <div className="d-flex justify-content-center text-center my-3">
                <div className="my-2 d-flex justify-content-center text-center" style={{width:'100%'}}> 
                    <p className="m-0 p-0 pt-1 mx-2" style={{fontSize: '16px'}}>Select Year: </p>
                    <Select value={selectedYear} style={{width:'100px'}} onChange={handleYearChange}>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                    </Select>
                </div>
            </div>
            <Chart series={series} year={selectedYear}></Chart>
        </div>
    )
}
