# Disney Clone | Multiple Requests & NextAuth.js

![banner](banner.png)

> Reconstruction of the Disney Plus interface with carousel and sliders, where data is fetched through `multiple requests` on the server side with `getServerSideProps`, so we have a page generated via `Server Side Rendering`. NextAuth was also used for the user to be able to authenticate and enter the application, in which the account data is sent to Firebase through its adapter for NextAuth. The core of the project was taught on the <strong>ILW Yennefer</strong> channel.

:arrow_right: Authentication and Firestore Adapter <br />
:arrow_right: Multiple Requests in Server Side Rendering <br />
:arrow_right: Dynamic Routes <br />
<br />

## Authentication and Firestore Adapter 

NextAuth.js is a complete `open-source` authentication solution for Next.js applications.

### NextAuth - Easy, Flexible & Secure

NextAuth offers built-in support for many popular login services, supports email/passwordless/magic link authentication, provides `security` on web pages and API routes, and `does not rely on client-side JavaScript`.

### Add API route

- `npm install next-auth`

To add NextAuth.js to a project create a file called `[...nextauth].js` in `pages/api/auth`. This contains the `dynamic route handler` for NextAuth.js which will also contain all of your global NextAuth.js configurations.

```jsx
// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
   GoogleProvider({
	   clientId: process.env.GOOGLE_CLIENT_ID,
	   clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
})
```

All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.

### Configure Shared session state

To be able to use useSession first you'll need to expose the session context, `<SessionProvider />`, at the `top level` of your application:

```jsx
// pages/_app.jsx

import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

### Firestore Adapter 

An `Adapter` in NextAuth.js `connects your application` to whatever database or backend system you want to use to store data for users, their accounts, sessions, etc. `Adapters are optional`, unless you need to persist user information in your own database, or you want to implement certain flows. The Email Provider requires an adapter to be able to save Verification Tokens.

### Firebase 

This is the Firebase (Firestore) Adapter for next-auth. This package can only be used in conjunction with the primary next-auth package. It `is not a standalone` package.

 - `npm install next-auth @next-auth/firebase-adapter`
 
Add this adapter to your `pages/api/auth/[...nextauth].js` next-auth configuration object.

```jsx
// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  adapter: FirestoreAdapter({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
    appId: process.env.NEXT_PUBLIC_FIREBASE_ID,
  }),
})

```

When initializing the firestore adapter, you must pass the `firebase configuration object` with your project details:

```jsx
// firebase.js 

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-8GSGZQ44ST",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()

export { app, db }
```

*<i>next-auth.js.org/getting-started/example</i>
