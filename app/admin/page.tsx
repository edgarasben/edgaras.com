/* import { sql } from '@vercel/postgres' */

export default async function Cart({
  params
}: {
  params: { user: string }
}): Promise<JSX.Element> {
  /*   const [text, setText] = useState('');
  const { rows } = await sql`SELECT * from carts WHERE user_id='1'`

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      setText('');
    }
  };
 */
  return (
    <>
      {/*     {JSON.stringify(rows)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a to-do item"
          required
        />
        <button type="submit">Add</button>
      </form> */}
    </>
  )
}
