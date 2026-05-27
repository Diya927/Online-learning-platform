function RecommendedCourses() {
  const userInterest = "Web Development";

  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      category: "Artificial Intelligence",
    },
    {
      id: 3,
      title: "Advanced JavaScript",
      category: "Web Development",
    },
  ];

  const recommended = courses.filter(
    (course) => course.category === userInterest
  );

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Recommended Courses</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {recommended.map((course) => (
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

            <p>{course.category}</p>

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

export default RecommendedCourses;