import type { NextApiRequest, NextApiResponse } from 'next'
import { getPreviewProject } from '../../lib/queries/projects'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, id, slug } = req.query

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !process.env.WORDPRESS_PREVIEW_SECRET ||
    secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
    (!id && !slug)
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const project = await getPreviewProject(id || slug, id ? 'DATABASE_ID' : 'SLUG')

  // If the project doesn't exist prevent preview mode from being enabled
  if (!project) {
    return res.status(401).json({ message: 'Project not found' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    project: {
      id: project.databaseId,
      slug: project.slug,
      status: project.status,
    },
  })

  // Redirect to the path from the fetched project
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/projects/${project.slug || project.databaseId}` })
  res.end()
}
