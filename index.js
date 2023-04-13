import express from "express";
import { PORT } from "./config.js";
import { userRouter } from "./routes/users.js";
import { loginRouter } from "./routes/login.js";
import { areaRouter } from "./routes/areas.js";


const app = express();
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/area', areaRouter)
app.use('/login', loginRouter)


app.listen(PORT)
console.log(`Listening on port ${PORT}`)