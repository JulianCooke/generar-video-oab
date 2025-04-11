// app/layout.js

export const metadata = {
  title: 'Generar Video de Propiedad',
  description: 'Herramienta para generar videos de propiedades de Alvarez Barrios',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
