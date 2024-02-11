import type { ProductData } from '$lib/models/ProductData';

// TODO Unwanted API call need to be removed some day
export function load() {
    return fetch('https://pixel-backend.azurewebsites.net/api/products')
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