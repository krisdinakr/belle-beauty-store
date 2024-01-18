import ChevronRightIcon from '@/lib/assets/icons/chevron-right.svg?react'
import MakeupImg from '@/lib/assets/images/makeup.jpg'
import SkinCareImg from '@/lib/assets/images/skincare.jpg'
import BathBodyImg from '@/lib/assets/images/bathbody.jpg'
import FragranceImg from '@/lib/assets/images/fragrance.jpg'

function FeaturedCategory() {
  return (
    <section className="h-auto w-full space-y-8 p-5 lg:px-20 lg:py-[70px]">
      <h2 className="text-sherpa-blue text-3xl font-bold">Featured Categories</h2>
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
            <h3 className="text-sherpa-blue text-lg font-semibold capitalize">
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
