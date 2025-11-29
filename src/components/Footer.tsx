import Link from "next/link";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                UnfoldLogic
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
                            Exploring the frontiers of technology, design, and innovation.
                            Join us on our journey to unfold the logic behind the digital world.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="tel:+919265069809" className="hover:text-primary transition-colors">+91 92650 69809</a>
                            </li>
                            <li>
                                <a href="mailto:unfoldloogic@gmail.com" className="hover:text-primary transition-colors">unfoldloogic@gmail.com</a>
                            </li>
                            <li>Ahmedabad Gujarat</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        © {new Date().getFullYear()} UnfoldLogic. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by UnfoldLogic Team
                </div>
            </div>
        </footer>
    );
}
