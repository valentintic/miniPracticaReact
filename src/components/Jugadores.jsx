import axios from 'axios'
import React, { Component } from 'react'

export default class Jugadores extends Component {

    state = {
        jugadores: [],
        equipos: []
    }

    selectEquipo = React.createRef()
    nombreJugador = React.createRef()

    loadEquipos = (e) => {
        let url = "https://apiejemplos.azurewebsites.net/"
        let request = "api/equipos"
        axios.get(url + request).then(response => {
            this.setState({
                equipos: response.data
            })
            console.log(response.data)
        })
    }


    loadJugadores = (e) => {
        e.preventDefault()

        let url = "https://apiejemplos.azurewebsites.net/"
        let idEquipo = this.selectEquipo.current.value
        let request = "api/Jugadores/JugadoresEquipos/" + idEquipo
        let jugadoresContains = []
        let nombre = this.nombreJugador.current.value
        axios.get(url + request).then(response => {

            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].nombre.includes(nombre)) {
                    jugadoresContains.push(response.data[i])
                }
            }
            this.setState({
                jugadores: jugadoresContains
            })
        })



        console.log(idEquipo)
    }


    componentDidMount() {
        this.loadEquipos()
    }


  render() {
    return (
      <>
      <h1>Mini Practica React</h1>

      <form action="">
        <input type="text" placeholder='Nombre del Jugadore' ref={this.nombreJugador} />
        <button onClick={this.loadJugadores}>Buscar Jugadores</button>
        <select name="" id="" ref={this.selectEquipo}>
            {this.state.equipos.map((equipo, index) => {
                return <option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>
            })}
        </select>
      </form>

      {
        this.state.jugadores.length === 0 ? <h1></h1>:  <table border={1}>
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Posicio</th>
                <th>Pais</th>
                <th>Fecha Nacimiento</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.jugadores && this.state.jugadores.map((jugador, index) => {
                    return (
                        <tr key={index}>
                            <th style={{width:"100px", height:"100px"}}><img src={jugador.imagen} alt="" /></th>
                            <th>{jugador.nombre}</th>
                            <th>{jugador.posicion}</th>
                            <th>{jugador.pais}</th>
                            <th>{jugador.fechaNacimiento}</th>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
      }
      </>
    )
  }
}
