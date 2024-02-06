import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react'
import MakeupImg from '@/assets/images/makeup.webp'
import SkinCareImg from '@/assets/images/skincare.webp'
import BathBodyImg from '@/assets/images/bathbody.webp'
import FragranceImg from '@/assets/images/fragrance.webp'
import { Link } from 'react-router-dom'

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
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
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
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCategory

const categories: { id: number; title: string; image: string; slug: string }[] = [
  {
    id: 0,
    title: 'makeup',
    image: MakeupImg,
    slug: 'makeup',
  },
  {
    id: 1,
    title: 'skin care',
    image: SkinCareImg,
    slug: 'skin-care',
  },
  {
    id: 2,
    title: 'bath & body',
    image: BathBodyImg,
    slug: 'bath-&-body',
  },
  {
    id: 3,
    title: 'fragrance',
    image: FragranceImg,
    slug: 'fragrance',
  },
]
