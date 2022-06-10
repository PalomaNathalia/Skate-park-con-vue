const pool = require("../database/keys");

const authentication = {};

authentication.signUp = async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad, foto } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado ) VALUES ($1,$2,$3,$4,$5,$6, false)",
      [email, nombre, password, anos_experiencia, especialidad, foto]
    );
    res.status(200).json({
      message: "Participante registrado con éxito!",
    });
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
  res.send("Registred");
};

authentication.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const skater = await (
      await pool.query(
        "SELECT * FROM skaters WHERE email = $1 AND password =$2",
        [email, password]
      )
    ).rows;
    if (skater.length > 0) {
      res.status(200).json({
        id: skater[0].id,
        email: skater[0].email,
        nombre: skater[0].nombre,
        anos_experiencia: skater[0].anos_experiencia,
        especialidad: skater[0].especialidad,
        foto: skater[0].foto,
        estado: skater[0].estado,
      });
    } else {
      res.status(200).json({
        message: "El participante no exite",
        NotFound: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
};



module.exports = authentication;
