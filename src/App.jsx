import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer
        autoClose={1500}
        transition={Slide}
        position={"bottom-right"}
        pauseOnFocusLoss={false}
      />
      <AppRouter />
    </div>
  );
}

export default App;
