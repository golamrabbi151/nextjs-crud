import { gql } from "@apollo/client"

const GET_ALL_STUDENT = gql`
        query students {
            students {
                id
                name
                email
                phone
                dob
                subject
            }
        }
        `
const GET_ALL_SUBJECT = gql`
        query subjects {
            subjects {
                id
                name
            }
        }
        `

export { GET_ALL_STUDENT, GET_ALL_SUBJECT }