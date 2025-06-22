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
      }
    }
    return {};
  } catch (error) {
    console.error('Error loading app data:', error);
    return {};
  }
}

// Save application data to memory (or localStorage as fallback)
export async function saveAppData(data: any): Promise<void> {
  try {
    // Update in-memory storage
    inMemoryData = { ...data };
    // Also save to localStorage if available as a fallback
    if (typeof window !== 'undefined') {
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
