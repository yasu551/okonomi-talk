import { Style, css } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  const bodyClass = css`
    margin: 0;
  `
  const headerClass = css`
    background-color: #C32121;
    padding: 16px;
  `
  const h1Class = css`
    color: white;
    margin: 0;
  `
  const mainClass = css`
    max-width: 800px;
    margin: 36px auto;

    @media (max-width: 800px) {
      margin-inline: 24px;
    }
  `

  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>okonomi talk</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <Script src="/app/client.ts" />
        <Style />
      </head>
      <body class={bodyClass}>
        <header class={headerClass}>
          <h1 class={h1Class}>okonomi talk</h1>
        </header>
        <main class={mainClass}>
          {children}
        </main>
      </body>
    </html>
  )
})
