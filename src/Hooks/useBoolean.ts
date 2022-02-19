import { useState } from "react";

/**
* 
* @author andr30z
**/
export function useBoolean(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x) => !x);

  return { value, setValue, setTrue, setFalse, toggle };
}
