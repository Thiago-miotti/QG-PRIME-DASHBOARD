import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';


export default function AppMostViewShows(){
    
  const [treemapChart, setTreemapChart] = useState({
    series: [
      {
        data: [
          {
            x: 'INTC',
            y: 1.2
          },
          {
            x: 'GS',
            y: 0.4
          },
          {
            x: 'CVX',
            y: -1.4
          },
          {
            x: 'GE',
            y: 2.7
          },
          {
            x: 'CAT',
            y: -0.3
          },
          {
            x: 'RTX',
            y: 5.1
          },
          {
            x: 'CSCO',
            y: -2.3
          },
          {
            x: 'JNJ',
            y: 2.1
          },
          {
            x: 'PG',
            y: 0.3
          },
          {
            x: 'TRV',
            y: 0.12
          },
          {
            x: 'MMM',
            y: -2.31
          },
          {
            x: 'NKE',
            y: 3.98
          },
          {
            x: 'IYT',
            y: 1.67
          }
        ]
      }
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
        },
        formatter: function(text, op) {
          return [text, op.value]
        },
        offsetY: -4
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: -6,
                to: 0,
                color: '#CD363A'
              },
              {
                from: 0.001,
                to: 6,
                color: '#52B12C'
              }
            ]
          }
        }
      }
    },
  })

    
      return (
        <Card>
          <CardHeader/>
            <ReactApexChart type="treemap" series={treemapChart.series} options={treemapChart.options} height={350}/>
        </Card>
      );
    }
