import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Shop from "@/pages/Shop";
import Quiz from "@/pages/Quiz";
import Admin from "@/pages/Admin";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLocation } from "wouter";

const queryClient = new QueryClient();

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  if (isAdmin) return <Admin />;

  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/blog" component={Blog} />
        <Route path="/comprar" component={Shop} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
