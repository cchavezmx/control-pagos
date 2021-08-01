import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardProyectos from 'Components/CardProyectos'

import { useMayaDispatch, useMayaState } from 'context/MayaMachine'

const Dashboard = () => {

  const state = useMayaState()
  const dispatch = useMayaDispatch()

  useEffect(() => {
    dispatch('GET_PROYECTOS')
  }, [])

  const { proyectos } = state.context

  console.log(proyectos)

  return (
        <div id="Dashboard">
            <section className="dashboard__header">
                <input placeholder="Buscar Cliente" />
                <span>
                    <button className="btn">Añadir Proyecto</button>
                    <button className="btb">Añadir Cliente</button>
                </span>
            </section>
            <section className="cards">
                {
                  state.matches('success') && proyectos.map(({ title, _id }) => {
                    return (
                      <Link key={_id} to={`/proyecto/${_id}`} >
                          <CardProyectos name={ title }/>
                      </Link>
                    )
                  })
                }
            </section>
        </div>
  )
}

export default Dashboard
