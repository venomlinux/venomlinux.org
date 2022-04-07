<script lang="ts">
    import type DownloadItem from "../components/DownloadItem";
    import { DownloadItemType } from "../components/DownloadItem";

    async function getDownloads() {
        const response = await fetch("data/downloads.json");
        const json: DownloadItem[] = await response.json();
        return json;
    }

    function getTypeString(type: DownloadItemType) {
        switch (<any>DownloadItemType[type]) {
            case DownloadItemType.rootfs:
                return "Root File System";
            case DownloadItemType.live_cd:
                return "Live CD";
        }
        return "Unknown";
    }
    function openDownload(url: string) {
        window.open(url, "_blank");
    }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1
                        class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl text-left mb-6"
                    >
                        Downloads
                    </h1>
                    <p class="mt-2 text-sm text-gray-700 dark:text-gray-200">
                        Venom can be build manually as seen in the wiki, but,
                        here are some download links to create your OS via
                        RootFS or Live CD
                    </p>
                </div>
            </div>
            <div
                class="-mx-4 mt-10 ring-1 ring-gray-300 dark:ring-white sm:-mx-6 md:mx-0 md:rounded-lg"
            >
                <table class="min-w-full divide-y divide-gray-300 mb-2">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                                >Version</th
                            >
                            <th
                                scope="col"
                                class=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white lg:table-cell"
                                >Page</th
                            >
                            <th
                                scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                                >Type</th
                            >
                            <th
                                scope="col"
                                class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                                <span class="sr-only">Download</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#await getDownloads()}
                            Loading
                        {:then downloads}
                            {#each downloads as download}
                                {#each download.download_url as mirror}
                                    <tr>
                                        <td
                                            class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
                                        >
                                            <div
                                                class="font-medium text-gray-900 dark:text-white"
                                            >
                                                {download.version}
                                            </div>
                                        </td><td
                                            class=" px-3 py-3.5 text-sm text-gray-500 dark:text-gray-50 lg:table-cell"
                                            >{mirror.page}</td
                                        >
                                        <td
                                            class=" px-3 py-3.5 text-sm text-gray-500 dark:text-gray-50 lg:table-cell"
                                            >{getTypeString(
                                                mirror.download_type
                                            )}</td
                                        >
                                        <td
                                            class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
                                        >
                                            <button
                                                disabled={mirror.disabled}
                                                on:click={() =>
                                                    openDownload(mirror.url)}
                                                type="button"
                                                class="inline-flex items-center rounded-md border   bg-blue-700 px-3 py-2 text-sm font-medium leading-4 text-gray-50 shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                                >Download<span class="sr-only"
                                                    >, {download.version}</span
                                                ></button
                                            >
                                        </td>
                                    </tr>
                                {/each}
                            {/each}
                        {:catch err}
                            <div
                                class="rounded-md bg-yellow-50 dark:bg-yellow-700 p-4"
                            >
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg
                                            class="h-5 w-5 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h3
                                            class="text-sm font-medium text-yellow-800 dark:text-yellow-100"
                                        >
                                            There was an error loading the
                                            Download Links
                                        </h3>
                                        <div
                                            class="mt-2 text-sm text-yellow-700 dark:text-yellow-200"
                                        >
                                            <p>
                                                {err.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/await}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
