import { useContext } from 'react'
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
import bgImg from '@/assets/images/login-background.svg'
import { authService, userService } from '@/services'
import { AuthContext } from '@/context/AuthContext'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

function SignInForm() {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    authService.signIn(values).then(({ accessToken }) => {
      if (accessToken) {
        localStorage.setItem('token', accessToken)
        userService.getProfile().then((user) => {
          navigate('/')
          auth.current = user
        })
      }
    })
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
        <button
          type="submit"
          className="w-full rounded bg-sherpa-blue py-3 text-sm font-semibold uppercase text-white"
        >
          Sign in
        </button>
      </form>
    </Form>
  )
}

function SignIn() {
  return (
    <section className="flex h-auto w-full md:h-[725px]">
      <div className="hidden h-full w-1/2 md:block">
        <img
          src={bgImg}
          alt="background img"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-full min-h-[50vh] w-full flex-col justify-center p-5 md:w-1/2 md:p-10 lg:p-20">
        <h3 className="text-2xl font-semibold">Sign In</h3>
        <SignInForm />
        <div className="my-5 h-[1px] w-full bg-slate-300" />
        <h3 className="text-xl font-semibold">Don't have an account?</h3>
        <button className="mt-4 w-full rounded border border-sherpa-blue bg-white py-3 text-sm font-semibold uppercase">
          <Link to="/sign-up">create account</Link>
        </button>
      </div>
    </section>
  )
}

export default SignIn
