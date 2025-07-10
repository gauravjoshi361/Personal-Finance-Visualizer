import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Component {...pageProps} />
      <h2>made by @Amank Lingwal</h2>
    </main>
  );
}