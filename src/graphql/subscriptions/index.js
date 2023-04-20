import { gql } from "@apollo/client";

export const GET_PROFILES_SUBSCRIPTION = gql`
  subscription MyQuery {
    profile(
      where: { specialist_web: { _is_null: false } }
      order_by: { createdOn: desc }
    ) {
      id
      status
      username
      specialistWebBySpecialistWeb {
        username
        specialityBySpeciality {
          icon
          id
          name
        }
        AppraisalEvidenceURL
        CCTURL
        CRBDBSURL
        CVURL
        GMCURL
        GMCno
        SafeguardingURL
        accountNo
        accountTilte
        addressOneURL
        addressTwoURL
        bankName
        created_at
        email
        emailRef1
        emailRef2
        firstName
        governanceURL
        id
        lastName
        licenceURL
        medicalCertificateURL
        nameRef1
        nameRef2
        phone
        phoneRef1
        phoneRef2
        practiceAddress
        title
        speciality
        shortCode
        secretaryEmail
        referee2
        referee1
        qualificationCertificateURL
      }
      createdOn
      specialist_web
    }
  }
`;

export const GET_SPECIALIST = gql`
  subscription MySubscription {
    specialist_web(order_by: { created_at: desc }) {
      AppraisalEvidenceURL
      CCTURL
      CRBDBSURL
      CVURL
      GMCURL
      GMCno
      SafeguardingURL
      accountNo
      accountTilte
      addressOneURL
      addressTwoURL
      bankName
      code
      created_at
      email
      emailRef1
      emailRef2
      firstName
      governanceURL
      id
      lastName
      licenceURL
      medicalCertificateURL
      nameRef1
      nameRef2
      phone
      phoneRef1
      phoneRef2
      practiceAddress
      qualificationCertificateURL
      referee1
      referee2
      secretaryEmail
      shortCode
      speciality
      specialityBySpeciality {
        icon
        id
        name
      }
      status
      title
      username
    }
  }
`;
