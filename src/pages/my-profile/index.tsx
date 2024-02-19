/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format, getTime } from 'date-fns'

import { CalendarIcon, UserCircle2Icon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import UploadWidget from '@/components/UploadWidget'
import { cn } from '@/utils'
import { useToast } from '@/hooks/useToast'
import { UserApi } from '@/constants'
import { getRequest } from '@/services/baseService'
import { userService } from '@/services'
import { IUser } from '@/types/User'

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, { message: 'First name required' }),
  lastName: z.string().min(1, { message: 'Last name required' }),
  photo: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.date(),
})

function ProfileForm({
  profileData,
  onSubmit,
}: {
  profileData: IUser
  onSubmit: (values: z.infer<typeof formSchema>) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profileData?.email || '',
      firstName: profileData?.firstName || '',
      lastName: profileData?.lastName || '',
      photo: profileData?.photo || '',
      phoneNumber: profileData?.phoneNumber || '',
      dateOfBirth: profileData?.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'P')
                      ) : (
                        <span className="text-slate-500">Pick a Date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="w-60 rounded bg-sherpa-blue uppercase"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

function MyProfile() {
  const { data, isLoading, mutate } = useSWR(UserApi.Profile, getRequest)

  const profileData: IUser = useMemo(() => {
    if (!data?.error && data?.data) {
      return data.data
    }
    return null
  }, [data])

  const handleOnUpload = (error: any, result: { event: string; info: any }, widget: any) => {
    if (error) {
      useToast.error({ description: error })
      widget.close({
        quiet: true,
      })
      return
    }
    const payload = {
      email: profileData.email,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      photo: result?.info?.secure_url,
      phoneNumber: profileData?.phoneNumber,
      dateOfBirth: new Date(profileData?.dateOfBirth),
    }
    onSubmit(payload)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      dateOfBirth: getTime(values.dateOfBirth),
    }
    const res = await userService.updateProfile(payload)
    if (!res.error) mutate()
  }

  return (
    <section>
      <h2 className="text-center text-xl font-semibold text-sherpa-blue">Edit Profile</h2>
      <div className="mt-2.5 flex w-full flex-col items-center justify-center border-b py-6">
        <div className="h-16 w-16">
          {isLoading && <Skeleton className="h-full w-full rounded-full" />}
          {!isLoading && profileData?.photo && (
            <img
              src={profileData.photo}
              alt="user"
              className="h-full w-full rounded-full object-cover object-center"
              loading="lazy"
            />
          )}
          {!isLoading && !profileData?.photo && <UserCircle2Icon className="h-full w-full" />}
        </div>
        <UploadWidget
          onUpload={handleOnUpload}
          maxFiles={1}
        >
          {({ open }) => {
            function handleOnClick(e: SyntheticEvent) {
              e.preventDefault()
              open()
            }
            return (
              <button
                onClick={handleOnClick}
                className="mt-2 text-xs font-medium"
              >
                Change Photo
              </button>
            )
          }}
        </UploadWidget>
      </div>

      {isLoading && <Skeleton className="mt-5 h-[550px] w-full" />}
      {!isLoading && (
        <ProfileForm
          profileData={profileData}
          onSubmit={onSubmit}
        />
      )}
    </section>
  )
}

export default MyProfile
