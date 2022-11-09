export const getFormById = (id) => `
    gfForm(id: "${id}", idType: DATABASE_ID) {
        databaseId
        formFields {
            nodes {
                id
                type
                ... on TextField {
                    id
                    description
                    label
                    placeholder
                    isRequired
                }
                ... on TextAreaField {
                    id
                    description
                    label
                    placeholder
                    isRequired
                }
                ... on EmailField {
                    id
                    description
                    label
                    placeholder
                    isRequired
                }
                ... on CaptchaField {
                    id
                }
            }
        }
    }
`;

