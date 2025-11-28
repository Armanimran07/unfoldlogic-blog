"use client";

import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                </div>

                {/* Floating Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <MessageSquare className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">We'd love to hear from you</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                            Get in <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Have a question, project idea, or just want to say hello?
                            Fill out the form below and we'll get back to you shortly.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container px-4 pb-24 max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-20" />
                        <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Send className="w-5 h-5 text-primary" />
                                Send us a message
                            </h2>
                            <ContactForm />
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Our team is always ready to help you with your questions and inquiries.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { icon: Mail, title: "Email", value: "unfoldloogic@gmail.com", color: "text-purple-500", bg: "bg-purple-500/10" },
                                { icon: Phone, title: "Phone", value: "+91 92650 69809", color: "text-blue-500", bg: "bg-blue-500/10" },
                                { icon: MapPin, title: "Location", value: "Ahmedabad Gujarat", color: "text-cyan-500", bg: "bg-cyan-500/10" }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                                >
                                    <div className={`p-3 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-primary/10"
                        >
                            <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-2">Office Hours</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                                        Saturday - Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
