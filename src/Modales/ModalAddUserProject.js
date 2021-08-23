import { Modal } from 'antd'
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import BuscadorMachine from 'context/BuscadorMachine'

const ModalAddUserProject = ({ visible, onCancel }) => {

  const { register, handleSubmit, reset } = useForm()

  const [state, send] = useMachine(BuscadorMachine)
  const submitUser = (data) => {
    send('USER_SEARCH', { keyword: data.keyword })
  }

  const goToUser = () => {

  }

  const setCancel = () => {
    onCancel(false)
    reset()
  }

  const { busqueda } = state.context

  return (
    <Modal
      visible={visible}
      onCancel={setCancel}
      title="Añadir Usuario Existente"
      footer={null}
    >
    <form onSubmit={handleSubmit(submitUser)} className="modal__user__existente">
     <input 
      placeHolder="Ingresa el nombre del cliente"
      type="search"
      name="keyword"
      { ...register('keyword')}
     >
     </input> 
    </form>

    {
      state.matches('success') && 
      <table className="modal__search__users">
      <thead>
        <th>Nombre Completo</th>
        <th>Acciones</th>
      </thead>  
      <tbody>
        {
          busqueda.map(user => {
            return (
            <tr key={user._id}>
              <td>
                { user.nombre }
              </td>
              <td>
                <button
                  onClick={() => goToUser(user._id)}>Agregar</button>
              </td>
            </tr>
            )
          })
        }
    </tbody>
    </table>
    }
    </Modal>
  )
}

export default ModalAddUserProject
