import React from 'react';
import { client } from 'client';

function Styleguide(): JSX.Element {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  return (
    <>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/themes/CXCU/assets/${generalSettings.styleguideVersion}/cxcu.css`} />
    </>
  );
}

export default Styleguide;
