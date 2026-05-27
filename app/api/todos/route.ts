export async function GET() {

  const todos = [
    {
      id: 1,
      title: "Learn Next.js"
    },
    {
      id: 2,
      title: "Learn JWT"
    }
  ];

  return Response.json({
    success: true,
    todos
  });
}