'use strict';

var setConfigVars = function (self, cb) {
  self.environmentOption = self.cfg.environmentOption;
  self.rootFolder = self.cfg.rootFolder;
  self.nodeModules = self.cfg.nodeModules;

  self.projectUrl = self.cfg.projectUrl;
  self.projectName = self.cfg.projectName;
  if(self.cfg.projectName) self.projectNameJson = self.cfg.projectName.replace(/\s/g,'');
  self.projectDescription = self.cfg.projectDescription;
  self.projectVersion = self.cfg.projectVersion;
  self.projectAuthor = self.cfg.projectAuthor;
  self.authorURI = self.cfg.authorURI;
  self.projectLicense = 'MIT';

  self.themeNameSpace = self.cfg.themeNameSpace;
  self.themeName = self.cfg.themeName;
  self.wpBlankTheme = self.cfg.wpBlankTheme;
  self.themeAuthor = self.cfg.projectAuthor;
  self.themeAuthorURI = self.cfg.authorURI;

  self.mainDir = self.cfg.mainDir;
  self.themeDir = self.cfg.themeDir;
  self.assetsDir = self.cfg.assetsDir;
  self.cssDir = self.cfg.cssDir;
  self.imgDir = self.cfg.imgDir;
  self.jsDir = self.cfg.jsDir;
  self.libDir = self.cfg.libDir;
  self.fontDir = self.cfg.fontDir;

  self.iconfontOption = self.cfg.iconfontOption;


  self.gulpDirOption = self.cfg.gulpDirOption;
  self.cfg.gulpTypeOption = 'vanilla'; // 'vanilla', 'coffee'
  self.gulpTypeOption = self.cfg.gulpTypeOption;

  if(self.cfg.gulpDirOption) {
    self.cfg.rootFolder = '../';
    self.cfg.nodeModules = '../../gulp/node_modules/';
  } else {
    self.cfg.rootFolder = './';
    self.cfg.nodeModules = '../../node_modules/';
  }

  self.cfg.fontStyleOutputBase = '../../../../';

  self.templateOption = self.cfg.templateOption;

  switch (self.environmentOption) {
    case 'express':
      self.assetsDir = 'public';
    break;

    case 'laravel':
    case 'codeigniter':
      self.assetsDir = 'public/' + self.assetsDir;
    break;
  }

  switch (self.environmentOption){
    case 'wordpress':
      self.templateDest = self.mainDir + '/wp-content/themes/' + self.themeDir;
    break;

    case 'drupal':
      self.templateDest = self.mainDir + '/themes/' + self.themeDir;
    break;

    break;

    default:
      self.templateDest = self.mainDir;
  };

  self.cssDirPathGulp = '/' + self.assetsDir + '/' + self.cssDir;
  self.jsDirPathGulp = '/' + self.assetsDir + '/' + self.jsDir;
  self.imgDirPathGulp = '/' + self.assetsDir + '/' + self.imgDir;
  self.fontDirPathGulp = '/' + self.assetsDir + '/' + self.fontDir;
  self.cssLibDirPathGulp = self.cssDirPathGulp + '/' + self.libDir;
  self.jsLibDirPathGulp = self.jsDirPathGulp + '/' + self.libDir;

  self.cssDirPath = '/' + self.assetsDir + '/' + self.cssDir;
  self.jsDirPath = '/' + self.assetsDir + '/' + self.jsDir;
  self.imgDirPath = '/' + self.assetsDir + '/' + self.imgDir;
  self.fontDirPath = '/' + self.assetsDir + '/' + self.fontDir;
  self.cssLibDirPath = self.cssDirPath + '/' + self.libDir;
  self.jsLibDirPath = self.jsDirPath + '/' + self.libDir;

  cb(self);
}

module.exports = setConfigVars;