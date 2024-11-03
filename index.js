import express from "express";

const host = "0.0.0.0";
const port = 3000;
const app = express();

app.listen(port, host, () => {
    console.log("Servidor em execucao http://" + host + ":" + port);
});

