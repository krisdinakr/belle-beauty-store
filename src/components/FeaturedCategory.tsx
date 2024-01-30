import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react'
import MakeupImg from '@/assets/images/makeup.jpg'
import SkinCareImg from '@/assets/images/skincare.jpg'
import BathBodyImg from '@/assets/images/bathbody.jpg'
import FragranceImg from '@/assets/images/fragrance.jpg'

function FeaturedCategory() {
  return (
    <section className="h-auto w-full space-y-8 p-5 lg:px-20 lg:py-[70px]">
      <h2 className="text-2xl font-bold text-sherpa-blue sm:text-3xl">Featured Categories</h2>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-[auto_1fr_1fr_1fr_1fr]">
        <div className="hidden md:flex">
          <ChevronRightIcon className="h-3" />
          <ChevronRightIcon className="h-3" />
        </div>
        {categories.map((category) => (
          <a
            href="/#"
            key={category.id}
          >
            <div className="h-44 w-full md:h-80">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full rounded object-cover object-bottom"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold capitalize text-sherpa-blue">
              <span className="font-normal">// </span>
              {category.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCategory

const categories: { id: number; title: string; image: string }[] = [
  {
    id: 0,
    title: 'makeup',
    image: MakeupImg,
  },
  {
    id: 1,
    title: 'skin care',
    image: SkinCareImg,
  },
  {
    id: 2,
    title: 'bath & body',
    image: BathBodyImg,
  },
  {
    id: 3,
    title: 'fragrance',
    image: FragranceImg,
  },
]
