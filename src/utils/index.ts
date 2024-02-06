import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { JwtPayload, jwtDecode } from 'jwt-decode'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decoded(token: string) {
  return jwtDecode<JwtPayload>(token)
}

export function formatCurrency(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}
