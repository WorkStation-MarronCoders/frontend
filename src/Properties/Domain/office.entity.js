export class Office {
  /**
   * @param {string} location
   * @param {number} capacity
   * @param {number} costPerDay
   * @param {boolean} available
   * @param {Array<OfficeService>} services
   */
  constructor(
    id,
    location,
    capacity,
    costPerDay,
    available = true,
    services = []
  ) {
    this.id = id;
    this.location = location;
    this.capacity = capacity;
    this.costPerDay = costPerDay;
    this.available = available;
    this.services = services;
  }
}
