import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { AuthDispatchContext } from '@/context/AuthContext'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 8 characters.',
  }),
})

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useContext(AuthDispatchContext)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    authService.login(values).then(({ accessToken }) => {
      if (accessToken) {
        userService.getProfile(null, accessToken).then((user) => {
          dispatch &&
            dispatch({
              type: 'login',
              data: user,
            })
        })
        navigate('/')
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

function Login() {
  return (
    <section className="flex h-auto w-full md:h-[526px] lg:h-[calc(100vh-64px)]">
      <div className="hidden h-full w-1/2 md:block">
        <img
          src={bgImg}
          alt="background img"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-full min-h-[50vh] w-full flex-col justify-center p-5 md:w-1/2 md:p-10 lg:p-20">
        <h3 className="text-2xl font-semibold">Sign In</h3>
        <LoginForm />
        <div className="my-5 h-[1px] w-full bg-slate-300" />
        <h3 className="text-2xl font-semibold">Don't have an account?</h3>
        <button className="mt-4 w-full rounded border border-sherpa-blue bg-white py-3 text-sm font-semibold uppercase">
          <a href="/sign-up">create account</a>
        </button>
      </div>
    </section>
  )
}

export default Login
