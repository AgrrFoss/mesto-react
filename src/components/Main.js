import React from 'react';
import api from '../utils/Api';
import Card from '../components/Card';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setuserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
    .then((res)=>{
      setUserName(res.name);
      setuserDescription(res.about);
      setUserAvatar(res.avatar);
      api.getCard()
      .then((res) => {
        setCards(res);
        console.log(res)
    })
    })
    
  }, []);

  return (
  <main className="content">
  <section className="profile">
    <div className="profile__ava-block">
      <img className="profile__ava" src={userAvatar} alt="Аватар пользователя" />
      <div className="profile__ava-edit" onClick={onEditAvatar}></div>
    </div>
      <div className="profile__name">
          <h1 className="profile__title">{userName}</h1>
          <button type="button" onClick={onEditProfile} className="profile__edit" aria-label="редактировать профиль"></button>
      </div>
      <p className="profile__desc">{userDescription}</p>
      <button type="button" onClick={onAddPlace} className="profile__add-button" aria-label="добавить фото"></button>
  </section>
  <section>
    <ul className="elements">
      {cards.map((item) => {
        return (
          <Card 
          name = {item.name}
          link = {item.link}
          likes = {item.likes}
          />
        )}) }
    </ul>
  </section>
</main>
  );
}

export default Main;