import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// type
import { itemType } from "../../types/interfaces";

interface iMeal extends itemType {
  description: string;
}

const AvailableMeals = () => {
  const [meals, setMeals] = useState<iMeal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState<string>();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-food-order-app-alireza-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: +key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          amount: responseData[key].amount,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = meals.map(meal => (
    <li>
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        amount={meal.amount}
      />
    </li>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && <p className={classes.loading}>Loading...</p>}
        {httpError && <p className={classes.error}>{httpError}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
