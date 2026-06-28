import { createContext, useContext } from 'react'

export const NavContext = createContext({ view: { name: 'dashboard' }, navigate: () => {} })
export const useNav = () => useContext(NavContext)
