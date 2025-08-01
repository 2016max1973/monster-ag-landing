/* eslint-disable no-empty */
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Building,
  Calendar,
  Phone,
  MessageSquare,
  ArrowLeft,
  Send,
  Shield,
  MapPin,
  Home,
  Cake,
} from "lucide-react";
import SuccessDialog from "@/components/SuccessDialog";
import { useSubmitApplication } from "@/data/applicationMutation";
import type { ResponseType } from "@/data/applicationMutation";
import ErrorDialog from "@/components/ErrorDialog";
import { AxiosError } from "axios";

// Define the interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  userEmail: string;
  dateOfBirth: string;
  employeeStreet: string;
  employeeZip: string;
  employeeCity: string;
  employerName: string;
  employerEmail: string;
  employerStreet: string;
  employerZip: string;
  employerCity: string;
  preferredDate: string;
  phoneNumber: string;
  message: string;
  consent: boolean;
  plan: string;
}

const packageNames: Record<string, string> = {
  basic: "Essenz-Paket",
  premium: "Balance-Paket",
  pro: "Insight-Paket",
};

const Form = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const packageId = searchParams.get("package") || "basic";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    userEmail: "",
    dateOfBirth: "",
    employeeStreet: "",
    employeeZip: "",
    employeeCity: "",
    employerName: "",
    employerEmail: "",
    employerStreet: "",
    employerZip: "",
    employerCity: "",
    preferredDate: "",
    phoneNumber: "",
    message: "",
    consent: false,
    plan: packageId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    { field: string; errors: string[] }[] | undefined
  >(undefined);

  const mutation = useSubmitApplication();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "plan" ? { plan: packageId } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      toast({
        title: "Einwilligung erforderlich",
        description:
          "Bitte stimmen Sie der Einwilligung für den Kontakt mit Ihrem Arbeitgeber zu, bevor Sie den Antrag absenden.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    mutation.mutate(formData, {
      onSuccess: async () => {
        if (packageId === "basic") {
          setTimeout(() => printForm(), 200);
          return;
        }
        setShowSuccessDialog(true);
        setFormData({
          firstName: "",
          lastName: "",
          userEmail: "",
          dateOfBirth: "",
          employeeStreet: "",
          employeeZip: "",
          employeeCity: "",
          employerName: "",
          employerEmail: "",
          employerStreet: "",
          employerZip: "",
          employerCity: "",
          preferredDate: "",
          phoneNumber: "",
          message: "",
          consent: false,
          plan: packageId,
        });
        setFieldErrors(undefined);
      },
      onError: (error: unknown) => {
        let message =
          "Es gab einen Fehler beim Absenden Ihres Antrags. Bitte versuchen Sie es später erneut.";
        let fieldErrors: { field: string; errors: string[] }[] | undefined =
          undefined;
        if (
          error &&
          typeof error === "object" &&
          "isAxiosError" in error &&
          (error as AxiosError).isAxiosError
        ) {
          const axiosError = error as AxiosError<ResponseType>;
          message = axiosError.response?.data?.message || message;
          fieldErrors = axiosError.response?.data?.errors;
        }
        setErrorMessage(message);
        setFieldErrors(fieldErrors);
        setShowErrorDialog(true);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  // Print-friendly HTML generation utility for basic plan
  const printForm = () => {
    const printWindow = window.open("", "_blank", "width=800,height=1000");
    if (!printWindow) return;
    const logoUrl = `${window.location.origin}/lovable-uploads/04c93feb-87cc-4b8d-a040-ca24890a3c7a.png`;
    const fields = [
      {
        label: "Vorname",
        value: formData.firstName,
        section: "Persönliche Daten",
      },
      {
        label: "Nachname",
        value: formData.lastName,
        section: "Persönliche Daten",
      },
      {
        label: "E-Mail-Adresse",
        value: formData.userEmail,
        section: "Persönliche Daten",
      },
      {
        label: "Geburtsdatum",
        value: formData.dateOfBirth,
        section: "Persönliche Daten",
      },
      {
        label: "Telefonnummer",
        value: formData.phoneNumber,
        section: "Persönliche Daten",
      },
      {
        label: "Paket",
        value: packageNames[formData.plan] || formData.plan,
        section: "Antragsdetails",
      },
      {
        label: "Straße",
        value: formData.employeeStreet,
        section: "Deine Adresse",
      },
      {
        label: "PLZ",
        value: formData.employeeZip,
        section: "Deine Adresse",
      },
      {
        label: "Stadt",
        value: formData.employeeCity,
        section: "Deine Adresse",
      },
      {
        label: "Arbeitgeber",
        value: formData.employerName,
        section: "Arbeitgeber",
      },
      {
        label: "Arbeitgeber E-Mail",
        value: formData.employerEmail,
        section: "Arbeitgeber",
      },
      {
        label: "Arbeitgeber Straße",
        value: formData.employerStreet,
        section: "Arbeitgeber",
      },
      {
        label: "Arbeitgeber PLZ",
        value: formData.employerZip,
        section: "Arbeitgeber",
      },
      {
        label: "Arbeitgeber Stadt",
        value: formData.employerCity,
        section: "Arbeitgeber",
      },
      {
        label: "Bevorzugtes Startdatum",
        value: formData.preferredDate,
        section: "Kursdetails",
      },
      {
        label: "Nachricht / Kommentare",
        value: formData.message,
        section: "Kursdetails",
      },
      {
        label: "Einwilligung Arbeitgeberkontakt",
        value: formData.consent ? "Ja" : "Nein",
        section: "Einwilligung",
      },
    ];
    // Group fields by section
    const sections = Array.from(new Set(fields.map((f) => f.section)));
    printWindow.document.write(`
      <html>
        <head>
          <title>EduEscape Application</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; background: #f6f8fa; color: #222; }
            .container { max-width: 700px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px #0001; padding: 40px 32px 32px 32px; }
            .logo { display: block; margin: 0 auto 20px auto; width: 80px; height: 80px; object-fit: contain; }
            .title { text-align: center; font-size: 2.2rem; font-weight: bold; margin-bottom: 12px; color: #2563eb; letter-spacing: 1px; }
            .subtitle { text-align: center; font-size: 1.1rem; color: #555; margin-bottom: 32px; }
            .section { margin-bottom: 32px; }
            .section-title { font-size: 1.1rem; font-weight: bold; color: #2563eb; margin-bottom: 12px; border-bottom: 2px solid #e0e7ef; padding-bottom: 4px; letter-spacing: 0.5px; }
            .field { margin-bottom: 14px; display: flex; }
            .label { width: 220px; font-weight: 500; color: #444; }
            .value { flex: 1; color: #222; background: #f1f5fb; border-radius: 6px; padding: 4px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${logoUrl}" class="logo" alt="EduEscape Logo" />
            <div class="title">EduEscape Application</div>
            <div class="subtitle">Enrollment Form Printout</div>
            ${sections
              .map(
                (section) => `
              <div class="section">
                <div class="section-title">${section}</div>
                ${fields
                  .filter((f) => f.section === section)
                  .map(
                    (f) => `
                  <div class="field">
                    <span class="label">${f.label}</span>
                    <span class="value">${f.value ?? ""}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
              )
              .join("")}
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Enroll in {packageNames[packageId as keyof typeof packageNames]}
              </CardTitle>
              <CardDescription>
                Complete the form below to begin your learning journey with
                EduEscape
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              id="form-pdf-section"
            >
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Persönliche Daten
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      Vorname *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                        placeholder="Gib deinen Vornamen ein"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Nachname *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                        placeholder="Gib deinen Nachnamen ein"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail" className="text-foreground">
                    E-Mail-Adresse *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="userEmail"
                      type="email"
                      required
                      value={formData.userEmail}
                      onChange={(e) =>
                        handleInputChange("userEmail", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                      placeholder="deine.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-foreground">
                    Geburtsdatum *
                  </Label>
                  <div className="relative">
                    <Cake className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-foreground">
                    Telefonnummer
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Plan (readonly) */}
                <div className="space-y-2">
                  <Label htmlFor="plan" className="text-foreground">
                    Paket
                  </Label>
                  <Input
                    id="plan"
                    type="text"
                    value={packageNames[formData.plan] || formData.plan}
                    readOnly
                    className="bg-gray-100 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary text-gray-700"
                  />
                </div>
              </div>

              {/* Employee Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Deine Adresse
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="employeeStreet" className="text-foreground">
                    Straße *
                  </Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="employeeStreet"
                      type="text"
                      required
                      value={formData.employeeStreet}
                      onChange={(e) =>
                        handleInputChange("employeeStreet", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                      placeholder="123 Main Street"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeZip" className="text-foreground">
                      PLZ *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="employeeZip"
                        type="text"
                        required
                        value={formData.employeeZip}
                        onChange={(e) =>
                          handleInputChange("employeeZip", e.target.value)
                        }
                        className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCity" className="text-foreground">
                      Stadt *
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="employeeCity"
                        type="text"
                        required
                        value={formData.employeeCity}
                        onChange={(e) =>
                          handleInputChange("employeeCity", e.target.value)
                        }
                        className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                        placeholder="New York"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Employer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Arbeitgeber Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="employerName" className="text-foreground">
                    Arbeitgeber *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="employerName"
                      type="text"
                      required
                      value={formData.employerName}
                      onChange={(e) =>
                        handleInputChange("employerName", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                      placeholder="Gib den Namen Ihres Arbeitgebers ein"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerEmail" className="text-foreground">
                    Arbeitgeber E-Mail *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="employerEmail"
                      type="email"
                      required
                      value={formData.employerEmail}
                      onChange={(e) =>
                        handleInputChange("employerEmail", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                      placeholder="hr@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerStreet" className="text-foreground">
                    Arbeitgeber Straße *
                  </Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="employerStreet"
                      type="text"
                      required
                      value={formData.employerStreet}
                      onChange={(e) =>
                        handleInputChange("employerStreet", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                      placeholder="456 Business Ave"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employerZip" className="text-foreground">
                      Arbeitgeber PLZ *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="employerZip"
                        type="text"
                        required
                        value={formData.employerZip}
                        onChange={(e) =>
                          handleInputChange("employerZip", e.target.value)
                        }
                        className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                        placeholder="54321"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employerCity" className="text-foreground">
                      Arbeitgeber Stadt *
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="employerCity"
                        type="text"
                        required
                        value={formData.employerCity}
                        onChange={(e) =>
                          handleInputChange("employerCity", e.target.value)
                        }
                        className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                        placeholder="New York"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Kursdetails
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-foreground">
                    Bevorzugtes Startdatum *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="preferredDate"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) =>
                        handleInputChange("preferredDate", e.target.value)
                      }
                      className="pl-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Nachricht / Kommentare
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="pl-10 pt-10 bg-white/50 border-primary/20 shadow-sm focus:shadow-md transition-shadow min-h-[100px] focus:border-primary"
                      placeholder="Zusätzliche Informationen oder besondere Wünsche..."
                    />
                  </div>
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        handleInputChange("consent", checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="space-y-2">
                      <Label
                        htmlFor="consent"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        <Shield className="inline w-4 h-4 mr-1" />
                        Einwilligung Arbeitgeberkontakt *
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Ich stimme zu, dass EduEscape automatisch mit meinem
                        Arbeitgeber per E-Mail kontaktieren darf, um die
                        Genehmigung für Bildungsurlaub zu beantragen.
                        <br />
                        <span>
                          Lesen Sie unsere
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-primary hover:text-primary/80 ml-1"
                          >
                            Datenschutzerklärung & GDPR
                          </a>
                          .
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {packageId === "basic"
                      ? "Wird gedruckt..."
                      : "Wird gesendet..."}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {packageId === "basic"
                      ? "Jetzt drucken"
                      : "Antrag absenden"}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-6 bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Was passiert als nächstes?</strong>
              </p>
              <p>
                Nach Absendung werden wir Ihren Arbeitgeber kontaktieren, um die
                Genehmigung zu erhalten und Ihnen eine Bestätigungsemail senden.
                Wenn keine Antwort innerhalb von 14 Tagen erfolgt, senden wir
                eine Nachfrage automatisch.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
      <ErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        message={errorMessage}
        fieldErrors={fieldErrors}
      />
    </div>
  );
};

export default Form;
