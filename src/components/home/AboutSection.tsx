import { BookOpen, Users, Award, Heart } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "10,000+", label: "Books" },
  { icon: Users, value: "50,000+", label: "Happy Readers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Heart, value: "100%", label: "Passion" },
];

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              More Than Just a Bookstore
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded with a passion for literature, BookHaven has been connecting 
                readers with their perfect books for over 15 years. We believe that 
                every book has the power to transform lives, spark imagination, and 
                build bridges between worlds.
              </p>
              <p>
                Our carefully curated collection spans across genres, from timeless 
                classics to contemporary bestsellers. Whether you're seeking adventure, 
                wisdom, romance, or mystery, you'll find your next great read here.
              </p>
              <p>
                Beyond selling books, we're committed to nurturing a community of 
                passionate readers through author events, book clubs, and literary 
                discussions.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-secondary rounded-lg p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
