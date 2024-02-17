import { Dispatch } from 'react'
import { KeyedMutator } from 'swr'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { addressService } from '@/services/addressService'
import { IAddress, IAddressPayload } from '@/types/Address'

const formSchema = z.object({
  city: z.string().min(1, { message: 'City required' }),
  country: z.string().min(1, { message: 'Country required' }),
  district: z.string().min(1, { message: 'District required' }),
  name: z.string().min(1, { message: 'Label address required' }),
  isDefault: z.boolean(),
  phone: z.string().min(8),
  postalCode: z.string().min(6),
  province: z.string().min(1, { message: 'Province required' }),
  street: z.string().min(1, { message: 'Street required' }),
  recipientName: z.string().min(1, { message: 'Recipient Name required' }),
})

function FormAddEditAddress({
  setOpenModal,
  refreshData,
  mode,
  data,
}: {
  setOpenModal: Dispatch<boolean>
  refreshData: KeyedMutator<undefined>
  mode: 'add' | 'update'
  data?: IAddress
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: data?.city || '',
      country: data?.country || '',
      district: data?.district || '',
      name: data?.name || '',
      isDefault: data?.isDefault || false,
      phone: data?.phone || '',
      postalCode: data?.postalCode || '',
      province: data?.province || '',
      street: data?.street || '',
      recipientName: data?.recipientName || '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload: IAddressPayload = {
      action: mode,
      isDeleted: false,
      ...values,
    }
    if (mode === 'update') {
      payload.id = data?._id
    }

    const res = await addressService.updateAddress(payload)
    if (!res.error) {
      setOpenModal(false)
      refreshData()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Label Address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-2.5">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Recipient Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="5 flex w-full gap-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Country"
                    disabled={mode === 'update'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Province"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="5 flex w-full gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="City"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input
                    placeholder="District"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Street"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Postal Code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    name="isDefault"
                    id="isDefault"
                    className="h-4 w-4 cursor-pointer"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                  <label
                    htmlFor="isDefault"
                    className="cursor-pointer text-sm"
                  >
                    Set as default address
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-2.5">
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full rounded border border-sherpa-blue bg-white text-xs uppercase text-black-pearl hover:bg-twilight-blue/50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="w-full rounded bg-sherpa-blue uppercase"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormAddEditAddress
