import client from "../config/hfClient.js";

export default async function categorizeComplaint(complaint) {

    // const summary = await client.summarization({
    //     model: "facebook/bart-large-cnn",
    //     inputs: complaint,
    // });

    const output = await client.zeroShotClassification({
        model: "facebook/bart-large-mnli",
        inputs: complaint,
        parameters: {
            candidate_labels: ["Normal", "Problematic", "Critical"],
        }
    });

    console.log(output);

    const label = output[0].labels[0];
    const score = output[0].scores[0];

    if (label==='Problematic') {
        if (output[0].labels[1]==='Critical' && score - output[0].scores[1] < 0.1) {
            return { label: "Critical", score: output[0].scores[1] };
        }
    }

    return { label, score };
};