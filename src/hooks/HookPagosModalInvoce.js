import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useMachine } from '@xstate/react'
import { ClienteMachine } from 'context/ClienteDataMachine'

const HookPagosModalInvoce = ({ lotes, proyecto }) => {

  const location = useLocation()
  const { item } = location.state
  
  const [state, send] = useMachine(ClienteMachine)

  const loteProject = useMemo(() => {
    let lote     
    Array.isArray(lotes) && 
      lotes.filter(project => {
        if (project.proyecto[0] === proyecto) {
          lote = { lote: project.lote, mensualidad: project.mensualidad, _id: project._id }
        }
        return lote
      })

    return lote
  }, [proyecto])

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      lote: loteProject?.lote,
      mensualidad: loteProject?.mensualidad
    }
  })

  const onSubmit = (data) => {
    console.log({ errors, estado: state.value })

    const payload = {
      cliente: item?._id,
      proyecto: proyecto,
      lote: loteProject._id,
      mes: data.mes,
      refPago: data.refPago,
      mensualidad: data.mensualidad 
    }
    send('ADD_PAGO_LOTE', { data: payload })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hook__pagos">

      <label>Numeo de Lote</label>
      <input placeholder="lote" id="lote" {...register('lote')} />

      <label>Fecha de Pago</label>
      <input type="date" required placeholder="Ingresar Mes de pago" id="mes" {...register('mes', { required: true })} />

      <label>Referencia de Pago</label>
      <input placeholder="Referencia de Pago" id="refPago" {...register('refPago')} />

      <label>Mensualidad</label>
      <input type="number" placeholder="cantidad" id="cantidad" {...register('mensualidad')} />

      <div>
        <button type="submit">Generar Pago</button>
      </div>
    </form>
  )
}

export default HookPagosModalInvoce
