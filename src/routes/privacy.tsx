import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Deez Prints" },
      { name: "description", content: "Privacy policy and data protection terms for Deez Prints customers." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      <div className="mt-12 max-w-3xl space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>
          At Deez Prints, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your details when you visit our website or place an order.
        </p>
        <h3 className="text-lg font-bold text-foreground uppercase pt-4">Information We Collect</h3>
        <p>
          When you place an order or contact us, we collect necessary customer information including your name, contact phone number, delivery shipping address, email address, and payment verification references.
        </p>
        <h3 className="text-lg font-bold text-foreground uppercase pt-4">How We Use Your Information</h3>
        <p>
          Your information is strictly used to fulfill your orders, arrange delivery via TCS/Leopards/M&amp;P couriers, provide customer support via WhatsApp or email, and send order tracking updates.
        </p>
        <h3 className="text-lg font-bold text-foreground uppercase pt-4">Data Security</h3>
        <p>
          We implement encryption standards and do not store sensitive payment credential details. All mobile wallet and bank transfers are processed directly through your official banking applications.
        </p>
      </div>
    </div>
  );
}
