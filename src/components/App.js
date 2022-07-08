import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
const [isOpen, setIsOpen] = React.useState(false)
const [isOpenEditProfile, setIsOpenEditProfile] = React.useState(false)
const [isOpenEditAva, setIsOpenEditAva] = React.useState(false)
const [isOpenAddPlace, setIsOpenAddPlace] = React.useState(false)

  function handleEditProfileClick () {
    setIsOpenEditProfile(!isOpenEditProfile)

  }
  function handleEditAvatarClick () {
    setIsOpenEditAva(!isOpenEditAva)

  }
  function handleAddPlaceClick () {
    setIsOpenAddPlace(!isOpenAddPlace)

  }
  function closeAllPopups () {
  setIsOpenEditProfile(false)
  setIsOpenEditAva(false)
  setIsOpenAddPlace(false)
  }



  return (
    <div classNameName="App">
      <body className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
        <Footer />
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isOpenEditProfile} onClick={closeAllPopups}>
          <input
            type="text" 
            className="popup__input" 
            id='nameInput' 
            name="name" 
            value="" 
            placeholder="Имя пользователя"
            minLength="2"
            maxLength="40"
            required />
            <span className="nameInput-error"></span>
            <input 
            type="text" 
            className="popup__input" 
            id='jobInput' 
            name="job"
            value=""
            placeholder="Род деятельности" 
            minLength="2"
            maxLength="200"
            required />
            <span className="jobInput-error"></span>
        </PopupWithForm>
        <PopupWithForm name="edit-ava" title="Обновить аватар" isOpen={isOpenEditAva} onClick={closeAllPopups}>
        <input
          type="url" 
          className="popup__input" 
          id='avaLink' 
          name="avaLink" 
          value="" 
          placeholder="Ссылка на картинку" 
          required />
          <span className="avaLink-error"></span>
        </PopupWithForm>
        <PopupWithForm name="add-place" title="Новое место" isOpen={isOpenAddPlace} onClick={closeAllPopups}>
          <input
            type="text"
            className="popup__input"
            id='placeNameInput' 
            name="placeName" 
            value="" 
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            />
            <span className="placeNameInput-error"></span>
            <input 
            type="url" 
            className="popup__input" 
            id='placeLinkInput' 
            name="link" 
            value="" 
            placeholder="Ссылка на картинку"
            required />
            <span className="placeLinkInput-error"></span>
        </PopupWithForm>
        <PopupWithForm name="delete-place" title="Вы уверены?" isOpen={isOpen}>
        </PopupWithForm>
  
    <div className="popup popup_dart-bg" id="photoPopup">
      <div className="popup__container">
          <button className="popup__close" type="button"></button>
          <img className="popup__image" src="images/Elbrus.png" alt="место" />
          <h3 className="popup__image-name"></h3>
      </div>
    </div>
</body>
    </div>
  );
}

export default App;
