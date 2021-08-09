import { useEffect, useState } from 'react'
import { baseURL } from 'context/controllers'
import { Modal } from 'antd'

import NumberFormat from 'utils/NumberFormat'
/**
 * Con lote ID debemos obtener el incio de contrato
 * Las mensualidades pendientes que se obetienen del total de pagos menos el numero de plazo
 * El financiamiento pendiente se debe de obtener del financiamiento menos la suma de pagos realizados
 */

const ModalStatusProjectDetails = ({ loteid, openModal, handledModal }) => {

  console.log(loteid)

  const [estatus, setEstus] = useState([])
  const [loading, setLoading] = useState(false)
  
  const statusPagosPendiente = (payload) => {
    const totalPagos = payload[0]?.pagos.filter(item => item.status === true).length
    const plazo = payload[0]?.plazo
    
    const diffPagos = plazo - totalPagos
    const pendiente = payload[0]?.pagos.filter(item => item.status === false).length
      
    return { totalPagos, plazo, diffPagos, pendiente }
  }

  const financiamientoPendiente = (payload) => {
    const financiamiento = payload[0]?.financiamiento
    
    const pagoRealizado = payload[0]?.pagos
      .filter(item => item.status === true)
      .map(item => item.mensualidad)
      .reduce((acc, val) => +acc + +val, [])
    
    const pagoPorRealizar = payload[0]?.pagos
      .filter(item => item.status === false)
      .map(item => item.mensualidad)
      .reduce((acc, val) => +acc + +val, [])

    const restante = financiamiento - pagoRealizado
    
    return { financiamiento, pagoRealizado, pagoPorRealizar, restante }
  }

  const plazoStatus = statusPagosPendiente(estatus)
  const financiamento = financiamientoPendiente(estatus)
    
  useEffect(() => {
    fetch(`${baseURL}/status/payment/lote/${loteid}`)
      .then(res => res.json())
      .then(res => setEstus(res.message))
      .finally(() => setLoading(true))
  }, [loteid])
    
  return (
      <Modal
        title="ESTATUS DE PAGO"
        visible={openModal}
        onCancel={handledModal}
        footer={null}
      >
      {
        loading && 
      <section>
      <table className="tabla__edo__pagos">
        <thead title="Estados de pagos">
          <h3>Pagos</h3>
          <tr>
            <th>Plazo</th>
            <th>Realizados</th>
            <th>Por pagar</th>
            <th>Restantes</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{ plazoStatus?.plazo }</td>
          <td>{ plazoStatus?.totalPagos }</td>
          <td>{ plazoStatus?.pendiente}</td>
          <td>{ plazoStatus?.diffPagos }</td>
        </tr>
        </tbody>
      </table>
      <table className="tabla__edo__pagos">
        <thead title="Estados de pagos">
          <h3>Financiamiento</h3>
          <tr>
            <th>Total</th>
            <th>Pagado</th>
            <th>Por Pagar</th>
            <th>Restantes</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{ NumberFormat({ number: financiamento?.financiamiento })}</td>
          <td>{ NumberFormat({ number: financiamento?.pagoRealizado })}</td>
          <td>{ NumberFormat({ number: financiamento?.pagoPorRealizar })}</td>
          <td>{ NumberFormat({ number: financiamento?.restante })}</td>
        </tr>
        </tbody>
      </table>
      </section>
      }
      </Modal>
  )
}

export default ModalStatusProjectDetails
