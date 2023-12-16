import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (basic-lang-javascript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js  WebNextron vs Next.js. Package Manager. npm, yarn and pnpm are supported. My Belief for Nextron. Show a way of developing desktop apps with only web knowledge. Easy to use.⚡ -
          <Link href="/home">
            <a>Go to home page</a>
          </Link>
        </p>
      </div>
    </React.Fragment>
  )
}
