const prisma = require("../data/prisma");

exports.Cadastro = async function (req, res) {
  console.log(req.body);
  const { filial, andar, espinha, pa, patrimonio } = req.body;
  const localcompleto = `${filial}${andar.padStart(2, "0")}A${espinha.padStart(
    2,
    "0"
  )}E${pa.padStart(2, "0")}PA`;

  try {
    await prisma.localizacaoPA.create({
      data: {
        filial: filial,
        Andar: andar,
        Espinha: espinha,
        PA: pa,
      },
    });
    await prisma.relacionamentoPA.create({
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
