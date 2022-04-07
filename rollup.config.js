import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		createWiki(),
		svelte({
			// enable run-time checks when not in production
			compilerOptions: {
				dev: !production,
			},
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: true,
			}),
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({ sourceMap: !production }),

		// In dev mode, call `npm run start` once
		// the bundle has been genera
		!production && serve(),
		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({ watch: 'public' }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

// The function bellow is a generator for the wiki pages it reads from the directory public/data/wiki/ and creates a json descripting the following info:
// - The Document Title
// - The Document URL relative to the current page (e.g. /data/wiki/index.md)
// - The Document Table of Contents 
// We use this information to generate the navigation sidebar for the wiki and to generate the table of contents for the wiki pages.
// The document index.md is the home page of the wiki.
// We use marked to parse the markdown files.
//  and we export the result as a json file at public/data/wiki.json
function createWiki() {
	const fs = require('fs');
	const marked = require('marked');
	const DOMPurify = require("dompurify");
	marked.setOptions({
		gfm: true,
		tables: true,
		breaks: true,
		pedantic: false,
		smartLists: true,
		smartypants: false,
		sanitizer: DOMPurify.sanitize,
	});

	const path = require('path');
	const files = fs.readdirSync(path.join(__dirname, 'public/data/wiki'));
	const wiki = [];
	for (const file of files) {
		const ext = path.extname(file);
		if (ext === '.md') {
			const name = path.basename(file, ext);
			const content = fs.readFileSync(path.join(__dirname, 'public/data/wiki', file), 'utf8');
			const title = name.replace(/[^\w\s]/gi, ' ').replace(/\b\w/g, l => l.toUpperCase());
			var toch1 = marked.parse(content).match(/<h1.*?>(.*?)<\/h1>/g);
			toch1 = toch1 ? toch1.map(x => x.replace(/<h1.*?>/, '').replace(/<\/h1>/, '')) : [];
			var toch2 = marked.parse(content).match(/<h2.*?>(.*?)<\/h2>/g);
			toch2 = toch2 ? toch2.map(x => x.replace(/<h2.*?>/, '').replace(/<\/h2>/, '')) : [];
			var toch3 = marked.parse(content).match(/<h3.*?>(.*?)<\/h3>/g);
			toch3 = toch3 ? toch3.map(x => x.replace(/<h3.*?>/, '').replace(/<\/h3>/, '')) : [];
			var toc = toch1.concat(toch2).concat(toch3);
			const url = `data/wiki/${name}.md`;
			wiki.push({ title, url, toc });
		}
	}
	const home = wiki.find(x => x.url === 'data/wiki/index.md');
	wiki.splice(wiki.indexOf(home), 1);
	wiki.unshift(home);

	fs.writeFileSync(path.join(__dirname, 'public/data/wiki.json'), JSON.stringify(wiki));

}