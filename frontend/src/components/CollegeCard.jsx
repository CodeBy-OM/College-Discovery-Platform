import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, IndianRupee, Plus, Check, BookOpen } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const typeColors = {
  Government: 'bg-green-100 text-green-700',
  Private: 'bg-purple-100 text-purple-700',
  Deemed: 'bg-blue-100 text-blue-700',
};

export default function CollegeCard({ college }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(college._id);
  const navigate = useNavigate();

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) removeFromCompare(college._id);
    else addToCompare(college);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/college/${college._id}`);
  };

  const topCourse = college.courses?.[0];

  return (
    <Link to={`/college/${college._id}`} className="block">
      <div className="college-card bg-white rounded-2xl border border-slate-200 overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-md transition">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-5 pb-8">
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {college.name.charAt(0)}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${typeColors[college.type] || 'bg-slate-100 text-slate-600'}`}>
              {college.type}
            </span>
          </div>

          <h3 className="mt-3 text-white font-bold text-base leading-tight line-clamp-2">
            {college.name}
          </h3>

          {college.nirfRank && (
            <div className="absolute bottom-0 right-4 translate-y-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">
              NIRF #{college.nirfRank}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <MapPin size={13} className="text-blue-500" />
            <span className="truncate">{college.location}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-slate-800">
                {college.rating?.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-600">
              <IndianRupee size={13} className="text-emerald-500" />
              <span>
                {college.totalFees >= 100000
                  ? `${(college.totalFees / 100000).toFixed(1)}L`
                  : `${(college.totalFees / 1000).toFixed(0)}K`}
                /yr
              </span>
            </div>

            {college.naacGrade && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                NAAC {college.naacGrade}
              </span>
            )}
          </div>

          {topCourse && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
              <BookOpen size={12} className="text-blue-500" />
              <span className="truncate">{topCourse.name}</span>
            </div>
          )}

          {college.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {college.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex gap-2">
          {/* FIXED: No nested Link */}
          <button
            onClick={handleViewDetails}
            className="flex-1 text-center py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>

          <button
            onClick={handleCompare}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              inCompare
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
            }`}
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            {inCompare ? <Check size={15} /> : <Plus size={15} />}
          </button>
        </div>

      </div>
    </Link>
  );
}