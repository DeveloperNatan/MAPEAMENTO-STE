const prisma = require("../data/prisma");

exports.Cadastro = async function (req, res) {
  console.log(req.body);
  const { filial, andar, espinha, pa, patrimonio, carteira } = req.body;
  const localcompleto = `${filial}${andar.padStart(2, "0")}A${espinha.padStart(
    2,
    "0"
  )}E${pa.padStart(2, "0")}PA`;

  try {
    await prisma.localizacaoPA.createMany({
      data: {
        filial: filial,
        Andar: andar,
        Espinha: espinha,
        PA: pa,
        Carteira: carteira,
      },
    });
    await prisma.relacionamentoPA.createMany({
      data: {
        Patrimonio: patrimonio,
        LocalCompleto: localcompleto,
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    console.error({ error: "erro ao criar produto", details: error.message });
  }
};

exports.Delete = async function (req, res) {
  const id = parseInt(req.body.id);

  try {
    await prisma.relacionamentoPA.deleteMany({
      where: {
        id: id,
      },
    });
    await prisma.localizacaoPA.deleteMany({
      where: {
        id: id,
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    res.status(401).json({ error: "erro ao deletar", details: error.message });
  }
};

exports.Edicao = async function (req, res) {
  const id = parseInt(req.body.id);
  const { filial, andar, espinha, pa, patrimonio, carteira } = req.body;
  const localcompleto = `${filial}${andar.padStart(2, "0")}A${espinha.padStart(
    2,
    "0"
  )}E${pa.padStart(2, "0")}PA`;
  try {
    await prisma.localizacaoPA.updateMany({
      where: {
        id: id,
      },
      data: {
        filial: filial,
        Andar: andar,
        Espinha: espinha,
        PA: pa,
        Carteira: carteira,
      },
    });
    await prisma.relacionamentoPA.updateMany({
      where: {
        id: id,
      },
      data: {
        Patrimonio: patrimonio,
        LocalCompleto: localcompleto,
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    console.error({ error: "erro ao editar", details: error.message });
  }
};
