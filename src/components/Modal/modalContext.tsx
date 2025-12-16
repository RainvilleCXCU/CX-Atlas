// Allows access to the modal state with useContext
import { Dispatch, SetStateAction, createContext } from "react";

/**
 *  Show Details 
 */
interface IisModalOpenContext {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
export const isModalOpenValue: IisModalOpenContext = {
    isModalOpen: false,
    setIsModalOpen: () => false
}
export const isModalOpenContext = createContext<IisModalOpenContext>(isModalOpenValue);
/**
 * Modal Settings and content
 */
interface ModalContent {
    title?;
    titleClass?;
    copy?;
    copyClass?;
    centerText?;
    bodyTakeover?;
    continueLink?;
    continueText?;
    cancelText?;
    cancelUrl?;
    forceAction?;
    html?;
    component?;
    target?;
    children?;
    classNames?;
  }
  interface IModalContentContext {
    modalContent: ModalContent;
    setModalContent: Dispatch<SetStateAction<ModalContent>>;
  }
  export const ModalContentDefaultValue: IModalContentContext = {
    modalContent: {},
    setModalContent: () => false
  }
  export const modalContentContext = createContext<IModalContentContext>(ModalContentDefaultValue);