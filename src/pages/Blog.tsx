import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { cn } from "@/lib/utils";

const Blog = () => {
  const { posts, loading } = useBlogPosts();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: previewRef, isVisible: previewVisible } = useScrollAnimation();

  // Helper to calculate read time
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = (content || "").split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const featuredPost = posts.find((post) => post.featured && post.published);
  const regularPosts = posts.filter((post) => (!post.featured || !featuredPost) && post.published);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Enhanced Hero Section */}
      <section className="min-h-[60vh] flex items-center bg-gradient-to-br from-background via-blue-50 to-blue-100 dark:from-background dark:via-blue-950/50 dark:to-blue-900/30 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div
              ref={heroRef}
              className={cn(
                "lg:col-span-8 animate-on-scroll-left",
                heroVisible && "is-visible"
              )}
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
                Stories & Insights
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95] tracking-tight mb-6">
                Blog &
                <br />
                <span className="font-medium italic">News</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                Stories, insights, and updates from the world of books and reading.
                Discover author interviews, literary discussions, and the latest in publishing.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Author Interviews</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Book Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Industry News</span>
                </div>
              </div>
            </div>

            {/* Right Content - Latest Post Preview */}
            <div
              ref={previewRef}
              className={cn(
                "lg:col-span-4 animate-on-scroll-right",
                previewVisible && "is-visible"
              )}
            >
              {featuredPost && (
                <div className="bg-background/50 dark:bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Latest Post</div>
                  <h3 className="text-lg font-medium text-foreground mb-2 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {featuredPost.excerpt.substring(0, 100)}...
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(featuredPost.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} • {getReadTime(featuredPost.content)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 md:py-16">
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No blog posts available at the moment.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for new content!
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link to={`/blog/${featuredPost.id}`} className="block mb-12">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid lg:grid-cols-2">
                    <div className="aspect-video lg:aspect-auto">
                      <img
                        src={featuredPost.cover_image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop"}
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
                          {new Date(featuredPost.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getReadTime(featuredPost.content)}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.cover_image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop"}
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
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
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
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Blog;
