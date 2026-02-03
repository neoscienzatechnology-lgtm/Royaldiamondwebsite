import { Phone } from 'lucide-react';

const PHONE_NUMBER = '+14253996635';

const FloatingCallButton = () => {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      className="fixed bottom-28 right-6 z-50 w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-green-600"
      aria-label="Call Royal Diamond Cleaning"
    >
      <Phone className="w-6 h-6 text-white" />
    </a>
  );
};

export default FloatingCallButton;