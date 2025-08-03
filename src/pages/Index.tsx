import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Zap } from "lucide-react";
import PackageSelectionModal from "@/components/PackageSelectionModal";

export default function Index() {
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [ampelStatus, setAmpelStatus] = useState<'green' | 'yellow' | 'red'>('yellow');

  const handleAmpelTest = () => {
    const states = ['green', 'yellow', 'red'];
    const next = states[(states.indexOf(ampelStatus) + 1) % 3];
    setAmpelStatus(next as 'green' | 'yellow' | 'red');
  };

  return (
    <div className="min-h-screen bg-[#E6F7FF] text-[#1D2D5D] px-6 py-12 font-sans">
      <header className="text-center mb-10">
        <img
          src="/monster-ag-logo.png"
          alt="Monster AG Logo"
          className="w-32 mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold">Datenschutzprüfung mit Monster AG</h1>
        <p className="mt-2 text-gray-700">
          Wir scannen deine Website auf DSGVO & Barrierefreiheit – mit Ampelbewertung.
        </p>
      </header>

      {/* Ampelanzeige */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-4">
          <div className={`w-6 h-6 rounded-full ${ampelStatus === 'red' ? 'bg-red-500' : 'bg-red-200'}`}></div>
          <div className={`w-6 h-6 rounded-full ${ampelStatus === 'yellow' ? 'bg-yellow-400' : 'bg-yellow-100'}`}></div>
          <div className={`w-6 h-6 rounded-full ${ampelStatus === 'green' ? 'bg-green-500' : 'bg-green-100'}`}></div>
        </div>
        <Button className="mt-4 bg-[#23B1EC] hover:bg-[#1D2D5D] text-white" onClick={handleAmpelTest}>
          Test: Ampel wechseln
        </Button>
      </div>

      {/* Info-Karten */}
      <section className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1D2D5D]" /> Datenschutz
            </CardTitle>
          </CardHeader>
          <CardContent>
            DSGVO-Konformität deiner Seite – geprüft, bewertet und dokumentiert.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1D2D5D]" /> Barrierefreiheit
            </CardTitle>
          </CardHeader>
          <CardContent>
            Wir erkennen Verstöße gegen das neue BFSG / EAA rechtzeitig und geben klare Empfehlungen.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#1D2D5D]" /> Ergebnis
            </CardTitle>
          </CardHeader>
          <CardContent>
            Ampel-Logik mit Ergebnis-PDF & Mail-Trigger (automatisiert oder manuell).
          </CardContent>
        </Card>
      </section>

      <Button
  className="bg-[#23B1EC] hover:bg-[#1D2D5D] text-white px-6 py-3 rounded"
  onClick={() => setPackageModalOpen(true)}
>
  Jetzt Website prüfen lassen
</Button>
        </Button>
      </div>

      <PackageSelectionModal
        open={packageModalOpen}
        onOpenChange={setPackageModalOpen}
      />
    </div>
  );
}
// Redeploy-Trigger
