import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPageController from "../pages/landing_page/LandingPageController";
import ViewController from "../pages/view/ViewController";

const Router = () => {


  return (
    <Routes>
      <Route path='/' element={<LandingPageController />} />
      <Route path='/review' element={<ViewController />} />
    </Routes>
  );
};

export default Router;
