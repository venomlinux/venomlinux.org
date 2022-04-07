<script lang="ts">
    import { Link } from "svelte-routing";
    import { getContext, onMount } from "svelte";
    import { ROUTER } from "svelte-routing/src/contexts";

    const { activeRoute } = getContext(ROUTER);
    let location: string;
    $: {
        if ($activeRoute != null) {
            location = $activeRoute.uri;
        }
    }
    location = location;

    let active_link =
        "border-blue-500 dark:text-white text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    let non_active_link =
        "border-transparent dark:text-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    let active_link_mobile =
        "bg-gray-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
    let non_active_link_mobile =
        "border-transparent text-gray-500 dark:text-gray-200 dark:hover:text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
</script>

<nav class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                        to="/"
                        class={location === "/" ? active_link : non_active_link}
                        >Home</Link
                    >
                    <Link
                        to="downloads"
                        class={location === "downloads"
                            ? active_link
                            : non_active_link}>Downloads</Link
                    >
                    <Link
                        to="wiki"
                        class={location === "wiki"
                            ? active_link
                            : non_active_link}
                    >
                        Wiki
                    </Link>
                </div>
            </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
            <div class="pt-2 pb-3 space-y-1">
                <Link
                    to="/"
                    class={location === "/"
                        ? active_link_mobile
                        : non_active_link_mobile}>Home</Link
                >
                <Link
                    to="downloads"
                    class={location === "downloads"
                        ? active_link_mobile
                        : non_active_link_mobile}>Downloads</Link
                >
                <Link
                    to="wiki"
                    class={location === "wiki"
                        ? active_link_mobile
                        : non_active_link_mobile}
                >
                    Wiki
                </Link>
            </div>
        </div>
    </div>
</nav>
