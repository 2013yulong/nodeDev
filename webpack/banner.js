// banner.js
// ========================================
require('babel-core/register');

import moment from 'moment';
import pkg from '../package.json';

let now = moment().format('YYYYMMDDHHMMSS'); // 文件时间戳
let time = moment().format('YYYY-MM-DD HH:MM:SS');
let year = moment().format('YYYY');

// 生产文件的 banner 信息
const cssBanner = `/** ${pkg.name} v: ${pkg.version} | * Copyright © ${year} Sohu.com, Inc. All Rights Reserved | * Date - ${time} */
`;

const jsBanner = `${pkg.name} v: ${pkg.version} | Copyright © ${year} Sohu.com, Inc. All Rights Reserved | Date - ${time} `;

export default {
  now,
  cssBanner,
  jsBanner
};
