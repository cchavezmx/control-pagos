import { Link } from 'react-router-dom'

import { proyectos } from 'Models/proyectos'
import CardProyectos from 'Components/CardProyectos'

const Dashboard = () => {

    return(
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
                    proyectos.map(({ proyectName }, index) => {
                        return(
                        <Link key={index + proyectName } to={`/proyecto/KUXTAL 1`} >
                            <CardProyectos name={ proyectName }/>
                        </Link>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default Dashboard