<script lang="ts">
    import Sidebar from "../components/Sidebar.svelte";
    import { ExtraInfo } from "../components/SidebarItem";
    import SidebarItem from "../components/SidebarItem";
    import Viewer from "../components/Viewer.svelte";
    import type WikiInfo from "../components/WikiInfo";

    let url: string =
        "https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md";

    export let location: Location;
    async function getMDFile(file: string) {
        const response = await fetch(file);
        const text = await response.text();
        return text;
    }
    let items: SidebarItem<string>[] = [
        new SidebarItem<string>(
            "Default",
            [],
            new ExtraInfo(async () => {
                return "";
            })
        ),
    ];
    let currentItem: SidebarItem<string> = items[0];
    async function getWikiInfo() {
        const response = await fetch("data/wiki.json");
        const text: WikiInfo[] = await response.json();
        // We transform wikiInfo into sidebar items
        items = text.map((wikiInfo: WikiInfo) => {
            return new SidebarItem<string>(
                wikiInfo.title,
                wikiInfo.toc.map((section: string) => {
                    return {
                        title: section.toLowerCase() == "index" ? "" : section,
                        subsection:
                            section.toLowerCase() == "index"
                                ? ""
                                : section.toLowerCase().replace(/ /g, "-"),
                    };
                }),
                new ExtraInfo<string>(async () => {
                    return getMDFile(wikiInfo.url);
                })
            );
        });
        getCurrentItem();
        return items;
    }
    function getCurrentItem() {
        currentItem = items[0];
        var index = location.hash.indexOf(".");
        if (index === -1) {
            index = location.hash.length;
        }
        var fileName = location.hash.substring(1, index);
        if (fileName.length > 0) {
            currentItem = items.find(
                (item) =>
                    item.title.toLowerCase().replace(/ /g, "-") == fileName
            );
        } else {
            currentItem = items[0];
        }
    }
</script>

<div class="flex sm:flex-row flex-col max-w-screen h-full  ">
    {#await getWikiInfo()}
        Loading
    {:then sidebarItems}
        <div
            class="flex-grow sm:max-w-1/12 md:max-w-xs h-full flex flex-1 overflow-hidden md:fixed  md:top-auto     w-full "
        >
            <Sidebar {sidebarItems} bind:currentItem />
        </div>
        <div
            class="flex-grow max-w-full flex flex-1 flex-col overflow-y-auto md:ml-96 md:p-10"
        >
            {#await currentItem.info.callback()}
                Loading
            {:then value}
                <Viewer {value} {location} />
            {/await}
        </div>
    {/await}
</div>

<svelte:head>
    <link
        href="https://unpkg.com/prismjs@1.27.0/themes/prism.min.css"
        rel="stylesheet"
    />
    <link
        href="https://unpkg.com/prismjs@1.27.0/themes/prism-twilight.min.css"
        rel="stylesheet"
    />

    <script
        src="https://unpkg.com/prismjs@1.27.0/components/prism-core.min.js"></script>
    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/autoloader/prism-autoloader.min.js"></script>

    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/highlight-keywords/prism-highlight-keywords.min.js"></script>

    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
    <link
        href="https://unpkg.com/prismjs@1.27.0/plugins/line-numbers/prism-line-numbers.min.css"
        rel="stylesheet"
    />

    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/toolbar/prism-toolbar.min.js"></script>
    <link
        href="https://unpkg.com/prismjs@1.27.0/plugins/toolbar/prism-toolbar.min.css"
        rel="stylesheet"
    />

    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>
    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js"></script>
    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/remove-initial-line-feed/prism-remove-initial-line-feed.min.js"></script>

    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/diff-highlight/prism-diff-highlight.min.js"></script>
    <link
        href="https://unpkg.com/prismjs@1.27.0/plugins/diff-highlight/prism-diff-highlight.min.css"
        rel="stylesheet"
    />

    <script
        src="https://unpkg.com/prismjs@1.27.0/plugins/command-line/prism-command-line.min.js"></script>
    <link
        href="https://unpkg.com/prismjs@1.27.0/plugins/command-line/prism-command-line.min.css"
        rel="stylesheet"
    />
</svelte:head>
