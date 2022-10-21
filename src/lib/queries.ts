
export const linkQuery = `
    url
    target
    title
`;

export const imageQuery = `
    sourceUrl
    altText
    mediaDetails {
        width
        height
    }
`;

export const yoastQuery = `
    seo {
        fullHead
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

export const optionsQuery = `
    optionsMenu {
        optionsMenu {
            header {
                logo {
                    ${imageQuery}
                }
                menuItems {
                    link {
                        ${linkQuery}
                    }
                }
            }
            footer {
                logo {
                    ${imageQuery}
                }
            } 
        }
    }
`;

/**
 *  Standard queries
 * @param suffix 
 * @returns Query string
 */


export const standardPostQueries = (suffix:string) => `
    ${yoastQuery}
    ${flexibleQuery(suffix)}
`;


export const standardGlobalQueries = (suffix?:string) => `
    ${optionsQuery}
`;
