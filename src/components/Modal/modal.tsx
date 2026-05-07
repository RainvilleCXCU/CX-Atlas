import { useContext, useEffect, useState } from "react";
import { isModalOpenContext, modalContentContext } from "./modalContext";
import { parseHtml } from "lib/parser";
import { whitelistRegex } from "utils/urlParser";
import Link from "next/link";

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
  const [ headerHeight, setHeaderHeight ] = useState(0);
  const closeModal = () => {
    setIsModalOpen(false);
    return true;
  };
  const {
      title,
      titleClass,
      copy,
      copyClass,
      continueLink,
      continueText,
      target,
      bodyTakeover,
      cancelText,
      cancelUrl,
      forceAction,
      centerText,
      html,
      component
  } = modalContent || {
    title: 'Title',
    titelClass: '',
    copy: 'Copy',
    copyClass: '',
    continueLink: null,
    continueText: "Continue",
    cancelText: "Cancel",
    bodyTakeover: false,
    cancelUrl: null,
    centerText: false,
    forceAction: false,
    target: '_blank',
    html: '',
    component: <></>
  }

  useEffect(() => {
    setHeaderHeight(document.querySelector('.cx-header').clientHeight);
    isModalOpen && bodyTakeover ? document.querySelector('#page.container.site').classList.add('cx-hidden') : document.querySelector('#page.container.site').classList.remove('cx-hidden');
  })

  return (
    <>
        <div style={bodyTakeover ? {top: headerHeight} : {}} className={`cx-container-modal--force-close${isModalOpen ? '' : ' cx-modal__hidden'} cx-container-modal${bodyTakeover ? '--bodytakeover' : '--fixed'}`}>
          <div className={`cx-container-modal__modal-bg ${bodyTakeover ? ' cx-hidden' : ''}`} onClick={forceAction ? closeModal : () => {}}></div>
          <div className="cx-container-modal__content">
            <button className={`cx-button--close${forceAction ? ' cx-hidden' : ''}`} onClick={closeModal}></button>
            <span>
              <h3 className={`no-margin--top${centerText ? ' center' : ''}${titleClass ? ` ${titleClass}` : ''}`}>{title}</h3>
              {copy && 
                <p className={copyClass ? `${copyClass}` : ''}>{copy}</p>
              }
              {html && 
                parseHtml(html)
              }
              {component && component}
              <div className="cx-container-modal__buttons">
                {cancelText && (
                  <Link
                    href={cancelUrl ?? '#'}
                    onClick={closeModal}
                    className="cx-button cx-button--outlined cx-button--compact cx-button--fullwidth"
                  >
                    {cancelText}
                  </Link>
                )}
                {continueLink && whitelistRegex.test(continueLink) === false && continueLink[0] !== '/' && continueLink[0] !== '#' && (
                  <a
                    href={continueLink}
                    onClick={closeModal}
                    target={target}
                    className="cx-button cx-button--compact cx-button--fullwidth"
                  >
                    {continueText}
                  </a>
                )}
                {continueLink && whitelistRegex.test(continueLink) == true && (
                  <Link
                    href={continueLink}
                    onClick={closeModal}
                    target={target}
                    className="cx-button cx-button--compact cx-button--fullwidth"
                  >
                    {continueText}
                  </Link>
                )}
              </div>
            </span>
          </div>
        </div>
    </>
      )
}

export default Modal;
