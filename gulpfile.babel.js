import gulp from 'gulp';
import babel from 'gulp-babel';
import log from 'fancy-log';
import fs from 'fs';
import mjml2html from 'mjml';
import {registerComponent} from 'mjml-core';
import mkdirp from 'mkdirp';
import path from 'path';

let options = {
  beautify: false,
  keepComments: false,
  minify: true,
};

const walkSync = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file === '.DS_Store') {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), fileList)
      : fileList.concat(path.join(dir, file));
  });
  return fileList;
};

const watchedComponents = walkSync('./src/components');
const watchedTemplates = walkSync('./src/templates');

function compile(event) {
  if (event) {
    log.info(`File ${event.path} was ${event.type}ed.`);
  }

  gulp.src(path.normalize('src/components/**/*.js'))
    .pipe(babel())
    .on('error', log)
    .pipe(gulp.dest('dist/components'))
    .on('end', () => {
      watchedComponents.forEach((compPath) => {
        const fullPath = path.join(process.cwd(), compPath.replace(/^src/, 'dist'));
        delete require.cache[fullPath];
        // eslint-disable-next-line global-require
        registerComponent(require(fullPath).default);
      });

      mkdirp('./dist/templates');
      watchedTemplates.forEach((tempPath) => {
        fs.readFile(path.normalize(tempPath), 'utf8', (err, data) => {
          if (err) {
            throw err;
          }

          const result = mjml2html(data, options);
          const name = path.basename(tempPath, '.mjml');
          fs.writeFileSync(`dist/templates/${name}.html`, result.html);
        });
      });
    });
}

gulp.task('build', compile);

gulp.task('watch', () => {
  options = {
    beautify: true,
    keepComments: true,
    minify: false,
  };
  compile();
  gulp.watch(['src/components/**/*.js', 'src/templates/**/*.mjml'], compile);
});
