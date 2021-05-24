import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import FlightMap from './components/FlightMap';
import FlightInformation from './components/FlightInformation';
import Chat from './components/Chat';
// const socket = io(
// 	'http://tarea-3-websocket.2021-1.tallerdeintegracion.cl',
// 	{
// 		path: '/flights',
// 	}
// );
const App = () => {
	const [markerPositions, setMarkerPositions] = useState({});
	const [flights, setFlights] = useState([]);
	const [chats, setChats] = useState([]);
	const [sockets, setSockets] = useState(null);
	// marker position useEffect
	useEffect(() => {
		const socket = io(
			'wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl',
			{
				path: '/flights',
				transports: ['websocket']
			}
		);
		// Listen to the POSITION
		socket.on('POSITION', (data) => {
			const temp = { ...markerPositions };
			temp[data.code] = data.position;
			// update the state
			setMarkerPositions(temp);
			// console.log(markerPositions);
		});
		socket.on('FLIGHTS', (data) => {
			setFlights(data);
		});
		// Listen to the POSITION

		socket.on('CHAT', (data) => {
			console.log(data);
			const tempChat = [...chats];
			tempChat.push(data);
			setChats(tempChat);
		});
		setSockets(socket);
		// 	// CLEAN UP THE EFFECT
		return () => {
			socket.disconnect();
		};
	}, [markerPositions, chats]);

	// flights info useEffect
	useEffect(() => {
		if (sockets) sockets.emit('FLIGHTS', () => {});
	}, [sockets]);

	const sendChat = (name, message) => {
		console.dir({ name, message });
		sockets.emit('CHAT', {
			name,
			message,
		});
	};

	return (
		<div className='App'>
			<div id='flight-data'>
				<FlightMap
					markerPositions={markerPositions}
					flights={flights}
				/>
				<FlightInformation flights={flights} />
			</div>
			<Chat chats={chats} sendChat={sendChat} />
		</div>
	);
};

export default App;
