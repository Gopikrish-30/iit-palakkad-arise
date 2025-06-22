// In-memory storage for data persistence (temporary solution for client-side compatibility)
let inMemoryData: any = {};

// Load application data from memory (or localStorage as fallback)
export async function loadAppData(): Promise<any> {
  try {
    // Use in-memory storage
    if (Object.keys(inMemoryData).length > 0) {
      return inMemoryData;
    }
    // Fallback to localStorage if available
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('app-data');
      if (savedData) {
        inMemoryData = JSON.parse(savedData);
        return inMemoryData;

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
