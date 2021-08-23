import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardProyectos from 'Components/CardProyectos'

import { useMayaDispatch, useMayaState } from 'context/MayaMachine'

const Dashboard = () => {

  const state = useMayaState()
  const dispatch = useMayaDispatch()

  const { proyectos } = state.context

  useEffect(() => {
    dispatch('GET_PROYECTOS')
    
  }, [])

  return (
        <div id="Dashboard">
            <section className="dashboard__header">
            </section>
            <section className="cards">
                {
                  state.matches('success') && proyectos.map(({ title, _id }) => {
                    return (
                      <Link key={_id} to={`/proyecto/${_id}`} >
                          <CardProyectos name={ title.toUpperCase() }/>
                      </Link>
                    )
                  })
                }
            </section>
        </div>
  )
}

export default Dashboard
