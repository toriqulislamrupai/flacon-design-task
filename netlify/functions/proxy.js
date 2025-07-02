export async function handler(event) {
  const originalPath = event.path.replace("/.netlify/functions/proxy", "");

  // Dynamically choose backend port
  const isAPI = originalPath.startsWith("/api") || originalPath.startsWith("/product");
  const port = isAPI ? "9999" : "8888";
  const targetUrl = `http://157.230.240.97:${port}${originalPath}`;

  try {
    const res = await fetch(targetUrl);
    const contentType = res.headers.get("content-type") || "application/octet-stream";

    const isBinary = contentType.startsWith("image/") || contentType.includes("octet-stream");
    const body = isBinary
      ? Buffer.from(await res.arrayBuffer()).toString("base64")
      : await res.text();

    return {
      statusCode: res.status,
      body,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
      ...(isBinary ? { isBase64Encoded: true } : {}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Proxy Error", error: error.message }),
    };
  }
}
