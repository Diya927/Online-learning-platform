function Courses() {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Web Development",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      category: "Artificial Intelligence",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      category: "Cybersecurity",
      level: "Beginner",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Courses</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              width: "250px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{course.title}</h3>

            <p>
              <strong>Category:</strong> {course.category}
            </p>

            <p>
              <strong>Level:</strong> {course.level}
            </p>

            <button
              style={{
                backgroundColor: "#282c34",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;