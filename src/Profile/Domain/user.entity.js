export class User {
  constructor({
    id,
    firstName,
    lastName,
    dni,
    phoneNumber,
    email,
    role,
    password,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.role = role;
    this.password = password;
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
