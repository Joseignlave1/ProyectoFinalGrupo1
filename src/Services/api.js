export const postLogin = async (email, password) => {
  const request = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email, password}),
  });
  if(!request.ok) {
    throw new Error("Credenciales Incorrectass");
  }
  const data = await request.json();
  return data;
};

export const postSingin = async (username, email, password) => {
    const request = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, email, password}),
    });

    console.log( request );
    localStorage.setItem("newUser", JSON.stringify({username, email, password}));
}
export const getFeed = async () => {
  try {
    const request = await fetch("http://localhost:3001/api/posts/feed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    // Si la solicitud no es exitosa, lanzamos un error
    if (!request.ok) {
      throw new Error("Error al obtener el feed");
    }
    // Parseamos la respuesta como JSON
    const data = await request.json();
    // Devolvemos los datos para que puedan ser utilizados en el frontend
    return data;
  } catch (error) {
    console.error("Error en getFeed:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado en la llamada
  }
};
export const likePost = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/posts/${postId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al dar like al post");
    }

    const data = await response.json();
    return data; // Devuelve el post actualizado con el nuevo like
  } catch (error) {
    console.error("Error en likePost:", error);
    throw error;
  }
};