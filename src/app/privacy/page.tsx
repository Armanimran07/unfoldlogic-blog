"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container px-4 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-12 text-lg">
                        Last Updated: November 29, 2025
                    </p>

                    <div className="prose prose-invert max-w-none space-y-8">
                        <section>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                UnfoldLogic is committed to protecting your personal information and your right to privacy.
                                This Privacy Policy outlines how we collect, use, store, and safeguard the data you share with us through our website and services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Personal details such as name, email, phone number, and address when voluntarily provided.</li>
                                <li>Technical information collected automatically, including IP address, browser type, device details, and usage data.</li>
                                <li>Project-related information such as requirements, files, and communication details.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                            <p className="text-muted-foreground">We use the collected information to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Provide and improve our services</li>
                                <li>Respond to enquiries</li>
                                <li>Process project requirements</li>
                                <li>Send updates, invoices, or notifications</li>
                                <li>Maintain website security and analytics</li>
                            </ul>
                            <p className="text-muted-foreground font-medium">We do NOT sell your data to any third party.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">3. Cookies and Tracking</h2>
                            <p className="text-muted-foreground">
                                We use cookies to enhance user experience, track usage, and analyze performance.
                                You can disable cookies from your browser settings.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">4. Sharing of Information</h2>
                            <p className="text-muted-foreground">Your data may be shared with:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Service providers (hosting, analytics, email)</li>
                                <li>Payment processors</li>
                                <li>Legal authorities, only if required by law</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">5. Data Security</h2>
                            <p className="text-muted-foreground">
                                We follow industry-standard security practices to protect your information.
                                However, no method of transmission over the internet is fully secure.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">6. Your Rights</h2>
                            <p className="text-muted-foreground">
                                You may request access, correction, or deletion of your data by contacting us at <a href="mailto:unfoldloogic@gmail.com" className="text-primary hover:underline">unfoldloogic@gmail.com</a>.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">7. Third-Party Links</h2>
                            <p className="text-muted-foreground">
                                Our website may contain external links. We are not responsible for the privacy practices of those sites.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">8. Children’s Privacy</h2>
                            <p className="text-muted-foreground">
                                We do not knowingly collect data from individuals under 16 years of age.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">9. Changes to This Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this Privacy Policy occasionally.
                                The updated version will be posted on this page.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">10. Contact Us</h2>
                            <p className="text-muted-foreground">If you have any questions, contact us at:</p>
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
