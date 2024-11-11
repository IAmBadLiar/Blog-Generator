async function generateBlog() {
    const prompt = document.getElementById("prompt").value;
    const output = document.getElementById("output");
    output.innerText = "Generating... The model may still be loading; please wait a moment.";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { max_new_tokens: 700, temperature: 0.8, top_p: 0.9, repetition_penalty: 1.2 }
            })
        });
        

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unexpected error occurred.");
        }

        const data = await response.json();
        output.innerHTML = data[0]?.generated_text || "No output generated.";
    } catch (error) {
        output.innerText = `Error: ${error.message}`;
    }
}
