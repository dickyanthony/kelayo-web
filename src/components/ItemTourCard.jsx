import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import LocationLogo from '../assets/location.png';

const ItemTourCard = (props) => {
  const { list, className = '' } = props;
  const navigate = useNavigate();
  return (
    <div
      className={`gap-y-6 gap-x-8 grid grid-cols-1 min-[432px]:grid-cols-2 sm:gap-x-8 sm:grid-cols-3 ${className}`}
    >
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => navigate(`/tourist-destination/${item.id}`)}
        >
          <CardBody className="overflow-visible p-0">
            <div className="relative max-h-[180px] w-full">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="object-cover h-[180px] w-full"
                src={item.image1}
              />
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between flex-col items-start">
            <b className="mt-2 mb-2 text-primary-text">{item.title}</b>
            <p className="text-default-500 text-start line-clamp-3">{item.description}</p>
            <div className="flex flex-col w-full mt-4 min-[400px]:flex-row justify-between">
              <div className="flex flex-row">
                <Image
                  className="min-w-2 min-h-2"
                  src={LocationLogo}
                  alt="location"
                  width={12}
                  height={12}
                />
                <p className="ml-2 text-default-500 text-xs">{item.location}</p>
              </div>
              <p className="text-default-500 text-xs">{item.range ?? 0} Km</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ItemTourCard;
