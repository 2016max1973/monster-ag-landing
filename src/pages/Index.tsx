import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import PackageSelectionModal from "@/components/PackageSelectionModal";

export default function Index() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [packageModalOpen, setPackageModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E6F7FF] text-[#1D2D5D] px-6 py-12 font-sans">
      {/* Logo und Produktname */}
      <header className="text-center mb-10">
        <img
          src="/monster-ag-logo.png"
          alt="Monster AG Logo"
          className="w-44 h-44 mx-auto mb-4 object-contain"
        />
        <h1 className="text-5xl font-extrabold tracking-tight">DSVGKO</h1>
        <p className="text-lg text-gray-700 mt-2">
          DSGVO-Check deiner Datenschutzerklärung – anonym, automatisch, verständlich.
        </p>
      </header>

      {/* Upload-Bereich */}
      <section className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12 text-center">
        <UploadCloud className="w-10 h-10 mx-auto text-[#1D2D5D] mb-4" />
        <p className="mb-4 font-medium">Lade deine Datenschutzerklärung als PDF hoch oder gib eine Website-URL an:</p>
        <input
          type="file"
          accept=".pdf"
          onChange={() => setFileUploaded(true)}
          className="mb-4 block mx-auto"
        />
        <input
          type="text"
          placeholder="https://deine-website.de"
          className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
        />
        <Button
          onClick={() => setPackageModalOpen(true)}
          className="bg-[#23B1EC] hover:bg-[#1D2D5D] text-white w-full"
        >
          Jetzt prüfen lassen
        </Button>
      </section>

      {/* Ergebnis-Anzeige nach Upload */}
      {fileUploaded && (
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Dein Ergebnis</h2>
          <div className="flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <span className="text-sm mt-1">Kritisch</span>
            </div>
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <span className="text-sm mt-1">Teilweise</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="text-sm mt-1">Konform</span>
            </div>
          </div>
          <p className="text-gray-600 mt-6 max-w-xl mx-auto">
            Diese Bewertung basiert auf typischen DSGVO-Mustern. Eine vollständige Analyse erhältst du im Anschluss per Mail oder als PDF.
          </p>
        </section>
      )}

      {/* Call-to-Action */}
      <div className="text-center">
        <Button
          onClick={() => setPackageModalOpen(true)}
          className="bg-[#23B1EC] hover:bg-[#1D2D5D] text-white px-6 py-3 rounded"
        >
          Weiter zur Auswertung
        </Button>
      </div>

      <PackageSelectionModal
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
      />

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20">
        Powered by Monster AG · DSGVO geprüft, automatisiert, erklärt.
      </footer>
    </div>
  );
}
