import { Metadata } from "next";
import AboutContent from "./About";

export const metadata: Metadata = {
  title: "About - Unfoldlogic",
  description: "Learn more about Unfoldlogic and our mission."
};

export default function AboutPage() {
  return <AboutContent />;
}
