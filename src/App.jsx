import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@nextui-org/button";
import { Input, NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WrapCenter } from "./components";
function App() {
  return (
    <>
      <WrapCenter>
        <RouterProvider router={router} />
      </WrapCenter>
    </>
  );
}

export default App;
