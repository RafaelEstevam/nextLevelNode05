import {io} from '../http';
import {ConnectionsService} from '../services/ConnectionsService';
import {UsersService} from '../services/UsersService';
import {MessagesService} from '../services/MessagesService';

io.on('connect', (socket) => {

    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    socket.on('client_first_access', async (body) => {

        const socket_id = socket.id;
        const {text, email, name} = body;
        const password = '';

        const userExists = await usersService.findByEmail(email);

        if(!userExists){ //Verifica se usuário existe

            /**
             * Se não existir, cria  um usuário e uma nova conexão
             */

            const user = await usersService.create({email, username: name, password})
            const user_id = user.id;

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });

            await messagesService.create({
                user_id,
                text
            })

        }else{

            const user_id = userExists.id;
            /**
             * Se existir, busca por uma conexão já existente daquele usuário
             */
            const connection = await connectionsService.findByUserId(userExists.id);

            if(!connection){

                /**
                 * Se não achar, cria uma nova conexão
                 */

                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                });
            }else{

                /**
                 * Se achar, substitui o socket_id da conexão encontrada pelo socket_id da nova conexão
                 */

                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }

            await messagesService.create({
                user_id,
                text
            })
            
        }

        const allClientMessages = await messagesService.index(userExists.id);

        socket.emit('client_all_messages', allClientMessages);

    })
})
