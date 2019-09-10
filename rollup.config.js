import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';
import clear from 'rollup-plugin-clear';
import autoprefixer from 'autoprefixer';

const extensions = ['.ts'];

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'umd',
        name: 'Carousel',
        sourcemap: true,
    },
    plugins: [
        clear({ targets: ['dist'] }),
        resolve({ extensions }),
        babel({ extensions }),
        postcss({ modules: { generateScopedName: '[local]___[hash:base64:5]' }, plugins: [autoprefixer()] }),
        uglify(),
    ],
};
