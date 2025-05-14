export class Property {
    constructor({
        name = " ",
        description = " ",
        price = " ",
        location = " ",
        id = null

    } = {}) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.location = location;
        this.id = id;
    }
}