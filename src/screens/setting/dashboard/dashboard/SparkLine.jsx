import React from 'react';
import { Card } from '@nextui-org/react';
import Chart from 'react-apexcharts';

const SparkLineChart = () => {
  const series = [
    {
      name: 'Data',
      data: [1],
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 100,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#1e88e5'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      categories: [
        new Date(2022, 5, 1).getTime(),
        new Date(2022, 5, 2).getTime(),
        new Date(2022, 5, 5).getTime(),
        new Date(2022, 5, 6).getTime(),
        new Date(2022, 5, 7).getTime(),
        new Date(2022, 5, 8).getTime(),
        new Date(2022, 5, 11).getTime(),
        new Date(2022, 5, 12).getTime(),
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy',
      },
    },
    colors: ['#42a5f5'], // Starting color for the gradient
  };

  return (
    <div style={{ width: '100%', height: 100 }}>
      <Chart options={options} series={series} type="line" height={100} />
    </div>
  );
};

const SparkLine = ({ detail }) => {
  return (
    <Card className="p-4 px-8 grid md:grid-cols-2">
      <div>
        <div variant="h6" fontWeight="bold">
          {detail?.title ?? 'Title'}
        </div>
        <div className="flex-grow content-center">{detail?.total ?? 0}</div>
      </div>
      <SparkLineChart />
    </Card>
  );
};

export default SparkLine;
