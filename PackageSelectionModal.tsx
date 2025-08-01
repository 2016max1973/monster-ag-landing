import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, HeartHandshake, Award } from "lucide-react";

interface PackageSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const packages = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential learning package with manual employer coordination",
    features: [
      "Access to all online courses",
      "Digital certificate upon completion",
      "Manual employer request handling",
      "Community forum access",
      "Email support",
    ],
    icon: Users,
    popular: false,
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Enhanced experience with automated employer communication",
    features: [
      "Access to all online courses",
      "Digital certificate upon completion",
      "Automatic employer email contact",
      "Course details & approval button",
      "14-day automatic reminder system",
      "Bonus mindfulness module",
    ],
    icon: HeartHandshake,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Complete premium package with personalized support",
    features: [
      "Everything in Comfort package",
      "Premium physical certificate (engraved acrylic)",
      "Personal eligibility check for public funding",
      "Priority customer support",
      "One-on-one guidance sessions",
    ],
    icon: Award,
    popular: false,
  },
];

const PackageSelectionModal = ({
  open,
  onOpenChange,
}: PackageSelectionModalProps) => {
  const navigate = useNavigate();

  const handlePackageSelect = (packageId: string) => {
    navigate(`/form?package=${packageId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Wähle dein Lernpaket
          </DialogTitle>
          <DialogDescription className="text-center">
            Such dir das Paket aus, das am besten zu deinen Lernzielen und
            deiner Karriere passt.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card
                key={pkg.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  pkg.popular ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageSelect(pkg.id);
                    }}
                  >
                    {pkg.name} wählen
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageSelectionModal;
