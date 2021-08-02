import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { clientes } from 'Models/clients'

import { useMayaDispatch, useMayaState } from 'context/MayaMachine'

const Proyecto = ({ match, history }) => {

  const state = useMayaState()
  const dispatch = useMayaDispatch()
  
  const { slug } = match.params

  useEffect(() => {
    dispatch('GET_DATA', { id: slug })
  }, [match])

  const { proyecto, lotes } = state.context

  // 1preimero obetenemos los clientes
  console.log(lotes, history)

  return (
        // @params proyecto css
        <div className="proyecto__container">
            <section className="proyecto__header">

              <div className="proyecto__header__title">
                { state.matches('success') && <h3>{ proyecto?.title }</h3>}
                <Link 
                  to={{ 
                    pathname: `/proyecto/${proyecto._id}/cliente/nuevo`,
                    state: { proyecto: proyecto.title }
                  }}>
                  <div type="button" className="ico__add__user"></div>
                  
                </Link>
              </div>
          
                <section className="proyecto__data__info">
                    {/* INFORMACION ESTATISTICO DEL PROYECTO */}
                </section>
            </section>

            <section className="proyecto__table">
              <table>
                <tr className="head__data__table">
                  <th>Nombre</th>
                  <th>Lote</th>
                  <th>Manzana</th>
                  <th>Precio Total</th>
                </tr>
                {/* <tr> */}
                  {
                    state.matches('success') &&
                    Object.values(lotes)
                      .map((item) => {
                        return (
                          <tr 
                            key={item._id} 
                            className="tabla__data"
                            onClick={() => history.push({ pathname: `/cliente/${item._id}`, state: { item } })}
                            >
                            <td>{ item.nombre }</td>
                          {
                            item.lotes.map(lote => {
                              return (
                                <>
                                <td key={lote._id}>{ lote.lote }</td>
                                <td key={lote.manzana}>{ lote.lote }</td>
                                <td key={lote.precioTotal}>{ lote.lote }</td>
                                </>
                              )
                            })
                          }
                          </tr>
                        )
                      })
                  }
                {/* </tr> */}
              </table>
            </section>

        </div>
  )
}

export default Proyecto
