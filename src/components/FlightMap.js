import { Icon } from 'leaflet';
import React from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Polyline,
	Tooltip,
	FeatureGroup,
	Circle,
} from 'react-leaflet';

const FlightMap = ({ markerPositions, flights }) => {
	const airplane = new Icon({
		iconUrl: '/airplane.png',
		iconSize: [40, 40],
	});
	return (
		<div className='flight-map'>
			<h2>Mapa en Vivo</h2>
			<MapContainer
				className='leaflet-container'
				center={flights.length > 0 ? flights[0].origin : [-33, -66]}
				zoom={5}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{flights.map((flight, key) => (
					<FeatureGroup key={flight.code}>
						<Marker
							position={
								markerPositions[flight.code]
									? markerPositions[flight.code]
									: [0, 0]
							}
							icon={airplane}
						>
							<Tooltip>
								Airline: {flight.airline}
								<br />
								Flight Code: {flight.code}
								<br />
								Plane: {flight.plane}
								<br />
								Seats: {flight.seats}
							</Tooltip>
						</Marker>
						<Polyline
							pathOptions={{
								color:
									'#' +
									Math.floor(16777215 * ((key + 1) / 11)).toString(
										16
									),

								weight: 3,
								opacity: 0.8,
							}}
							positions={[flight.destination, flight.origin]}
						/>
						<Circle
							center={flight.destination}
							// radius={400}
							pathOptions={{
								color:
									'#' +
									Math.floor(16777215 * ((key + 1) / 11)).toString(
										16
									),
								weight: 10,
							}}
						/>
						<Circle
							center={flight.origin}
							// radius={400}
							pathOptions={{
								color:
									'#' +
									Math.floor(16777215 * ((key + 1) / 11)).toString(
										16
									),
								weight: 10,
							}}
						/>
					</FeatureGroup>
				))}
			</MapContainer>
		</div>
	);
};

export default FlightMap;
