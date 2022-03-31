const HOSTNAME = process.env.HOSTNAME || "cluster0.pojuy.mongodb.net";
const SCHEMA = process.env.SCHEMA || "mongodb+srv";
const USER = process.env.USER || "mittow";
const PASSWORD = process.env.PASSWORD || "XSPOosiNKgfMiPIq";
const DATABASE = process.env.DATABASE || "chat";
const OPTIONS = process.env.OPTIONS || "retryWrites=true&w=majority";

const URI_CLOUD_CONNECTION = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`;
const URI_LOCAL_CONNECTION = `mongodb://localhost:27017/${DATABASE}`;

module.exports = {
  URI_CLOUD_CONNECTION,
  URI_LOCAL_CONNECTION,
};
