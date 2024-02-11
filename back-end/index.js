const express = require("express");
const cors = require("cors");

const app = express();

const taskRouter = require("./routes/taskRouter.js");
app.use(express.json());
app.use(cors());
app.use("/tasks", taskRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
