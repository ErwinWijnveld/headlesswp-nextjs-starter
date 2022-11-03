import { fetchAPI } from "../api"
import { standardGlobalQueries, standardPostQueries } from "../fragments"

export async function getPreviewPage(id, idType = 'DATABASE_ID') {
    const data = await fetchAPI(
      `
      query PreviewPage($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
      {
        variables: { id, idType },
      }
    )
    return data.page
}

export async function getAllPagesWithSlug() {
    const data = await fetchAPI(`
        {
            pages(first: 10000) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)
    return data?.pages
}



export async function getPageWithPreview(
    slug, 
    preview, 
    previewData
    ) {
      const pagePreview = preview && previewData?.page
    // The slug may be the id of an unpublished page
    const isId = Number.isInteger(Number(slug))
    const isSamePage = isId
      ? Number(slug) === pagePreview.id
      : slug === pagePreview.slug
    const isDraft = isSamePage && pagePreview?.status === 'draft'
    const isRevision = isSamePage && pagePreview?.status === 'publish'
  
    const data = await fetchAPI(
      `
      fragment PageFields on Page {
        title
        slug
        date
        ${standardPostQueries('Page')}
      }
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          ...PageFields
          content
          ${
            // Only some of the fields of a revision are considered as there are some inconsistencies
            isRevision
              ? `
          revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
            edges {
              node {
                title
                content
              
              }
            }
          }
          `
              : ''
          }
        }
        ${standardGlobalQueries()}
      }
    `,
      {
        variables: {
          id: isDraft ? pagePreview.id : slug,
          idType: isDraft ? 'DATABASE_ID' : 'URI',
        },
      }
    )
  
  
    // Draft pages may not have an slug
    if (isDraft) data.page.slug = pagePreview.id
    // Apply a revision (changes in a published page)
    if (isRevision && data.page.revisions) {
      const revision = data.page.revisions.edges[0]?.node
  
      if (revision) Object.assign(data.page, revision)
      delete data.page.revisions
    }
  
  
    return data
}
  