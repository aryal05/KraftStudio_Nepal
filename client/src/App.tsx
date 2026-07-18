import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingMessageButton from "./components/FloatingMessageButton";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import FurnitureCatalog from "./pages/FurnitureCatalog";
import LightingCatalog from "./pages/LightingCatalog";
import DecorCatalog from "./pages/DecorCatalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Workspace from "./pages/Workspace";
import AdminDashboardPage from "./pages/admin/index";
import AdminMessagesPage from "./pages/admin/MessagesPage";
import AdminLayout from "./components/AdminLayout";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminBookings from "./pages/admin/Bookings";
import AdminCustomers from "./pages/admin/Customers";
import AdminBlog from "./pages/admin/Blog";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AdminFurnitureCatalog from "./pages/admin/FurnitureCatalog";
import AdminLightingCatalog from "./pages/admin/LightingCatalog";
import AdminDecorCatalog from "./pages/admin/DecorCatalog";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      {/* Scroll to top on route change */}
      <ScrollToTop />
      
      <Switch>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" component={AdminDashboardPage} />
        <Route path="/admin/messages" component={AdminMessagesPage} />
        <Route path="/admin/chat" component={AdminMessagesPage} />
        <Route path="/admin/products">
          {() => (
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/orders">
          {() => (
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/bookings">
          {() => (
            <AdminLayout>
              <AdminBookings />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/customers">
          {() => (
            <AdminLayout>
              <AdminCustomers />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/blog">
          {() => (
            <AdminLayout>
              <AdminBlog />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/analytics">
          {() => (
            <AdminLayout>
              <AdminAnalytics />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/settings">
          {() => (
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/furniture">
          {() => (
            <AdminLayout>
              <AdminFurnitureCatalog />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/lighting">
          {() => (
            <AdminLayout>
              <AdminLightingCatalog />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/decor">
          {() => (
            <AdminLayout>
              <AdminDecorCatalog />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/catalog/furniture">
          {() => (
            <AdminLayout>
              <AdminFurnitureCatalog />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/catalog/lighting">
          {() => (
            <AdminLayout>
              <AdminLightingCatalog />
            </AdminLayout>
          )}
        </Route>
        <Route path="/admin/catalog/decor">
          {() => (
            <AdminLayout>
              <AdminDecorCatalog />
            </AdminLayout>
          )}
        </Route>
        
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/furniture" component={FurnitureCatalog} />
        <Route path="/lighting" component={LightingCatalog} />
        <Route path="/decor" component={DecorCatalog} />
        <Route path="/workspace" component={Workspace} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/booking" component={Booking} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={Blog} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      
      {/* Floating Message Button - Visible on all pages except admin */}
      <FloatingMessageButton />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
