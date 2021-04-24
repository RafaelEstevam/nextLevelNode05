import {io} from '../http';
import {ConnectionsService} from '../services/ConnectionsService'
import {MessagesService} from '../services/MessagesService';

io.on('connect', async (socket) => {

    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();
    const getAllConnectionsWithoutAdmin = await connectionsService.getAllConnectionsWithoutAdmin();

    io.emit('get_all_connectons_without_admin', getAllConnectionsWithoutAdmin); //emite a mensagem para todas as conexões

    socket.on('get_messages_user_by_id', async (params, callback) => {
        const {user_id} = params
        const messages = await messagesService.index(user_id);
        callback(messages);
    })

    socket.on('admin_user_in_support', async (params) => {
        const {user_id} = params;
        await connectionsService.updateAdminId(user_id, socket.id);

        const allUsers = await connectionsService.getAllConnectionsWithoutAdmin();
        io.emit("get_all_connectons_without_admin", allUsers);

    })

    socket.on('admin_send_message', async (params, callback) => {
        const {text, user_id, message_admin} = params;

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const {socket_id} = await connectionsService.findByUserId(user_id);

        /**
         * Para enviar uma mensagem para um usuário específico, usa o 'to' e o socket_id (id da conexão socket) 
         */

        io.to(socket_id).emit('send_to_client', {
            text,
            message_admin,
            socket_id: socket.id
        })


    })

})