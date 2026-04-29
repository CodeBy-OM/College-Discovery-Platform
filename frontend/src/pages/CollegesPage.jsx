import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import CollegeCard from '../components/CollegeCard';
import { getColleges, getStates } from '../api';

const FEES_RANGES = [
  { label: 'Any', min: 0, max: 999999999 },
  { label: 'Under ₹1L', min: 0, max: 100000 },
  { label: '₹1L – ₹5L', min: 100000, max: 500000 },
  { label: '₹5L – ₹15L', min: 500000, max: 1500000 },
  { label: '₹15L+', min: 1500000, max: 999999999 },
];

const COURSES = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'MBA', 'Electronics'];

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    state: '',
    feesRange: FEES_RANGES[0],
    course: '',
    sortBy: 'nirfRank',
  });

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.state, filters.feesRange, filters.course, filters.sortBy]);

  useEffect(() => {
    fetchColleges();
  }, [debouncedSearch, filters.state, filters.feesRange, filters.course, filters.sortBy, page]);

  useEffect(() => {
    getStates().then(res => setStates(res.data));
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const res = await getColleges({
        search: debouncedSearch,
        state: filters.state,
        minFees: filters.feesRange.min,
        maxFees: filters.feesRange.max,
        course: filters.course,
        sortBy: filters.sortBy,
        page,
        limit: 9,
      });
      setColleges(res.data.colleges);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ search: '', state: '', feesRange: FEES_RANGES[0], course: '', sortBy: 'nirfRank' });
  };

  const hasActiveFilters = filters.state || filters.feesRange !== FEES_RANGES[0] || filters.course;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          Find Your <span className="gradient-text">Dream College</span>
        </h1>
        <p className="text-slate-500 text-base">
          Explore {total > 0 ? total : '...'} colleges across India. Compare, predict, and decide.
        </p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search colleges by name or location..."
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {filters.search && (
            <button onClick={() => setFilters(f => ({ ...f, search: '' }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}
          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="nirfRank">NIRF Rank</option>
          <option value="rating">Top Rated</option>
          <option value="fees_asc">Fees: Low to High</option>
          <option value="fees_desc">Fees: High to Low</option>
        </select>

        {/* Filter toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            filtersOpen || hasActiveFilters
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && <span className="w-5 h-5 rounded-full bg-white text-blue-600 text-xs flex items-center justify-center font-bold">!</span>}
        </button>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Filter Colleges</h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                <X size={14} /> Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">State</label>
              <select
                value={filters.state}
                onChange={e => setFilters(f => ({ ...f, state: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Fees */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Fee Range</label>
              <div className="flex flex-wrap gap-2">
                {FEES_RANGES.map(range => (
                  <button
                    key={range.label}
                    onClick={() => setFilters(f => ({ ...f, feesRange: range }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      filters.feesRange.label === range.label
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Course</label>
              <select
                value={filters.course}
                onChange={e => setFilters(f => ({ ...f, course: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Courses</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          {loading ? 'Loading...' : `${total} college${total !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-slate-200">
              <div className="skeleton h-32" />
              <div className="p-4 space-y-3">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
                <div className="skeleton h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : colleges.length === 0 ? (
        <div className="text-center py-20">
          <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>No colleges found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your filters or search term</p>
          <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((c, i) => (
            <div key={c._id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <CollegeCard college={c} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) => p === '...' ? (
                <span key={`dot-${i}`} className="px-2 py-2 text-slate-400 text-sm">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    p === page ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))
            }
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
