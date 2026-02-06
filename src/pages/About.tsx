import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Target, Heart, Award, Globe, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getPageContent } from "@/lib/cms";

// Default content fallback
const defaultContent = {
  hero: {
    title: "About STNBETE Global",
    subtitle: "For over 15 years, we have been on a mission to connect readers with stories that inspire, educate, and transform."
  },
  mission: {
    title: "Our Mission",
    description: "To create a sanctuary where book lovers can discover, discuss, and share their passion for reading.",
    stats: {
      readers: "2k+",
      books: "500+",
      years: "15"
    }
  },
  story: {
    title: "Our Story - From Small Beginnings",
    description: "STNBETE Global started as a small corner shop in 2008... What began as a modest collection has grown into a comprehensive library."
  },
  values: [
    {
      title: "Passion for Literature",
      description: "Every book we curate reflects our deep love for storytelling."
    },
    {
      title: "Community First",
      description: "We build connections between readers, authors, and book lovers."
    },
    {
      title: "Quality Selection",
      description: "Our expert team carefully selects each title."
    },
    {
      title: "Accessible Reading",
      description: "We believe everyone deserves access to great literature."
    }
  ],
  team: [
    {
      name: "Saturday T. Nbete",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      name: "Sarah Williams",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    }
  ]
};

const About = () => {
  const [content, setContent] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pageData = await getPageContent('/about');
        if (pageData && pageData.content) {
          // Merge with default to ensure structure exists
          setContent((prev: any) => ({ ...prev, ...pageData.content }));
        }
      } catch (error) {
        console.error("Failed to load about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const valuesIcons: any = {
    "Passion for Literature": Heart,
    "Community First": Users,
    "Quality Selection": Target,
    "Accessible Reading": Globe
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center bg-gradient-to-br from-background via-brand-ivory to-white dark:from-background dark:via-gray-900/50 dark:to-gray-900/30 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy/10 dark:bg-brand-navy/30 mb-6">
                <BookOpen className="h-8 w-8 text-brand-navy dark:text-brand-purple" />
              </div>
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
                {content.hero?.label || "Our Story"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight mb-6 whitespace-pre-line">
                {content.hero.title}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-brand-navy rounded-full"></div>
                  <span>{content.hero?.est_label || "Est. 2008"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-brand-navy rounded-full"></div>
                  <span>{content.hero?.exp_label || "15+ Years Experience"}</span>
                </div>
              </div>
            </div>

            {/* Right Content - Mission Statement */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 border border-brand-navy/10 shadow-lg">
                <h3 className="text-xl font-medium text-brand-navy dark:text-white mb-4">{content.mission?.title || "Our Mission"}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {content.mission?.description}
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-light text-brand-navy dark:text-white mb-1">{content.mission?.stats?.readers_count || "2k+"}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{content.mission?.stats?.readers_label || "Readers"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-brand-navy dark:text-white mb-1">{content.mission?.stats?.books_count || "500+"}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{content.mission?.stats?.books_label || "Books"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-brand-navy dark:text-white mb-1">{content.mission?.stats?.years_count || "15"}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{content.mission?.stats?.years_label || "Years"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-brand-ivory/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-brand-brown font-medium text-sm uppercase tracking-wider">
              {content.story?.label || "Our Journey"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy mt-3 mb-6">
              {content.story?.title}
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>{content.story?.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white dark:bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-4">
              {content.values_header?.title || "Our Values"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content.values_header?.subtitle || "These core principles guide everything we do at STNBETE Global."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values?.map((value: any, index: number) => {
              const Icon = valuesIcons[value.title] || Heart;
              return (
                <Card key={index} className="text-center border-brand-navy/10 hover:border-brand-navy/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-ivory mb-4">
                      <Icon className="h-7 w-7 text-brand-brown" />
                    </div>
                    <h3 className="font-semibold text-brand-navy dark:text-white mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-brand-ivory/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mb-4">
              {content.team_header?.title || "Meet Our Team"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content.team_header?.subtitle || "The passionate individuals behind STNBETE Global."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto justify-center">
            {content.team?.map((member: any, index: number) => (
              <Card key={index} className="overflow-hidden border-border bg-white dark:bg-card">
                <div className="aspect-square overflow-hidden bg-brand-navy/5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-brand-navy dark:text-white text-lg">{member.name}</h3>
                  <p className="text-brand-brown font-medium text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-brand-navy">
        <div className="container mx-auto text-center">
          <Award className="h-12 w-12 text-brand-purple mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Reading Community
          </h2>
          <p className="text-brand-ivory/80 text-lg max-w-2xl mx-auto">
            Connect with fellow book lovers, attend author events, and be the first
            to know about new releases and exclusive offers.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
