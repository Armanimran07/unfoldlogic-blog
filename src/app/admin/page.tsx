"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextareaAutosize from "react-textarea-autosize";
import {
    FileText,
    Image as ImageIcon,
    Tag,
    Eye,
    Save,
    Upload,
    List,
    ListOrdered,
    Quote,
    Minus,
    Table as TableIcon,
    Columns,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Captions,
    Heading as HeadingIcon,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    MousePointerClick,
    Clipboard,
    Users,
    MessageSquare
} from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export default function AdminDashboard() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [activeTab, setActiveTab] = useState("create");
    const [posts, setPosts] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [showHeadings, setShowHeadings] = useState(false);
    const [leads, setLeads] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const isAuth = document.cookie.includes("admin_auth=true");
        if (!isAuth) {
            router.push("/admin/login");
        }
    }, [router]);

    // Fetch posts when "manage" tab is active
    useEffect(() => {
        if (activeTab === "manage") {
            fetchPosts();
        } else if (activeTab === "leads") {
            fetchLeads();
        } else if (activeTab === "messages") {
            fetchMessages();
        }
    }, [activeTab]);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            const data = await res.json();
            if (Array.isArray(data)) {
                setLeads(data);
            } else {
                console.error("Leads data is not an array:", data);
                setLeads([]);
            }
        } catch (error) {
            console.error("Failed to fetch leads", error);
            setLeads([]);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                console.error("Messages data is not an array:", data);
                setMessages([]);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
            setMessages([]);
        }
    };

    // Auto-generate slug from title
    useEffect(() => {
        if (!editingId) { // Only auto-generate for new posts
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            setSlug(generatedSlug);
        }
    }, [title, editingId]);

    // Auto-generate excerpt if not provided
    useEffect(() => {
        if (!excerpt && content) {
            const plainText = content.replace(/[#*`]/g, "").substring(0, 150);
            setExcerpt(plainText + (content.length > 150 ? "..." : ""));
        }
    }, [content, excerpt]);

    // Handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            let finalImageUrl = imageUrl;

            // Upload image if a file is selected
            if (imageFile) {
                const { uploadImage } = await import("@/lib/supabase");
                const uploadedUrl = await uploadImage(imageFile);
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                } else {
                    throw new Error("Failed to upload image");
                }
            }

            // Fallback to placeholder if no image provided
            if (!finalImageUrl) {
                finalImageUrl = "/placeholder-blog.jpg";
            }

            const tagArray = tags.split(",").map(t => t.trim()).filter(Boolean);

            const payload: any = {
                title,
                slug,
                content,
                excerpt: excerpt || content.substring(0, 150) + "...",
                category,
                tags: tagArray,
                image: finalImageUrl
            };

            if (editingId) {
                payload.id = editingId;
            }

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error();

            setStatus("success");
            // Reset form
            resetForm();
            setTimeout(() => setStatus("idle"), 2000);

            // If we were editing, switch back to manage tab
            if (editingId) {
                setTimeout(() => setActiveTab("manage"), 1000);
            }
        } catch (error) {
            console.error("Error saving post:", error);
            setStatus("error");
        }
    };

    const resetForm = () => {
        setTitle("");
        setSlug("");
        setContent("");
        setExcerpt("");
        setCategory("");
        setTags("");
        setImageUrl("");
        setImageFile(null);
        setImagePreview("");
        setEditingId(null);
    };

    const handleEdit = (post: any) => {
        setTitle(post.title);
        setSlug(post.slug);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCategory(post.category || "");
        setTags(post.tags?.join(", ") || "");
        setImageUrl(post.image || "");
        setEditingId(post.id);
        setActiveTab("create");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/posts?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchPosts(); // Refresh list
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // Markdown formatting helpers
    const insertMarkdown = (before: string, after: string = "") => {
        const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);

        setContent(newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    const handleContentImageUpload = () => {
        document.getElementById('content-image-upload')?.click();
    };

    const onContentImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        await uploadAndInsertImage(file);
        // Reset the input so the same file can be selected again if needed
        e.target.value = "";
    };

    const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                e.preventDefault();
                const file = items[i].getAsFile();
                if (file) {
                    await uploadAndInsertImage(file);
                }
                return;
            }
        }
    };

    const handlePasteClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                insertMarkdown(text);
            }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            alert("Failed to read clipboard. Please allow clipboard access.");
        }
    };

    const uploadAndInsertImage = async (file: File) => {
        setIsUploading(true);
        try {
            const { uploadImage } = await import("@/lib/supabase");
            const url = await uploadImage(file);
            if (url) {
                // Use HTML img tag to support resizing
                insertMarkdown(`<img src="${url}" alt="Image" width="100%" />`);
            } else {
                alert("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image");
        } finally {
            setIsUploading(false);
        }
    };

    const insertTable = () => {
        const tableTemplate = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;
        insertMarkdown(tableTemplate);
    };

    const wrapSelection = (before: string, after: string) => {
        insertMarkdown(before, after);
    };

    const insertAlignment = (align: 'left' | 'center' | 'right' | 'justify') => {
        wrapSelection(`<div style="text-align: ${align}">`, '</div>');
    };

    const insertCaption = () => {
        wrapSelection('<figure>', '\n  <figcaption>Caption here</figcaption>\n</figure>');
    };

    return (
        <div className="container py-10 max-w-6xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your blog content</p>
                </div>
                <Button
                    onClick={() => { resetForm(); setActiveTab("create"); }}
                    variant={activeTab === "create" && !editingId ? "default" : "outline"}
                >
                    <FileText className="mr-2 h-4 w-4" />
                    New Post
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="create">
                        {editingId ? "Edit Post" : "Create Post"}
                    </TabsTrigger>
                    <TabsTrigger value="manage">Manage Posts</TabsTrigger>
                    <TabsTrigger value="leads">Leads</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 border p-6 rounded-lg bg-card">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Enter your post title..."
                                    className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-lg font-semibold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    URL Slug {editingId ? "(editable)" : "(auto-generated)"}
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm"
                                />
                            </div>

                            {/* Markdown Toolbar */}
                            <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-sm flex items-center gap-2 p-3 rounded-lg border flex-wrap shadow-md -mx-1 mb-4">
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")} title="Bold"><strong>B</strong></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")} title="Italic"><em>I</em></Button>
                                <div className="w-px h-4 bg-border mx-1" />
                                <div className="relative">
                                    <Button
                                        type="button"
                                        variant={showHeadings ? "secondary" : "ghost"}
                                        size="sm"
                                        onClick={() => setShowHeadings(!showHeadings)}
                                        title="Headings"
                                    >
                                        <HeadingIcon className="h-4 w-4" />
                                    </Button>

                                    {showHeadings && (
                                        <div className="absolute top-full left-0 mt-1 p-1 bg-popover border rounded-md shadow-md z-50 flex flex-col gap-1 min-w-[120px]">
                                            <Button type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { insertMarkdown("# ", ""); setShowHeadings(false); }}>
                                                <Heading1 className="h-4 w-4 mr-2" /> Heading 1
                                            </Button>
                                            <Button type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { insertMarkdown("## ", ""); setShowHeadings(false); }}>
                                                <Heading2 className="h-4 w-4 mr-2" /> Heading 2
                                            </Button>
                                            <Button type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { insertMarkdown("### ", ""); setShowHeadings(false); }}>
                                                <Heading3 className="h-4 w-4 mr-2" /> Heading 3
                                            </Button>
                                            <Button type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { insertMarkdown("#### ", ""); setShowHeadings(false); }}>
                                                <Heading4 className="h-4 w-4 mr-2" /> Heading 4
                                            </Button>
                                            <Button type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { insertMarkdown("##### ", ""); setShowHeadings(false); }}>
                                                <Heading5 className="h-4 w-4 mr-2" /> Heading 5
                                            </Button>
                                            <Button type="button" variant="ghost" size="sm" className="justify-start" onClick={() => { insertMarkdown("###### ", ""); setShowHeadings(false); }}>
                                                <Heading6 className="h-4 w-4 mr-2" /> Heading 6
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="w-px h-4 bg-border mx-1" />
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertAlignment('left')} title="Align Left"><AlignLeft className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertAlignment('center')} title="Align Center"><AlignCenter className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertAlignment('right')} title="Align Right"><AlignRight className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertAlignment('justify')} title="Justify"><AlignJustify className="h-4 w-4" /></Button>
                                <div className="w-px h-4 bg-border mx-1" />
                                <Button type="button" variant="ghost" size="sm" onClick={insertCaption} title="Image Caption"><Captions className="h-4 w-4" /></Button>
                                <div className="w-px h-4 bg-border mx-1" />
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("- ")} title="Bullet List"><List className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("1. ")} title="Numbered List"><ListOrdered className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("> ")} title="Quote"><Quote className="h-4 w-4" /></Button>
                                <div className="w-px h-4 bg-border mx-1" />
                                <Button type="button" variant="ghost" size="sm" onClick={insertTable} title="Table"><TableIcon className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("---\n")} title="Horizontal Rule"><Minus className="h-4 w-4" /></Button>
                                <div className="w-px h-4 bg-border mx-1" />
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("[", "](url)")} title="Link">🔗</Button>
                                <Button type="button" variant="ghost" size="sm" onClick={handleContentImageUpload} disabled={isUploading} title="Upload Image">
                                    {isUploading ? <span className="animate-spin">⏳</span> : <ImageIcon className="h-4 w-4" />}
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("[", "](url#cta)")} title="Call to Action Button">
                                    <MousePointerClick className="h-4 w-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={handlePasteClick} title="Paste Text">
                                    <Clipboard className="h-4 w-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("```\n", "\n```")} title="Code Block">{"</>"}</Button>
                                {/* Hidden input for content image upload */}
                                <input type="file" id="content-image-upload" className="hidden" accept="image/*" onChange={onContentImageSelected} />
                            </div>

                            {/* Content Editor & Preview */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">Content (Markdown supported)</label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="gap-2"
                                    >
                                        <Columns className="h-4 w-4" />
                                        {showPreview ? "Hide Preview" : "Show Preview"}
                                    </Button>
                                </div>

                                <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : ''}`}>
                                    <div className="space-y-2">
                                        <TextareaAutosize
                                            name="content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            onPaste={handlePaste}
                                            required
                                            minRows={20}
                                            placeholder="Write your post content here... You can use Markdown formatting. Paste images directly!"
                                            className="flex w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none font-mono"
                                        />
                                    </div>

                                    {showPreview && (
                                        <div className="border rounded-lg p-6 bg-card overflow-y-auto max-h-[600px] prose-sm">
                                            <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider border-b pb-2">
                                                Live Preview
                                            </div>
                                            <MarkdownRenderer content={content || "*Start writing to see preview...*"} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Meta & Media */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Category</label>
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="e.g., Technology"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Tags</label>
                                        <input
                                            type="text"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            placeholder="react, nextjs"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Featured Image</label>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => document.getElementById('image-upload')?.click()}
                                                    className="w-full"
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload Image
                                                </Button>
                                                <input
                                                    id="image-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />
                                            </div>

                                            <div className="text-center text-sm text-muted-foreground">OR</div>

                                            <input
                                                type="url"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                                placeholder="Enter Image URL directly..."
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            />
                                        </div>

                                        {imagePreview && (
                                            <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border">
                                                <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={() => {
                                                        setImageFile(null);
                                                        setImagePreview("");
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Excerpt</label>
                                        <textarea
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            rows={3}
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center gap-4 pt-6 border-t">
                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="flex items-center gap-2"
                                size="lg"
                            >
                                <Save className="h-4 w-4" />
                                {status === "loading" ? "Saving..." : (editingId ? "Update Post" : "Publish Post")}
                            </Button>

                            {status === "success" && (
                                <div className="text-sm text-green-600 font-medium">
                                    ✓ Post saved successfully!
                                </div>
                            )}
                            {status === "error" && (
                                <div className="text-sm text-destructive font-medium">
                                    ✗ Failed to save post
                                </div>
                            )}
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="manage">
                    <div className="grid gap-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No posts found. Create your first post!
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow">
                                    <div className="flex items-center gap-4">
                                        {post.image && (
                                            <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-md" />
                                        )}
                                        <div>
                                            <h3 className="font-semibold">{post.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>{post.category || "Uncategorized"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                                            Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="leads">
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-card">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-muted-foreground">No leads found</td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-muted/50">
                                            <td className="px-6 py-4">{new Date(lead.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-medium">{lead.name || "-"}</td>
                                            <td className="px-6 py-4">{lead.email}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="messages">
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-card">
                                {messages.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-muted-foreground">No messages found</td>
                                    </tr>
                                ) : (
                                    messages.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-muted/50">
                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(msg.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-medium whitespace-nowrap">{msg.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{msg.email}</td>
                                            <td className="px-6 py-4 min-w-[300px]">{msg.message}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
