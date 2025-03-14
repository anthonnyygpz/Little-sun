import apiAuth from "../apiAuth";

export const loginApi = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);
  try {
    const response = await apiAuth.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    console.log("Error get token: ", error);
    throw new Error("Failed to get token");
  }
};
