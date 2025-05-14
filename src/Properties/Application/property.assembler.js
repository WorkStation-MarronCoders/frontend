import {Property} from "../Domain/property.entity.js"

export class PropertyAssembler {

    static toEntitiesFromResponse(response) {
        if (!response || !response.data) {
            console.error('Invalid response received');
            return [];
        }
        
        const propertynResponse = response.data;
        if (!Array.isArray(propertynResponse)) {
            console.error('Expected array of operations in response');
            return [];
        }

        return propertynResponse.map((property) => {
            return this.toEntityFromResource(property);
        });
    }

    static toEntityFromResource(resource) {
        let property = new Property(resource);
        return property;
    }
}