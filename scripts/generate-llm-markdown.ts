// =============================================================================
// llms.txt + markdown twins
// =============================================================================
// Generates agent-facing content into out/ after `next build`:
//   - out/llms.txt                 index of the site for LLMs
//   - out/examples/<slug>.md       markdown twin of each example page
//   - out/installation/<slug>.md   markdown twin of each installation guide
// Deployed with text/plain content-type via the deploy:md script.
// =============================================================================

import fs from 'fs';
import path from 'path';
import { mkdirp } from 'mkdirp';

import { examples } from '../src/data/examples';
import { installGuides } from '../src/data/installs';
import { canonical, pages, site } from '../src/seo';

const OUT_DIR = path.resolve(__dirname, '../out');
const CONTENT_DIR = path.resolve(__dirname, '../content/examples');

// ---------------------------------------------------------------------------
// llms.txt
// ---------------------------------------------------------------------------

const llmsTxt = `# ${site.name}

> ${pages['/'].description}

LaTeX2JS renders LaTeX and PSTricks in the browser: pspicture environments, draggable vectors (userline), draggable variables (uservariable), sliders, and live plots (psplot), with equations typeset by MathJax. Source: https://github.com/Mathapedia/LaTeX2JS

## Installation

${installGuides
	.map((guide) => `- [${guide.title}](${canonical}/installation/${guide.slug}.md): ${pages[`/installation/${guide.slug}`].description}`)
	.join('\n')}

## Examples

${examples
	.map((example) => `- [${example.title}](${canonical}/examples/${example.slug}.md): ${example.description}`)
	.join('\n')}
`;

// ---------------------------------------------------------------------------
// Markdown twins
// ---------------------------------------------------------------------------

function exampleMarkdown(slug: string): string {
	const example = examples.find((e) => e.slug === slug)!;
	const source = fs.readFileSync(path.join(CONTENT_DIR, example.file), 'utf-8').trim();

	return `# ${example.title}

> ${example.description}

Rendered live at ${canonical}/examples/${example.slug}
${example.interactive ? '\nThis diagram is interactive in the browser (mouse/touch).\n' : ''}
## LaTeX source

\`\`\`latex
${source}
\`\`\`
`;
}

function installMarkdown(slug: string): string {
	const guide = installGuides.find((g) => g.slug === slug)!;

	return `# ${guide.title}

> ${pages[`/installation/${guide.slug}`].description}

${guide.steps
	.map((step, index) => {
		const code = step.code ? `\n\n\`\`\`${step.language ?? ''}\n${step.code}\n\`\`\`` : '';
		return `${index + 1}. ${step.text}${code}`;
	})
	.join('\n\n')}
`;
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

fs.writeFileSync(path.join(OUT_DIR, 'llms.txt'), llmsTxt);

mkdirp.sync(path.join(OUT_DIR, 'examples'));
examples.forEach((example) => {
	fs.writeFileSync(path.join(OUT_DIR, 'examples', `${example.slug}.md`), exampleMarkdown(example.slug));
});

mkdirp.sync(path.join(OUT_DIR, 'installation'));
installGuides.forEach((guide) => {
	fs.writeFileSync(path.join(OUT_DIR, 'installation', `${guide.slug}.md`), installMarkdown(guide.slug));
});

console.log(`llms.txt + ${examples.length + installGuides.length} markdown twins written to out/`);
