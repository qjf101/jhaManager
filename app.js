const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Jha Manager App" });
});

require("./routes/api.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
