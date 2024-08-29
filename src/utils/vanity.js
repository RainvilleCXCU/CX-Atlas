import { gql } from '@apollo/client';
import apolloClient from 'apolloClient';

const fetchVanityByPath = async ({path = null}) => {

    const { data } = await apolloClient.query({
        query: gql`
        query GetVanityURLs {
        vanityURLs {
            nodes {
                id
                    vanityUrlFields {
                        active
                        destinationUrl
                        vanityUrl
                    }
                }
            }
        }
      `,
    });

    // const { data } = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    // {
    //     method: "POST",
    //     body: JSON.stringify({
    //     query: `GetVanityURLs {
    //                 vanityURLs {
    //                     nodes {
    //                         id
    //                             vanityUrlFields {
    //                                 active
    //                                 destinationUrl
    //                                 vanityUrl
    //                             }
    //                         }
    //                     }
    //                 }`,
    //     }),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     revalidate: 600
    // }
    // ).then((res) => res.json());
    
    const vanity = data.vanityURLs ? data.vanityURLs.nodes
    .filter((vanity) => vanity.vanityUrlFields.vanityUrl === path && vanity.vanityUrlFields.active) : [];

    console.log('VANITY');
    console.log(data);
    
    return vanity.length > 0 ? vanity[0].vanityUrlFields : null
}

module.exports = {
    fetchVanityByPath
}