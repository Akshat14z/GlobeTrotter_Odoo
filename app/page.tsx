"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import MovingDestinationCards from "./components/MovingDestinationCards";
import AutoTripSuggestions from "./components/AutoTripSuggestions";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (!user) {
      // Redirect to signup if not logged in
      window.location.href = '/signup';
      return;
    }

    // Handle different actions for logged-in users
    switch (action) {
      case 'create-itinerary':
        window.location.href = '/itinerary';
        break;
      case 'track-budget':
        window.location.href = '/dashboard';
        break;
      case 'discover-places':
        // Scroll to AI section
        const aiSection = document.getElementById('ai-suggestions');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'get-started':
        window.location.href = '/dashboard';
        break;
      default:
        window.location.href = '/dashboard';
    }
  };

  const scrollToAI = () => {
    if (!user) {
      window.location.href = '/signup';
      return;
    }
    const aiSection = document.getElementById('ai-suggestions');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Plan your next adventure with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              GlobalTrotter
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create detailed itineraries, track your travel budget, and discover amazing destinations. 
            Your perfect journey starts here.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-red-500/20 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">✈️</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">Create Itineraries</h3>
            <p className="text-gray-300 mb-4">Plan your trips day by day with detailed activities and schedules.</p>
            <button 
              onClick={() => handleActionClick('create-itinerary')}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          <div className="bg-gray-900 border border-red-500/20 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">Track Budget</h3>
            <p className="text-gray-300 mb-4">Monitor your travel expenses and stay within your budget.</p>
            <button 
              onClick={() => handleActionClick('track-budget')}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Start Planning
            </button>
          </div>

          <div className="bg-gray-900 border border-red-500/20 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">Discover Places</h3>
            <p className="text-gray-300 mb-4">Explore new destinations and create unforgettable memories.</p>
            <button 
              onClick={() => handleActionClick('discover-places')}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Moving Destination Cards */}
        <MovingDestinationCards />

        {/* AI Trip Suggestions */}
        <div id="ai-suggestions">
          <AutoTripSuggestions />
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-red-500/20 rounded-xl shadow-lg p-8 hover:border-red-500/40 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Ready to start your journey?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {!user ? (
              <>
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all transform hover:scale-105"
                >
                  <span className="mr-2">🚀</span>
                  Create Account
                </Link>
                <Link 
                  href="/login" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
                >
                  <span className="mr-2">🔑</span>
                  Log In
                </Link>
              </>
            ) : (
              <button 
                onClick={() => handleActionClick('get-started')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all transform hover:scale-105"
              >
                <span className="mr-2">🚀</span>
                Get Started
              </button>
            )}
            {user && (
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 hover:text-white hover:shadow-[0_0_15px_rgba(156,163,175,0.3)] transition-all"
              >
                <span className="mr-2">📊</span>
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-2">📅</div>
            <h4 className="font-semibold text-white">Day-by-Day Planning</h4>
          </div>
          <div className="text-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-2">💳</div>
            <h4 className="font-semibold text-white">Budget Tracking</h4>
          </div>
          <div className="text-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="font-semibold text-white">AI Suggestions</h4>
          </div>
          <div className="text-center p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold text-white">Secure & Private</h4>
          </div>
        </div>
      </div>
    </div>
  );
}