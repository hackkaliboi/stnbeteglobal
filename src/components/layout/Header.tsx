import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Books", href: "/books" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const openAuthModal = (tab: "login" | "signup") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || isMenuOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-lg font-medium tracking-tight text-foreground z-50 relative"
            >
              stnbeteglobal
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors relative",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-foreground" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Cart">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <ThemeToggle />

              {/* Authentication */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse ml-2" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                        <AvatarFallback>{getUserInitials(user.user_metadata?.full_name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.user_metadata?.full_name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <span className="mr-2 text-xs">⚙️</span>
                        <span>Admin</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Button variant="ghost" size="sm" onClick={() => openAuthModal("login")}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => openAuthModal("signup")}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-md transition-colors z-50 relative"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            <nav className="flex flex-col p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "py-4 text-lg transition-colors border-b border-border/20 last:border-b-0",
                    location.pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-4 pt-6 mt-4 border-t border-border/20">
                <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Search">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Cart">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <ThemeToggle />
              </div>

              {/* Mobile Authentication */}
              <div className="pt-4 mt-4 border-t border-border/20">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                        <AvatarFallback>{getUserInitials(user.user_metadata?.full_name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <span className="mr-2 text-xs">⚙️</span>
                          Admin
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => openAuthModal("login")} className="w-full">
                      Sign In
                    </Button>
                    <Button variant="outline" onClick={() => openAuthModal("signup")} className="w-full">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default Header;