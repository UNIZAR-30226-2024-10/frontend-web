// useModifiableValue.jsx
import { useState } from 'react';

const useSharedValue = () => {
  const [value, setValue] = useState(false);

  const updateValue = () => {
    setValue(!value);
  };

  return {
    value,
    updateValue,
  };
};

export default useSharedValue;
