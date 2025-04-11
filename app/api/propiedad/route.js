export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const codigo = searchParams.get('codigo');

  const apiUrl = `https://alvarezbarrios.com.ar/api/get_propiedad.php?codigo=${codigo}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error al obtener propiedad' }), {
      status: 500,
    });
  }
}
