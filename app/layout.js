import "./globals.css";

export const metadata = {
  title: "Messenger Clone",
  description: "Facebook Messenger Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
