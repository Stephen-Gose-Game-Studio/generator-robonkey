'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    walk            = require('../app/helpers/walk'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExistsPrompt = require('../app/prompts/structureExistsPrompt'),
    frameworkPrompt       = require('../app/prompts/frameworkPrompt'),
    gulpPrompt            = require('../app/prompts/gulpPrompt'),
    staticPrompt          = require('../app/prompts/staticPrompt'),
    projectPrompt         = require('../app/prompts/projectPrompt'),
    structurePrompt       = require('../app/prompts/structurePrompt'),
    htmlPrompt            = require('../app/prompts/htmlPrompt');

var dirsToCheck       = ['mainDir', 'assetsDir', 'cssDir', 'imgDir', 'jsDir', 'libDir', 'fontDir'],
    frameworksToCheck = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];


module.exports = yeoman.Base.extend({

  initializing: function(){
    var done = this.async(),
        self = this;

    init(this, function(){
      greeting(self);
      done();
    });
  },




  prompting: {
    existingEnvironment: function(){
      this.cfg.environmentOption ='static';
      var done = this.async(),
          self = this,
          destRoot = this.destinationRoot();

      frameworkPrompt(frameworksToCheck, destRoot, this.calledFrom, this, function(environmentOption){
        self.cfg.environmentOption = environmentOption;
      });
    },

    gulp: function(){
      if(this.exit) return;
      var done = this.async(),
      self = this;
      gulpPrompt(this, function(){
        done();
      })
    },

    environment: function(){
      if(this.exit) return;
      var done = this.async();
      staticPrompt(this, function(){
        done();
      })
    },

    project: function(){
      if(this.exit) return;
      var done = this.async();
      projectPrompt(this, function(){
        done();
      })
    },

    // existingStructure: function(){
    //   if(this.exit) return;
    //   var done = this.async();
    //   structureExistsPrompt(this, dirsToCheck, function(){
    //     done();
    //   })
    // },

    structure: function(){
      if(this.exit) return;
      var done = this.async();
      structurePrompt(this, dirsToCheck, function(){
        done();
      })
    },

    html: function(){
      if(this.exit) return;
      var done = this.async();
      htmlPrompt(this, function(){
        done();
      })
    },

    styles: function(){
      if(this.exit) return;
      this.composeWith('robonkey:styles',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });
    },

    js: function(){
      if(this.exit) return;
      this.composeWith('robonkey:js',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });
    },

    font: function(){
      if(this.exit) return;
      this.composeWith('robonkey:icons',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });
    }
  },




  configuring: {
    answers: function(){
      if(this.exit) return;
      var done = this.async();
      setConfigVars(this, function(){
        done();
      });
    },

    config: function(){
      if(this.exit) return;
      var done = this.async();
      setConfigFiles(this, function(){
        done();
      });
    },
  },




  writing: function(){
    if(this.exit) return;
    var done       = this.async(),
        self       = this,
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();

    if(this.cfg.gulpDirOption) gulpRoot = path.join(destRoot,'gulp')

    copyFiles.copyGulpFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      copyFiles.copyProjectFiles(self, destRoot, sourceRoot, function(){
        copyFiles.copyWordpressFiles(self, destRoot, sourceRoot, function(){
          copyFiles.copyH5bpFiles(self, destRoot, sourceRoot, function(){
            copyFiles.copyHtmlFiles(self, destRoot, sourceRoot, function(){
              copyFiles.copyImageFiles(self, destRoot, sourceRoot, function(){
                done();
              });
            });
          });
        });
      });
    });

  },




  install: function(){
    if(this.exit) return;
    var done = this.async();
    installDep(this);
    done();
  }

});
