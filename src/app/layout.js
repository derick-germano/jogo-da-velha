import "./globals.css";

export const metadata = {
  title: "Jogo da velha ",
  description: "Jogo da velha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
