/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'

import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/solid'
import { signIn } from 'next-auth/react'

const Header = ({ providers }) => {
  return (
    <div className="sticky bg-[#040714] top-0 z-50 flex h-[72px] items-center px-10 md:px-12">
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        alt="Logo Disney+"
        className="cursor-pointer"
      />
      <div className="items-center ml-10 space-x-6 md:flex">
        <a className="header-link group">
          <HomeIcon className="h-4" />
          <span className="span">Início</span>
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
      <button
        className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
        onClick={() =>  signIn('google', { callbackUrl: '/' })}
      >
        Entrar
      </button>
    </div>
  )
}

export default Header
