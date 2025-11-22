"use client";

import Link from "next/link";
import { Post } from "@/lib/db";
import { Calendar, Tag as TagIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function PostCard({ post }: { post: Post }) {
    return (
        <motion.article
            className="group relative flex flex-col h-full rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image */}
            <div className="relative h-56 w-full bg-muted overflow-hidden">
                {post.image ? (
                    <>
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/30">
                            {post.title.charAt(0)}
                        </span>
                    </div>
                )}
                {post.category && (
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                            {post.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 space-y-3 p-6">
                <h2 className="text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex items-center gap-1.5">
                                <TagIcon className="h-4 w-4" />
                                {post.tags[0]}
                                {post.tags.length > 1 && ` +${post.tags.length - 1}`}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Read
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <span className="sr-only">View Article</span>
            </Link>
        </motion.article>
    );
}
