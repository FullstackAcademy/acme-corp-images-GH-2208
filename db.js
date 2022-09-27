const Sequelize = require('sequelize');
const { TEXT, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_images_db');

const Image = conn.define('image', {
  name: {
    type: STRING
  },
  data: {
    type: TEXT
  }
});

module.exports = {
  conn,
  Image
};
