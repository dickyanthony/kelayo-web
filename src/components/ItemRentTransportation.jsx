import { Card, CardFooter, Image, Button, CardBody } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatNumberWithSeparator } from '../utils/numberConverter';

const ItemRentTransportation = (props) => {
  const { item, showPrice = false, isPressable = true, className = '', imageClass = '' } = props;
  const { id } = useParams();

  const navigate = useNavigate();
  let url = id ? `/rent-transportation-form/${item?.id}` : `/rent-transportation/${item?.id}`;
  console.log(item?.image);
  return (
    <Card className={className} shadow="sm" isPressable={isPressable} onPress={() => navigate(url)}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={item?.name}
          className={`w-full object-cover h-[180px] ${imageClass}`}
          src={item?.image}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{item?.name}</b>
        {showPrice && <p className="text-default-500">{formatNumberWithSeparator(item?.price)}</p>}
      </CardFooter>
    </Card>
  );
};

export default ItemRentTransportation;
