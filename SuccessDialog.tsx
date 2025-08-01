import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, Home } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessDialog = ({ open, onOpenChange }: SuccessDialogProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onOpenChange(false);
    navigate("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <AlertDialogTitle className="text-2xl text-center font-bold text-green-800">
            Antrag erfolgreich eingereicht!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            Vielen Dank für deinen Antrag! Wir kontaktieren deinen Arbeitgeber
            zur Genehmigung und senden dir in Kürze eine Bestätigung per E-Mail.
            Bitte warte auf unsere Rückmeldung – dies dauert in der Regel 1–3
            Werktage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center w-full mx-auto">
          <AlertDialogAction
            onClick={handleGoHome}
            className="bg-primary hover:bg-primary/90"
          >
            <Home className="w-4 h-4 mr-2" />
            Zur Startseite
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
