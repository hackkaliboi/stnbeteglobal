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
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Books Sold",
    value: "423",
    change: "+15.3%",
    trend: "up",
    icon: BookOpen,
  },
  {
    title: "Active Customers",
    value: "1,284",
    change: "-2.4%",
    trend: "down",
    icon: Users,
  },
];

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", items: 3, total: "$67.99", status: "Completed" },
  { id: "ORD-002", customer: "Jane Smith", items: 1, total: "$24.99", status: "Processing" },
  { id: "ORD-003", customer: "Bob Wilson", items: 2, total: "$45.98", status: "Shipped" },
  { id: "ORD-004", customer: "Alice Brown", items: 5, total: "$112.50", status: "Pending" },
];

const quickActions = [
  { name: "Add New Book", href: "/admin/books", icon: BookOpen },
  { name: "Create Blog Post", href: "/admin/posts", icon: FileText },
  { name: "View Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Manage Bookings", href: "/admin/bookings", icon: Calendar },
];

const AdminDashboard = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div
                      className={`flex items-center text-sm font-medium ${
                        stat.trend === "up" ? "text-chart-2" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

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
                    <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{action.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm">
                View all
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{order.items}</td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        {order.total}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "Completed"
                              ? "bg-chart-2/10 text-chart-2"
                              : order.status === "Processing"
                              ? "bg-accent/10 text-accent"
                              : order.status === "Shipped"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
