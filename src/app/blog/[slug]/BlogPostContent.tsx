"use client";
"use client";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Calendar, Tag as TagIcon, ArrowLeft, User, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Post } from "@/lib/db";
import { PostCard } from "@/components/PostCard";

export function BlogPostContent({ post, recommendations }: { post: Post; recommendations: Post[] }) {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section with Gradient */}
            <div className="relative py-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                </div>

                <div className="container max-w-4xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {post.category && (
                            <div className="mb-6">
                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 px-4 py-1.5 text-sm font-medium text-primary">
                                    {post.category}
                                </span>
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <User className="h-4 w-4 text-primary" />
                                </div>
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <Calendar className="h-4 w-4 text-primary" />
                                </div>
                                <span>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <Clock className="h-4 w-4 text-primary" />
                                </div>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container max-w-4xl mx-auto px-4 -mt-20 relative z-20">
                {/* Featured Image */}
                {post.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="rounded-2xl overflow-hidden shadow-2xl border border-border mb-12 bg-card"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="prose prose-lg dark:prose-invert max-w-none bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm"
                >
                    <MarkdownRenderer content={post.content} />
                </motion.div>

                {/* Tags Footer */}
                {post.tags && post.tags.length > 0 && (
                    <motion.footer
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 mb-20"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <TagIcon className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold">Related Tags</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors px-4 py-2 text-sm font-medium cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.footer>
                )}

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 mb-20 border-t border-border pt-16"
                    >
                        <h2 className="text-3xl font-bold mb-8">Read Next</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendations.map((recPost) => (
                                <PostCard key={recPost.id} post={recPost} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
