import { memo, useMemo, useState } from 'react'

import { IImage } from '@/types/Products'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface IImageSelector extends IImage {
  index?: number
}

const ProductImageSlider = memo(function ProductImageSlider({
  images,
}: {
  images: IImageSelector[]
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const chunks: Array<IImageSelector[]> = useMemo(() => {
    if (images && Array.isArray(images)) {
      const updatedImg = images.map((i, index) => ({ ...i, index }))
      const result = []
      const chunkSize = 4
      for (let i = 0; i < updatedImg.length; i += chunkSize) {
        const chunk = updatedImg.slice(i, i + chunkSize)
        result.push(chunk)
      }
      return result
    }
    return []
  }, [images])

  return (
    <div className="relative h-auto w-full lg:w-[400px]">
      <div className="h-auto min-h-[400px] w-full">
        <picture>
          <source type="image/webp" />
          <img
            src={images[selectedIndex].url}
            className="aspect-square h-[400px] w-auto object-contain object-center"
            loading="lazy"
            decoding="async"
            alt="Builder.io drag and drop interface"
          />
        </picture>
      </div>
      <div className="relative mt-4 px-3">
        <Carousel orientation="horizontal">
          <CarouselContent className="px-5.5">
            {chunks.map((chunk, index) => (
              <CarouselItem key={index}>
                <div className="flex h-full w-full items-center justify-center gap-3">
                  {chunk.map((item) => (
                    <div
                      className="h-16 w-16"
                      key={item.index}
                    >
                      <img
                        src={item.url}
                        loading="lazy"
                        decoding="async"
                        className="cursor-pointer"
                        onClick={() => setSelectedIndex(item.index!)}
                      />
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0.5 text-black-pearl" />
          <CarouselNext className="right-0.5 text-black-pearl" />
        </Carousel>
      </div>
    </div>
  )
})

export default ProductImageSlider
