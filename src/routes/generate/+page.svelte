<script>
    import Logo from '$lib/icons/Logo.svelte';
</script>

<div class="sticky top-0 py-4 px-4 flex items-center justify-between">
	<div class="flex items-center">
		<Logo width={'23'} height={'23'}/>
		<div class="mx-1 text-2xl">PixelPerfect AI</div>
	</div>
</div>

<div class="flex flex-col justify-center items-center h-screen">
    <h1 class="my-2 text-2xl">Choose your Product:</h1>
    <div class="flex">
        <div class="flex justify-between">
            <div class="flex flex-col items-center w-60 h-60 hover:bg-surface-700">
                <img src="https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-canvas-handbags--M45321_PM2_Front%20view.png" alt="Product 1">
                <span class="mt-2">Product 1</span>
            </div>
            <div class="flex flex-col items-center w-60 h-60 hover:bg-surface-700">
                <img src="https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-canvas-handbags--M45321_PM2_Front%20view.png" alt="Product 2" >
                <span class="mt-2">Product 2</span>
            </div>
            <!-- Add more product elements here -->
        </div>
    </div>
</div>