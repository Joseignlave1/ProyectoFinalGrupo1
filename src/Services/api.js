export const postLogin = async (email, password) => {
  const request = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email, password),
  });
  console.log(request);
  return request;
};

export const postSingin = async (username, email, password) => {
    const request = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(username, email, password),
    });

    console.log( request );
    localStorage.setItem("newUser", JSON.stringify(username, email, password));
}