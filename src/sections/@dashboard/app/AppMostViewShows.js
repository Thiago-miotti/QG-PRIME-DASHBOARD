import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import {useTheme, styled} from '@mui/material/styles';
import {Box, Card, CardHeader} from '@mui/material';
// utils
import {fNumber} from '../../../utils/formatNumber';
// components
import {useChart} from '../../../components/chart';


export default function AppMostViewShows({title, subheader, chartData, chartColors, ...other}) {

    const chartOptions = {
        options: {
            legend: {
                show: false
            },
            chart: {
                toolbar: {show: false},
            },
            colors: [
                '#3B93A5',
                '#F7B844',
                '#ADD8C7',
                '#EC3C65',
                '#CDD7B6',
                '#C1F666',
                '#D43F97',
                '#1E5D8C',
                '#421243',
                '#7F94B0',
                '#EF6537',
                '#C0ADDB'
            ],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px',
                },
                formatter: function (text, op) {
                    return [text, op.value]
                },
                offsetY: -4
            },
            plotOptions: {
                treemap: {
                    distributed: true,
                    enableShades: false,
                }
            }
        }
    }

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader}/>

            <Box sx={{mx: 3}} dir="ltr">
                <ReactApexChart type="treemap" series={chartData} options={chartOptions.options}
                                height={550}/>

            </Box>
        </Card>
    );
}
