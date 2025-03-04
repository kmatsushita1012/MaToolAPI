const getUsers = require("./routes/getUsers");
const postUser = require("./routes/postUser");
const notFound = require("./routes/notFound");

exports.handler = async (event) => {
  const httpMethod = event.httpMethod;
  const path = event.path;
  const userId = event.pathParameters ? event.pathParameters.id : null;
  let response;

  if (httpMethod === "GET" && path.startsWith("/users")) {
    response = await getUsers(userId);
  } else if (httpMethod === "POST" && path === "/users") {
    response = await postUser(event.body);
  } else {
    response = await notFound();
  }

  return response;
};
