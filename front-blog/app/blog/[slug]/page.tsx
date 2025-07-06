import Link from "next/link"
import {Button} from "@/components/ui/button"
import {ArrowLeft, CalendarDays, User} from "lucide-react"
import {getMarkdownData} from "@/lib/markdown";
import {config} from "@/config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

type Article = {
  title: string,
  content: string,
  description: string,
  slug: string,
  categories: string[]
  created_at: Date
}

export default async function BlogPostPage({params}: BlogPostPageProps) {

  const {slug} = await params

  const response = await fetch(`${config.apiUri}/api/v1/posts/${slug}`,
    {method: "GET"})

  const postData: Article = await response.json();

  const content = await getMarkdownData(postData.content)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2"/>
                Back to Blog
              </Button>
            </Link>
          </div>

          <article className="prose lg:prose-lg max-w-none mx-auto p-4">
            <header className="mb-8 not-prose border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
                <span>No category</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">{postData.title}</h1>
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4"/>
                  <span>Date</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4"/>
                  <span>Author</span>
                </div>
              </div>
            </header>
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-slate-800 prose-pre:text-white prose-pre:border prose-code:bg-slate-800 prose-code:text-white prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none dark:prose-invert"
              dangerouslySetInnerHTML={{__html: content}}
            />
          </article>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2"/>
                Back to all posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
