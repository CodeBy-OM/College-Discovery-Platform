import { useNavigate } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { Scale, X } from 'lucide-react';

export default function CompareBar() {
  const { compareList, removeFromCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-slate-300">
          <Scale size={15} />
          <span>Compare</span>
        </div>

        <div className="flex items-center gap-2">
          {compareList.map(college => (
            <div key={college._id} className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
              <span className="text-xs font-medium max-w-[120px] truncate">
                {college.name.split(' ').slice(0, 3).join(' ')}
              </span>
              <button
                onClick={() => removeFromCompare(college._id)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {compareList.length < 3 && (
            <div className="w-24 h-8 rounded-lg border border-dashed border-slate-600 flex items-center justify-center text-xs text-slate-500">
              + Add more
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/compare')}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
        >
          Compare Now
        </button>
      </div>
    </div>
  );
}
