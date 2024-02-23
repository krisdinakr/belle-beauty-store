import { CheckCircle2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

function Checkout() {
  return (
    <section className="relative h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-8">
        <CheckCircle2Icon className="h-24 w-24 text-green-500" />
        <h2 className="text-2xl font-semibold tracking-wide">Order Completed Successfully!</h2>
        <Link
          to="/"
          className="font-medium text-sherpa-blue underline"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default Checkout
