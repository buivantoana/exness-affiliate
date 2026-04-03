import { useQuery } from "react-query";
import { api } from "../../service/api";
import ReviewPageView from "../view/View";
import BotCheckPage from "../check_bot/Botcheckpage";
import LandingPageController from "../landing_page/LandingPageController";
import LoadingFullscreen from "../../components/Loading";

// src/pages/CatchAllPage.jsx
export default function CatchAllPage() {
    const segment = window.location.pathname.split('/').filter(Boolean)[0];
    
    const { data: subPathsData, isLoading, error } = useQuery({
      queryKey: ['subPaths'],
      queryFn: api.getSubPaths,
      staleTime: 60000,
    });
    console.log("AAAA subPathsData",subPathsData)
    // Thêm error handling
    if (error) {
      console.error('Failed to load subPaths:', error);
      // Fallback: chỉ show ReviewPage nếu API lỗi
      return <ReviewPageView />;
    }
  
    if (isLoading) {
      // Show skeleton loading để tránh layout shift
      return <LoadingFullscreen/>;
    }
  
    // Route: /verify
    if (segment === 'verify') {
      return <BotCheckPage />;
    }
  
    // Route: /{subpath} - LandingPage
    if (segment && subPathsData?.subPaths?.includes(segment)) {
      return <LandingPageController />;
    }
  
    // Default: ReviewPage
    return <ReviewPageView />;
  }