import { useState } from "react";
import { UploadCloud, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#E6F7FF] text-[#1D2D5D] px-6 py-12 font-sans">
      {/* Logo + Headline */}
      <header className="text-center mb-10">
        <img
          src="/monster-ag-logo.png"
          alt="Monster AG Logo"
          className="w-40 h-40 mx-auto mb-4 object-contain"
        />
        <h1 className="text-5xl font-extrabold tracking-tight">DSGVOMonster</h1>
        <p className="text-lg text-gray-700 mt-2 max-w-xl mx-auto">
          Lade deine Datenschutzerklärung hoch, gib deine E-Mail an –
          und erhalte automatisch eine Bewertung per Mail.
        </p>
      </header>

      {/* 3 Karten */}
      <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <UploadCloud className="w-8 h-8 text-[#1D2D5D] mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">Datenschutz</h2>
          <p className="text-sm text-gray-600">
            DSGVO-Konformität deiner Seite – geprüft, bewertet und dokumentiert.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-[#FF9900] mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">E-Mail</h2>
          <p className="text-sm text-gray-600">
            Gib deine E-Mail-Adresse an – du erhältst automatisch deine Bewertung.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">Ergebnis</h2>
          <p className="text-sm text-gray-600">
            Ampel-Logik mit Ergebnis-PDF & Mail-Trigger (automatisiert oder manuell).
          </p>
        </div>
      </section>

      {/* Upload */}
      <section className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto text-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={() => setFileUploaded(true)}
          className="mb-4 block mx-auto"
        />
        <input
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded"
        />
        <Button
          onClick={() => alert("Wird bald versendet 💌")}
          disabled={!fileUploaded || !email}
        >
          Jetzt prüfen lassen
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20">
        Powered by Monster AG · DSGVO geprüft, automatisiert, erklärt.
      </footer>
    </div>
  );
}
