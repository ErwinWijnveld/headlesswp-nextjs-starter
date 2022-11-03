import { fetchAPI } from "../api"
import { standardGlobalQueries, standardPostQueries } from "../fragments"

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
    const data = await fetchAPI(
      `
      query PreviewPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
      {
        variables: { id, idType },
      }
    )
    return data.post
}


export async function getAllPostsWithSlug() {
const data = await fetchAPI(`
    {
    posts(first: 10000) {
        edges {
        node {
            slug
        }
        }
    }
    }
`)
return data?.posts
}

export async function getAllPostsForHome(preview) {
const data = await fetchAPI(
    `
    query AllPosts {
    posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
        node {
            title
            excerpt
            slug
            date
            featuredImage {
            node {
                sourceUrl
            }
            }
            author {
            node {
                name
                firstName
                lastName
                avatar {
                url
                }
            }
            }
        }
        }
    }
    ${standardGlobalQueries()}
    }
`,
    {
    variables: {
        onlyEnabled: !preview,
        preview,
    },
    }
)

return data
}
  

export async function getPostAndMorePosts(slug, preview, previewData) {
    const postPreview = preview && previewData?.post
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(slug))
    const isSamePost = isId
      ? Number(slug) === postPreview.id
      : slug === postPreview.slug
    const isDraft = isSamePost && postPreview?.status === 'draft'
    const isRevision = isSamePost && postPreview?.status === 'publish'
    const data = await fetchAPI(
      `
      fragment AuthorFields on User {
        name
        firstName
        lastName
        avatar {
          url
        }
      }
      fragment PostFields on Post {
        ${standardPostQueries('Post')}
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            ...AuthorFields
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
          ${
            // Only some of the fields of a revision are considered as there are some inconsistencies
            isRevision
              ? `
          revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
            edges {
              node {
                title
                excerpt
                content
                author {
                  node {
                    ...AuthorFields
                  }
                }
              }
            }
          }
          `
              : ''
          }
        }
        posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              ...PostFields
            }
          }
        }
        ${standardGlobalQueries()}
      }
    `,
      {
        variables: {
          id: isDraft ? postPreview.id : slug,
          idType: isDraft ? 'DATABASE_ID' : 'SLUG',
        },
      }
    )
  
    // Draft posts may not have an slug
    if (isDraft) data.post.slug = postPreview.id
    // Apply a revision (changes in a published post)
    if (isRevision && data.post.revisions) {
      const revision = data.post.revisions.edges[0]?.node
  
      if (revision) Object.assign(data.post, revision)
      delete data.post.revisions
    }
  
    return data
}
  