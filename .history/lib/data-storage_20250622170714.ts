import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'public', 'uploads', 'app-data.json')

// In-memory storage for production (since we can't write to file system in some environments)
let inMemoryData: any = {};

// Load application data from JSON file or memory
export async function loadAppData(): Promise<any> {
  try {
    // In production, use in-memory storage
    if (process.env.NODE_ENV === 'production') {
      return inMemoryData;
    }

    // In development, try to use file system
