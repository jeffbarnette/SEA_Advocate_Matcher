import db from "..";
import { advocates } from "../schema";

const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

// Deterministic specialty assignment based on advocate index
const getSpecialtiesForAdvocate = (index: number) => {
  // Use a simple hash-like function to get consistent specialties per advocate
  const hash = index * 7 + 13; // Simple hash
  const numSpecialties = (hash % 3) + 1; // 1-3 specialties
  
  // Create a deterministic shuffle based on the hash
  const shuffled = [...specialties].sort((a, b) => {
    const aHash = a.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const bHash = b.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (aHash + hash) % 2 === 0 ? 1 : -1;
  });
  
  return shuffled.slice(0, numSpecialties);
};

const advocateData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: getSpecialtiesForAdvocate(0),
    yearsOfExperience: 10,
    phoneNumber: "5551234567",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 8,
    phoneNumber: "5559876543",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 5,
    phoneNumber: "5554567890",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    city: "Houston",
    degree: "MD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 12,
    phoneNumber: "5556543210",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    city: "Phoenix",
    degree: "PhD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 7,
    phoneNumber: "5553210987",
  },
  {
    firstName: "Chris",
    lastName: "Martinez",
    city: "Philadelphia",
    degree: "MSW",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 9,
    phoneNumber: "5557890123",
  },
  {
    firstName: "Jessica",
    lastName: "Taylor",
    city: "San Antonio",
    degree: "MD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 11,
    phoneNumber: "5554561234",
  },
  {
    firstName: "David",
    lastName: "Harris",
    city: "San Diego",
    degree: "PhD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 6,
    phoneNumber: "5557896543",
  },
  {
    firstName: "Laura",
    lastName: "Clark",
    city: "Dallas",
    degree: "MSW",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 4,
    phoneNumber: "5550123456",
  },
  {
    firstName: "Daniel",
    lastName: "Lewis",
    city: "San Jose",
    degree: "MD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 13,
    phoneNumber: "5553217654",
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    city: "Austin",
    degree: "PhD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 10,
    phoneNumber: "5551238765",
  },
  {
    firstName: "James",
    lastName: "King",
    city: "Jacksonville",
    degree: "MSW",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 5,
    phoneNumber: "5556540987",
  },
  {
    firstName: "Megan",
    lastName: "Green",
    city: "San Francisco",
    degree: "MD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 14,
    phoneNumber: "5559873456",
  },
  {
    firstName: "Joshua",
    lastName: "Walker",
    city: "Columbus",
    degree: "PhD",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 9,
    phoneNumber: "5556781234",
  },
  {
    firstName: "Amanda",
    lastName: "Hall",
    city: "Fort Worth",
    degree: "MSW",
    specialties: getSpecialtiesForAdvocate(3),
    yearsOfExperience: 3,
    phoneNumber: "5559872345",
  },
];

export { advocateData };
