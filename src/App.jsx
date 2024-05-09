import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WrapCenter } from "./components";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
