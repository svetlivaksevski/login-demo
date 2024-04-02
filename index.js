import express from "express";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const dirName = path.dirname(new URL(import.meta.url).pathname);

app.get("/", (req, res) => {
  console.log("serving index.html...");
  res.sendFile(path.join(dirName, "/index.html"));
});

app.get("/echo/:message", (req, res) => {
  const message =
    req.params.message === "secret"
      ? "the secret is... 42!"
      : req.params.message;
  res.send(message);
});

app.get("/login", (req, res) => {
  res.sendFile(dirName + "/login.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false });
  }
  if (email === "user@email.com" && password === "very-secret") {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

app.get("/myaccount", (req, res) => {
  res.sendFile(dirName + "/myaccount.html");
});

app.get("/error", (req, res) => {
  res.sendFile(dirName + "/error.html");
});
