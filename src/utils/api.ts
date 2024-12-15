const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed!");
  }

  return response.json();
};
