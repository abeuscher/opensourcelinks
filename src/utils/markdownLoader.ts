// src/utils/markdownLoader.ts

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
    platform: string;
    difficulty: string;
    timeRequired: string;
    lastUpdated: string;
    [key: string]: unknown;
  };
}

export async function loadMarkdownFile(filename: string): Promise<MarkdownContent> {
  try {
    const filePath = path.join(process.cwd(), 'src/data', `${filename}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse markdown metadata and content
    const { data: metadata, content } = matter(fileContents);
    
    // Validate required metadata
    const requiredFields = [
      'title',
      'description',
      'platform',
      'difficulty',
      'timeRequired',
      'lastUpdated'
    ];
    
    const missingFields = requiredFields.filter(field => !metadata[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required metadata fields: ${missingFields.join(', ')}`);
    }

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
  
    return {
      content: processedContent.toString(),
      metadata: metadata as MarkdownContent['metadata']
    };
  } catch (error) {
    throw new Error(`Error loading markdown file ${filename}: ${error.message}`);
  }
}