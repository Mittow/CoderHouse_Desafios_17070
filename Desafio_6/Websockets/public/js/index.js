const socket = io();

/**********************TABLE**********************/
const table = document.getElementById('products-container');
socket.on('products', (products) => {
    fetch('partials/table.hbs')
    .then(respuesta => respuesta.text())
    .then(hbs => {
        const template = Handlebars.compile(hbs);
        let html = template({ products })
        table.innerHTML = html
    })
});

/***********************FORM**********************/
const form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault()
    const data = {
        name: form[0].value,
        price: form[1].value,
        image: form[2].value
    }
    socket.emit('form', data);
    form.reset()
});

/************************CHAT**********************/

const inputMessage = document.getElementById('message')
const inputEmail = document.getElementById('email')
const btnSend = document.getElementById('btnSend')

const formSendMsg = document.getElementById('formSendMsg')
formSendMsg.addEventListener('submit', e => {
    e.preventDefault()

    const msg = { 
        de: inputEmail.value, 
        mensaje: inputMessage.value 
    }
    socket.emit('newMsg', msg);
    formSendMsg.reset()
    inputMessage.focus()
});

function toHtml(arr) {
    return arr.map(msg => {
        return (`
            <div>
                <b style="color:blue;">${msg.de}</b>
                [<span style="color:brown;">${msg.date}</span>] :
                <i style="color:green;">${msg.mensaje}</i>
            </div>
        `)
    }).join(" ");
}

socket.on('msgAll', (msgs) => {
    const html = toHtml(msgs);
    document.getElementById('chat-container').innerHTML = html;
})

inputEmail.addEventListener('input', () => {
    const email = inputEmail.value.length
    const msg = inputMessage.value.length
    inputMessage.disabled = !email
    btnSend.disabled = !email || !msg
})

inputMessage.addEventListener('input', () => {
    const msg = inputMessage.value.length
    btnSend.disabled = !msg
})
