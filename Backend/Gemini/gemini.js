const { GoogleGenerativeAI } = require("@google/generative-ai");
const StoreMessage = require("../fireBase/messageController");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function GenerateSummary( chatData) {

   try {
    
console.log(chatData)

const chat = model.startChat({
    history: chatData,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

const msg = "you are a chatbot in projectDiscusstion team , point out & concisely summarize the key points discussed and the decisions made during the conversation. Maintain a neutral tone and avoid attributing specific statements to any individual participant";

const result = await chat.sendMessage(msg);
const response =await result.response;
const text = response.text();
console.log(text);
return text;
   } catch (error) {
    console.log(error.message);
    return error;
  }
}
  
module.exports = { GenerateSummary };
