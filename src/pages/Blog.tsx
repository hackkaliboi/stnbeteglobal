import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Rise of Independent Authors in 2024",
    excerpt: "Self-publishing has revolutionized the literary world, giving voice to countless talented writers who might otherwise never have been heard.",
    author: "stnbeteglobal Team",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    category: "Industry News",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "10 Must-Read Books for Personal Growth",
    excerpt: "Transform your mindset with these powerful reads that have helped millions achieve their potential.",
    author: "Emma Richardson",
    date: "Jan 12, 2024",
    readTime: "8 min read",
    category: "Book Lists",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    title: "How to Build a Daily Reading Habit",
    excerpt: "Struggling to find time to read? Here are proven strategies to make reading a consistent part of your routine.",
    author: "Michael Torres",
    date: "Jan 10, 2024",
    readTime: "4 min read",
    category: "Tips & Advice",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
  },
  {
    id: "4",
    title: "Interview with Bestselling Author Sarah Mitchell",
    excerpt: "We sat down with the acclaimed author to discuss her creative process, inspirations, and upcoming projects.",
    author: "stnbeteglobal Team",
    date: "Jan 8, 2024",
    readTime: "10 min read",
    category: "Author Interviews",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=500&fit=crop",
  },
];

const Blog = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <MainLayout>
      <div className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Blog & News
          </h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">
            Stories, insights, and updates from the world of books and reading.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 md:py-16">
        {/* Featured Post */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.id}`} className="block mb-12">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 lg:p-10 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-accent text-accent-foreground">Featured</Badge>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
