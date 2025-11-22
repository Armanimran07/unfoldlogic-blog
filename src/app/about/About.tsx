"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Rocket,
    Users,
    Globe,
    Cpu,
    Zap,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutContent() {
    const features = [
        {
            icon: Code2,
            title: "Engineering Excellence",
            description: "We build robust, scalable software using cutting-edge technologies and best practices.",
            gradient: "from-purple-500 to-blue-500"
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Our digital solutions reach users worldwide, breaking barriers and connecting communities.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Cpu,
            title: "Innovation First",
            description: "Staying ahead of the curve with AI, Blockchain, and Web3 technologies.",
            gradient: "from-cyan-500 to-emerald-500"
        },
        {
            icon: Users,
            title: "User-Centric Design",
            description: "Creating intuitive and engaging experiences that delight users at every touchpoint.",
            gradient: "from-emerald-500 to-green-500"
        }
    ];

    const team = [
        {
            name: "Imran",
            role: "Lead Developer",
            image: "/placeholder-user.jpg" // You might want to replace this
        },
        // Add more team members as needed
    ];

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                </div>

                {/* Floating Orbs */}
                <motion.div
                    className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
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
                    className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
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
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                            We Are <br />
                            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                UnfoldLogic
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                            A team of passionate developers and designers dedicated to transforming ideas into
                            exceptional digital reality. We bridge the gap between complex technology and human experience.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-muted/30 relative">
                <div className="container px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                At UnfoldLogic, we believe that technology should be an enabler, not a barrier.
                                Our mission is to democratize access to advanced digital solutions, helping businesses
                                of all sizes thrive in the modern digital economy.
                            </p>
                            <p className="text-lg text-muted-foreground mb-8">
                                Whether it's building the next generation of Web3 applications or crafting pixel-perfect
                                marketing websites, we bring the same level of dedication and craftsmanship to every project.
                            </p>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-3xl font-bold text-primary">5+</h3>
                                    <span className="text-sm text-muted-foreground">Years Experience</span>
                                </div>
                                <div className="w-px bg-border" />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-3xl font-bold text-primary">100+</h3>
                                    <span className="text-sm text-muted-foreground">Projects Delivered</span>
                                </div>
                                <div className="w-px bg-border" />
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-3xl font-bold text-primary">24/7</h3>
                                    <span className="text-sm text-muted-foreground">Support</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-20" />
                            <div className="relative bg-card border border-border p-8 rounded-2xl shadow-xl">
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((feature, index) => (
                                        <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3`}>
                                                <feature.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h4 className="font-semibold mb-1">{feature.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">What Drives Us</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Core values that define our culture and the way we work
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10" />
                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Let's collaborate to bring your vision to life. Whether it's a new venture or
                            scaling an existing product, we're here to help.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-105"
                        >
                            Get in Touch
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
