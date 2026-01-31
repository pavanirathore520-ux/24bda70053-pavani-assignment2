export const metadata = {
  title: "SVG Drawing Tool",
  description: "Draw on an SVG canvas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
