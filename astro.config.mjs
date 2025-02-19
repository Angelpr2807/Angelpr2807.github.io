import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// headers link markdown
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import sectionize from '@hbsnow/rehype-sectionize';
import { remarkAlert } from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
    site: 'https://angelpr2807.github.io',
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkAlert],
        rehypePlugins: [
            rehypeSlug,
            sectionize,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'wrap',
                    content: {
                        type: 'text',
                        value: '',
                    },
                    headingProperties: {
                        className: ['anchor'],
                    },
                    properties: {
                        className: ['anchor-link'],
                    },
                },
            ],
        ],
        shikiConfig: {
            theme: 'material-theme-palenight',
        },
    },
});
