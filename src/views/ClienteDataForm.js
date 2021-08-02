import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import { ClienteMachine } from 'context/ClienteDataMachine'
import { useEffect } from 'react/cjs/react.development'

const ClienteDataForm = ({ match, location }) => {

  const [showCliente, setShowCliente] = useState(false)
  const handleShowCliente = () => setShowCliente(!showCliente)

  const [showLote, setShowLote] = useState(true)
  const handleShowLote = () => setShowLote(!showLote)
  
  const [showPago, setShowPago] = useState(true)
  const handleShowPago = () => setShowPago(!showPago)

  const { idProyecto, idCliente } = match.params
  const { proyecto } = location.state
  const [state, send] = useMachine(ClienteMachine)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = (data) => {
    send('ASSIGN_LOTE_TO_NEW_USER', { idProyecto, payload: data })
  }

  useEffect(() => {
    if (state.matches('documentSave')) {
      return reset()
    }
  }, [state.value])
  
  return (

    <div className="cliente__App__container">
      <div className="cliente__App__header">
        <h4>Añadir usuario <br/> proyecto: { proyecto } </h4>
      </div>

      <section className="cliente__App_body">
      { state.matches('documentSave') && <span>Se guardo documento</span>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend onClick={() => handleShowCliente() }>
                      Datos del Cliente
                      <button className="button__acordeon"></button>
                  </legend>

                  <div hidden={showCliente}>
                  <label htmlFor="nombre">
                    Nombre Completo
                    <input 
                      type="text"
                      id="nombre"
                      aria-invalid={errors.title ? 'true' : 'false'}
                      { ...register('nombre', { required: true })}
                      />
                      {errors.nombre ? <p>Campo Obligatorio</p> : null }
                  </label>

                  <label htmlFor="address">
                    Dirección
                    <input 
                      type="text"
                      id="text"
                      aria-invalid={errors.address ? 'true' : 'false'}
                      { ...register('address', { required: true })}
                    />
                      {errors.address ? <p>Campo Obligatorio</p> : null }
                  </label>

                  <label htmlFor="phone">
                    Teléfono
                    <input 
                      type="text"
                      id="phone"
                      aria-invalid={errors.address ? 'true' : 'false'}
                      { ...register('phone', { required: true })}
                    />
                      {errors.phone ? <p>Campo Obligatorio</p> : null }
                  </label>

                  <label htmlFor="email">
                    Email
                    <input 
                      type="email"
                      id="email"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      { ...register('email', { required: true })}
                    />
                      {errors.email ? <p>Campo Obligatorio</p> : null }
                  </label>
                  {/* TODO para adjuntar la foto */}
                  </div>
                </fieldset>
                
                <fieldset>
                    <legend onClick={() => handleShowLote()}>
                        Asginación de Lote
                        <button className="button__acordeon"></button>
                    </legend>

                  <div hidden={showLote}>
                    <label htmlFor="lote">
                      Número de Lote
                      <input 
                        id="lote"
                        type="number"
                        min={0}
                        aria-invalid={errors.lote ? 'true' : 'false' }
                        { ...register('lote', { required: true, min: 1 })}          
                        />
                        {errors.lote ? <p>Ingrese un número valido</p> : null }
                    </label>

                    <label htmlFor="manzana">
                      Número de Manzana
                      <input 
                        id="manzana"
                        type="number"
                        min={0}
                        aria-invalid={errors.manzana ? 'true' : 'false' }
                        { ...register('manzana', { required: true, min: 1 })}          
                        />
                        {errors.manzana ? <p>Ingrese un número valido</p> : null }
                    </label>

                    <label htmlFor="precioTotal">
                      Precio Total
                      <input 
                        id="precioTotal"
                        type="number"
                        min={0}
                        aria-invalid={errors.precioTotal ? 'true' : 'false' }
                        { ...register('precioTotal', { required: true })}          
                        />
                        {errors.precioTotal ? <p>Campo Obligatorio</p> : null }
                    </label>

                    <label htmlFor="enganche">
                      Enganche
                      <input 
                        id="enganche"
                        type="number"
                        min={0}
                        aria-invalid={errors.enganche ? 'true' : 'false' }
                        { ...register('enganche', { required: true })}          
                        />
                        {errors.enganche ? <p>Campo Obligatorio</p> : null }
                    </label>

                    <label htmlFor="financiamiento">
                      Monto financiamiento
                      <input 
                        id="financiamiento"
                        type="number"
                        min={0}
                        aria-invalid={errors.financiamiento ? 'true' : 'false' }
                        { ...register('financiamiento', { required: true })}          
                        />
                        {errors.financiamiento ? <p>Campo Obligatorio</p> : null }
                    </label>

                    <label htmlFor="plazo">
                      Plazo  &#40; Total de Meses &#41;
                      <input 
                        id="plazo"
                        type="number"
                        min={0}
                        aria-invalid={errors.plazo ? 'true' : 'false' }
                        { ...register('plazo', { required: true, min: 1 })}          
                        />
                        {errors.plazo ? <p>Ingrese un numero valido</p> : null }
                    </label>

                    <label htmlFor="mensualidad">
                      Mensualidad
                      <input 
                        id="mensualidad"
                        type="number"
                        min={0}
                        aria-invalid={errors.mensualidad ? 'true' : 'false' }
                        { ...register('mensualidad', { required: true })}          
                        />
                        {errors.mensualidad ? <p>Campo Obligatorio</p> : null }
                    </label>

                    {/* <label htmlFor="mensualidad">
                      Mensualidad
                      <input 
                        id="mensualidad"
                        type="number"
                        min={0}
                        aria-invalid={errors.mensualidad ? 'true' : 'false' }
                        { ...register('mensualidad', { required: true })}          
                        />
                    </label> */}

                  </div>
                </fieldset>

                  { idCliente !== 'nuevo' &&
                    <fieldset>
                      <legend onClick={() => handleShowPago()}>
                        Agregar un pago
                        <button className="button__acordeon"></button>
                      </legend>
                  
                  <div hidden={showPago}>
                    <label htmlFor="mes">
                        Mes
                        <input 
                          id="mes"
                          type="text"
                          aria-invalid={errors.mes ? 'true' : 'false' }
                          { ...register('mes', { required: false })}          
                          />
                      </label>

                    <label htmlFor="refPago">
                        Referencia de pago
                        <input 
                          id="refPago"
                          type="number"
                          min={0}
                          aria-invalid={errors.refPago ? 'true' : 'false' }
                          { ...register('refPago', { required: false })}          
                          />
                      </label>

                    <label htmlFor="cantidad">
                        Cantidad depositada
                        <input 
                          id="cantidad"
                          type="number"
                          min={0}
                          aria-invalid={errors.cantidad ? 'true' : 'false' }
                          { ...register('cantidad', { required: false })}          
                          />
                      </label>

                  </div>
                    </fieldset>  
                  }

                <div className="modal__footer">
                  <button type="submit">Guardar</button>
                  <button tyepe="reset" onClick={() => reset()}>Borrar Campos</button>
                </div>
              </form>

      </section>
      <div className="cliente_App_footer">

      </div>

    </div>
  )
}

export default ClienteDataForm
