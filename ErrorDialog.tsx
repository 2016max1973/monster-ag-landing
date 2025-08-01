import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { XCircle } from "lucide-react";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
  fieldErrors?: { field: string; errors: string[] }[];
}

const ErrorDialog = ({
  open,
  onOpenChange,
  message,
  fieldErrors,
}: ErrorDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md bg-white">
        <AlertDialogHeader className="text-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <AlertDialogTitle className="text-xl font-semibold text-red-700">
            Übermittlung fehlgeschlagen
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600">
            {message ||
              "Beim Absenden deines Antrags ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere den Support, falls das Problem weiterhin besteht."}
          </AlertDialogDescription>
          {fieldErrors && fieldErrors.length > 0 && (
            <div className="mt-3 text-left">
              <ul className="space-y-1">
                {fieldErrors.map((err) => (
                  <li key={err.field}>
                    <span className="font-medium text-red-700">
                      {err.field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase())}
                    </span>
                    <ul className="ml-3 list-disc text-red-600 text-sm">
                      {err.errors.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Schließen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorDialog;
