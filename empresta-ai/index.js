
const prompt = require("prompt-sync")()
const { listar, salvar, atualizar, remover } = require("./repositorio")

const dias = ["", "Segunda-feira", "Terca-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado", "Domingo"]

async function cadastrar() {
    const objeto = prompt("Objeto emprestado: ")
    const pessoa = prompt("Nome do amigo: ")

    console.log("1 - Segunda | 2 - Terca | 3 - Quarta | 4 - Quinta")
    console.log("5 - Sexta | 6 - Sabado | 7 - Domingo")

    const diaEmprestimo = Number(prompt("Dia do emprestimo: "))
    const diaDevolucao = Number(prompt("Dia previsto para devolucao: "))

    if (objeto === "" || pessoa === "") {
        console.log("Preencha o objeto e o nome do amigo")
        return
    }

    if (!Number.isInteger(diaEmprestimo) || diaEmprestimo < 1 || diaEmprestimo > 7) {
        console.log("Dia do emprestimo invalido")
        return
    }

    if (!Number.isInteger(diaDevolucao) || diaDevolucao < 1 || diaDevolucao > 7) {
        console.log("Dia da devolucao invalido")
        return
    }

    const lista = await listar()
    const id = lista.length ? Math.max(...lista.map(emprestimo => emprestimo.id)) + 1 : 1

    const emprestimo = {id, objeto, pessoa, diaEmprestimo, diaDevolucao, situacao: "emprestado"}

    await salvar(emprestimo)
    console.log("Emprestimo cadastrado com sucesso")
}

function mostrarEmprestimos(lista) {
    if (lista.length === 0) {
        console.log("Nenhum emprestimo encontrado")
        return
    }

    lista.forEach(emprestimo => {
        console.log("------------------------------")
        console.log(`ID: ${emprestimo.id}`)
        console.log(`Objeto: ${emprestimo.objeto}`)
        console.log(`Com: ${emprestimo.pessoa}`)
        console.log(`Dia do emprestimo: ${dias[emprestimo.diaEmprestimo]}`)
        console.log(`Devolucao prevista: ${dias[emprestimo.diaDevolucao]}`)
        console.log(`Situacao: ${emprestimo.situacao}`)
    })

    console.log("------------------------------")
}

async function registrarDevolucao() {
    const id = Number(prompt("ID do emprestimo devolvido: "))
    const emprestimo = await atualizar(id, { situacao: "devolvido" })

    if (!emprestimo) {
        console.log("Emprestimo nao encontrado")
        return
    }

    console.log("Devolucao registrada com sucesso")
}

async function excluir() {
    const id = Number(prompt("ID do emprestimo que deseja excluir: "))
    const removido = await remover(id)

    if (!removido) {
        console.log("Emprestimo nao encontrado")
        return
    }

    console.log("Emprestimo removido com sucesso")
}

async function menu() {
    let opcao = ""

    while (opcao !== "0") {
        console.log("\n=== EMPRESTA AI ===")
        console.log("1 - Cadastrar emprestimo")
        console.log("2 - Listar todos os emprestimos")
        console.log("3 - Listar emprestimos pendentes")
        console.log("4 - Registrar devolucao")
        console.log("5 - Excluir emprestimo")
        console.log("0 - Sair")

        opcao = prompt("Escolha uma opcao: ")

        if (opcao === "1") {
            await cadastrar()
        } else if (opcao === "2") {
            mostrarEmprestimos(await listar())
        } else if (opcao === "3") {
            const lista = await listar()
            mostrarEmprestimos(lista.filter(emprestimo => emprestimo.situacao === "emprestado"))
        } else if (opcao === "4") {
            await registrarDevolucao()
        } else if (opcao === "5") {
            await excluir()
        } else if (opcao !== "0") {
            console.log("Opcao invalida")
        }
    }

    console.log("Cabou oq era doce!!!")
}

menu()