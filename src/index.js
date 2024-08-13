import express from "express";
import { join } from "node:path";
import formSchema from "./validation/formSchema.js";
import checkForm from "./middleware/postMiddleware.js";
import User from "./models/User.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve extra js static file
app.use(express.static(join(import.meta.dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile(join(import.meta.dirname, "public", "index.html"));
});

app.post("/", checkForm(formSchema), async (req, res) => {
  const { username, email, birthday } = req.body;
  let statusCode;
  try {
    const userWithUsername = await User.findOne({ username });
    const userWithEmail = await User.findOne({ email });

    if (userWithUsername) {
      statusCode = 409;
      throw new Error(`Username already exists`);
    }
    if (userWithEmail) {
      statusCode = 409;
      throw new Error(`Email already exists`);
    }
    const newUser = new User({ username, email, birthday });
    await newUser.save();
    console.log(await User.find({}));
    res.send(`
      <div id="result" class="mt-4 text-center text-green-600">
        <p>User created successfully!</p>
        
      </div>
    `);
  } catch (err) {
    if (statusCode) {
      return res.status(statusCode).send(`${err}`);
    }
    return res.status(500).send("internal server error");
  }
});

export default app;