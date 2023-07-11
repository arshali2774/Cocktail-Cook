import React from 'react';
import { useLoaderData, Link, Navigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));
  if (!data || data.drinks === null) return <Navigate to='/' />;
  const singleDrink = data.drinks[0];
  console.log(singleDrink);
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  // * saare keys nikal liye object ke and ek array main save krlia
  const allKeys = Object.keys(singleDrink);
  console.log(allKeys);

  // * then we need to filter the ingredients keys from others
  const filterIngredients = allKeys.filter((key) =>
    key.startsWith('strIngredient')
  );
  console.log(filterIngredients);

  // * now remove the ingredients with null keys
  const validIngredients = filterIngredients.filter(
    (key) => singleDrink[key] !== null
  );
  console.log(validIngredients);

  // * now store the values
  const validIngredientsArr = validIngredients.map((key) => singleDrink[key]);
  console.log(validIngredientsArr);
  return (
    <Wrapper>
      <header>
        <Link
          to='/'
          className='btn'
        >
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img
          src={image}
          alt={name}
          className='img'
        />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info:</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {validIngredientsArr.map((item, idx) => (
              <span
                className='ing'
                key={item}
              >
                {item}
                {idx < validIngredientsArr.length - 1 ? ',' : ' '}
              </span>
            ))}
          </p>
          <p>
            <span className='drink-data'>instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
