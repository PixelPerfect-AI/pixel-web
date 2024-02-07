<script>
    import BackNav from '$lib/BackNav.svelte';
    import Logo from '$lib/Logo.svelte';

    let tags = [
        'house', 'girl', 'city', 'street', 'dressing room', 'fashion', 'clothing', 'apparel'
    ];

    let supportedAspectRatios = ['1:1', '4:3', '16:9'];

    // Handle tag button click event
    /**
	 * @param {MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }} event
	 */
    function handleTagClick(event) {
        let tag = event.currentTarget.textContent;
        console.log(tag);
        event.currentTarget.disabled = event.currentTarget.disabled ? false : true;
    }

    // Handle aspect ratio button click event
    /**
	 * @param {MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }} event
	 */
    function handleARClick(event) {
        let ar = event.currentTarget.textContent;
        console.log(ar);
        event.currentTarget.disabled = event.currentTarget.disabled ? false : true;

        const buttons = document.querySelectorAll('[id^="ar-"]');
        buttons.forEach(button => {
            if (button.id !== event.currentTarget.id) {
                // @ts-ignore
                button.disabled = false;
            }
        });
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
                <img src="https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-canvas-handbags--M45321_PM2_Front%20view.png" alt="Product Image" class="w-2/3 h-full">
            </div>
            <div class="w-1/2 p-4 flex items-center ml-0">
                <!-- Right side - Text -->
                <p class="text-lg">Product Name</p>
            </div>
        </div>
        <!-- Left side - Textbox -->
        <p>Prompt</p>
        <textarea class="mt-2 mb-4 w-full p-2 border border-gray-300 bg-surface-600 rounded h-20" placeholder="How do you imagine your product being used?"></textarea>
        <p>Recommended keywords (optional)</p>
        <div class="mt-2">
            {#each tags as tag}
            <button class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-blue opacity-50 disabled:opacity-100" on:click={event => handleTagClick(event)}>
                {tag}
            </button>
            {/each}
            <hr class="mt-4 mb-4">
            <p>Aspect Ratio</p>
            <div class="mt-4">
                {#each supportedAspectRatios as ratio}
                    {#if ratio === '1:1'}
                        <button id='ar-{ratio.replace(':', '')}' class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-blue disabled:opacity-50" disabled="disabled" on:click={event => handleARClick(event)} >
                            {'1:1'}
                        </button>
                    {:else}
                        <button id='ar-{ratio.replace(':', '')}' class="inline-block p-1 mr-2 mb-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-800 focus:outline-none focus:shadow-outline-blue disabled:opacity-50" on:click={event => handleARClick(event)} >
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

            <button class="w-full py-2 px-4 text-white rounded-[20px] cursor-pointer generate-button ">Generate</button>
        </div>
    </div>
    <div class="w-2/3 p-4">
        <!-- Right side - Placeholder image -->
        <div class="w-full h-full bg-surface-600 bg-opacity-30"></div>
    </div>
</div>