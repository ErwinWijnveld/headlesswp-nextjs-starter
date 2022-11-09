import { getFormById } from "./queries/gfravityforms";

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
            ... on ${suffix}_Flexible${suffix.toLowerCase()}_FlexContent_Form {
                __typename
                form {
                    formId
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

export const projectQuery = `
    title
    slug
    date
    excerpt
    featuredImage {
        node {
            ${imageQuery}
        }
    }
    projectCategories {
        nodes {
            uri
            slug
            name
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
    ${getFormById(1)}
`;
