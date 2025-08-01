import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, Home } from "lucide-react";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Zahlung abgebrochen
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Deine Zahlung wurde abgebrochen. Wenn dies ein Versehen war,
              kannst du es erneut versuchen oder unseren Support kontaktieren.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-800">
                Zahlung abgebrochen
              </h2>
              <p className="text-muted-foreground text-lg">
                Deine Zahlung wurde nicht abgeschlossen. Bei Fragen wende dich
                bitte an unseren Support.
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white mt-4"
                onClick={() => navigate("/")}
              >
                Zur Startseite
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCancelled;
