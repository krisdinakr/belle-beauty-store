import { useContext } from 'react'

import { NavigationContext } from '@/context/NavigationContext'

export const useNavigationContext = () => useContext(NavigationContext)
