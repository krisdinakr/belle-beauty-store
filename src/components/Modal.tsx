import { Dispatch, ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function Modal({
  trigger,
  children,
  title,
  description,
  footer,
  open = false,
  setOpen,
}: {
  trigger: ReactNode
  children: ReactNode
  title?: string
  description?: string
  footer?: ReactNode
  open: boolean
  setOpen: Dispatch<boolean>
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-md md:max-w-2xl"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="-mr-2 max-h-[600px] overflow-auto pr-2">{children}</div>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
