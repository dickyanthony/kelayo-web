import { Footer, NavBar, TourCard, WrapHCenter } from "../../components";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <NavBar />

        <WrapHCenter className="p-6">
          <TourCard />
          <Footer />
        </WrapHCenter>
      </div>
    </>
  );
}
