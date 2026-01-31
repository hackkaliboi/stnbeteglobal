import MainLayout from "@/components/layout/MainLayout";
import ContactSection from "@/components/home/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <MainLayout>
      {/* Enhanced Hero Section */}
      <section className="min-h-[60vh] flex items-center bg-gradient-to-br from-background via-blue-50 to-blue-100 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
                Get In Touch
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95] tracking-tight mb-6">
                Contact
                <br />
                <span className="font-medium">Us</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll
                respond as soon as possible.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Quick Response</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Expert Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Book Consultations</span>
                </div>
              </div>
            </div>

            {/* Right Content - Contact Info */}
            <div className="lg:col-span-5">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-8 border border-border/50">
                <h3 className="text-xl font-medium text-foreground mb-6">Reach Out</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="text-foreground">hello@stnbeteglobal.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="text-foreground">+1 (234) 567-8900</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Hours</div>
                      <div className="text-foreground">Mon-Fri 9AM-6PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      Book a Consultation or Speaking Engagement
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Interested in booking the author for a speaking engagement, book signing,
                      or literary consultation? Fill out the contact form below with your request
                      details and we'll get back to you within 48 hours.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Typical response time: 24-48 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Map Placeholder */}
      <section className="h-64 md:h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Map Integration Coming Soon</p>
            <p className="text-sm text-muted-foreground mt-2">
              123 Book Street, Reading City, RC 12345
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
