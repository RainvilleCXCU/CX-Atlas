import { gql } from "@apollo/client"

export const LocationPageFragment = gql`
    fragment LocationPageFragment on Location {
        id
        slug
        content(format: RENDERED)
        title(format: RENDERED)
        details {
            lat
            lng
        }
    }`;