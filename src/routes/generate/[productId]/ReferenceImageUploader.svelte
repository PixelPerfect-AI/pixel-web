<script lang="ts">
    import { onMount } from 'svelte';

    let file: File;
    let isUploading = false;
    export let filename = '';
    export let influence = 0.5;

    onMount(() => {
        const fileInput = document.getElementById('file');
        if (fileInput) {
            fileInput.addEventListener('change', (event) => {
                file = event.target.files[0];
                filename = file.name;
            });
        } 
        else {
            console.error('File input not found');
        }

        const influenceInput = document.getElementById('influence');
        if (influenceInput) {
            influenceInput.addEventListener('change', (event) => {
                influence = event.target.value;
            });
        }
        else {
            console.error('Influence input not found');
        }
    });

    $: if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-40 h-auto';
            const outputImages = document.getElementById('ref-img');
            outputImages.innerHTML = '';
            outputImages.appendChild(img);
        }
        reader.readAsDataURL(file);

        // Send file to Python backend using API
        const formData = new FormData();
        formData.append('file', file);

        isUploading = true;

        fetch('https://pixel-backend.azurewebsites.net/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle response from backend
            filename = file.name;
            console.log(data);
            isUploading = false;
        })
        .catch(error => {
            // Handle error
            console.error(error);
            isUploading = false;
        });
    }



</script>


<div class="mt-4">
    Add a reference image (optional)
    <div>
        <div class="w-full">
            <input class="mt-2 mb-4" type="file" id="file" name="file" accept="image/*" />
        </div>
        <div class="w-full flex justify-center">
            <div id='ref-img'>
            </div>
        </div>
        <div class="w-1/2">
            {#if isUploading}
                <p>Uploading...</p>
            {/if}
        </div>
        {#if filename}
            Influence of Image. 0 is no influence, 1 is full influence.
            <div class="w-full">
                <div class="flex justify-between">
                    <span>0</span>
                    <span>0.5</span>
                    <span>1</span>
                </div>
                <input class="mt-1 mb-4" type="range" min="0" max="1" step="0.01" value="0.5" id="influence" />
            </div>
        {/if}
    </div>
        
</div>