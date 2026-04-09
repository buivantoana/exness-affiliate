// routes/Routes.tsx
import { Route, Routes } from "react-router-dom";
import { useTracking } from "../hooks/useTracking";

// Import tất cả các page
import CatchAllPage1 from "../pages/domain1/catch-all-page/CatchAllPage";
import CatchAllPage2 from "../pages/domain2/catch-all-page/CatchAllPage";
import CatchAllPage3 from "../pages/domain3/catch-all-page/CatchAllPage";

const Router = () => {
  useTracking();
  
  // Map domain theo env
  const pages = {
    domain1: <CatchAllPage1 />,
    domain2: <CatchAllPage2 />,
    domain3: <CatchAllPage3 />,
  };
  
  const currentDomain = import.meta.env.VITE_DOMAIN || 'domain1';

  return (
    <Routes>
      <Route path='*' element={pages[currentDomain]} />
    </Routes>
  );
};

export default Router;