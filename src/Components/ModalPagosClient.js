import { Modal } from 'antd'
import { useForm } from 'react-hook-form'
import HookNameProjectById from 'hooks/HookNameProjectById'
import HookPagosModalInvoce from 'hooks/HookPagosModalInvoce'
// import { useMemo } from 'react'

const ModalPagosClient = ({ openModalPago, handledOpen, lotes }) => {

  // TODOS CLIENTE PROYECTO YA SE TIENE
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  
  const onSubmit = (data) => {
    console.log(data, watch, errors)
  }

  const watchAllFields = watch()

  return (
    <Modal
    visible={openModalPago}
    onCancel={handledOpen}
    footer={null}
    
    >
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
