import fs from 'fs';
import html from 'remark-html';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';

interface MarkdownContent {
  content: string;
  metadata: {
    title: string;
    description: string;
    [key: string]: unknown;
  };
}

export async function loadMarkdownFile(filename: string): Promise<MarkdownContent> {
  const filePath = path.join(process.cwd(), 'src/data', `${filename}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse markdown metadata and content
  const { data: metadata, content } = matter(fileContents);
  
  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  
  return {
    content: processedContent.toString(),
    metadata: metadata as MarkdownContent['metadata']
  };
}