# ErwinWijnveld headlesswp-nextjs-starter

This is a starter for a headless WordPress site using Next.js. It uses the WordPress WPGraphQL and ApolloClient to fetch data from WordPress and display it on the frontend.

## Getting Started

### Step 1. configuring wordpress

You will need to install the required plugins for this to work. You can do this by going to the plugins page in your WordPress admin and installing the following plugins (zip folder for all plugins in ./docs/pluginpack.zip):

-   WPGraphQL
-   WPGraphQL for Advanced Custom Fields

Then you will need to configure your wordpress settings

-   Go to Settings > Permalinks and set your permalinks to Post name
-   Go to Settings > Reading and set your front page to display a static page and select the page you want to use as your homepage
-   Go to Settings > General and set your site url to http://localhost:3000 (or whatever your frontend url is)
-   Go to Settings > WPGraphQL > Settings > cors and set the allowed origins to http://localhost:3000 (or whatever your frontend url is)

### Step 2. Populate Content

Inside your WordPress admin, go to **Posts** and start adding new posts:

-   We recommend creating at least **2 posts**
-   Use dummy data for the content
-   Pick an author from your WordPress users
-   Add a **Featured Image**. You can download one from [Unsplash](https://unsplash.com/)
-   Fill the **Excerpt** field

![New post](./docs/new-post.png)

When you’re done, make sure to **Publish** the posts.

> **Note:** Only **published** posts and public fields will be rendered by the app unless [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) is enabled.

### Step 3. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set `WORDPRESS_API_URL` to be the URL to your GraphQL endpoint in WordPress. For example: `https://myapp.wpengine.com/graphql`.

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=...

NEXT_PUBLIC_WORDPRESS_URL=
NEXT_PUBLIC_FRONTEND_URL=

# Only required if you want to enable preview mode
# WORDPRESS_AUTH_REFRESH_TOKEN=
# WORDPRESS_PREVIEW_SECRET=

# Only required if you want to use google analytics
# NEXT_PUBLIC_GOOGLE_ANALYTICS=

```

### Step 4. Run Next.js in development mode

```bash
yarn install
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!

### Step 5. Add authentication for Preview Mode (Optional)

**This step is optional.** By default, the blog will work with public posts from your WordPress site. Private content such as unpublished posts and private fields cannot be retrieved. To have access to unpublished posts you'll need to set up authentication.

To add [authentication to WPGraphQL](https://docs.wpgraphql.com/guides/authentication-and-authorization/), first you need to add the [WPGraphQL JWT plugin](https://github.com/wp-graphql/wp-graphql-jwt-authentication) to your WordPress Admin following the same process you used to add the WPGraphQL plugin.

> Adding the WPGraphQL JWT plugin will disable your GraphQL API until you add a JWT secret ([GitHub issue](https://github.com/wp-graphql/wp-graphql-jwt-authentication/issues/91)).

Once that's done, you'll need to access the WordPress filesystem to add the secret required to validate JWT tokens. I recommend using SFTP — the instructions vary depending on your hosting provider. For example:

Once you have SFTP access, [generate your token](https://api.wordpress.org/secret-key/1.1/salt/) and open `wp-config.php` and add a secret for your JWT:

```php
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'YOUR_STRONG_SECRET' );
```

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

### Step 6. Try preview mode

On your WordPress admin, create a new post like before, but **do not publish** it.

Now, if you go to `http://localhost:3000`, you won’t see the post. However, if you enable **Preview Mode**, you'll be able to see the change ([Documentation](https://nextjs.org/docs/advanced-features/preview-mode)).

To enable Preview Mode, go to this URL:

```
http://localhost:3000/api/preview?secret=<secret>&id=<id>
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
-   [x] Redirect wp-admin to admin
-   [x] Options page integration and context
-   [ ] Homepage explanation component (TODO: preview privacy policy page)
-   [ ] Header + footer acf presets
-   [ ] Standard header search bar integration
-   [ ] Apollo client
-   [ ] Redirect naar admin url bij /wp-admin
-   [ ] NPProgress loader
-   [ ] Custom post type support + example
-   [ ] WP Menu support
-   [ ] https://api.wordpress.org/secret-key/1.1/salt/ in docs
-   [ ] GravityForms support
-   [ ] Login and register pages
-   [ ] Authenticated routes
-   [ ] Woocommerce integration
-   [ ] Plugins documentation Readme
-   [ ] Eslint config and integration
-   [ ] Husky config and integration

-   [x] https://github.com/ErwinWijnveld/headlesswp-plugin-starter Backend plugin setup
