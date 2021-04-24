let socket_admin_id = null;
let socket = null;
let user_email = null;
let user_id = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {

    socket = io();

    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none';

    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block';

    const text = document.getElementById('txt_help').value;
    
    const email = document.getElementById('email').value;
    user_email = document.getElementById('email').value;

    const name = document.getElementById('name').value;

    socket.on('connect', () => {

        const body = {
            text,
            email,
            name
        }

        socket.emit('client_first_access', body, (call, err) => {
            if(err){
                console.log(err);
            }else{
                console.log(call);
            }
        });
    })

    socket.on('client_all_messages', (allMessages) => {
        // console.log(allMessages);
        var clientTemplate = document.getElementById('message-user-template').innerHTML;
        var adminTemplate = document.getElementById('admin-template').innerHTML;

        allMessages.forEach(message => {
            if(message.admin_id === null){
                user_id = message.user_id;
                const rendered = Mustache.render(clientTemplate, {
                    message: message.text,
                    email: email,
                    date: message.created_at
                });
                document.getElementById('messages').innerHTML += rendered;
            }else{
                socket_admin_id = message.admin_id;
                const rendered = Mustache.render(adminTemplate, {
                    message_admin: message.text,
                    email: email,
                    date: message.created_at
                });
                document.getElementById('messages').innerHTML += rendered;
            }
        });

    });

    socket.on('send_to_client', (message) => {
        // console.log(message);
        socket_admin_id = message.socket_id;

        var adminTemplate = document.getElementById('admin-template').innerHTML;
        const rendered = Mustache.render(adminTemplate, {
            message_admin: message.text
        });
        document.getElementById('messages').innerHTML += rendered;
    })

    

});

function sendMessageToAdmin(){

    const text = document.getElementById('message_user').value;

    const params = {
        text: text,
        socket_admin_id,
        user_id
    }

    socket.emit('client_send_message', params);

    var clientTemplate = document.getElementById('message-user-template').innerHTML;
    const rendered = Mustache.render(clientTemplate, {
        message: text,
        email: user_email
    });
    document.getElementById('messages').innerHTML += rendered;
}




