import Hero from '@/components/Hero'
import FeaturedCategorySection from '@/components/FeaturedCategorySection'
import NewProductsSection from '@/components/NewProductsSection'

function Home() {
  return (
    <div>
      <Hero />
      <NewProductsSection />
      <FeaturedCategorySection />
    </div>
  )
}

export default Home
