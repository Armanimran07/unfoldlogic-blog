"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container px-4 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground mb-12 text-lg">
                        Last Updated: November 29, 2025
                    </p>

                    <div className="prose prose-invert max-w-none space-y-8">
                        <section>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                By using the UnfoldLogic website and services, you agree to the following Terms of Service.
                                Please read them carefully.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground">
                                Accessing or using our website signifies your agreement to these Terms.
                                If you do not agree, please stop using the site immediately.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">2. Services Offered</h2>
                            <p className="text-muted-foreground">UnfoldLogic provides:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Web and app development</li>
                                <li>Custom software solutions</li>
                                <li>UI/UX design</li>
                                <li>Business consultation</li>
                                <li>Other digital services</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
                            <p className="text-muted-foreground">You agree NOT to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Engage in illegal or harmful activities</li>
                                <li>Upload viruses, malware, or harmful files</li>
                                <li>Infringe intellectual property rights</li>
                                <li>Attempt to breach or hack the system</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">4. Payments & Refunds</h2>
                            <p className="text-muted-foreground">
                                Payments must be completed as per the agreed terms.
                                Refunds are dependent on the project stage and contract.
                                Once significant work is delivered, refunds may not be applicable.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">5. Intellectual Property</h2>
                            <p className="text-muted-foreground">
                                All content, designs, code, and materials provided by UnfoldLogic remain our intellectual property unless stated otherwise.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
                            <p className="text-muted-foreground">We are not responsible for:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Data loss</li>
                                <li>Downtime from third-party services</li>
                                <li>Misuse of delivered products</li>
                            </ul>
                            <p className="text-muted-foreground">Liability is limited to the amount paid for the project.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">7. Project Timelines</h2>
                            <p className="text-muted-foreground">
                                Timelines depend on client responses, content delivery, and technical factors.
                                Delays from the client side extend deadlines.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">8. Termination</h2>
                            <p className="text-muted-foreground">We may suspend or terminate services if:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Terms are violated</li>
                                <li>Payments are overdue</li>
                                <li>Fraudulent activity is detected</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">9. Third-Party Services</h2>
                            <p className="text-muted-foreground">
                                We may use third-party APIs, tools, or hosts.
                                We are not liable for disruptions caused by those services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">10. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms are governed by the laws of India.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">11. Contact Information</h2>
                            <p className="text-muted-foreground">For legal or service-related queries, contact:</p>
                            <div className="bg-card border border-border rounded-lg p-6 mt-4">
                                <p className="text-muted-foreground">Email: <a href="mailto:unfoldloogic@gmail.com" className="text-primary hover:underline">unfoldloogic@gmail.com</a></p>
                                <p className="text-muted-foreground">Phone: <a href="tel:+919265069809" className="text-primary hover:underline">+91 92650 69809</a></p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
