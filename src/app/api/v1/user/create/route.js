export async function POST() {
  return Response.json(
    { isTeapot: true, message: "I'm a teapot" },
    {
      status: 418,
    }
  );
}
