
import type { PromptRequest } from '$lib/models/PromptRequest';



export function handleGenerateClick(payload: PromptRequest) {
    
    const ws = new WebSocket('ws://localhost:8083');
    console.log('Connecting to websocket server...');

    ws.onopen = () => {
        console.log('Connected to websocket server');
        console.log(`Sending payload: ${JSON.stringify(payload)}`);
        ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event: { data: string }) => {
        console.log(`Message received: ${event.data}`);
        dispatch('image_ready', {data: event.data});
    };

}

