import {Button} from "@/components/ui/button"
import Link from "next/link"
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ExperienceSection from "@/components/landing/ExperienceSection";
import ServicesSection from "@/components/landing/ServicesSection";
import FeaturedWork from "@/components/landing/FeaturedWorkSection";
import LatestArticles from "@/components/landing/LatestArticlesSection";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-white dark:bg-slate-900">

        <HeroSection></HeroSection>
        <AboutSection></AboutSection>
        <ExperienceSection></ExperienceSection>
        <ServicesSection></ServicesSection>
        <FeaturedWork></FeaturedWork>
        <LatestArticles></LatestArticles>

        {/* Contact CTA */}
        <section className="container mx-auto px-4 py-24 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-6">Let's Work Together</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              I'm always interested in new opportunities and collaborations. Let's discuss how we can bring your ideas
              to
              life.
            </p>
            <Button asChild variant="outline">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </section>
      </div>
  )
}
