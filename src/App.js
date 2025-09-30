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
    // Added gradient style in background to make UI look fresh and different.
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg hover:shadow-lg transition">
        <h1 className="text-4xl font-extrabold text-green-800 text-center mb-6">
          🍲 Recipe Generator
        </h1>

         {/* changed the text color so that it could match the color combination */}
        <label className="block mb-2 text-green-700 font-semibold">
          Ingredients
        </label>
        
        {/*added simple focus ring effect These classes add a smooth green glow on input click/focus */}
        <input
          type="text"
          className="border border-green-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label className="block mb-2 text-green-700 font-semibold">
          Meal Type
        </label>
        {/* here also added same focus ring effect */}
        <select
          className="border border-green-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className={`w-full py-3 rounded-lg font-bold text-white text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        {/* Recipe output card styled for readability */}
        {recipe && (
          <div className="mt-6 bg-green-50 p-5 rounded-xl shadow-inner border border-green-200">
            <h2 className="text-green-800 font-bold text-xl mb-2">
              Your Recipe:
            </h2>
            <pre className="whitespace-pre-wrap text-green-900">{recipe}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
