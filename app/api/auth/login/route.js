import { db } from "@/lib/db";
import { generateToken }
from "@/lib/jwt";

export async function POST(req) {

  try {

    const body =
      await req.json();

    const {
      email,
      password
    } = body;

    // fetch user
    const [rows] = await db.query(
      `
      SELECT * FROM users
      WHERE email = ?
      `,
      [email]
    );

    // user not found
    if(rows.length === 0) {

      return Response.json({
        success: false,
        message: "User not found"
      });
    }

    const user = rows[0];

    // password check
    if(password !== user.password) {

      return Response.json({
        success: false,
        message: "Invalid password"
      });
    }

    // generate token
    const token =
      generateToken(user);

    const response =
      Response.json({
        success: true
      });

    // set cookie
    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/"
      }
    );

    return response;

  } catch(err) {

    return Response.json({
      success: false,
      message: err.message
    });
  }
}