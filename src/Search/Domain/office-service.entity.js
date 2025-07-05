export class OfficeService {
  /**
   * @param {string} name - Nombre del servicio
   * @param {string} description - Descripción del servicio
   * @param {number} cost - Costo del servicio
   */
  constructor(name, description, cost) {
    this.name = name;
    this.description = description;
    this.cost = cost;
  }
}
