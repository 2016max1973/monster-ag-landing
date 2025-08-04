import { useState } from "react";

export default function Index() {
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#E6F7FF] text-[#1D2D5D] px-6 py-12 text-center font-sans">
      <img
        src="/monster-ag-logo.png"
        alt="Monster AG Logo"
        className="w-48 h-48 mx-auto mb-6 object-contain"
      />
      <h1 className="text-5xl font-bold mb-2">DSVGOMonster</h1>
      <p className="text-gray-700 max-w-xl mx-auto mb-10">
        Lade deine Datenschutzerklärung hoch und gib deine E-Mail-Adresse an.
        Du bekommst eine DSGVO-Ampelbewertung direkt per Mail.
      </p>

      <div className="bg-white rounded-xl shadow-lg max-w-xl mx-auto p-6">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setFileUploaded(file);
          }}
          className="w-full border mb-4 p-2 rounded"
        />

        <input
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border mb-4 p-2 rounded"
        />

        <button
          disabled={!fileUploaded || !email}
          onClick={() => alert("Datei & E-Mail empfangen – Bewertung folgt per Mail.")}
          className="w-full bg-[#23B1EC] hover:bg-[#1D2D5D] text-white font-bold py-3 px-6 rounded transition"
        >
          Jetzt prüfen lassen
        </button>
      </div>

      <footer className="text-sm text-gray-500 mt-12">
        Powered by Monster AG · DSGVO geprüft, automatisiert, erklärt.
      </footer>
    </div>
  );
}
