import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'public', 'uploads', 'app-data.json')

// In-memory storage for production (since we can't write to file system in some environments)
