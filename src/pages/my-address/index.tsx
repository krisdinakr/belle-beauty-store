import { useMemo, useState } from 'react'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import AddressCard from '@/components/AddressCard'
import Modal from '@/components/Modal'
import FormAddEditAddress from '@/components/FormAddEditAddress'
import AddressCardSkeleton from '@/components/skeleton/AddressCardSkeleton'
import { Button } from '@/components/ui/button'
import { UserApi } from '@/constants'
import { IAddress } from '@/types/Address'

function MyAddress() {
  const { data, isLoading, mutate } = useSWR(UserApi.Address, getRequest)
  const [openModal, setOpenModal] = useState(false)

  const addresses: IAddress[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  }, [data])

  return (
    <section className="min-h-screen w-full overflow-hidden p-5 sm:px-20 sm:py-5">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-sherpa-blue sm:text-3xl">Shipping Address</h2>

        {isLoading && <AddressCardSkeleton />}

        {!isLoading &&
          addresses &&
          addresses.length > 0 &&
          addresses.map((address) => (
            <AddressCard
              address={address}
              key={address._id}
              refreshData={mutate}
            />
          ))}

        {!isLoading && addresses.length === 0 && <div>No shipping address found.</div>}

        <Modal
          trigger={<Button className="w-full rounded bg-sherpa-blue uppercase">ADD ADDRESS</Button>}
          title="ADD NEW ADDRESS"
          open={openModal}
          setOpen={setOpenModal}
        >
          <FormAddEditAddress
            setOpenModal={setOpenModal}
            refreshData={mutate}
            mode="add"
          />
        </Modal>
      </div>
    </section>
  )
}

export default MyAddress
