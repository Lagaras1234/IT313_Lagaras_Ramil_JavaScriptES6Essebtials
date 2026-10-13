import isPassing, { computeAverage } from "./gradeUtils.js";

const enrollees = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Simulate getting student data from a registrar API.
const getEnrollees = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(enrollees), 1000);
  });
};

async function generateReport() {
  try {
    const students = await getEnrollees();

    const results = students.map(
      ({ name, prelim, midterm, final }) => {
        const average = computeAverage(prelim, midterm, final);

        return {
          name,
          average,
          status: isPassing(average) ? "PASSING" : "PROBATION",
        };
      }
    );

    const passing = results.filter(
      (student) => student.status === "PASSING"
    );

    const probation = results.filter(
      (student) => student.status === "PROBATION"
    );

    const totalAverage = results.reduce(
      (sum, student) => sum + student.average,
      0
    ) / results.length;

    let studentCount = students.length;
    const [firstStudent, ...otherStudents] = students;
    const allStudents = [...students];

    console.log("=== IT313 Enrollment Eligibility Report ===");
    console.log(`Total enrollees: ${studentCount}`);
    console.log(`First enrollee: ${firstStudent.name}`);
    console.log(`Other enrollees: ${otherStudents.length}`);
    console.log(`Copied list: ${allStudents.length} records`);
    console.log("------------------------------------------");

    results.forEach(({ name, average, status }) => {
      console.log(
        `${name.padEnd(18)} - Average: ${average.toFixed(2)} - ${status}`
      );
    });

    console.log(`Class Average: ${totalAverage.toFixed(2)}`);
    console.log(`Passing: ${passing.length} / ${results.length}`);

  } catch (error) {
    console.error("Failed to retrieve enrollee data:", error.message);
  }
}

generateReport();