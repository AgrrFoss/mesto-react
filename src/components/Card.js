import React from 'react';

function Card({name, link, likes}) {
  return (
    <li className="element">
        <img className="element__image" src={link} alt="горы крыма" />
        <div className="element__delete"></div>
        <div className="element__name-block">
          <h2 className="element__title">{name}</h2>
          <div className="element__like-block">
            <button type="button" className="element__like"></button>
            <p className="element__like-counter">{likes.length}</p>
          </div>
        </div>
      </li>
  );
}

export default Card;