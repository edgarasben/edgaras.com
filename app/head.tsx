import Script from 'next/script'

const themeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Head() {
    return (
        <>
            <title>Edgaras - Co-Founder, Designer, Coder</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
            <meta
                name="description"
                content="I design and code things for the web. Get updates on what I learn and build by joining my mailing list."
            />
            <meta
                property="og:title"
                content="Edgaras - Co-Founder, Designer, Coder"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://edgaras.com" />
            <meta property="og:image" content="" />
            {/* TODO: add OG*/}
            <meta
                name="twitter:title"
                content="Edgaras - Co-Founder, Designer, Coder"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://edgaras.com" />
            <meta name="twitter:image" content="" />
            {/* TODO: add OG*/}
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest"></link>
            <link rel="icon" href="/favicon.ico" />
            <Script
                id="theme-script"
                dangerouslySetInnerHTML={{ __html: themeScript }}
            ></Script>
            <Script
                defer
                id="plausible"
                data-domain="edgaras.com"
                src="https://plausible.io/js/script.js"
            ></Script>
        </>
    )
}
