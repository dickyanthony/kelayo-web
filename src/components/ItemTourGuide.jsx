import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ItemTourGuide = (props) => {
  const { list, className } = props;
  const navigate = useNavigate();
  return (
    <div
      className={`gap-y-6 gap-x-8 grid grid-cols-1 min-[432px]:grid-cols-2 sm:gap-x-8 sm:grid-cols-3 ${className}`}
    >
      {list.map((item, index) => {
        return (
          <Card key={index} isFooterBlurred radius="lg" className="border-none">
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src={item.image}
              width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny font-bold text-white/95">{item.name}</p>
              <Button
                onClick={() => navigate(`/tour-guide/${item.id}`)}
                className="text-tiny  text-white bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Cek
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ItemTourGuide;
