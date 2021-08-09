
import { useEffect, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { AppContext } from 'context/AppContextProvider'

import BuscadorMachine from 'context/BuscadorMachine'
import NumberFormat from 'utils/NumberFormat'

const HookPagosTable = ({ pagoId }) => {
  
  const [state, send] = useMachine(BuscadorMachine)
  useEffect(() => {
    send('GET_PAGOS_INFO', { id: pagoId })
  }, [pagoId])

  const { setModalPago, setIdPago } = useContext(AppContext)
  const handlePagador = (idPago) => {
    setModalPago(true)
    setIdPago(idPago)
  }

  return (
    state.matches('success') && state.context.pago
      .map((pago) => {
        return (
        <>   
          <tr 
            key={pago._id} 
            className="tabla__data"
            >
              <td
                className={ pago.status ? 'tabla__data__pagado' : 'tabla__data__pendding' }
              >
                { pago.status ? 'Pagado' : 'Pendiente' }
              </td>
              <td>{ pago.dataProject[0].title }</td>
              <td>{ pago.dataLote[0].lote }</td>
              <td>{ pago.mes }</td>
              <td>{ pago.refPago }</td>
              <td>{ <NumberFormat number={ pago.mensualidad } />}</td>                             
              <td className="estatus__menu">
                  <button onClick={() => handlePagador(pago._id)}>Pagar</button>
                  <button>Imprimir</button>
                </td>
            </tr>
        </>
        )
      })
  )
}

export default HookPagosTable
