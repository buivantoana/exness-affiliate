import { useQuery } from "react-query";
import { api } from "../../service/api";
import ReviewPageView from "../view/View";
import BotCheckPage from "../check_bot/Botcheckpage";
import LandingPageController from "../landing_page/LandingPageController";
import LoadingFullscreen from "../../components/Loading";
import NotFoundPage from "../not_found/Notfoundpage";
import ViewController from "../view/ViewController";

export default function CatchAllPage() {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];

  const {
    data: subPathsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subPaths"],
    queryFn: api.getSubPaths,
    staleTime: 60000,
  });
  console.log("AAAA subPathsData", subPathsData);

  if (error) {
    console.error("Failed to load subPaths:", error);
    return <ViewController />;
  }

  if (isLoading) {
    return <LoadingFullscreen />;
  }

  // Route: /verify
  if (segment === "verify") {
    return <BotCheckPage />;
  }

  // Route: /{subpath} - LandingPage (nếu subpath hợp lệ)
  if (segment && subPathsData?.subPaths?.includes(segment)) {
    return <LandingPageController />;
  }

  // ⭐ Nếu có segment nhưng không hợp lệ → 404
  if (segment) {
    return <NotFoundPage />;
  }

  // Default: / (root) → ReviewPage
  return <ViewController />;
}
