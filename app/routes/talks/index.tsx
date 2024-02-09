import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { css } from 'hono/css';

interface Env {
  DB: D1Database;
}

const datetimeLocalSchema = z.string().refine((data) => {
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  return pattern.test(data);
}, {
  message: 'Invalid datetime format, expected YYYY-MM-DDTHH:mm',
});

const schema = z.object({
  title: z.string().min(1),
  speaker: z.string().min(1),
  description: z.string().min(1),
  start_at: z.string().min(1) && datetimeLocalSchema,
  finish_at: z.string().min(1) && datetimeLocalSchema,
  url: z.string(),
})

export default createRoute(async (c) => {
  const tableClass = css`
    border: 1px solid black;
    border-collapse: collapse;

    th, td {
      border: 1px solid black;
      border-collapse: collapse;      
    }
  `
  const { results } = await c.env.DB.prepare("SELECT * FROM talks").all()
  const items = results.map(result =>
    <tr>
      <td>{result['id']}</td>
      <td>{result['title']}</td>
      <td>{result['speaker']}</td>
      <td>{result['description']}</td>
      <td>{result['start_at']}</td>
      <td>{result['finish_at']}</td>
      <td>{result['url']}</td>
    </tr>
  )
  return c.render(
    <>
      <h2>トーク一覧</h2>
      <table class={tableClass}>
        <thead>
          <tr>
            <th style="width: 10%;">ID</th>
            <th style="width: 25%;">タイトル</th>
            <th style="width: 10%;">スピーカー</th>
            <th style="width: 25%;">説明</th>
            <th style="width: 10%;">開始時間</th>
            <th style="width: 10%;">終了時間</th>
            <th style="width: 10%;">URL</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    </>
  )
})

export const POST = createRoute(zValidator('form', schema), async (c) => {
  const { title, speaker, description, start_at, finish_at, url } = c.req.valid('form')
  console.log(title, speaker, description, start_at, finish_at, url)
  const { results } = await c.env.DB.prepare("INSERT INTO talks (title, speaker, description, start_at, finish_at, url) VALUES (?, ?, ?, ?, ?, ?) RETURNING *")
    .bind(title, speaker, description, start_at, finish_at, url)
    .run()
  const record = results.length ? results[0] : null
  if (record) {
    return c.redirect('/talks')
	} else {
    return c.text("Failed to create note", 500);
  }
})