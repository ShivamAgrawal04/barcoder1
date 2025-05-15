export async function rewrites() {
  return [
    {
      source: "/api/:path*",
      destination: "https://barcoder1.onrender.com/api/:path*", // backend domain
    },
  ];
}
