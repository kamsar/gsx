// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/
const contentful = require('contentful');

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
module.exports = function (api, options) {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
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
      // RichText Editor nodeTypes do not resolve the mark: [] key value if the Mark is empty array
      // This causes the '@contentful/rich-text-html-renderer' to throw a JS error as it cannot map
      // the mark key is it does not exist, I'm not sure if this a a graphql thing or gridsome
      // as a work around I have stringified the content coming back so graphql / gridsome
      // does not remove the keys  that have null or empty values
      // Alternative method is to use custom graphql scheme
      collection.addNode({
        sys: {
          ...item.sys
        },
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
