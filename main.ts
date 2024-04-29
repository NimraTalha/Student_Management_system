import inquirer from 'inquirer';

// Array to store student instances
const studentList: Student[] = [];

// Function to prompt for student details
function promptStudentDetails() {
    // Prompting for student details
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter course name:'
        },
        {
            type: 'input',
            name: 'fees',
            message: 'Enter fees amount:'
        }
    ]).then(answers => {
        // Destructuring answers object
        const { name, course, fees } = answers;

        // Creating a new student instance
        const student = new Student(name);

        // Enrolling the student in a course
        student.enroll_courses(course);

        // Paying fees for the student
        student.pay_fees(parseFloat(fees));

        // Adding the student to the list
        studentList.push(student);

        // Displaying student status
        student.show_status();

        // Prompt for adding another student
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'addAnother',
                message: 'Do you want to add another student?',
                default: true
            }
        ]).then(answer => {
            if (answer.addAnother) {
                // If user wants to add another student, prompt again
                promptStudentDetails();
            } else {
                // If not, display list of students
                displayAllStudents();
            }
        });
    });
}

// Function to display all student data
function displayAllStudents() {
    console.log("List of Students:");
    studentList.forEach(student => {
        console.log(`ID: ${student.id}, Name: ${student.name}, Courses: ${student.courses}, Balance: ${student.balance}`);
    });
}

// Start prompting for student details
promptStudentDetails();

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // initializing an empty array for courses
        this.balance = 1000;
    }

    // method to enroll a student in a course
    enroll_courses(course: string) {
        this.courses.push(course);
    }

    // method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }

    // method to pay student fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`${amount} Fees paid successfully for ${this.name}`);
    }

    // method to display student status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
