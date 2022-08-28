import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    // Valida que el usuario introduzca un numero positivo
    const handlePresupuesto = function(e) {
        e.preventDefault()

        // El boton submit de un formulario siempre devuelve un string
        // Number() convierte cualquier tipo a numero, si no se puede convertir devuelve NaN (Not a Number), where boolean is False 
        // Recuerda que el numero 0 es considerado falso en programacion por lo que el signo ! de la primera condicion le dará la vuelta y lo convertirá en true, ejecutando el primer bloque haciendo inválido el valor 0 también 
        if( !presupuesto || presupuesto < 0 ) {
            // console.log('No es presupuesto válido');
            setMensaje('No es un presupuesto válido');
            return   
        }

        setMensaje("");
        setIsValidPresupuesto(true)
        
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label>New Budget</label>

                    <input 
                        className='nuevo-presupuesto'
                        type="number"
                        placeholder='Set Your Budget'
                        value={presupuesto}
                        onChange={ e => setPresupuesto(Number(e.target.value)) }
                    />
                </div>
                <input type="submit" value="Add"/>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    );
}

export default NuevoPresupuesto;
