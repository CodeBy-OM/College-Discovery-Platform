const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    type: "Government",
    established: 1958,
    rating: 4.8,
    totalFees: 200000,
    description: "IIT Bombay is one of India's premier engineering institutions, known for world-class research and innovation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/IIT_Bombay_Logo.svg/200px-IIT_Bombay_Logo.svg.png",
    tags: ["IIT", "Engineering", "Top Ranked"],
    naacGrade: "A++",
    nirfRank: 3,
    entranceExams: ["JEE Advanced"],
    rankCutoffs: [
      { exam: "JEE Advanced", minRank: 1, maxRank: 500 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 200000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 200000, seats: 90 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 200000, seats: 80 },
      { name: "M.Tech", duration: "2 years", fees: 150000, seats: 200 },
      { name: "MBA", duration: "2 years", fees: 400000, seats: 60 },
    ],
    placements: [
      { year: 2023, averagePackage: 2200000, highestPackage: 25000000, placementPercentage: 98, topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Amazon", "Apple"] },
      { year: 2022, averagePackage: 1900000, highestPackage: 22000000, placementPercentage: 97, topRecruiters: ["Google", "Microsoft", "Uber", "Meta"] },
    ],
    reviews: [
      { author: "Rahul Sharma", rating: 5, comment: "Best engineering college in India. Exceptional faculty and infrastructure." },
      { author: "Priya Nair", rating: 5, comment: "Life-changing experience. The alumni network is incredible." },
      { author: "Aditya Kumar", rating: 4, comment: "Tough academics but worth every moment." },
    ]
  },
  {
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Government",
    established: 1961,
    rating: 4.7,
    totalFees: 210000,
    description: "IIT Delhi is a premier technical institution located in the heart of India's capital city.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/IIT_Delhi_Logo.svg/200px-IIT_Delhi_Logo.svg.png",
    tags: ["IIT", "Engineering", "Top Ranked"],
    naacGrade: "A++",
    nirfRank: 2,
    entranceExams: ["JEE Advanced"],
    rankCutoffs: [
      { exam: "JEE Advanced", minRank: 1, maxRank: 450 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 210000, seats: 100 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 210000, seats: 85 },
      { name: "B.Tech Chemical Engineering", duration: "4 years", fees: 210000, seats: 70 },
      { name: "M.Tech", duration: "2 years", fees: 170000, seats: 180 },
    ],
    placements: [
      { year: 2023, averagePackage: 2100000, highestPackage: 28000000, placementPercentage: 97, topRecruiters: ["Google", "Microsoft", "Flipkart", "Amazon", "DE Shaw"] },
      { year: 2022, averagePackage: 1850000, highestPackage: 24000000, placementPercentage: 96, topRecruiters: ["Google", "Uber", "Paytm", "Microsoft"] },
    ],
    reviews: [
      { author: "Arjun Verma", rating: 5, comment: "The research opportunities are unmatched. Brilliant professors." },
      { author: "Sneha Gupta", rating: 4, comment: "Great campus life and excellent placement record." },
    ]
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    state: "Rajasthan",
    type: "Deemed",
    established: 1964,
    rating: 4.6,
    totalFees: 1800000,
    description: "BITS Pilani is a deemed university known for its industry connections and flexible academic structure.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/BITS_Pilani-Logo.svg/200px-BITS_Pilani-Logo.svg.png",
    tags: ["Engineering", "Private", "Top Private"],
    naacGrade: "A",
    nirfRank: 25,
    entranceExams: ["BITSAT"],
    rankCutoffs: [
      { exam: "BITSAT", minRank: 1, maxRank: 5000 }
    ],
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 1800000, seats: 180 },
      { name: "B.E. Electronics", duration: "4 years", fees: 1800000, seats: 120 },
      { name: "B.Pharm", duration: "4 years", fees: 1600000, seats: 90 },
      { name: "M.E.", duration: "2 years", fees: 900000, seats: 100 },
    ],
    placements: [
      { year: 2023, averagePackage: 1700000, highestPackage: 20000000, placementPercentage: 95, topRecruiters: ["Goldman Sachs", "Microsoft", "Qualcomm", "Intel", "Texas Instruments"] },
      { year: 2022, averagePackage: 1500000, highestPackage: 18000000, placementPercentage: 94, topRecruiters: ["Google", "Adobe", "Flipkart"] },
    ],
    reviews: [
      { author: "Karan Mehta", rating: 5, comment: "The Practice School program is unique. Real industry exposure." },
      { author: "Ananya Singh", rating: 4, comment: "Beautiful campus and vibrant student life." },
    ]
  },
  {
    name: "National Institute of Technology Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Government",
    established: 1964,
    rating: 4.4,
    totalFees: 500000,
    description: "NIT Trichy is one of the top NITs in India, renowned for its engineering programs and strong alumni network.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/NIT_Trichy_Logo.svg/200px-NIT_Trichy_Logo.svg.png",
    tags: ["NIT", "Engineering", "Government"],
    naacGrade: "A++",
    nirfRank: 10,
    entranceExams: ["JEE Main"],
    rankCutoffs: [
      { exam: "JEE Main", minRank: 1000, maxRank: 15000 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 500000, seats: 90 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 500000, seats: 120 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 500000, seats: 100 },
      { name: "M.Tech", duration: "2 years", fees: 200000, seats: 150 },
    ],
    placements: [
      { year: 2023, averagePackage: 1200000, highestPackage: 8000000, placementPercentage: 92, topRecruiters: ["TCS", "Infosys", "Wipro", "L&T", "Cognizant"] },
      { year: 2022, averagePackage: 1100000, highestPackage: 7500000, placementPercentage: 90, topRecruiters: ["TCS", "HCL", "Accenture"] },
    ],
    reviews: [
      { author: "Vijay Kumar", rating: 4, comment: "Excellent faculty. NIT Trichy truly shapes future engineers." },
      { author: "Deepa Rajan", rating: 4, comment: "The campus is peaceful and academic culture is strong." },
    ]
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Deemed",
    established: 1984,
    rating: 4.2,
    totalFees: 700000,
    description: "VIT University offers diverse engineering programs with strong international collaborations.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/200px-Vellore_Institute_of_Technology_seal_2017.svg.png",
    tags: ["Engineering", "Private", "International"],
    naacGrade: "A++",
    nirfRank: 11,
    entranceExams: ["VITEEE"],
    rankCutoffs: [
      { exam: "VITEEE", minRank: 1, maxRank: 50000 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 700000, seats: 500 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 700000, seats: 300 },
      { name: "B.Tech Biotech", duration: "4 years", fees: 650000, seats: 150 },
      { name: "MBA", duration: "2 years", fees: 600000, seats: 120 },
    ],
    placements: [
      { year: 2023, averagePackage: 800000, highestPackage: 6000000, placementPercentage: 87, topRecruiters: ["TCS", "Infosys", "Zoho", "Cognizant", "Amazon"] },
      { year: 2022, averagePackage: 750000, highestPackage: 5500000, placementPercentage: 85, topRecruiters: ["TCS", "HCL", "Wipro"] },
    ],
    reviews: [
      { author: "Rohit Pandey", rating: 4, comment: "Good campus, great placement support." },
      { author: "Meera Iyer", rating: 4, comment: "Lots of international exchange programs available." },
    ]
  },
  {
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    state: "Delhi",
    type: "Government",
    established: 1941,
    rating: 4.1,
    totalFees: 600000,
    description: "DTU is a leading technical university in Delhi offering undergraduate and postgraduate programs.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Delhi_Technological_University_logo.svg/200px-Delhi_Technological_University_logo.svg.png",
    tags: ["Engineering", "Government", "Delhi"],
    naacGrade: "A",
    nirfRank: 36,
    entranceExams: ["JEE Main"],
    rankCutoffs: [
      { exam: "JEE Main", minRank: 5000, maxRank: 40000 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 600000, seats: 180 },
      { name: "B.Tech Software Engineering", duration: "4 years", fees: 600000, seats: 120 },
      { name: "B.Tech Electronics", duration: "4 years", fees: 600000, seats: 100 },
      { name: "M.Tech", duration: "2 years", fees: 250000, seats: 100 },
    ],
    placements: [
      { year: 2023, averagePackage: 1000000, highestPackage: 7000000, placementPercentage: 88, topRecruiters: ["Microsoft", "Amazon", "Samsung", "Paytm", "TCS"] },
      { year: 2022, averagePackage: 900000, highestPackage: 6000000, placementPercentage: 86, topRecruiters: ["Google", "Flipkart", "HCL"] },
    ],
    reviews: [
      { author: "Shubham Jain", rating: 4, comment: "Excellent for Delhi students. Affordable fees and great opportunities." },
      { author: "Pooja Agarwal", rating: 4, comment: "The college has grown tremendously. Strong coding culture." },
    ]
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    type: "Private",
    established: 1957,
    rating: 4.0,
    totalFees: 1200000,
    description: "MIT Manipal is one of India's best private engineering institutions with a strong global presence.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/MIT-Manipal.svg/200px-MIT-Manipal.svg.png",
    tags: ["Engineering", "Private", "International"],
    naacGrade: "A+",
    nirfRank: 50,
    entranceExams: ["MET", "JEE Main"],
    rankCutoffs: [
      { exam: "MET", minRank: 1, maxRank: 30000 },
      { exam: "JEE Main", minRank: 20000, maxRank: 100000 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 1200000, seats: 300 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 1200000, seats: 200 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 1100000, seats: 150 },
      { name: "MBA", duration: "2 years", fees: 800000, seats: 90 },
    ],
    placements: [
      { year: 2023, averagePackage: 850000, highestPackage: 7500000, placementPercentage: 85, topRecruiters: ["Infosys", "TCS", "Wipro", "Bosch", "L&T"] },
      { year: 2022, averagePackage: 800000, highestPackage: 7000000, placementPercentage: 83, topRecruiters: ["TCS", "Accenture", "Cognizant"] },
    ],
    reviews: [
      { author: "Nikhil Shetty", rating: 4, comment: "Beautiful campus. The student life at MIT Manipal is amazing." },
      { author: "Asha Bhat", rating: 4, comment: "Good industry exposure through internship programs." },
    ]
  },
  {
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    type: "Government",
    established: 1955,
    rating: 4.3,
    totalFees: 50000,
    description: "Jadavpur University is a prestigious government university known for quality education at affordable fees.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Jadavpur_University_Logo.svg/200px-Jadavpur_University_Logo.svg.png",
    tags: ["Engineering", "Government", "Research"],
    naacGrade: "A++",
    nirfRank: 12,
    entranceExams: ["WBJEE", "JEE Main"],
    rankCutoffs: [
      { exam: "WBJEE", minRank: 1, maxRank: 3000 },
      { exam: "JEE Main", minRank: 5000, maxRank: 25000 }
    ],
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 50000, seats: 90 },
      { name: "B.E. Electronics", duration: "4 years", fees: 50000, seats: 80 },
      { name: "B.E. Electrical", duration: "4 years", fees: 50000, seats: 90 },
      { name: "M.E.", duration: "2 years", fees: 30000, seats: 80 },
    ],
    placements: [
      { year: 2023, averagePackage: 900000, highestPackage: 6500000, placementPercentage: 89, topRecruiters: ["TCS", "Wipro", "Cognizant", "L&T", "IBM"] },
    ],
    reviews: [
      { author: "Sohini Das", rating: 5, comment: "Incredible value for money. Elite education at minimal fees." },
      { author: "Debraj Roy", rating: 4, comment: "Exceptional research culture. Professors are very knowledgeable." },
    ]
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Deemed",
    established: 1985,
    rating: 3.9,
    totalFees: 900000,
    description: "SRM University offers diverse programs with emphasis on practical skills and industry readiness.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/SRM_IST_Logo.svg/200px-SRM_IST_Logo.svg.png",
    tags: ["Engineering", "Private", "Medical"],
    naacGrade: "A++",
    nirfRank: 40,
    entranceExams: ["SRMJEEE", "JEE Main"],
    rankCutoffs: [
      { exam: "SRMJEEE", minRank: 1, maxRank: 80000 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 900000, seats: 600 },
      { name: "B.Tech AI & ML", duration: "4 years", fees: 950000, seats: 200 },
      { name: "MBBS", duration: "5.5 years", fees: 5000000, seats: 150 },
      { name: "MBA", duration: "2 years", fees: 700000, seats: 200 },
    ],
    placements: [
      { year: 2023, averagePackage: 600000, highestPackage: 5000000, placementPercentage: 80, topRecruiters: ["TCS", "Wipro", "Infosys", "Accenture"] },
    ],
    reviews: [
      { author: "Mithun S", rating: 4, comment: "Good infrastructure and diverse programs." },
      { author: "Kaviya R", rating: 3, comment: "Decent education but could improve placement quality." },
    ]
  },
  {
    name: "Amity University",
    location: "Noida, Uttar Pradesh",
    state: "Uttar Pradesh",
    type: "Private",
    established: 2005,
    rating: 3.7,
    totalFees: 800000,
    description: "Amity University is a large private university offering programs across engineering, management, and humanities.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Amity_University_logo.svg/200px-Amity_University_logo.svg.png",
    tags: ["Engineering", "Management", "Private"],
    naacGrade: "A+",
    nirfRank: 60,
    entranceExams: ["AMUEEE", "JEE Main"],
    rankCutoffs: [
      { exam: "JEE Main", minRank: 50000, maxRank: 300000 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 800000, seats: 400 },
      { name: "BBA", duration: "3 years", fees: 600000, seats: 300 },
      { name: "B.Com", duration: "3 years", fees: 400000, seats: 400 },
      { name: "MBA", duration: "2 years", fees: 750000, seats: 250 },
    ],
    placements: [
      { year: 2023, averagePackage: 500000, highestPackage: 3000000, placementPercentage: 75, topRecruiters: ["TCS", "Infosys", "HCL", "Deloitte"] },
    ],
    reviews: [
      { author: "Ankur Tyagi", rating: 3, comment: "Good management programs. Engineering could be stronger." },
      { author: "Simran Kaur", rating: 4, comment: "Modern campus and active extracurriculars." },
    ]
  },
  {
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Government",
    established: 1959,
    rating: 4.9,
    totalFees: 200000,
    description: "IIT Madras is India's top-ranked institution known for research excellence and innovation ecosystem.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/200px-IIT_Madras_Logo.svg.png",
    tags: ["IIT", "Engineering", "Top Ranked", "Research"],
    naacGrade: "A++",
    nirfRank: 1,
    entranceExams: ["JEE Advanced"],
    rankCutoffs: [
      { exam: "JEE Advanced", minRank: 1, maxRank: 400 }
    ],
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 200000, seats: 110 },
      { name: "B.Tech Aerospace Engineering", duration: "4 years", fees: 200000, seats: 60 },
      { name: "B.Tech Ocean Engineering", duration: "4 years", fees: 200000, seats: 40 },
      { name: "M.Tech", duration: "2 years", fees: 150000, seats: 250 },
      { name: "PhD", duration: "4-5 years", fees: 100000, seats: 500 },
    ],
    placements: [
      { year: 2023, averagePackage: 2400000, highestPackage: 30000000, placementPercentage: 99, topRecruiters: ["Google", "Microsoft", "Uber", "Goldman Sachs", "Apple", "Meta"] },
      { year: 2022, averagePackage: 2200000, highestPackage: 27000000, placementPercentage: 98, topRecruiters: ["Google", "Amazon", "Qualcomm"] },
    ],
    reviews: [
      { author: "Krishnaraj T", rating: 5, comment: "The best in the country, no doubt. World-class research." },
      { author: "Lakshmi P", rating: 5, comment: "Surrounded by a forest inside Chennai. Magical academic environment." },
    ]
  },
  {
    name: "PSG College of Technology",
    location: "Coimbatore, Tamil Nadu",
    state: "Tamil Nadu",
    type: "Private",
    established: 1951,
    rating: 4.1,
    totalFees: 450000,
    description: "PSG Tech is a reputed autonomous institution known for strong engineering programs and excellent placements.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/PSG_College_of_Technology_logo.svg/200px-PSG_College_of_Technology_logo.svg.png",
    tags: ["Engineering", "Autonomous", "Tamil Nadu"],
    naacGrade: "A++",
    nirfRank: 33,
    entranceExams: ["TNEA", "JEE Main"],
    rankCutoffs: [
      { exam: "TNEA", minRank: 1, maxRank: 20000 }
    ],
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 450000, seats: 120 },
      { name: "B.E. Mechanical", duration: "4 years", fees: 400000, seats: 100 },
      { name: "B.E. Civil", duration: "4 years", fees: 380000, seats: 80 },
      { name: "MBA", duration: "2 years", fees: 300000, seats: 60 },
    ],
    placements: [
      { year: 2023, averagePackage: 700000, highestPackage: 4500000, placementPercentage: 88, topRecruiters: ["Zoho", "TCS", "Infosys", "Cognizant", "L&T"] },
    ],
    reviews: [
      { author: "Balaji M", rating: 4, comment: "Excellent discipline and academic culture. Zoho hires heavily from here." },
    ]
  }
];

module.exports = colleges;
