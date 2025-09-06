import { InferenceClient } from "@huggingface/inference";

// Pre-trained AI model from Hugging Face to categorize complaints into "Less Serious", "Fairly Serious" and "Extremely Serious".
const client = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export default client;
