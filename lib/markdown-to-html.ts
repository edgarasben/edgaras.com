import { unified } from 'unified'
import markdown from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'

export async function markdownToHtml(markdownString: string) {
  /*   const highlighter = await getHighlighter({
    theme: moonlight2,
    langs: ['javascript', 'html', 'css', 'json', 'typescript']
  }) */

  const result = await unified()
    .use(markdown)
    .use(remarkRehype)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    .process(markdownString)

  const htmlString = result.toString()

  return htmlString
}
