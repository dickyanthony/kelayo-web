import React from 'react';
import { Card, Image } from '@nextui-org/react';

const CardReview = ({ detail }) => {
  return (
    <Card className="p-6 mt-4 min-w-full">
      <div className="font-semibold text-center mb-4">LIHAT PENILAIAN DARI PENGUNJUNG</div>
      {(detail?.review || []).map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="flex flex-row">
              <Image
                className="max-w-[25px] max-h-[25px]"
                width={25}
                height={25}
                radius="full"
                src={item.image}
                alt={item.name}
              />
              <div className="ml-4">
                <div className="font-semibold text-xs">{item.name}</div>
                <div className="font-semibold text-xs text-black/60">{item.date}</div>
                <p className="text-xs text-black/90 mt-1">{item.description}</p>
              </div>
            </div>
            <div className="w-full h-[2px] border-primary-text/50 border-t-1 my-4"></div>
          </React.Fragment>
        );
      })}
    </Card>
  );
};

export default CardReview;
