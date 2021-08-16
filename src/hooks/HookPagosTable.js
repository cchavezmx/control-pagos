
import { useEffect, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { AppContext } from 'context/AppContextProvider'

import BuscadorMachine from 'context/BuscadorMachine'
import NumberFormat from 'utils/NumberFormat'
import DateIntlFormat from 'utils/DateIntlFormat'

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
        
        let tipoPagoClass = 'tag__normal'
        switch (pago.tipoPago) {
          case 'extra':
            tipoPagoClass = 'tag__extra'
            break
          case 'acreditado':
            tipoPagoClass = 'tag__acreditado'    
            break
        }

        return (
        <>   
          <tr 
            key={pago._id} 
            id="row_info_pago"
            className="tabla__data"
            >
              <td><DateIntlFormat date={pago.mes} dateStyle="medium" /></td>
              <td
                className={ pago.status ? 'tabla__data__pagado' : 'tabla__data__pendding' }
              >
                { pago.status ? 'Pagado' : 'Pendiente' }
              </td>
              <td>{ pago.dataProject[0].title }</td>
              <td>{ pago.dataLote[0].lote }</td>
              <td>{ pago.refPago }</td>
              <td><span className={tipoPagoClass}>{ pago.tipoPago }</span></td>
              <td>{ <NumberFormat number={ pago.mensualidad } />}</td>                             
              <td className="estatus__menu">
                  <button disabled={pago.status} onClick={() => handlePagador(pago._id)}>Pagar</button>
                  <button>Imprimir</button>
                </td>
            </tr>
        </>
        )
      })
  )
}

export default HookPagosTable
