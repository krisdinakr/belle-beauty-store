import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import HeroOne from '@/assets/images/hero-1.png'
import HeroTwo from '@/assets/images/hero-2.png'
import HeroThree from '@/assets/images/hero-3.png'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="h-64 w-full sm:h-[600px]">
      <div className="relative h-full w-full">
        <Carousel
          orientation="horizontal"
          className="h-full w-full"
        >
          <CarouselContent className="h-full w-full">
            {heroItems.map((i) => (
              <CarouselItem key={i.id}>
                <div
                  className={clsx(
                    'flex h-64 w-screen items-center sm:h-[600px]',
                    i.imagePosition === 'right' ? 'flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={clsx(
                      'flex h-full w-6/12 flex-col justify-center gap-1 px-5 sm:gap-5 sm:px-20',
                      i.bgColor
                    )}
                  >
                    <h3 className="text-sm font-bold uppercase sm:text-2xl">{i.title}</h3>
                    <p className="font-open-sans capitalize sm:text-4xl">{i.desc}</p>
                    <button className="w-fit rounded bg-white px-2.5 py-1.5  text-xs font-semibold uppercase text-black-pearl sm:px-4 sm:text-xl">
                      <Link to={i.link}>SHOP NOW</Link>
                    </button>
                  </div>
                  <div className="h-full w-6/12 sm:w-8/12 lg:w-9/12">
                    <img
                      src={i.image}
                      alt={i.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0.5 border-none bg-transparent text-black-pearl shadow-none sm:left-6" />
          <CarouselNext className="right-0.5 border-none bg-transparent text-black-pearl shadow-none sm:right-6" />
        </Carousel>
      </div>
    </section>
  )
}

export default Hero

const heroItems = [
  {
    id: 0,
    title: 'great ingredients',
    desc: 'the synergy of propolis & hone for nourished and plump skin',
    link: '#',
    image: HeroOne,
    imagePosition: 'left',
    bgColor:
      'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-zinc-500 via-yellow-200 to-gray-100',
  },
  {
    id: 2,
    title: 'new products',
    desc: 'acne scars solutions from the hottest brand',
    link: '#',
    image: HeroTwo,
    imagePosition: 'right',
    bgColor:
      'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-300 via-violet-200 to-violet-300',
  },
  {
    id: 3,
    title: 'everyone favorite',
    desc: 'The icon. The cult classic. The beauty editor favorite.',
    link: '#',
    image: HeroThree,
    imagePosition: 'left',
    bgColor: 'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200',
  },
]
