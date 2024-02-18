/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast'
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'

interface IToastProps {
  title?:
    | string
    | (string & ReactElement<any, string | JSXElementConstructor<any>>)
    | (string & Iterable<ReactNode>)
    | (string & ReactPortal)
    | undefined
  description?:
    | string
    | (string & ReactElement<any, string | JSXElementConstructor<any>>)
    | (string & Iterable<ReactNode>)
    | (string & ReactPortal)
    | undefined
}

export const useToast = {
  success: ({ title, description }: IToastProps) => {
    toast({
      className: 'bg-green-200',
      title: title || 'Success',
      description,
    })
  },

  error: ({ title, description }: IToastProps) => {
    toast({
      className: 'bg-red-200',
      title: title || 'Uh oh! Something went wrong.',
      description,
    })
  },

  info: ({ title }: IToastProps) => {
    toast({
      className: 'bg-sky-100 text-black-pearl',
      title: title,
    })
  },

  alert: ({ title, description }: IToastProps) => {
    toast({
      className: 'bg-orange-200',
      title: title || 'Alert!',
      description,
    })
  },
}
