import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateMessage = async (username) => {
  const defaultMessage = `Dear ${username},
    Happy Birthday! 🎉🎂
    Wishing you a day filled with happiness and a year filled with joy.
    
    Best wishes,
    Talut`;
  try {
    const apikey = process.env.GEMINIAPI;
    if (!apikey) {
      return defaultMessage;
    }
    const genAI = new GoogleGenerativeAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a  jovial email birthday message body with proper formatting ready to send from name: Talut Salako to ${username}. Feel free to use a few emojis but not a lot.do not include subject just message content. this meesage will not be edited at all`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating message:", error);
    return defaultMessage;
  }
};