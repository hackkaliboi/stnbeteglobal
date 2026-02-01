import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, MoreHorizontal, Eye, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PostFormModal } from "@/components/admin/PostFormModal";

const AdminPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [postToEdit, setPostToEdit] = useState<any>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { posts, loading, error, deletePost } = useBlogPosts();
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await deletePost(postToDelete);
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Posts</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground">Create and manage blog content</p>
          </div>
          <Button onClick={() => setIsFormModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading posts...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Badges</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {searchQuery ? "No posts found matching your search." : "No posts available."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium max-w-xs">
                            <div className="truncate" title={post.title}>
                              {post.title}
                            </div>
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {post.featured && (
                              <Badge variant="outline" className="text-xs">Featured</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setPostToEdit(post);
                                    setIsFormModalOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setPostToDelete(post.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Post Form Modal */}
      <PostFormModal
        open={isFormModalOpen}
        onOpenChange={(open) => {
          setIsFormModalOpen(open);
          if (!open) setPostToEdit(null);
        }}
        post={postToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminPosts;
