import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /generate-recipe
app.post("/generate-recipe", async (req, res) => {
  const { ingredients, mealType } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    const prompt = `Generate a ${mealType || "meal"} recipe using the following ingredients: ${ingredients.join(
      ", "
    )}. Include a title, ingredients list, and basic cooking instructions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const recipe = response.choices[0].message.content;
    res.json({ recipe });
  } catch (err) {
    console.error("Error generating recipe:", err);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
