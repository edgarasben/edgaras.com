export default function PostsPage() {
    return (
        <div className="container max-w-screen-sm space-y-8 pt-32 xs:space-y-16">
            <article className="lg:prose-x prose max-w-none prose-h1:text-center">
                <h1>How to build a website from scratch</h1>
                <time
                    dateTime="2018-07-07"
                    className="block text-center text-fg-neutral-faded"
                >
                    July 7
                </time>
                <div className="pt-16">
                    <h2>This is heading two</h2>
                    <figure>
                        <img
                            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1640&q=80"
                            alt=""
                        />
                        <figcaption>Fig.1asas - Trulli, Puglia, Italy.</figcaption>
                    </figure>
                </div>
            </article>
        </div>
    )
}
