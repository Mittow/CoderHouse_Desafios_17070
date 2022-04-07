const socket = io();
const formAddGame = document.getElementById('addGame');
const containerTable = document.getElementById('products-container');

const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const renderPartials = async (path, data) => {
  try {
    let html;
    const response = await fetch(path);
    const template = await response.text();
    html = Handlebars.compile(template)({ partialItem: data });
    containerTable.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

const renderProducts = async () => {
  const data = await getProducts();
  try {
    renderPartials('/views/partials/table.hbs', data);
  } catch (error) {
    console.log(error);
  }
};

//Post product
const postProduct = async (product) => {
  try {
    await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const addGame = async () => {
  formAddGame.addEventListener('submit', (e) => {
    e.preventDefault();
    const game = {
      name: formAddGame.name.value,
      url: formAddGame.url.value,
      price: formAddGame.price.value,
    };

    const newGame = postProduct(game);
    socket.emit('newGame', newGame);
    socket.emit(renderProducts());
    formAddGame.reset();
  });
};

socket.emit(addGame());
socket.emit(renderProducts());

//-------- Chat -------------------//

const inputMessage = document.getElementById('message');
const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputAvatar = document.getElementById('avatar');
const inputAlias = document.getElementById('alias');
const inputAge = document.getElementById('age');
const inputEmail = document.getElementById('email');
const btnSend = document.getElementById('btnSend');
const formSendMsg = document.getElementById('formSendMsg');

formSendMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  const iduser = uuid.v4();
  const msg = {
    author: {
      id: iduser,
      email: inputEmail.value,
      avatar: inputAvatar.value,
      alias: inputAlias.value,
      nombre: inputFirstName.value,
      apellido: inputLastName.value,
      edad: inputAge.value,
      text: inputMessage.value,
    },
  };
  console.log(msg);
  socket.emit('newMsg', msg);
  formSendMsg.reset();
  inputMessage.focus();
});

function toHtml(arr) {
  return arr
    .map((msg) => {
      //
      return `
            <div>
                <b style="color:blue;">${msg.email}</b>
                [<span style="color:brown;">${msg.date}</span>] :
                <i style="color:green;">${msg.text}</i>
                <img src="${msg.avatar}" alt="${msg.alias}" width="50px" height="50px">
            </div>
        `;
    })
    .join(' ');
}
socket.on('msgAll', (msgs) => {
  const author = new normalizr.schema.Entity('authors');
  const message = new normalizr.schema.Entity('messages', {
    author: author,
  });
  const text = new normalizr.schema.Entity('texts');
  const msgSchema = new normalizr.schema.Entity('data', {
    messages: [message],
    text: [text],
  });
  const denormalizedData = normalizr.denormalize(
    'messages',
    msgSchema,
    msgs.entities
  );
  console.log(denormalizedData, 'denormalizedData');
  const arr = [];
  denormalizedData.messages.forEach((msg) => {
    arr.push(msg.author);
  });
  console.log(arr, 'arr');
  const html = toHtml(arr);
  document.getElementById('chat-container').innerHTML = html;
});

inputEmail.addEventListener('input', () => {
  const email = inputEmail.value.length;
  const msg = inputMessage.value.length;
  inputMessage.disabled = !email;
  btnSend.disabled = !email || !msg;
});

inputMessage.addEventListener('input', () => {
  const msg = inputMessage.value.length;
  btnSend.disabled = !msg;
});
