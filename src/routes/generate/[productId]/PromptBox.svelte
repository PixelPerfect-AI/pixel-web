<script lang="ts">
	import Loader2 from "$lib/components/Loader2.svelte";


    export let loading:boolean;
    export let promptText:string;
    export let item:string;
    let promptLoading = false;

    function handleClick() {
        promptLoading = true;
        // call an API to enhance prompt https://pixel-backend.azurewebsites.net//api/enhance_prompt
        const path = 'https://pixel-backend.azurewebsites.net/api/enhance_prompt';
        const data = {
            prompt: promptText,
            item: item
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(path, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                promptText = data.enhanced_prompt.replace(/("|')/g, "");
            }).finally(() => {
                promptLoading = false;
            });
    }

</script>

<div class="mb-4">
    <p>Prompt</p>
    <textarea disabled={loading || promptLoading} id="input-prompt" class="mt-2 w-full p-2 border border-gray-300 bg-surface-600 rounded h-20" placeholder="How do you imagine your product being used?" bind:value={promptText}></textarea>
    <!-- {#if promptLoading}
        <p>Our friend ChatGPT is now making your prompt GREAT...</p>
    {:else}
        <button class="text-primary-600" disabled={loading} >Click to enhance your prompt with ChatGPT</button>
    {/if} -->

    <button type="button" class="btn variant-filled w-full my-0 py-0 rounded-sm" disabled={loading || promptLoading} on:click={handleClick}>
        {#if !promptLoading}
            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wand"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg></span>
            <span>Improve Prompt</span>
        {:else}
            <span>Improving</span>
        {/if}
    </button>
</div>