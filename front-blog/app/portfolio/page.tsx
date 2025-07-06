import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

type Project = {
  title: string,
  description: string,
  technologies: string[],
  image: string
  featured: boolean,
  githubUrl: string,
  liveUrl?: string
}

const projects: Project[] = [
  {
    title: "PortfolioLab",
    description:
      "Mini CMS spécialisé dans la rédaction de CVs et portfolios étudiants",
    image: "https://storage.googleapis.com/bucket-blog-app/pflab.webp",
    technologies: ["React", "Express", "MongoDB"],
    githubUrl: "https://github.com/cedric-champeix/PortfolioLab_Frontend",
    featured: true,
  },
]

export default function PortfolioPage() {
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Mon portfolio</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Une petite collection de projet qui m'ont formé et forgé.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Projets stylés</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    priority
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">

                    {
                      project.liveUrl ?
                        <Button variant="secondary" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Démo
                          </a>
                        </Button>
                        :
                        <span></span>
                    }

                    <Button variant="secondary" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
