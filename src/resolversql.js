const users = [
    {id: 1, username: "RafaelEstevam", email: "teste@teste.com"},
    {id: 2, username: "Oliveira", email: "teste@teste.com"},
];

const messages = [
    {id: 1, user_id: 123, admin_id: 12, text: "mensagem do usuário"},
    {id: 2, user_id: 33, admin_id: null, text: "mensagem do usuário"},
]

module.exports = {
    Query: {
        users: () => users,
        user: () => users[0],
        messages: () => messages,
        message: () => messages[0]
    },

    Mutation: {
        createUser: () => users[0]
    }
}