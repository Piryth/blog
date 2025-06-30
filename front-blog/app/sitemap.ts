import { MetadataRoute } from 'next'


type Post = {
    slug: string;
    created_at: string;
}
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const res = await fetch('https://api.arnaud-endignous.com/posts');

    const posts = await res.json() as Post[];

    const postsUrls = posts.map(post => ({
        url: `https://arnaud-endignous.com/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'daily' as 'daily',
        priority: 0.7,
    }));

  return [
    {
      url: 'https://arnaud-endignous.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://arnaud-endignous.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://arnaud-endignous.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...postsUrls
  ]
}