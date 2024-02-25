
<script lang="ts">
    import BackNav from '$lib/BackNav.svelte';
    import Logo from '$lib/Logo.svelte';
	import type { PromptRequest } from '$lib/models/PromptRequest.js';
    import { createEventDispatcher } from "svelte";
    import Loader from '$lib/components/Loader.svelte';
    import Loader2 from '$lib/components/Loader2.svelte';
    import type { ProductData } from '$lib/models/ProductData.js';
    import { page } from '$app/stores'
    import PromptBox from './PromptBox.svelte';
    import ReferenceImageUploader from './ReferenceImageUploader.svelte';
    import StyleSelect from './StyleSelect.svelte';
    import ImageGallery from '@react2svelte/image-gallery';

    export let data: {products: ProductData[]};
    const product = data.products.filter((p) => p.id === $page.url.pathname.substring($page.url.pathname.lastIndexOf('/') + 1))[0];

    let supportedAspectRatios = ['1:1', '4:3', '16:9'];

    let promptText = '';
    let selectedAspectRatio = '';
    let loading = false;
    let loaderText = 'Starting up...';

    let filename = '';
    let influence = 0.5;

    let images = [] as {original: string, thumbnail: string}[]; 

    const dispatch = createEventDispatcher();

    // Handle aspect ratio button click event
    function handleARClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        let ar = event.currentTarget.textContent;
        console.log(ar);
        event.currentTarget.disabled = !event.currentTarget.disabled;

        if (event.currentTarget.disabled) {
            selectedAspectRatio = '';
        } else {
            selectedAspectRatio = ar;
        }

        const buttons = document.querySelectorAll('[id^="input-ar-"]');
        buttons.forEach(button => {
            if (button.id !== event.currentTarget.id) {
                // @ts-ignore
                button.disabled = false;
            }
        });
    }

    // Build PromptRequest object
    // sorry disabled buttons means they are selected, work with this for now
    function buildPromptRequest() {
        loading = true;
        const promptText = (document.getElementById('input-prompt') as HTMLTextAreaElement).value;
        const selectedTags: string = (document.getElementById('style-def') as HTMLTextAreaElement).getAttribute('data-tags'); // in StyleSelect.svelte
        const filename = (document.getElementById('file') as HTMLInputElement).files?.[0]?.name ?? '';
        const influence = (document.getElementById('influence') as HTMLInputElement)?.value ?? 0.5;
        const selectedAspectRatioElement = document.querySelector('[id^="input-ar-"]:disabled');
        const selectedAspectRatio = selectedAspectRatioElement ? selectedAspectRatioElement.textContent : '1:1';

        const promptRequest = {
            prompt:promptText, // in PromptBox.svelte
            keywords:selectedTags.split(','), // in Keywords.svelte
            aspectRatio:selectedAspectRatio,
            type:'lora',
            model: product.lora_model_name,
            triggerWord: product.trigger_word,
            filename: filename,
            influence: influence
        } as PromptRequest;

        // clear the output images
        const outputImages = document.getElementById('output-images');
        outputImages.innerHTML = '';


        function handleGenerateClick(payload: PromptRequest) {
            // disable generate button
            images = [];
            // const ws = new WebSocket('wss://pixel-backend.azurewebsites.net/ws');
            const ws = new WebSocket('ws://127.0.0.1:5000/ws');
            console.log('Connecting to websocket server...');

            ws.onerror = (error: Event) => {
                console.log('Error connecting to websocket server');
                setTimeout(() => {
                    loaderText = 'Error connecting to websocket server';
                }, 1000);
                console.log(error);
                loading = false;
            };

            ws.onopen = () => {
                console.log('Connected to websocket server');
                console.log(`Sending payload: ${JSON.stringify(payload)}`);
                ws.send(JSON.stringify(payload));
            };

            ws.onmessage = (event: { data: string }) => {
                console.log(`Message received: ${event.data}`);
                // parse it as a list of strings
                try
                {
                    const response = JSON.parse(event.data);
                    // add the images to the div with id 'output-images', expect 4 images to be arranged in a 2 x 2 format
                    // if type is string 
                    images = response.map((image: string) => {
                        return {original: image, thumbnail: image};
                    });
                    
                    loading = false;
                }
                catch (e)
                {   
                    console.log(e);
                    loaderText = event.data;
                }
            };
        }

        console.log(promptRequest);
        handleGenerateClick(promptRequest);
    }
    
    
</script>

<Logo width={40} height={40} />

<BackNav title={'Your Studio'} />

<div class="mx-20 mb-10 bg-surface-600 bg-opacity-30 flex ">
    <div class="w-1/3 p-4">
        <div class="flex">
            <div class="w-1/2 p-4">
                <!-- Left side - Image -->
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="{product.thumbnail}" alt={product.name} class="w-2/3 h-full">
            </div>
            <div class="w-full p-4 flex items-center ml-0">
                <!-- Right side - Text -->
                <p class="text-lg">{product.name}</p>
            </div>
        </div>
        <!-- Left side - Textbox -->
        <PromptBox loading={loading} promptText={promptText} item={product.product_type} />
        <div class="mt-2">
            <!-- Comment it while developing this page -->
            <!-- <Keywords item={product.product_type}/> -->
            <StyleSelect/>
            <hr class="mt-4 mb-4">
            <p>Aspect Ratio</p>
            <div class="mt-4">
                {#each supportedAspectRatios as ratio}
                    {#if ratio === '1:1'}
                        <button id='input-ar-{ratio.replace(':', '')}' class="btn variant-filled p-2 m-1" disabled="disabled" on:click={event => handleARClick(event)} >
                            {'1:1'}
                        </button>
                    {:else}
                        <button id='input-ar-{ratio.replace(':', '')}' class="btn variant-filled p-2 m-1" on:click={event => handleARClick(event)} >
                            {ratio}
                        </button>
                    {/if}
                {/each}
            </div>
            <ReferenceImageUploader filename={filename} influence={influence}/>
        </div>
        <div class='mt-4'>
            <style>
                .generate-button {
                    background: linear-gradient(90deg, #FF3BFF 0%, #5C24FF);
                }

                .generate-button:hover {
                    background: linear-gradient(90deg, #5C24FF 0%, #FF3BFF);
                }
            </style>
            {#if loading}
            <div class="flex justify-center items-center h-full w-full">
                <Loader2/>
            </div>
            {:else}
                <button disabled={loading} id="generate-btn" class="w-full py-2 px-4 text-white rounded-[20px] cursor-pointer generate-button text-xl flex items-center justify-center disabled:opacity-40" on:click={buildPromptRequest}><div class="text-[25px]">🚀</div> Generate</button>
            {/if}
        </div>
    </div>
    <div class="w-2/3 p-4 max-h-full">
        <!-- Right side - Placeholder image -->
        <div id="output-images" class="w-full h-full bg-surface-600 bg-opacity-30 flex flex-wrap overflow-auto">
        {#if loading}
            <div class="flex flex-col justify-center items-center h-full w-full">
                <Loader/>
                <div>
                    <p> {loaderText} </p>
                </div>
            </div>
        {:else if images.length > 0}
            <div class="flex mx-auto">
                <ImageGallery additionalClass="w-[70%] mx-auto my-auto" items={images} showPlayButton={false}/>
            </div>
        {/if}
        </div>
    </div>
</div>    