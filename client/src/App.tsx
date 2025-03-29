import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Search from "@/pages/Search";
import Material from "@/pages/Material";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:category" component={Category} />
      <Route path="/subject/:subject" component={Category} />
      <Route path="/year-level/:yearLevel" component={Category} />
      <Route path="/search/:query" component={Search} />
      <Route path="/material/:id" component={Material} />
      <Route path="/materials" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
