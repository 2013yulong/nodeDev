// gulpfile.js
// ====================================

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import fs from 'fs';
import path from 'path';
import del from 'del';
import merge from 'merge-stream';
import pngquant from 'imagemin-pngquant';
import spritesmith from 'gulp.spritesmith';
import webpack from 'webpack-stream';
import banner from './webpack/banner.js';
import webpackConfigDev from './webpack/webpack.config.dev.babel.js';
import webpackConfigProd from './webpack/webpack.config.prod.babel.js';
import pkg from './package.json';
import _ from 'lodash';
import inquirer from 'inquirer';
import os from 'os';
let webpackConfig;
const $ = gulpLoadPlugins();
const isWin = os.platform() !== 'win32'; // 判断是否是 windows

// 环境变量
const NODE_ENV = process.env.NODE_ENV;      // 开发环境和生产环境
const DEBUG = process.env.DEBUG === 'true'; // 是否压缩代码
const PLATFORM = process.env.PLATFORM;      // 使用平台 native browser
const CDNDIR = pkg.cdn;                     // CDN 路径

// 路径
let paths = {
  scss: ['html/scss/app.scss', 'html/scss/couponList.scss'],
  scssModule: ['html/scss/**/*.*', 'html/scss/*.*', 'html/modules/**/*.scss'],
  htmls: 'html/modules/**/*.html',
  jsEntry: 'html/js/app.js',
  images: ['html/images/*.*', 'html/modules/**/*.png', 'html/modules/**/*.jpg'],
  imagesWatch: ['html/images/*.*', 'html/images/**/*.*'],
  noSpriteDirs: ['emotion', 'cmt']
};


// 判断是否是 `开发环境`
const isDev = NODE_ENV === 'development';
if (isDev) {
  // 开发环境
  paths.dist = {
    root: 'html/',
    css: 'html/.build/css',
    js: 'html/.build/js',
    images: 'html/.build/images'
  };

  webpackConfig = webpackConfigDev;
} else {
  // 生产环境
  paths.dist = {
    root: 'dist/',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/images',
    html: 'dist/modules'
  };

  webpackConfig = webpackConfigProd;
}

// 时间戳
const now = banner.now;
const cssBanner = banner.cssBanner;

// autoprefix 兼容版本
const autoprefixerOptions = {
  browsers: [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    //'Firefox >= 31',
    //'Explorer >= 9',
    'iOS >= 7',
    //'Opera >= 12',
    'Safari >= 7.1'
  ]
};

// 清除 build 目录
gulp.task('clean', ()=> {
  return del(['dist', './Payload.zip']);
});

gulp.task('clean:devBuild', ()=> {
  return del(['html/.build']);
});

// 清除 map 文件，减少包文件大小
gulp.task('clean:map', ()=> {
  return del(['dist/js/*.map']);
});


// 自动生成 modules 需要的 scss preparing
gulp.task('build:preparing', ()=> {
  let path = './html/modules/';
  let filter = ['.DS_Store', 'about', 'article', 'channel', 'channelList', 'debug', 'home', 'live', 'livemore', 'liveonline',
  'media', 'newsList', 'newsLive', 'newsPics', 'pics', 'search', 'settings','couponList'];         // 过滤不需要编译 scss 的文件
  let scssModules = '// modules.scss \r\n';
  let allModuleSass = fs.readdirSync(path).filter((module)=> {
    return filter.indexOf(module) === -1;
  });

  // 拼接 scss modules @import "../modules/special/special";
  allModuleSass.forEach((module, i)=> {
    scssModules += '\r\n// ' + module + '\r\n';
    scssModules += '@import "../' + 'modules/' + module + '/' + module + '.scss"' + ';\r\n';
  });

  fs.writeFileSync('./html/scss/_modules.scss', scssModules);
});

// 开发环境带 sourcemaps
gulp.task('build:css:maps', ()=> {
  return gulp.src(paths.scss)
    .pipe($.sourcemaps.init())//--
      .pipe($.sass({
        outputStyle: 'expanded'
      }).on('error', $.sass.logError))
      .pipe($.header(cssBanner))
      .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe($.size({showFiles: true, title: 'minified'}))
    .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}));
});


// 生产环境
gulp.task('build:css:min', ()=> {
  return gulp.src(paths.scss)
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.if(DEBUG, $.cssmin()))
    .pipe($.rename({suffix: '.min'}))
    //.pipe($.header(cssBanner))
    .pipe(gulp.dest(paths.dist.css))
    .pipe($.size({showFiles: true, title: 'minified'}))
    .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}));
});


// 临时
gulp.task('build:css:temporary', ()=> {
  return gulp.src(['./html/css/*', '!./html/css/video-js.css'])
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.if(DEBUG, $.cssmin()))
    //.pipe($.header(cssBanner))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist.css))
    .pipe($.size({showFiles: true, title: 'minified'}))
    .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}));
});


// 编译 scss
gulp.task('build:css', ['build:preparing'], ()=> {
  // build:env
  if (NODE_ENV === 'development') {
    runSequence(['build:css:maps']);
  }

  // build:prod ||  build:prod:debug
  if (NODE_ENV === 'production') {
    runSequence(['build:css:min', 'build:css:temporary']);
  }
});


// 编译 Javascript
gulp.task('build:webpack', ()=> {
  return gulp.src(paths.jsEntry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.dist.js))
    .pipe($.size({showFiles: true, title: 'js'}));
});


// Copy Modules Views 暂时没有使用
/*
gulp.task('build:html', ()=> {
  return gulp.src(paths.htmls)
    .pipe($.htmlReplace({
      'css': '../../css/app.min.css?d=' + now,
      'js': '../../js/app.bundle.min.js?d=' + now
    }))
    .pipe($.htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      }))
    .pipe(gulp.dest(paths.dist.html))
});
*/

// 处理 sprites 图片
var getFolders = function(dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
};

gulp.task('build:images:sprite', ()=> {
  // var: http://bunlog.d-s-b.jp/2014/12/19/optimize-gulpfile-for-gulp-spritesmith/
  // 获取 sprite 目录
  var folders = getFolders('html/images');
  var diffArray = _.difference(folders, paths.noSpriteDirs);    // 排除掉不需要 sprite 的目录

  diffArray.map((folder)=> {
    var spriteData = gulp.src('html/images/' + folder + '/*')
      .pipe(spritesmith({
        imgName: folder + '.png',
        cssName: '_' + folder + '.scss',
        cssTemplate: './html/scss/helper/spritesmith.css.hbs',
        padding: 10
      }));

    var imgStream = spriteData.img
      .pipe(gulp.dest('html/images/'));

    var cssStream = spriteData.css
      .pipe(gulp.dest('html/scss/components/sprite'));

    return merge(imgStream, cssStream);
  });
});


// Copy images 并压缩图片
gulp.task('build:images', ['build:images:sprite'], ()=> {
  // windows 安装 压缩图片有问题，禁用
  return gulp.src(paths.images)
    .pipe($.if(isWin, $.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest(paths.dist.images))
    .pipe($.size({title: 'all images'}));
});


gulp.task('build:images:dirs', ()=> {
  // 添加 noSpriteDirs 目录
  paths.noSpriteDirs.map((dir)=> {
    var path = 'html/images/' + dir + '/*.*';

    paths.images.push(path);
    return gulp.src(path)
      .pipe($.if(isWin, $.imagemin({  // windows 安装 压缩图片有问题，禁用
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      })))
      .pipe(gulp.dest(paths.dist.images + '/' + dir));
  });
});


// 监听文件变化
gulp.task('watch', ()=> {
  //gulp.watch(['html/images/**/*'], ['build:images:sprite']);
  //gulp.watch([paths.imagesWatch], ['build:images', 'build:images:dirs']);
  gulp.watch([paths.scssModule], ['build:css']);
});


// 最终大小
gulp.task('build:size', ()=> {
  return gulp.src('./dist/**/*')
    .pipe($.size({title: 'dist'}))
    .pipe($.size({gzip: true, title: 'dist gzip'}))
    .pipe($.zip('Payload.zip'))
    .pipe(gulp.dest('./'))
    .pipe($.size({title: 'Payload.zip'}))
    .pipe($.size({gzip: true, title: 'Payload gzip'}));
});


// build mainfest
gulp.task('build:manifest', ()=> {
  var manifest = `{
    "applicationId": "${pkg.name}",
    "versionCode": ${pkg.versionCode},
    "versionName": "${pkg.version}",
    "minJsKitVersion": ${pkg.minJsKitVersion},
    "targetJsKitVersion": ${pkg.targetJsKitVersion},
    "buildTime": ${new Date().getTime()}
}`;

  var fsOptions = {encoding: 'utf8'};

  fs.writeFile('./dist/JsKitManifest', manifest, fsOptions, (err, written, string)=> {
    if (err) {
      console.log(err);
    }
    console.log('create JsKitManifest success! ^_^ ');
  });
  fs.writeFile('./JsKitManifest', manifest, fsOptions, (err, written, string)=> {
    if (err) {
      console.log(err);
    }
    console.log('create JsKitManifest in html...');
  });
});


gulp.task('build:html:temporary', ['build:webpack'], ()=> {
  // static css replace
  let htmlArray = ['article', 'channel', 'channelList', 'common', 'home', 'live', 'media',
  'newsList', 'newsPics', 'normalize', 'search', 'special', 'livemore', 'video-js', 'app','couponList','optimizedread','jokeList','novel'];
  let htmlReplace = {};

  htmlArray.map((item)=> {
    // 短链接 要求 绝对路径 和 cdn 支持
    if (PLATFORM === 'browser') {
      htmlReplace[item] = CDNDIR + 'css/' + item + '.min.css?d=' + now;
      return;
    }
    htmlReplace[item] = '../../css/' + item + '.min.css?d=' + now;
  });

  // static js replace
  (function(dir) {
    return fs.readdirSync(dir).map((item)=> {
      const reg = /\w+/i;
      const name = item.match(reg)[0];
      if (PLATFORM === 'browser') {
        htmlReplace['js-' + name] = CDNDIR + 'js/' + name + '.bundle.min.js?d=' + now;
        return;
      }

      htmlReplace['js-' + name] = '../../js/' + name + '.bundle.min.js?d=' + now;
    });
  })('dist/js');

  return gulp.src(paths.htmls)
    .pipe($.htmlReplace(htmlReplace))
    .pipe($.if(DEBUG, $.htmlmin({
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    })))
    .pipe(gulp.dest(paths.dist.html));
});

/* 暂时不用
gulp.task('build:alone', ()=> {
  return gulp.src(['./html/modules/article/video.js'])
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist.js));
});
*/

// build
gulp.task('build', (cb)=> {
  // 临时
  runSequence(
    ['clean'],
    ['build:images:sprite'],
    [
      'build:images',
      'build:images:dirs',
      'build:css',
      'build:html:temporary',
      'build:webpack'
    ],
    ['build:manifest'],
    ['clean:map'],
    ['build:size']
  );
});


// 开发环境
gulp.task('dev', ()=> {
  runSequence(
    ['clean:devBuild'],
    ['build:images:sprite'],
    [
      'build:images',
      'build:images:dirs',
      'build:css',
      'build:webpack',
      'watch'
    ]
  );
});


var configDeploy = {
  host: '192.168.110.121',
  port: '80',
  username: 'h5apps',
  password: 'PO#Ye*e32'
};

// 部署
gulp.task('deploy', ()=> {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'deploy',
      message: '发布到 Payload.zip 到 newssdk 目录'
    },
    {
      type: 'list',
      name: 'platform',
      message: '选择运行环境？',
      choices: ['build', 'build:browser']
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '再次确认代码无误？'
    }
  ], (answers)=> {
    if (answers.deploy) {
      $.util.log($.util.colors.green('-- 开始打包 -> 🚀'));
      runSequence(['run:build']);
    }
  });
});

gulp.task('run:build', $.shell.task([
  'npm run build'
]));

gulp.task('run:build:browser', $.shell.task([
  'npm run build:browser'
]));


// module 生成器
gulp.task('generator', ()=> {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What do you want to name your module?'
    },
    {
      type: 'input',
      name: 'title',
      message: 'module page title?'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Widget version?',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email?'
    },
    {
      type: 'input',
      name: "description",
      message: "module description?",
      default: '模块描述'
    }
  ], (answers)=> {
    answers.createDate = $.util.date(new Date(), 'yyyy.mm.dd');
    answers.name = answers.name.toLowerCase();
    var files = [__dirname + '/generators/*.*'];

    return gulp.src(files)
      .pipe($.template(answers))
      .pipe($.rename((file)=> {
        if (file.extname === '.md') {
          // keep file name
        } else if (file.basename === '_style') {
          file.basename = '_' + answers.name;
        } else {
          file.basename = answers.name;
        }
      }))
      .pipe(gulp.dest('./html/modules/' + answers.name))
      .on('end', ()=> {
        $.util.log($.util.colors.green('Congratulations on your success to create a module =>html/modules/' + answers.name));
      });
  });
});

// 编译 jskit
gulp.task('build:jskit', ()=> {
  gulp.src('html/js/libs/jsKit.js')
    .pipe($.uglify())
    .pipe($.rename('jskit.min.js'))
    .pipe(gulp.dest('dist'))
});

// default
gulp.task('default', ['dev']);


// TODO: 添加 deploy
