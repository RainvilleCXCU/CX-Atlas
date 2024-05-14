// Allows access to the modal state with useContext
import { Dispatch, SetStateAction, createContext } from "react";

/**
 *  Show Details 
 */
interface ItoggleContentContext {
  toggleContent: string;
  setToggleContent: Dispatch<SetStateAction<string>>;
}
export const toggleContentValue: ItoggleContentContext = {
    toggleContent: '',
    setToggleContent: () => ''
}
export const toggleContentContext = createContext<ItoggleContentContext>(toggleContentValue);
