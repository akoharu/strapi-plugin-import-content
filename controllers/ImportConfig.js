'use strict';

module.exports = {
  index: async ctx => {
    const entries = await strapi.plugins['import-content'].models[
      'importconfig'
    ]
      .fetchAll()
      .then(data => data.toJSON());

    ctx.send(entries);
  },

  create: async ctx => {
    const importConfig = ctx.request.body;
    console.log('create', importConfig);

    const entry = await strapi.plugins['import-content'].models['importconfig']
      .forge(importConfig)
      .save();

    ctx.send(entry);
  },

  preAnalyzeImportFile: async ctx => {
    const data = await strapi.plugins['import-content'].services[
      'importconfig'
    ].preAnalyzeImportFile(ctx.query.url);

    ctx.send(data);
  }
};