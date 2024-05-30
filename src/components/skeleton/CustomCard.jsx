import React from 'react';
import { Card } from '@nextui-org/react';

const CustomCard = () => (
  <Card className="w-full space-y-5 p-4" radius="2xl">
    <div className="skeleton-loader h-24 rounded-lg bg-default-300"></div>
    <div className="space-y-3">
      <div className="skeleton-loader h-3 w-3/5 rounded-lg bg-default-200"></div>
      <div className="skeleton-loader h-3 w-4/5 rounded-lg bg-default-200"></div>
      <div className="skeleton-loader h-3 w-2/5 rounded-lg bg-default-300"></div>
    </div>
  </Card>
);

export default CustomCard;
