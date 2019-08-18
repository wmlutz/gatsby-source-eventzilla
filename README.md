<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>

<h1 align="center">
  gatsby-source-eventzilla
</h1>

This module helps you pull data from your Eventzilla account. I had a couple issues using one of the competitors (for which there are many source plugins) and moved to Eventzilla. This plugin makes all of your events available in graphql. This _only_ works for events, none of the other api endpoints.

To install:

```
yarn add gatsby-source-eventzilla
```

(or `npm install --save gatsby-source-eventzilla`)

Then add the config to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-eventzilla',
      options: {
        typeName: '<INPUT_GRAPHQL_TYPE_NAME_HERE>',
        apiKey: '<PUT_EVENTZILLA_API_KEY_HERE>', 
      }
    },
  ],
};
```

## EVENTZILLA CREDENTIALS

- Log into your Eventzilla account and navigate to API Access [https://www.eventzilla.net/admin/ManageSettings?mode=appmanagement](https://www.eventzilla.net/admin/ManageSettings?mode=appmanagement)

- Choose the "Create a New App" button and enter the appropriate details.

- Click "show" to see your token and copy it to the apiKey in your gatsby-config file.

## Helpful links

- [Gatsby documentation](https://www.gatsbyjs.org/)
