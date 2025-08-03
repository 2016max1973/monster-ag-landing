import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import PackageSelectionModal from "@/components/PackageSelectionModal";

export default function Index() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [packageModalOpen, setPackageModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E6F7FF] text-[#1D2D5D] px-6 py-12 font-sans">
      {/* Logo + Produktname */}
      <header className="text-center mb-10">
        <img
          src="/monster-ag-logo.png"
          alt="Monster AG Logo"
          className="w-48 h-48 mx-auto mb-4 object-contain"
        />
        <h1 className="text-5xl font-extrabold tracking-tight">DSVGOMonster</h1>
        <p className="text-lg text-gray-700 mt-2 max-w-xl mx-auto">
          Lade deine Datenschutzerklärung hoch oder gib deine Website an – wir analysieren automatisch und anonym auf DSGVO-Verstöße.
        </p>
      </header>

      {/* Upload-Feld */}
      <section className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12 text-center">
        <UploadCloud className="w-10 h-10 mx-auto text-[#1D2D5D] mb-4" />
        <p className="mb-4 font-medium">PDF hochladen oder Website-URL eingeben:</p>
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

      {/* Ergebnisanzeige (nach Upload sichtbar) */}
      {fileUploaded && (
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Erste Einschätzung</h2>
          <div className="flex justify-center gap-6">
            <XCircle className="w-8 h-8 text-red-500" />
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-gray-600 mt-4 text-sm max-w-xl mx-auto">
            Dein Dokument wird analysiert. Die finale Bewertung inkl. PDF-Bericht und Handlungsempfehlung folgt nach dem nächsten Schritt.
          </p>
        </section>
      )}

      {/* Modal-Auslösung */}
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