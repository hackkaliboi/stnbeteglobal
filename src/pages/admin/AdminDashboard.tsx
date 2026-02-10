import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  TrendingUp,
  FileText,
  Users,
  Loader2,
  Settings,
  LayoutTemplate,
  Mail,
  BarChart3,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface DashboardStats {
  totalBooks: number;
  totalPosts: number;
  publishedPosts: number;
  featuredBooks: number;
}

const quickActions = [
  { name: "Add Book", href: "/admin/books", icon: BookOpen, color: "text-blue-500" },
  { name: "New Post", href: "/admin/posts", icon: FileText, color: "text-green-500" },
  { name: "Pages", href: "/admin/pages", icon: LayoutTemplate, color: "text-purple-500" },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail, color: "text-amber-500" },
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
    featuredBooks: books.filter(book => book.is_featured).length,
  };

  // Chart data
  const contentData = [
    {
      name: "Books",
      total: stats.totalBooks,
      featured: stats.featuredBooks,
    },
    {
      name: "Posts",
      total: stats.totalPosts,
      featured: stats.publishedPosts,
    },
  ];

  const overviewData = [
    { name: "Total Books", value: stats.totalBooks },
    { name: "Featured", value: stats.featuredBooks },
    { name: "Total Posts", value: stats.totalPosts },
    { name: "Published", value: stats.publishedPosts },
  ];

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
      description: "Books in library",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Featured Books",
      value: stats.featuredBooks,
      icon: TrendingUp,
      description: "Highlighted books",
      gradient: "from-amber-500 to-amber-600",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: FileText,
      description: "Blog entries",
      gradient: "from-green-500 to-green-600",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      title: "Published Posts",
      value: stats.publishedPosts,
      icon: Users,
      description: "Live on site",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.user_metadata?.first_name || 'Admin'}
            </p>
          </div>
          <Link to="/admin/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="overflow-hidden border-0 shadow-lg">
                <div className={`h-2 bg-gradient-to-r ${stat.gradient}`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Content Comparison Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <CardTitle>Content Overview</CardTitle>
              </div>
              <CardDescription>Comparison of total and featured content</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="hsl(220, 100%, 50%)" name="Total" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="featured" fill="hsl(45, 100%, 50%)" name="Featured/Published" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Overview Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                <CardTitle>Content Distribution</CardTitle>
              </div>
              <CardDescription>Overview of all content types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(220, 100%, 50%)"
                    fill="hsl(220, 100%, 50%)"
                    fillOpacity={0.2}
                    name="Count"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} to={action.href}>
                  <Button
                    variant="outline"
                    className="w-full h-28 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 hover:border-primary transition-all group"
                  >
                    <div className={`p-3 rounded-lg bg-muted group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <span className="text-sm font-medium">{action.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
