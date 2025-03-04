const getUsers = require("./route/getRoute");
const postUser = require("./route/postRoute");

exports.handler = async (event) => {
  const httpMethod = event.httpMethod;
  const path = event.path;
  const userId = event.pathParameters ? event.pathParameters.id : null;
  let response;

  if (httpMethod === "GET" && path.startsWith("/users")) {
    response = await getUsers(userId);
  } else if (httpMethod === "POST" && path === "/users") {
    response = await postUser(event.body);
  }
  return response;
};
