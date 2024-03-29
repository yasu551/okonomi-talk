import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Card from '../islands/card'

interface Env {
  DB: D1Database;
}

type Talk = {
  title: string
  speaker: string
  description: string
  place: string
  start_at: string
  finish_at: string
  url: string
}

export default createRoute(async (c) => {
  const cardListClass = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `
  const { results } = await c.env.DB.prepare("SELECT * FROM talks ORDER BY start_at").all()
  const items = results.map(result => {
    const talk: Talk = { title: result['title'] as string,
                         speaker: result['speaker'] as string,
                         description: result['description'] as string,
                         place: result['place'] as string,
                         start_at: result['start_at'] as string,
                         finish_at: result['finish_at'] as string,
                         url: result['url'] as string
                        }
    return <Card {...talk} />
  })
  return c.render(
    <>
      <div class={cardListClass}>
        {items}
      </div>
    </>
  )
})

