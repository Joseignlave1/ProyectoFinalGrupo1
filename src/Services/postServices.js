const token = localStorage.getItem("jwt-token");

export const getFeed = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/posts/feed", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al dar like al post");
    }
    const data = await response.json();
    return data;  // Post actualizado
  } catch (error) {
    console.error("Error en likePost:", error);
    throw error;
  }
};

 export const saveUserProfile = async (username, description, profilePicture) => {
  const token = localStorage.getItem("token");
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
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