
<script lang="ts">
    import BackNav from '$lib/BackNav.svelte';
    import Logo from '$lib/Logo.svelte';
	import type { PromptRequest } from '$lib/models/PromptRequest.js';
    import { handleGenerateClick } from './generate.js';
    import { createEventDispatcher } from "svelte";

    let tags = [
        'house', 'girl', 'city', 'street', 'dressing room', 'fashion', 'clothing', 'apparel'
    ];

    let supportedAspectRatios = ['1:1', '4:3', '16:9'];

    let promptText = '';
    let selectedTags = [];
    let selectedAspectRatio = '';

    const dispatch = createEventDispatcher();

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
        const promptText = (document.getElementById('input-prompt') as HTMLTextAreaElement).value;
        const selectedTags: (string)[] = []
        document.querySelectorAll('[id^="input-tags-"]').forEach(tag => {
            if (tag.disabled) {
                selectedTags.push(tag?.textContent ?? '');
            }
        });
        const selectedAspectRatioElement = document.querySelector('[id^="input-ar-"]:disabled');
        const selectedAspectRatio = selectedAspectRatioElement ? selectedAspectRatioElement.textContent : '1:1';

        const promptRequest = {
            prompt:promptText,
            keywords:selectedTags,
            aspectRatio:selectedAspectRatio,
            type:'lora',
            model:'lv-000009.safetensors',
            triggerWord:'lv black'
        } as PromptRequest;

        function handleGenerateClick(payload: PromptRequest) {
            // disable generate button
            const generateButton = document.getElementById('generate-btn');
            if (generateButton) {
                generateButton.disabled = true;
            }


            const outputImages = document.getElementById('output-images');
            // remove images from the div with id 'output-images'
            if (outputImages) {
                outputImages.innerHTML = '';
            }

            const ws = new WebSocket('ws://136.38.105.217:33221');
            console.log('Connecting to websocket server...');

            ws.onopen = () => {
                console.log('Connected to websocket server');
                console.log(`Sending payload: ${JSON.stringify(payload)}`);
                ws.send(JSON.stringify(payload));
            };

            ws.onmessage = (event: { data: string }) => {
                console.log(`Message received: ${event.data}`);
                // parse it as a list of strings
                const response = JSON.parse(event.data);
                // add the images to the div with id 'output-images', expect 4 images to be arranged in a 2 x 2 format
                const outputImages = document.getElementById('output-images');
                if (outputImages) {
                    outputImages.innerHTML = '';
                    response.forEach((image: string) => {
                        const img = document.createElement('img');
                        img.src = image;
                        img.className = 'w-1/2';
                        outputImages.appendChild(img);
                    });
                } 
                // enable generate button
                if (generateButton) {
                    generateButton.disabled = false;
                }
        };
    }

        console.log(promptRequest);
        handleGenerateClick(promptRequest);
    }
    
    
</script>

<Logo width={40} height={40} />

<BackNav title={'Your Studio'} />

<div class="mx-20 mb-10 bg-surface-600 bg-opacity-30 flex">
    <div class="w-1/3 p-4">
        <div class="flex">
            <div class="w-1/2 p-4">
                <!-- Left side - Image -->
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="https://i.ibb.co/ykKbxCW/1.png" alt="Product Image" class="w-2/3 h-full">
            </div>
            <div class="w-1/2 p-4 flex items-center ml-0">
                <!-- Right side - Text -->
                <p class="text-lg">Luxury Bag</p>
            </div>
        </div>
        <!-- Left side - Textbox -->
        <p>Prompt</p>
        <textarea id="input-prompt" class="mt-2 mb-4 w-full p-2 border border-gray-300 bg-surface-600 rounded h-20" placeholder="How do you imagine your product being used?" bind:value={promptText}></textarea>
        <p>Recommended keywords (optional)</p>
        <div class="mt-2">
            {#each tags as tag}
            <button id="input-tags-{tag}" class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-blue opacity-50 disabled:opacity-100" on:click={event => handleTagClick(event)}>
                {tag}
            </button>
            {/each}
            <hr class="mt-4 mb-4">
            <p>Aspect Ratio</p>
            <div class="mt-4">
                {#each supportedAspectRatios as ratio}
                    {#if ratio === '1:1'}
                        <button id='input-ar-{ratio.replace(':', '')}' class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-blue opacity-50 disabled:opacity-100" disabled="disabled" on:click={event => handleARClick(event)} >
                            {'1:1'}
                        </button>
                    {:else}
                        <button id='input-ar-{ratio.replace(':', '')}' class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-800 focus:outline-none focus:shadow-outline-blue opacity-50 disabled:opacity-100" on:click={event => handleARClick(event)} >
                            {ratio}
                        </button>
                    {/if}
                {/each}
            </div>
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

            <button id="generate-btn" class="w-full py-2 px-4 text-white rounded-[20px] cursor-pointer generate-button text-xl flex items-center justify-center disabled:opacity-40" on:click={buildPromptRequest}><div class="text-[25px]">🚀</div> Generate</button>
        </div>
    </div>
    <div class="w-2/3 p-4">
        <!-- Right side - Placeholder image -->
        <div id="output-images" class="w-full h-full bg-surface-600 bg-opacity-30 flex flex-wrap overflow-auto disabled:z-20">
        </div>
</div>    
</div>