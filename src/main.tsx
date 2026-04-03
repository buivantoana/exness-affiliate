import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// src/main.jsx hoặc src/index.jsx
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,        // 60 giây như yêu cầu trong tài liệu
      cacheTime: 300000,       // 5 phút
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
);
