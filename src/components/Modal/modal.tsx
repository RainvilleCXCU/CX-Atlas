import { useContext } from "react";
import { isModalOpenContext, modalContentContext } from "./modalContext";

export interface Props {
//   title?;
//   copy?;
//   continueLink?;
//   continueText?;
//   cancelText?;
  children?;
  classNames?;
}

function Modal({
//   title = 'Title',
//   copy = 'Copy',
//   continueLink,
//   continueText = "Continue",
//   cancelText = "Cancel",
  children = <></>,
  classNames = "",
}: Props): JSX.Element {
  const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);
  const { modalContent, setModalContent } = useContext(modalContentContext);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const {
      title,
      copy,
      continueLink,
      continueText,
      cancelText,
      forceAction
  } = modalContent || {
    title: 'Title',
    copy: 'Copy',
    continueLink: null,
    continueText: "Continue",
    cancelText: "Cancel",
    forceAction: false
  }
  return (
    <>
        <div className={`cx-container-modal--fixed cx-container-modal--force-close${isModalOpen ? '' : ' cx-modal__hidden'}`}>
          <div className="cx-container-modal__modal-bg" onClick={forceAction ? closeModal : () => {}}></div>
          <div className="cx-container-modal__content">
            <button className="cx-button--close" onClick={closeModal}></button>
            <span>
              <h3 className="no-margin--top">{title}</h3>
              <p>{copy}</p>
              <div className="cx-container-modal__buttons">
                {cancelText && (
                  <a
                    onClick={closeModal}
                    className="cx-button cx-button--outlined cx-button--compact cx-button--fullwidth"
                  >
                    {cancelText}
                  </a>
                )}
                {continueLink && (
                  <a
                    href={continueLink}
                    onClick={closeModal}
                    target="_blank"
                    className="cx-button cx-button--compact cx-button--fullwidth"
                  >
                    {continueText}
                  </a>
                )}
              </div>
            </span>
          </div>
        </div>
    </>
      )
}

export default Modal;
