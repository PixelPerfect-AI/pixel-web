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
                }
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (err) {
            error = err.message;
        }
    }
  
    $: errorMessage = error ? `Error: ${error}` : '';
</script>
  
<style>
    form input {
        color: black;
    }
</style>
  
<main>
    <h1>Login</h1>
        {#if errorMessage}
            <p>{errorMessage}</p>
        {/if}
    <form on:submit|preventDefault={handleSubmit}>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} />

        <button type="submit">Login</button>
    </form>
</main>
  