<script lang="ts">
    import FeedItemClass from "./FeedItemClass";
    import SidebarItem, { SidebarSection } from "./SidebarItem";

    export let sidebarItems: SidebarItem<any>[] = [
        new SidebarItem<any>("Default", [
            new SidebarSection("Default", "default"),
        ]),
        new SidebarItem<any>("Default"),
        new SidebarItem<any>("Default", [
            new SidebarSection("Default", "default"),
        ]),
    ];
    export let currentItem: SidebarItem<any> = sidebarItems[0];

    function setCurrentItem(item: SidebarItem<any>) {
        if (currentItem != item) {
            currentItem = item;
        }
    }

    function normalizeTitle(title: string) {
        return title.toLowerCase().replace(/ /g, "-");
    }
    function normalizeTOC(TOCString: string) {
        return makeHTMLString(
            TOCString.toLowerCase().replace(/ /g, "-")
        ).replace(/[^a-zA-Z0-9-]/g, "");
    }
    function makeHTMLString(TOCString: string) {
        // We generate a html p element and return the value of innerHTML
        // becuase we need the resolved html string.
        const p = document.createElement("p");
        p.innerHTML = TOCString;
        return p.innerHTML;
    }
</script>

<div
    class="flex flex-col flex-grow border-r border-white pt-5 pb-4 bg-white dark:bg-gray-800 dark:border-gray-800 overflow-y-auto "
>
    <div class="mt-5 flex-grow flex flex-col">
        <nav
            class="flex-1 px-2 space-y-1 bg-white dark:bg-gray-800 "
            aria-label="Sidebar"
        >
            {#each sidebarItems as item}
                {#if currentItem === item}
                    <div>
                        {#if item.sections.length > 0}
                            <div class="space-y-1">
                                <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                                <button
                                    type="button"
                                    class="bg-gray-100 dark:text-gray-50 dark:bg-gray-700 text-gray-900 group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                                    aria-controls="sub-menu-1"
                                    aria-expanded="false"
                                    aria-label="Toggle sub menu"
                                    on:click={() => setCurrentItem(item)}
                                >
                                    <span> {item.title} </span>
                                    <span class="flex-grow " />
                                    <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
                                    <svg
                                        class="text-gray-300 ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 dark:group-hover:text-gray-600 transition-colors ease-in-out duration-150"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M6 6L14 10L6 14V6Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                                <!-- Expandable link section, show/hide based on state. -->
                                {#each item.sections as section}
                                    <div class="space-y-1 {currentItem == item ? '' : 'hidden' }" id="sub-menu-1">
                                        <a
                                            on:click={() =>
                                                setCurrentItem(item)}
                                            href="#{normalizeTitle(
                                                item.title
                                            )}.{normalizeTOC(section.title)}"
                                            class="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium  dark:text-gray-100 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            {makeHTMLString(section.title)}
                                        </a>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                            <a
                                on:click={() => setCurrentItem(item)}
                                href="#{normalizeTitle(item.title)}"
                                class="bg-gray-100 dark:text-gray-50 dark:bg-gray-700 text-gray-900 group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                                >{item.title}</a
                            >
                        {/if}
                    </div>
                {:else if item.sections.length > 0}
                    <div class="space-y-1">
                        <!-- Current: "bg-gray-100 text-gray-900", Default: "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                        <button
                            on:click={() => setCurrentItem(item)}
                            type="button"
                            class="bg-white dark:bg-gray-800 dark:text-gray-100 text-gray-600 dark:hover:bg-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-controls="sub-menu-1"
                            aria-expanded="false"
                        >
                            <span> {item.title} </span>
                            <span class="flex-grow" />
                            <!-- Expanded: "text-gray-400 rotate-90", Collapsed: "text-gray-300" -->
                            <svg
                                class="text-gray-300 ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 dark:group-hover:text-gray-600 transition-colors ease-in-out duration-150"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6 6L14 10L6 14V6Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <!-- Expandable link section, show/hide based on state. -->
                        {#each item.sections as section}
                            <div class="space-y-1 {currentItem == item ? '' : 'hidden' }" id="sub-menu-1">
                                <a
                                    on:click={() => setCurrentItem(item)}
                                    href="#{normalizeTitle(
                                        item.title
                                    )}.{normalizeTOC(section.title)}"
                                    class="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium  dark:text-gray-100 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    {makeHTMLString(section.title)}
                                </a>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <a
                        href="#{normalizeTitle(item.title)}"
                        class="bg-white dark:bg-gray-800 dark:text-gray-100 text-gray-600 dark:hover:bg-gray-600 hover:bg-gray-50 hover:text-gray-900 group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  "
                        >{item.title}</a
                    >
                {/if}
            {/each}
        </nav>
        <div class="md:h-24" />
    </div>
</div>
