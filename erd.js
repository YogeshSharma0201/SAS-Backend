var {sequelize} = require('./models');
var sequelizeErd = require('sequelize-erd');

const svg = sequelizeErd({ source: sequelize });
writeFileSync('./erd.svg', svg);
