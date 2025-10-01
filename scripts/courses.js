document.addEventListener("DOMContentLoaded", function () {
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
      completed: true,
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

    if (list.length === 0) {
      container.innerHTML = '<p class="no-courses">No courses found.</p>';
      creditTotal.textContent = "0";
      return;
    }

    list.forEach((course) => {
      const card = document.createElement("div");
      card.className = course.completed ? "course completed" : "course";
      card.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Status:</strong> ${
                  course.completed ? "Completed" : "In Progress"
                }</p>
            `;
      container.appendChild(card);
      total += course.credits;
    });

    creditTotal.textContent = total;
  }

  function showCourseDetails(course) {
    const courseData = [
      {
        WDD130: {
          title: "Web Fundamentals",
          subject: "WDD",
          number: "130",
          description:
            "An introduction to web development covering HTML, CSS, and basic web design principles.",
          certificate: "Web and Computer Programming",
          technology: ["HTML", "CSS"],
        },
      },
      {
        WDD131: {
          title: "Dynamic Web Fundamentals",
          subject: "WDD",
          number: "131",
          description:
            "An introduction to dynamic web development, covering server-side scripting, databases, and interactive web applications.",
          certificate: "Web and Computer Programming",
          technology: ["HTML", "CSS", "JavaScript"],
        },
      },
      {
        WDD231: {
          title: "Web Frontend Development I",
          subject: "WDD",
          number: "231",
          description:
            "A course focused on frontend web development, including advanced HTML, CSS, JavaScript, and responsive design techniques.",
          certificate: "Web and Computer Programming",
          technology: ["HTML", "CSS", "JavaScript"],
        },
      },
      {
        CSE110: {
          title: "Introduction to Programming",
          subject: "CSE",
          number: "110",
          description:
            "An introductory course to programming concepts using Python, covering variables, control structures, functions, and basic data structures.",
          certificate: "Web and Computer Programming",
          technology: ["Python"],
        },
      },
      {
        CSE111: {
          title: "Programming with Functions",
          subject: "CSE",
          number: "111",
          description:
            "A course that builds on introductory programming concepts, focusing on functions, modular programming, and problem-solving techniques using Python.",
          certificate: "Web and Computer Programming",
          technology: ["Python"],
        },
      },
      {
        CSE210: {
          title: "Programming with Classes",
          subject: "CSE",
          number: "210",
          description:
            "An intermediate programming course focusing on object-oriented programming concepts, including classes, inheritance, and polymorphism using Python.",
          certificate: "Web and Computer Programming",
          technology: ["C#"],
        },
      },
    ];

    const courseDetails = document.getElementById("course-details");
    const closeModal = document.getElementById("closeModal");
    const completed = document.getElementsByClassName("completed");

    const details = courseData[course.code];

    courseDetails.innerHTML = "";
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${details.subject} ${details.number}</h2>
    <h3>${details.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${details.certificate}</p>
    <p>${details.description}</p>
    <p><strong>Technologies</strong>: ${details.technology.join(", ")}</p>
    `;
    completed.addEventListener("click", () => {
      courseDetails.showModal();
    });
    courseDetails.showModal();

    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });
  }

  function filterCourses(type) {
    // Update button active states
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeButton = document.querySelector(
      `.filters button[data-filter="${type}"]`
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }

    if (type === "all") {
      displayCourses(courses);
    } else {
      displayCourses(courses.filter((c) => c.type === type));
    }
  }

  // Initialize buttons
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterCourses(btn.dataset.filter);
    });
  });

  // Initialize with all courses
  filterCourses("all");
});
