import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

const links = {
    mail: "arnaud@endignous.fr",
    github: "https://github.com/Piryth",
    linkedin: "https://www.linkedin.com/in/arnaud-endignous/"
}

export default function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <Image
                        src="https://storage.googleapis.com/bucket-blog-app/1749797328343.webp"
                        alt="Profile"
                        width={164}
                        height={164}
                        priority
                        className="rounded-full mx-auto mb-6 shadow-[8px_7px_11px_2px_rgba(50,_50,50,_0.5)]"
                    />
                </div>
                <h1 className="text-4xl md:text-6xl font-light text-slate-900 dark:text-white mb-6">Arnaud Endignous 🇨🇵</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 font-light">Ingénieur logiciel & Artisan du Web</p>
                <p className="text-lg text-slate-500 dark:text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Je suis un ingénieur logiciel. Je crée des systèmes solides, scalables et performants.</p>

                <div className="flex justify-center gap-6 mb-16">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href={links.mail}>
                            <Mail className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
