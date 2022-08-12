/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/solid'

const Header = ({ moviePage }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <header className={`${!moviePage && 'sticky'} bg-[#040714] top-0 z-30 flex h-[72px] items-center px-10 md:px-12`}>
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        alt="Logo Disney+"
        className="cursor-pointer"
        onClick={() => router.push('/')}
      />
      {status == 'authenticated' && (
        <div className="items-center hidden ml-10 space-x-6 md:flex">
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span" onClick={() => router.push('/')}>
              Início
            </span>
          </a>
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Procurar</span>
          </a>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">Favoritos</span>
          </a>
          <a className="header-link group">
            <StarIcon className="h-4" />
            <span className="span">Originais</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Filmes</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Séries</span>
          </a>
        </div>
      )}
      {status == 'unauthenticated' ? (
        <button
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Entrar
        </button>
      ) : (
        <img
          src={session?.user?.image}
          alt=""
          className="object-cover w-12 h-12 ml-auto rounded-full cursor-pointer"
          onClick={signOut}
        />
      )}
    </header>
  )
}

export default Header
