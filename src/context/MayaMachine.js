import { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { assign, createMachine } from 'xstate'

import MayaMachineAPI from './controllers'

export const MayaStateContext = createContext()
export const MayaDispatchContext = createContext()

export const MayaMachine = createMachine({
  id: 'maya',
  initial: 'iddle',
  context: {
    proyectos: []
  },
  states: {
    iddle: {},
    success: {},
    error: {},
    createProyectos: {
      invoke: {
        src: MayaMachineAPI.createProyectos,
        onDone: {
          target: 'success'
        },
        onError: {
          target: 'error',
          actions: (ctx, error) => console.log(error)
        }
      }
    },
    getProyectos: {
      invoke: {
        src: MayaMachineAPI.getProyectos,
        onDone: {
          target: 'success',
          actions: assign({
            proyectos: (ctx, event) => event.data
          })
        },
        onError: {
          actions: (ctx, error) => console.log(error)
        }
      }
    }

  },
  on: {
    POST_PROYECTOS: 'createProyectos',
    GET_PROYECTOS: 'getProyectos'
  }

})

export const MayaAppMachineProvider = ({ children }) => {
  const [state, dispatch] = useMachine(MayaMachine)

  return (
    <MayaStateContext.Provider value={state}>
      <MayaDispatchContext.Provider value={dispatch}>
        { children }
      </MayaDispatchContext.Provider>
    </MayaStateContext.Provider>
  )
}

export const useMayaState = () => useContext(MayaStateContext)
export const useMayaDispatch = () => useContext(MayaDispatchContext)
