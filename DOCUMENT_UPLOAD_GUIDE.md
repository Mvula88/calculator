# Document Upload Guide for IMPOTA Platform

## Setting Up Document Storage

### Option 1: Supabase Storage (Recommended)

1. **Create Storage Bucket**
   ```sql
   -- Run in Supabase SQL Editor
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('documents', 'documents', false);
   ```

2. **Set Bucket Policies**
   ```sql
   -- Allow authenticated users to read documents
   CREATE POLICY "Authenticated users can read documents" ON storage.objects
   FOR SELECT USING (
     bucket_id = 'documents' AND
     auth.role() = 'authenticated'
   );
   ```

3. **Upload Documents**
   - Go to Supabase Dashboard > Storage
   - Upload PDFs to the 'documents' bucket with this structure:
     ```
     documents/
       2015_VOLKSWAGEN_GOLF_R_INVOICE.pdf
       SAD_500_CUSTOMS.pdf
       Assessment_Notice.pdf
       Customs_Clearance_Certificate_Motor_Vehicle.pdf
       Release_Order.pdf
       Export_Certificate_Japanese.pdf
       Export_Certificate_Sworn_Translated.pdf
       ORIGINAL_BILL_OF_LANDING.pdf
       Police_Clearance.pdf
       Import_Permit_MIT.pdf
       Payment_Receipt.pdf
     ```

4. **Update API Route**
   ```typescript
   // In app/api/documents/[...path]/route.ts
   const { data, error } = await supabase.storage
     .from('documents')
     .download(filePath)
   
   if (error) {
     return new NextResponse('Document not found', { status: 404 })
   }
   
   return new NextResponse(data, {
     headers: {
       'Content-Type': 'application/pdf',
       'Content-Disposition': 'inline; filename="document.pdf"',
       'X-Frame-Options': 'SAMEORIGIN',
       'X-Content-Type-Options': 'nosniff',
       'Cache-Control': 'private, max-age=3600',
     },
   })
   ```

### Option 2: Public CDN (Less Secure)

1. Upload PDFs to a CDN like Cloudinary or AWS S3
2. Update the PDFViewer component's `getViewerUrl` function:
   ```typescript
   const getViewerUrl = (url: string) => {
     // Replace with your CDN base URL
     const CDN_BASE = 'https://your-cdn.com/documents'
     return `${CDN_BASE}/${url}`
   }
   ```

### Option 3: Google Drive (Quick Setup)

1. Upload PDFs to Google Drive
2. Make them viewable with link
3. Use Google Docs Viewer:
   ```typescript
   const getViewerUrl = (url: string) => {
     // Get the file ID from Google Drive share link
     const fileId = 'YOUR_FILE_ID'
     return `https://drive.google.com/file/d/${fileId}/preview`
   }
   ```

## Security Considerations

1. **Watermarking**: Consider server-side PDF watermarking
2. **Time-limited URLs**: Generate signed URLs that expire
3. **Rate limiting**: Limit document access per user
4. **Audit logging**: Track who views which documents

## Testing

1. Upload a test PDF first
2. Check that authentication is working
3. Verify no download option is available
4. Test zoom controls
5. Confirm watermark appears

## Document Requirements

- File format: PDF only
- Max file size: 10MB recommended
- Resolution: 150-300 DPI for clarity
- Naming: Use exact filenames from the documents page

## Deployment Checklist

- [ ] Documents uploaded to storage
- [ ] Storage permissions configured
- [ ] API route updated with actual storage calls
- [ ] Environment variables set for storage keys
- [ ] CORS configured for your domain
- [ ] SSL certificate active
- [ ] Content Security Policy headers set