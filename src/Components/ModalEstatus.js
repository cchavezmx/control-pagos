import { useContext } from 'react'
import { AppContext } from 'context/AppContextProvider'
import { useMachine } from '@xstate/react'
import { ClienteMachine } from 'context/ClienteDataMachine'
import { Modal } from 'antd'

const ModalEstatus = () => {

  const [state, send] = useMachine(ClienteMachine)
  const { idPago, modalPago, setModalPago } = useContext(AppContext)

  const pagar = () => {
    send('POST__PAGAR', { idPago })
  }

  console.log(state, idPago)

  return (
    <Modal
    visible={modalPago}
    footer={null}
    onCancel={() => setModalPago(false)}
  
    > 
    <div className="bg__danger">
      <p>¿QUIERE LIQUIDAR EL PAGO</p>
      <button onClick={pagar}>
        Pagar
      </button>
    </div>
    </Modal>
  )
}

export default ModalEstatus
