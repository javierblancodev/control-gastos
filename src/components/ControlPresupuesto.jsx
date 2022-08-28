import React, { useEffect, useState } from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 );
        const totalDisponible = presupuesto - totalGastado;

        // Calcula el porcentaje gastado
        const nuevoPorcentaje = (((totalGastado) / presupuesto) * 100).toFixed(2);
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);

        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos]);
    
    // Nota: el metodo .toLocaleString no muta la variable original, algo fundamental en react
    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = function() {
        // confirm is a built-in method in JS that return true or false upon user action
        const resultado = confirm('Are you sure that you want to reset budget and expenses?');

        if(resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false)
        } else {
            console.log('No');
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626': '#3b82f6',
                })}
                value={porcentaje}
                text={`${porcentaje}% Spent`}
            />
        
            <div className='contenido-presupuesto'>
                <button
                className='reset-app'
                type='buttom'
                onClick={handleResetApp}>
                    Reset App
                </button>
                <p><span>My Budget: </span>{formatearCantidad(presupuesto)}</p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Available: </span>{formatearCantidad(disponible)}</p>
                <p><span>Spent: </span>{formatearCantidad(gastado)}</p>
            </div>
        </div>
    );
}

export default ControlPresupuesto;
