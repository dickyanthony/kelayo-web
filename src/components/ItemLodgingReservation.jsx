import { Card, CardBody, Image } from "@nextui-org/react";
import WifiLogo from "../assets/wifi-logo.svg";
import BathroomLogo from "../assets/bathroom-logo.svg";
import ElectricLogo from "../assets/electric-logo.svg";
const ItemFeature = (item) => {
  return (
    <>
      <Image
        width={12}
        height={12}
        alt={item.featureTite}
        src={item.featureImage}
      />
      <p className="ml-2 mr-2 text-gray-500 text-[10px] sm:text-xs">
        {item.featureTite}
      </p>
    </>
  );
};
export default function ItemLodgingReservation(props) {
  const { item, onPress } = props;

  return (
    <Card
      isPressable
      onPress={() => onPress(item)}
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              isZoomed
              alt="Album cover"
              className="object-cover"
              height={200}
              src={item.image}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-primary-text">
                  {item.title}
                </h3>
                <div className="flex flex-wrap w-full items-center mb-4 mt-2">
                  {item.isFreeWifi && (
                    <ItemFeature
                      featureTite="Wifi Gratis"
                      featureImage={WifiLogo}
                    />
                  )}
                  {item.isFreeWaterElectric && (
                    <ItemFeature
                      featureTite="Listrik Gratis"
                      featureImage={ElectricLogo}
                    />
                  )}

                  {item.isPrivateBathroom && (
                    <ItemFeature
                      featureTite="Kamar Mandi Pribadi"
                      featureImage={BathroomLogo}
                    />
                  )}
                </div>
                <p className="text-[10px] text-foreground/80 line-clamp-5 sm:text-small">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
