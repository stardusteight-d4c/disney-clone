/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import Image from 'next/image'
import { PlusIcon, XIcon } from '@heroicons/react/solid'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router';

export const getServerSideProps = async (context) => {
  const { id } = context.query
  
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&append_to_response=videos`
  ).then((response) => response.json())

  return {
    props: {
      result: request,
    },
  }
}

export default function Movie({ result }) {
  const { data: _, status } = useSession()
  const [showPlayer, setShowPlayer] = useState(false)
  const router = useRouter()

  const BASE_URL = 'https://image.tmdb.org/t/p/original/'
  
  useEffect(() => {
    if (status == 'unauthenticated') {
      router.push('/')
    }
  }, [router, status])

  const index = result.videos.results.findIndex(
    (element) => element.type === 'Trailer'
    )
    
    return (
    <>
      <Head>
        <title>{result.title || result.original_title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {status == 'loading' ? (
        <span>Loading...</span>
      ) : (
        <section className="relative z-50 overflow-y-hidden md:overflow-y-visible">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute z-50 p-2 space-y-6 inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              {result.title || result.original_title}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]">
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="font-medium tracking-wide uppercase">
                  Play
                </span>
              </button>

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-gray-500/20"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="font-medium tracking-wide uppercase">
                  Trailer
                </span>
              </button>

              <div className="flex items-center justify-center border-2 border-white rounded-full cursor-pointer w-11 h-11 bg-black/60">
                <PlusIcon className="h-6" />
              </div>
              <div className="flex items-center justify-center border-2 border-white rounded-full cursor-pointer w-11 h-11 bg-black/60">
                <img src="/images/group-icon.svg" />
              </div>
            </div>

            <p className="text-xs md:text-sm">
              {result.release_date || result.first_air_date} •{' '}
              {Math.floor(result.runtime / 60)}h {result.runtime % 60}m •{' '}
              {result.genres.map((genre, index, array) =>
                index + 1 < array.length ? genre.name + ', ' : genre.name
              )}{' '}
            </p>
            <h4 className="max-w-4xl text-base md:text-lg">
              {result.overview}
            </h4>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/80" />

          {/* Background Overlay */}
          {showPlayer && (
            <div className="absolute inset-0 z-50 w-screen h-screen md:-top-[75px] bg-[#040714] opacity-60" />
          )}
          <div
            className={`absolute top-3 md:-top-8 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? 'opacity-100 z-[55]' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Exibindo Trailer</span>
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg opacity-50 cursor-pointer hover:opacity-75 hover:bg-[#0f0f0f]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%] md:pt-[46.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
