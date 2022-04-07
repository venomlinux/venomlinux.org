<script lang="ts">
    import FeatureClass from "./FeatureClass";

    export let goals: FeatureClass[] = [
        new FeatureClass(),
        new FeatureClass(),
        new FeatureClass(),
    ];
</script>

<div class="py-12 bg-white dark:bg-gray-800">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h3
            class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl text-left mb-6  "
        >
            Goals
        </h3>
        <dl class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {#each goals as goal}
                <div class="relative">
                    <dt>
                        <!-- Heroicon name: outline/check -->
                        <svg
                            class="absolute h-6 w-6 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />

                        </svg>
                        <p
                            class="ml-9 text-lg leading-6 font-medium text-gray-900 dark:text-white "
                        >
                            {#if goal.title.length == 0}
                                <div
                                    class="flex flex-col space-y-3 animate-pulse"
                                >
                                    <div
                                        class="w-32 bg-gray-300 h-4 rounded-md "
                                    />
                                </div>
                            {:else}
                                {goal.title}
                            {/if}
                        </p>
                    </dt>

                    <dd class="mt-2 text-base text-gray-500 dark:text-gray-200">
                        {#if goal.goal.length == 0}
                            <div
                                class="flex flex-col space-y-3 animate-pulse mt-2 "
                            >
                                <div class="w-50 bg-gray-300 h-4 rounded-md " />
                            </div>
                        {:else}
                            <p>{goal.goal}</p>
                        {/if}
                    </dd>
                </div>
            {/each}
        </dl>
    </div>
</div>
