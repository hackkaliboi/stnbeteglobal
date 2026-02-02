import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AuthDebugger from "@/pages/debug/AuthDebugger";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, AdminRoute } from "@/components/auth/RouteGuards";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "@/pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminTest from "./pages/admin/AdminTest";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminPages from "./pages/admin/AdminPages";
import AdminPageEditor from "./pages/admin/AdminPageEditor";
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Storefront Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/debug-auth" element={<AuthDebugger />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/books" element={
                <AdminRoute>
                  <AdminBooks />
                </AdminRoute>
              } />
              <Route path="/admin/categories" element={
                <AdminRoute>
                  <AdminCategories />
                </AdminRoute>
              } />
              <Route path="/admin/pages" element={
                <AdminRoute>
                  <AdminPages />
                </AdminRoute>
              } />
              <Route path="/admin/pages/edit/:slug" element={
                <AdminRoute>
                  <AdminPageEditor />
                </AdminRoute>
              } />
              <Route path="/admin/posts" element={
                <AdminRoute>
                  <AdminPosts />
                </AdminRoute>
              } />
              <Route path="/admin/settings" element={
                <AdminRoute>
                  <AdminSettings />
                </AdminRoute>
              } />
              <Route path="/admin/newsletter" element={
                <AdminRoute>
                  <AdminNewsletter />
                </AdminRoute>
              } />
              <Route path="/admin/test" element={
                <AdminRoute>
                  <AdminTest />
                </AdminRoute>
              } />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
