export default [
	{
		'@type': 'Thesis',
		'@id': 'thesis:danlynch-digital-publishing',
		name: 'The Art of Digital Publishing: A foundation of combined standards to support the future of publishing',
		description:
			`Dan Lynch's UC Berkeley EECS master's thesis proposing a synthesis of TeX and HTML5 standards to support the future of digital publishing.`,
		author: { '@id': 'person:danlynch' },
		contributor: [{ '@id': 'person:babak-ayazifar' }],
		datePublished: '2012-12-18',
		identifier: 'UCB/EECS-2012-268',
		publisher: 'EECS Department, University of California, Berkeley',
		url: 'https://www2.eecs.berkeley.edu/Pubs/TechRpts/2012/EECS-2012-268.html',
		sameAs: [
			'https://www2.eecs.berkeley.edu/Pubs/TechRpts/2012/EECS-2012-268.html',
			'https://www2.eecs.berkeley.edu/Pubs/TechRpts/2012/Archive/EECS-2012-268.pdf',
		],
		abstract:
			`Scientific content increasingly relies on the presentation and authoring of complex multimedia diagrams and figures, sometimes interactive, to convey information in a non-textual way. Wikis and user-generated hyper-linked content have both been very successful in the case for text—this is what we aim to do for mathematical diagrams. Many professors in higher education who write textbooks know TeX, however, they don't often know how to program the Web. The future of building interactive user interfaces should lie not in the hands of programmers, but in the hands of the expert of a given field—the goal of this project is to supply math, physics, and engineering professors with a platform to express mathematical concepts to students to provide immersive learning environments. Ideally, this projects serves twofold: First, in closing the gap for non-web-technical authors to express ideas and concepts through Web technology without the knowledge of coding or user interface design, by mapping a typesetting language to interactive programming. Second, in providing deep, educational experiences for our youth to engage more in the sciences, and begin to use exploration and creativity in learning through interactive textbooks. The loose structure and nature of user interface design poses a problem for documenting science and related interfaces in a consistent manner. TeX provides us with some "laws" to obey in order to design the output of a text and graphical language around. Hence, we can attempt to create a synthesis of a structured user interface specification (TeX) and a structured functional specification (HTML5) to provide a publishing platform for the current and next generation. The Art is where we can blend these two standards bodies; higher levels of abstraction allow people to express their ideas without having to worry about the mechanisms by which the technology is rendering their works. It is in these environments when people can express themselves freely.`,
		keywords: ['latex', 'html5', 'digital publishing', 'tex', 'interactive textbooks', 'education'],
	},
];
