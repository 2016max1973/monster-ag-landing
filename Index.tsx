import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Users,
  Zap,
  Shield,
  Award,
  HeartHandshake,
  BookOpen,
  Star,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PackageSelectionModal from "@/components/PackageSelectionModal";
import Img1 from "@/assets/images/img1.png";
import Img2 from "@/assets/images/img2.png";
import Img3 from "@/assets/images/img5.jpg";
import Img4 from "@/assets/images/img6.jpg";
import Img5 from "@/assets/images/img7.jpg";

const packages = [
  {
    id: "basic",
    name: "Essenz-Paket",
    description:
      "Essentiell. Manuell. Dein Weg.\n\nIdeal für Selbstorganisierte.\nDu kümmerst dich selbst um die Abstimmung mit deinem Arbeitgeber – inklusive Druckvorlage.",
    features: [
      "✔ Zugang zum Onlinekursen",
      "✔ Zertifikat und Teinahmebestätigung nach Abschluss",
      "✔ Druckbares PDF für deinen Arbeitgeber",
      "✔ Community-Forum & Kurs-Tracking",
      "✔ E-Mail-Support",
      "👉 Hinweis: Du reichst den Antrag selbst ein, koordinierst Rückfragen manuell und meldest uns den Start.",
    ],
    icon: Users,
    popular: false,
    gradient: "from-slate-50 to-gray-50",
    borderColor: "border-primary/30",
    buttonColor: "bg-primary hover:bg-primary/90",
    buttonLabel: "Mit Essenz starten",
  },
  {
    id: "comfort",
    name: "Balance-Paket",
    description:
      "Ein Klick. Alles erledigt.\n\nFür alle, die es unkompliziert mögen:\nWir übernehmen den gesamten Kontakt mit deinem Arbeitgeber – klar, freundlich und fertig zum Genehmigen.",
    features: [
      "✔ Alles aus dem Essenz-Paket",
      "✔ Wir informieren deinen Arbeitgeber direkt – mit allen nötigen Kursinfos",
      "✔ Dein Antrag kommt klar strukturiert & entscheidungsreif an",
      "✔ Kein Formularkram, kein Nachfassen – alles wird für dich geregelt",
      "✔ Bevorzugter E-Mail-Support",
      "👉 Du klickst einmal – wir übernehmen den Rest.",
    ],
    icon: HeartHandshake,
    popular: true,
    gradient: "from-blue-50 to-slate-50",
    borderColor: "border-primary/50",
    buttonColor: "bg-primary hover:bg-primary/90",
    buttonLabel: "In Balance starten",
  },
  {
    id: "pro",
    name: "Insight-Paket",
    description:
      "Maximaler Komfort. Persönliche Begleitung.\n\nFür alle, die es gern rundum sorglos haben – mit exklusivem Zertifikat und persönlicher Unterstützung.",
    features: [
      "✔ Alles aus dem Balance-Paket",
      "✔ Hochwertiges Premium-Zertifikat (Acrylgravur) per Post",
      "✔ Live-Support-Termin auf Wunsch",
      "✔ Individuelle Rückmeldung bei Arbeitgeberfragen",
      "✔ Priorisierter Kundensupport",
      "✔ Schnellere Bearbeitung & Start",
      "👉 Du möchtest Klarheit? Wir sind persönlich für dich da – wann immer du uns brauchst.",
    ],
    icon: Award,
    popular: false,
    gradient: "from-gray-50 to-slate-100",
    borderColor: "border-primary/60",
    buttonColor: "bg-primary hover:bg-primary/90",
    buttonLabel: "Mit Insight durchstarten",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packageModalOpen, setPackageModalOpen] = useState(false);

  const handlePackageSelect = (packageId: string) => {
    navigate(`/form?package=${packageId}`);
  };

  const handleGetStarted = () => {
    setPackageModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-slate-50 to-gray-50 font-poppins">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  src="/lovable-uploads/04c93feb-87cc-4b8d-a040-ca24890a3c7a.png"
                  alt="EduEscape Logo"
                  className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                />
                <span className="ml-3 text-2xl lg:text-3xl font-bold text-primary">
                  EduEscape
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#packages"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Pakete
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Über uns
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Kontakt
                </a>
                <Button
                  onClick={handleGetStarted}
                  className="bg-primary hover:bg-primary/90"
                >
                  Jetzt starten
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <nav className="flex flex-col space-y-4">
                  <a
                    href="#packages"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    Pakete
                  </a>
                  <a
                    href="#about"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    Über uns
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    Kontakt
                  </a>
                  <Button
                    onClick={handleGetStarted}
                    className="bg-primary hover:bg-primary/90 w-full"
                  >
                    Jetzt starten
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 lg:pt-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  5 Tage frei – und du lernst endlich, was dich wirklich
                  weiterbringt.
                  <br />
                  <span className="block bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                    Mach Schluss mit langweiligen Weiterbildungen.
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Unsere zertifizierten Kurse verbinden persönliche Entwicklung
                  mit echten Vorteilen im Job.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                  >
                    Jetzt Paket wählen und freimachen
                  </Button>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="flex-1 lg:max-w-lg">
                <div className="relative">
                  <img
                    src={Img1}
                    alt="Frau beim Online-Lernen"
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Bildung, die sich lohnt */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 text-center">
              ✨ Bildung, die sich lohnt – und dir Raum gibt für Neues.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
              Unsere Kurse schaffen Raum für neues Denken, neue Fähigkeiten und
              neue Perspektiven.
              <br />
              Mit offiziellem Zertifikat und klarem Fokus auf deinen
              Fortschritt.
              <br />
              Mach den Schritt – wir kümmern uns um den Rest.
            </p>
          </div>
        </section>

        <div className="my-8 border-t border-gray-200"></div>

        {/* Was wir für dich übernehmen */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 text-center">
              🧩 Was wir für dich übernehmen
            </h2>
            <ul className="space-y-6 text-lg text-muted-foreground">
              <li>
                📬 Kontakt mit deinem Arbeitgeber? Machen wir.
                <br />
                Wir senden den Antrag raus – per E-Mail oder auf Wunsch per
                Post. Inklusive Erinnerung, falls keine Antwort kommt. Du musst
                nichts erklären, nichts nachhaken. Wir sorgen dafür, dass dein
                Antrag ankommt – und ernst genommen wird.
              </li>
              <li>
                🧾 Alle Unterlagen, fix und fertig.
                <br />
                Du bekommst alles, was du brauchst: ein offizielles
                Antragsdokument, ein Infoblatt für den Arbeitgeber, dein
                Zertifikat und – wenn nötig – eine Ausweichoption mit neuem
                Termin. Keine Formulare, kein Aufwand.
              </li>
              <li>
                💬 Support, wenn du ihn brauchst.
                <br />
                Du willst's allein durchziehen? Geht. Du brauchst Hilfe? Gibt's.
                Ob Rückfrage, Timing-Problem oder Unsicherheit – wir sind da.
                Ohne Blabla.
              </li>
              <li>
                🎯 Und am Ende: dein Erfolg.
                <br />
                Mit uns hast du nicht nur einen Kurs gemacht, sondern was in der
                Hand. Offiziell, anerkannt und professionell abgeschlossen.
              </li>
            </ul>
          </div>
        </section>

        <div className="my-8 border-t border-gray-200"></div>

        {/* So funktioniert's */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 text-center">
              🎯 So funktioniert's
            </h2>
            <ol className="space-y-6 text-lg text-muted-foreground list-decimal ml-8">
              <li>
                <b>Paket wählen</b>
                <br />
                Du entscheidest, wie viel Unterstützung du willst. Alles andere
                übernehmen wir.
              </li>
              <li>
                <b>Antrag? Machen wir.</b>
                <br />
                Wir setzen die Unterlagen auf, schicken sie raus – per E-Mail
                oder auf Wunsch auch per Post. Mit Erinnerung. Mit allem Drum
                und Dran. Du musst dich um nichts kümmern.
              </li>
              <li>
                <b>Freigabe erhalten & starten</b>
                <br />
                Sobald die Zustimmung da ist, bekommst du grünes Licht. Kurs
                starten, Zertifikat sichern, weiterkommen.
              </li>
            </ol>
            <p className="text-center text-lg text-muted-foreground mt-8">
              Du klickst. Wir übernehmen. Und du bist ready to take off.
            </p>
          </div>
        </section>

        <div className="my-8 border-t border-gray-200"></div>

        {/* Features Section with Image */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <img
                  src={Img2}
                  alt="Digitale Weiterbildung"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Moderne Lernerfahrung
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Unsere Plattform verbindet neueste Bildungstechnologie mit
                  persönlicher Unterstützung – für deinen Erfolg im modernen
                  Arbeitsmarkt.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      Interaktive Online-Kurse
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      Praxisnahe Projekte
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      Anerkannte Zertifikate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-16 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Wähle deinen Lernweg
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Finde das Paket, das zu deinen Zielen passt. Jedes Paket ist so
                gestaltet, dass du maximalen Nutzen und Unterstützung erhältst.
              </p>
            </div>

            {/* Package Cards */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {packages.map((pkg) => {
                const IconComponent = pkg.icon;
                return (
                  <Card
                    key={pkg.id}
                    className={`relative overflow-hidden bg-gradient-to-br ${
                      pkg.gradient
                    } ${
                      pkg.borderColor
                    } border-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                      pkg.popular
                        ? "ring-2 ring-primary ring-offset-4 scale-105"
                        : ""
                    }`}
                  >
                    {pkg.popular && (
                      <Badge className="absolute top-6 right-6 bg-primary hover:bg-primary/90 text-white shadow-lg">
                        Most Popular
                      </Badge>
                    )}

                    <CardHeader className="text-center pb-6">
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl bg-white shadow-xl flex items-center justify-center mb-6 ${
                          pkg.popular ? "ring-2 ring-primary ring-offset-2" : ""
                        }`}
                      >
                        <IconComponent className="w-10 h-10 text-primary" />
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                        {pkg.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base leading-relaxed">
                        {pkg.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="text-center pb-8">
                      <ul className="space-y-4 text-left">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <Button
                        onClick={() => handlePackageSelect(pkg.id)}
                        className={`w-full ${pkg.buttonColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base py-6`}
                        size="lg"
                      >
                        {pkg.buttonLabel}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section with Image */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <img
                  src={Img3}
                  alt="Frau arbeitet am Laptop"
                  className="w-full h-80 object-fill rounded-2xl shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Vereinfachter Ablauf
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Unser klarer Prozess macht es dir leicht, dich weiterzubilden
                  – ohne Stress und ohne Umwege.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Paket wählen
                      </h4>
                      <p className="text-muted-foreground">
                        Du entscheidest, wie viel Unterstützung du willst.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Arbeitgeber-Koordination
                      </h4>
                      <p className="text-muted-foreground">
                        Wir übernehmen die gesamte Kommunikation mit deinem
                        Arbeitgeber.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Startklar!
                      </h4>
                      <p className="text-muted-foreground">
                        Sobald alles genehmigt ist, kannst du loslegen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose EduEscape Section */}
        <section id="about" className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Warum EduEscape?
              </h3>
              <div className="flex justify-center mb-12">
                <img
                  src={Img4}
                  alt="Technologie und Innovation"
                  className="w-full max-w-2xl h-80 object-fill rounded-2xl shadow-xl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Erfahrene Dozent:innen
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Lerne von Profis mit langjähriger Erfahrung und nachweisbarem
                  Erfolg.
                </p>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Automatisierte Abläufe
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Nahtlose Koordination mit deinem Arbeitgeber – inklusive
                  Erinnerungen und Freigabeprozess.
                </p>
              </div>
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Karriere-Booster
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Steigere deine Karrierechancen mit anerkannten Abschlüssen und
                  persönlicher Betreuung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Erfolgsgeschichten
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Tausende Teilnehmer:innen haben mit EduEscape ihre Karriere
                  auf das nächste Level gebracht.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/90 rounded-xl p-6 shadow-lg">
                    <h4 className="text-2xl font-bold text-primary mb-2">
                      95%
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Karriere-Boost-Quote
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-xl p-6 shadow-lg">
                    <h4 className="text-2xl font-bold text-primary mb-2">
                      30%
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Ø Gehaltssteigerung
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <img
                  src={Img5}
                  alt="Laptop mit Erfolgsauswertung"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="py-16 lg:py-24 bg-gradient-to-r from-primary to-blue-600"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Bereit für deinen nächsten Karriereschritt?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Starte jetzt mit EduEscape und sichere dir deinen Platz für die
              Zukunft!
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-12 py-4 text-lg"
            >
              Jetzt durchstarten
            </Button>
          </div>
        </section>

        <PackageSelectionModal
          open={packageModalOpen}
          onOpenChange={setPackageModalOpen}
        />
      </main>
      {/* Footer at the very end, after main */}
      <footer className="bg-slate-100 py-8 border-t border-slate-200 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center text-muted-foreground gap-6 md:gap-0">
          <div className="text-center md:text-left flex-1">
            <p className="mb-2 font-semibold text-primary">EduEscape</p>
            <p className="mb-2">
              Zertifizierter Bildungsanbieter nach europäischem Standard (CNAE
              9339).
              <br />
              Unsere Kurse sind anerkannt, modern und auf berufliche
              Freistellungen abgestimmt.
              <br />
              Du lernst – wir regeln den Rest.
            </p>
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="mb-1">
              📍 <span className="font-medium">Anbieter:</span> EduEscape –
              powered by devsolv SL
            </p>
            <p className="mb-1">
              📬 Calle Tarabilla 1 C 48 · 35660 Corralejo · Spanien
            </p>
            <p className="mb-1">
              📞{" "}
              <a
                href="tel:+491234567890"
                className="underline hover:text-primary"
              >
                +49 123 4567890
              </a>
            </p>
            <p className="mb-1">
              🌐{" "}
              <a
                href="https://www.eduescape.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                www.eduescape.de
              </a>
            </p>
            <p className="mb-1">
              ✉️{" "}
              <a
                href="mailto:kontakt@eduescape.de"
                className="underline hover:text-primary"
              >
                kontakt@eduescape.de
              </a>
            </p>
          </div>
          <div className="text-center md:text-right flex-1 mt-4 md:mt-0">
            <p className="font-bold text-primary">
              🚀 Bereit? Dein Kurs. Dein Moment. Dein Ticket zum Durchstarten.
              <br />
              Let's go – you're ready to take off.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
