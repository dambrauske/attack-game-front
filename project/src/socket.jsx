import io from 'socket.io-client';

let connection = undefined

const socket = () => {
    if(!connection){
        console.warn('INIT CONNECTION')
        connection = io.connect('http://localhost:8001')
    }

    return connection;
}


export default socket;
