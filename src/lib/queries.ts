export const yoastQuery = `
    seo {
        fullHead
    }
`;

export const imageQuery = `
    sourceUrl
    altText
    mediaDetails {
        width
        height
    }
`;

export const flexibleQuery = (suffix) => `
    flexible${suffix} {
        fieldGroupName
        flexContent {
            ... on ${suffix}_Flexible${suffix.toLowerCase()}_FlexContent_Spacer {
                __typename
                spacer {
                    spacerAmount
                }
            }
            ... on ${suffix}_Flexible${suffix.toLowerCase()}_FlexContent_Wysiwyg {
                __typename
                wysiwyg {
                    container
                    text
                }
            }
        }
    }
`;

export const menuQuery = (name:string) =>  `
    menu(id: "${name}", idType: NAME) {
        menuItems {
            nodes {
                id
                uri
                label
            }
        }
    }
`;

