import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Star, IndianRupee, ArrowLeft, BookOpen, TrendingUp,
  MessageSquare, Building2, Award, Plus, Check, Calendar
} from 'lucide-react';
import { getCollege } from '../api';
import { useCompare } from '../context/CompareContext';

const TAB_LIST = ['Overview', 'Courses', 'Placements', 'Reviews'];

export default function CollegeDetailPage() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  useEffect(() => {
    getCollege(id).then(res => {
      setCollege(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <div className="skeleton h-48 rounded-2xl" />
      <div className="skeleton h-6 w-1/2 rounded" />
      <div className="skeleton h-4 w-1/3 rounded" />
    </div>
  );

  if (!college) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h2 className="text-xl font-bold text-slate-700">College not found</h2>
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">← Back to list</Link>
    </div>
  );

  const inCompare = isInCompare(college._id);
  const latestPlacement = college.placements?.[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Colleges
      </Link>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-2xl flex-shrink-0" style={{ fontFamily: 'Syne, sans-serif' }}>
              {college.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-blue-200 text-sm">
                <span className="flex items-center gap-1"><MapPin size={13} />{college.location}</span>
                <span className="flex items-center gap-1"><Calendar size={13} />Est. {college.established}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs font-medium">{college.type}</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Rating', value: college.rating?.toFixed(1), icon: <Star size={14} className="fill-amber-300 text-amber-300" /> },
              { label: 'NIRF Rank', value: college.nirfRank ? `#${college.nirfRank}` : 'N/A', icon: <Award size={14} /> },
              { label: 'NAAC Grade', value: college.naacGrade || 'N/A', icon: <Building2 size={14} /> },
              { label: 'Annual Fees', value: college.totalFees >= 100000 ? `₹${(college.totalFees / 100000).toFixed(1)}L` : `₹${(college.totalFees / 1000).toFixed(0)}K`, icon: <IndianRupee size={14} /> },
            ].map(s => (
              <div key={s.label} className="bg-white/15 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1 text-blue-200 text-xs mb-1">{s.icon}{s.label}</div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare + Exams */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => inCompare ? removeFromCompare(college._id) : addToCompare(college)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            inCompare
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 bg-white'
          }`}
        >
          {inCompare ? <Check size={15} /> : <Plus size={15} />}
          {inCompare ? 'Added to Compare' : 'Add to Compare'}
        </button>
        {college.entranceExams?.map(exam => (
          <span key={exam} className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
            {exam}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 overflow-x-auto">
        {TAB_LIST.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-max py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'Overview' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>About</h2>
              <p className="text-slate-600 leading-relaxed">{college.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quick info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 mb-3 text-base" style={{ fontFamily: 'Syne, sans-serif' }}>Quick Info</h3>
                <dl className="space-y-2.5">
                  {[
                    ['Type', college.type],
                    ['Established', college.established],
                    ['Location', college.location],
                    ['State', college.state],
                    ['NAAC Grade', college.naacGrade],
                    ['NIRF Rank', college.nirfRank ? `#${college.nirfRank}` : 'N/A'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                      <dt className="text-sm text-slate-500">{k}</dt>
                      <dd className="text-sm font-semibold text-slate-800">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Placement snapshot */}
              {latestPlacement && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-5">
                  <h3 className="font-bold text-slate-800 mb-3 text-base flex items-center gap-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    <TrendingUp size={16} className="text-emerald-600" /> Placement Snapshot {latestPlacement.year}
                  </h3>
                  <dl className="space-y-2.5">
                    {[
                      ['Placement %', `${latestPlacement.placementPercentage}%`],
                      ['Avg Package', `₹${(latestPlacement.averagePackage / 100000).toFixed(1)}L`],
                      ['Highest Package', `₹${(latestPlacement.highestPackage / 100000).toFixed(0)}L`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center py-1.5 border-b border-emerald-100 last:border-0">
                        <dt className="text-sm text-slate-500">{k}</dt>
                        <dd className="text-sm font-bold text-emerald-700">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-1.5">Top Recruiters</p>
                    <div className="flex flex-wrap gap-1.5">
                      {latestPlacement.topRecruiters?.slice(0, 5).map(r => (
                        <span key={r} className="text-xs bg-white border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Courses' && (
          <div className="space-y-3">
            {college.courses?.length === 0 && <p className="text-slate-500 text-sm">No course data available.</p>}
            {college.courses?.map((course, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{course.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{course.duration} · {course.seats} seats</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Annual Fee</p>
                  <p className="font-bold text-blue-600 text-sm">
                    ₹{course.fees >= 100000 ? `${(course.fees / 100000).toFixed(1)}L` : `${(course.fees / 1000).toFixed(0)}K`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Placements' && (
          <div className="space-y-4">
            {college.placements?.length === 0 && <p className="text-slate-500 text-sm">No placement data available.</p>}
            {college.placements?.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Placements {p.year}</h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
                    {p.placementPercentage}% Placed
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Avg Package', value: `₹${(p.averagePackage / 100000).toFixed(1)}L` },
                    { label: 'Highest', value: `₹${(p.highestPackage / 100000).toFixed(0)}L` },
                    { label: 'Placement %', value: `${p.placementPercentage}%` },
                  ].map(s => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                      <p className="font-bold text-slate-800 text-base" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Top Recruiters</p>
                  <div className="flex flex-wrap gap-2">
                    {p.topRecruiters?.map(r => (
                      <span key={r} className="text-sm bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-lg font-medium">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="space-y-3">
            {college.reviews?.length === 0 && <p className="text-slate-500 text-sm">No reviews yet.</p>}
            {college.reviews?.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {r.author?.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{r.author}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={13} className={si < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
