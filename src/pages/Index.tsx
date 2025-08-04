// monster-ag-landing/src/pages/index.tsx

import { useState } from "react";
import { UploadCloud, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Index() {
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [packageModalOpen, setPackageModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E6F7FF] text-[#1D2D5D] px-6 py-12 font-sans">
      <header className="text-center mb-12">
        <Image
          src="/monster-ag-logo.png"
          alt="Monster AG Logo"
          width={96}
          height={96}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold">DSGVOMonster</h1>
        <p className="text-lg text-gray-700 mt-2 max-w-xl mx-auto">
          Lade deine Datenschutzerklärung hoch oder gib deine Website an – wir analysieren sie automatisch.
        </p>
      </header>

      {/* Drei Karten */}
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
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setFileUploaded(file);
          }}
          className="block w-full my-4"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Deine E-Mail-Adresse"
          className="block w-full my-4 px-4 py-2 border rounded"
        />
        <Button
          className="bg-[#23B1EC] hover:bg-[#1D2D5D] text-white px-6 py-3 rounded"
          onClick={() => setPackageModalOpen(true)}
        >
          Jetzt Website prüfen lassen
        </Button>
      </section>
    </div>
  );
}
