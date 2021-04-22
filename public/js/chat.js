document.querySelector("#start_chat").addEventListener("click", (event) => {

    const socket = io();

    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none';

    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block';

    const text = document.getElementById('txt_help').value;
    const email = document.getElementById('email').value;
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
        })
    })

});


