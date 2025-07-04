import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FeaturedWork() {
  return (
    <section className="container mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-light text-slate-900 dark:text-white">Mon travail en exemples</h2>
          <Button variant="ghost" asChild>
            <Link href="/portfolio" className="text-sm">
              Voir le reste <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="group">
              <div className="relative h-60 overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Image
                  src="https://storage.googleapis.com/bucket-blog-app/pflab.webp"
                  alt={`Portfolio Lab`}
                  fill
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">PortfolioLab</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 leading-relaxed">
                Mini CMS spécialisé dans la rédaction de CVs et portfolios étudiants
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  React
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Express
                </Badge>
                <Badge variant="outline" className="text-xs">
                  MongoDB
                </Badge>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}
