import useStore from "../store/Store";
import { useEffect, useState } from "react";

const Meals = () => {
  const { meals, searchQuery, setMeals, setSearchQuery } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
        );
        const data = await response.json();
        setMeals(data.meals || []); // Ensure meals is always an array
      } catch (error) {
        setError("Failed to fetch meals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [setMeals]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-teal-600">Seafood Recipes</h1>
      <input
        type="text"
        placeholder="Search for a meal..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-teal-400 rounded-lg p-3 mb-8 w-96 text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {loading && <p className="text-gray-600">Loading meals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white shadow-md rounded-lg flex flex-col items-center w-full max-w-xs mx-auto p-4"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-teal-700 mb-2 text-center">
                  {meal.strMeal}
                </h2>
                <p className="text-gray-600 text-sm text-center">
                  Delicious seafood meal.
                </p>
              </div>
            ))
          ) : (
            <p>No meals found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Meals;
