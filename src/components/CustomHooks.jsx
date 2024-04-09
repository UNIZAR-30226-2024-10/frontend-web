import { useState } from "react";
import whiteKing from '../images/whiteKing.png'

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

export const AvatarSelector = () => { /* Hook para seleccionar el avatar del usario */
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

export const useSharedValue = () => { /* Hook para mostrar el perfil del usuario en el home */
  const [value, setValue] = useState(false);
  const updateValue = () => {
    setValue(!value);
  };
  return {
    value,
    updateValue,
  };
}

export const PlayersInGame = () => { /* Hook para almacenar el nombre de los jugadores en partida */
  const [playersInfo, setPlayersInfo] = useState({
    me : '', 
    opponent: '',
  });
  const updatePlayersInGame = (players) => {
    console.log("updateplayers, me : ",players.me);
    console.log("updateplayers, opponent : ",players.opponent);
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