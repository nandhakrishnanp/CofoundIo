const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function GenerateSummary(chatData) {

   try {
    
console.log("chatData")
// some logigs to fetch the data from the database 
// and then pass it to the model
    
const chat = model.startChat({
    history: chatData,
    generationConfig: {
      maxOutputTokens: 200,
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
