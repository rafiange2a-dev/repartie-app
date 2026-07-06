export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { content } = await req.json();

    const response = await fetch(`${process.env.ANTHROPIC_BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content }]
      })
    });

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
