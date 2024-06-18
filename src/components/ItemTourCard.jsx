import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import LocationLogo from '../assets/location.png';

// Haversine formula to calculate distance in km
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;

  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

const ItemTourCard = (props) => {
  const { list, className = '' } = props;
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const calculateDistance = (itemLat, itemLng) => {
    console.log(itemLat, itemLng);
    if (userLocation.lat && userLocation.lng) {
      const itemLocation = { lat: itemLat, lng: itemLng };
      return `${haversineDistance(userLocation, itemLocation).toFixed(2)} Km`;
    }
    return 'Turn on location';
  };

  return (
    <div
      className={`gap-y-6 gap-x-8 grid grid-cols-1 min-[432px]:grid-cols-2 sm:gap-x-8 sm:grid-cols-3 ${className}`}
    >
      {list.map((item, index) => (
        <Card
          className="max-w-[309px]"
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
            <b className="mt-2 mb-2 text-primary-text text-left">{item.title}</b>
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
                <p className="ml-2 text-default-500 text-xs line-clamp-1 text-left overflow-hidden">
                  {item.location}
                </p>
              </div>
              <p className="text-default-500 text-xs">{calculateDistance(item.lat, item.lng)} </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ItemTourCard;
