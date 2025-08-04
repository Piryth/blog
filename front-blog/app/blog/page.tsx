"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, Clock, ArrowRight} from "lucide-react"
import Link from "next/link"
import {ThumbnailLoader} from "@/components/blog/ThumbnailLoader";
import {useEffect, useState} from "react";

type Post = {
  title: string
  slug: string
  description: string
  created_at: Date
  thumbnail_url?: string
  categories: string[]
}

export default function BlogPage() {

  const [postData, setPostData] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts")

      if (!response.ok) {
        setPostData([]);
        return;
      }

      setPostData(await response.json());
    }

    const fetchCategories = async () => {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        setCategories([]);
        return;
      }
      setCategories(await response.json());
    }

    fetchPosts()
    fetchCategories()

  }, [])


  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Blog & Articles</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Quelques articles qui reflètent mes pensées 🙂
          </p>

          {/* Categories */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">📌 Pinned Articles</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {postData.map((post, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <ThumbnailLoader slug={post.slug}/>
                  <div className="flex w-[100%]">
                    {[...new Set(post.categories)].map((category) => (
                      <Badge key={category + post.created_at} className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{category}</Badge>
                    ))}
                  </div>

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
      </div>
    </div>
  )
}
