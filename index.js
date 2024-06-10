ire("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./database");
const Hero = require("./product");

//Conectar a la base de datos
connectDB();

// Middleware para permitir CORS
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "https://github.com/fabio-Navarrete/pindustrial_backend.git",
      //"https://front-heroes-api.vercel.app",
    ],
  })
);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Middleware para parsear JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de mi tienda");
});

// Obtener todos los héroes
app.get("/product", async (req, res) => {
  try {
    const product = await Hero.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).send("Error al obtener la lista de productos");
  }
});

// Obtener un héroe por ID
app.get("/product/:id", async (req, res) => {
  try {
    const hero= await Hero.findById(req.params.id)
    if (!hero)
      return res.status(404).send("El producto en la tienda no fue encontrado");
    res.json(hero);
  } catch (error) {
    res.status(500).send("Error al buscar el elemento en tienda");
  }
});

// Crear un nuevo héroe
app.post("/product", async (req, res) => {
  const { name, image } = req.body;

  // validacion de campos
  if (
    !name ||
    !image ||
    typeof name !== "string" ||
    typeof image !== "string" ||
    name.trim() === "" ||
    image.trim() === ""
  ) {
    return res
      .status(400)
      .send(
        "todos los campos son obligatorios, no pueden ir vacios"
      );
  }

  try {
    const newHero = new Hero({ name, image });
    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).send("Error crear producto");
  }
});

// Actualizar un héroe existente
app.put("/product/:id", async (req, res) => {
  const { name, image } = req.body;

  // validacion de campos
  if (
    !name ||
    !image ||
    typeof name !== "string" ||
    typeof image !== "string" ||
    name.trim() === "" ||
    image.trim() === ""
  ) {
    return res
      .status(400)
      .send(
        "El nombre y la imagen son campos obligatorios, no pueden ir vacios"
      );
  }

  try {
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, {name, image}, {new:true})
    if (!updatedHero) return res.status(404).send("El producto en la tienda no fue encontrado");
    res.status(201).json(updatedHero);
  } catch (error) {
    res.status(500).send("Error al actualizar tienda");
  }
});


// Eliminar un objeto
app.delete("/product/:id", async(req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id)
    if (!deletedHero) return res.status(404).send("El producto en la tienda no fue encontrado");
    res.status(201).json({ message: "El producto en la tienda fue eliminado"});
  } catch (error) {
    res.status(500).send("Error al actualizar tienda");
  }
});