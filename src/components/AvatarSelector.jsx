import { useState } from "react";

const AvatarSelector = () => {
  const [avatar, setAvatar] = useState('king');

  const modifyAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  }

  return {
    avatar,
    modifyAvatar,
  };
}

export default AvatarSelector;