module.exports = [

  // ─── IMAGE TOOLS ──────────────────────────────────────────────────────────
  {
    slug: 'image-to-jpg',
    name: 'Image to JPG Converter',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '🖼️',
    desc: 'Convert PNG, WebP, GIF, BMP or any image to JPG format instantly in your browser.',
    type: 'image-convert',
    outputMime: 'image/jpeg',
    outputExt: 'jpg',
    outputQuality: 0.92,
    metaTitle: 'Free Image to JPG Converter Online — No Upload Required',
    metaDesc: 'Convert PNG, WebP, GIF, BMP to JPG instantly. Free online image to JPG converter — no upload, works entirely in your browser. Fast and private.',
    content: `<h2>What Is an Image to JPG Converter?</h2><p>An image to JPG converter is a tool that transforms any image format — PNG, WebP, GIF, BMP, TIFF — into the universally compatible JPG (JPEG) format. JPG is the most widely supported image format on the web, in email clients, and across virtually all devices.</p><h2>Why Convert Images to JPG?</h2><p>JPG is ideal for photographs and complex images with many colours. It uses lossy compression, making file sizes significantly smaller than PNG while maintaining excellent visual quality at the right compression settings. Smaller files load faster on websites, use less storage space, and are easier to share via email or messaging apps.</p><h2>How This Tool Works</h2><p>Our converter uses the HTML5 Canvas API to process images entirely within your browser. Your file never leaves your device — no upload to any server, no privacy risk. Simply drop your image, click Convert, and download the result in seconds. The tool preserves the original dimensions of your image while applying efficient JPEG compression.</p><h2>When to Use JPG Format</h2><p>Use JPG for photographs, social media images, product photos, and any image where file size matters more than perfect pixel accuracy. Avoid JPG for logos, screenshots with text, or images requiring transparent backgrounds — use PNG for those cases instead.</p>`,
    faq: [
      { q: 'Is my image uploaded to any server?', a: 'No. All conversion happens inside your browser using the Canvas API. Your image never leaves your device.' },
      { q: 'What image formats can I convert to JPG?', a: 'You can convert PNG, WebP, GIF, BMP, TIFF, and other common formats to JPG.' },
      { q: 'Will the image quality be reduced?', a: 'We apply 92% quality by default, which produces excellent results that are visually indistinguishable from the original for most photos.' },
      { q: 'Is there a file size limit?', a: 'We recommend files under 20MB for best performance in your browser.' }
    ],
    relatedTools: ['image-to-png', 'image-compressor', 'jpg-to-webp', 'image-resizer'],
    relatedBlogs: []
  },
  {
    slug: 'image-to-png',
    name: 'Image to PNG Converter',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '🖼️',
    desc: 'Convert JPG, WebP, GIF, BMP or any image to lossless PNG format in your browser.',
    type: 'image-convert',
    outputMime: 'image/png',
    outputExt: 'png',
    outputQuality: 1,
    metaTitle: 'Free Image to PNG Converter Online — Lossless, No Upload',
    metaDesc: 'Convert JPG, WebP, GIF, BMP to PNG lossless format instantly. Free image to PNG converter — no server upload, fully private, works in browser.',
    content: `<h2>What Is PNG Format?</h2><p>PNG (Portable Network Graphics) is a lossless image format that preserves every pixel perfectly. Unlike JPG, PNG supports full transparency (alpha channel), making it the preferred format for logos, icons, UI elements, and any image that requires a transparent background.</p><h2>Why Convert to PNG?</h2><p>PNG is the format of choice when image quality is paramount. Because it uses lossless compression, there is zero quality degradation — every pixel in the output is identical to the input. It is ideal for graphics with sharp edges, text, and illustrations.</p><h2>How the Conversion Works</h2><p>This tool uses the browser's built-in Canvas API to draw your image and export it as a PNG file. The entire process is client-side — nothing is sent to a server. This means your images remain completely private and the conversion is nearly instant regardless of internet speed.</p><h2>PNG vs JPG: Which Should You Choose?</h2><p>Choose PNG for graphics, logos, screenshots, and images with transparency. Choose JPG for photographs where smaller file size matters. PNG files are typically larger than JPG for photographs, but smaller and sharper for graphics and UI elements.</p>`,
    faq: [
      { q: 'Does PNG support transparent backgrounds?', a: 'Yes, PNG fully supports transparency (alpha channel), making it perfect for logos and graphics.' },
      { q: 'Will converting a JPG to PNG improve its quality?', a: 'No. Converting from a lossy format like JPG to PNG will not recover lost data. It will preserve exactly what the JPG currently looks like.' },
      { q: 'Are my images safe?', a: 'Completely. All processing happens in your browser — no files are ever uploaded to any server.' },
      { q: 'Why is my PNG file larger than the original JPG?', a: 'PNG uses lossless compression which preserves all pixel data, resulting in larger files than JPG for photographic content.' }
    ],
    relatedTools: ['image-to-jpg', 'image-compressor', 'image-metadata-remover'],
    relatedBlogs: []
  },
  {
    slug: 'jpg-to-webp',
    name: 'JPG to WebP Converter',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '🔄',
    desc: 'Convert JPG and PNG images to WebP format for faster web performance.',
    type: 'image-convert',
    outputMime: 'image/webp',
    outputExt: 'webp',
    outputQuality: 0.85,
    metaTitle: 'Free JPG to WebP Converter Online — Faster Web Images',
    metaDesc: 'Convert JPG and PNG to WebP format for up to 30% smaller file sizes. Free JPG to WebP converter — no upload, works in your browser instantly.',
    content: `<h2>What Is WebP Format?</h2><p>WebP is a modern image format developed by Google, designed specifically for the web. It achieves 25–34% smaller file sizes compared to JPEG at equivalent visual quality, and 26% smaller than PNG for lossless images. All major browsers support WebP as of 2020.</p><h2>Why Convert to WebP?</h2><p>Smaller images mean faster page loads, better Core Web Vitals scores, and improved SEO performance. Google's PageSpeed Insights explicitly recommends serving images in next-gen formats like WebP. Switching to WebP can dramatically reduce your site's bandwidth usage and improve user experience.</p><h2>How This Converter Works</h2><p>Using the HTML5 Canvas API, your image is drawn to a canvas element and exported as a WebP blob. The whole process runs locally in your browser — no uploads, no waiting for server processing. The result is ready to download in under a second for most images.</p><h2>WebP Compatibility</h2><p>WebP is supported by Chrome, Firefox, Edge, Safari (since 14), and Opera. For maximum browser compatibility, you can serve WebP with a JPG fallback using the HTML picture element.</p>`,
    faq: [
      { q: 'Does WebP support transparency?', a: 'Yes, WebP supports both lossy and lossless compression, as well as transparency (alpha channel).' },
      { q: 'How much smaller will my WebP file be?', a: 'Typically 25–35% smaller than an equivalent quality JPG, depending on image content.' },
      { q: 'Do all browsers support WebP?', a: 'Yes, all modern browsers support WebP including Chrome, Firefox, Edge, Safari 14+, and Opera.' },
      { q: 'Is my image sent to any server?', a: 'No. Conversion is entirely client-side using the Canvas API in your browser.' }
    ],
    relatedTools: ['image-to-jpg', 'image-compressor', 'image-resizer'],
    relatedBlogs: []
  },
  {
    slug: 'webp-to-jpg',
    name: 'WebP to JPG Converter',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '🔄',
    desc: 'Convert WebP images back to JPG format for maximum compatibility.',
    type: 'image-convert',
    outputMime: 'image/jpeg',
    outputExt: 'jpg',
    outputQuality: 0.92,
    metaTitle: 'Free WebP to JPG Converter Online — Instant, No Upload',
    metaDesc: 'Convert WebP images to JPG format instantly. Free WebP to JPG converter — no server upload, works in your browser. Perfect for compatibility.',
    content: `<h2>Why Convert WebP to JPG?</h2><p>While WebP is the superior format for web use, there are situations where JPG is required — older applications, certain email clients, photo editors that do not support WebP, and some social media upload tools may not accept WebP files. Converting to JPG ensures universal compatibility.</p><h2>When You Need JPG Instead of WebP</h2><p>You may need JPG when: sending images to clients who use older software, uploading to platforms that do not accept WebP (such as some print services), using image editing software that does not support WebP, or when sharing images with people using older devices.</p><h2>How the Conversion Works</h2><p>Your WebP file is loaded into a browser Image object, drawn onto an HTML5 Canvas, and then exported as a JPEG with 92% quality. This produces excellent image quality while keeping file sizes manageable. The entire process is local — your file is never uploaded to any server.</p>`,
    faq: [
      { q: 'Will the WebP to JPG conversion lose quality?', a: 'A small amount of quality may be lost due to JPEG\'s lossy compression, but at 92% quality the difference is imperceptible for most images.' },
      { q: 'Can I convert animated WebP files?', a: 'Only the first frame of an animated WebP will be converted to JPG, as JPG does not support animation.' },
      { q: 'Is there a size limit?', a: 'We recommend files under 20MB for smooth in-browser processing.' }
    ],
    relatedTools: ['image-to-jpg', 'jpg-to-webp', 'image-compressor'],
    relatedBlogs: []
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '⚡',
    desc: 'Compress and reduce image file size without visible quality loss.',
    type: 'image-compress',
    metaTitle: 'Free Online Image Compressor — Reduce File Size Instantly',
    metaDesc: 'Compress images online for free. Reduce JPG, PNG, WebP file sizes without visible quality loss. No upload required — works entirely in your browser.',
    content: `<h2>Why Compress Images?</h2><p>Large image files slow down your website, cost mobile users data, and hurt your search engine rankings. Google uses page speed as a ranking factor, and images are typically the largest contributor to page weight. Compressing your images can reduce load times by 40–80%.</p><h2>How Image Compression Works</h2><p>Our compressor uses the HTML5 Canvas API with adjustable JPEG quality settings. By reducing the quality factor slightly — from 100% to 75–85% — you can achieve dramatic file size reductions that are invisible to the naked eye. The tool also lets you preview the result before downloading.</p><h2>How Much Can You Compress?</h2><p>Most photographs can be compressed to 60–80% of their original size with no perceptible quality loss. Images with large flat colour areas compress even more efficiently. The default 75% quality setting provides an excellent balance between file size and visual fidelity.</p><h2>Best Practices for Web Images</h2><p>For web images, aim for JPEG quality between 70–85%. Images above 200KB should be considered for compression. Always compress images before uploading to your website or CMS to improve performance from the start.</p>`,
    faq: [
      { q: 'How much can I compress without visible quality loss?', a: 'For most photos, 70–85% quality produces results that look identical to the original but are 30–60% smaller.' },
      { q: 'Does this tool work for PNG files?', a: 'The quality slider affects JPEG output. For PNG, use the Image to PNG converter — PNG uses lossless compression.' },
      { q: 'Are my images uploaded to a server?', a: 'No. All compression happens inside your browser using the Canvas API. Your files stay on your device.' },
      { q: 'Can I compress multiple images at once?', a: 'Currently the tool processes one image at a time for best results.' }
    ],
    relatedTools: ['image-to-jpg', 'image-resizer', 'jpg-to-webp', 'image-quality-reducer'],
    relatedBlogs: []
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '📐',
    desc: 'Resize images to exact pixel dimensions while maintaining quality.',
    type: 'image-resize',
    metaTitle: 'Free Online Image Resizer — Resize to Exact Dimensions',
    metaDesc: 'Resize images to exact width and height in pixels. Free online image resizer — no upload, works in browser, maintains aspect ratio option.',
    content: `<h2>Why Resize Images?</h2><p>Oversized images are one of the most common causes of slow websites. If you upload a 4000×3000 pixel photo but display it at 800×600 pixels, the browser still has to download all 12 megapixels. Resizing images to the exact dimensions you need can reduce file size by 80–95%.</p><h2>Common Use Cases for Image Resizing</h2><p>Profile pictures typically require 400×400 pixels. Blog featured images are commonly 1200×630 pixels. Social media posts vary: Instagram is 1080×1080 pixels, Twitter header images are 1500×500 pixels, and Facebook cover photos are 820×312 pixels. Knowing the exact size you need helps you resize precisely.</p><h2>How This Resizer Works</h2><p>Enter your target width and height in pixels. Optionally lock the aspect ratio to prevent distortion. The tool draws your image onto an HTML5 Canvas at the specified dimensions and exports it as a high-quality JPEG. Everything runs in your browser — no upload, instant results.</p>`,
    faq: [
      { q: 'Does resizing affect image quality?', a: 'Resizing down (reducing dimensions) generally maintains good quality. Resizing up (upscaling) will reduce sharpness as there is no additional pixel data to work with.' },
      { q: 'Can I lock the aspect ratio?', a: 'Yes, check the "Lock Aspect Ratio" option and the height will automatically adjust when you change the width.' },
      { q: 'What format will the resized image be saved as?', a: 'The resized image is saved as a high-quality JPEG by default.' },
      { q: 'Is my image sent to a server?', a: 'No. Everything happens in your browser via the Canvas API.' }
    ],
    relatedTools: ['image-compressor', 'image-to-jpg', 'image-crop'],
    relatedBlogs: []
  },
  {
    slug: 'image-crop',
    name: 'Image Crop Tool',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '✂️',
    desc: 'Crop images by specifying exact pixel coordinates and dimensions.',
    type: 'image-crop',
    metaTitle: 'Free Online Image Crop Tool — Crop to Exact Dimensions',
    metaDesc: 'Crop images online for free. Specify x, y coordinates and width/height in pixels. No upload required — all processing in your browser.',
    content: `<h2>Why Crop Images?</h2><p>Cropping removes unwanted areas from an image, focuses attention on the subject, and optimises images for specific display contexts. Whether you're removing a distracting background, creating a square profile photo, or preparing a banner image, precise cropping is an essential editing tool.</p><h2>How to Crop an Image</h2><p>Upload your image, then specify the starting X and Y coordinates (from the top-left corner) and the width and height of the crop area. You can preview the crop area before processing. The tool uses the HTML5 Canvas API to extract exactly the pixels you specify and export them as a new image file.</p><h2>Common Crop Sizes</h2><p>Square crops (e.g. 1:1) are used for profile pictures and Instagram posts. 16:9 crops are standard for YouTube thumbnails and video backgrounds. 4:3 is common for blog post images. 2:1 or 3:1 ratios work well for wide banner images.</p>`,
    faq: [
      { q: 'Are coordinates measured from which corner?', a: 'X and Y coordinates are measured from the top-left corner of the image, where (0, 0) is the top-left pixel.' },
      { q: 'What if I enter coordinates that exceed the image size?', a: 'The tool will clamp the crop area to the image boundaries so no empty space is included.' },
      { q: 'Is my image uploaded to any server?', a: 'No. All cropping is done client-side using the HTML5 Canvas API.' }
    ],
    relatedTools: ['image-resizer', 'image-compressor', 'image-to-jpg'],
    relatedBlogs: []
  },
  {
    slug: 'image-metadata-remover',
    name: 'Image Metadata Remover',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '🔒',
    desc: 'Strip EXIF data and metadata from images to protect your privacy.',
    type: 'image-convert',
    outputMime: 'image/png',
    outputExt: 'png',
    outputQuality: 1,
    metaTitle: 'Free Image Metadata Remover — Strip EXIF Data Online',
    metaDesc: 'Remove EXIF metadata from images to protect your privacy. Free online tool — no upload, removes GPS location, camera info, and other hidden data.',
    content: `<h2>What Is Image Metadata (EXIF Data)?</h2><p>When you take a photo with a smartphone or digital camera, the device automatically embeds metadata into the image file. This EXIF (Exchangeable Image File Format) data can include your GPS location, the exact time the photo was taken, your device model, camera settings (aperture, shutter speed, ISO), and even the photographer's name.</p><h2>Why Remove EXIF Data?</h2><p>EXIF data can reveal sensitive information you might not want to share publicly. When you upload a photo to social media or share it by email, the recipient may be able to see exactly where the photo was taken, which could be your home address. Removing metadata before sharing protects your privacy.</p><h2>How Metadata Removal Works</h2><p>This tool draws your image onto an HTML5 Canvas and exports it as a fresh PNG file. The Canvas API does not copy EXIF or metadata from the source image, so the exported file contains only pixel data — no location, no timestamps, no device information. This is a simple, reliable method for stripping metadata entirely.</p>`,
    faq: [
      { q: 'Does this tool remove GPS location data?', a: 'Yes. Re-exporting via Canvas removes all EXIF metadata including GPS coordinates.' },
      { q: 'Will this change how my image looks?', a: 'No. Only the hidden metadata is removed. The visible image remains identical.' },
      { q: 'Is my image safe to process here?', a: 'Completely. Everything runs in your browser — your image is never uploaded to any server.' },
      { q: 'Which formats does this work on?', a: 'Any image format your browser can display: JPG, PNG, WebP, GIF, BMP, and more.' }
    ],
    relatedTools: ['image-to-png', 'image-to-jpg', 'image-compressor'],
    relatedBlogs: []
  },
  {
    slug: 'image-quality-reducer',
    name: 'Image Quality Reducer',
    category: 'Image Tools',
    categorySlug: 'image',
    icon: '📉',
    desc: 'Reduce image quality and file size with a custom compression slider.',
    type: 'image-compress',
    metaTitle: 'Free Image Quality Reducer — Reduce File Size with Custom Quality',
    metaDesc: 'Reduce image quality and file size online. Set custom compression level from 10–95%. Free tool — no upload, instant preview in your browser.',
    content: `<h2>What Does Reducing Image Quality Do?</h2><p>Reducing an image's quality level applies stronger JPEG compression, which discards subtle colour variations and detail that are mostly imperceptible to the human eye. The result is a smaller file that looks nearly identical at moderate compression levels but becomes noticeably degraded at very high compression (very low quality settings).</p><h2>Use Cases for Quality Reduction</h2><p>Reducing image quality is useful when you need to: meet a file size limit for email attachments, reduce page load times for web images, save storage space in bulk image collections, or prepare images for thumbnails and previews where perfect quality is not needed.</p><h2>Finding the Right Balance</h2><p>Quality settings between 60–80% typically produce excellent results that are difficult to distinguish from the original. Below 50%, image artefacts become visible, particularly in areas of fine detail and gradients. Use the preview to compare before downloading.</p>`,
    faq: [
      { q: 'What quality level should I use?', a: 'For web images, 70–80% is ideal. For thumbnails and previews, 50–65% is acceptable.' },
      { q: 'Can I reduce PNG files?', a: 'The quality slider produces JPEG output. PNG is lossless and cannot be quality-reduced in the same way.' },
      { q: 'How is this different from the Image Compressor?', a: 'This tool focuses on quality control with a fine-grained slider. The Image Compressor uses optimised default settings.' }
    ],
    relatedTools: ['image-compressor', 'image-to-jpg', 'image-resizer'],
    relatedBlogs: []
  },

  // ─── PDF TOOLS ────────────────────────────────────────────────────────────
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    category: 'PDF Tools',
    categorySlug: 'pdf',
    icon: '📄',
    desc: 'Convert one or more JPG images into a PDF document instantly.',
    type: 'jpg-to-pdf',
    metaTitle: 'Free JPG to PDF Converter Online — Convert Images to PDF',
    metaDesc: 'Convert JPG images to PDF online for free. Add multiple images and create a multi-page PDF. No upload required — works in your browser with jsPDF.',
    content: `<h2>Why Convert JPG to PDF?</h2><p>PDF is the universal format for sharing documents. Converting images to PDF makes them easier to print, share professionally, and view consistently across all devices and operating systems without any software dependencies. PDFs cannot be accidentally edited and preserve layout perfectly.</p><h2>How This Converter Works</h2><p>This tool uses jsPDF, a well-established open-source JavaScript library, to create a PDF document from your images entirely in the browser. Each image is placed on a separate PDF page, scaled to fit an A4 page while maintaining its aspect ratio. No files are uploaded to any server.</p><h2>Use Cases</h2><p>Common use cases include: converting scanned document photos into PDF for filing, combining multiple product images into a catalogue PDF, creating photo albums in PDF format, and converting receipts or invoices photographed on a smartphone into PDF for expense reporting.</p>`,
    faq: [
      { q: 'Can I add multiple images to create a multi-page PDF?', a: 'Yes! Add multiple images and each will become a separate page in the PDF document.' },
      { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and most common image formats are supported.' },
      { q: 'Is my data sent to a server?', a: 'No. The PDF is created entirely in your browser using the jsPDF library.' },
      { q: 'What page size does the PDF use?', a: 'Images are fitted to A4 pages (210×297mm) with margins maintained.' }
    ],
    relatedTools: ['pdf-merge', 'image-to-jpg', 'image-compressor'],
    relatedBlogs: []
  },
  {
    slug: 'pdf-merge',
    name: 'PDF Merge Tool',
    category: 'PDF Tools',
    categorySlug: 'pdf',
    icon: '📎',
    desc: 'Merge multiple PDF files into one document instantly.',
    type: 'pdf-merge',
    metaTitle: 'Free PDF Merge Tool Online — Combine PDF Files Instantly',
    metaDesc: 'Merge multiple PDF files into one document for free. No upload, no sign-up — uses pdf-lib to combine PDFs entirely in your browser.',
    content: `<h2>What Is PDF Merging?</h2><p>PDF merging (or combining) takes two or more separate PDF files and joins them together into a single PDF document. The pages from each input file are concatenated in the order you specify, creating one unified document.</p><h2>Common Use Cases</h2><p>PDF merging is essential for: combining chapters of a report written by different authors, joining a cover letter with a CV and supporting documents, assembling invoices and receipts into a single financial report, and combining scanned pages of a multi-page document into one file.</p><h2>How This Tool Works</h2><p>This tool uses pdf-lib, a powerful open-source PDF library for JavaScript. All processing happens in your browser — the PDF files are read as ArrayBuffers using the FileReader API, merged using pdf-lib's document copying functions, and the result is downloaded directly to your device. No data is ever sent to a server.</p><h2>File Order Matters</h2><p>PDFs are merged in the order you add them. Drag and drop files in the order you want them to appear in the final document. You can reorder files before merging.</p>`,
    faq: [
      { q: 'How many PDFs can I merge at once?', a: 'You can merge multiple PDFs in one operation. Performance depends on your browser and the total file size.' },
      { q: 'Are there file size limits?', a: 'There is no hard limit, but very large files may be slow to process in the browser. We recommend keeping total size under 50MB.' },
      { q: 'Is the order of PDFs preserved?', a: 'Yes. PDFs are merged in the exact order they are listed in the tool.' },
      { q: 'Are my PDFs uploaded to any server?', a: 'No. All merging happens entirely in your browser using pdf-lib. Your files never leave your device.' }
    ],
    relatedTools: ['jpg-to-pdf', 'pdf-rotate'],
    relatedBlogs: []
  },
  {
    slug: 'pdf-rotate',
    name: 'Rotate PDF Pages',
    category: 'PDF Tools',
    categorySlug: 'pdf',
    icon: '🔃',
    desc: 'Rotate all pages in a PDF by 90, 180, or 270 degrees.',
    type: 'pdf-rotate',
    metaTitle: 'Free PDF Page Rotator Online — Rotate PDF Pages Instantly',
    metaDesc: 'Rotate PDF pages by 90, 180, or 270 degrees online for free. No upload required — uses pdf-lib to rotate pages in your browser.',
    content: `<h2>Why Rotate PDF Pages?</h2><p>Scanned documents often end up with pages in the wrong orientation — a portrait document scanned sideways, or a landscape document appearing upside-down. Rotating PDF pages corrects the orientation so the document reads correctly in any PDF viewer.</p><h2>How This Tool Works</h2><p>This tool uses pdf-lib to load your PDF in the browser, apply a rotation to every page, and export the corrected PDF. No server is involved — the entire operation runs locally in your browser using JavaScript. Processing is fast, even for multi-page documents.</p><h2>Rotation Options</h2><p>You can rotate pages by 90° clockwise (to fix a document rotated left), 180° (to flip an upside-down document), or 270° clockwise (equivalent to 90° counter-clockwise, to fix a document rotated right).</p>`,
    faq: [
      { q: 'Can I rotate only specific pages?', a: 'This tool currently rotates all pages by the same angle. For selective page rotation, consider our PDF Split tool to isolate pages first.' },
      { q: 'Will the rotation be saved permanently?', a: 'Yes, the downloaded PDF will have all pages permanently rotated to the specified angle.' },
      { q: 'Is my PDF uploaded to any server?', a: 'No. All processing is done in your browser with pdf-lib.' }
    ],
    relatedTools: ['pdf-merge', 'jpg-to-pdf'],
    relatedBlogs: []
  },

  // ─── TEXT TOOLS ───────────────────────────────────────────────────────────
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'Text Tools',
    categorySlug: 'text',
    icon: '📝',
    desc: 'Count words, characters, sentences, and paragraphs in any text.',
    type: 'word-counter',
    metaTitle: 'Free Word Counter Online — Count Words, Characters, Sentences',
    metaDesc: 'Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter — paste text and get results in real time.',
    content: `<h2>Why Use a Word Counter?</h2><p>Word count matters in many contexts: blog posts typically perform best at 1,500–2,500 words for SEO. Academic essays have strict word limits. Social media platforms have character limits. Job applications often request cover letters within a specific word range. Knowing your word count precisely is essential.</p><h2>What This Tool Measures</h2><p>This word counter provides: total word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time (based on the average adult reading speed of 200 words per minute). All metrics update in real time as you type.</p><h2>Tips for Content Writers</h2><p>For SEO blog posts, aim for a minimum of 1,000 words on core topics and 2,000+ words for comprehensive guides. Short-form content (300–600 words) works well for news updates and simple how-to articles. Always prioritise quality over hitting an arbitrary word count target.</p>`,
    faq: [
      { q: 'How does reading time get calculated?', a: 'Reading time is based on 200 words per minute, which is the average adult reading speed.' },
      { q: 'Does the word counter include numbers as words?', a: 'Yes, numbers are counted as words just like any other token separated by spaces.' },
      { q: 'Is my text stored or logged?', a: 'No. All processing happens in your browser. Your text is never sent to any server.' },
      { q: 'What counts as a sentence?', a: 'Sentences are counted by detecting periods, exclamation marks, and question marks followed by a space or end of text.' }
    ],
    relatedTools: ['character-counter', 'case-converter', 'readability-analyzer', 'keyword-density'],
    relatedBlogs: []
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'Text Tools',
    categorySlug: 'text',
    icon: '🔢',
    desc: 'Count characters with and without spaces for tweets, bios, and more.',
    type: 'character-counter',
    metaTitle: 'Free Character Counter Online — Count Characters Instantly',
    metaDesc: 'Count characters with and without spaces in real time. Free online character counter — perfect for Twitter, Instagram bios, meta descriptions, and SMS.',
    content: `<h2>Why Character Count Matters</h2><p>Many platforms enforce strict character limits. Twitter (X) allows 280 characters per tweet. Instagram bios are limited to 150 characters. Meta descriptions for SEO should be 150–160 characters. SMS messages are 160 characters per segment. Knowing your character count prevents your content from being cut off.</p><h2>Platform Character Limits Reference</h2><p>Twitter/X: 280 characters. Instagram caption: 2,200 characters (but only the first 125 show before "more"). Instagram bio: 150 characters. Facebook post: 63,206 characters (practically unlimited). LinkedIn post: 3,000 characters. Meta description: 155–160 characters. SMS: 160 characters.</p><h2>Characters With vs Without Spaces</h2><p>Some platforms count spaces as characters; others do not. This tool shows both counts so you can check against either type of limit. URLs and special characters always count as individual characters on most platforms.</p>`,
    faq: [
      { q: 'Does this count spaces as characters?', a: 'Both counts are shown: total characters (including spaces) and characters without spaces.' },
      { q: 'What is the Twitter character limit?', a: 'Twitter/X allows 280 characters per tweet. URLs are counted as 23 characters regardless of actual length.' },
      { q: 'Does this tool save my text?', a: 'No. All counting happens locally in your browser. Your text is never sent to any server.' }
    ],
    relatedTools: ['word-counter', 'case-converter', 'text-cleaner'],
    relatedBlogs: []
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'Text Tools',
    categorySlug: 'text',
    icon: 'Aa',
    desc: 'Convert text to uppercase, lowercase, title case, and sentence case instantly.',
    type: 'case-converter',
    metaTitle: 'Free Case Converter Online — UPPER, lower, Title, Sentence Case',
    metaDesc: 'Convert text to uppercase, lowercase, title case, sentence case, and camelCase instantly. Free online case converter tool.',
    content: `<h2>Text Case Conversion Explained</h2><p>Different writing contexts require different text cases. Titles use Title Case (every major word capitalised). Programming uses camelCase and snake_case. Legal documents use ALL CAPS for certain terms. Sentence case (capitalising only the first word) is standard for body text and UI labels.</p><h2>Available Case Formats</h2><p>This converter supports: UPPERCASE (all capitals), lowercase (no capitals), Title Case (each word capitalised), Sentence case (first word capitalised), camelCase (no spaces, each word after first capitalised), snake_case (words joined by underscores), and kebab-case (words joined by hyphens).</p><h2>Programming Use Cases</h2><p>Developers frequently need to convert between naming conventions. Variable names in JavaScript use camelCase. CSS classes use kebab-case. Python variables use snake_case. Database column names often use snake_case. This tool handles all these conversions instantly.</p>`,
    faq: [
      { q: 'What is Title Case?', a: 'Title Case capitalises the first letter of each major word. Small words like "a", "the", "and" are not capitalised unless they start the title.' },
      { q: 'What is camelCase?', a: 'camelCase joins words without spaces, capitalising the first letter of each word after the first (e.g. myVariableName).' },
      { q: 'Is my text saved anywhere?', a: 'No. All conversions happen in your browser. Your text is never sent to any server.' }
    ],
    relatedTools: ['word-counter', 'text-cleaner', 'character-counter'],
    relatedBlogs: []
  },
  {
    slug: 'text-cleaner',
    name: 'Text Cleaner',
    category: 'Text Tools',
    categorySlug: 'text',
    icon: '🧹',
    desc: 'Remove extra spaces, line breaks, special characters, and clean messy text.',
    type: 'text-cleaner',
    metaTitle: 'Free Text Cleaner Online — Remove Spaces, Line Breaks, Special Characters',
    metaDesc: 'Clean messy text online for free. Remove extra spaces, line breaks, special characters, and HTML tags. Free text cleaner tool — works in your browser.',
    content: `<h2>What Is Text Cleaning?</h2><p>Text cleaning removes unwanted characters, extra whitespace, HTML tags, and formatting artefacts from text. When copying text from PDFs, websites, or word processors, hidden characters and inconsistent spacing often get carried along. Cleaning produces clean, plain text ready for any use.</p><h2>Common Text Problems</h2><p>Text copied from PDFs often contains line breaks in the middle of sentences. Text from websites may include HTML tags. Content from Word documents may include special curly quotes, em-dashes, and other non-standard characters that cause issues in code or databases. This cleaner handles all these cases.</p><h2>Use Cases for Text Cleaning</h2><p>Developers use text cleaners to sanitise user input. Content writers use them to clean up copied research. Data analysts use them to normalise text fields before processing. Email marketers use them to ensure consistent formatting in campaigns.</p>`,
    faq: [
      { q: 'Can this remove HTML tags from text?', a: 'Yes, the "Remove HTML Tags" option strips all HTML markup leaving only the plain text content.' },
      { q: 'What does "Remove Extra Spaces" do?', a: 'It replaces multiple consecutive spaces with a single space and trims leading/trailing whitespace from each line.' },
      { q: 'Is my text sent to any server?', a: 'No. All text processing happens locally in your browser.' }
    ],
    relatedTools: ['word-counter', 'case-converter', 'character-counter'],
    relatedBlogs: []
  },
  {
    slug: 'readability-analyzer',
    name: 'Readability Analyzer',
    category: 'Text Tools',
    categorySlug: 'text',
    icon: '📊',
    desc: 'Analyse the readability of your text with Flesch-Kincaid and other scores.',
    type: 'readability-analyzer',
    metaTitle: 'Free Readability Analyzer — Flesch-Kincaid Score Online',
    metaDesc: 'Analyse text readability with Flesch-Kincaid Reading Ease, Grade Level, and more. Free online readability checker — works instantly in your browser.',
    content: `<h2>What Is Readability?</h2><p>Readability measures how easy text is to read and understand. It considers factors like sentence length, word complexity, and syllable count. High readability means your content is accessible to a wider audience; low readability means it requires more education or effort to comprehend.</p><h2>Readability Scores Explained</h2><p>The Flesch Reading Ease score ranges from 0 to 100. Scores of 70–80 are easily understood by 13–15 year olds and are ideal for general web content. Scores of 60–70 are standard (plain English). Scores below 30 are very difficult (academic, technical writing). Most web content should aim for 60–70.</p><h2>Why Readability Matters for SEO</h2><p>Google's algorithm favours content that matches the reading level of its target audience. Content that is too complex for its audience has higher bounce rates, which signals poor quality to search engines. Writing at the right readability level improves time-on-page and engagement metrics.</p>`,
    faq: [
      { q: 'What readability score should I aim for?', a: 'For general web content, aim for a Flesch Reading Ease score of 60–70. For health content targeting the general public, 70–80 is ideal.' },
      { q: 'What is Flesch-Kincaid Grade Level?', a: 'It estimates the US school grade level required to understand the text. Grade 8 is suitable for most general audiences.' },
      { q: 'How many words do I need for an accurate score?', a: 'At least 100 words are recommended for an accurate readability score.' }
    ],
    relatedTools: ['word-counter', 'keyword-density', 'character-counter'],
    relatedBlogs: []
  },
  {
    slug: 'keyword-density',
    name: 'Keyword Density Checker',
    category: 'Text Tools',
    categorySlug: 'text',
    icon: '🔍',
    desc: 'Analyse keyword density and frequency in your content for SEO optimisation.',
    type: 'keyword-density',
    metaTitle: 'Free Keyword Density Checker Online — SEO Content Analysis',
    metaDesc: 'Check keyword density and word frequency in your content. Free online keyword density checker for SEO — analyse your text instantly in browser.',
    content: `<h2>What Is Keyword Density?</h2><p>Keyword density is the percentage of times a specific keyword or phrase appears in a piece of content relative to the total word count. It is calculated as: (keyword occurrences / total words) × 100. It has historically been used as a basic SEO metric.</p><h2>Ideal Keyword Density for SEO</h2><p>The generally recommended keyword density for SEO is 1–2% for your primary keyword. Above 3–4% risks being flagged as keyword stuffing by search engines, which can result in ranking penalties. Focus on natural, contextual use of keywords rather than hitting a specific percentage.</p><h2>Beyond Simple Keyword Density</h2><p>Modern SEO focuses on semantic relevance rather than raw keyword density. Google's algorithms understand synonyms, related terms, and topic clusters. Use keyword density as a sanity check to ensure you haven't overused or underused your primary terms, but prioritise writing for humans first.</p>`,
    faq: [
      { q: 'What keyword density is good for SEO?', a: 'Aim for 1–2% for your primary keyword. Anything above 3% risks being seen as keyword stuffing.' },
      { q: 'Does this tool analyse multi-word phrases?', a: 'This tool shows single word frequencies. Look for your target keyword in the results and note its frequency and percentage.' },
      { q: 'Are stop words included?', a: 'Common stop words (the, a, is, etc.) are filtered out so you see meaningful keyword data.' }
    ],
    relatedTools: ['word-counter', 'readability-analyzer', 'character-counter'],
    relatedBlogs: []
  },

  // ─── UTILITY TOOLS ────────────────────────────────────────────────────────
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'Utility Tools',
    categorySlug: 'utility',
    icon: '◼',
    desc: 'Generate QR codes for URLs, text, emails, and phone numbers instantly.',
    type: 'qr-code',
    metaTitle: 'Free QR Code Generator Online — Create QR Codes Instantly',
    metaDesc: 'Generate QR codes for URLs, text, email, and phone numbers online for free. No sign-up — download as PNG instantly. Free QR code generator.',
    content: `<h2>What Is a QR Code?</h2><p>A QR (Quick Response) code is a two-dimensional barcode that can store various types of information — URLs, plain text, contact details, Wi-Fi credentials, and more. Smartphone cameras can scan QR codes instantly, making them a fast way to share links and information in the physical world.</p><h2>Uses for QR Codes</h2><p>QR codes are used in: restaurant menus (linking to digital menus), business cards (linking to contact pages), marketing materials (linking to landing pages), product packaging (linking to instructions or promotions), event tickets, and Wi-Fi sharing. They bridge the gap between physical print and digital content.</p><h2>QR Code Best Practices</h2><p>Always test your QR code before printing. Include a call-to-action near the QR code (e.g. "Scan to visit our website"). Ensure adequate contrast (dark code on light background). For print materials, make the QR code at least 2.5cm × 2.5cm for reliable scanning. Consider where the QR code will take users and ensure that destination is mobile-optimised.</p>`,
    faq: [
      { q: 'Can I customise the colour of my QR code?', a: 'The standard black-on-white QR code provides the best scanning reliability. Always maintain high contrast between the code and background.' },
      { q: 'How long do QR codes last?', a: 'QR codes themselves do not expire. However, if the URL they link to goes offline or changes, the QR code will become non-functional.' },
      { q: 'What is the maximum amount of text a QR code can hold?', a: 'QR codes can hold up to around 4,000 characters, though shorter content produces simpler, more easily scanned codes.' },
      { q: 'Can I download the QR code as an image?', a: 'Yes, the generated QR code can be downloaded as a PNG image for use in documents and print materials.' }
    ],
    relatedTools: ['url-encoder', 'password-generator', 'uuid-generator'],
    relatedBlogs: []
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'Utility Tools',
    categorySlug: 'utility',
    icon: '🔐',
    desc: 'Generate strong, secure random passwords with custom length and character sets.',
    type: 'password-generator',
    metaTitle: 'Free Strong Password Generator Online — Secure & Random',
    metaDesc: 'Generate strong, random passwords instantly. Customise length and character types. Free online password generator — no server, works in browser.',
    content: `<h2>Why Use a Password Generator?</h2><p>Human-created passwords tend to be predictable — they use dictionary words, names, dates, and common substitutions. A strong password is truly random, long enough to resist brute-force attacks, and unique to each account. A password generator eliminates human bias and creates maximally secure passwords.</p><h2>What Makes a Strong Password?</h2><p>A strong password should be: at least 12 characters long (16+ is ideal), use a mix of uppercase and lowercase letters, numbers, and symbols, not be based on any real word or personal information, and be unique to each account. Shorter passwords with just lowercase letters can be cracked in seconds; a 16-character mixed password would take billions of years.</p><h2>Password Security Best Practices</h2><p>Use a password manager to store unique passwords for every account — you only need to remember one master password. Enable two-factor authentication (2FA) wherever possible. Never reuse passwords across different accounts. Change passwords for critical accounts regularly, especially after any data breach notification.</p>`,
    faq: [
      { q: 'Is this password generator truly random?', a: 'Yes. We use the Web Crypto API (crypto.getRandomValues) which generates cryptographically secure random values — the same technology used in security software.' },
      { q: 'Are my generated passwords saved or logged?', a: 'No. Password generation happens entirely in your browser. Nothing is ever sent to any server.' },
      { q: 'What length should my password be?', a: 'We recommend at least 16 characters for all important accounts. For master passwords, use 20+ characters.' },
      { q: 'Should I use symbols in passwords?', a: 'Yes, including symbols dramatically increases the number of possible combinations, making passwords much harder to crack.' }
    ],
    relatedTools: ['uuid-generator', 'base64-encoder', 'qr-code-generator'],
    relatedBlogs: []
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'Utility Tools',
    categorySlug: 'utility',
    icon: '🔑',
    desc: 'Generate version 4 UUIDs instantly for use in databases and applications.',
    type: 'uuid-generator',
    metaTitle: 'Free UUID Generator Online — Generate UUIDs Instantly',
    metaDesc: 'Generate version 4 UUIDs (GUIDs) instantly online for free. Generate single or bulk UUIDs for databases, APIs, and software development.',
    content: `<h2>What Is a UUID?</h2><p>A UUID (Universally Unique Identifier), also known as a GUID (Globally Unique Identifier), is a 128-bit identifier that is guaranteed to be unique across all space and time. UUIDs are formatted as 32 hexadecimal characters separated by hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.</p><h2>UUID Version 4</h2><p>Version 4 UUIDs (the most commonly used) are randomly generated. With 122 random bits, the probability of generating two identical UUIDs is astronomically small — you would need to generate over a billion UUIDs per second for 85 years before there is a 50% chance of a single collision.</p><h2>Common Uses for UUIDs</h2><p>UUIDs are used as: primary keys in databases (especially distributed systems where auto-increment integers cause conflicts), unique identifiers for API resources, session tokens, tracking IDs, file names for uploaded assets, and any context where globally unique identifiers are needed without central coordination.</p>`,
    faq: [
      { q: 'What is the difference between UUID v1 and v4?', a: 'UUID v1 is based on the current timestamp and device MAC address. UUID v4 is randomly generated. v4 is preferred for most use cases as it does not expose device information.' },
      { q: 'Are UUIDs truly unique?', a: 'Statistically yes. The chance of collision is so astronomically small that for practical purposes, UUIDs can be treated as globally unique.' },
      { q: 'Can I generate multiple UUIDs at once?', a: 'Yes, use the bulk generation option to generate up to 100 UUIDs in one click.' }
    ],
    relatedTools: ['password-generator', 'base64-encoder', 'json-formatter'],
    relatedBlogs: []
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder / Decoder',
    category: 'Utility Tools',
    categorySlug: 'utility',
    icon: '⚙️',
    desc: 'Encode and decode Base64 strings for data transmission and storage.',
    type: 'base64',
    metaTitle: 'Free Base64 Encoder Decoder Online — Instant Conversion',
    metaDesc: 'Encode or decode Base64 strings online for free. Instant Base64 conversion for developers — no sign-up, works entirely in your browser.',
    content: `<h2>What Is Base64?</h2><p>Base64 is an encoding scheme that converts binary data into a text string using 64 printable ASCII characters. It is not encryption — it is purely an encoding format used to safely transmit binary data over text-based protocols like HTTP, email (MIME), and JSON.</p><h2>Why Use Base64?</h2><p>Many text-based protocols cannot handle binary data safely. Base64 encodes binary into plain text that can travel through any text channel without corruption. Common uses include: embedding images directly in HTML/CSS as data URIs, sending binary data in JSON APIs, storing binary data in databases that accept only text, and encoding authentication credentials in HTTP headers.</p><h2>Base64 and Email</h2><p>Email attachments are Base64-encoded to ensure binary files (images, PDFs, executables) can pass through email servers that only handle 7-bit ASCII text. This is why email files appear as a long string of random characters when viewed in raw format.</p>`,
    faq: [
      { q: 'Is Base64 encoding the same as encryption?', a: 'No. Base64 is encoding only — it is easily reversible and provides no security. Anyone can decode a Base64 string instantly.' },
      { q: 'How much does Base64 increase file size?', a: 'Base64-encoded data is approximately 33% larger than the original binary data.' },
      { q: 'Can I encode images to Base64?', a: 'Yes. Images encoded as Base64 can be embedded directly in HTML using data URIs: <img src="data:image/png;base64,..."/>' }
    ],
    relatedTools: ['url-encoder', 'json-formatter', 'uuid-generator'],
    relatedBlogs: []
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Utility Tools',
    categorySlug: 'utility',
    icon: '{}',
    desc: 'Format, validate, and minify JSON data with syntax highlighting.',
    type: 'json-formatter',
    metaTitle: 'Free JSON Formatter & Validator Online — Pretty Print JSON',
    metaDesc: 'Format, validate, and minify JSON online for free. Pretty print JSON with syntax highlighting. Free JSON formatter — works in your browser instantly.',
    content: `<h2>What Is JSON?</h2><p>JSON (JavaScript Object Notation) is a lightweight, human-readable data format used for exchanging data between systems. It is the standard format for REST APIs, configuration files, database exports, and web application data. JSON uses key-value pairs, arrays, and nested objects.</p><h2>Why Format JSON?</h2><p>Raw JSON from APIs and systems is often minified — all on one line with no whitespace. While this is efficient for data transfer, it is very difficult to read. Formatting (or "pretty printing") adds indentation and line breaks to make the structure clear and easy to understand and debug.</p><h2>JSON Validation</h2><p>Invalid JSON causes errors in applications and APIs. Common JSON errors include: missing or extra commas, unquoted property names, using single quotes instead of double quotes, trailing commas after the last element. This tool validates your JSON and reports specific errors with their location.</p>`,
    faq: [
      { q: 'What is the difference between formatting and minifying JSON?', a: 'Formatting adds whitespace and indentation for readability. Minifying removes all whitespace to reduce file size for production use.' },
      { q: 'Can this tool validate my JSON?', a: 'Yes. If your JSON has syntax errors, the tool will display an error message describing the problem.' },
      { q: 'Is my JSON data sent to any server?', a: 'No. All JSON processing happens in your browser using JavaScript\'s built-in JSON.parse and JSON.stringify.' }
    ],
    relatedTools: ['base64-encoder', 'url-encoder', 'uuid-generator'],
    relatedBlogs: []
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder / Decoder',
    category: 'Utility Tools',
    categorySlug: 'utility',
    icon: '🔗',
    desc: 'Encode and decode URL components for safe use in web addresses.',
    type: 'url-encoder',
    metaTitle: 'Free URL Encoder Decoder Online — Percent Encoding Tool',
    metaDesc: 'Encode or decode URL strings online for free. Convert special characters to percent encoding and back. Free URL encoder — works instantly in browser.',
    content: `<h2>What Is URL Encoding?</h2><p>URL encoding (also called percent encoding) converts special characters in a URL into a format that can be safely transmitted over the internet. Characters that are not allowed in URLs (spaces, &, =, ?, #, and others) are replaced with a % followed by their hexadecimal ASCII code. For example, a space becomes %20 or +.</p><h2>Why URL Encoding Is Necessary</h2><p>URLs can only contain a limited set of ASCII characters. When you need to include special characters — like accented letters, spaces, symbols, or characters from other alphabets — in a URL, they must be percent-encoded. Without encoding, these characters can break URLs or be misinterpreted by servers and browsers.</p><h2>URL Encoding in Practice</h2><p>When you perform a Google search for "weight loss tips", your browser encodes the URL as ?q=weight+loss+tips or ?q=weight%20loss%20tips. Form data submitted via GET requests is URL-encoded. API query parameters must be URL-encoded to safely include special characters in parameter values.</p>`,
    faq: [
      { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI encodes a full URL, preserving characters like / and ?. encodeURIComponent encodes a URL component, encoding everything except alphanumerics and a few safe symbols. Use encodeURIComponent for parameter values.' },
      { q: 'Is URL encoding the same as URL shortening?', a: 'No. URL encoding modifies characters within a URL to make them safe. URL shortening creates a different, shorter URL that redirects to the original.' },
      { q: 'Is my data sent to any server?', a: 'No. URL encoding and decoding uses JavaScript\'s built-in encodeURIComponent and decodeURIComponent — entirely in your browser.' }
    ],
    relatedTools: ['base64-encoder', 'json-formatter', 'qr-code-generator'],
    relatedBlogs: []
  }
];
