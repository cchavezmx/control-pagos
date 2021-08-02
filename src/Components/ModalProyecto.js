import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useMayaDispatch, useMayaState } from 'context/MayaMachine'

const ModalProyecto = () => {

  const [show, setShow] = useState(true)
  const handleShow = () => setShow(!show)
  
  const blackdropRef = useRef()
  useEffect(() => {
    blackdropRef.current?.addEventListener('click', function () {
      setShow(true)
    })
  }, [])
  
  const dispatch = useMayaDispatch()
  const state = useMayaState()
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = (data) => {
    
    const payload = {
      title: data.title.toLowerCase(),
      address: data.address.toLowerCase()
    }

    dispatch('POST_PROYECTOS', { payload })
  }

  useEffect(() => {
    return function cleanUp () {
      reset()
    }
  }, [show])

  useEffect(() => {
    if (state.matches('success')) {
      return reset()
    }
  }, [state])

  return (
    <div className="modal">
      <section className="modal__container" hidden={show}>

        <section ref={blackdropRef} className="modal__black__drop"/>
        <section className="modal__card">
            <div className="modal__body"> 

            <div className="modal__header">              
            { state.matches('error') && <span className="error__message">El Proyecto ya está Activo</span> }
            { state.matches('documentSave') && <div className="spinner" />}
            </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend>Datos del Proyecto</legend>
                  <label htmlFor="title">
                    Nombre
                    <input 
                      type="text"
                      id="title"
                      aria-invalid={errors.title ? 'true' : 'false'}
                      { ...register('title', { required: true })}
                      />
                      {errors.title ? <p>Campo Obligatorio</p> : null }
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
                  {/* TODO para adjuntar la foto */}
                </fieldset>
                <div className="modal__footer">
                  <button type="submit">Guardar</button>
                  <button tyepe="reset" onClick={() => setShow(true)}>Cerrar</button>
                </div>
              </form>

            </div>
        </section>

      </section>
      <button onClick={() => handleShow() } className="btn">Nuevo Proyecto</button>
    </div>
  )
}

export default ModalProyecto
