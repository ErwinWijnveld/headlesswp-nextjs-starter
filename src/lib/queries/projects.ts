import { fetchAPI } from "../api"
import { imageQuery, projectQuery, standardGlobalQueries, standardPostQueries } from "../fragments"



export async function getPreviewProject(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewProject($id: ID!, $idType: ProjectIdType!) {
      project(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.project
}




export async function getAllProjectsWithSlug() {
  const data = await fetchAPI(`
    {
      projects(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.projects
}
export async function getAllProjectCategoriesWithSlug() {
  const data = await fetchAPI(`
    {
      projectCategories(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.projectCategories
}




export async function getProjectsForTaxonomy(slug, preview) {
  const data = await fetchAPI(
    `
    query ProjectsForTaxonomy($slug: ID!) {
      projectCategory(id: $slug, idType: SLUG) {
        name
        slug
        projects(first: 10000) {
          nodes {
            ${projectQuery}
          }
        }
      }
      projectCategories {
        nodes {
          name
          uri
        }
      }
      ${standardGlobalQueries()}
    }
  `,
    {
      variables: {
        slug,
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data
}


export async function getAllProjectsForArchive(preview) {
  const data = await fetchAPI(
    `
    query AllProjects {
      projects(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
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
        }
      }
      projectCategories {
        nodes {
          name
          uri
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



export async function getProjectAndMoreProjects(slug, preview, previewData) {
  const projectPreview = preview && previewData?.project
  // The slug may be the id of an unpublished project
  const isId = Number.isInteger(Number(slug))
  const isSameProject = isId
    ? Number(slug) === projectPreview.id
    : slug === projectPreview.slug
  const isDraft = isSameProject && projectPreview?.status === 'draft'
  const isRevision = isSameProject && projectPreview?.status === 'publish'
  const data = await fetchAPI(
    `

    fragment ProjectFields on Project {
      ${standardPostQueries('Project')}
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      projectCategories {
        nodes {
          name
          uri
        }
      }
    }
    query ProjectBySlug($id: ID!, $idType: ProjectIdType!) {
      project(id: $id, idType: $idType) {
        ...ProjectFields
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
            }
          }
        }
        `
            : ''
        }
      }
      projects(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ...ProjectFields
        }
      }
      ${standardGlobalQueries()}
    }
  `,
    {
      variables: {
        id: isDraft ? projectPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft projects may not have an slug
  if (isDraft) data.project.slug = projectPreview.id
  // Apply a revision (changes in a published project)
  if (isRevision && data.project.revisions) {
    const revision = data.project.revisions.nodes[0]

    if (revision) Object.assign(data.project, revision)
    delete data.project.revisions
  }

  return data
}




