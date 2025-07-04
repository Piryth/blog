import {remark} from 'remark';
import html from 'remark-html';
import 'highlight.js/styles/github-dark.css';
import {highlightCode} from "@/lib/highlight"; // You can choose any other theme
import remarkImages from 'remark-images'

export async function getMarkdownData(content: string): Promise<string> {
  const processedContent = await remark()
    .use(html)
    .use(remarkImages)
    .process(content);

  return highlightCode(processedContent.toString())
}
