import { getPostBySlug, getRecommendedPosts } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Calendar, Tag as TagIcon, ArrowLeft, User } from "lucide-react";
import { BlogPostContent } from "./BlogPostContent";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const recommendations = await getRecommendedPosts(slug);

    return <BlogPostContent post={post} recommendations={recommendations} />;
}

