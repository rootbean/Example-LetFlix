'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://ruber:1234@localhost:5432/letflix',
    options: {
      logging: false,
      storage: 'dev.postgres',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
