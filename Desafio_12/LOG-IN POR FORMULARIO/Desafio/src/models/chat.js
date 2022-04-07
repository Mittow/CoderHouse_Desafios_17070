const { Schema, model } = require('mongoose');
const { schema, normalize } = require('normalizr');

class ChatRoom {
  constructor() {
    const authorSchema = new Schema({
      author: {
        email: { type: String },
        lastname: { type: String },
        firstName: { type: String },
        date: { type: Date, default: Date.now() },
        age: {
          type: Number,
        },
        avatar: { type: String },
        alias: {
          type: String,
        },
        text: { type: String },
      },
    });
    this.model = model('messages', authorSchema);
  }
  async add(newMsg) {
    await this.model.create(newMsg);
  }
  async readMsg() {
    let msgOnDb = await this.model.find({});
    const author = new schema.Entity('authors', {}, { idAttribute: 'email' });
    const text = new schema.Entity('texts');
    const message = new schema.Entity('messages', {
      author: author,
    });

    //Normalizar

    const messData = new schema.Entity('data', {
      messages: [message],
    });
    console.log(msgOnDb);
    const normalizedData = normalize(
      {
        id: 'messages',
        messages: msgOnDb.map((msg) => {
          return {
            id: msg._id,
            author: msg.author,
            text: msg.text,
          };
        }),
      },
      messData
    );
    console.log(normalizedData);
    return normalizedData;
  }
}

module.exports = new ChatRoom();
