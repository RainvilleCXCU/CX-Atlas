import DBLogin from "components/DigitalBanking/Login";
import { isModalOpenContext, modalContentContext } from "components/Modal/modalContext";
import Member from "components/Products/Member";
import { useContext, useRef } from "react";

export interface Props {
    href?,
    children?,
    classNames?
    ariaLabel?
}

function ExternalLink({
    href = '',
    children = <></>,
    ariaLabel = null,
    classNames = ''
}: Props): JSX.Element {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const {setIsModalOpen} = useContext(isModalOpenContext);
    const {setModalContent} = useContext(modalContentContext);
  
    const handleClick = e => {
      e.preventDefault();
      if(linkRef.current && linkRef.current.href.includes('applicationType=mantl')) {
          console.log('OPEN AOS')
          const account = new URL(linkRef.current.href).searchParams.get('account') ?? undefined;
          const productCode = new URL(linkRef.current.href).searchParams.get('productCode') ?? undefined;
          setModalContent({
            component: <Member account={account} productCode={productCode} />,
            maxWidth: '861px'
          })
          setIsModalOpen(true);
      } else if(linkRef.current && linkRef.current.href.includes('/mdr?')) {
        console.log('DB Login')
        //   setModalContent({
        //     component: <DBLogin />
        //   })
        //   setIsModalOpen(true);
        document.location.href = linkRef.current.href;
      } else {
        console.log('OPEN MODAL')
        setModalContent({
            title: 'External Website',
            copy: 'You are about to visit a site not owned by Connexus Credit Union. Please note that we are not responsible for the content or privacy practices of third-party websites.',
            cancelText: 'Stay here',
            continueText: 'Continue',
            continueLink: linkRef.current.href,
            target: '_blank'
        })
        setIsModalOpen(true);
        }
    };
    return (
        <a href={href} aria-label={ariaLabel ? ariaLabel : null} className={`${classNames}`} target="_blank" onClick={handleClick} ref={linkRef} >
            {children}
        </a>
    );
}

export default ExternalLink;
