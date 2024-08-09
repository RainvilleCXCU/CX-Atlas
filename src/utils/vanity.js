const fetchVanityByPath = async ({path = null}) => {
    const { data } = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql?cache=234`,
    {
        method: "POST",
        body: JSON.stringify({
        query: `{
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
                    }`,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }
    ).then((res) => res.json());
    
    const vanity = data.vanityURLs ? data.vanityURLs.nodes
    .filter((vanity) => vanity.vanityUrlFields.vanityUrl === path && vanity.vanityUrlFields.active) : [];
    
    return vanity.length > 0 ? vanity[0].vanityUrlFields : null
}

module.exports = {
    fetchVanityByPath
}