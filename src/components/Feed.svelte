<script lang="ts">
    import FeedItemClass from "./FeedItemClass";
    export let items: FeedItemClass[] = [
        new FeedItemClass(),
        new FeedItemClass(),
        new FeedItemClass(),
    ];
</script>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl ">
        <h3 class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl text-left mb-6  ">Announcements</h3>

        <ul class="divide-y divide-gray-200">
            {#each items as item}
                <li
                    class="relative dark:bg-gray-800 bg-white py-5 px-4 dark:hover:bg-gray-900  hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
                >
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#" class="block focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true" />
                                <p
                                    class="text-sm font-medium text-gray-900 dark:text-white truncate"
                                >
                                    {#if item.publisher.length == 0}
                                        <div
                                            class="flex flex-col space-y-3 animate-pulse mb-2"
                                        >
                                            <div
                                                class="w-24 bg-gray-300 h-4 rounded-md "
                                            />
                                        </div>
                                    {:else}
                                        {item.publisher}
                                    {/if}
                                </p>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-200 truncate"
                                >
                                    {#if item.title.length == 0}
                                        <div
                                            class="flex flex-col space-y-3 animate-pulse"
                                        >
                                            <div
                                                class="w-32 bg-gray-300 h-4 rounded-md "
                                            />
                                        </div>
                                    {:else}
                                        {item.title}
                                    {/if}
                                </p>
                            </a>
                        </div>
                        <time
                            datetime="2021-01-27T16:35"
                            class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100"
                        >
                            {#if item.date.length == 0}
                                <div class="flex flex-col space-y-3 animate-pulse">
                                    <div class="w-20 bg-gray-300 h-4 rounded-md " />
                                </div>
                            {:else}
                                {item.date}
                            {/if}</time
                        >
                    </div>
                    <div class="mt-1">
                        <p
                            class="line-clamp-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                            {#each item.announcement as line}
                                {#if line.length == 0}
                                    <div
                                        class="flex flex-col space-y-3 animate-pulse mt-2 "
                                    >
                                        <div class="w-50 bg-gray-300 h-4 rounded-md " />
                                    </div>
                                {:else}
                                    <p>{line}</p>
                                {/if}
                            {/each}
                        </p>
                    </div>
                </li>
            {/each}
        </ul>
            </div>
  </div>
