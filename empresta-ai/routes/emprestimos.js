const express = require("express")
const router = express.Router()

const validarEmprestimo = require("../middlewares/validarEmprestimo")
const { listar, salvar, atualizar, remover, contar } = require("../repositorio")

router.get("/", async (req, res) => {
    const lista = await listar()
    res.json(lista)
})

router.get("/pendentes", async (req, res) => {
    const lista = await listar()
    res.json(lista.filter(emprestimo => emprestimo.situacao === "emprestado"))
})

router.get("/total", async (req, res) => {
    const total = await contar()
    res.json({ total })
})

router.get("/:id", async (req, res, next) => {
    const id = Number(req.params.id)
    const lista = await listar()
    const emprestimo = lista.find(emprestimo => emprestimo.id === id)

    if (!emprestimo) {
        const erro = new Error("Emprestimo nao encontrado")
        erro.status = 404
        return next(erro)
    }

    res.json(emprestimo)
})

router.post("/", validarEmprestimo, async (req, res) => {
    const { objeto, pessoa, diaEmprestimo, diaDevolucao } = req.body
    const lista = await listar()
    const id = lista.length ? Math.max(...lista.map(emprestimo => emprestimo.id)) + 1 : 1

    const emprestimo = {id, objeto, pessoa, diaEmprestimo, diaDevolucao, situacao: "emprestado"}

    await salvar(emprestimo)
    res.status(201).json(emprestimo)
})

router.patch("/:id", async (req, res, next) => {
    const id = Number(req.params.id)
    const { situacao } = req.body || {}

    if (situacao !== "emprestado" && situacao !== "devolvido") {
        return res.status(400).json({ erro: "Situacao deve ser emprestado ou devolvido" })
    }

    const emprestimo = await atualizar(id, { situacao })

    if (!emprestimo) {
        const erro = new Error("Emprestimo nao encontrado")
        erro.status = 404
        return next(erro)
    }

    res.json(emprestimo)
})

router.delete("/:id", async (req, res, next) => {
    const id = Number(req.params.id)
    const removido = await remover(id)

    if (!removido) {
        const erro = new Error("Emprestimo nao encontrado")
        erro.status = 404
        return next(erro)
    }

    res.json({ mensagem: "Emprestimo removido" })
})

module.exports = router