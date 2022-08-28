import { useState, useEffect } from "react"; // 1. Se importan librerias, u otros archivos relacionados con react
import Mensaje from "./Mensaje"; // 2. Se importan componentes
import CerrarBtn from "../img/cerrar.svg"; // 3. Se importan estilos e imagenes


const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState("");

    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("")
    const [id, setId] = useState("");

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            // Cuando se ejecuta el componente, si gastoEditar esta vacío, significa que es un nuevo gasto, si gasto editar ya contiene un id, es que estamos editando un gasto
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha)
        }
    }, []);    

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if([ nombre, cantidad, categoria ].includes('')) {
            setMensaje("All fields are mandatory")
            
            setTimeout(() => {
                setMensaje("")
            }, 3000);
            
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                    src={CerrarBtn} 
                    alt="imagen modal" 
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>{gastoEditar.nombre ? "Edit Expense" : "New Expense"}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Expense Name</label>
                    <input 
                    id="nombre"
                    type="text"
                    placeholder="Add the expense name"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Quantity</label>
                    <input 
                    id="cantidad"
                    type="number"
                    placeholder="Add the amount: ex. 300"
                    value={cantidad}
                    onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Category</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value) }
                        >
                            <option value="">--Select--</option>
                            <option value="ahorro">Savings</option>
                            <option value="comida">Food</option>
                            <option value="casa">Home</option>
                            <option value="gastos">Others</option>
                            <option value="ocio">Leisure</option>
                            <option value="salud">Health</option>
                            <option value="suscripciones">Subscriptions</option>
                    </select>
                </div>
                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? "Save" : "Add"}
                />
            </form>
        </div>
    );
}

export default Modal;
