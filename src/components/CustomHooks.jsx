import { useState } from "react";
import whiteKing from '../images/pieces/cburnett/wK.svg'

/* Establece el modo de juego al que se está jugando */
export const GameMode = () => {
  const [gameMode, setGameMode] = useState('Rapid');
  const updateMode = (newMode) => {
    setGameMode(newMode);
  };
  return {
    gameMode,
    updateMode,
  };
}

/* Establece el avatar y el fondo de avatar del usuario */
export const AvatarSelector = () => {
  const [avatar, setAvatar] = useState({
    image : whiteKing, 
    bgcolor: 'orange',
  });
  const modifyAvatarImage = (newAvatar) => {
    setAvatar(prevState => ({
      ...prevState,
      image : newAvatar,
    }));
  };
  const modifyAvatarColor = (color) => {
    setAvatar(prevState => ({
      ...prevState,
      bgcolor : color,
    }));
  }
  return {
    avatar,
    modifyAvatarImage,
    modifyAvatarColor,
  };
}

/* Hook para mostrar el perfil del usuario en el home */
export const ShowUserProfile = () => { 
  const [userProfileVisibility, setUserProfileVisibility] = useState(false);
  const updateUserProfileVisibility = () => {
    setUserProfileVisibility(!userProfileVisibility);
  };
  return {
    userProfileVisibility,
    updateUserProfileVisibility,
  };
}

/* Hook para almacenar el nombre de los jugadores en partida */
export const PlayersInGame = () => { 
  const [playersInfo, setPlayersInfo] = useState({
    me : '', 
    opponent: '',
  });
  const updatePlayersInGame = (players) => {
    setPlayersInfo({
      me : players.me,
      opponent : players.opponent,
    });
  };
  return {
    playersInfo,
    updatePlayersInGame,
  };
}

/* Hook para información acerca del usuario */
export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    /* Información a guardar de cada usuario */
    loggedIn : true,
    userName : '',
    userId : '',
  });
  const updateUserInfo = (data) => {
    setUserInfo(prevState => ({
      /* Modifica solo el campo campo indicado con el valor indicado */
      ...prevState,
      [data.field] : data.value,
    }));
  }

  return {
    userInfo,
    updateUserInfo,
  }
}