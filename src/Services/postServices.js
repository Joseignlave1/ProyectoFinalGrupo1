const token = localStorage.getItem("jwt-token");

export const getFeed = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/posts/feed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener el feed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getFeed:", error);
    throw error;
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al dar like al post");
    }
    const data = await response.json();
    return data; // Post actualizado
  } catch (error) {
    console.error("Error en likePost:", error);
    throw error;
  }
};

 export const saveUserProfile = async (username, description, profilePicture) => {
  //const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:3001/api/user/profile/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username, description, profilePicture
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
};

export const followUser = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/user/add-friend/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("Error al seguir al usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al seguir al usuario:", error);
  }
};

export const removeLike = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/posts/${postId}/like`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al remover el like del post");
    }

    const data = await response.json();
    return data; // Devuelve el post actualizado sin el like
  } catch (error) {
    console.error("Error en removeLike:", error);
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/user/remove-friend/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.log("Error al dejar de seguir al usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al dejar de seguir al usuario:", error);
  }
}