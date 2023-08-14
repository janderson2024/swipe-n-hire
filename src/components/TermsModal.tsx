import React from "react";

interface TermsModalProps {
  show: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 w-2/3 md:w-1/2 rounded-lg max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-2">Terms of Use</h3>
        <div>
          <p>
            By accessing and using this website Swipe-n-Hire, you agree to
            comply with and be bound by the following terms and conditions. If
            you do not agree with these terms, please do not use this website.{" "}
          </p>
          <p>
            <strong>User Conduct:</strong> You agree to use this website only
            for lawful purposes and in a manner that does not infringe upon the
            rights of, or restrict or inhibit the use and enjoyment of, others.
          </p>
          <p>
            <strong>Intellectual Property:</strong> All content on this website,
            including text, images, graphics, and logos, is protected by
            copyright and other intellectual property laws. You may not
            reproduce, distribute, modify, or create derivative works without
            our prior written consent.
          </p>
          <p>
            <strong>Privacy:</strong> Your use of this website is subject to our
            Privacy Policy, which outlines how we collect, use, and protect your
            personal information.
          </p>
          <p>
            <strong>Disclaimer:</strong> This website is provided as is and we
            make no representations or warranties of any kind, express or
            implied, regarding its accuracy, reliability, or availability.
          </p>
          <p>
            <strong>Limitation of Liability:</strong> We shall not be liable for
            any damages, whether direct, indirect, incidental, or consequential,
            arising from your use of this website.{" "}
          </p>
          <p>
            <strong>Links to Third-Party Websites:</strong> This website may
            contain links to third-party websites. We do not endorse or control
            these websites and are not responsible for their content or
            practices.{" "}
          </p>
          <p>
            <strong>Changes to Terms:</strong> We reserve the right to modify
            these terms at any time. Your continued use of the website after
            such changes constitutes your acceptance of the new terms.{" "}
          </p>
          <p>
            <strong>Governing Law:</strong> These terms are governed by and
            construed in accordance with the laws of [Your Jurisdiction]. Any
            disputes arising shall be subject to the exclusive jurisdiction of
            the courts in [Your Jurisdiction].{" "}
          </p>
          By using this website, you acknowledge that you have read, understood,
          and agree to these terms of use. Please note that this is a general
          template and may need to be customized to fit the specific details and
          requirements of your website and jurisdiction. It is important to have
          your legal counsel review and approve the terms of use before
          implementing them on your website.
        </div>
        <button
          className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
