import { Badge } from "@/components/ui/badge"
import { MapPin, Mail } from "lucide-react"

export default function AboutSection() {
    return (
        <section className="container mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-12 text-center">À propos</h2>

                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6">À propos</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                          Actuellement étudiant à l'IMT Nord Europe (Lille) et développeur Java chez Boulanger, je suis aussi étudiant entrepreneur.
                          Je crée des logiciels indépendants et à fort impact, qui correspondent à mes valeurs.
                        </p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-400">Lille, France</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-400">arnaud@endignous.fr</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6">Mon stack technologique</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">Frontend</p>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "Vue.Js", "TypeScript", "Tailwind CSS"].map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">Backend</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Spring Boot", "Golang", "PostgreSQL", "MongoDB"].map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">Divers</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Git", "Docker", "Kubernetes"].map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
