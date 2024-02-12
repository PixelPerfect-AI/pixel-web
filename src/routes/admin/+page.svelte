<script>
    import { goto } from '$app/navigation';

    let username = '';
    let password = '';
    let error = '';
  
    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            //Clear cookies on submission to remove previously stored key
            document.cookie = '';
            //Try to validate the username-password combination
            const response = await fetch('https://pixel-backend.azurewebsites.net/api/admin/validate', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                //If it was successful, store the admin key and navigate to the generate page
                if(data.success){
                    document.cookie = `admin_key=${data.admin_id};`;
                    goto("/generate")
                } else {
                    throw new Error(data.message);
                }
            } else {
                throw new Error('Internal server error. Please try again later.');
            }
        } catch (err) {
            // @ts-ignore
            error = err.message;
        }
    }
  
    $: errorMessage = error ? `Error: ${error}` : '';
</script>
  
<style>
    form input {
        color: black;
    }
    /*Center the content on the webpage*/
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    /*Style the button*/
    button {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
    /*Inputs should be 100% width as well*/
    input {
        width: 100%;
    }
</style>
  
<main>
    <h1>Access validation</h1>
        {#if errorMessage}
            <p>{errorMessage}</p>
        {/if}
    <form on:submit|preventDefault={handleSubmit}>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} />

        <button type="submit">Validate</button>
    </form>
</main>
  