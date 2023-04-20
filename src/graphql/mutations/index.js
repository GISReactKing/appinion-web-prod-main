import { gql } from "@apollo/client";

export const CREATE_SPECIALIST = gql`
  mutation MyMutation(
    $code: String
    $title: String
    $speciality: uuid
    $shortCode: String
    $secretaryEmail: String
    $referee2: String
    $referee1: String
    $qualificationCertificateURL: json
    $practiceAddress: String
    $phoneRef2: String
    $phoneRef1: String
    $phone: String
    $nameRef2: String
    $nameRef1: String
    $medicalCertificateURL: String
    $licenceURL: String
    $lastName: String
    $governanceURL: String
    $firstName: String
    $emailRef2: String
    $emailRef1: String
    $email: String
    $bankName: String
    $addressTwoURL: String
    $addressOneURL: String
    $accountTilte: String
    $accountNo: String
    $SafeguardingURL: String
    $GMCno: String
    $GMCURL: String
    $CVURL: String
    $CRBDBSURL: String
    $CCTURL: String
    $AppraisalEvidenceURL: String
    $bankAccountToken: String
  ) {
    insert_specialist_web(
      objects: {
        code: $code
        title: $title
        speciality: $speciality
        shortCode: $shortCode
        secretaryEmail: $secretaryEmail
        referee2: $referee2
        referee1: $referee1
        qualificationCertificateURL: $qualificationCertificateURL
        practiceAddress: $practiceAddress
        phoneRef2: $phoneRef2
        phoneRef1: $phoneRef1
        phone: $phone
        nameRef2: $nameRef2
        nameRef1: $nameRef1
        medicalCertificateURL: $medicalCertificateURL
        licenceURL: $licenceURL
        lastName: $lastName
        governanceURL: $governanceURL
        firstName: $firstName
        emailRef2: $emailRef2
        emailRef1: $emailRef1
        email: $email
        bankName: $bankName
        addressTwoURL: $addressTwoURL
        addressOneURL: $addressOneURL
        accountTilte: $accountTilte
        accountNo: $accountNo
        SafeguardingURL: $SafeguardingURL
        GMCno: $GMCno
        GMCURL: $GMCURL
        CVURL: $CVURL
        CRBDBSURL: $CRBDBSURL
        CCTURL: $CCTURL
        AppraisalEvidenceURL: $AppraisalEvidenceURL
        bankAccountToken: $bankAccountToken
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_SPECIALIST = gql`
  mutation updateSpecialist(
    $speciality: uuid!
    $username: String!
    $email: String!
    $phoneNumber: String!
    $availableEndDay: String
    $availableEndTime: String
    $availableStartTime: String
    $availableStartDay: String
    $name: String!
    $description: String
  ) {
    update_specialists(
      where: { username: { _eq: $username } }
      _set: {
        description: $description
        name: $name
        rating: 0
        speciality: $speciality
        availableStartTime: $availableStartTime
        availableStartDay: $availableStartDay
        availableEndTime: $availableEndTime
        availableEndDay: $availableEndDay
        phone: $phoneNumber
        email: $email
      }
    ) {
      returning {
        availableEndDay
        availableEndTime
        availableStartDay
        availableStartTime
        createdOn
        description
        email
        id
        image
        isFeatured
        name
        rating
        reviews
        speciality
        username
        specialityBySpeciality {
          icon
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation MyMutation($id: uuid!, $status: String) {
    update_specialist_web(
      where: { id: { _eq: $id } }
      _set: { status: $status }
    ) {
      returning {
        id
        status
        username
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation MyMutation($username: String, $specialist_web: uuid!) {
    update_profile(
      where: { username: { _eq: $username } }
      _set: { specialist_web: $specialist_web }
    ) {
      returning {
        createdOn
        id
        isSpecialist
        specialist_id
        specialist_web
        status
        user_id
        username
      }
    }
  }
`;

export const CREATE_EDUCATIONAL_CONTENT = gql`
  mutation MyMutation($description: String!, $image: String!, $title: String!) {
    insert_educational_content(
      objects: { description: $description, image: $image, title: $title }
    ) {
      returning {
        createdOn
        description
        id
        image
        title
      }
    }
  }
`;

export const UPDATE_EDUCATIONAL_CONTENT = gql`
  mutation MyMutation(
    $id: uuid!
    $description: String
    $image: String
    $title: String
  ) {
    update_educational_content(
      where: { id: { _eq: $id } }
      _set: { description: $description, image: $image, title: $title }
    ) {
      returning {
        createdOn
        description
        id
        image
        title
      }
    }
  }
`;

export const DELETE_EDUCATIONAL_CONTENT = gql`
  mutation MyMutation($id: uuid!) {
    delete_educational_content(where: { id: { _eq: $id } }) {
      returning {
        id
        image
        title
        description
        createdOn
      }
    }
  }
`;
