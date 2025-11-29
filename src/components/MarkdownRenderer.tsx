"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h1:text-4xl prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-purple-600 prose-h1:bg-clip-text prose-h1:text-transparent
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:break-all
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
            prose-pre:bg-muted/50 prose-pre:border prose-pre:backdrop-blur-sm
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            break-words overflow-anywhere">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    a: ({ node, href, className, children, ...props }) => {
                        if (href?.endsWith("#cta")) {
                            return (
                                <span className="block my-8 not-prose flex justify-center">
                                    <Link
                                        href={href.replace("#cta", "")}
                                        className={cn(
                                            "relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
                                            "no-underline"
                                        )}
                                        {...props}
                                    >
                                        {children}
                                    </Link>
                                </span>
                            );
                        }

                        // Handle internal links
                        if (href?.startsWith("/")) {
                            return (
                                <Link href={href} className={className} {...props}>
                                    {children}
                                </Link>
                            );
                        }

                        return (
                            <a href={href} className={className} {...props}>
                                {children}
                            </a>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
