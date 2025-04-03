import { useState } from 'react';
import axios from 'axios';

const COUNTRIES = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'IN', 'BR'];

export default function Home() {
  const [input, setInput] = useState({
    postUrl: '',
    platform: 'meta',
    budget: 100,
    selectedCountries: ['US']
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/generate', input);
      setResults(response.data);
    } catch (err) {
      setError('Failed to generate. Check your URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCountry = (country) => {
    setInput(prev => ({
      ...prev,
      selectedCountries: prev.selectedCountries.includes(country)
        ? prev.selectedCountries.filter(c => c !== country)
        : [...prev.selectedCountries, country]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">NAdX.ai</h1>
        <p className="text-gray-600">AI-Powered Ad Campaign Generator</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Social Media Post URL
            </label>
            <input
              type="url"
              value={input.postUrl}
              onChange={(e) => setInput({...input, postUrl: e.target.value})}
              placeholder="https://www.instagram.com/p/..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Platform
              </label>
              <select
                value={input.platform}
                onChange={(e) => setInput({...input, platform: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="meta">Meta (Facebook/Instagram)</option>
                <option value="tiktok">TikTok</option>
                <option value="google">Google Ads</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Daily Budget ($)
              </label>
              <input
                type="number"
                min="10"
                value={input.budget}
                onChange={(e) => setInput({...input, budget: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Target Countries
            </label>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map(country => (
                <button
                  key={country}
                  type="button"
                  onClick={() => toggleCountry(country)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    input.selectedCountries.includes(country)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : 'Generate Campaign'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Generated Campaign</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Target Audience</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><span className="font-medium">Age:</span> {results.targetAudience.demographics.age || 'N/A'}</p>
                  <p><span className="font-medium">Gender:</span> {results.targetAudience.demographics.gender || 'N/A'}</p>
                  <p>
                    <span className="font-medium">Locations:</span> {results.targetAudience.demographics.locations?.join(', ') || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Budget Recommendations</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><span className="font-medium">Daily Budget:</span> ${results.budgetRecommendations.dailyBudget}</p>
                  <p><span className="font-medium">Bid Strategy:</span> {results.budgetRecommendations.bidStrategy || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {results.targetAudience.interests?.map((interest, i) => (
                  <span 
                    key={i} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Behaviors</h3>
              <ul className="list-disc pl-5 space-y-1">
                {results.targetAudience.behaviors?.map((behavior, i) => (
                  <li key={i} className="text-gray-600">{behavior}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(results, null, 2));
                  alert('Copied to clipboard!');
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
              >
                Copy JSON
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>NAdX.ai - AI-Powered Ad Campaign Generator</p>
      </footer>
    </div>
  );
}
