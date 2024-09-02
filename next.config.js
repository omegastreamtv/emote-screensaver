/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: IS_PRODUCTION ? 'export' : undefined,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
