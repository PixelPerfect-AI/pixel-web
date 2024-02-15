<script>
    export let imgSrc = 'img.png';
    export let imgAlt = 'Alternative Image Text';
    export let headingText = 'Heading Text';
    export let paragraphText = 'Paragraph Text';
    export let imageOnLeft = true;
</script>
{#if imageOnLeft}
<div class="col-span-2 flex flex-col justify-center items-start mt-10">
    <img src={imgSrc} alt={imgAlt} class="aspect-[2/1] w-full object-cover rounded-30">
</div>
<div class="col-span-1"/>
<div class="col-span-2 p-4 flex flex-col justify-center items-start">
    <h2 class="text-4xl font-bold mb-5">{headingText}</h2>
    <p>{paragraphText}</p>
</div>
{:else}
<div class="col-span-2 p-4 flex flex-col justify-center items-start">
    <h2 class="text-4xl font-bold mb-5">{headingText}</h2>
    <p>{paragraphText}</p>
</div>
<div class="col-span-1"/>
<div class="col-span-2 flex flex-col justify-center items-start mt-10">
    <img src={imgSrc} alt={imgAlt} class="aspect-[2/1] w-full object-cover rounded-30">
</div>
{/if}