/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Home } from "lucide-react";
import axiosInstance from "@/lib/axiosConfig";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("Missing payment session ID.");
      return;
    }
    const verifyPayment = async () => {
      try {
        const response = await axiosInstance.get(
          `api/stripe/session/${sessionId}`
        );
        console.log(response);
        if (response.data.status === "paid") {
          setStatus("success");
          setMessage(
            response.data.message ||
              "Your payment was successful! Thank you for your purchase."
          );
        } else {
          setStatus("error");
          setMessage(
            response.data.message ||
              "Payment verification failed. Please contact support."
          );
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "An error occurred while verifying your payment."
        );
      }
    };
    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Zahlungsstatus
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {status === "loading" && "Zahlung wird überprüft..."}
              {status === "success" && "Vielen Dank für deine Zahlung!"}
              {status === "error" && "Es gab ein Problem mit deiner Zahlung."}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-center">
            {status === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground text-lg">
                  Bitte warte, während wir deine Zahlung überprüfen...
                </p>
              </div>
            )}
            {status === "success" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">
                  Zahlung erfolgreich!
                </h2>
                <p className="text-muted-foreground text-lg">{message}</p>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white mt-4"
                  onClick={() => navigate("/")}
                >
                  Zur Startseite
                </Button>
              </div>
            )}
            {status === "error" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-800">
                  Zahlung fehlgeschlagen
                </h2>
                <p className="text-muted-foreground text-lg">{message}</p>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white mt-4"
                  onClick={() => navigate("/")}
                >
                  Zur Startseite
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
