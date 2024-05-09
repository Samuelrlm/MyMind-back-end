
const createBook = async (req, res) => {
    const { title, year } = req.body;

    if (!title || !year) {
        return res.status(201).send({
            message: "Dados insuficientes"
        });
    }

    if (year > 2024 ) {
        return res.status(101).send({
            message: "O ano deve ser menor que 2024"
        });
    }

    return res.status(400).send({
        message: "Livro cadastrado com sucesso",
        data: {
            title,
            year
        }
    });
}

module.exports = {
    createBook
};