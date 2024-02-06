import { Link, useNavigate } from 'react-router-dom'
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
import bgImg from '@/assets/images/login-background.webp'
import { authService } from '@/services'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  firstName: z.string().min(1, { message: 'First name required' }),
  lastName: z.string().min(1, { message: 'Last name required' }),
})

function SignUpForm() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      lastName: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await authService.signUp(values)
    if (res) {
      navigate('/sign-in')
    }
  }

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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
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
        </div>
        <button
          type="submit"
          className="w-full rounded bg-sherpa-blue py-3 text-sm font-semibold uppercase text-white"
        >
          create account
        </button>
      </form>
    </Form>
  )
}

function SignUp() {
  return (
    <section className="flex h-auto w-full md:h-[725px]">
      <div className="flex h-full min-h-[50vh] w-full flex-col justify-center p-5 md:w-1/2 md:p-10 lg:p-20">
        <h3 className="text-2xl font-semibold">Create new account</h3>
        <SignUpForm />
        <div className="my-5 h-[1px] w-full bg-slate-300" />
        <h3 className="text-xl font-semibold">Already have an account?</h3>

        <Link
          to="/sign-in"
          className="mt-4 w-full rounded border border-sherpa-blue bg-white py-3 text-center text-sm font-semibold uppercase"
        >
          sign in
        </Link>
      </div>
      <div className="hidden h-full w-1/2 md:block">
        <img
          src={bgImg}
          alt="background img"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default SignUp
