const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { DynamicTool } = require("@langchain/core/tools");
const { PromptTemplate } = require("@langchain/core/prompts");

class AgentService {
    constructor() {
        this.model = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash",
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    async getChatResponse(message, isSystem = false) {
        try {
            const systemPrompt = isSystem
                ? "You are EduGenie AI. Give a single, high-energy, helpful sentence about the user's current context. Be very brief."
                : "You are EduGenie AI, a friendly and extremely helpful educational assistant inspired by BYJU'S style of teaching. Provide clear, encouraging information. Be supportive and concise.";

            const prompt = PromptTemplate.fromTemplate(
                `${systemPrompt}\nUser: {message}`
            );
            const chain = prompt.pipe(this.model);
            const result = await chain.invoke({ message });
            return result.content;
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?";
        }
    }

    async createPlan(goal) {
        try {
            const prompt = PromptTemplate.fromTemplate(
                "You are EduGenie AI. Create a high-quality, professional study plan for: {goal}. Break it down into clear, actionable phases."
            );
            const chain = prompt.pipe(this.model);
            const result = await chain.invoke({ goal });
            return result.content;
        } catch (error) {
            console.error("Gemini Plan Error:", error);
            return "I couldn't create that plan right now. Let's try a different goal?";
        }
    }
}

module.exports = new AgentService();
