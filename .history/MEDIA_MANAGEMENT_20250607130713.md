# Media Management System

This document explains how to use the enhanced media management system in the IIT Palakkad admin interface.

## Features

### 1. Media Upload
- Upload images, videos, and documents through the admin interface
- Supported formats:
  - **Images**: JPEG, PNG, GIF, WebP
  - **Videos**: MP4, WebM, QuickTime
  - **Documents**: PDF, DOC, DOCX
- Maximum file size: 50MB
- Files are automatically organized into subdirectories by type

### 2. File Storage
- Files are stored in `public/uploads/` directory
- Organized by type:
  - `public/uploads/images/` - Image files
  - `public/uploads/videos/` - Video files  
  - `public/uploads/documents/` - Document files
- Metadata stored in `public/uploads/media-data.json`

### 3. Media Browser
- Browse and select uploaded media files
- Filter by file type (images, videos, documents)
- Search functionality
- Preview thumbnails for images
- Copy file URLs to clipboard

## How to Use

### Uploading Media Files

1. Go to Admin Dashboard → Media tab
2. Click "Upload Media" button
3. Select your file (max 50MB)
4. Optionally add a description
5. Click "Upload File"

The file will be automatically:
- Renamed with a unique identifier to prevent conflicts
- Stored in the appropriate subdirectory
- Added to the media library with metadata

### Using Media in Other Sections

#### People Section
1. When adding or editing a person, you'll see an "Image URL" field
2. You can either:
   - Manually enter a URL
   - Click "Browse" to open the media browser
   - Select an image from your uploaded media
3. The selected image URL will be automatically filled in

#### Other Sections
The media browser can be integrated into any section that needs file selection:
- Publications (for cover images, PDFs)
- Instruments (for equipment photos)
- Achievements (for certificate images)
- Home page content

### Media Management

#### Viewing Files
- All uploaded files are listed in the Media section
- View file details including size, upload date, and usage
- Preview images directly in the interface

#### Copying URLs
- Click the copy button next to any file to copy its URL
- Use these URLs in any section that accepts image/file URLs
- URLs are in the format: `/uploads/[type]/[filename]`

#### Deleting Files
- Click the delete button to remove files
- This will delete both the file and its metadata
- **Warning**: Deleting a file will break any references to it

## File URL Format

Uploaded files can be accessed using these URL patterns:
- Images: `/uploads/images/filename-timestamp-random.ext`
- Videos: `/uploads/videos/filename-timestamp-random.ext`
- Documents: `/uploads/documents/filename-timestamp-random.ext`

## Technical Details

### API Endpoints
- `GET /api/media` - Fetch all media files
- `POST /api/media/upload` - Upload new file
- `DELETE /api/media/[id]` - Delete specific file
- `PATCH /api/media/[id]` - Update file metadata

### File Naming
Files are renamed using the pattern: `originalname-timestamp-random.ext`
This ensures:
- No filename conflicts
- Unique identifiers for each file
- Preservation of original file extension

### Persistence
- Files are stored in the filesystem (`public/uploads/`)
- Metadata is stored in JSON format (`public/uploads/media-data.json`)
- Both will persist after deployment/hosting

## Best Practices

1. **Organize by Purpose**: Use descriptive filenames when uploading
2. **Optimize Images**: Compress images before uploading for better performance
3. **Regular Cleanup**: Periodically review and remove unused files
4. **Backup**: Include the `public/uploads/` directory in your backup strategy

## Troubleshooting

### File Not Uploading
- Check file size (max 50MB)
- Verify file type is supported
- Ensure sufficient disk space

### File Not Displaying
- Verify the file URL is correct
- Check that the file exists in the uploads directory
- Ensure proper file permissions

### Media Browser Not Loading
- Check browser console for errors
- Verify API endpoints are accessible
- Ensure media-data.json is readable

## Integration Example

To add media browser to any form field:

```tsx
import MediaBrowser from "@/components/admin/media-browser"

// In your component:
const [isMediaBrowserOpen, setIsMediaBrowserOpen] = useState(false)
const [imageUrl, setImageUrl] = useState("")

// In your JSX:
<div className="flex gap-2">
  <Input
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    placeholder="Enter image URL or browse media"
  />
  <Button onClick={() => setIsMediaBrowserOpen(true)}>
    Browse
  </Button>
</div>

<MediaBrowser
  isOpen={isMediaBrowserOpen}
  onClose={() => setIsMediaBrowserOpen(false)}
  onSelect={(url) => setImageUrl(url)}
  fileType="image" // or "video", "document", "all"
  title="Select Image"
/>
```
