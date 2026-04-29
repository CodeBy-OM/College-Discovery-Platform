import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { compareColleges } from '../api';
import { ArrowLeft, X, Scale, Star, MapPin, IndianRupee, Award, TrendingUp, BookOpen, Check, Minus } from 'lucide-react';

const formatFees = (f) => f >= 100000 ? `₹${(f / 100000).toFixed(1)}L` : `₹${(f / 1000).toFixed(0)}K`;
const formatPkg = (p) => `₹${(p / 100000).toFixed(1)}L`;

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (compareList.length === 0) { setDetails([]); return; }
    setLoading(true);
    compareColleges(compareList.map(c => c._id))
      .then(res => { setDetails(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [compareList]);

  if (compareList.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
      <Scale size={56} className="mx-auto text-slate-300 mb-4" />
      <h2 className="text-2xl font-bold text-slate-700 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>No colleges selected</h2>
      <p className="text-slate-500 mb-6">Go to the college listing and click the <strong>+</strong> button on up to 3 colleges to compare them.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
        <ArrowLeft size={16} /> Browse Colleges
      </Link>
    </div>
  );

  const getBest = (field, higherIsBetter = true) => {
    if (details.length < 2) return null;
    const values = details.map(c => {
      if (field === 'placement') return c.placements?.[0]?.averagePackage || 0;
      if (field === 'placementPct') return c.placements?.[0]?.placementPercentage || 0;
      return c[field] || 0;
    });
    const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
    return values.map(v => v === best);
  };

  const bestRating = getBest('rating', true);
  const bestFees = getBest('totalFees', false);
  const bestPkg = getBest('placement', true);
  const bestPct = getBest('placementPct', true);
  const bestRank = getBest('nirfRank', false);

  const cols = details.length;

  const Row = ({ label, values, highlights, formatter = (v) => v || '—', icon }) => (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-3 px-4 text-sm text-slate-500 font-medium bg-slate-50 w-36">
        <div className="flex items-center gap-1.5">{icon}{label}</div>
      </td>
      {values.map((val, i) => (
        <td key={i} className={`py-3 px-4 text-center text-sm font-semibold ${highlights?.[i] ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700'}`}>
          <div className="flex items-center justify-center gap-1">
            {highlights?.[i] && <Check size={13} className="text-emerald-500" />}
            {formatter(val)}
          </div>
        </td>
      ))}
      {Array.from({ length: 3 - cols }).map((_, i) => (
        <td key={`empty-${i}`} className="py-3 px-4 text-center text-slate-300">—</td>
      ))}
    </tr>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Colleges
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            Compare Colleges
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Side-by-side comparison of {details.length} college{details.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={clearCompare} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
          <X size={14} /> Clear All
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* College headers */}
          <div className="grid border-b border-slate-200" style={{ gridTemplateColumns: `144px repeat(3, 1fr)` }}>
            <div className="bg-slate-50 p-4" />
            {details.map(college => (
              <div key={college._id} className="p-4 border-l border-slate-100">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {college.name.charAt(0)}
                  </div>
                  <button onClick={() => removeFromCompare(college._id)} className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
                    <X size={14} />
                  </button>
                </div>
                <Link to={`/college/${college._id}`} className="text-sm font-bold text-slate-800 hover:text-blue-600 leading-tight block line-clamp-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {college.name}
                </Link>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin size={11} />{college.location}</p>
              </div>
            ))}
            {Array.from({ length: 3 - cols }).map((_, i) => (
              <div key={`add-${i}`} className="p-4 border-l border-slate-100 flex items-center justify-center">
                <Link to="/" className="text-center">
                  <div className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-xl mx-auto mb-2">+</div>
                  <span className="text-xs text-slate-400">Add college</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col style={{ width: '144px' }} />
                {Array.from({ length: 3 }).map((_, i) => <col key={i} />)}
              </colgroup>
              <tbody>
                <tr className="bg-blue-50/50">
                  <td colSpan={4} className="py-2 px-4 text-xs font-bold text-blue-700 uppercase tracking-wider">Basic Info</td>
                </tr>
                <Row label="Type" values={details.map(c => c.type)} icon={<Award size={13} />} />
                <Row label="NIRF Rank" values={details.map(c => c.nirfRank)} highlights={bestRank} formatter={v => v ? `#${v}` : '—'} icon={<Award size={13} />} />
                <Row label="NAAC Grade" values={details.map(c => c.naacGrade || '—')} icon={<Award size={13} />} />
                <Row label="Rating" values={details.map(c => c.rating)} highlights={bestRating} formatter={v => v ? `${v.toFixed(1)} ★` : '—'} icon={<Star size={13} />} />

                <tr className="bg-blue-50/50">
                  <td colSpan={4} className="py-2 px-4 text-xs font-bold text-blue-700 uppercase tracking-wider">Fees</td>
                </tr>
                <Row label="Annual Fees" values={details.map(c => c.totalFees)} highlights={bestFees} formatter={v => v ? formatFees(v) : '—'} icon={<IndianRupee size={13} />} />

                <tr className="bg-blue-50/50">
                  <td colSpan={4} className="py-2 px-4 text-xs font-bold text-blue-700 uppercase tracking-wider">Placements</td>
                </tr>
                <Row label="Avg Package" values={details.map(c => c.placements?.[0]?.averagePackage)} highlights={bestPkg} formatter={v => v ? formatPkg(v) : '—'} icon={<TrendingUp size={13} />} />
                <Row label="Highest Pkg" values={details.map(c => c.placements?.[0]?.highestPackage)} highlights={details.map((c, i) => {
                  const vals = details.map(x => x.placements?.[0]?.highestPackage || 0);
                  return (c.placements?.[0]?.highestPackage || 0) === Math.max(...vals);
                })} formatter={v => v ? formatPkg(v) : '—'} icon={<TrendingUp size={13} />} />
                <Row label="Placed %" values={details.map(c => c.placements?.[0]?.placementPercentage)} highlights={bestPct} formatter={v => v ? `${v}%` : '—'} icon={<TrendingUp size={13} />} />

                <tr className="bg-blue-50/50">
                  <td colSpan={4} className="py-2 px-4 text-xs font-bold text-blue-700 uppercase tracking-wider">Courses</td>
                </tr>
                <Row label="# Courses" values={details.map(c => c.courses?.length || 0)} highlights={details.map((c, i) => {
                  const vals = details.map(x => x.courses?.length || 0);
                  return (c.courses?.length || 0) === Math.max(...vals);
                })} formatter={v => `${v} programs`} icon={<BookOpen size={13} />} />
                <Row label="Entrance" values={details.map(c => c.entranceExams?.join(', ') || '—')} icon={<BookOpen size={13} />} />
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Verdict */}
      {details.length >= 2 && !loading && (
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
          <h3 className="font-bold text-base mb-2 flex items-center gap-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            <Scale size={16} /> Quick Verdict
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            {[
              { label: '🏆 Best Ranked', winner: details.reduce((a, b) => (a.nirfRank || 999) < (b.nirfRank || 999) ? a : b) },
              { label: '💰 Most Affordable', winner: details.reduce((a, b) => (a.totalFees || 999999) < (b.totalFees || 999999) ? a : b) },
              { label: '📈 Best Placements', winner: details.reduce((a, b) => (a.placements?.[0]?.averagePackage || 0) > (b.placements?.[0]?.averagePackage || 0) ? a : b) },
            ].map(({ label, winner }) => (
              <div key={label} className="bg-white/15 rounded-xl p-3">
                <p className="text-blue-200 text-xs mb-1">{label}</p>
                <p className="font-bold text-sm leading-tight">{winner.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
