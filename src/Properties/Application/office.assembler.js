import { Office } from "../Domain/office.entity.js";
import { OfficeService } from "../Domain/officeservice.entity.js";

export class OfficeAssembler {
  static toEntitiesFromResponse(response) {
    if (!response || !response.data) {
      //console.error("❌ No response or missing data in response:", response);
      return [];
    }

    const data = response.data.data ?? response.data;

    if (!Array.isArray(data)) {
      //console.error("❌ Expected array of offices in response, got:", data);
      return [];
    }

    const result = data
      .map((resource) => {
        if (!resource) {
          return null;
        }

        try {
          const services = [];
          const servicesData = resource.services || resource.Services || [];

          if (Array.isArray(servicesData)) {
            servicesData.forEach((serviceData) => {
              if (serviceData) {
                services.push(
                  new OfficeService(
                    serviceData.name || serviceData.Name,
                    serviceData.description || serviceData.Description,
                    serviceData.cost || serviceData.Cost
                  )
                );
              }
            });
          }

          const office = new Office(
            resource.id || resource.Id,
            resource.location || resource.Location,
            resource.description || resource.Description,
            resource.imageUrl || resource.ImageUrl,
            resource.capacity || resource.Capacity,
            resource.costPerDay || resource.CostPerDay,
            resource.available ?? resource.Available ?? true,
            services
          );

          console.log("✅ Created office:");
          return office;
        } catch (error) {
          console.error(
            "❌ Error creating Office entity from resource:",
            error,
            resource
          );
          return null;
        }
      })
      .filter((office) => office !== null);

    return result;
  }

  static toResourceFromEntity(office) {
    if (!office) {
      return null;
    }

    return {
      id: office.id,
      location: office.location,
      description: office.description,
      imageUrl: office.imageUrl,
      capacity: office.capacity,
      costPerDay: office.costPerDay,
      available: office.available,
      services:
        office.services?.map((service) => ({
          name: service.name,
          description: service.description,
          cost: service.cost,
        })) || [],
    };
  }
}
