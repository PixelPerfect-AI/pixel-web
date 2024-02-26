<script lang="ts">
	import { Accordion, AccordionItem, RangeSlider } from "@skeletonlabs/skeleton";
    export let diffusionSteps = 20;
    export let refine = true;
    export let genarationSeed:number | undefined;
    let max = 30;
    export let randomSeed = true;
    $: console.log(genarationSeed);
</script>

<div>
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="lead">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hammer">
                    <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/>
                    <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>
                </svg>
            </svelte:fragment>
            <svelte:fragment slot="summary">Advanced Options</svelte:fragment>
            <svelte:fragment slot="content">
                <RangeSlider name="range-slider" bind:value={diffusionSteps} max={max} step={1} ticked>
                    <div class="flex justify-between items-center">
                        <div>Diffusion Steps</div>
                        <div class="text-xs">{diffusionSteps} / {max}</div>
                    </div>
                </RangeSlider>
                <label class="labelmt-4">
                    <span>Random Seed</span>
                    <input class="input" type="text" placeholder="Input" inputmode="numeric" disabled={randomSeed} bind:value={genarationSeed}/>
                </label>
                <div class="flex">
                    <label class="flex items-center space-x-2 mx-2">
                        <input id="refine" class="checkbox" type="checkbox" checked on:change={() => {refine = !refine}}/>
                        <p>Refine</p>
                    </label>
                    <label class="flex items-center space-x-2 mx-2">
                        <input id="seed" class="checkbox" type="checkbox" on:change={() => {randomSeed = !randomSeed; if(randomSeed) genarationSeed = undefined}}/>
                        <p>Manual Seed</p>
                    </label>
                </div>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>