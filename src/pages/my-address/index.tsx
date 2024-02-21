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
    <section className="rounded bg-white p-4 shadow">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sherpa-blue">Shipping Address</h2>

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
