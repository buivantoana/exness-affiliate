import { Route, Routes } from "react-router-dom";

import CatchAllPage from "../pages/catch-all-page/CatchAllPage";
import { useTracking } from "../hooks/useTracking";

const Router = () => {
  console.log("GA4 Script:", document.getElementById("ga4-script"));
  console.log("GTM Head:", document.getElementById("gtm-head"));
  console.log("GTM Body:", document.getElementById("gtm-body"));
  useTracking();

  return (
    <Routes>
      <Route path='*' element={<CatchAllPage />} />
    </Routes>
  );
};

export default Router;
