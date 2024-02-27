<script lang="ts">
    let style = '';

    type StyleDict = {
        [key: string]: [string, string];
    };

    let styleDict: StyleDict = {
        'Pixar Animation': [
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
            '(Pixar:1.3), 4k, disney, (animation:1.2), whimsical, 3D, disney pixar, high details'
        ],
        'Realistic': [
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
            '4k, hdr, realistic, high resolution, outdoors'
        ],
        'Photoshoot': [
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
            'good lighting, studio, (photoshoot:1.4), professional, 4k'
        ]
    };

    let tags = '';

</script>

<div>
    <p>Styles - Early Feature Preview</p>
    <div class="justify-center items-center flex" id="style-def" data-tags={tags}>
        {#each ['Pixar Animation', 'Realistic', 'Photoshoot'] as c}
            <button
                class="chip {style === c ? 'variant-filled' : 'variant-soft'} m-1 h-25 min-w-20 w-40"
                on:click={() => { style = c; tags=styleDict[c][1];}}
                on:keypress
            >   
                <span class="flex flex-col items-center">
                    {@html styleDict[c][0]}
                   <span class="flex items-center">
                        {#if style === c}<span>✔️</span>{/if}
                        <span>{c}</span>
                    </span>
                </span>
            </button>
        {/each}
    </div>
</div>


