import { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const [modalPago, setModalPago] = useState(false)
  const [idPago, setIdPago] = useState(undefined)

  return (
    <AppContext.Provider value={{
      modalPago,
      setModalPago,
      idPago, 
      setIdPago
    }}>
      { props.children }
    </AppContext.Provider>
  )
}

export default AppContextProvider
