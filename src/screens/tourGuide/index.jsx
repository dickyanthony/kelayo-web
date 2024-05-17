import { ItemTourGuide, NavBar, WrapHCenter } from "../../components";

const DATA = [
  {
    id: 1,
    name: "Meysyah Dwi",
    onClick: () => {},
  },
  {
    id: 2,
    name: "Azhar Ammar",
    onClick: () => {},
  },
  {
    id: 3,
    name: "Mutiara Nabila",
    onClick: () => {},
  },
  {
    id: 4,
    name: "Jhony Fonsen",
    onClick: () => {},
  },
];

const TourGuide = () => {
  return (
    <div className="w-full">
      <NavBar className="absolute" style={{ width: "100vw" }} />
      <WrapHCenter className="p-6 !w-auto">
        <div className="flex flex-col w-full justify-center items-center">
          <ItemTourGuide list={DATA} />
        </div>
      </WrapHCenter>
    </div>
  );
};
export default TourGuide;
