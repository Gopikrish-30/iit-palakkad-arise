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
    if (!existsSync(DATA_FILE)) {
      return {};
    }
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading app data:', error);
    return {};
  }
}

// Save application data to JSON file or memory
export async function saveAppData(data: any): Promise<void> {
  try {
    // In production, use in-memory storage
    if (process.env.NODE_ENV === 'production') {
      inMemoryData = { ...data };
      return;
    }

    // In development, try to save to file system
    await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.warn('Failed to save to file system, using memory:', error);
    inMemoryData = { ...data };
  }
}
