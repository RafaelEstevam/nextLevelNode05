import {io} from '../http';
import {ConnectionsService} from '../services/ConnectionsService'

io.on('connect', async (socket) => {

    const connectionsService = new ConnectionsService();
    const getAllConnectionsWithoutAdmin = await connectionsService.getAllConnectionsWithoutAdmin();

    io.emit('get_all_connectons_without_admin', getAllConnectionsWithoutAdmin);

})