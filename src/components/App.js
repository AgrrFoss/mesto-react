import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from './Card';
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditProfilePopup';


function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpenEditProfile, setIsOpenEditProfile] = React.useState(false);
  const [isOpenEditAva, setIsOpenEditAva] = React.useState(false);
  const [isOpenAddPlace, setIsOpenAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  const [currentUser, setCurrentUser] = React.useState(false);
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        api.getCard()
        .then((res) => {
          setCards(res);
        })
        .catch(err => {
          console.log(err)
        });
      })
      .catch(err => {
        console.log(err)
      });

  }, []);

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
    .then ((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleEditProfileClick() {
    setIsOpenEditProfile(!isOpenEditProfile)
  }
  function handleEditAvatarClick() {
    setIsOpenEditAva(!isOpenEditAva)
    console.log(isOpenEditAva)
  }
  function handleAddPlaceClick() {
    setIsOpenAddPlace(!isOpenAddPlace)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsOpenEditProfile(false)
    setIsOpenEditAva(false)
    setIsOpenAddPlace(false)
    setSelectedCard({name: '', link: ''})
  }
  function handleUpdateUser(obj) {
    api.postUserInfo('/users/me', obj)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar(obj) {
    api.postUserInfo('/users/me/avatar', obj)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <div className="page">
            <Header />
            <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}
            cards={cards} 
            onLikeCard={handleCardLike}
            onDeleteCard={handleCardDelete}/>
            <Footer />
            <EditProfilePopup isOpen={isOpenEditProfile} onClick={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <EditAvatarPopup isOpen={isOpenEditAva} onClick={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
           
            <PopupWithForm name="add-place" title="Новое место" buttonText="Добавить" isOpen={isOpenAddPlace} onClick={closeAllPopups}>
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
            <PopupWithForm name="delete-place" title="Вы уверены?" buttonText="Да" isOpen={isOpen}>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClick={closeAllPopups}>
            </ImagePopup>
          </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
