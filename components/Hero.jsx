/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative">
      <Head>
        <title>Entrar / Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-[calc(100vh-72px)]">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="absolute flex flex-col items-center justify-center w-full max-w-screen-sm p-8 mx-auto -mt-16 space-y-3 top-1/4">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
          />
          <button className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold py-4 px-6 w-full rounded hover:bg-[#0485ee]">
            Adquira os três
          </button>
          <p className="text-xs text-center ">
            Obtenha acesso ao Hulu, Disney+ e ESPN com 10% de desconto em uma
            única assinatura Disney+ por 1 ano.
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
