const express = require("express")
const emprestimos = require("./emprestimos")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({ mensagem: "API Empresta Ai" })
})

router.use("/emprestimos", emprestimos)

module.exports = router