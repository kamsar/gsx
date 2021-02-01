# Optimize Contentful Gridsome.js Example Project
This is a [Gridsome.js](https://gridsome.org/) project bootstrapped with [`gridsome create`](https://gridsome.org/docs/#1-install-gridsome-cli-tool).


## Getting Started
### Configure environment variables
1. Copy .env.example to .env
2. Setup Contentful variables inside the `gridsome.server.js` file to match your CMS [see example config](#example-gridsome-config)
3. Configure your uniform data source

### Install Gridsome CLI tool if you don't have
```shell
npm install --global @gridsome/cli
```

### Install packages
```shell
npm i
# or
yarn
```

### Run the development server
```shell
npm run develop
# or
yarn develop
```

* open <http://localhost:8080/> with your browser to see the website locally.
* open <http://192.168.0.2:8080/> with your browser or external device to  see the website externally.
* open <http://localhost:8080/___explore> to see your graphql explorer and run / test your graphql queries.


### Build for production and launch server
```shell
npm run build
# or
yarn build
```

### Example gridsome.server.js
```javascript
// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/
const contentful = require('contentful');

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
module.exports = function (api) {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN
  });

  api.loadSource(async ({ addCollection, addSchemaResolvers }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/    
    const collection = addCollection('Talk');    
    const talk = await client.getEntries({
      content_type: 'talk',
      include: 2
    });
    talk.items.forEach((item) => {      
      collection.addNode({
        sys: { ...item.sys },
        fields: JSON.stringify(item.fields)
      });
    });   
  });

  api.createPages(async ({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/)      
    const data = await client.getEntries({
      content_type: 'page',
      include: 2
    });    
    data.items.forEach((item) => {
      createPage({
        path: `${item.fields.slug}`,
        component: './src/templates/ContentfulPage.vue',
        context: {
          title: item.fields.title,
          id: item.fields.slug,
          slug: `${item.fields.slug}`,
          path: `${item.fields.slug}`,
          sys: { ...item.sys },
          fields: { ...item.fields }
        }
      });
    });
  });
}
```
## Learn More
To learn more about Gridsome.js, take a look at the following resources:
- [Gridsome Documentation](https://gridsome.org/docs/) - learn about Gridsome.js features and API.
- [Gridsome Contribution](https://gridsome.org/docs/how-to-contribute/) - Contribute to Gridsome

