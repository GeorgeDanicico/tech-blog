---
title: Streaming images with Spring Boot
description: An example of streaming images with Spring Boot, giving the feeling of generating an image by AI.
date: "2025-12-04"
readTime: "3 min read"
cover: /images/blogs/knight.png
---

We are going to build a simple image streaming application with Spring Boot, similar to the experience offered by AI agents when generating images. I was inspired by Markus Eisele's [post](https://open.substack.com/pub/myfear/p/progressive-image-streaming-quarkus-java?r=1v3fb4), but I wanted to try to implement a similar thing in Spring Boot since I use it a lot at work.

You will need Java 17, Maven, and a browser to run the example. You can find the [full project in my GitHub repository](https://github.com/GeorgeDanicico/spring-boot-demos/tree/main/image-streaming).

## Prepare the image

Add the image you want to stream to `/src/main/resources/images/knight.png` (or any filename you prefer). The endpoint will stream the file chunk by chunk so you can watch it render progressively.

![The demo streams this PNG progressively so you can watch it render in place.](/images/blogs/knight.png)

## Implement the streaming endpoint

Create a controller named `ImageController.java`:

```java
@RestController()
public class ImageController {

    private static final String IMAGE_ROOT = "src/main/resources/images";

    @GetMapping("/api/image/stream/{filename}")
    public void streamImage(HttpServletResponse response,
                            @PathVariable("filename") String filename) throws IOException, InterruptedException {

        File imageFile = new File(IMAGE_ROOT + "/" + filename);
        if (!imageFile.exists() || !imageFile.isFile()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        response.setContentType("image/jpeg");
        response.setHeader("Content-Length", String.valueOf(imageFile.length()));

        try (InputStream in = new FileInputStream(imageFile);
             OutputStream out = response.getOutputStream()) {

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
                out.flush();
                Thread.sleep(50); // Simulate a progressive image generation
            }
        } catch (IOException ex) {
            throw ex;
        }
    }
}
```

We leverage the `ServletOutputStream` to stream the image in 4 KB chunks to the client. The short `Thread.sleep` simulates the feeling of an AI image rendering over time.

## Our frontend

Create a simple HTML page in `src/main/resources/static/index.html` that streams the response body as it arrives:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Progressive Image Streaming</title>
    <style>
        body {
            font-family: sans-serif;
            text-align: center;
            padding-top: 40px;
        }

        img {
            max-width: 80%;
            border-radius: 8px;
            box-shadow: 0 0 10px #ccc;
        }
    </style>
</head>

<body>
    <h1>Progressive Image Streaming Demo</h1>
    <img id="progressive" alt="streamed image">
    <script>
        const img = document.getElementById('progressive');
        const chunks = [];
        let currentBlobUrl = null;

        fetch('/api/image/stream/knight.png')
            .then(res => {
                const reader = res.body.getReader();
                
                function read() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            updateImage();
                            return;
                        }
                        
                        chunks.push(value);
                        setTimeout(() => updateImage(), 100);
                        read();
                    });
                }
                
                function updateImage() {
                    if (currentBlobUrl) {
                        URL.revokeObjectURL(currentBlobUrl);
                    }
                    
                    const blob = new Blob(chunks, { type: 'image/png' });
                    currentBlobUrl = URL.createObjectURL(blob);
                    img.src = currentBlobUrl;
                }
                
                read();
            })
            .catch(err => {
                console.error('Error loading image:', err);
            });
    </script>
</body>

</html>
```

## Validation

Run the application and test it with:

```bash
mvn spring-boot:run
```

## Docs & next steps

- [Spring MVC streaming responses](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/streaming.html)
- [ReadableStream#getReader](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader)
- [Nuxt Image module docs](https://image.nuxt.com/)
- Java 21 is recommended; set cache headers so CDNs and browsers can reuse the asset.
- Verify content length when possible; otherwise, fall back to chunked streaming.
- Add integration tests that fetch both a small and a large image.
