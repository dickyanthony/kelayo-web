import React from 'react';
import { Card, Image } from '@nextui-org/react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const SparkLine = ({
  detail,
  className = '',
  titleClass = '',
  totalClass = '',
  imageSource = '',
  imageAlt = '',
  from = '#42a5f5',
  to = '#1e88e5',
  sparklineDetail = [],
  total = 0,
}) => {
  const renderTooltip = ({ active, payload, label }) => {
    return (
      <div className="bg-white p-3">
        <p className={`label ${titleClass}`}>{`${payload[0]?.payload?.label ?? ''}`}</p>
        <p className="intro"></p>
        <p className={`label ${titleClass}`}>{`${payload[0]?.payload?.value ?? 0}`}</p>
      </div>
    );
  };

  return (
    <Card
      className={`min-w-[240px] min-h-[240px] max-w-[240px] max-h-[240px] p-4 px-8 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <Image className="flex-1" src={imageSource} alt={imageAlt} />
        <div className="flex-1">
          <div className={`variant="h6" fontWeight="bold" ${titleClass}`}>
            {detail?.title ?? 'Title'}
          </div>
          <div className={`flex-grow content-center text-2xl ${totalClass}`}>{total}</div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={sparklineDetail}>
              <Line type="monotone" dataKey="value" stroke={from} fill={to} strokeWidth={2} />

              <Tooltip
                content={renderTooltip}
                payload={sparklineDetail}
                // labelFormatter={(t) => t}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default SparkLine;
