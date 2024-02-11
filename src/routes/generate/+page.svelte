<script lang="ts">
    import Logo from '$lib/Logo.svelte';
    import { goto } from '$app/navigation';
    import type { ProductData } from '$lib/models/ProductData';

    export let data: {products: ProductData[]};

    /**
	 * @param {MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }} event
	 */
    function onClickProduct(event) {
        let pid = event.currentTarget?.getAttribute('data-pid')
        goto(`/generate/${pid}`)
    }

    console.log(data);
</script>

<Logo width={40} height={40}/>

<div class="flex flex-col justify-center items-center h-screen">
    <h1 class="my-2 text-2xl">Choose your Product:</h1>
    <div class="flex">
        <div class="flex justify-between">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            { #each data.products as product }        
            <div class="flex flex-col items-center w-60 h-60 hover:bg-surface-700" data-pid={product.id} on:click={event => {onClickProduct(event)}}>
                <img src={product.thumbnail} alt={product.name} style="object-fit: cover; width: 200px; height: 200px">
                <span class="mt-2">{product.name}</span>
            </div>
            { /each }
        </div>
    </div>
</div>