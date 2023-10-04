import { gql } from "@apollo/client"

export const LocationPageFragment = gql`
    fragment LocationPageFragment on Location {
        id
        slug
        content(format: RENDERED)
        title(format: RENDERED)
        locationId
        details {
            zip
            state
            specialMessageType
            specialMessageTitle
            specialMessage
            specialHoursHTML
            lobbyHoursHTML
            services
            lng
            lat
            driveThruHoursHTML
            contact
            city
            address
        }
    }`;