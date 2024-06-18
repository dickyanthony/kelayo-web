import styled from 'styled-components';
import ApexCharts from 'react-apexcharts';

function setChartOption() {
  const ChartOptions = {
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '95%',
          },
        },
      },
      labels: ['Menunggu Konfirmasi', 'Silahkan Print Tiket', 'Selesai'],
      fill: {
        opacity: 1,
        colors: ['#0066FF', '#7AFFBF', '#00D1FF'],
      },
      tooltip: {
        enabled: true,
        // y: {
        //   formatter: function (val) {
        //     return val !== 1 ? val + 'kg' : val - 1 + 'kg';
        //   },
        //   title: {
        //     formatter: function (seriesName) {
        //       return '';
        //     },
        //   },
        // },
      },
      stroke: {
        show: false, //차트 border
      },
    },
  };

  return ChartOptions.options;
}

export default function UserPowerChart({ title, detail }) {
  console.log('Detail==>', detail);
  return (
    <ChartsBox>
      <ApexCharts
        options={setChartOption()}
        series={detail?.value ?? [0, 0, 0]}
        type="donut"
        width="300"
        height="300"
      />
      <InnerInfo>
        <InnerTop>
          <InfoSumTitle>{title}</InfoSumTitle>
          <InfoSumValue>{detail?.value.reduce((acc, val) => acc + val, 0)}</InfoSumValue>
        </InnerTop>
      </InnerInfo>
    </ChartsBox>
  );
}

const ChartsBox = styled.div`
  position: relative;
`;

const InnerInfo = styled.div`
  position: absolute;
  top: 90px;
  left: 46px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerTop = styled.div`
  margin-bottom: 30px;
`;

const InfoSumTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #888888;
`;

const InfoSumValue = styled.p`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: ${(props) => props.theme.reverseFontColor};
`;

const InnderBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const InfoPowerTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #888888;
`;

const InfoPowerValue = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
`;
