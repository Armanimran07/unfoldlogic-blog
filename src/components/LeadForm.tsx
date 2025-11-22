"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function LeadForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error();

            setStatus("success");
            setEmail("");

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading" || status === "success"}
                        className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm pl-11 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    />
                </div>
                <motion.button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    whileHover={{ scale: status === "loading" || status === "success" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "loading" || status === "success" ? 1 : 0.98 }}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-w-[140px]"
                >
                    {status === "loading" && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    )}
                    {status === "success" && (
                        <CheckCircle2 className="h-5 w-5" />
                    )}
                    {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {status === "success" && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-green-600 dark:text-green-400 text-center mt-3 flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Thank you for subscribing! Check your inbox.
                    </motion.p>
                )}
                {status === "error" && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-destructive text-center mt-3"
                    >
                        Something went wrong. Please try again.
                    </motion.p>
                )}
            </AnimatePresence>
        </form>
    );
}
