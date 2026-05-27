import { useEffect, useState } from "react";
import API from "../services/api";

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/enrollments/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrollments(res.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error);
    }
  };
  const updateProgress = async (id, progress) => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.put(
      `/enrollments/progress/${id}`,
      { progress },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Progress Updated");

    fetchMyCourses(); // refresh data
  } catch (error) {
    console.log("PROGRESS ERROR:", error.response?.data || error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Courses 📚</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {enrollments.map((item) => (
          <div
            key={item._id}
            style={{
              backgroundColor: "white",
              padding: "15px",
              width: "250px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h3>{item.course.title}</h3>
            <p>{item.course.description}</p>

            <p>
              <b>Progress:</b> {item.progress || 0}%
            </p>
            <div
            style={{
                width: "100%",
                height: "10px",
                backgroundColor: "#ddd",
                borderRadius: "5px",
                marginTop: "8px",
                }}
            >
                <div
                style={{
                    width: `${item.progress || 0}%`,
                    height: "10px",
                    backgroundColor: "#4caf50",
                    borderRadius: "5px",
                    transition: "0.3s",
                }}
                ></div>
                </div>
            <button
            onClick={() => updateProgress(item._id, item.progress + 10)}
            style={{
                marginTop: "10px",
                padding: "8px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                }}
            >
  + Increase Progress
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCourses;