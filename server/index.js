const riot = require('riot');

require('../build/app');

const html = riot.render("app");
console.log(html);
