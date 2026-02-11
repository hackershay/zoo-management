export interface Animal {
  id: number;
  speciesId: number;
  enclosureId: number;
  name: string;
  gender: string;
  acquisitionDate: string;
  dateOfBirth: string;
}

export interface Species {
  id: number;
  commonName: string;
  scientificName: string;
  conservationStatus: string;
  habitatType: string;
  dietType: string;
}

export interface Enclosure {
  id: number;
  type: string;
  name: string;
  location: string;
  areaSqm: number;
}

export interface Staff {
  id: number;
  name: string;
  salary: number;
  hireDate: string;
  departmentId: number;
  phone: string;
  email: string;
}

export interface Department {
  id: number;
  name: string;
  managerId: number | null;
  location: string;
  contactNo: string;
}

export interface MedicalRecord {
  id: number;
  animalId: number;
  staffId: number;
  examinationId: number;
  treatment: string;
  healthStatus: string;
}

export interface Visitor {
  id: number;
  membershipType: string;
  name: string;
  email: string;
  phone: string;
}

export interface Ticket {
  id: number;
  visitorId: number;
  visitDate: string;
  ticketType: string;
  price: number;
}

export interface Maintenance {
  id: number;
  date: string;
  type: string;
  cost: number;
  enclosureId: number;
  staffId: number;
}

export const animals: Animal[] = [
  { id: 101, speciesId: 1, enclosureId: 10, name: "Leo", gender: "Male", acquisitionDate: "10-MAY-22", dateOfBirth: "15-MAR-20" },
  { id: 102, speciesId: 2, enclosureId: 11, name: "Cheeto", gender: "Male", acquisitionDate: "27-JAN-19", dateOfBirth: "10-JUN-06" },
  { id: 103, speciesId: 3, enclosureId: 12, name: "Layla", gender: "Female", acquisitionDate: "04-SEP-13", dateOfBirth: "21-JUL-09" },
  { id: 14, speciesId: 4, enclosureId: 13, name: "Oogway", gender: "Male", acquisitionDate: "14-NOV-09", dateOfBirth: "01-APR-89" },
  { id: 15, speciesId: 5, enclosureId: 14, name: "Serhpa", gender: "Female", acquisitionDate: "28-MAR-21", dateOfBirth: "14-DEC-19" },
  { id: 16, speciesId: 6, enclosureId: 15, name: "Gator", gender: "Female", acquisitionDate: "23-FEB-15", dateOfBirth: "09-MAY-01" },
  { id: 17, speciesId: 7, enclosureId: 16, name: "Cassey", gender: "Female", acquisitionDate: "11-NOV-22", dateOfBirth: "17-AUG-17" },
  { id: 18, speciesId: 8, enclosureId: 17, name: "All Mighty", gender: "Male", acquisitionDate: "19-SEP-22", dateOfBirth: "24-JUN-19" },
  { id: 19, speciesId: 9, enclosureId: 18, name: "ireene", gender: "Male", acquisitionDate: "29-JAN-20", dateOfBirth: "10-JUL-24" },
  { id: 20, speciesId: 10, enclosureId: 19, name: "Sheela", gender: "Female", acquisitionDate: "04-APR-12", dateOfBirth: "08-DEC-15" },
];

export const species: Species[] = [
  { id: 1, commonName: "Lion", scientificName: "Panthera leo", conservationStatus: "Vulnerable", habitatType: "Savannah", dietType: "Carnivore" },
  { id: 2, commonName: "Cheetah", scientificName: "Acinonyx jubatus", conservationStatus: "Vulnerable", habitatType: "Savannah", dietType: "Carnivore" },
  { id: 3, commonName: "Bengal Tiger", scientificName: "Panthera tigris", conservationStatus: "Endangered", habitatType: "Tropical Rainforests", dietType: "Carnivore" },
  { id: 4, commonName: "Tortoise", scientificName: "Testudinidae", conservationStatus: "Vulnerable", habitatType: "Grasslands", dietType: "Omnivore" },
  { id: 5, commonName: "Green Anaconda", scientificName: "Eunectes murinus", conservationStatus: "Common", habitatType: "Swamps", dietType: "Carnivore" },
  { id: 6, commonName: "Saltwater Crocodile", scientificName: "Crocodylus porosus", conservationStatus: "Common", habitatType: "Swamps", dietType: "Carnivore" },
  { id: 7, commonName: "Cassowaries", scientificName: "Struthio casuarius", conservationStatus: "Common", habitatType: "Lowlands", dietType: "Herbivore" },
  { id: 8, commonName: "Bald Eagle", scientificName: "Haliaeetus leucocephalus", conservationStatus: "Common", habitatType: "Forests", dietType: "Carnivore" },
  { id: 9, commonName: "Toucan", scientificName: "Andigena laminirostris", conservationStatus: "Vulnerable", habitatType: "Tropical Rainforests", dietType: "Herbivore" },
  { id: 10, commonName: "Zebra", scientificName: "Equus quagga", conservationStatus: "Common", habitatType: "Savannah", dietType: "Herbivore" },
];

export const enclosures: Enclosure[] = [
  { id: 10, type: "Open", name: "Lion Den", location: "North Zone", areaSqm: 500 },
  { id: 11, type: "Open", name: "Cheetah Grasslands", location: "North Zone", areaSqm: 600 },
  { id: 12, type: "Open", name: "Tiger Taiga", location: "North Zone", areaSqm: 400 },
  { id: 13, type: "Semi-Aquatic", name: "The Shellter", location: "East Zone", areaSqm: 70 },
  { id: 14, type: "Semi-Aquatic", name: "Rio Amazonas", location: "East Zone", areaSqm: 100 },
  { id: 15, type: "Semi-Aquatic", name: "Croco Park", location: "East Zone", areaSqm: 250 },
  { id: 16, type: "Closed", name: "Dino Birds", location: "South Zone", areaSqm: 80 },
  { id: 17, type: "Closed", name: "Freedom Zone", location: "South Zone", areaSqm: 50 },
  { id: 18, type: "Closed", name: "Big Bills", location: "South Zone", areaSqm: 50 },
  { id: 19, type: "Open", name: "Black n White", location: "South Zone", areaSqm: 250 },
];

export const staff: Staff[] = [
  { id: 101, name: "Alex Morgan", salary: 35000, hireDate: "15-JAN-20", departmentId: 1, phone: "9876500011", email: "alex.morgan@zoo.com" },
  { id: 102, name: "Jordan Lee", salary: 40000, hireDate: "20-MAR-19", departmentId: 2, phone: "9876500022", email: "jordan.lee@zoo.com" },
  { id: 103, name: "Taylor Smith", salary: 38000, hireDate: "10-JUN-21", departmentId: 3, phone: "9876500033", email: "taylor.smith@zoo.com" },
  { id: 104, name: "Chris Johnson", salary: 42000, hireDate: "05-SEP-18", departmentId: 4, phone: "9876500044", email: "chris.johnson@zoo.com" },
  { id: 105, name: "Morgan Brown", salary: 36000, hireDate: "18-FEB-22", departmentId: 5, phone: "9876500055", email: "morgan.brown@zoo.com" },
  { id: 106, name: "Dr. Casey Wilson", salary: 55000, hireDate: "25-NOV-17", departmentId: 6, phone: "9876500066", email: "casey.wilson@zoo.com" },
  { id: 107, name: "Jamie Carter", salary: 30000, hireDate: "12-JUL-20", departmentId: 7, phone: "9876500077", email: "jamie.carter@zoo.com" },
  { id: 108, name: "Riley Anderson", salary: 32000, hireDate: "30-AUG-21", departmentId: 8, phone: "9876500088", email: "riley.anderson@zoo.com" },
  { id: 109, name: "Avery Thomas", salary: 34000, hireDate: "01-DEC-19", departmentId: 9, phone: "9876500099", email: "avery.thomas@zoo.com" },
  { id: 110, name: "Sam Patel", salary: 37000, hireDate: "10-OCT-20", departmentId: 10, phone: "9876500100", email: "sam.patel@zoo.com" },
];

export const departments: Department[] = [
  { id: 1, name: "Animal Care Department", managerId: null, location: "North Zone", contactNo: "0801000001" },
  { id: 2, name: "Veterinary Services", managerId: null, location: "South Zone", contactNo: "0801000002" },
  { id: 3, name: "Maintenance Services", managerId: null, location: "East Zone", contactNo: "0801000003" },
  { id: 4, name: "Administration", managerId: null, location: "West Zone", contactNo: "0801000004" },
  { id: 5, name: "Security Services", managerId: null, location: "Central Zone", contactNo: "0801000005" },
  { id: 6, name: "Visitor Services", managerId: null, location: "Entrance Block", contactNo: "0801000006" },
  { id: 7, name: "Education and Outreach", managerId: null, location: "Learning Center", contactNo: "0801000007" },
  { id: 8, name: "Food and Supply Services", managerId: null, location: "Service Area", contactNo: "0801000008" },
  { id: 9, name: "Finance and Accounts", managerId: null, location: "Admin Block", contactNo: "0801000009" },
  { id: 10, name: "Research and Conservation", managerId: null, location: "Research Wing", contactNo: "0801000010" },
];

export const medicalRecords: MedicalRecord[] = [
  { id: 401, animalId: 101, staffId: 106, examinationId: 1, treatment: "Routine Checkup", healthStatus: "Healthy" },
  { id: 402, animalId: 102, staffId: 106, examinationId: 2, treatment: "Vaccination", healthStatus: "Healthy" },
  { id: 403, animalId: 103, staffId: 106, examinationId: 3, treatment: "Injury Treatment", healthStatus: "Recovering" },
  { id: 404, animalId: 14, staffId: 106, examinationId: 4, treatment: "Dental Examination", healthStatus: "Healthy" },
  { id: 405, animalId: 15, staffId: 106, examinationId: 5, treatment: "Fever Treatment", healthStatus: "Stable" },
  { id: 406, animalId: 16, staffId: 106, examinationId: 6, treatment: "Skin Treatment", healthStatus: "Recovering" },
  { id: 407, animalId: 17, staffId: 106, examinationId: 7, treatment: "Eye Checkup", healthStatus: "Healthy" },
  { id: 408, animalId: 18, staffId: 106, examinationId: 8, treatment: "Vaccination", healthStatus: "Healthy" },
  { id: 409, animalId: 19, staffId: 106, examinationId: 9, treatment: "Infection Treatment", healthStatus: "Stable" },
  { id: 410, animalId: 20, staffId: 106, examinationId: 10, treatment: "Routine Checkup", healthStatus: "Healthy" },
];

export const visitors: Visitor[] = [
  { id: 1, membershipType: "Regular", name: "Amit Kumar", email: "amit@gmail.com", phone: "9876543210" },
  { id: 2, membershipType: "Premium", name: "Joel Jacob", email: "joel@gmail.com", phone: "9123456789" },
  { id: 3, membershipType: "Regular", name: "Rahul Mehta", email: "rahul@gmail.com", phone: "9988776655" },
  { id: 4, membershipType: "VIP", name: "Darren Dcruz", email: "ananya@gmail.com", phone: "8899776655" },
  { id: 5, membershipType: "Regular", name: "Vikram Patel", email: "vikram@gmail.com", phone: "7766554433" },
  { id: 6, membershipType: "Premium", name: "Irene Ajay", email: "irene@gmail.com", phone: "6655443322" },
  { id: 7, membershipType: "Regular", name: "Arjun Nair", email: "arjun@gmail.com", phone: "5544332211" },
  { id: 8, membershipType: "VIP", name: "Kamuel Shawn", email: "kamuel@gmail.com", phone: "4433221100" },
  { id: 9, membershipType: "Regular", name: "Kenan Smith", email: "kenan@gmail.com", phone: "9988665544" },
  { id: 10, membershipType: "Premium", name: "Shreya Elizabeth", email: "shreya@gmail.com", phone: "8877665544" },
];

export const tickets: Ticket[] = [
  { id: 101, visitorId: 1, visitDate: "01-FEB-25", ticketType: "Adult", price: 150 },
  { id: 102, visitorId: 2, visitDate: "02-FEB-25", ticketType: "Child", price: 80 },
  { id: 103, visitorId: 3, visitDate: "03-FEB-25", ticketType: "Adult", price: 150 },
  { id: 104, visitorId: 4, visitDate: "03-FEB-25", ticketType: "VIP", price: 300 },
  { id: 105, visitorId: 5, visitDate: "04-FEB-25", ticketType: "Adult", price: 150 },
  { id: 106, visitorId: 6, visitDate: "04-FEB-25", ticketType: "Child", price: 80 },
  { id: 107, visitorId: 7, visitDate: "05-FEB-25", ticketType: "Adult", price: 150 },
  { id: 108, visitorId: 8, visitDate: "05-FEB-25", ticketType: "VIP", price: 300 },
  { id: 109, visitorId: 9, visitDate: "06-FEB-25", ticketType: "Adult", price: 150 },
  { id: 110, visitorId: 10, visitDate: "06-FEB-25", ticketType: "Premium", price: 200 },
];

export const maintenance: Maintenance[] = [
  { id: 201, date: "05-JAN-24", type: "Cleaning", cost: 5000, enclosureId: 10, staffId: 107 },
  { id: 202, date: "10-JAN-24", type: "Repair", cost: 12000, enclosureId: 11, staffId: 107 },
  { id: 203, date: "15-JAN-24", type: "Painting", cost: 8000, enclosureId: 12, staffId: 108 },
  { id: 204, date: "20-JAN-24", type: "Fence Repair", cost: 15000, enclosureId: 13, staffId: 108 },
  { id: 205, date: "25-JAN-24", type: "Water System", cost: 10000, enclosureId: 14, staffId: 107 },
  { id: 206, date: "01-FEB-24", type: "Lighting", cost: 6000, enclosureId: 15, staffId: 108 },
  { id: 207, date: "05-FEB-24", type: "Cleaning", cost: 4000, enclosureId: 10, staffId: 107 },
  { id: 208, date: "10-FEB-24", type: "Repair", cost: 9000, enclosureId: 11, staffId: 108 },
  { id: 209, date: "15-FEB-24", type: "Inspection", cost: 3000, enclosureId: 12, staffId: 107 },
  { id: 210, date: "20-FEB-24", type: "Renovation", cost: 20000, enclosureId: 13, staffId: 108 },
];

// Emoji icons for each species
export const speciesEmojis: Record<number, string> = {
  1: "🦁",
  2: "🐆",
  3: "🐅",
  4: "🐢",
  5: "🐍",
  6: "🐊",
  7: "🦅",
  8: "🦅",
  9: "🦜",
  10: "🦓",
};

// Background colors for enclosure cards
export const enclosureColors: Record<string, string> = {
  "Open": "from-green-600 to-green-800",
  "Semi-Aquatic": "from-cyan-600 to-blue-800",
  "Closed": "from-amber-700 to-amber-900",
};

export function getAnimalsByEnclosure(enclosureId: number): Animal[] {
  return animals.filter(a => a.enclosureId === enclosureId);
}

export function getSpeciesById(speciesId: number): Species | undefined {
  return species.find(s => s.id === speciesId);
}

export function getEnclosureById(enclosureId: number): Enclosure | undefined {
  return enclosures.find(e => e.id === enclosureId);
}

export function getMedicalRecordByAnimal(animalId: number): MedicalRecord | undefined {
  return medicalRecords.find(m => m.animalId === animalId);
}

export function getDepartmentById(deptId: number): Department | undefined {
  return departments.find(d => d.id === deptId);
}

export function getStaffById(staffId: number): Staff | undefined {
  return staff.find(s => s.id === staffId);
}
