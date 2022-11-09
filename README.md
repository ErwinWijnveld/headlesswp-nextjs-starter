# ErwinWijnveld headlesswp-nextjs-starter

This is a starter for a headless WordPress site using Next.js. It uses the WordPress WPGraphQL and ApolloClient to fetch data from WordPress and display it on the frontend.

## Getting Started

### Step 1. configuring wordpress

You will need to install the required plugins for this to work. You can do this by going to the plugins page in your WordPress admin and installing the following plugins (zip folder for all plugins in ./docs/pluginpack.zip):

-   ACF Content Analysis voor Yoast SEO
-   Add WPGraphQL SEO
-   Advanced Custom Fields PRO
-   Classic Editor
-   Gravity Forms
-   Headless WP Email Settings
-   Jetpack
-   SVG Support
-   WP GraphQL
-   WPGraphQL CORS
-   WPGraphQL for Advanced Custom Fields
-   WPGraphQL for Gravity Forms
-   WPGraphQL JWT Authentication
-   Yoast SEO

#### Important

Install the [headlesswp starter plugin](http://https://github.com/ErwinWijnveld/headlesswp-plugin-starter 'headlesswp starter plugin'), this is where you will be doing all your backend work.

#### Then you will need to configure your wordpress/WPGraphQL settings

-   Go to Settings > Permalinks and set your permalinks to "Post name"
-   Go to Settings > General and set your site url to https://headlesswpstarter.com (or whatever your frontend url is)
-   Go to Settings > WPGraphQL > Settings > cors and set the allowed origins to http://localhost:3000 (or whatever your development/frontend url is)
-   Go to Settings > WPGraphQL > Settings > cors and check the following boxes: `Send site credentials.`, `Add Site Address to "Access-Control-Allow-Origin" header`, `Enable login mutation`, `Enable logout mutation`.
-   Go to Settings > WPGraphQL > Settings > cors and set the `Extend "Access-Control-Allow-Headers` to `content-type`.

### Step 2. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set `WORDPRESS_API_URL` to be the URL to your GraphQL endpoint in WordPress. For example: `https://myapp.wpengine.com/graphql`.

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=https://myapp.vercel.app/graphql

NEXT_PUBLIC_WORDPRESS_URL=https://myapp.vercel.app/graphql
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Only required if you want to enable preview mode
# WORDPRESS_AUTH_REFRESH_TOKEN=
# WORDPRESS_PREVIEW_SECRET=

# Only required if you want to use google analytics
# NEXT_PUBLIC_GOOGLE_ANALYTICS=

```

### Step 3. Run Next.js in development mode

```bash
yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!

### Step 4. Add authentication for Preview Mode (Optional)

**This step is optional.** By default, the blog will work with public posts, pages and projects from your WordPress site. Private content such as unpublished posts and private fields cannot be retrieved. To have access to unpublished posts you'll need to set up authentication.

> To add a [WPGraphQL JWT plugin](https://github.com/wp-graphql/wp-graphql-jwt-authentication) secret to your wordpress installation you go to Website Settings > General -> GRAPHQL JWT AUTH SECRET KEY and [add the generated auth token.](https://api.wordpress.org/secret-key/1.1/salt/)

> You can read more about this in the documentation for [WPGraphQL JWT Authentication](https://docs.wpgraphql.com/extensions/wpgraphql-jwt-authentication/).

Now, you need to get a **refresh token** to make authenticated requests with GraphQL. Make the following GraphQL mutation to your WordPress site from the GraphQL IDE (See notes about WPGraphiQL from earlier). Replace `your_username` with the **username** of a user with the `Administrator` role, and `your_password` with the user's password.

```graphql
mutation Login {
    login(
        input: {
            clientMutationId: "uniqueId"
            password: "your_password"
            username: "your_username"
        }
    ) {
        refreshToken
    }
}
```

Copy the `refreshToken` returned by the mutation, then open `.env.local`, and make the following changes:

-   Uncomment `WORDPRESS_AUTH_REFRESH_TOKEN` and set it to be the `refreshToken` you just received.
-   Uncomment `WORDPRESS_PREVIEW_SECRET` and set it to be any random string (ideally URL friendly).

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=...

NEXT_PUBLIC_WORDPRESS_URL=
NEXT_PUBLIC_FRONTEND_URL=

# Only required if you want to enable preview mode
WORDPRESS_AUTH_REFRESH_TOKEN=
WORDPRESS_PREVIEW_SECRET=

# Only required if you want to use google analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=
```

**Important:** Restart your Next.js server to update the environment variables.

### Step 5. Try preview mode

On your WordPress admin, create a new post like before, but **do not publish** it.

Now, if you go to `http://localhost:3000`, you won’t see the post. However, if you enable **Preview Mode**, you'll be able to see the change ([Documentation](https://nextjs.org/docs/advanced-features/preview-mode)).

To enable Preview Mode, go to this URL:

```
http://localhost:3000/api/preview-page?secret=<secret>&id=<id>
```

-   `<secret>` should be the string you entered for `WORDPRESS_PREVIEW_SECRET`.
-   `<id>` should be the post's `databaseId` field, which is the integer that you usually see in the URL (`?post=18` → 18).
-   Alternatively, you can use `<slug>` instead of `<id>`. `<slug>` is generated based on the title.

You should now be able to see this post. To exit Preview Mode, you can click on **Click here to exit preview mode** at the top.

## Todo

-   [x] Typescript integration
-   [x] Tailwind integration
-   [x] posts archive index
-   [x] Jetpack CDN support
-   [x] Yoast SEO module
-   [x] Google Analytics module
-   [x] ACF flexible layout for standard posts
-   [x] Prettier config and integration
-   [x] Yarn use restricted mode
-   [x] src routing
-   [x] plugins preset
-   [x] preview Posts
-   [x] Modal component
-   [x] Implement notifications hook
-   [x] preview Pages
-   [x] Wordpress standard pages routing + fetching
-   [x] Options page integration and context
-   [x] NPProgress loader
-   [x] Homepage explanation component
-   [x] Apollo client
-   [x] https://api.wordpress.org/secret-key/1.1/salt/ in docs
-   [x] Custom post type support + example
-   [x] Custom post type taxonomy category support
-   [x] Header acf presets
-   [x] Page transition component
-   [x] Persist next styles thru page transition
-   [x] Preview custom post type project
-   [x] Blockquote styling
-   [x] GravityForms support
-   [ ] GravityForms component fix rerender component captcha
-   [ ] Standard header search bar integration with @docsearch/react
-   [ ] Change layout of standard posts
-   [ ] Back button single project
-   [ ] Redirect wp-admin to admin
-   [ ] Footer acf presets
-   [ ] Use nodes instead of edges.nodes in standard posts
-   [ ] Login and register pages
-   [ ] Authenticated routes
-   [ ] Woocommerce integration
-   [ ] Plugins documentation Readme
-   [ ] Eslint config and integration
-   [ ] Husky config and integration

-   [x] https://github.com/ErwinWijnveld/headlesswp-plugin-starter Backend plugin setup
