import React from 'react';
import Wrapper from '../assets/wrappers/CocktailCard';
import { Link } from 'react-router-dom';
const CocktailCard = ({ id, name, thumbnail, info, glass }) => {
  return (
    <Wrapper>
      <div className='img-container'>
        <img
          src={thumbnail}
          alt={name}
          className='img'
        />
      </div>
      <div className='footer'>
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link
          to={`/cocktail/${id}`}
          className='btn'
        >
          details
        </Link>
      </div>
    </Wrapper>
  );
};

export default CocktailCard;
