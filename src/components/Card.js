import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
    return (props.card)

  }

  return (
    <li className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__delete"></div>
      <div className="element__name-block">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-block">
          <button type="button" className="element__like"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;