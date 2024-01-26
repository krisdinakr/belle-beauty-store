import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { JwtPayload, jwtDecode } from 'jwt-decode'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decoded(token: string) {
  return jwtDecode<JwtPayload>(token)
}
