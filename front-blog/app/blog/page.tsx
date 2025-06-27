import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Calendar, Clock, Search, ArrowRight} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {ThumbnailLoader} from "@/components/blog/ThumbnailLoader";

type Article = {
  title: string
  slug: string
  description: string
  created_at: Date
  thumbnail_url?: string
}

export default async function BlogPage() {

  const response = await fetch("http://localhost:8080/posts", {method: "GET"})

  const articlesData: Article[] = await response.json();

  console.log(articlesData)


  const featuredPosts = articlesData[0]
  const regularPosts = articlesData[1]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Blog & Articles</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Some articles that reflects my thoughts 🙂
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                size="sm"
                className="rounded-full"
              >
                No Category
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">📌 Pinned Articles</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {articlesData.map((post, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <ThumbnailLoader slug={post.slug} />
                  <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">No category</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4"/>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4"/>
                      0
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-base">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={"/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 text-xs bg-slate-900/80 hover:bg-slate-900">
                    No category
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3"/>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3"/>
                      0
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-sm font-medium text-blue-600 hover:text-blue-700"
                    asChild
                  >
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-1 h-3 w-3"/>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="text-center mt-20 py-16 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Stay Updated</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Subscribe to my newsletter to get the latest articles and insights delivered directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-white dark:bg-slate-800"/>
            <Button variant="outline">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
