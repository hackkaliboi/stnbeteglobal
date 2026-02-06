import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  Settings,
  LayoutTemplate
} from "lucide-react";
import { Link } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalBooks: number;
  totalPosts: number;
  publishedPosts: number;
  bestsellers: number;
}

const quickActions = [
  { name: "Add New Book", href: "/admin/books", icon: BookOpen },
  { name: "Create Blog Post", href: "/admin/posts", icon: FileText },
  { name: "Site Pages", href: "/admin/pages", icon: LayoutTemplate },
  { name: "Newsletter", href: "/admin/newsletter", icon: TrendingUp },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);

  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { posts, loading: postsLoading } = useBlogPosts();
  const { user, isAdmin, loading: profileLoading } = useAuth();

  const loading = booksLoading || postsLoading;

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { count } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });
        setUserCount(count || 0);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    if (isAdmin) {
      fetchUserCount();
    }
  }, [isAdmin]);

  const stats: DashboardStats = {
    totalBooks: books.length,
    totalPosts: posts.length,
    publishedPosts: posts.filter(post => post.published).length,
    bestsellers: books.filter(book => book.is_featured).length,
  };

  if (profileLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: BookOpen,
      change: "+0",
      description: "In library",
      color: "text-blue-500",
    },
    {
      title: "Featured Books",
      value: stats.bestsellers,
      icon: TrendingUp,
      change: "+0",
      description: "Highlighted",
      color: "text-amber-500",
    },
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      change: "+0",
      description: "Blog entries",
      color: "text-green-500",
    },
    {
      title: "Published Posts",
      value: stats.publishedPosts,
      icon: Users,
      change: "+0",
      description: "Live on site",
      color: "text-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.first_name || 'Admin'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : stat.value}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 flex items-center mr-1">
                      {stat.change === "+0" ? null : (
                        <>
                          {stat.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                          {stat.change}
                        </>
                      )}
                    </span>
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Simplified Activity Feed */}
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">System Ready</p>
                    <p className="text-sm text-muted-foreground">
                      Database connected and frontend updated.
                    </p>
                  </div>
                  <div className="ml-auto font-medium">Just now</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                  <Link key={i} to={action.href}>
                    <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                      <action.icon className="h-6 w-6 mb-1" />
                      {action.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
