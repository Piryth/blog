import {Button} from "@/components/ui/button"
import {ArrowRight, Calendar} from "lucide-react"
import Link from "next/link"
import {config} from "@/config"
import {logger} from "@/logger";

type Post = {
  title: string,
  content: string,
  description: string,
  slug: string,
  categories: string[]
  created_at: Date
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${config.apiUri}/api/v1/posts`, {
    headers: { 'x-api-key': config.apiKey },
  })
  logger.info("Fetching posts")

  if (!response.ok) {
    logger.error("Error while fetching articles ", response.status)
    return []
  }
  return await response.json()
}

export default async function LatestPosts() {

  const articlesData = await fetchPosts()
  logger.info(articlesData.length + " articles fetched")

  return <section className="container mx-auto px-4 py-16 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-light text-slate-900 dark:text-white">Derniers Articles</h2>
        <Button variant="ghost" asChild>
          <Link href="/blog" className="text-sm">
            View All <ArrowRight className="ml-2 h-4 w-4"/>
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        {articlesData.map((post, i) => (
          <article key={i} className="group border-b border-slate-200 dark:border-slate-800 pb-6 last:border-b-0">
            <Link href={"/blog/" + post.slug}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className="text-lg font-medium text-slate-900 dark:text-white mb-2 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{post.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <Calendar className="h-3 w-3"/>
                  {post.created_at.toString()}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
}
