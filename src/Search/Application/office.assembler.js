import { Office } from "../Domain/office.entity";
import { OfficeService } from "../Domain/office-service.entity";

export class OfficeAssembler {
  static toEntitiesFromResponse(response) {
    console.log("🔍 Processing response:", response);

    if (!response || !response.data) {
      console.error("❌ No response or missing data in response:", response);
      return [];
    }

    const data = response.data.data ?? response.data;
    console.log("🔍 Extracted data:", data);

    // ✅ NUEVA LÓGICA: Manejar tanto arrays como objetos individuales
    let dataArray;
    if (Array.isArray(data)) {
      dataArray = data;
    } else if (data && typeof data === "object") {
      // Si es un objeto individual, lo convertimos a array
      dataArray = [data];
      console.log("🔍 Converting single object to array");
    } else {
      console.error("❌ Expected array or object in response, got:", data);
      return [];
    }

    console.log("🔍 About to map", dataArray.length, "offices");

    // Mapear directamente sin llamar a otros métodos de la clase
    const result = dataArray
      .map((resource) => {
        console.log("🔍 Processing resource:", resource);

        if (!resource) {
          console.error("❌ Resource is null or undefined:", resource);
          return null;
        }

        try {
          // Procesar servicios directamente
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

          // Crear la entidad Office directamente
          const office = new Office(
            resource.id || resource.Id,
            resource.location || resource.Location,
            resource.capacity || resource.Capacity,
            resource.costPerDay || resource.CostPerDay,
            resource.available ?? resource.Available ?? true,
            services
          );

          console.log("✅ Created office:", office);
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

    console.log("🔍 Final result:", result);
    return result;
  }

  static toResourceFromEntity(office) {
    if (!office) {
      console.error("❌ Office entity is null or undefined");
      return null;
    }

    return {
      id: office.id,
      location: office.location,
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
