import {http} from './http';
import './websocket/client';
import './websocket/attendant';

http.listen(3333, () => {
    console.log("Server On port 3333");
})