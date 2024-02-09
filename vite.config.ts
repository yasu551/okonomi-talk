import pages from '@hono/vite-cloudflare-pages'
import { getEnv } from '@hono/vite-dev-server/cloudflare-pages'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [client()]
    }
  } else {
    return {
      plugins: [
        honox({
          devServer: {
            entry: 'app/server.ts',
            env: getEnv({
              d1Databases: ['DB'],
              d1Persist: true,              
            })
          }
        }),
        pages()
      ],
    }
  }
})

