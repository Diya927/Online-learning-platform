import { useEffect, useState } from "react";
import API from "../services/api";
function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    useEffect(() => {
  

  fetchCourses();
  fetchRecommended();
  fetchMyCourses();
}, []);
const fetchCourses = async () => {
  try {
    const res = await API.get("/courses");
    console.log("FULL RESPONSE:", res);
    console.log("DATA ONLY:", res.data);
    console.log("FIRST COURSE:", res.data[0]);
    setCourses(res.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchRecommended = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    setRecommended(res.data);
  } catch (error) {
    console.log(error);
  }
};
const enrollCourse = async (courseId) => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/enrollments/enroll",
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Enrolled Successfully!");

    // 🔥 refresh data instantly
    fetchMyCourses();
    fetchRecommended();
  } catch (error) {
    console.log(error);
  }
};
const fetchMyCourses = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/enrollments/my-courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMyCourses(res.data);
  } catch (error) {
    console.log(error);
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

    

    fetchMyCourses(); // refresh UI
  } catch (error) {
    console.log(error);
  }
};
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
const token = localStorage.getItem("token");

if (!token) {
  return <h2>Please login first</h2>;
}
return (
<div style={{ padding: "20px" }}>
  <h1>Online Learning Platform</h1>
  <h2>Welcome Student 👋</h2>
  <button
  onClick={logout}
  style={{
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Logout
</button>
  <div
    style={{
      display: "flex",
      gap: "20px",
      marginTop: "20px",
      flexWrap: "wrap",
    }}
  >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Courses</h3>
          <p>{courses.length} Courses Available</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Enrolled Courses</h3>
          <p>{myCourses.length} Courses</p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Progress</h3>
          <p>{myCourses.length * 10}% Completed</p>
        </div>
      </div>
      <h2 style={{ marginTop: "30px" }}>All Courses</h2>

<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
  {courses.map((course) => (
    <div
      key={course._id}
      style={{
        backgroundColor: "#f5f5f5",
        padding: "15px",
        width: "250px",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
      
    >
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p><b>Category:</b> {course.category}</p>
      <p><b>Level:</b> {course.level}</p>
      <button
      onClick={() => enrollCourse(course._id)}
      style={{
        marginTop: "10px",
        padding: "8px",
        backgroundColor: "#1890ff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
        }}
      >
        Enroll Now
      </button>
    </div>
  ))}
</div>
<h2 style={{ marginTop: "30px" }}>Recommended For You 🎯</h2>

<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
  {recommended.length === 0 && (
  <p>No recommendations available</p>
)}
  {recommended.map((course) => (
    <div
      key={course._id}
      style={{
        backgroundColor: "#e6f7ff",
        padding: "15px",
        width: "250px",
        borderRadius: "10px",
        border: "1px solid #91d5ff",
      }}
    >
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p><b>Category:</b> {course.category}</p>
    </div>
  ))}
</div>
<h2 style={{ marginTop: "30px" }}>My Courses 📚</h2>

<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
  {myCourses.length === 0 && (
  <p>No enrolled courses yet</p>
  )}
  {myCourses.map((item) => (
    <div
      key={item._id}
      style={{
        backgroundColor: "#fffbe6",
        padding: "15px",
        width: "250px",
        borderRadius: "10px",
        border: "1px solid #ffe58f",
      }}
    >
      <h3>{item.course.title}</h3>
      <p>{item.course.description}</p>

      <p><b>Progress:</b> {item.progress || 0}%</p>

<div
  style={{
    width: "100%",
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    marginTop: "5px",
  }}
>
  <div
    style={{
      width: `${item.progress || 0}%`,
      height: "100%",
      backgroundColor: "#52c41a",
      borderRadius: "5px",
    }}
  ></div>
</div>
<button
  onClick={() => updateProgress(item._id, (item.progress || 0) + 10)}
  style={{
    marginTop: "10px",
    padding: "6px",
    backgroundColor: "#1890ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Increase Progress
</button>
    </div>
  ))}
</div>
    
    </div>
    
  );
}


export default Dashboard;