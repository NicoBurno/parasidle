const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    plugins: {
        cssnano: isProduction,
        autoprefixer: true
    }
};
