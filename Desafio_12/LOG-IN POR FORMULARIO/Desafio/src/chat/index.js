const chatRoom = require('../models/chat');
module.exports = (socket) => {
  console.log('CHAT');
  socket.emit('allgames');
  //Post
  socket.emit('newGame');

  // actualizacion de mensajes
  socket.on('newMsg', async (mgs) => {
    await chatRoom.add(mgs);
    await chatRoom.readMsg();
    socket.emit('msgAll', await chatRoom.readMsg());
  });
};
