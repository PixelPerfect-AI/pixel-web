<script>
    import Logo from '$lib/Logo.svelte';
    import FrontPageCard from '$lib/components/FrontPageCard.svelte';
</script>

<link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'>

<style>
    body {
        font-family: 'Open Sans';
    }
</style>
<body>
    <div class="flex justify-between items-center p-3">
        <Logo width={40} height={40} />
        <button class="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer mr-5">REQUEST A DEMO</button>
    </div>
    <div class="mx-auto mt-2">
        <div class="text-center mx-auto">
            <div class="text-7xl font-bold">Instant Marketing Content</div>
            <!-- TODO: fix the gradient coloring -->
            <div class="text-7xl font-bold mt-4 bg-gradient-to-r from-[#FF3BFF] via-[#ECBFBF] via-[#5C24FF] to-[#D94FD5] inline-block text-transparent bg-clip-text">Professional At Low Cost</div>
            <div class="mt-4">PixelPerfect is an AI-based platform that streamlines content creation<br>and distribution for e-commerce owners and retailers, saving you a<br>vast amount of time and expenses on outsourcing creatives.</div>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-full mt-10 mx-auto">REQUEST A DEMO</button>
        </div>
        <div class="mt-10">
            <div class="grid grid-cols-11">
                <div class="col-span-3">
                    <img src="lv.png" class="max-w-1/2 m-auto rounded-30" alt="LV bag with white background">
                    <p class="whitespace-nowrap text-center mt-3">Step 1: Upload Your Product</p>
                </div>
                <div class="col-span-1 flex items-center justify-center">
                    <img src="arrow.svg" class="max-w-2xl h-auto w-2xl -translate-y-full" alt="Arrow between Step 1 and 2">
                </div>
                <div class="col-span-3">
                    <img src="pp_black.png" class="max-w-1/2 m-auto rounded-30" alt="PixelPerfect logo">
                    <p class="whitespace-nowrap text-center mt-3">Step 2: Write A Text Prompt</p>
                </div>
                <div class="col-span-1 flex items-center justify-center">
                    <img src="arrow.svg" class="max-w-2xl h-auto w-2xl transform -translate-y-full scale-y-[-1]" alt="Arrow between Step 1 and 2">
                </div>
                <div class="col-span-3">
                    <img src="lv_done.png" class="max-w-1/2 m-auto rounded-30" alt="LV bag generated with nice background and environment">
                    <p class="whitespace-nowrap text-center mt-3">Step 3: Download Your Results</p>
                </div>
            </div>
        </div>
        <div class="text-center mx-auto mt-20 mb-20">
            <div class="text-5xl">90% Time & Cost Saved</div>
        </div>

        <div class="flex w-3/4 mx-auto grid grid-cols-5">
            <FrontPageCard
                imgSrc="bg_remove.png"
                imgAlt="Background removal example"
                headingText="Remove any background"
                paragraphText="PixelPerfect automatically detect the objects in the photo, plus it's 2x more accurate than similar tools."/>
            
            <FrontPageCard
                imgSrc="gen_example.png"
                imgAlt="Realistic model and environment generation example"
                headingText="Generate realistic models & environments"
                paragraphText="Besides generated models and environments, our solution produces consistent results with perfect lighting."
                imageOnLeft={false} />
            
            <FrontPageCard
                imgSrc="placeholder.png"
                imgAlt="Move object to any position example"
                headingText="Move object to any position"
                paragraphText="Move object to any position. Move object to any position.Move object to any position.Move object to any position.Move object to any position."/>
            
            <FrontPageCard
                imgSrc="brush_example.png"
                imgAlt="Brushing details example"
                headingText="Adjust details with a brush"
                paragraphText="Instantly adjust background and product details. With a swipe of your fingertip, you have total control of the results."
                imageOnLeft={false} />

            <FrontPageCard
                imgSrc="placeholder.png"
                imgAlt="Upscale example"
                headingText="Upscale your work"
                paragraphText="Upscale your work. Upscale your work. Upscale your work. Upscale your work. Upscale your work. Upscale your work."/>
        </div>

        <div class="text-center mx-auto mt-20 mb-20 text-5xl">About Us</div>
        <div class="text-center mx-auto max-w-1/4">We started PixelPerfect AI as two master's students at want to make content creation accessible to everyone.</div>
        
        <div class="mt-10 flex justify-center space-x-20">
            <div class="flex flex-col justify-center items-start w-auto">
                <img src="zake.png" alt="Zake Zihe Zhang" class="aspect-[2/3] max-w-300 w-300 object-cover rounded-30">
                <div class="text-center font-bold mt-3">Zake Zihe Zhang</div>
                <div class="text-center">Co-founder</div>
            </div>
            <div class="flex flex-col justify-center items-start w-auto">
                <img src="fathaah.png" alt="Abdul Fathaah Shamsuddin" class="aspect-[2/3] max-w-300 w-300 object-cover rounded-30">
                <div class="text-center font-bold mt-3">Abdul Fathaah Shamsuddin</div>
                <div class="text-center">Co-founder</div>
            </div>
        </div>

        <div class="text-center mx-auto mt-20 mb-20 text-5xl">Contact Us</div>
        <div class="text-center mx-auto max-w-1/4">We're eager to explore how this AI technology could elevate your business and cut down costs. If this sparks your interest, we'd love to schedule a meeting to discuss this further.</div>
        <div class="text-center mx-auto">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-full mt-10">REQUEST A DEMO</button>
        </div>

        <!-- TODO: footer -->
    </div>
</body>
