# gulpfile.js

The gulpfile.js is split up in parts using [require-dir]().
It gets it's tasks from the subdirectory `gulp-tasks`, which contains the followig files:

- bower.js _(moving bower dependencies to the `website/assets` folder)_
- iconfont.js _(creating the iconfont)_
- images.js _(imagemin)_
- jade.js _(jade compile)_
- modernizr.js _(creating modernizr file)_
- scripts.js _(concat and minify javascript)_
- styles.js _(concat and minify scss)_

## Settings

Two config files are present:

- config.json - contains basic settings for:
	- url for browsersync
	- modernizr settings
	- icon font settings
	- class perfix name
	- scope name
- paths.json - contains paths for:
	- scripts - scr/build
	- modernizr - build
	- html - scr
	- images - src/build
	- styles - src/build/scr_watch/build_soucemap
	- jade - src/watch/build
	- postcss - src/build
	- font - src/build/template/path


## Docs

- [Home](/README.md)
- [Getting started](/docs/getting-started.md)
- [Features](/docs/features.md)
- [Options](/docs/options.md)
- [Modernizr](/docs/modernizr.md)
- [Custom Icon Font](/docs/custom-icon-font.md)
- [Sass](/docs/sass/sass.md)
	- [Functions](/docs/sass/functions.md)
	- [Mixins](/docs/sass/mixins.md)