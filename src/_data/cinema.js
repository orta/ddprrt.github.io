const yaml = require('js-yaml')
const fs = require('fs')

module.exports = yaml.safeLoad(fs.readFileSync('./src/_data/cinema.yml', 'utf8'));
