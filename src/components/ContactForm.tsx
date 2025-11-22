"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) throw new Error();

            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            setStatus("error");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none">
                    Message
                </label>
                <textarea
                    id="message"
                    placeholder="Your message..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>

            <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full"
            >
                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
            </Button>

            {status === "success" && (
                <div className="p-4 text-sm text-green-600 bg-green-50 rounded-md border border-green-200">
                    Thank you for your message! We'll get back to you soon.
                </div>
            )}
            {status === "error" && (
                <div className="p-4 text-sm text-destructive bg-red-50 rounded-md border border-red-200">
                    Something went wrong. Please try again.
                </div>
            )}
        </form>
    );
}
