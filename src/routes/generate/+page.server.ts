import { ProductData } from '$lib/models/ProductData';

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