import React from 'react';

const FlightInformation = ({ flights }) => {
	return (
		<div id='flight-information'>
			<h2>Información de Vuelo</h2>
			<div className='grid'>
				{flights.length > 0 ? (
					flights.map((flight, key) => (
						<div key={key} className='info-card'>
							<h3>{flight.code}</h3>
							<div>Avión: {flight.plane}</div>
							<div>Aerolínea: {flight.airline}</div>
							<div>Pasajeros: {flight.seats}</div>
							<div>Origen: {flight.origin}</div>
							<div>Destino: {flight.destination}</div>

						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default FlightInformation;
