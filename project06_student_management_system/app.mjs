#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { v4 as uuidv4 } from "uuid";
let rainbowTitle;
let students = [];
let courses = [];
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
function welcome() {
    const msg = `Students Management`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
        rainbowTitle = chalkAnimation.rainbow("Welcome to Students Management System! (A CLI based system developed by amlakhani)");
    });
}
async function howToGuide() {
    console.log(`
    ${chalk.black.bgYellow("HOW TO USE?")}
    ${chalk.white("- Choose required operation from menu")}
  `);
}
async function askForOperation() {
    const answer = await inquirer.prompt({
        name: "operation",
        type: "list",
        message: "Choose the Option from below list",
        choices: [
            "See Students List",
            "See Courses List",
            "Add New Student",
            "Edit Student's Data",
            "Remove Student",
            "Add New Course",
            "Edit Course Data",
            "Delete Course",
            "Enroll Student in Course",
            "Unenroll Student from Course",
            "Show Student's Status",
            "Pay Student's Tuition Fee",
            "View Student's Balance",
            "Exit",
        ],
    });
    if (answer.operation === "Exit") {
        process.exit();
    }
    else if (answer.operation === "See Students List") {
        console.log(chalk.white.bgGreen("See Students List:\n"));
        if (!students.length) {
            console.log(chalk.blue("No students!\n"));
            askForOperation();
        }
        else {
            students.map((student, i) => {
                console.log(chalk.white(`${i + 1}: ${student.studentName} (ID: ${student.studentId})`));
            });
            console.log("\n");
            askForOperation();
        }
    }
    else if (answer.operation === "See Courses List") {
        console.log(chalk.white.bgGreen("See Courses List:\n"));
        if (!courses.length) {
            console.log(chalk.blue("List empty! Please add new courses.\n"));
            askForOperation();
        }
        else {
            courses.map((course, i) => {
                console.log(chalk.white(`${i + 1}: ${course.courseName} (ID: ${course.courseId})`));
            });
            console.log("\n");
            askForOperation();
        }
    }
    else if (answer.operation === "Add New Student") {
        console.log(chalk.white.bgGreen("Add New Student:\n"));
        const { studentName } = await inquirer.prompt({
            name: "studentName",
            type: "input",
            message: `Enter Student's Name:`,
        });
        const spinner = createSpinner("adding new student, please wait...").start();
        await sleep();
        if (!studentName) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student Name should not be empty!\n"),
            });
        }
        else {
            students.push({
                studentId: uuidv4(),
                studentName,
                courses: [],
                balance: 1200,
            });
            spinner.success({
                text: chalk.white(`Student added successfully!\n`),
            });
        }
        askForOperation();
    }
    else if (answer.operation === "Add New Course") {
        console.log(chalk.white.bgGreen("Add New Course:\n"));
        const { courseName } = await inquirer.prompt({
            name: "courseName",
            type: "input",
            message: `Enter Course Name:`,
        });
        const spinner = createSpinner("adding new course, please wait...").start();
        await sleep();
        if (!courseName) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Course Name should not be empty!\n"),
            });
        }
        else {
            courses.push({
                courseId: uuidv4(),
                courseName,
            });
            spinner.success({
                text: chalk.white(`Course added successfully!\n`),
            });
        }
        askForOperation();
    }
    else if (answer.operation === "Remove Student") {
        console.log(chalk.white.bgGreen("Remove Student:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const spinner = createSpinner("removing student, please wait...").start();
        await sleep();
        const isStudentExist = students.find((student) => student.studentId === studentId);
        if (!isStudentExist) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else {
            students = [...students].filter((student) => student.studentId !== studentId);
            spinner.success({
                text: chalk.white("Successfully removed the student!\n"),
            });
        }
        askForOperation();
    }
    else if (answer.operation === "Delete Course") {
        console.log(chalk.white.bgGreen("Delete Course:\n"));
        const { courseId } = await inquirer.prompt({
            name: "courseId",
            type: "input",
            message: `Please enter Course ID:`,
        });
        const spinner = createSpinner("deleting course, please wait...").start();
        await sleep();
        const isCourseExist = courses.find((course) => course.courseId === courseId);
        if (!isCourseExist) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Course doesn't exist!\n"),
            });
        }
        else {
            let isAnyStudentEnrolled = false;
            students.forEach((student) => {
                const { courses } = student;
                const isExist = courses.find((course) => course === courseId);
                isAnyStudentEnrolled = !!isExist;
            });
            if (isAnyStudentEnrolled) {
                spinner.error({
                    text: chalk.whiteBright.bgRed("Please unenroll student(s) from this course before deleting!\n"),
                });
            }
            else {
                courses = [...courses].filter((course) => course.courseId !== courseId);
                spinner.success({
                    text: chalk.white("Successfully deleted the course!\n"),
                });
            }
        }
        askForOperation();
    }
    else if (answer.operation === "Edit Student's Data") {
        console.log(chalk.white.bgGreen("Edit Student's Data:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const spinner = createSpinner("getting student's data, please wait...").start();
        await sleep();
        const isStudentExist = students.findIndex((student) => student.studentId === studentId);
        if (isStudentExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else {
            spinner.stop();
            const { studentName } = await inquirer.prompt({
                name: "studentName",
                type: "input",
                message: `Enter Student's Name:`,
                default() {
                    return students[isStudentExist].studentName;
                },
            });
            const { balance } = await inquirer.prompt({
                name: "balance",
                type: "number",
                message: `Enter Student's Balance:`,
                default() {
                    return students[isStudentExist].balance;
                },
            });
            const spinner2 = createSpinner("updating student's data, please wait...").start();
            await sleep();
            const updatedStudents = [...students];
            updatedStudents[isStudentExist] = {
                ...updatedStudents[isStudentExist],
                studentName,
                balance,
            };
            students = updatedStudents;
            spinner2.success({
                text: chalk.white("Successfully updated student's data!\n"),
            });
        }
        askForOperation();
    }
    else if (answer.operation === "Edit Course Data") {
        console.log(chalk.white.bgGreen("Edit Course Data:\n"));
        const { courseId } = await inquirer.prompt({
            name: "courseId",
            type: "input",
            message: `Please enter Course ID:`,
        });
        const spinner = createSpinner("getting course data, please wait...").start();
        await sleep();
        const isCourseExist = courses.findIndex((course) => course.courseId === courseId);
        if (isCourseExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Course doesn't exist!\n"),
            });
        }
        else {
            spinner.stop();
            const { courseName } = await inquirer.prompt({
                name: "courseName",
                type: "input",
                message: `Enter Course's Name:`,
                default() {
                    return courses[isCourseExist].courseName;
                },
            });
            const spinner2 = createSpinner("updating course data, please wait...").start();
            await sleep();
            const updatedCourses = [...courses];
            updatedCourses[isCourseExist] = {
                ...updatedCourses[isCourseExist],
                courseName,
            };
            courses = updatedCourses;
            spinner2.success({
                text: chalk.white("Successfully updated course data!\n"),
            });
        }
        askForOperation();
    }
    else if (answer.operation === "Enroll Student in Course") {
        console.log(chalk.white.bgGreen("Enroll Student in Course:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const { courseId } = await inquirer.prompt({
            name: "courseId",
            type: "input",
            message: `Please enter Course ID to enroll:`,
        });
        const spinner = createSpinner("enrolling student, please wait...").start();
        await sleep();
        const isStudentExist = students.findIndex((student) => student.studentId === studentId);
        const isCourseExist = courses.findIndex((course) => course.courseId === courseId);
        if (isStudentExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else if (isCourseExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Course doesn't exist!\n"),
            });
        }
        else {
            const updatedStudents = [...students];
            const updatedCourses = [...updatedStudents[isStudentExist]["courses"]];
            updatedCourses.push(courses[isCourseExist].courseId);
            updatedStudents[isStudentExist] = {
                ...updatedStudents[isStudentExist],
                courses: updatedCourses,
            };
            students = updatedStudents;
            spinner.success({
                text: chalk.white("Successfully enrolled student in course!\n"),
            });
        }
        askForOperation();
    }
    else if (answer.operation === "Unenroll Student from Course") {
        console.log(chalk.white.bgGreen("Unenroll Student from Course:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const { courseId } = await inquirer.prompt({
            name: "courseId",
            type: "input",
            message: `Please enter Course ID to enroll:`,
        });
        const spinner = createSpinner("un-enrolling student, please wait...").start();
        await sleep();
        const isStudentExist = students.findIndex((student) => student.studentId === studentId);
        const isCourseExist = courses.findIndex((course) => course.courseId === courseId);
        if (isStudentExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else if (isCourseExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Course doesn't exist!\n"),
            });
        }
        else {
            const updatedStudents = [...students];
            const updatedCourses = [...updatedStudents[isStudentExist]["courses"]];
            const cIndex = updatedCourses.findIndex((course) => course === courses[isCourseExist].courseId);
            if (cIndex === -1) {
                spinner.error({
                    text: chalk.whiteBright.bgRed("Student is not enrolled in this course!\n"),
                });
            }
            else {
                updatedCourses.splice(cIndex, 1);
                updatedStudents[isStudentExist] = {
                    ...updatedStudents[isStudentExist],
                    courses: updatedCourses,
                };
                students = updatedStudents;
                spinner.success({
                    text: chalk.white("Successfully unenrolled student from course!\n"),
                });
            }
        }
        askForOperation();
    }
    else if (answer.operation === "Show Student's Status") {
        console.log(chalk.white.bgGreen("Show Student's Status:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const spinner = createSpinner("getting student's data, please wait...").start();
        await sleep();
        const isStudentExist = students.findIndex((student) => student.studentId === studentId);
        if (isStudentExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else {
            spinner.success({
                text: chalk.white("Successfully fetched student's data!\n"),
            });
            console.log(`
        ${chalk.black.bgYellow("Student's Data:")}
        ${chalk.white(`- ID: ${students[isStudentExist].studentId}`)}
        ${chalk.white(`- Name: ${students[isStudentExist].studentName}`)}
        ${chalk.white(`- Balance: ${students[isStudentExist].balance}`)}
        ${chalk.white(`- Enrolled Courses: ${students[isStudentExist].courses
                .map((course) => courses.find((c) => c.courseId === course).courseName)
                .join(", ")}`)}
      `);
        }
        askForOperation();
    }
    else if (answer.operation === "Pay Student's Tuition Fee") {
        console.log(chalk.white.bgGreen("Pay Student's Tuition Fee:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const spinner = createSpinner("getting student's data, please wait...").start();
        await sleep();
        const isStudentExist = students.findIndex((student) => student.studentId === studentId);
        if (isStudentExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else {
            if (students[isStudentExist].balance <= 0) {
                spinner.success({
                    text: chalk.whiteBright.bgRed("Student's fee is already paid!\n"),
                });
            }
            else {
                spinner.success({
                    text: chalk.white("Successfully fetched student's data!\n"),
                });
                console.log(`
          ${chalk.white(`- Current Balance: ${chalk.green(students[isStudentExist].balance)}`)}
        `);
                const answer = await inquirer.prompt({
                    name: "operation",
                    type: "list",
                    message: "Choose the Option from below list",
                    choices: ["Pay Now", "Pay Later"],
                });
                if (answer.operation === "Pay Now") {
                    const spinner2 = createSpinner("transaction in progress, please wait...").start();
                    await sleep();
                    const updatedStudents = [...students];
                    updatedStudents[isStudentExist] = {
                        ...updatedStudents[isStudentExist],
                        balance: 0,
                    };
                    students = updatedStudents;
                    spinner2.success({
                        text: chalk.white("Successfully paid student's fee!\n"),
                    });
                }
            }
        }
        askForOperation();
    }
    else if (answer.operation === "View Student's Balance") {
        console.log(chalk.white.bgGreen("View Student's Balance:\n"));
        const { studentId } = await inquirer.prompt({
            name: "studentId",
            type: "input",
            message: `Please enter Student's ID:`,
        });
        const spinner = createSpinner("getting student's data, please wait...").start();
        await sleep();
        const isStudentExist = students.findIndex((student) => student.studentId === studentId);
        if (isStudentExist === -1) {
            spinner.error({
                text: chalk.whiteBright.bgRed("Student doesn't exist!\n"),
            });
        }
        else {
            spinner.success({
                text: chalk.white("Successfully fetched student's data!\n"),
            });
            console.log(`
        ${chalk.white(`- Student's Balance: ${chalk.green(students[isStudentExist].balance)}`)}
      `);
        }
        askForOperation();
    }
}
try {
    console.clear();
    welcome();
    await sleep();
    rainbowTitle.stop();
    await howToGuide();
    await askForOperation();
}
catch (error) {
    console.log("ERROR: ", error);
}
//# sourceMappingURL=app.mjs.map