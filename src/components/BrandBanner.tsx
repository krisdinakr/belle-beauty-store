import { IBrand } from '@/types/Brand'

function BrandBanner({ data }: { data: IBrand }) {
  return (
    <div className="relative h-auto w-full sm:h-[400px]">
      <div className="flex h-full w-full flex-col items-center gap-3 sm:flex-row-reverse">
        <div className="h-full w-full sm:w-6/12">
          <img
            src={data.logo}
            alt={data.name}
            loading="lazy"
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div className="flex w-full flex-col sm:w-6/12 sm:gap-2.5">
          <h3 className="font-open-sans text-2xl font-medium text-sherpa-blue sm:text-3xl md:text-7xl">
            {data.name}
          </h3>
          <p className="text-justify font-open-sans sm:text-left sm:text-sm">{data.description}</p>
        </div>
      </div>
    </div>
  )
}

export default BrandBanner
