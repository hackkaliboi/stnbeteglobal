import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Lightbulb, Heart, Compass, Brain, Sparkles } from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Stories that ignite imagination",
    icon: Sparkles,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    name: "Non-Fiction",
    description: "Knowledge and real stories",
    icon: Lightbulb,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    name: "Romance",
    description: "Tales of love and passion",
    icon: Heart,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    name: "Adventure",
    description: "Thrilling journeys await",
    icon: Compass,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    name: "Self-Help",
    description: "Grow and transform",
    icon: Brain,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    name: "Classics",
    description: "Timeless literary works",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find your perfect read from our diverse collection of genres.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} to={`/books?category=${category.name.toLowerCase()}`}>
                <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.bgColor} mb-4`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
