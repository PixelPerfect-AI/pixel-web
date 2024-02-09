<script>
    import Logo from '$lib/Logo.svelte';
    import { goto } from '$app/navigation';

    /**
	 * @param {MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }} event
	 */
    function onClickProduct(event) {
        let pid = event.currentTarget?.getAttribute('data-pid')
        goto(`/generate/${pid}`)
    }
</script>

<Logo width={40} height={40}/>

<div class="flex flex-col justify-center items-center h-screen">
    <h1 class="my-2 text-2xl">Choose your Product:</h1>
    <div class="flex">
        <div class="flex justify-between">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="flex flex-col items-center w-60 h-60 hover:bg-surface-700" data-pid={'1'} on:click={event => {onClickProduct(event)}}>
                <img src="https://i.ibb.co/ykKbxCW/1.png" alt="Luxury Bag" style="object-fit: cover; width: 200px; height: 200px">
                <span class="mt-2">Luxury Bag</span>
            </div>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- <div class="flex flex-col items-center w-60 h-60 hover:bg-surface-700" data-pid={'2'} on:click={event => {onClickProduct(event)}}>
                <img src="https://i.ibb.co/sgfSDdF/QCUHLE24-PDP-GALLERY-SF-01-EXCLUSIVE-COLOR-BADGE.png" alt="Product 2" style="object-fit: cover; width: 200px; height: 200px;">
                <span class="mt-2">Product 2</span>
            </div> -->
            <!-- Add more product elements here -->
        </div>
    </div>
</div>