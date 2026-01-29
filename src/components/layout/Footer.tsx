import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-lg font-medium tracking-tight text-foreground">
              BookHaven
            </Link>
            <p className="text-muted-foreground text-sm mt-4 max-w-sm leading-relaxed">
              Curated books for curious minds. Discover your next favorite read from our collection of bestsellers and classics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/books" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                Books
              </Link>
              <Link to="/blog" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                Blog
              </Link>
              <Link to="/about" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-foreground">hello@bookhaven.com</p>
              <p className="text-foreground">+1 (234) 567-8900</p>
              <p className="text-muted-foreground">
                123 Book Street<br />
                Reading City, RC 12345
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
