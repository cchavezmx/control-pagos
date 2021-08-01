export const baseURL = 'http://localhost:3000/api/v1'

class MayaMachineAPI {
  // todos los proyectos
  static async createProyectos (ctx, event) {

    const res = await fetch(`${baseURL}/add/proyecto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event.data)
    })
      .then(res => res.json())
      .then(res => res.message)

    return res
  }

  static async getProyectos () {
    const res = await fetch(`${baseURL}/proyectos`)
      .then(res => res.json())
      .then(res => res.message)
      
    return res 
  }
}

export default MayaMachineAPI
