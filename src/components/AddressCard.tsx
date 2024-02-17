import { useState } from 'react'
import { KeyedMutator, mutate } from 'swr'
import { EditIcon, Trash2Icon } from 'lucide-react'
import Modal from './Modal'
import FormAddEditAddress from './FormAddEditAddress'
import { Button } from '@/components/ui/button'
import { addressService } from '@/services/addressService'
import { IAddress } from '@/types/Address'

function AddressCard({
  address,
  refreshData,
}: {
  address: IAddress
  refreshData: KeyedMutator<undefined>
}) {
  const [openModal, setOpenModal] = useState(false)

  const handleSetDefault = async (id: string) => {
    await addressService.setDefault({ action: 'update', id, isDefault: true })
    refreshData()
  }

  const handleDeleteAddress = async (id: string) => {
    await addressService.deleteAddress({ action: 'delete', id, isDeleted: true })
    refreshData()
  }

  return (
    <div className="flex w-full flex-col justify-between lg:flex-row">
      <p className="w-32 text-wrap font-medium">{address.name}</p>
      <div className="w-8/12">
        <p className="text-lg font-semibold">
          {address.recipientName}{' '}
          {address.isDefault && (
            <span className="text-base font-normal text-sherpa-blue">(Default Address)</span>
          )}
        </p>
        <div>
          <p>
            {address.street}, {address.district} {address.city}, {address.province},{' '}
            {address.postalCode}
          </p>
          <p>{address.phone}</p>
        </div>
        <div className="mt-2.5 flex gap-5 text-sm text-gray-400">
          <Modal
            trigger={
              <button className="flex items-center gap-2.5">
                <EditIcon className="h-5" /> Edit
              </button>
            }
            title="UPDATE NEW ADDRESS"
            open={openModal}
            setOpen={setOpenModal}
          >
            <FormAddEditAddress
              setOpenModal={setOpenModal}
              refreshData={mutate}
              mode="update"
              data={address}
            />
          </Modal>

          <button
            className="flex items-center gap-2.5"
            onClick={() => handleDeleteAddress(address._id)}
          >
            <Trash2Icon className="h-5" /> Delete
          </button>
        </div>
      </div>
      <Button
        className="mt-4 rounded border border-sherpa-blue bg-white text-xs uppercase text-black-pearl hover:bg-twilight-blue/50 lg:mt-0"
        onClick={() => handleSetDefault(address._id)}
      >
        SET AS DEFAULT
      </Button>
    </div>
  )
}

export default AddressCard
