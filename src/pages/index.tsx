import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { useState } from "react";
import Modal from 'components/Modal/modal';
import {isModalOpenContext, modalContentContext} from 'components/Modal/modalContext';

export default function Page(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  return (
    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <modalContentContext.Provider value={{modalContent, setModalContent}}>
        <Modal />
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