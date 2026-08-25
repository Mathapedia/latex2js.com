/**
 * Examples registry tests
 *
 * The examples registry drives routes, JSON-LD entities, and llms.txt —
 * every entry must point at a real .tex file and have a unique slug.
 */

import fs from 'fs';
import path from 'path';

import { examples } from '@/data/examples';

const CONTENT_DIR = path.resolve(__dirname, '../../content/examples');

describe('Examples registry', () => {
	it('every example points to an existing .tex file', () => {
		examples.forEach((example) => {
			expect(fs.existsSync(path.join(CONTENT_DIR, example.file))).toBe(true);
		});
	});

	it('every .tex file is registered exactly once', () => {
		const texFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.tex'));
		const registered = examples.map((e) => e.file).sort();
		expect(registered).toEqual(texFiles.sort());
	});

	it('slugs are unique', () => {
		const slugs = examples.map((e) => e.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});
