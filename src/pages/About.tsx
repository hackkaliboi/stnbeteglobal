import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Target, Heart, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Literature",
    description: "Every book we curate reflects our deep love for storytelling and the written word.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We build connections between readers, authors, and book lovers from all walks of life.",
  },
  {
    icon: Target,
    title: "Quality Selection",
    description: "Our expert team carefully selects each title to ensure only the best reaches your hands.",
  },
  {
    icon: Globe,
    title: "Accessible Reading",
    description: "We believe everyone deserves access to great literature, regardless of background.",
  },
];

const team = [
  {
    name: "Alexandra Reed",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Head of Curation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Williams",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <div className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            About BookHaven
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we've been on a mission to connect readers with stories that 
            inspire, educate, and transform. Welcome to our world of books.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                From Small Beginnings to a Beloved Community
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  BookHaven started as a small corner shop in 2008, born from the dream of 
                  creating a space where book lovers could discover, discuss, and share their 
                  passion for reading.
                </p>
                <p>
                  What began as a modest collection of 500 titles has grown into a comprehensive 
                  library of over 10,000 carefully selected books spanning every genre imaginable. 
                  Our journey has been fueled by the countless readers who have walked through 
                  our doors and trusted us with their literary adventures.
                </p>
                <p>
                  Today, we're proud to serve readers both locally and online, continuing our 
                  tradition of personalized recommendations and exceptional customer service 
                  that has made us a beloved destination for book enthusiasts.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop"
                    alt="Library interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=400&h=400&fit=crop"
                    alt="Reading corner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop"
                    alt="Books on shelf"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop"
                    alt="Stack of books"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These core principles guide everything we do at BookHaven.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="text-center border-border">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate individuals behind BookHaven's success.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden border-border">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Join Our Reading Community
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Connect with fellow book lovers, attend author events, and be the first 
            to know about new releases and exclusive offers.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
