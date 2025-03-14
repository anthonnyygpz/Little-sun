import { register } from "../../../libs/enpoints/userApi";
import { UserCreate } from "../../shared/types/userTypes";

const UserService = () => {
  const registerUser = async (newUser: UserCreate) => {
    try {
      const registered = await register(newUser);
      return registered;
    } catch (error) {
      console.log("Error register user: ", error);
    }
  };
  return { registerUser };
};
export default UserService;
