import Experience from "@/components/landing/Experience";

const experiences = [
  {
    dates: "2024 - Present",
    company: "Boulanger",
    job: "Développeur Java (alternance)",
    description: "Je développe des microservices dans le secteur des assurances, SAV et RH.",
    imageUrl: "https://images.seeklogo.com/logo-png/35/2/boulanger-logo-png_seeklogo-351731.png"
  },
  {
    dates: "2024 - 2025",
    company: "Auto entrepreneur",
    job: "Créateur Notion",
    description: "J'ai allié mes connaissance de l'écosystème Notion avec mes compétences de développeur afin de créer des dashboards et templates Notion à fort impact.",
  },
  {
    dates: "2023 - 2023",
    company: "CHU Grenoble Alpes",
    job: "Développeur PHP (stage)",
    description: "J'ai migré une application de laboratoire de PHP5 et PHP8, en mettant en place une architecture propre et maintenable.",
    imageUrl: "https://www.chu-grenoble.fr/themes/project/img/svg/logo_chu_grenoble.svg"
  }
]

export default function ExperienceSection() {

  return (
    <section className="container mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-12 text-center">Expériences</h2>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <Experience key={index} job={experience.job} company={experience.company}
                        description={experience.description} dates={experience.dates}
                        imageUrl={experience.imageUrl}></Experience>
          ))}
        </div>
      </div>
    </section>
  )
}
