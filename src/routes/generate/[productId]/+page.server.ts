import type { ProductData } from '$lib/models/ProductData';

// TODO Unwanted API call need to be removed some day
export async function load({ cookies }) {
    const admin_key = cookies.get('admin_key');
    return fetch(`https://pixel-backend.azurewebsites.net/api/products?key=${admin_key}`)
        .then(response => response.json())
        .then(data => {
            // Do something with the data
            return { products: data as ProductData };
        })
        .catch(error => {
            // Handle the error
            console.log("API Error")
            return { error };
        });
}