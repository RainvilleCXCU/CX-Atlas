const isOpen = async ({locationId = ''}) => {

    const ms = 60 * 1000; // Milliseconds in a minute
    const cache = Math.round(Date.now() / ms) * ms;

    const { open } = await fetch(`/wp-json/bhi/v1/open/${locationId}?t=${cache}`,
    {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    }
    ).then((res) => res.json());

    return open;
}
module.exports = {
    isOpen
}