const fetchWordPressRedirects = async ({type = 'url'}) => {
    const { data } = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    {
        method: "POST",
        body: JSON.stringify({
        query: '{redirection{action_code action_type action_data match_type match_url regex status url}}',
        }),
        headers: {
        "Content-Type": "application/json",
        },
    }
    ).then((res) => res.json());

    // console.log(data.redirection
    //     .filter((redirect) => redirect.action_type !== 'url')
    //     .map((redirect) => ({
    //         source: formatPathMatch(redirect.url),
    //         destination: redirect.action_data,
    //         permanent: redirect.action_code === 301
    //     }))
    //     )
    if(type === 'pass') {
        console.log(data.redirection
            .filter((redirect) => redirect.action_type === type)
            .map((redirect) => {
                let redirectObj =
                {
                    source: formatPathMatch(redirect.url),
                    destination: redirect.action_data
                };
                if(type !== 'pass') {
                    redirectObj.permanent = redirect.action_code === 301;
                } else {
                    redirectObj.destination = process.env.NEXT_PUBLIC_WORDPRESS_URL + redirectObj.destination;
                }
                return redirectObj;
            }));
        }

    
    return data.redirection
        .filter((redirect) => redirect.action_type === type)
        .map((redirect) => {
            let redirectObj =
             {
                source: formatPathMatch(redirect.url),
                destination: redirect.action_data.replace('$1', '')
            };
            if(type !== 'pass') {
                redirectObj.permanent = redirect.action_code === 301;
            } else {
                redirectObj.destination = redirectObj.destination;
            }
            return redirectObj;
        });
}

const formatPathMatch = path => {
    return path
        .replace('(.*)','wildcard')
        .replace('*','(.*)')
        .replace('wildcard','(.*)')
        .replace(/\\/g, '')
        .replace('$', '(.*)')
        .replace('?', '')
        .replace('^','')
        .replace('(i)','')
}

module.exports = {
    fetchWordPressRedirects
}