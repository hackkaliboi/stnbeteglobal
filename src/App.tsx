import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Books from "./pages/Books";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminBookings from "./pages/admin/AdminBookings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Storefront Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<Books />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/books" element={<AdminBooks />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
