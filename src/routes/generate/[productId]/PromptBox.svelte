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
    {#if promptLoading}
        <Loader2 width={7} height={7}/>
    {:else}
        <button class="text-primary-600" disabled={loading} on:click={handleClick}>Click to enhance your prompt with ChatGPT</button>
    {/if}

</div>