const express = require('express');
const router = express.Router();
const College = require('../models/College');

// GET /api/colleges - List with search, filter, pagination
router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      state = '',
      minFees = 0,
      maxFees = 999999999,
      course = '',
      page = 1,
      limit = 9,
      sortBy = 'nirfRank',
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    if (state) query.state = { $regex: state, $options: 'i' };

    query.totalFees = {
      $gte: Number(minFees),
      $lte: Number(maxFees),
    };

    if (course) {
      query['courses.name'] = { $regex: course, $options: 'i' };
    }

    const sortOptions = {
      nirfRank: { nirfRank: 1 },
      rating: { rating: -1 },
      fees_asc: { totalFees: 1 },
      fees_desc: { totalFees: -1 },
    };

    const sort = sortOptions[sortBy] || { nirfRank: 1 };

    const total = await College.countDocuments(query);
    const colleges = await College.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select('name location state type rating totalFees naacGrade nirfRank tags courses image entranceExams');

    res.json({
      colleges,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/colleges/states - Get unique states for filter
router.get('/states', async (req, res) => {
  try {
    const states = await College.distinct('state');
    res.json(states.sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/colleges/predict - Predict colleges based on exam + rank
router.get('/predict', async (req, res) => {
  try {
    const { exam = '', rank = 0 } = req.query;
    const rankNum = Number(rank);

    if (!exam || !rankNum) {
      return res.status(400).json({ error: 'Exam and rank are required' });
    }

    const colleges = await College.find({
      entranceExams: { $regex: exam, $options: 'i' },
      rankCutoffs: {
        $elemMatch: {
          exam: { $regex: exam, $options: 'i' },
          minRank: { $lte: rankNum },
          maxRank: { $gte: rankNum },
        }
      }
    }).select('name location state type rating totalFees naacGrade nirfRank rankCutoffs entranceExams image');

    const withChance = colleges.map(col => {
      const cutoff = col.rankCutoffs.find(r => r.exam.toLowerCase().includes(exam.toLowerCase()));
      let chance = 'Good';
      if (cutoff) {
        const range = cutoff.maxRank - cutoff.minRank;
        const position = rankNum - cutoff.minRank;
        const percentile = position / range;
        if (percentile < 0.3) chance = 'Excellent';
        else if (percentile < 0.6) chance = 'Good';
        else chance = 'Moderate';
      }
      return { ...col.toObject(), chance };
    });

    res.json(withChance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/colleges/compare - Compare multiple colleges
router.get('/compare', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({ error: 'College IDs required' });

    const idArray = ids.split(',').slice(0, 3);
    const colleges = await College.find({ _id: { $in: idArray } });
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/colleges/:id - Single college detail
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
