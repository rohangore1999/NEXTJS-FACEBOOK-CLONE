import { getSession } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { db } from '../firebase'

export default function Home({ session, posts }) {
  // if no session return login component
  if (!session) return <Login />


  return (
    <div className=''>
      <Head>
        <title>Facebook - Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

        {/* for post picture */}
        <meta property="og:title" content="" />
        <meta property="og:type" content="" />
        <meta property="og:image" content="/facebook_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:description" content="" />
        <meta name="twitter:image:alt" content="" />
      </Head>

      {/* headers */}
      <Header />

      <main className='flex'>
        {/* sidebar */}
        <Sidebar />


        {/* feed */}
        <Feed posts={posts} />

        {/* widgets */}
        <Widgets />

      </main>

    </div>
  )
}


// SERVER SIDE RENDERING

export async function getServerSideProps(context) {
  // get the user
  // getSession(context) >> getSession() only request context in this function; getSession() is use because this function treated as nodejs 
  // context is the request when the user tries to go through our website
  const session = await getSession(context)

  // prefetch the post
  const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();

  // transform from firebase format to required
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null //not fetching timestamp as we cant on server
  }))

  return {
    props: {
      session,
      posts:docs
    }
  }


}