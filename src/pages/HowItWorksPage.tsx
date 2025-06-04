import React from 'react';
import Layout from '@/components/Layout';
import { Rocket, Lightbulb, CalendarCheck, PiggyBank, BadgeCheck, Users } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          How RafflePH Works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1: Discover Raffles */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 border-2 border-purple-50/50">
            <div className="flex items-center mb-4">
              <Rocket className="w-6 h-6 text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Step 1: Discover Raffles</h2>
            </div>
            <p className="text-gray-600">
              Explore a wide variety of exciting raffles with amazing prizes. Find the ones that
              spark your interest!
            </p>
          </div>

          {/* Step 2: Enter Raffles */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 border-2 border-pink-50/50">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-pink-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Step 2: Enter Raffles</h2>
            </div>
            <p className="text-gray-600">
              Participate in raffles by purchasing tickets. The more tickets you have, the higher
              your chances of winning!
            </p>
          </div>

          {/* Step 3: Raffle Draw */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 border-2 border-blue-50/50">
            <div className="flex items-center mb-4">
              <CalendarCheck className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Step 3: Raffle Draw</h2>
            </div>
            <p className="text-gray-600">
              Wait for the scheduled draw date. Our system randomly selects winners in a transparent
              and fair manner.
            </p>
          </div>

          {/* Step 4: Win Prizes */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 border-2 border-green-50/50">
            <div className="flex items-center mb-4">
              <PiggyBank className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Step 4: Win Prizes</h2>
            </div>
            <p className="text-gray-600">
              If you're a lucky winner, claim your prize! We'll guide you through the process to
              ensure you receive your winnings smoothly.
            </p>
          </div>

          {/* Step 5: Verified Raffles */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 border-2 border-yellow-50/50">
            <div className="flex items-center mb-4">
              <BadgeCheck className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Step 5: Verified Raffles</h2>
            </div>
            <p className="text-gray-600">
              We ensure all raffles are legitimate and prizes are guaranteed. Your trust and
              satisfaction are our top priorities.
            </p>
          </div>

          {/* Step 6: Join Community */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 border-2 border-red-50/50">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Step 6: Join Community</h2>
            </div>
            <p className="text-gray-600">
              Connect with other raffle enthusiasts, share your experiences, and celebrate your wins
              together!
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Why Choose RafflePH?
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">
              <b>Wide Selection:</b> Discover raffles for various prizes, from gadgets to cars.
            </li>
            <li className="mb-2">
              <b>Secure & Transparent:</b> Our platform ensures fair draws and guaranteed prizes.
            </li>
            <li className="mb-2">
              <b>Community Driven:</b> Join a vibrant community of raffle lovers.
            </li>
            <li className="mb-2">
              <b>Easy to Use:</b> Simple and intuitive interface for seamless participation.
            </li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Ready to get started? <a href="/" className="text-purple-600 hover:underline">Explore
              Raffles Now!</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
