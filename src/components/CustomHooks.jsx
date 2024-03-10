import { useState } from "react";

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
  const [avatar, setAvatar] = useState('king');
  const modifyAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };
  return {
    avatar,
    modifyAvatar,
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
};