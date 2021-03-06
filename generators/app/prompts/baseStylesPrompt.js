'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function baseStylesPrompt(self, cb){
  console.log(printTitle('Base Styles'));

  self.prompt([{
    type: 'list',
    name: 'baseStyleOption',
    message: 'What base styles to include?',
    choices: [{
      name: 'None',
      value: 'none'
    }, {
      name: 'Reset',
      value: 'reset'
    }, {
      name: 'Normalize',
      value: 'normalize'
    }, {
      name: 'Sanitize',
      value: 'sanitize'
    }],
    default: function(answers){
      if(self.cfg.baseStyleOption) return self.cfg.baseStyleOption
      else return 'none'
    }
  }], function (answers) {
    self.cfg.baseStyleOption = answers.baseStyleOption;

    cb();
  }.bind(self));
}

module.exports = baseStylesPrompt;
