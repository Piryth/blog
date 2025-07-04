import { Code, Bot, Zap } from "lucide-react"

export default function ServicesSection() {
  return (
    <section className="container mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-12 text-center">Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Développement</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Applications & Scalabilité
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Automatisations</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Réinventez vos workflows et processus
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Optimisation</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Optimisation des performances, du SEO et de l'accessibilité
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
