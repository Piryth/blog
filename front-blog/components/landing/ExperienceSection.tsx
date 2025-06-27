import Experience from "@/components/landing/Experience";

const experiences = [
  {
    dates: "2024 - Present",
    company: "Boulanger",
    job: "Java developer (apprenticeship)",
    description: "I develop efficient microservices for after sale, insurance and human resources department of my company.",
    imageUrl: "https://images.seeklogo.com/logo-png/35/2/boulanger-logo-png_seeklogo-351731.png"
  },
  {
    dates: "2024 - 2025",
    company: "Self employed",
    job: "Notion creator and consultant",
    description: "I allied my knowledge in Notion ecosystem and in engineering to create impactful Notion templates and dashboards",
  },
  {
    dates: "2023 - 2023",
    company: "CHU Grenoble Alpes",
    job: "PHP Developer",
    description: "I migrated a laboratory application from PHP5 to PHP8, and set up a clean architecture for maintainability",
    imageUrl: "https://www.chu-grenoble.fr/themes/project/img/svg/logo_chu_grenoble.svg"
  }
]

export default function ExperienceSection() {

  return (
    <section className="container mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-12 text-center">Experience</h2>

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
