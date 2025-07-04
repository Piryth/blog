import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Arnaud Endignous</h3>
            <p className="text-sm text-muted-foreground">
              Ingénieur logiciel & Artisan du Web| construire des expériences numériques inoubliables.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/Piryth" aria-label="Visitez mon profil Github" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/arnaud-endignous" aria-label="Visitez mon profil LinkedIn" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:arnaud@endignous.fr" aria-label="Contactez moi par email" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Développement Web</li>
              <li className="text-muted-foreground">Backend / API design</li>
              <li className="text-muted-foreground">Automatisation business</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">arnaud@endignous.fr</li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Me contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Arnaud Endignous. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
