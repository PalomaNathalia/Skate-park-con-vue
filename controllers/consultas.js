const pool = require("../database/keys");

const route = {};

route.signUp = async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad, foto } =
    req.body;
  try {
    await pool.query(
      "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado ) VALUES ($1,$2,$3,$4,$5,$6, false)",
      [email, nombre, password, anos_experiencia, especialidad, foto]
    ).rows;
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

route.signIn = async (req, res) => {
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

route.upDate = async (req, res) => {
  const id = req.params.id;
  const { nombre, password, anos_experiencia, especialidad } = req.body;
  try {
    await pool.query(
      `UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5`,
      [nombre, password, anos_experiencia, especialidad, id]
    );
    res.status(200).json({
      message: "Participante actualizado con éxito!",
      skater: { nombre, password, anos_experiencia, especialidad },
    });
    // return result.rows[0];
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
};

route.upDateStatus = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  try {
    await pool.query(
      `UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *`,
      [estado, id]
    );
    res.status(200).json({
      message: "Estado actualizado con éxito!",
    });
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
};

route.getParticipantes = async (req, res) => {
  try {
    const result = await (await pool.query("SELECT * FROM skaters")).rows;
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
};

route.deleteParticipante = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE from skaters WHERE id = $1`, [id]);
    res.status(200).json({
      message: "Participante eliminado con éxito!",
    });
  } catch (error) {
    res.status(500).json({
      error: `Algo salio mal ${error}`,
      code: 500,
    });
  }
};

module.exports = route;
