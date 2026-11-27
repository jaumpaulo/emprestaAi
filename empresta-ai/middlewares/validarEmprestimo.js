function validarEmprestimo(req, res, next) {
    const { objeto, pessoa, diaEmprestimo, diaDevolucao } = req.body || {}

    if (typeof objeto !== "string" || objeto === "") {
        return res.status(400).json({ erro: "O campo objeto e obrigatorio" })
    }

    if (typeof pessoa !== "string" || pessoa === "") {
        return res.status(400).json({ erro: "O campo pessoa e obrigatorio" })
    }

    if (!Number.isInteger(diaEmprestimo) || diaEmprestimo < 1 || diaEmprestimo > 7) {
        return res.status(400).json({ erro: "Dia do emprestimo deve ser um numero de 1 a 7" })
    }

    if (!Number.isInteger(diaDevolucao) || diaDevolucao < 1 || diaDevolucao > 7) {
        return res.status(400).json({ erro: "Dia da devolucao deve ser um numero de 1 a 7" })
    }

    next()
}

module.exports = validarEmprestimo