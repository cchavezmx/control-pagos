import { useMemo } from 'react'
import { Modal } from 'antd'
import { useForm } from 'react-hook-form'
import HookNameProjectById from 'hooks/HookNameProjectById'
import HookPagosModalInvoce from 'hooks/HookPagosModalInvoce'
// import { useMemo } from 'react'

const ModalPagosClient = ({ openModalPago, handledOpen, lotes, pagos }) => {

  // TODOS CLIENTE PROYECTO YA SE TIENE
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  
  const onSubmit = (data) => {
    console.log(data, watch, errors)
  }

  const closeModal = () => {
    handledOpen()
    location.reload()
  }

  const watchAllFields = watch()

  const fechaPagos = useMemo(() => {
    const currentDate = new Date()
    const pagosMonth = pagos
      .filter(({ proyecto }) => proyecto.includes(watchAllFields?.proyecto))
      .map(({ mes }) => {
        const date = new Date(mes)
        const mesPago = date.getMonth() + 1
        const yearPago = date.getFullYear()

        const isExist = () => {
          if (mesPago === currentDate.getMonth() + 1 && yearPago === currentDate.getFullYear()) {
            return true 
          }
        }
        return isExist()
      })

    return pagosMonth.includes(true)
  }, [watchAllFields])

  return (
    <Modal
    visible={openModalPago}
    onCancel={closeModal}
    footer={null}    
    >
      { fechaPagos && <h3 className="bg__danger">Ya existe un pago de mensualidad generado</h3> }
      <span>
        <h2>Selecciona Proyecto</h2>
      </span>

      <form 
        className="modal__pagos__clientes"
        onSubmit={handleSubmit(onSubmit)}
        > 
          {
            lotes.map(({ proyecto, _id }) => {
              const { loading, project } = HookNameProjectById({ id: proyecto })

              return (
                <select key={_id} {...register('proyecto')}>
                  {
                    <option 
                      id="proyecto" 
                      value={proyecto[0]}
                    >
                      { loading && project?.title }
                    </option>
                  }
                </select>
              )
            })
          }            
        <button>Seleccionar</button>
      </form>
      {
        watchAllFields?.proyecto && 
        <HookPagosModalInvoce proyecto={watchAllFields?.proyecto} lotes={lotes}/>
      }
    </Modal>
  )
}

export default ModalPagosClient
