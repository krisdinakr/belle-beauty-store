import Hero from '@/components/Hero'
import FeaturedCategory from '@/components/FeaturedCategory'
import NewProductsSection from '@/components/NewProductsSection'

function Home() {
  return (
    <div>
      <Hero />
      <NewProductsSection />
      <FeaturedCategory />
    </div>
  )
}

export default Home
