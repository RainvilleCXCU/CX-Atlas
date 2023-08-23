const fetchWordPressRedirects = async () => {
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
        .filter((redirect) => redirect.action_type === 'url')
        .map((redirect) => ({
            source: formatPathMatch(redirect.url),
            destination: redirect.action_data,
            permanent: redirect.action_code === 301
        }));
}

const formatPathMatch = path => {
    return path
        .replace('(.*)','wildcard')
        .replace('*','(.*)')
        .replace('wildcard','(.*)')
        .replace('\\', '')
        .replace('?', '')
        .replace('^','')
        .replace('(i)','')
}

module.exports = {
    fetchWordPressRedirects
}