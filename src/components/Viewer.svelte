<script lang="ts">
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import { elementScrollIntoViewPolyfill } from "seamless-scroll-polyfill";

  elementScrollIntoViewPolyfill();

  const Prism: any = Window["Prism"];
  import {
    tick,
    onDestroy,
    onMount,
    createEventDispatcher,
    afterUpdate,
  } from "svelte";
  export let value: string =
    "# Hello World\n```css\n.hello{\ntop:10px;\n}\n```";

  export let location: Location;
  let isMounted: boolean = false;
  onMount(() => {
    isMounted = true;
  });
  let prev = location.hash;

  $: {
    if (isMounted) {
      if (location.hash != prev) {
        const element = document.getElementById(
          location.hash.substring(location.hash.indexOf(".") + 1)
        );

        if (element !== null) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }
      prev = location.hash;
    }
  }
  // We are not generic, so we can have a bit of liberty setting up markdown like github does.
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: false,
    sanitizer: DOMPurify.sanitize,
  });

  $: htmlOut = marked.parse(value);

  $: html = `${htmlOut}<!--${0}-->`;
</script>

<div
  id="viewer"
  class="markdown-body line-numbers prose dark:prose-invert prose-img:rounded-md prose-img:shadow-md prose-img:inline scroll-smooth motion-safe:scroll-auto "
>
  {@html html}
</div>
