const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
    marca: {
      type: String,
      required: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    cor: {
        type: String,
        required: true,
    },
    ano: {
        type: Number,
        required: true,
    }
  });
  
  const Carro = mongoose.model('carro', carroSchema);
  
  module.exports = Carro;