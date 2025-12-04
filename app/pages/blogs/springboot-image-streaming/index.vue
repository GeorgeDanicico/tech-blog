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
          <span class="pill">6 min read</span>
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
          We will create now a simple html page in <code>/src/main/.../resources/static/index.</code>
        </p>
        <pre class="code-block"><code class="language-java">
@Service
public class ImageService {

  private final ClassPathResourceLoader loader = new ClassPathResourceLoader();

  public byte[] load(String name) {
    try (InputStream in = loader.getResource("images/" + name).getInputStream()) {
      return in.readAllBytes();
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found", e);
    }
  }
}
        </code></pre>
      </section>

      <section class="card">
        <h3>Test</h3>
        <p>
          You can run the application and test it using: <code>mvn spring-boot:run</code>
        </p>
        <pre class="code-block"><code class="language-java">
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ImageControllerTest {

  @Autowired
  WebTestClient client;

  @Test
  void returnsFullImageWhenNoRange() {
    client.get()
      .uri("/assets/hero.jpg")
      .exchange()
      .expectStatus().isOk()
      .expectHeader().contentType("image/jpeg")
      .expectBody()
      .consumeWith(result -&gt; assertThat(result.getResponseBody()).isNotEmpty());
  }

  @Test
  void returnsPartialWhenRangeProvided() {
    client.get()
      .uri("/assets/hero.jpg")
      .header("Range", "bytes=0-99")
      .exchange()
      .expectStatus().isPartialContent()
      .expectHeader().valueEquals("Content-Range", "bytes 0-99/1024")
      .expectBody()
      .consumeWith(result -&gt; assertThat(result.getResponseBody()).hasSize(100));
  }
}
        </code></pre>
      </section>

      <section class="card">
        <h3>Where to extend next</h3>
        <ul class="next-steps">
          <li>Add content negotiation for WebP/AVIF based on <code>Accept</code> header.</li>
          <li>Push large assets through a non-blocking stack (Spring WebFlux) to avoid tying up threads.</li>
          <li>Layer in ETags based on the backing store version or checksum.</li>
          <li>Expose basic metrics: hit rate, average bytes served, and 206 vs 200 ratio.</li>
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
  color: var(--text-muted);
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
  color: var(--text-muted);
}
</style>
