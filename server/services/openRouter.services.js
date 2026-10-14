// import axios from "axios";

// export const askAi = async (messages) => {
//   try {
//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       throw new Error("Messages array is empty");
//     }

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openai/gpt-4o-mini",
//         messages: messages,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const content = response?.data?.choices?.[0]?.message?.content;
//     if (!content || !content.trim()) {
//       throw new Error("AI returned empty response.");
//     }
//     return content;
//   } catch (error) {
//     console.error("OpenRouter Error:", error.response?.data || error.message);
//     throw new Error("OpenRouter API Error");
//   }
// };

import axios from "axios";

export const askAi = async (messages) => {
  try {
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty");
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is missing from server environment");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      console.error(
        "OpenRouter returned unexpected response:",
        JSON.stringify(response.data)
      );
      throw new Error("AI returned empty response");
    }

    return content.trim();
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    throw error;
  }
};
