export const trackMember = (e) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
    setCookie("ismember", "true", {
        expires,
    });
};