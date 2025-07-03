// src/application/assemblers/office.assembler.js
import { Office } from "../Domain/office.entity";
import { OfficeService } from "../Domain/officeservice.entity";

export class OfficeAssembler {
  /**
   * Transforma una lista de OfficeResource[] en Office[]
   * @param {object} response - Respuesta del backend con un array de oficinas
   * @returns {Office[]}
   */
  static toEntitiesFromResponse(response) {
    if (!response || !response.data) {
      console.error("Invalid response received");
      return [];
    }

    const officesResponse = response.data;
    if (!Array.isArray(officesResponse)) {
      console.error("Expected array of offices in response");
      return [];
    }

    return officesResponse.map((resource) =>
      this.toEntityFromResource(resource)
    );
  }

  /**
   * Convierte un OfficeResource del backend a una entidad Office
   * @param {object} resource - OfficeResource
   * @returns {Office}
   */
  static toEntityFromResource(resource) {
    const services = (resource.services || []).map(
      (s) => new OfficeService(s.name, s.description, s.cost)
    );

    const office = new Office(
      resource.location,
      resource.capacity,
      resource.costPerDay,
      resource.available,
      services
    );

    office.id = resource.id;
    return office;
  }

  /**
   * Transforma una entidad Office en un objeto plano listo para enviar al backend
   * @param {Office} office - Entidad Office
   * @returns {object}
   */
  static toResourceFromEntity(office) {
    return {
      location: office.location,
      capacity: office.capacity,
      costPerDay: office.costPerDay,
      available: office.available,
      services: office.services.map((s) => ({
        name: s.name,
        description: s.description,
        cost: s.cost,
      })),
    };
  }
}
