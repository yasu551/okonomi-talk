import { css } from "hono/css"

export type Talk = {
  title: string
  speaker: string
  description: string
  place: string
  start_at: string
  finish_at: string
  url: string
}

export function Card(talk: Talk) {
  const cardClass = css`
    border: 1px solid #C32121;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `
  const cardHeaderClass = css`
    a {
      font-weight: bold;
      color: #C32121;
      text-decoration: none;
    }
  `
  const cardBodyClass = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `
  const whoWhereClass = css`
    display: flex;
    gap: 16px;
  `
  const termClass = css`
    
  `
  return (
    <div class={cardClass}>
      <div class={cardHeaderClass}>
        <a href={talk['url'] ? talk['url'] : '#'}>
          {talk['title']}
        </a>      
      </div>
      <div class={cardBodyClass}>
        <div class={whoWhereClass}>
          <span>スピーカー: {talk['speaker']}</span>
          <span>場所: {talk['place']}</span>
        </div>
        <div class={termClass}>
          時間帯: {formatDateTime(talk['start_at'])} 〜 {formatDateTime(talk['finish_at'])}
        </div>
      </div>    
    </div>
  )
}

function formatDateTime(dateTimeIso: string): string {
  const date = new Date(dateTimeIso);

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // ゼロ埋め
  const day = date.getDate().toString().padStart(2, '0'); // ゼロ埋め
  const hours = date.getHours().toString().padStart(2, '0'); // ゼロ埋め
  const minutes = date.getMinutes().toString().padStart(2, '0'); // ゼロ埋め

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
