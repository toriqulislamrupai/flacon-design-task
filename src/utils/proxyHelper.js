export const proxifyImage = (url) => {
  if (!url) return "/placeholder.jpg";

  if (url.startsWith("http://157.230.240.97:8888")) {
    return url.replace("http://157.230.240.97:8888", "/.netlify/functions/proxy");
  }

  if (url.startsWith("/uploads") || url.startsWith("/media")) {
    return `/.netlify/functions/proxy${url}`;
  }

  return url; // already proxied or external (e.g., Cloudinary)
};
