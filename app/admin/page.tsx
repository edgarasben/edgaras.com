import { sql } from '@vercel/postgres'

export default async function Cart({
  params
}: {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from carts WHERE user_id='1'`

  return (
    <>
      {JSON.stringify(rows)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a to-do item"
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  )
}
