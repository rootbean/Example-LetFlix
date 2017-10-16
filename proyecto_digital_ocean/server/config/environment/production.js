'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.ip || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

  sequelize: {
    uri: process.env.SEQUELIZE_URI ||
    //  || 'postgres://fvdmgvwajqzybn:99386e1c2d079a7fe955fc788cb979daeb2d593bad934660d8a208865e0578e5@ec2-54-235-193-84.compute-1.amazonaws.com:5432/deia5g2qqce492',
    'postgres://ruber:123456@165.227.126.46:5432/letflix',
    options: {
      logging: false,
      storage: 'dist.postgres',
      define: {
        timestamps: false
      }
    }
  }
};
//# sourceMappingURL=production.js.map
