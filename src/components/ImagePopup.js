import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_${props.name}`} >
      <div className="popup__container">
        <form className="popup__form" name={`${props.name}-form`} noValidate>
          <button className="popup__close" type="button"></button>
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button type="submit" className="popup__submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default ImagePopup;