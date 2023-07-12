/* import { sql } from '@vercel/postgres' */
import {
  createServerActionClient,
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/types/supabase'
import { notFound, redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/')
  }

  const { data } = await supabase.from('posts').select('*')

  const addPost = async (formData: FormData) => {
    'use server'
    const supabase = createServerActionClient<Database>({ cookies })
    const title = formData.get('title') as string
    await supabase.from('posts').insert({ title })
    revalidatePath('/')
  }

  return (
    <>
      <form action={addPost}>
        <input name="title" />
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

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

  return (
    <>
      {    {JSON.stringify(rows)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a to-do item"
          required
        />
        <button type="submit">Add</button>
      </form> }
    </>
  )
}
*/
