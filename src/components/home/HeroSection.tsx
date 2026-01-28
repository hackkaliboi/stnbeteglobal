import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-bookstore.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cozy bookstore interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-accent" />
            <span className="text-accent font-medium">Welcome to BookHaven</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Discover Stories That <span className="text-accent">Inspire</span>
          </h1>
          
          <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 leading-relaxed">
            Explore our curated collection of bestsellers, new releases, and timeless 
            classics. Find your next adventure between the pages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/books">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                Browse Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
