import type { NextApiRequest, NextApiResponse } from 'next'
import { getPreviewPage } from '../../lib/api'

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
  const page = await getPreviewPage(id || slug, id ? 'DATABASE_ID' : 'URI')

  console.log('page', page)

  // If the page doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: 'Post not found' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    page: {
      id: page.databaseId,
      slug: page.slug,
      status: page.status,
    },
  })

  // Redirect to the path from the fetched page
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${page.slug || page.databaseId}` })
  res.end()
}
