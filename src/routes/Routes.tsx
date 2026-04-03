import {  Route, Routes } from "react-router-dom";

import CatchAllPage from "../pages/catch-all-page/CatchAllPage";

const Router = () => {


  return (
    <Routes>
       <Route path="*" element={<CatchAllPage />} />
    </Routes>
  );
};

export default Router;
