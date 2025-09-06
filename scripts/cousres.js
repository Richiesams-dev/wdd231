const courses = [
  {
    code: "WDD130",
    name: "Web Fundamentals",
    credits: 2,
    type: "wdd",
    completed: true,
  },
  {
    code: "WDD131",
    name: "Dynamic Web Fundamentals",
    credits: 2,
    type: "wdd",
    completed: true,
  },
  {
    code: "WDD231",
    name: "Web Frontend Development I",
    credits: 2,
    type: "wdd",
    completed: false,
  },
  {
    code: "CSE110",
    name: "Introduction to Programming",
    credits: 2,
    type: "cse",
    completed: true,
  },
  {
    code: "CSE111",
    name: "Programming with Functions",
    credits: 2,
    type: "cse",
    completed: false,
  },
  {
    code: "CSE210",
    name: "Programming with Classes",
    credits: 2,
    type: "cse",
    completed: false,
  },
];

const container = document.getElementById("courses");
const creditTotal = document.getElementById("creditTotal");
const buttons = document.querySelectorAll(".filters button");

function displayCourses(list) {
  container.innerHTML = "";
  let total = 0;
  list.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course";
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;
    if (course.completed) {
      card.classList.add("completed");
    }
    container.appendChild(card);
    total += course.credits;
  });
  creditTotal.textContent = total;
}

function filterCourses(type) {
  if (type === "all") {
    displayCourses(courses);
  } else {
    displayCourses(courses.filter((c) => c.type === type));
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => filterCourses(btn.dataset.filter));
});

displayCourses(courses);
