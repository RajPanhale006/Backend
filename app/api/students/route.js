import { getDb } from "../../lib/db";


/* ================= GET ================= */

export async function GET() {

    const db = getDb();
  // fetch all students
  const [rows] = await db.query(
    "SELECT * FROM students"
  );

  return Response.json(rows);

}


/* ================= POST ================= */

export async function POST(req) {

  // get frontend data
  const body = await req.json();

  const { name, email, course } = body;

  
    const db = getDb();

  // insert into database
  await db.query(
    "INSERT INTO students(name, email, course) VALUES (?, ?, ?)",
    [name, email, course]
  );

  return Response.json({
    message: "Student Added"
  });
}