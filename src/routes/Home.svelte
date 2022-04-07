<script lang="ts">
    import { Link } from "svelte-routing";
    import { select_option } from "svelte/internal";
    import Feature from "../components/Feature.svelte";
    import type FeatureClass from "../components/FeatureClass";
    import Feed from "../components/Feed.svelte";
    import type FeedItemClass from "../components/FeedItemClass";
    async function getFeed(): Promise<FeedItemClass[]> {
        const response = await fetch("data/announcements.json");
        const items: FeedItemClass[] = await response.json();

        return items;
    }

    async function getFeatures(): Promise<FeatureClass[]> {
        const response = await fetch("data/features.json");
        const items: FeatureClass[] = await response.json();
        return items;
    }

    // This kinda works, smarter scraping would bypass this maybe, but this is a dumb way to do it
    // And it works for most scrapers
    function smallBrainAntiScrapEmail(
        name: string,
        host: string,
        tld: string
    ): string {
        return `${name}@${host}.${tld}`;
    }
</script>

<section>
    <div>
        <div class="relative">
            <div
                class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-800 dark:bg-gray-200"
            />
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden"
                >
                    <div class="absolute inset-0">
                        <img
                            class="h-full w-full object-cover"
                            src="https://i.postimg.cc/pxyYPrJy/screenshot-20210312.png"
                            alt="Venom Linux Desktop Example"
                        />
                        <div
                            class="absolute inset-0 bg-gray-500 mix-blend-multiply"
                        />
                    </div>
                    <div
                        class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8"
                    >
                        <h1
                            class="text-center text-4xl font-extrabold font-inter   tracking-tight sm:text-5xl lg:text-6xl"
                        >
                            <span class="block   text-white"
                                >A lightweight source based distro for</span
                            >
                            <span
                                class="block   text-blue-200 f   hover:text-blue-400 transition-colors "
                                >advanced Linux Users</span
                            >
                        </h1>
                        <p
                            class="mt-6 max-w-lg  mx-auto text-center font-inter text-xl text-blue-200 sm:max-w-3xl"
                        >
                            Customize your system with Venom Linux, a
                            lightweight source based distro for advanced Linux
                            users targeting x86_64 machines
                        </p>
                        <div
                            class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center"
                        >
                            <div
                                class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5"
                            >
                                <Link
                                    to="wiki"
                                    class="flex items-center rounded-sm transition-colors justify-center px-4 py-3 border-transparent text-base font-medium border  shadow-sm text-blue-800 bg-white hover:bg-blue-50 sm:px-8"
                                >
                                    Get started
                                </Link>
                                <Link
                                    to="downloads"
                                    class="flex items-center transition-colors rounded-sm justify-center px-4 py-3 border-transparent text-base font-medium borde  shadow-sm  text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                                >
                                    Download now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="Announcements" class="mt-10">
    {#await getFeed()}
        <Feed />
    {:then val}
        <Feed items={val} />
    {:catch err}
        <div class="rounded-md bg-yellow-50 dark:bg-yellow-700 p-4">
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
                        There was an error loading the feed
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
</section>

<section id="goals">
    {#await getFeatures()}
        <Feature />
    {:then val}
        <Feature goals={val} />
    {:catch err}
        <div class="rounded-md bg-yellow-50 dark:bg-yellow-700 p-4">
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
                        There was an error loading the Features
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
</section>

<section id="contanct-and-downloads">
    <div class="bg-white dark:bg-gray-800">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div
                class="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8"
            >
                <div>
                    <h2
                        class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl"
                    >
                        Contact
                    </h2>
                    <div class="mt-3">
                        <p class="text-lg dark:text-gray-200 text-gray-500">
                            If you ever need to contact for something contact
                            emmet, but if the webpage is failing or doesn't look
                            good somewhere, contact us at:
                        </p>
                    </div>
                    <div class="mt-9">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <!-- Heroicon name: outline/mail -->
                                <svg
                                    class="h-6 w-6 text-gray-400 dark:text-gray-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div
                                class="ml-3 text-base dark:text-gray-200 text-gray-500"
                            >
                                <p>
                                    Emmet (Venom Linux Main Contributor and
                                    creator)
                                </p>
                                <a
                                    href="mailto:{smallBrainAntiScrapEmail(
                                        'emmett1.2miligrams',
                                        'protonmail',
                                        'com'
                                    )}"
                                    >{smallBrainAntiScrapEmail(
                                        "emmett1.2miligrams",
                                        "protonmail",
                                        "com"
                                    )}</a
                                >
                                <br />
                                <a href="https://github.com/emmett1/">Github</a>
                            </div>
                        </div>
                        <div class="mt-6 flex">
                            <div class="flex-shrink-0">
                                <!-- Heroicon name: outline/mail -->
                                <svg
                                    class="h-6 w-6 text-gray-400 dark:text-gray-200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div
                                class="ml-3 text-base dark:text-gray-50 text-gray-500"
                            >
                                <p>Web Programmer: Deecellar (Rimuspp)</p>
                                <a
                                    href="mailto:{smallBrainAntiScrapEmail(
                                        '19101das',
                                        'gmail',
                                        'com'
                                    )}"
                                    >{smallBrainAntiScrapEmail(
                                        "19101das",
                                        "gmail",
                                        "com"
                                    )}</a
                                >
                                <br />
                                <a href="https://github.com/Deecellar/"
                                    >Github</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-12 sm:mt-16 md:mt-0">
                    <h2
                        class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl"
                    >
                        Donations
                    </h2>
                    <div class="mt-3">
                        <p class="dark:text-gray-200  text-gray-500">
                            Venom Linux is non profit project for linux
                            community, if you like this project and want to
                            support emmet you can make a donation so the
                            projects continues
                        </p>
                    </div>
                    <div class="mt-9">
                        <div class="flex">
                            <div class="flex-shrink-0" />
                            <div class="ml-3 text-base text-blue-500">
                                <a
                                    href="https://www.buymeacoffee.com/venomlinux"
                                    class="mt-1">Buy me a Coffee</a
                                >
                            </div>
                        </div>
                        <div class="mt-6 flex">
                            <div class="flex-shrink-0" />
                            <div class="ml-3 text-base text-blue-500">
                                <a href="https://paypal.me/syazwanemmett"
                                    >Paypal</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
