import React from 'react';
import Wrapper from '../assets/wrappers/CocktailList';
import CocktailCard from '../components/CocktailCard';
const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return (
      <h4 style={{ textAlign: 'center' }}>No Matching Cocktails found...</h4>
    );
  }
  const formattedDrinks = drinks.map((item) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
    return {
      id: idDrink,
      name: strDrink,
      thumbnail: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return (
    <Wrapper>
      {formattedDrinks.map((item) => (
        <CocktailCard
          key={item.id}
          {...item}
        />
      ))}
    </Wrapper>
  );
};

export default CocktailList;
