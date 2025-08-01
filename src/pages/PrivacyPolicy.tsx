import React from "react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-12">
    <div className="container mx-auto px-4 max-w-3xl bg-white/90 rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Datenschutzerklärung & DSGVO
      </h1>
      <p className="mb-4 text-muted-foreground">
        EduEscape verpflichtet sich, deine Privatsphäre zu schützen und die
        Datenschutz-Grundverordnung (DSGVO) einzuhalten.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">
        1. Welche Daten wir erheben
      </h2>
      <ul className="list-disc ml-6 mb-4 text-muted-foreground">
        <li>
          Persönliche Angaben, die du in Formularen machst (Name, E-Mail,
          Adresse usw.)
        </li>
        <li>Arbeitgeber- und Kursdetails</li>
        <li>Nutzungsdaten (z.B. Seitenaufrufe, Interaktionen)</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. Wie wir deine Daten verwenden
      </h2>
      <ul className="list-disc ml-6 mb-4 text-muted-foreground">
        <li>
          Zur Bearbeitung deines Antrags und zur Koordination mit deinem
          Arbeitgeber
        </li>
        <li>
          Zur Bereitstellung von Support und zur Verbesserung unserer Dienste
        </li>
        <li>Zur Erfüllung gesetzlicher Pflichten</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Deine Rechte</h2>
      <ul className="list-disc ml-6 mb-4 text-muted-foreground">
        <li>Auskunft, Berichtigung oder Löschung deiner Daten</li>
        <li>Widerruf deiner Einwilligung jederzeit</li>
        <li>Übertragbarkeit deiner Daten anfordern</li>
        <li>Widerspruch oder Einschränkung der Verarbeitung</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Datensicherheit</h2>
      <p className="mb-4 text-muted-foreground">
        Wir setzen branchenübliche Sicherheitsmaßnahmen ein, um deine Daten vor
        unbefugtem Zugriff, Offenlegung oder Verlust zu schützen.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Kontakt</h2>
      <p className="mb-4 text-muted-foreground">
        Bei Fragen oder Anliegen zu deinen Daten wende dich bitte an{" "}
        <a
          href="mailto:privacy@eduescape.com"
          className="underline text-primary"
        >
          privacy@eduescape.com
        </a>
        .
      </p>
      <p className="text-xs text-muted-foreground mt-8">
        Letzte Aktualisierung: Juni 2025
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
