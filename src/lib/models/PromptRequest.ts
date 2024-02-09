// Define the PromptRequest interface
export interface PromptRequest {
    // Add properties or methods here
    type: string;
    prompt: string;
    keywords: string[];
    aspectRatio: string;
    model: string;
    triggerWord: string;
}