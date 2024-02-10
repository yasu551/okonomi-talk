import { css, cx } from "hono/css"
import { useState } from 'hono/jsx'

type Talk = {
  title: string
  speaker: string
  description: string
  place: string
  start_at: string
  finish_at: string
  url: string
}

export default function Card(talk: Talk) {
  const cardClass = css`
    border: 1px solid #C32121;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `
  const cardHeaderClass = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      font-weight: bold;
      color: #C32121;
      text-decoration: none;
    }
  `
  const bookmarkClass = css`
    background-color: transparent;
    border: none;
    border-radius: 16px;
    padding-top: 4px;

    :hover {
      opacity: 0.5;
    }
  `
  const checkedClass = css`
    background-color: yellow;
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
  const [checked, setChecked] = useState(false)
  return (
    <div class={cardClass}>
      <div class={cardHeaderClass}>
        <a href={talk['url'] ? talk['url'] : '#'}>
          {talk['title']}
        </a>
        <button onClick={() => setChecked(!checked)} class={cx(bookmarkClass, checked ? checkedClass : '')}>
          <span class="material-symbols-outlined">
            bookmark
          </span>
        </button>
      </div>
      <div class={cardBodyClass}>
        <div class={whoWhereClass}>
          <span>スピーカー: {talk['speaker']}</span>
          <span>場所: {talk['place']}</span>
        </div>
        <div>
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

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
