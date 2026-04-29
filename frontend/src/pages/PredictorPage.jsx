import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Search, MapPin, Star, IndianRupee, ChevronRight, Info } from 'lucide-react';
import { predictColleges } from '../api';

const EXAMS = [
  { value: 'JEE Advanced', label: 'JEE Advanced', desc: 'IITs, top 2.5L students', range: '1 – 50,000' },
  { value: 'JEE Main', label: 'JEE Main', desc: 'NITs, IIITs, GFTIs', range: '1 – 10,00,000' },
  { value: 'BITSAT', label: 'BITSAT', desc: 'BITS campuses', range: '1 – 5,00,000' },
  { value: 'WBJEE', label: 'WBJEE', desc: 'West Bengal colleges', range: '1 – 1,00,000' },
];

const chanceConfig = {
  Excellent: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  Good: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  Moderate: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
};

export default function PredictorPage() {
  const [exam, setExam] = useState('');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handlePredict = async () => {
    if (!exam || !rank || isNaN(rank) || Number(rank) <= 0) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await predictColleges(exam, Number(rank));
      setResults(res.data);
    } catch (e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectedExam = EXAMS.find(e => e.value === exam);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Brain size={26} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          College Predictor
        </h1>
        <p className="text-slate-500">Enter your exam and rank to discover which colleges you can get into</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        {/* Exam selector */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Exam</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EXAMS.map(e => (
              <button
                key={e.value}
                onClick={() => setExam(e.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  exam === e.value
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <p className={`font-bold text-sm ${exam === e.value ? 'text-white' : 'text-slate-800'}`}>{e.label}</p>
                <p className={`text-xs mt-0.5 ${exam === e.value ? 'text-blue-200' : 'text-slate-400'}`}>{e.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Rank input */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your Rank
            {selectedExam && <span className="ml-2 font-normal text-slate-400">(typical range: {selectedExam.range})</span>}
          </label>
          <input
            type="number"
            placeholder="e.g. 2500"
            value={rank}
            onChange={e => setRank(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handlePredict()}
            min={1}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
          />
        </div>

        <button
          onClick={handlePredict}
          disabled={!exam || !rank || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Predicting...</>
          ) : (
            <><Search size={16} />Predict My Colleges</>
          )}
        </button>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-8">
        <Info size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p>Predictions are based on historical cutoff data and are indicative only. Actual cutoffs may vary by year, category, and branch. Always verify with official sources.</p>
      </div>

      {/* Results */}
      {searched && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            {loading ? 'Finding colleges...' : results?.length > 0 ? `${results.length} College${results.length !== 1 ? 's' : ''} You May Qualify For` : 'No colleges found'}
          </h2>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
            </div>
          ) : results?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Brain size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">No colleges found for your rank</p>
              <p className="text-slate-400 text-sm mt-1">Try a different exam or a higher rank range</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((college, i) => {
                const cfg = chanceConfig[college.chance] || chanceConfig.Moderate;
                const latestPlacement = college.placements?.[0];
                return (
                  <div key={college._id} className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-4 animate-fade-in`} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0" style={{ fontFamily: 'Syne, sans-serif' }}>
                          {college.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{college.name}</h3>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                              {college.chance} Chance
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin size={11} />{college.location}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
                            <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" />{college.rating?.toFixed(1)}</span>
                            <span className="flex items-center gap-1"><IndianRupee size={11} className="text-emerald-500" />{college.totalFees >= 100000 ? `${(college.totalFees/100000).toFixed(1)}L/yr` : `${(college.totalFees/1000).toFixed(0)}K/yr`}</span>
                            {college.nirfRank && <span className="font-medium text-indigo-600">NIRF #{college.nirfRank}</span>}
                            {latestPlacement && <span className="text-emerald-600 font-medium">{latestPlacement.placementPercentage}% placed</span>}
                          </div>
                        </div>
                      </div>
                      <Link to={`/college/${college._id}`} className="flex-shrink-0 p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors">
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
