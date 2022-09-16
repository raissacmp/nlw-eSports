import express from "express";

const app = express();

app.get("/games", (request, response) => {
  return response.json([]);
});

app.post("/ads", (request, response) => {
  return response.json([]);
});

app.get('/games/:id/ads', (request, response) => { // : se refere a dado dinamico
  //listar games do id X os seus anuncios

// const adId = request.params.id;


  return response.json([]);
});

app.listen(3333);
