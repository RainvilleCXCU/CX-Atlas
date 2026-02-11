import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { useState } from "react";
const Modal = dynamic(() => import("components/Modal/modal"));
import {isModalOpenContext, modalContentContext} from 'components/Modal/modalContext';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

export default function Page(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const router = useRouter();

  // Force clear loading immediately during render
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_DISABLE_TERM_REDIRECTS !== 'true') {
  setTimeout(() => {
      if (router?.events) {
      console.log('Clearing loading via immediate setTimeout');
      router.events.emit('routeChangeComplete', window.location.pathname);
      router.events.emit('routeChangeError', window.location.pathname);
      }
  }, 0);
  }
  return (
    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <modalContentContext.Provider value={{modalContent, setModalContent}}>
        {isModalOpen && modalContent &&
          <Modal />
        }
        <WordPressTemplate {...props} />
      </modalContentContext.Provider>
    </isModalOpenContext.Provider>
  );
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx,
    revalidate: process.env.NEXT_PUBLIC_PAGE_REVALIDATION ? parseInt(process.env.NEXT_PUBLIC_PAGE_REVALIDATION) : null
  });
}