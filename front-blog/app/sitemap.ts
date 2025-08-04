import {MetadataRoute} from 'next'
import {config} from "@/config"
import {logger} from "@/logger";

type Post = {
  slug: string;
  created_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${config.apiUri}/api/v1/posts`, {
      headers: {'x-api-key': config.apiKey},
    });

    if(!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const posts = await res.json() as Post[];

    logger.info(posts.length + " posts found")

    const postsUrls = posts.map(post => ({
      url: `${config.frontUri}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'daily' as 'daily',
      priority: 0.7,
    }));

    return [
      {
        url: `${config.frontUri}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${config.frontUri}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${config.frontUri}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      ...postsUrls
    ]
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error generating sitemap: ${error.message}`);
    } else {
      logger.error(`Error generating sitemap: ${String(error)}`);
    }
    // Stop the build process
    process.exitCode = 1;
    throw error;
  }

}
