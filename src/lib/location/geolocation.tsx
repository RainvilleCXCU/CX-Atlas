export const getGeoLocation = ():Promise<any> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(e => {
                resolve(e);
            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}