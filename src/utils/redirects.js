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
    
    return data.redirection
        .filter((redirect) => redirect.action_type === type && redirect.match_type !== 'agent')
        .map((redirect) => {
            let redirectObj =
            {
                source: formatPathMatch(redirect.url),
                destination: redirect.action_data.replace('$1', ''),
            };
            if(type !== 'pass') {
                redirectObj.permanent = parseInt(redirect.action_code) === 301;
                if(!process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT || process.env.NEXT_PUBLIC_DISABLE_MIDDLEWARE_REDIRECT == 'false') {
                    redirectObj.regex = redirect.regex === '1'
                }
            } else {
                redirectObj.destination = redirectObj.destination;
            }

            // Check for URL Params
            const params = new URLSearchParams(redirect.url.split('?')[1]);
            if(redirect.match_type == 'url' && redirect.url.includes('?') && redirect.regex == '0' && params.size > 0) {
                redirectObj.has = [];
                params.forEach((value, key) => {
                    redirectObj.has.push({
                        type: 'query',
                        key: key,
                        value: value
                    });
                });
                console.log(JSON.stringify(params));
                redirectObj.source = redirect.match_url;
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
        .replace(/\//g, '/')
        .replace('$', '')
        .replace('?', '')
        .replace('^','')
        .replace('(i)','')
}

module.exports = {
    fetchWordPressRedirects
}