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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Generator</h1>

      <input
        type="text"
        className="border p-2 rounded w-full max-w-md mb-4"
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <select
        className="border p-2 rounded w-full max-w-md mb-4"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
      >
        <option value="">Any meal</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {recipe && (
        <div className="bg-white p-4 rounded shadow max-w-md w-full">
          <pre className="whitespace-pre-wrap">{recipe}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
