const { Schema, model } = require('mongoose');
const { schema, normalize } = require('normalizr');
const faker = require('faker');
class ChatRoom {
  constructor() {
    const authorSchema = new Schema({
      author: {
        email: { type: String, default: faker.internet.email() },
        lastname: { type: String, default: faker.name.firstName() },
        firstName: { type: String, default: faker.name.lastName() },
        date: { type: Date, default: Date.now() },
        age: {
          type: Number,
          default: faker.datatype.number({ min: 18, max: 100 }),
        },
        avatar: { type: String, default: faker.image.avatar() },
        alias: {
          type: String,
          default: faker.name.firstName(),
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
