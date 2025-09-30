import { useState } from "react";
import axios from "axios";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients.trim()) return alert("Please enter some ingredients.");

    setLoading(true);
    setRecipe("");

    try {
      const response = await axios.post("http://localhost:5000/generate-recipe", {
        ingredients: ingredients.split(",").map((i) => i.trim()),
        mealType,
      });
      setRecipe(response.data.recipe);
    } catch (err) {
      console.error(err);
      alert("Failed to generate recipe. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-vt323 text-cyan-400">
      <h1 className="text-2xl md:text-4xl font-pressStart2P mb-8 neon-text">
        Recipe Generator
      </h1>

      <input
        type="text"
        className="bg-transparent border border-cyan-500 focus:border-pink-500 text-cyan-400 placeholder-cyan-600 rounded px-4 py-2 w-full max-w-md mb-6 neon-glow focus:outline-none"
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <select
        className="bg-transparent border border-cyan-500 focus:border-pink-500 text-cyan-400 rounded px-4 py-2 w-full max-w-md mb-6 neon-glow focus:outline-none"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
      >
        <option value="" className="bg-black text-cyan-400">Any meal</option>
        <option value="breakfast" className="bg-black text-cyan-400">Breakfast</option>
        <option value="lunch" className="bg-black text-cyan-400">Lunch</option>
        <option value="dinner" className="bg-black text-cyan-400">Dinner</option>
        <option value="snack" className="bg-black text-cyan-400">Snack</option>
      </select>

      <button
        className={`px-6 py-3 rounded font-pressStart2P transition neon-button ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:neon-button-hover"
        }`}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {recipe && (
        <div className="bg-transparent border border-cyan-500 rounded max-w-md w-full p-4 mt-8 neon-glow text-cyan-400">
          <pre className="whitespace-pre-wrap font-vt323">{recipe}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
