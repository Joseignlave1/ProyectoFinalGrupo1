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
    const data = await request.json();
    return data;
}

const saveProfileSettings  = async (userName, description, profilePhoto) => {
  try {
    // Falta agregar la API
    const response = await fetch("", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        description,
        profilePhoto
      }),
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

//Al hacer la request hay que mandarle el Token JWT en los headers para que te autorice y te envíe la información

 export const getProfileId = async (id) => {
   try {
    const token = localStorage.getItem('jwt-token');
     const response = await fetch(
       `http://localhost:3001/api/user/profile/${id}`,
       {
         method: "GET",
         headers: {
           "Authorization": `Bearer ${token}`,
           "Content-Type": "application/json"
         },
       }
     );
     if (!response.ok) {
       throw new Error(`Response status: ${response.status}`);
     }
     const data = await response.json();
     return data;
   } catch (error) {
     console.log(error.message);
   }
 };