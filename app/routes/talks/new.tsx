import { css } from 'hono/css'
import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  const formClass = css`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `
  const formGroupClass = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `  
  const labelClass = css`
    font-weight: bold;
  `
  const inputClass = css`
    padding: 8px;
  `
  const buttonClass = css`
    background-color: #C32121;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    padding-block: 8px;
  `

  return c.render(
    <>
      <h2>トーク登録</h2>
      <form method="post" action="/talks" class={formClass}>
        <div class={formGroupClass}>
          <label for="title" class={labelClass}>タイトル</label>
          <input type="text" name="title" id="title" class={inputClass}></input>
        </div>
        <div class={formGroupClass}>
          <label for="speaker" class={labelClass}>スピーカー</label>
          <input type="text" name="speaker" id="speaker" class={inputClass}></input>
        </div>
        <div class={formGroupClass}>
          <label for="description" class={labelClass}>説明</label>
          <textarea name="description" id="description" rows="5" class={inputClass}></textarea>
        </div>
        <div class={formGroupClass}>
          <label for="start_at" class={labelClass}>開始時間</label>
          <input type="datetime-local" name="start_at" id="start_at" class={inputClass}></input>
        </div>
        <div class={formGroupClass}>
          <label for="finish_at" class={labelClass}>終了時間</label>
          <input type="datetime-local" name="finish_at" id="finish_at" class={inputClass}></input>
        </div>
        <div class={formGroupClass}>
          <label for="url" class={labelClass}>URL</label>
          <input type="url" name="url" id="url" class={inputClass}></input>
        </div>
        <button type='submit' class={buttonClass}>登録する</button>            
      </form>    
    </>
  )
})
