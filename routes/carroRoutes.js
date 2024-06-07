const express = require('express');
const router = express.Router();
const Carro = require('../models/carro');

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const carro = await Carro.find();
    res.json(carro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um contato por ID
router.get('/:id', getCarro, (req, res) => {
  res.json(res.carro);
});

// Rota para criar um novo contato
router.post('/', async (req, res) => {
  const carro = new Carro({
    marca: req.body.marca,
    modelo: req.body.modelo,
    cor: req.body.cor,
    ano: req.body.ano,
  });

  try {
    const newCarro = await carro.save();
    res.status(201).json(newCarro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um contato por ID
router.put('/:id', getCarro, async (req, res) => {
  if (req.body.marca != null) {
    res.carro.marca = req.body.marca;
  }
  if (req.body.modelo != null) {
    res.carro.modelo = req.body.modelo;
  }
  if (req.body.cor != null) {
    res.carro.cor = req.body.cor;
  }
  if (req.body.ano != null) {
    res.carro.ano = req.body.ano;
  }

  try {
    const updatedCarro = await res.carro.save();
    res.json(updatedCarro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um contato por ID
router.delete('/:id', getCarro, async (req, res) => {
  try {
    await res.carro.deleteOne();
    res.json({ message: 'Carro excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCarro(req, res, next) {
  try {
    const carro = await Carro.findById(req.params.id);
    if (carro == null) {
      return res.status(404).json({ message: 'Carro não encontrado' });
    }
    res.carro = carro;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;