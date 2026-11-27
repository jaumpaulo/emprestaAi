const express = require("express")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use("/", routes)

app.use((req, res) => {
    res.status(404).json({ erro: "Rota nao encontrada" })
})

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).json({ erro: erro.message || "Erro interno do servidor" })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})