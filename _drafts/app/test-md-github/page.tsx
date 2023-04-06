async function getPost() {
  const res = await fetch(
    'https://api.github.com/repos/edgarasben/edgaras-notes/contents/testnote.md',
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization:
          'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return res.json()
}

async function getPosts() {
  const res = await fetch(
    'https://api.github.com/repos/edgarasben/edgaras-notes/contents',
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization:
          'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return res.json()
}

async function getTree() {
  const res = await fetch(
    'https://api.github.com/repos/edgarasben/edgaras-notes/git/trees',
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization:
          'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return res.json()
}

export default async function TestMdGithub() {
  /*     const { content: blob } = await getPost() */
  /*     const markdown = Buffer.from(blob, 'base64') */
  /*     const data = await getPosts() */
  const data = await getTree()
}
