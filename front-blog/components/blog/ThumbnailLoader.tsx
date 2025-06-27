"use client"

import {useEffect, useState} from "react";
import Image from 'next/image';

type Article = {
  title: string
  slug: string
  description: string
  created_at: Date
  thumbnail_url: string | null
}

export const ThumbnailLoader = ({slug}: { slug: string }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("/placeholder.svg")


  useEffect(() => {
    async function fetchThumbnail() {
      const response = await fetch(`http://localhost:8080/posts/${slug}`)
      const data: Article = await response.json()

      if (data.thumbnail_url !== null) {
        setThumbnailUrl(data.thumbnail_url)
      }
    }

    fetchThumbnail().then()
  }, [slug])

  return (
    <Image
      src={thumbnailUrl}
      alt={`Thumbnail for ${slug}`}
      width={400}
      height={200}
      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
  )
}
