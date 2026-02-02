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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalBooks: number;
  totalPosts: number;
  publishedPosts: number;
  inStockBooks: number;
  newBooks: number;
  bestsellers: number;
}

const quickActions = [
  { name: "Add New Book", href: "/admin/books", icon: BookOpen },
  { name: "Create Blog Post", href: "/admin/posts", icon: FileText },
  { name: "Newsletter Subscribers", href: "/admin/newsletter", icon: TrendingUp },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);

  const { books } = useBooks();
  const { posts } = useBlogPosts();
  const { user } = useAuth();
  const { isAdmin, loading: profileLoading } = useUserProfile();

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

  useEffect(() => {
    if (books.length > 0 || posts.length > 0) {
      const dashboardStats: DashboardStats = {
        totalBooks: books.length,
        totalPosts: posts.length,
        publishedPosts: posts.filter(post => post.published).length,
        inStockBooks: books.filter(book => book.in_stock).length,
        newBooks: books.filter(book => book.is_new).length,
        bestsellers: books.filter(book => book.is_bestseller).length,
      };
      setStats(dashboardStats);
      setLoading(false);
    }
  }, [books, posts]);

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

  const statCards = stats ? [
    {
      title: "Total Books",
      value: stats.totalBooks.toString(),
      subtitle: `${stats.inStockBooks} in stock`,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts.toString(),
      subtitle: `${stats.publishedPosts} published`,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "New Releases",
      value: stats.newBooks.toString(),
      subtitle: "Recently added",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Registered Users",
      value: userCount.toString(),
      subtitle: "Total users",
      icon: Users,
      color: "text-orange-600",
    },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, Admin
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.name} to={action.href}>
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 hover:bg-accent/50">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{action.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Books */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Books</CardTitle>
              <Link to="/admin/books">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : books.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No books available</p>
              ) : (
                <div className="space-y-4">
                  {books.slice(0, 5).map((book) => (
                    <div key={book.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{book.title}</p>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${book.price.toFixed(2)}</p>
                        <div className="flex gap-1">
                          {book.is_new && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">New</span>
                          )}
                          {book.is_bestseller && (
                            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">Best</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
              <Link to="/admin/posts">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : posts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No posts available</p>
              ) : (
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{post.title}</p>
                        <p className="text-xs text-muted-foreground">{post.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex gap-1">
                          {post.published && (
                            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">Published</span>
                          )}
                          {post.featured && (
                            <span className="text-xs bg-purple-100 text-purple-800 px-1 rounded">Featured</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
