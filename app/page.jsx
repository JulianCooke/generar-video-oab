'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function GenerarVideoPage() {
  const [codigo, setCodigo] = useState('');
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [generando, setGenerando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const buscarPropiedad = async () => {
    setCargando(true);
    setError(null);
    setPropiedad(null);
    setMensaje(null);

    try {
      const res = await fetch(`/api/propiedad?codigo=${codigo}`);
      if (!res.ok) throw new Error('Error al obtener la propiedad');
      const data = await res.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error('No se encontró la propiedad');
      }

      setPropiedad(data);
    } catch (err) {
      console.error(err);
      setError('Error al buscar propiedad');
    } finally {
      setCargando(false);
    }
  };

  const generarVideo = async () => {
    setGenerando(true);
    setMensaje(null);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/generar-video?codigo=${codigo}`);
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setMensaje(text);
    } catch (err) {
      console.error(err);
      setError('No se pudo generar el video. ¿Está abierto el ejecutor local?');
    } finally {
      setGenerando(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generar Video de Propiedad</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: 20 }}>
        <h1>Generar video de propiedad</h1>
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Código de propiedad"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            style={{ padding: 5, fontSize: 16, width: 200 }}
          />
          <button onClick={buscarPropiedad} style={{ padding: '6px 12px', marginLeft: 10 }}>
            Buscar
          </button>
        </div>

        {cargando && <p>Cargando propiedad...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

        {propiedad && (
          <div>
            <h2>Propiedad: {propiedad.tipo} en {propiedad.zona}</h2>
            <p><strong>Dirección:</strong> {propiedad.direccion}</p>
            <p><strong>Descripción:</strong> {propiedad.descripcion}</p>
            <p><strong>Precio:</strong> U$S {propiedad.precio}</p>

            <div style={{ marginTop: 10, marginBottom: 10 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const imagen = propiedad[`imagen${i}`];
                const imagenURL = imagen
                  ? `https://www.alvarezbarrios.com.ar/backend/${imagen}`
                  : null;
                return imagenURL ? (
                  <img
                    key={i}
                    src={imagenURL}
                    alt={`Imagen ${i}`}
                    style={{ width: '100px', marginRight: '10px' }}
                  />
                ) : null;
              })}
            </div>

            <button
              onClick={generarVideo}
              style={{ padding: '10px 20px', fontSize: 16 }}
              disabled={generando}
            >
              {generando ? 'Generando...' : 'Generar video'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
