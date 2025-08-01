/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Home, ArrowLeft } from "lucide-react";
import axiosInstance from "@/lib/axiosConfig";

const Approve = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [approvalData, setApprovalData] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Ungültiger Genehmigungslink. Token fehlt.");
      return;
    }

    const approveApplication = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/applications/approve/${token}`
        );

        if (response.data.success) {
          setStatus("success");
          setMessage(response.data.message || "Antrag genehmigt!");
          setApprovalData(response.data.data || null);
        } else {
          setStatus("error");
          setMessage(
            response.data.message ||
              "Genehmigung fehlgeschlagen. Bitte versuchen Sie es erneut."
          );
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Beim Verarbeiten der Genehmigung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
        );
      }
    };

    approveApplication();
  }, [token]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Helper to format date as TT.MM.JJJJ
  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "[TT.MM.JJJJ]";
    const d = new Date(isoDate);
    return d.toLocaleDateString("de-DE");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Genehmigung des Antrags
              </CardTitle>
              <CardDescription>
                Ihr Genehmigungswunsch wird bearbeitet...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Status Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              {status === "loading" && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Genehmigung wird verarbeitet...
                  </h3>
                  <p className="text-muted-foreground">
                    Bitte warten Sie, während wir Ihre Genehmigung bearbeiten.
                  </p>
                </div>
              )}

              {status === "success" && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800">
                    🎓 Bestätigung – Ihre Genehmigung wurde erfolgreich
                    übermittelt
                  </h3>
                  <div className="text-muted-foreground text-base text-center space-y-2">
                    <p>
                      Vielen Dank!
                      <br />
                      Sie haben dem Antrag auf Bildungsurlaub für den folgenden
                      Kurs zugestimmt:
                    </p>
                    <div className="mt-4 text-left inline-block mx-auto">
                      <div>
                        👤 <b>Kursteilnehmer:</b>{" "}
                        {approvalData?.user
                          ? `${approvalData.user.firstName} ${approvalData.user.lastName}`
                          : "[Vorname Nachname]"}
                      </div>
                      <div>
                        📚 <b>Kursanbieter:</b> EduEscape
                      </div>
                      <div>
                        📅 <b>Kurstermin:</b>{" "}
                        {formatDate(approvalData?.preferredDate)}
                      </div>
                      <div>
                        📝 <b>Kurs:</b>{" "}
                        {approvalData?.message
                          ? approvalData.message
                          : "[Kursname, z. B. Englisch A1 – Grundlagen für den Beruf]"}
                      </div>
                    </div>
                    <div className="mt-6">
                      Mit freundlichen Grüßen
                      <br />
                      Ihr EduEscape-Team
                    </div>
                  </div>
                  <Button
                    onClick={handleGoHome}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Zur Startseite
                  </Button>
                </div>
              )}

              {status === "error" && (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-800">
                    Genehmigung fehlgeschlagen
                  </h3>
                  <p className="text-muted-foreground">{message}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleGoBack}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                    <Button
                      onClick={handleGoHome}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Zur Startseite
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Approve;
