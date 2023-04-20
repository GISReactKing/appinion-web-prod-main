import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUser($username: String!) {
    users(where: { username: { _eq: $username } }) {
      username
      phone
      id
      gender
      email
      dateOfBirth
      image
      firstName
      lastName
    }
  }
`;

export const GET_PROFILES = gql`
  query MyQuery {
    profile(
      where: { specialist_web: { _is_null: false } }
      order_by: { createdOn: desc }
    ) {
      id
      status
      username
      specialistWebBySpecialistWeb {
        username
        postCode
        phone
        name
        id
        inviteCode
        governance
        gender
        email
        certificate
        clinicURL
        created_at
        description
        availableStartTime
        availableStartDay
        ProofOfAddress
        Safeguarding
        availableEndDay
        availableEndTime
        GMCno
        CRBDBS
        ClinicalRef
        GMCcertificate
        speciality
        specialityBySpeciality {
          icon
          id
          name
        }
      }
    }
  }
`;

export const GET_SPECIALITY = gql`
  query getSpeciality {
    speciality(order_by: { name: asc }, where: { enable: { _eq: true } }) {
      name
      id
      icon
    }
  }
`;

export const GET_EDUCATIONAL_CONTENT = gql`
  query MyQuery {
    educational_content(order_by: { createdOn: desc }) {
      createdOn
      description
      id
      image
      title
    }
  }
`;
