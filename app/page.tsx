"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [editId, setEditId] = useState(null);


  /* ================= GET ================= */

  async function fetchStudents() {

    const res = await fetch("/api/students");

    const data = await res.json();

    setStudents(data);
  }


  useEffect(() => {
    fetchStudents();
  }, []);


  /* ================= POST ================= */

  async function addStudent() {

    await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    fetchStudents();

    setForm({
      name: "",
      email: "",
      course: ""
    });
  }


  /* ================= PUT ================= */

  async function updateStudent() {

    await fetch(`/api/students/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    fetchStudents();


    setForm({
      name: "",
      email: "",
      course: ""
    });
  }


  /* ================= DELETE ================= */

  async function deleteStudent(id) {

    await fetch(`/api/students/${id}`, {
      method: "DELETE"
    });

    fetchStudents();
  }


  /* ================= UI ================= */

  return (
    <div style={{ padding: "20px" }}>

      <h1>Student Management</h1>


      {/* FORM */}

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Course"
        value={form.course}
        onChange={(e) =>
          setForm({
            ...form,
            course: e.target.value
          })
        }
      />

      <br /><br />


      {/* ADD OR UPDATE BUTTON */}

      {
        editId ? (
          <button onClick={updateStudent}>
            Update Student
          </button>
        ) : (
          <button onClick={addStudent}>
            Add Student
          </button>
        )
      }

      <hr />


      {/* STUDENT LIST */}

      {
        students.map((student) => (

          <div key={student.id}>

            <h3>{student.name}</h3>

            <p>{student.email}</p>

            <p>{student.course}</p>


            {/* EDIT BUTTON */}

            <button
              onClick={() => {

                setEditId(student.id);

                setForm({
                  name: student.name,
                  email: student.email,
                  course: student.course
                });
              }}
            >
              Edit
            </button>


            {/* DELETE BUTTON */}

            <button
              onClick={() =>
                deleteStudent(student.id)
              }
            >
              Delete
            </button>

            <hr />

          </div>
        ))
      }

    </div>
  );
}