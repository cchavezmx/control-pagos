import { createMachine } from 'xstate'
import { baseURL } from 'context/controllers'

// assignLoteToNewUser
const assignLoteToNewUser = async (ctx, { idProyecto, payload }) => {

  const response = await fetch(`${baseURL}/assign/lote/user/${idProyecto}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => res)

  console.log(response)
  return response
}

export const ClienteMachine = createMachine({
  id: 'clienteMachine',
  initial: 'iddle',
  context: {
    
  },
  states: {
    iddle: {},
    success: {},
    documentSave: {
      after: {
        3000: { target: 'iddle' }
      }
    },
    error: {},
    assignLoteToNewUser: {
      invoke: {
        src: assignLoteToNewUser,
        onDone: {
          target: 'documentSave'

        },
        onError: {
          target: 'error'
        }
      }
    }
  },
  on: {
    ASSIGN_LOTE_TO_NEW_USER: 'assignLoteToNewUser'
  }
})
