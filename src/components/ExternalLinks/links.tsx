import { isModalOpenContext, modalContentContext } from "components/Modal/modalContext";
import { useContext, useRef } from "react";

export interface Props {
    href?,
    children?,
    classNames?
}

function ExternalLink({
    href = '',
    children = <></>,
    classNames = ''
}: Props): JSX.Element {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const {setIsModalOpen} = useContext(isModalOpenContext);
    const {setModalContent} = useContext(modalContentContext);
  
    const handleClick = e => {
      e.preventDefault();
      if (linkRef.current) {
          console.log('OPEN MODAL')
            setModalContent({
                title: 'External Website',
                copy: 'You are about to visit a site not owned by Connexus Credit Union. Please note that we are not responsible for the content or privacy practices of third-party websites.',
                cancelText: 'Stay here',
                continueText: 'Continue',
                continueLink: linkRef.current.href,
            })
            setIsModalOpen(true);
      }
    };
    return (
        <a href={href} className={`${classNames}`} target="_blank" onClick={handleClick} ref={linkRef} >
            {children}
        </a>
    );
}

export default ExternalLink;
