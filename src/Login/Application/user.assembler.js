import { User } from "../Domain/user.entity";

export class UserAssembler {
  static toEntityFromResponse(response) {
    if (!response || !response.data) {
      console.error("❌ Invalid response for user:", response);
      return null;
    }

    const data = response.data;

    return new User({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      dni: data.dni,
      phoneNumber: data.phoneNumber,
      email: data.email,
      role: data.role,
      password: data.password,
    });
  }

  static toDTO(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dni: user.dni,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      password: user.password,
    };
  }
}
