
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TrustVerificationSection: React.FC = () => {
  const items = [
    "Organizer identity verified",
    "No payment collected on this site",
    "Manual vetting by the RafflePH team"
  ];

  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3 text-green-700 flex items-center">
        <ShieldCheck className="mr-2 h-6 w-6 text-green-600" /> 100% Verified Raffle
      </h2>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-sm text-green-800">
            <ShieldCheck className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrustVerificationSection;
