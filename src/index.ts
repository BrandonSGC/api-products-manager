import server from "./server";

const PORT = process.env.PORT || 3000;

server.listen(3000, () => {
  console.log(`REST API: http://localhost:${PORT}/`);
});