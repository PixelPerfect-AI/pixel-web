import type { ProductData } from '$lib/models/ProductData';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const admin_key = cookies.get('admin_key');
    console.log("admin_key: ", admin_key);
    return fetch(`https://pixel-backend.azurewebsites.net/api/products?key=${admin_key}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json()
    })
    .then(data => {
        // Do something with the data
        return { products: data as ProductData };
    })
    .catch(error => {
        // Handle the error
        console.log(error);
        throw redirect(303, '/admin');
    });
}