import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminPages from "./pages/admin/AdminPages";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminPageEditor from "./pages/admin/AdminPageEditor";
import { AdminGuard, RequireAuth } from "./components/auth/RouteGuards";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminGuard>
                    <AdminDashboard />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/books"
                element={
                  <AdminGuard>
                    <AdminBooks />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/posts"
                element={
                  <AdminGuard>
                    <AdminPosts />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/pages"
                element={
                  <AdminGuard>
                    <AdminPages />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/pages/:slug"
                element={
                  <AdminGuard>
                    <AdminPageEditor />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <AdminGuard>
                    <AdminSettings />
                  </AdminGuard>
                }
              />
              <Route
                path="/admin/newsletter"
                element={
                  <AdminGuard>
                    <AdminNewsletter />
                  </AdminGuard>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
