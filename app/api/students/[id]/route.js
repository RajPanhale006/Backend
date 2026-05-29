import { getDb } from "../../../lib/db";


/* ================= PUT ================= */

export async function PUT(req, { params }) {

  const { id } = params;

  // get updated data
  const body = await req.json();

  const { name, email, course } = body;
  
    const db = getDb();

  // update student
  await db.query(
    "UPDATE students SET name=?, email=?, course=? WHERE id=?",
    [name, email, course, id]
  );

  return Response.json({
    message: "Student Updated"
  });
}


/* ================= DELETE ================= */

export async function DELETE(req, { params }) {

  const { id } = params;

    const db = getDb();
  // delete student
  await db.query(
    "DELETE FROM students WHERE id=?",
    [id]
  );

  return Response.json({
    message: "Student Deleted"
  });
}