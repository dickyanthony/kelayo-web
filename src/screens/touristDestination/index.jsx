import { Footer, NavBar, TabTourist, WrapHCenter } from "../../components";

export default function TouristDestination() {
  return (
    <div className="w-full ">
      <NavBar className="absolute" />
      <WrapHCenter className="p-6">
        <div className="flex flex-col w-4/5 justify-center items-center">
          <TabTourist />
          <Footer />
        </div>
      </WrapHCenter>
    </div>
  );
}
