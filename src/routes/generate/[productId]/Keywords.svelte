<script lang="ts">
    import { onMount } from "svelte";
    import Loader2 from "$lib/components/Loader2.svelte";

    export let tags:string[] = [];
    export let item:string;
    let keywords_loading = true;
    export let selectedTags: string[] = [];

    onMount(() => {
        // call API to get recommended keywords
        const path = `https://pixel-backend.azurewebsites.net/api/generate_keywords?item=${item.replace(" ", "_")}`;
        fetch(path)
            .then(response => response.json())
            .then(data => {
                // show only the first 10 keywords
                tags = data.keywords.slice(0, 10);
                }
            )
            .finally(() => {
                keywords_loading = false;
            });
    });

    // Handle tag button click event
    function handleTagClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        let tag = event.currentTarget.textContent;
        console.log(tag);
        event.currentTarget.disabled = !event.currentTarget.disabled;

        if (event.currentTarget.disabled) {
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            selectedTags.push(tag);
        }
    }

</script>

<div>
<p>Recommended keywords (optional)</p>
    {#if keywords_loading}
        <p>Loading...</p>
    {:else}
        {#each tags as tag}
            <button id="input-tags-{tag}" class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-blue opacity-50 disabled:opacity-100" on:click={event => handleTagClick(event)}>
                {tag}
            </button>
        {/each}
    {/if}

</div>