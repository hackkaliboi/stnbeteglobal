import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand - Large */}
          <div className="lg:col-span-5">
            <Link to="/" className="text-2xl font-light tracking-tight text-foreground">
              stnbeteglobal
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
              Curated books for curious minds. Discover your next favorite read from our
              collection of bestsellers and timeless classics.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-8">
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-mono">
              Navigate
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

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-mono">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:hello@stnbeteglobal.com" className="block text-foreground hover:text-muted-foreground transition-colors">
                hello@stnbeteglobal.com
              </a>
              <a href="tel:+12345678900" className="block text-foreground hover:text-muted-foreground transition-colors">
                +1 (234) 567-8900
              </a>
              <p className="text-muted-foreground pt-2">
                123 Book Street<br />
                Reading City, RC 12345
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} stnbeteglobal
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
