import { Office } from "../Domain/office.entity.js";
import { OfficeService } from "../Domain/officeservice.entity.js";

export class OfficeAssembler {
  static toEntitiesFromResponse(response) {
    if (!response || !response.data) {
      console.error("Invalid response received");
      return [];
    }

    const officeArray = response.data;

    if (!Array.isArray(officeArray)) {
      console.error("Expected array of offices in response");
      return [];
    }

    return officeArray.map((resource) => this.toEntityFromResource(resource));
  }

  static toEntityFromResource(resource) {
    const services = Array.isArray(resource.services)
      ? resource.services.map(
          (s) => new OfficeService(s.name, s.description, s.cost)
        )
      : [];

    return new Office(
      resource.id, // importante: necesita existir
      resource.location,
      resource.capacity,
      resource.costPerDay,
      resource.available,
      services
    );
  }
}
