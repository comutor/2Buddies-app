import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import Rides from "@/pages/Rides";
import CreateRide from "@/pages/CreateRide";
import RequestRide from "@/pages/RequestRide";
import RideDetails from "@/pages/RideDetails";
import Account from "@/pages/Account";
import Auth from "@/pages/Auth";
import RideBuddy from "@/components/RideBuddy";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="*">
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/discover" component={Discover} />
            <Route path="/rides" component={Rides} />
            <Route path="/rides/create" component={CreateRide} />
            <Route path="/rides/request" component={RequestRide} />
            <Route path="/rides/:id">
              {params => <RideDetails params={params} />}
            </Route>
            <Route path="/account" component={Account} />
            <Route component={NotFound} />
          </Switch>
          <RideBuddy />
        </Layout>
      </Route>
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
