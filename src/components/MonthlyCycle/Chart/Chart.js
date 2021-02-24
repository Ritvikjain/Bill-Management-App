import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function Chart(props) {
    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Bill Cycle for year ' + props.year
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Amount'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name:props.year,
            data: props.series
        }]
    }
    console.log(props.series);
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            style={{width:'100%'}}
        />
    )
}
