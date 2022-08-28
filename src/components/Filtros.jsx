import React, { useState, useEffect } from 'react';

const Filtros = ({filtro, setFiltro}) => {

    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filter</label>
                    <select 
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}    
                    >
                        <option value="">--All Categories--</option>
                        <option value="ahorro">Savings</option>
                        <option value="comida">Food</option>
                        <option value="casa">Home</option>
                        <option value="gastos">Others</option>
                        <option value="ocio">Leisure</option>
                        <option value="salud">Health</option>
                        <option value="suscripciones">Subscriptions</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default Filtros;
