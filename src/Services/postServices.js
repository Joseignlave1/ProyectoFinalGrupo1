
export const getFeed = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/posts/feed", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error al obtener el feed");
    }
    return await response.json();
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
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al dar like al post");
    }
    return await response.json(); // Post actualizado
  } catch (error) {
    console.error("Error en likePost:", error);
    throw error;
  }
};