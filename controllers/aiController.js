import OpenAI from "openai";

class AIController {
  /**
   * @method callAI
   * @description Call OpenAI API and return AI response
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static async callAI(req, res) {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const userMessage = req.body.message || "Hello!";

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
      });

      const aiMessage = response.choices[0].message.content;

      // Log to console
      console.log("AI says:", aiMessage);
      // Respond to client
      return res.json({ reply: aiMessage }); 
    } catch (error) {
      console.error("Error calling AI:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default AIController;
