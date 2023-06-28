import React from 'react';
import Image from 'next/image';
import Heading from 'components/Heading';
import { MediaItem } from 'client';

export interface Props {
  color?: string;
  heading: string;
  image?: MediaItem
  body?: string
}

function PageTitle({
  color,
  heading,
  image,
  body
}: Props): JSX.Element {
  return (
    <div className={`cx-page-title${color ? ` cx-page-title--${color}` : ''}`}>
        <div className="cx-page-title__grid">
            <div className="cx-page-title__grid-primary">
                <Heading level='h1' className="cx-page-title__heading cx-text--white">{heading}</Heading>
                { body &&
                    <p className="cx-page-title__body cx-text--white">{ body }</p>
                }
            </div>
            { image &&
                <div className="cx-page-title__grid-image">
                    <Image src={image.mediaDetails.file} height={image.mediaDetails.height} width={image.mediaDetails.width} alt={image.altText} />
                </div>
            }
        </div>
    </div>
  );
}

export default PageTitle;
