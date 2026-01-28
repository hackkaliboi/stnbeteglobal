import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">BookHaven</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Discover your next favorite read. We curate the finest collection of books 
              for every reader's journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/books" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Browse Books
              </Link>
              <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Blog & News
              </Link>
              <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Book Street, Reading City, RC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">hello@bookhaven.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Newsletter</h4>
            <p className="text-primary-foreground/80 text-sm">
              Subscribe for new releases and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
