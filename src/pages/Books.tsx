import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import BookCard, { Book } from "@/components/books/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample books data
const allBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Creative Writing",
    author: "Sarah Mitchell",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "Writing",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "2",
    title: "Journey Through Time",
    author: "Michael Chen",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "Fiction",
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "3",
    title: "Mindful Living",
    author: "Emma Thompson",
    price: 16.99,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "Self-Help",
    isNew: true,
    isBestseller: true,
    inStock: true,
  },
  {
    id: "4",
    title: "The Silent Observer",
    author: "James Wilson",
    price: 21.99,
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    category: "Mystery",
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "5",
    title: "Ocean's Whisper",
    author: "Lisa Park",
    price: 18.99,
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    category: "Romance",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "6",
    title: "The Entrepreneur's Guide",
    author: "Robert Blake",
    price: 29.99,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    category: "Business",
    isNew: false,
    isBestseller: true,
    inStock: false,
  },
  {
    id: "7",
    title: "Stars Beyond",
    author: "Maria Santos",
    price: 22.99,
    coverImage: "https://images.unsplash.com/photo-1518744386442-2d48ac47a0e0?w=400&h=600&fit=crop",
    category: "Science Fiction",
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: "8",
    title: "Cooking with Love",
    author: "Chef Antonio",
    price: 34.99,
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    category: "Cooking",
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
];

const categories = ["All", "Fiction", "Non-Fiction", "Romance", "Mystery", "Self-Help", "Business", "Science Fiction", "Cooking"];

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredBooks = allBooks
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <MainLayout>
      <div className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">
            Browse through our extensive catalog of handpicked books for every reader.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="title">Title: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "All" || searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("All")}>
                {selectedCategory} ×
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                "{searchQuery}" ×
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
              Clear all
            </Button>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No books found matching your criteria.
            </p>
            <Button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Books;
