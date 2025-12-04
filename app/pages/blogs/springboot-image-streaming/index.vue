<template>
  <div class="article">
    <UContainer class="article-frame">
      <header class="article-hero">
        <h1>Streaming images with Spring Boot</h1>
        <p class="lede">
          An example of streaming images with Spring Boot, giving the feeling of generating an image by AI.
        </p>

        <div class="meta-row">
          <span class="pill">Published: 4 Dec 2025</span>
          <span class="pill">3 min read</span>
        </div>
      </header>

      <section class="card">
        <p>We are going to build a simple image streaming application with Spring Boot, similar to the experience offered by AI agents when generating images. I was inspired by Markus Eisele's <a href="https://open.substack.com/pub/myfear/p/progressive-image-streaming-quarkus-java?r=1v3fb4" target="_blank">post</a>, but I wanted to try to implement a similar thing, but in Spring Boot, since I use Spring Boot a lot at work.</p>
        <p>
          You will need Java 17, Maven and a Browser to run the example. You can find the <a href="https://github.com/GeorgeDanicico/spring-boot-demos/tree/main/image-streaming">full example in my Github repository</a>.
        </p>
      </section>

      <section class="card">
        <h2>Prepare the image.</h2>
        <p>
          We are going to add this image in <code>/src/main/.../resources/images/knight.png</code>.
        </p>

        <p>You can add any image you want and we'll stream this image chunk by chunk</p>

        <figure class="image-preview">
          <NuxtImg
            src="/images/blogs/knight.png"
            alt="Knight illustration used for the streaming demo"
            width="960"
            height="640"
            class="image-preview__img"
          />
          <figcaption>The demo will stream this PNG progressively so you can watch it render in place.</figcaption>
        </figure>
      </section>

      <section class="card">
        <h2>Implement the Streaming Endpoint</h2>
        <p>
          Create a controller <code>ImageController.java:</code>
        </p>

             <pre class="code-block"><code class="language-java">
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
                Thread.sleep(50); // We simulate a progressive image generation

            }
        } catch (IOException ex) {
            throw ex;
        }
    }
}
        </code></pre>

        <p>We are leveraging the <code>ServletOutputStream</code> to stream the image in chunks of 4KB to the client (our frontend which will be shown in the next chapter)</p>
      </section>

      <section class="card">
        <h2>Our frontend</h2>
        <p>
          We will create now a simple HTML page in <code>src/main/resources/static/index.html</code> that streams the response body as it arrives.
        </p>
        <pre class="code-block"><code class="language-html" v-pre>
&lt;!DOCTYPE html
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Progressive Image Streaming&lt;/title&gt;
    &lt;style&gt;
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
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;h1&gt;Progressive Image Streaming Demo&lt;/h1&gt;
    &lt;img id="progressive" alt="streamed image"&gt;
    &lt;script&gt;
        const img = document.getElementById('progressive');
        const chunks = [];
        let currentBlobUrl = null;

        fetch('/api/image/stream/knight.png')
            .then(res => {
                const reader = res.body.getReader();
                
                function read() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            // Final update with all chunks
                            updateImage();
                            return;
                        }
                        
                        chunks.push(value);
                        // Update image as chunks arrive
                        setTimeout(() => updateImage(), 100);
                        read();
                    });
                }
                
                function updateImage() {
                    // Revoke previous blob URL to free memory
                    if (currentBlobUrl) {
                        URL.revokeObjectURL(currentBlobUrl);
                    }
                    
                    // Create new blob from accumulated chunks
                    const blob = new Blob(chunks, { type: 'image/png' });
                    currentBlobUrl = URL.createObjectURL(blob);
                    img.src = currentBlobUrl;
                }
                
                read();
            })
            .catch(err => {
                console.error('Error loading image:', err);
            });
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;
        </code></pre>
      </section>

      <section class="card">
        <h2>Validation</h2>
        <p>
          You can run the application and test it using: <code>mvn spring-boot:run</code> to validate the changes.
        </p>
        
      </section>

      <section class="card">
        <p class="doc-links-label">Docs:</p>
        <ul class="doc-links">
          <li><a href="https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/streaming.html" target="_blank" rel="noreferrer">Spring MVC streaming responses</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader" target="_blank" rel="noreferrer">ReadableStream#getReader</a></li>
          <li><a href="https://image.nuxt.com/" target="_blank" rel="noreferrer">Nuxt Image module docs</a></li>
        </ul>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Spring Boot image streaming mock | Tech Blog',
  description: 'Mock walkthrough for streaming images from Spring Boot with byte ranges, caching, and chunked responses.',
  ogTitle: 'Spring Boot image streaming mock | Tech Blog',
  ogDescription: 'Mock walkthrough for streaming images from Spring Boot with byte ranges, caching, and chunked responses.'
})

const checklist = [
  'Java 21',
  'Set correct cache headers for CDN + browser re-use.',
  'Verify content-length when possible, otherwise fall back to chunked streaming.',
  'Add integration tests that fetch a small image and a large one.'
] as const
</script>


<style scoped>
.article {
  padding: clamp(24px, 4vw, 64px) 0;
  color: #f7f7ff;
}

.article-frame {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.article-hero {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
  color: var(--text-muted);
}

.article h1 {
  margin: 0;
  font-size: clamp(2.2rem, 3vw, 3rem);
  letter-spacing: -0.02em;
}

.lede {
  margin: 0;
  color: #e7edff;
  max-width: 780px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  border: 1px solid var(--outline);
  border-radius: var(--radius-lg);
  background: var(--glass);
  box-shadow: var(--shadow-elevated);
  padding: clamp(18px, 3vw, 32px);
  display: grid;
  gap: 12px;
  text-align: left;
}

.article p,
.article li {
  color: inherit;
  text-align: left;
}

.article h1,
.article h2,
.article h3 {
  color: inherit;
}

.article a {
  color: #c8e3ff;
}

.article a:hover {
  color: #e1ecff;
}

.checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.checklist li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-strong);
}

.code-block {
  background: #0b1a32;
  border: 1px solid var(--outline);
  border-radius: var(--radius-md);
  padding: 14px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  color: #e8edf7;
}

.code-block code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.next-steps {
  list-style: disc;
  padding-left: 20px;
  margin: 0;
  color: inherit;
  display: grid;
  gap: 6px;
}

.image-preview {
  margin: 0;
  background: #0b1a32;
  border: 1px solid var(--outline);
  border-radius: var(--radius-md);
  padding: 12px;
  display: grid;
  gap: 6px;
}

.image-preview__img {
  width: 100%;
  border-radius: var(--radius-sm);
  border: 1px solid #1f2d4a;
}

.image-preview figcaption {
  font-size: 14px;
  color: #c8d6f2;
  text-align: left;
}

.doc-links-label {
  margin: 4px 0 0;
  color: inherit;
}

.doc-links {
  list-style: disc;
  padding-left: 20px;
  margin: 0;
  display: grid;
  gap: 6px;
}
</style>
