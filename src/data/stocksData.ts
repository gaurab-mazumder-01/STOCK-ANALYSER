export interface StockData {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  currency?: string;
  price: number;
  previousClose: number;
  openPrice: number;
  dayHigh: number;
  dayLow: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  high52: number;
  low52: number;
  volume: string;
  avgVolume: string;
  dividendYield: string;
  beta: number;
  eps: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  ratingScore: number; // e.g. 4.8 / 5.0
  analystsCount: { buy: number; hold: number; sell: number };
  targetPrice: { low: number; avg: number; high: number };
  about: string;
  strengths: string[];
  risks: string[];
  financials: {
    revenue: string;
    netIncome: string;
    profitMargin: string;
    revenueGrowth: string;
  };
  news: {
    id: string;
    title: string;
    source: string;
    time: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
  }[];
}

export interface ChartCandle {
  time: string;
  dateLabel: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma20?: number;
  ma50?: number;
}

export const POPULAR_STOCKS: StockData[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Technology · Semiconductors',
    price: 138.45,
    previousClose: 134.33,
    openPrice: 135.20,
    dayHigh: 140.20,
    dayLow: 134.80,
    change: 4.12,
    changePercent: 3.07,
    marketCap: '$3.40 Trillion',
    peRatio: 48.6,
    high52: 140.76,
    low52: 45.11,
    volume: '48.2M',
    avgVolume: '52.1M',
    dividendYield: '0.03%',
    beta: 1.68,
    eps: 2.87,
    rating: 'Strong Buy',
    ratingScore: 4.8,
    analystsCount: { buy: 38, hold: 4, sell: 1 },
    targetPrice: { low: 115, avg: 155, high: 185 },
    about: 'NVIDIA designs graphics processing units (GPUs) and system-on-chip units for computing and automotive industries, leading global accelerated AI infrastructure.',
    strengths: [
      'Dominates over 80% of the AI accelerator and datacenter GPU market.',
      'Massive revenue growth driven by Blackwell architecture demand.',
      'Expanding software moat through CUDA ecosystem lock-in.',
    ],
    risks: [
      'Customer concentration among top hyperscalers (Microsoft, Meta, Google).',
      'Geopolitical export restrictions to international markets.',
    ],
    financials: {
      revenue: '$96.3B',
      netIncome: '$53.0B',
      profitMargin: '55.1%',
      revenueGrowth: '+122% YoY',
    },
    news: [
      {
        id: 'n1',
        title: 'NVIDIA Expands AI Factory Architecture Across Global Data Centers',
        source: 'Bloomberg',
        time: '25m ago',
        sentiment: 'Positive',
      },
      {
        id: 'n2',
        title: 'Tech Giants Reaffirm Multi-Billion Dollar Capex Commitments for Hardware',
        source: 'Reuters',
        time: '2h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Technology · Consumer Electronics',
    price: 231.60,
    previousClose: 232.85,
    openPrice: 232.50,
    dayHigh: 234.10,
    dayLow: 230.80,
    change: -1.25,
    changePercent: -0.54,
    marketCap: '$3.52 Trillion',
    peRatio: 34.2,
    high52: 237.23,
    low52: 164.08,
    volume: '34.8M',
    avgVolume: '45.0M',
    dividendYield: '0.43%',
    beta: 1.05,
    eps: 6.77,
    rating: 'Buy',
    ratingScore: 4.2,
    analystsCount: { buy: 29, hold: 11, sell: 2 },
    targetPrice: { low: 195, avg: 248, high: 275 },
    about: 'Apple designs and sells smartphones, personal computers, tablets, wearables, and delivers subscription services like iCloud, App Store, and Apple Pay.',
    strengths: [
      'Unmatched customer loyalty and sticky 2.2B active device ecosystem.',
      'High-margin Services segment continues growing double-digits.',
      'Significant ongoing share buyback program supporting EPS.',
    ],
    risks: [
      'Smartphone upgrade cycles lengthening in key markets.',
      'Regulatory scrutiny around App Store commission fees.',
    ],
    financials: {
      revenue: '$385.6B',
      netIncome: '$101.9B',
      profitMargin: '26.4%',
      revenueGrowth: '+6.1% YoY',
    },
    news: [
      {
        id: 'n4',
        title: 'Apple Intelligence Rollout Drives Early iPhone Upgrade Momentum',
        source: 'CNBC',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Technology · Software & Cloud',
    price: 428.15,
    previousClose: 424.35,
    openPrice: 425.50,
    dayHigh: 431.50,
    dayLow: 425.20,
    change: 3.80,
    changePercent: 0.90,
    marketCap: '$3.18 Trillion',
    peRatio: 36.1,
    high52: 468.35,
    low52: 326.93,
    volume: '18.2M',
    avgVolume: '21.5M',
    dividendYield: '0.78%',
    beta: 1.12,
    eps: 11.86,
    rating: 'Strong Buy',
    ratingScore: 4.7,
    analystsCount: { buy: 36, hold: 3, sell: 0 },
    targetPrice: { low: 430, avg: 495, high: 550 },
    about: 'Microsoft is a global technology company providing software, Azure cloud computing, productivity tools (Office 365), and enterprise AI integrations.',
    strengths: [
      'Azure Cloud accelerating market share gains against rivals.',
      'Enterprise Copilot integration across Microsoft 365 driving ARPU.',
      'Diversified revenue base across enterprise, cloud, and gaming.',
    ],
    risks: [
      'High capital expenditures for data center expansion impacting near-term FCF.',
    ],
    financials: {
      revenue: '$245.1B',
      netIncome: '$88.1B',
      profitMargin: '35.9%',
      revenueGrowth: '+15.2% YoY',
    },
    news: [
      {
        id: 'n6',
        title: 'Azure Revenue Growth Accelerates on Enterprise AI Adoption',
        source: 'Reuters',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Consumer Discretionary · Auto & Energy',
    price: 218.40,
    previousClose: 212.80,
    openPrice: 214.50,
    dayHigh: 221.80,
    dayLow: 213.20,
    change: 5.60,
    changePercent: 2.63,
    marketCap: '$698 Billion',
    peRatio: 62.4,
    high52: 271.00,
    low52: 138.80,
    volume: '64.1M',
    avgVolume: '72.0M',
    dividendYield: '0.00%',
    beta: 2.34,
    eps: 3.50,
    rating: 'Hold',
    ratingScore: 3.4,
    analystsCount: { buy: 18, hold: 16, sell: 9 },
    targetPrice: { low: 120, avg: 225, high: 310 },
    about: 'Tesla designs, manufactures, and sells electric vehicles, solar energy systems, and battery storage products, while developing autonomous robotaxis.',
    strengths: [
      'Industry-leading EV production manufacturing margins.',
      'Megapack Energy storage division growing over 100% year-over-year.',
      'Full Self-Driving (FSD) fleet accumulating billions of training miles.',
    ],
    risks: [
      'Global automotive price competition and margin compression.',
      'Timelines for commercial unsupervised autonomous robotaxis.',
    ],
    financials: {
      revenue: '$97.2B',
      netIncome: '$12.1B',
      profitMargin: '12.4%',
      revenueGrowth: '+4.8% YoY',
    },
    news: [
      {
        id: 'n7',
        title: 'Tesla Energy Megapack Deployments Reach All-Time Quarterly High',
        source: 'Bloomberg',
        time: '35m ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Consumer Discretionary · E-Commerce & Cloud',
    price: 186.50,
    previousClose: 184.55,
    openPrice: 185.10,
    dayHigh: 188.20,
    dayLow: 184.40,
    change: 1.95,
    changePercent: 1.06,
    marketCap: '$1.94 Trillion',
    peRatio: 41.2,
    high52: 201.20,
    low52: 118.35,
    volume: '29.4M',
    avgVolume: '36.2M',
    dividendYield: '0.00%',
    beta: 1.25,
    eps: 4.53,
    rating: 'Strong Buy',
    ratingScore: 4.9,
    analystsCount: { buy: 44, hold: 2, sell: 0 },
    targetPrice: { low: 180, avg: 220, high: 245 },
    about: 'Amazon is a multinational tech and retail giant focusing on e-commerce, cloud computing (AWS), online advertising, and digital streaming.',
    strengths: [
      'AWS cloud operating margins expanding consistently.',
      'Advertising business growing into high-margin $50B+ annualized juggernaut.',
      'Regional fulfillment network redesign lowering per-unit shipping costs.',
    ],
    risks: [
      'Consumer discretionary spending sensitivity in lower-income cohorts.',
    ],
    financials: {
      revenue: '$604.3B',
      netIncome: '$44.7B',
      profitMargin: '7.4%',
      revenueGrowth: '+10.8% YoY',
    },
    news: [
      {
        id: 'n8',
        title: 'Amazon Prime Day Drives Record Consumer Spending and Ad Revenue',
        source: 'WSJ',
        time: '4h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Communication Services · Internet & Search',
    price: 164.20,
    previousClose: 164.65,
    openPrice: 164.80,
    dayHigh: 166.10,
    dayLow: 163.50,
    change: -0.45,
    changePercent: -0.27,
    marketCap: '$2.02 Trillion',
    peRatio: 23.8,
    high52: 191.75,
    low52: 120.21,
    volume: '22.0M',
    avgVolume: '26.8M',
    dividendYield: '0.49%',
    beta: 1.10,
    eps: 6.90,
    rating: 'Buy',
    ratingScore: 4.4,
    analystsCount: { buy: 34, hold: 8, sell: 1 },
    targetPrice: { low: 165, avg: 202, high: 225 },
    about: 'Alphabet operates Google Search, YouTube, Android, Chrome, and Google Cloud, investing heavily in generative AI and quantum research.',
    strengths: [
      'Dominant 90%+ global search market share with YouTube ad resurgence.',
      'Google Cloud profitability expanding rapidly.',
      'Attractively valued compared to other mega-cap technology peers.',
    ],
    risks: [
      'Antitrust litigation outcomes regarding default search agreements.',
    ],
    financials: {
      revenue: '$328.3B',
      netIncome: '$82.4B',
      profitMargin: '25.1%',
      revenueGrowth: '+13.7% YoY',
    },
    news: [
      {
        id: 'n9',
        title: 'Google Cloud Posts Surge in Enterprise AI Model Workloads',
        source: 'TechCrunch',
        time: '6h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Communication Services · Social Media',
    price: 584.20,
    previousClose: 576.40,
    openPrice: 578.50,
    dayHigh: 588.60,
    dayLow: 577.10,
    change: 7.80,
    changePercent: 1.35,
    marketCap: '$1.48 Trillion',
    peRatio: 28.4,
    high52: 602.95,
    low52: 279.40,
    volume: '14.8M',
    avgVolume: '16.2M',
    dividendYield: '0.34%',
    beta: 1.28,
    eps: 20.57,
    rating: 'Strong Buy',
    ratingScore: 4.8,
    analystsCount: { buy: 41, hold: 4, sell: 1 },
    targetPrice: { low: 520, avg: 640, high: 710 },
    about: 'Meta builds technologies that help people connect and find communities across Instagram, WhatsApp, Messenger, and develops Reality Labs VR/AR hardware.',
    strengths: [
      'AI recommendation algorithms increasing user session time across Reels.',
      'Advantage+ automated ad suite driving higher advertiser return-on-ad-spend (ROAS).',
      'Massive 3.27B daily active people across Meta family of apps.',
    ],
    risks: [
      'Heavy annual operating losses inside Reality Labs metaverse division.',
    ],
    financials: {
      revenue: '$149.8B',
      netIncome: '$49.1B',
      profitMargin: '32.8%',
      revenueGrowth: '+22.1% YoY',
    },
    news: [
      {
        id: 'n10',
        title: 'Meta Open-Source Llama AI Ecosystem Sees Unprecedented Enterprise Deployment',
        source: 'Bloomberg',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices, Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Technology · Semiconductors',
    price: 156.40,
    previousClose: 152.10,
    openPrice: 153.20,
    dayHigh: 158.30,
    dayLow: 152.80,
    change: 4.30,
    changePercent: 2.83,
    marketCap: '$253 Billion',
    peRatio: 46.2,
    high52: 227.30,
    low52: 94.04,
    volume: '38.4M',
    avgVolume: '46.5M',
    dividendYield: '0.00%',
    beta: 1.82,
    eps: 3.38,
    rating: 'Buy',
    ratingScore: 4.3,
    analystsCount: { buy: 32, hold: 9, sell: 1 },
    targetPrice: { low: 140, avg: 185, high: 220 },
    about: 'AMD produces high-performance computing, graphics, and visualization technologies including Ryzen CPUs, EPYC server processors, and Instinct AI accelerators.',
    strengths: [
      'EPYC server market share gains continuing against legacy competitors.',
      'Instinct MI300 accelerator adoption ramping with major cloud providers.',
      'Diversified portfolio across data center, client, and embedded (Xilinx).',
    ],
    risks: [
      'Aggressive pricing pressure in client PC processor segments.',
    ],
    financials: {
      revenue: '$24.8B',
      netIncome: '$2.1B',
      profitMargin: '8.5%',
      revenueGrowth: '+8.9% YoY',
    },
    news: [
      {
        id: 'n11',
        title: 'AMD Instinct Server Deployments Surpass Quarterly Expectations',
        source: 'AnandTech',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor Manufacturing Co.',
    exchange: 'NYSE',
    currency: '₹',
    sector: 'Technology · Semiconductor Foundry',
    price: 192.50,
    previousClose: 188.75,
    openPrice: 189.80,
    dayHigh: 194.20,
    dayLow: 189.10,
    change: 3.75,
    changePercent: 1.99,
    marketCap: '$998 Billion',
    peRatio: 26.5,
    high52: 196.80,
    low52: 85.10,
    volume: '16.5M',
    avgVolume: '18.9M',
    dividendYield: '1.24%',
    beta: 1.22,
    eps: 7.26,
    rating: 'Strong Buy',
    ratingScore: 4.9,
    analystsCount: { buy: 37, hold: 2, sell: 0 },
    targetPrice: { low: 180, avg: 225, high: 250 },
    about: 'TSMC is the premier global dedicated semiconductor foundry, fabricating advanced chips for Apple, NVIDIA, AMD, Qualcomm, and MediaTek using cutting-edge 3nm and 2nm nodes.',
    strengths: [
      'Irreplaceable near-monopoly on advanced semiconductor nodes (<5nm).',
      'High foundry gross margins exceeding 53%.',
      'Massive global capacity expansion in Arizona, Japan, and Germany.',
    ],
    risks: [
      'Geopolitical tensions surrounding the Taiwan Strait.',
    ],
    financials: {
      revenue: '$74.5B',
      netIncome: '$31.2B',
      profitMargin: '41.9%',
      revenueGrowth: '+39.0% YoY',
    },
    news: [
      {
        id: 'n13',
        title: 'TSMC 2-Nanometer Production Run Ahead of Schedule with Full Capacity Booked',
        source: 'Nikkei Asia',
        time: '5h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'GUJINTRX',
    name: 'Gujarat Intrux Limited',
    exchange: 'BSE / NSE',
    currency: '₹',
    sector: 'Industrials · Steel Castings & Engineering',
    price: 427.50,
    previousClose: 422.80,
    openPrice: 424.00,
    dayHigh: 435.00,
    dayLow: 421.10,
    change: 4.70,
    changePercent: 1.11,
    marketCap: '₹148.5 Cr',
    peRatio: 13.9,
    high52: 480.00,
    low52: 398.00,
    volume: '85.2K',
    avgVolume: '92.4K',
    dividendYield: '5.85%',
    beta: 0.88,
    eps: 30.75,
    rating: 'Strong Buy',
    ratingScore: 4.6,
    analystsCount: { buy: 8, hold: 1, sell: 0 },
    targetPrice: { low: 410, avg: 495, high: 540 },
    about: 'Gujarat Intrux Limited is a premier Indian manufacturer and exporter of stainless steel, alloy steel, and carbon steel castings, catering to high-precision engineering, valve manufacturing, pump, and power generation applications globally.',
    strengths: [
      'High-grade foundry precision manufacturing accredited with global ISO and pressure vessel standards.',
      'Industry-leading dividend yield of over 5.8% supported by conservative zero-debt balance sheet.',
      'Sustained export demand from European and North American industrial valve manufacturers.',
    ],
    risks: [
      'Raw material price fluctuations across specialty scrap metal and nickel ferroalloys.',
      'Small-cap liquidity dynamics on BSE / NSE cash market segments.',
    ],
    financials: {
      revenue: '₹68.4 Cr',
      netIncome: '₹10.7 Cr',
      profitMargin: '15.6%',
      revenueGrowth: '+14.2% YoY',
    },
    news: [
      {
        id: 'in_gi1',
        title: 'Gujarat Intrux Expands Precision Casting Capacity with High-Efficiency Induction Units',
        source: 'Business Standard',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    exchange: 'NYSE',
    currency: '₹',
    sector: 'Financials · Payment Processing',
    price: 281.40,
    previousClose: 280.10,
    openPrice: 280.50,
    dayHigh: 283.00,
    dayLow: 280.00,
    change: 1.30,
    changePercent: 0.46,
    marketCap: '$574 Billion',
    peRatio: 30.2,
    high52: 290.96,
    low52: 227.78,
    volume: '5.8M',
    avgVolume: '6.9M',
    dividendYield: '0.74%',
    beta: 0.88,
    eps: 9.32,
    rating: 'Strong Buy',
    ratingScore: 4.8,
    analystsCount: { buy: 33, hold: 4, sell: 0 },
    targetPrice: { low: 270, avg: 312, high: 340 },
    about: 'Visa facilitates digital payments among consumers, merchants, financial institutions, and government entities across more than 200 countries.',
    strengths: [
      'Extraordinary 54%+ operating margin with virtually zero credit risk.',
      'Cross-border travel payments volume maintaining strong post-pandemic growth.',
      'Secular tailwinds from global transition away from physical cash.',
    ],
    risks: [
      'Antitrust litigation regarding debit network routing exclusivity.',
    ],
    financials: {
      revenue: '$34.9B',
      netIncome: '$19.2B',
      profitMargin: '55.0%',
      revenueGrowth: '+9.8% YoY',
    },
    news: [
      {
        id: 'n15',
        title: 'Visa Expands B2B Payment Network Processing Across Enterprise Rail',
        source: 'Financial Times',
        time: '7h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'Communication Services · Entertainment & Streaming',
    price: 718.50,
    previousClose: 711.20,
    openPrice: 713.00,
    dayHigh: 724.80,
    dayLow: 712.50,
    change: 7.30,
    changePercent: 1.03,
    marketCap: '$308 Billion',
    peRatio: 41.5,
    high52: 735.00,
    low52: 344.73,
    volume: '3.4M',
    avgVolume: '4.1M',
    dividendYield: '0.00%',
    beta: 1.25,
    eps: 17.31,
    rating: 'Strong Buy',
    ratingScore: 4.7,
    analystsCount: { buy: 34, hold: 6, sell: 1 },
    targetPrice: { low: 650, avg: 780, high: 840 },
    about: 'Netflix is the premier global streaming entertainment service with over 280 million paid memberships in over 190 countries enjoying TV series, documentaries, and films.',
    strengths: [
      'Ad-supported membership tier growing over 150% YoY.',
      'Paid password sharing crackdown successfully converting viewers into subscribers.',
      'Substantial positive annual free cash flow exceeding $6.5B.',
    ],
    risks: [
      'Increasing content production costs and live sports licensing competition.',
    ],
    financials: {
      revenue: '$37.6B',
      netIncome: '$7.8B',
      profitMargin: '20.7%',
      revenueGrowth: '+16.8% YoY',
    },
    news: [
      {
        id: 'n18',
        title: 'Netflix Net Subscriber Additions Top Wall Street Projections',
        source: 'Variety',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    exchange: 'NYSE Arca',
    currency: '₹',
    sector: 'ETF · Broad US Large-Cap Equities',
    price: 588.60,
    previousClose: 585.75,
    openPrice: 586.20,
    dayHigh: 590.10,
    dayLow: 585.90,
    change: 2.85,
    changePercent: 0.49,
    marketCap: '$598 Billion Assets',
    peRatio: 26.8,
    high52: 592.00,
    low52: 409.20,
    volume: '54.2M',
    avgVolume: '62.0M',
    dividendYield: '1.22%',
    beta: 1.00,
    eps: 21.96,
    rating: 'Buy',
    ratingScore: 4.5,
    analystsCount: { buy: 40, hold: 10, sell: 2 },
    targetPrice: { low: 550, avg: 625, high: 660 },
    about: 'SPDR S&P 500 ETF Trust is the oldest and largest exchange-traded fund, tracking the benchmark S&P 500 Index of leading US public corporations.',
    strengths: [
      'Ultimate liquid benchmark investment reflecting aggregate US economic innovation.',
      'Micro-thin bid-ask spreads with ultra-low 0.0945% expense ratio.',
      'Self-rebalancing index that automatically incorporates new market leaders.',
    ],
    risks: [
      'High concentration in top 10 mega-cap technology constituents (>34% of weight).',
    ],
    financials: {
      revenue: 'N/A (ETF Portfolio)',
      netIncome: 'N/A',
      profitMargin: 'N/A',
      revenueGrowth: '+24.5% 1-Year Total Return',
    },
    news: [
      {
        id: 'n19',
        title: 'S&P 500 Closes Near Record High Driven by Solid Corporate Earnings',
        source: 'Bloomberg',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust (Nasdaq-100)',
    exchange: 'NASDAQ',
    currency: '₹',
    sector: 'ETF · Large-Cap Tech & Innovation',
    price: 498.20,
    previousClose: 493.50,
    openPrice: 494.20,
    dayHigh: 500.40,
    dayLow: 493.80,
    change: 4.70,
    changePercent: 0.95,
    marketCap: '$290 Billion Assets',
    peRatio: 31.4,
    high52: 503.50,
    low52: 342.30,
    volume: '38.5M',
    avgVolume: '44.0M',
    dividendYield: '0.58%',
    beta: 1.18,
    eps: 15.86,
    rating: 'Strong Buy',
    ratingScore: 4.7,
    analystsCount: { buy: 42, hold: 6, sell: 1 },
    targetPrice: { low: 460, avg: 545, high: 590 },
    about: 'Invesco QQQ ETF tracks the Nasdaq-100 Index, composed of the 100 largest non-financial companies listed on the Nasdaq, heavily weighted toward technology and consumer innovators.',
    strengths: [
      'Consistently outperformed broad market indexes over the last decade.',
      'Direct concentrated exposure to global generative AI hardware and software leaders.',
      'High liquidity with massive options open interest.',
    ],
    risks: [
      'Higher volatility and sensitivity to long-term Treasury yields.',
    ],
    financials: {
      revenue: 'N/A (ETF Portfolio)',
      netIncome: 'N/A',
      profitMargin: 'N/A',
      revenueGrowth: '+28.1% 1-Year Total Return',
    },
    news: [
      {
        id: 'n20',
        title: 'Tech Inflows Accelerate Into QQQ as Capital Spending Outlook Strengthens',
        source: 'MarketWatch',
        time: '2h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'NIFTY50',
    name: 'NIFTY 50 Index (NSE Benchmark)',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Index · Indian Benchmark Index',
    price: 25014.50,
    previousClose: 24964.20,
    openPrice: 24980.00,
    dayHigh: 25088.40,
    dayLow: 24940.10,
    change: 50.30,
    changePercent: 0.20,
    marketCap: '₹195.4 Lakh Cr',
    peRatio: 22.8,
    high52: 26277.35,
    low52: 18837.85,
    volume: '245.8M',
    avgVolume: '280.0M',
    dividendYield: '1.24%',
    beta: 1.00,
    eps: 1097.10,
    rating: 'Strong Buy',
    ratingScore: 4.6,
    analystsCount: { buy: 38, hold: 10, sell: 2 },
    targetPrice: { low: 24200, avg: 26500, high: 27800 },
    about: 'The NIFTY 50 is the flagship index on the National Stock Exchange of India (NSE), tracking the 50 largest, most liquid Indian blue-chip companies across 13 core economic sectors representing over 65% of free-float capitalization.',
    strengths: [
      'Primary engine reflecting India\'s multi-year structural GDP expansion.',
      'Broad sector diversification across Banking, IT, Energy, Auto, and FMCG.',
      'Record domestic institutional and monthly retail SIP mutual fund inflows.',
    ],
    risks: [
      'Global macroeconomic headwinds, crude oil fluctuations, and geopolitical volatility.',
      'Foreign institutional portfolio flows rebalancing.',
    ],
    financials: {
      revenue: 'Aggregate Index Basket',
      netIncome: 'N/A',
      profitMargin: 'N/A',
      revenueGrowth: '+14.8% YoY Aggregate EPS Growth',
    },
    news: [
      {
        id: 'in1',
        title: 'Nifty 50 Holds Firm Above 25,000 Milestone Supported by Strong Domestic Inflows',
        source: 'Economic Times',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'NESTLEIND',
    name: 'Nestle India Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'FMCG · Packaged Foods & Nutrition',
    price: 2382.40,
    previousClose: 2368.10,
    openPrice: 2370.00,
    dayHigh: 2398.50,
    dayLow: 2365.00,
    change: 14.30,
    changePercent: 0.60,
    marketCap: '₹2.30 Lakh Cr',
    peRatio: 74.2,
    high52: 2770.00,
    low52: 2145.00,
    volume: '620K',
    avgVolume: '850K',
    dividendYield: '1.38%',
    beta: 0.52,
    eps: 32.10,
    rating: 'Buy',
    ratingScore: 4.2,
    analystsCount: { buy: 22, hold: 11, sell: 4 },
    targetPrice: { low: 2250, avg: 2620, high: 2850 },
    about: 'Nestle India is India\'s premier food and beverage corporation, household-renowned for market-leading iconic brands including Maggi noodles, Nescafe coffee, KitKat confectionery, Everyday dairy, and Cerelac nutrition.',
    strengths: [
      'Dominant market share across packaged noodles, instant coffee, and infant nutrition.',
      'Exceptional capital efficiency with ROCE exceeding 100% and high shareholder payouts.',
      'Aggressive distribution expansion into rural and semi-urban tier-2/3 Indian cities.',
    ],
    risks: [
      'Raw material inflation across key agricultural inputs (coffee beans, cocoa, milk).',
      'Intensifying competition from domestic FMCG players and quick-commerce brands.',
    ],
    financials: {
      revenue: '₹19,780 Cr',
      netIncome: '₹3,210 Cr',
      profitMargin: '16.2%',
      revenueGrowth: '+10.4% YoY',
    },
    news: [
      {
        id: 'in2',
        title: 'Nestle India Launches Premium Roastery Range and Widens Rural Distribution',
        source: 'LiveMint',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'HINDMOTORS',
    name: 'Hindustan Motors Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Automobile · Historic & Passenger Vehicles',
    price: 18.65,
    previousClose: 18.20,
    openPrice: 18.30,
    dayHigh: 19.20,
    dayLow: 18.05,
    change: 0.45,
    changePercent: 2.47,
    marketCap: '₹388 Cr',
    peRatio: 42.1,
    high52: 38.40,
    low52: 12.10,
    volume: '3.4M',
    avgVolume: '2.1M',
    dividendYield: '0.00%',
    beta: 1.35,
    eps: 0.44,
    rating: 'Hold',
    ratingScore: 3.1,
    analystsCount: { buy: 2, hold: 5, sell: 3 },
    targetPrice: { low: 14.0, avg: 20.5, high: 28.0 },
    about: 'Hindustan Motors is India\'s pioneer automotive manufacturer, celebrated as the creator of the legendary Ambassador car. The company is actively restructuring assets and exploring joint ventures in clean mobility and electric two-wheelers.',
    strengths: [
      'Iconic Indian automotive heritage brand with significant legacy industrial land banks.',
      'Potential upside from exploratory EV manufacturing partnerships and technology alliances.',
      'Active balance sheet debt resolution and corporate restructuring roadmap.',
    ],
    risks: [
      'Micro-cap valuation with higher volatility and speculative retail trading volumes.',
      'Absence of commercial vehicle manufacturing scale at present.',
    ],
    financials: {
      revenue: '₹28.4 Cr',
      netIncome: '₹9.2 Cr',
      profitMargin: '32.4%',
      revenueGrowth: '+12.1% YoY',
    },
    news: [
      {
        id: 'in3',
        title: 'Hindustan Motors Continues Asset Optimization and Reviews EV Revival Strategies',
        source: 'Business Standard',
        time: '5h ago',
        sentiment: 'Neutral',
      },
    ],
  },
  {
    symbol: 'LICI',
    name: 'Life Insurance Corporation of India',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Financials · Life Insurance & Investments',
    price: 984.75,
    previousClose: 975.20,
    openPrice: 977.00,
    dayHigh: 994.00,
    dayLow: 973.50,
    change: 9.55,
    changePercent: 0.98,
    marketCap: '₹6.23 Lakh Cr',
    peRatio: 15.6,
    high52: 1222.00,
    low52: 597.00,
    volume: '4.8M',
    avgVolume: '5.2M',
    dividendYield: '1.02%',
    beta: 0.88,
    eps: 63.12,
    rating: 'Strong Buy',
    ratingScore: 4.5,
    analystsCount: { buy: 18, hold: 4, sell: 1 },
    targetPrice: { low: 940, avg: 1180, high: 1350 },
    about: 'Life Insurance Corporation of India (LIC) is India\'s paramount institutional investor and dominant life insurer with over 58% market share in new business premiums, managing assets under management (AUM) exceeding ₹53 Lakh Crore.',
    strengths: [
      'Colossal nationwide agency network of over 1.3 million active field advisors.',
      'India\'s single largest equity and sovereign debt portfolio holder.',
      'Increasing proportion of high-margin non-participating policies elevating Value of New Business (VNB).',
    ],
    risks: [
      'Competition from nimble private sector insurers across urban banking channels.',
      'Sensitivity to capital market mark-to-market fluctuations.',
    ],
    financials: {
      revenue: '₹8,52,000 Cr',
      netIncome: '₹40,676 Cr',
      profitMargin: '4.77%',
      revenueGrowth: '+12.8% YoY',
    },
    news: [
      {
        id: 'in4',
        title: 'LIC AUM Crosses Milestone ₹53 Lakh Crore with Non-Par Product Margins Expanding',
        source: 'Financial Express',
        time: '2h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Conglomerate · Telecom, Retail & Energy',
    price: 2785.60,
    previousClose: 2758.30,
    openPrice: 2765.00,
    dayHigh: 2798.00,
    dayLow: 2755.00,
    change: 27.30,
    changePercent: 0.99,
    marketCap: '₹18.84 Lakh Cr',
    peRatio: 26.8,
    high52: 3217.90,
    low52: 2220.30,
    volume: '7.1M',
    avgVolume: '6.4M',
    dividendYield: '0.36%',
    beta: 1.05,
    eps: 103.94,
    rating: 'Strong Buy',
    ratingScore: 4.7,
    analystsCount: { buy: 34, hold: 4, sell: 1 },
    targetPrice: { low: 2650, avg: 3180, high: 3450 },
    about: 'Reliance Industries is India\'s largest market cap corporation, commanding market leadership across Jio 5G telecommunications (475M+ subscribers), Reliance Retail (18,000+ stores), large-scale Jamnagar refining, and green energy giga-complexes.',
    strengths: [
      'Dual consumer engines (Jio and Retail) generating predictable, high-growth cash flows.',
      'Massive clean energy transition with multi-billion dollar solar and hydrogen giga-factories.',
      'Dominant market position and pricing power in oil-to-chemicals refining.',
    ],
    risks: [
      'Elevated ongoing capital expenditure in 5G expansion and clean technology facilities.',
      'Cyclicality in global gross refining margins (GRMs).',
    ],
    financials: {
      revenue: '₹10,00,122 Cr',
      netIncome: '₹79,020 Cr',
      profitMargin: '7.9%',
      revenueGrowth: '+10.8% YoY',
    },
    news: [
      {
        id: 'in5',
        title: 'Jio ARPU Accelerates on Tariff Normalization; Retail Footprint Reaches New Record',
        source: 'CNBC-TV18',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Technology · IT Services & Cloud Consulting',
    price: 4152.80,
    previousClose: 4120.50,
    openPrice: 4130.00,
    dayHigh: 4175.00,
    dayLow: 4118.00,
    change: 32.30,
    changePercent: 0.78,
    marketCap: '₹15.02 Lakh Cr',
    peRatio: 30.5,
    high52: 4585.90,
    low52: 3313.00,
    volume: '2.4M',
    avgVolume: '2.8M',
    dividendYield: '1.80%',
    beta: 0.65,
    eps: 136.15,
    rating: 'Buy',
    ratingScore: 4.4,
    analystsCount: { buy: 28, hold: 12, sell: 3 },
    targetPrice: { low: 3950, avg: 4520, high: 4800 },
    about: 'Tata Consultancy Services (TCS) is the flagship IT enterprise of the Tata Group and a premier global technology services provider, deploying enterprise AI, cloud architecture, and mission-critical solutions across 55 countries.',
    strengths: [
      'Industry-leading EBIT margins of 24-26% and pristine zero-debt balance sheet.',
      'Over $1.5 Billion in active generative AI deal pipelines with Fortune 500 multinationals.',
      'Unsurpassed employee retention metrics in the global IT services sector.',
    ],
    risks: [
      'Moderate discretionary IT spending moderation among Western banking clients.',
      'Currency volatility across major revenue currencies (USD, GBP, EUR).',
    ],
    financials: {
      revenue: '₹2,40,893 Cr',
      netIncome: '₹46,585 Cr',
      profitMargin: '19.3%',
      revenueGrowth: '+6.8% YoY',
    },
    news: [
      {
        id: 'in6',
        title: 'TCS Signs Landmark Multi-Year Enterprise AI Infrastructure Deal in Europe',
        source: 'LiveMint',
        time: '4h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Financials · Banking & Wealth Management',
    price: 1682.40,
    previousClose: 1668.20,
    openPrice: 1672.00,
    dayHigh: 1695.50,
    dayLow: 1665.00,
    change: 14.20,
    changePercent: 0.85,
    marketCap: '₹12.80 Lakh Cr',
    peRatio: 18.2,
    high52: 1794.00,
    low52: 1363.55,
    volume: '14.2M',
    avgVolume: '16.8M',
    dividendYield: '1.16%',
    beta: 0.92,
    eps: 92.44,
    rating: 'Strong Buy',
    ratingScore: 4.8,
    analystsCount: { buy: 40, hold: 5, sell: 1 },
    targetPrice: { low: 1620, avg: 1950, high: 2150 },
    about: 'HDFC Bank is India\'s premier private banking institution, serving over 90 million customers through an extensive network of 8,500+ branches and comprehensive mortgage, commercial, and wealth services.',
    strengths: [
      'Exceptional credit underwriting standards maintaining Gross NPA below 1.3%.',
      'Massive retail deposit franchise powering steady low-cost CASA mobilization.',
      'Significant cross-sell synergies following the successful HDFC Ltd mortgage merger.',
    ],
    risks: [
      'Temporary post-merger credit-to-deposit ratio digestion period.',
      'Competitive pressure on term deposit interest rates.',
    ],
    financials: {
      revenue: '₹2,84,000 Cr',
      netIncome: '₹64,060 Cr',
      profitMargin: '22.5%',
      revenueGrowth: '+26.2% YoY',
    },
    news: [
      {
        id: 'in7',
        title: 'HDFC Bank Deposit Mobilization Outpaces System Growth; Margins Rebound',
        source: 'Bloomberg',
        time: '2h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Technology · IT Consulting & Cloud Solutions',
    price: 1912.15,
    previousClose: 1895.40,
    openPrice: 1902.00,
    dayHigh: 1928.00,
    dayLow: 1890.00,
    change: 16.75,
    changePercent: 0.88,
    marketCap: '₹7.94 Lakh Cr',
    peRatio: 28.4,
    high52: 1991.45,
    low52: 1358.35,
    volume: '6.5M',
    avgVolume: '7.8M',
    dividendYield: '2.20%',
    beta: 0.82,
    eps: 67.33,
    rating: 'Buy',
    ratingScore: 4.3,
    analystsCount: { buy: 30, hold: 10, sell: 3 },
    targetPrice: { low: 1800, avg: 2100, high: 2280 },
    about: 'Infosys is an internationally acclaimed software consulting leader powering enterprise transformation through proprietary Topaz generative AI and Cobalt cloud suites across 56 countries.',
    strengths: [
      'Sustained quarterly deal wins consistently surpassing $3.5B-$4B in contract value.',
      'Market-leading digital and cloud solutions engineering practice.',
      'Generous shareholder return framework distributing 85% of cumulative free cash flow.',
    ],
    risks: [
      'Pockets of cautious IT discretionary spend in US communications and retail clients.',
      'Offshore talent billing rate pressures.',
    ],
    financials: {
      revenue: '₹1,53,670 Cr',
      netIncome: '₹26,248 Cr',
      profitMargin: '17.1%',
      revenueGrowth: '+5.4% YoY',
    },
    news: [
      {
        id: 'in8',
        title: 'Infosys Topaz Accelerates Generative AI Implementations Across Global 2000 Clients',
        source: 'Reuters',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Automobile · EV, Commercial Vehicles & JLR',
    price: 942.30,
    previousClose: 931.10,
    openPrice: 935.00,
    dayHigh: 954.50,
    dayLow: 928.00,
    change: 11.20,
    changePercent: 1.20,
    marketCap: '₹3.46 Lakh Cr',
    peRatio: 10.8,
    high52: 1179.05,
    low52: 608.00,
    volume: '9.2M',
    avgVolume: '11.5M',
    dividendYield: '0.64%',
    beta: 1.45,
    eps: 87.25,
    rating: 'Strong Buy',
    ratingScore: 4.6,
    analystsCount: { buy: 26, hold: 5, sell: 2 },
    targetPrice: { low: 900, avg: 1120, high: 1250 },
    about: 'Tata Motors is India\'s automotive vanguard, controlling over 70% of the Indian electric passenger car segment (Nexon.ev, Punch.ev, Curvv.ev) while luxury brand Jaguar Land Rover (JLR) delivers strong global profitability.',
    strengths: [
      'Unchallenged leader in Indian passenger EV charging infrastructure and product lineup.',
      'High order book resilience and rich product mix in JLR (Range Rover & Defender).',
      'Value-unlocking corporate demerger separating Commercial Vehicles and Passenger Car units.',
    ],
    risks: [
      'Softening luxury auto demand in key European export regions.',
      'High competition in compact electric SUV segment.',
    ],
    financials: {
      revenue: '₹4,37,928 Cr',
      netIncome: '₹31,807 Cr',
      profitMargin: '7.3%',
      revenueGrowth: '+26.6% YoY',
    },
    news: [
      {
        id: 'in9',
        title: 'Tata Motors Hits Record EV Deliveries in Festive Quarter; JLR Margins Solid',
        source: 'Autocar India',
        time: '2h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'ITC',
    name: 'ITC Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Conglomerate · FMCG, Hotels, Agri & Paper',
    price: 492.65,
    previousClose: 488.50,
    openPrice: 489.00,
    dayHigh: 496.00,
    dayLow: 487.20,
    change: 4.15,
    changePercent: 0.85,
    marketCap: '₹6.15 Lakh Cr',
    peRatio: 28.2,
    high52: 528.50,
    low52: 399.30,
    volume: '11.8M',
    avgVolume: '14.0M',
    dividendYield: '2.80%',
    beta: 0.42,
    eps: 17.47,
    rating: 'Buy',
    ratingScore: 4.4,
    analystsCount: { buy: 32, hold: 6, sell: 1 },
    targetPrice: { low: 470, avg: 540, high: 580 },
    about: 'ITC is a diversified corporate titan with powerhouse FMCG brands (Aashirvaad, Sunfeast, Bingo!, Classmate), leader in paperboards and packaging, agricultural exports, and a recently spun-off luxury hotels division.',
    strengths: [
      'High cash flow generation from core traditional business funding FMCG brand incubation.',
      'Defensive low-beta characteristics paired with an 80%+ dividend payout track record.',
      'FMCG Non-Cigarette segment EBITDA expanding towards sustainable double digits.',
    ],
    risks: [
      'Regulatory tobacco excise and taxation policy updates.',
      'Agri-commodity inflation influencing flour and edible oil packaging margins.',
    ],
    financials: {
      revenue: '₹76,840 Cr',
      netIncome: '₹20,422 Cr',
      profitMargin: '26.6%',
      revenueGrowth: '+6.2% YoY',
    },
    news: [
      {
        id: 'in10',
        title: 'ITC FMCG Business Records Double-Digit Growth Driven by Aashirvaad and Sunfeast',
        source: 'Economic Times',
        time: '4h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Financials · Public Sector Banking',
    price: 816.50,
    previousClose: 808.20,
    openPrice: 810.00,
    dayHigh: 824.00,
    dayLow: 806.50,
    change: 8.30,
    changePercent: 1.03,
    marketCap: '₹7.28 Lakh Cr',
    peRatio: 10.4,
    high52: 912.10,
    low52: 555.30,
    volume: '15.4M',
    avgVolume: '18.2M',
    dividendYield: '1.68%',
    beta: 1.12,
    eps: 78.51,
    rating: 'Strong Buy',
    ratingScore: 4.7,
    analystsCount: { buy: 36, hold: 4, sell: 0 },
    targetPrice: { low: 790, avg: 940, high: 1020 },
    about: 'State Bank of India (SBI) is India\'s largest commercial bank, accounting for nearly one-quarter of total deposits and advances nationwide across 22,500 branches and 70M+ active users on its YONO app.',
    strengths: [
      'Multi-year record ROE exceeding 18% backed by pristine asset quality (Net NPA < 0.6%).',
      'Unsurpassed sovereign-backed deposit franchise providing bedrock liquidity.',
      'Sustained loan expansion across Retail, Agriculture, and MSME sectors.',
    ],
    risks: [
      'Potential NIM compression as interest rate cycles turn.',
      'Infrastructure exposure during periods of macro economic consolidation.',
    ],
    financials: {
      revenue: '₹4,30,000 Cr',
      netIncome: '₹67,085 Cr',
      profitMargin: '15.6%',
      revenueGrowth: '+21.5% YoY',
    },
    news: [
      {
        id: 'in11',
        title: 'SBI Credit Expansion Stays Strong at 15.5% YoY with Retail Loan Quality Intact',
        source: 'Business Today',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Telecommunications · 5G & Mobile Services',
    price: 1648.20,
    previousClose: 1630.00,
    openPrice: 1635.00,
    dayHigh: 1662.00,
    dayLow: 1628.00,
    change: 18.20,
    changePercent: 1.12,
    marketCap: '₹9.42 Lakh Cr',
    peRatio: 44.5,
    high52: 1779.00,
    low52: 902.00,
    volume: '5.6M',
    avgVolume: '6.2M',
    dividendYield: '0.49%',
    beta: 0.76,
    eps: 37.04,
    rating: 'Strong Buy',
    ratingScore: 4.7,
    analystsCount: { buy: 29, hold: 4, sell: 1 },
    targetPrice: { low: 1550, avg: 1820, high: 1980 },
    about: 'Bharti Airtel is a global telecommunications leader operating in India and 14 African nations, setting Indian industry standards for Average Revenue Per User (ARPU) with nationwide 5G coverage and B2B cloud services.',
    strengths: [
      'Industry-leading ARPU (>₹211) with proven pricing power and customer premiumization.',
      'Airtel Africa subsidiary generating strong double-digit growth in mobile money services.',
      'Rapid corporate deleveraging supported by high operating cash flow conversions.',
    ],
    risks: [
      'Substantial 5G infrastructure capex and spectrum amortization.',
      'Currency devaluation in select African emerging economies.',
    ],
    financials: {
      revenue: '₹1,50,000 Cr',
      netIncome: '₹7,467 Cr',
      profitMargin: '5.0%',
      revenueGrowth: '+9.4% YoY',
    },
    news: [
      {
        id: 'in12',
        title: 'Bharti Airtel ARPU Surpasses Industry Peers as Postpaid 5G Adoption Gains Speed',
        source: 'The Hindu BusinessLine',
        time: '3h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'BAJFINANCE',
    name: 'Bajaj Finance Limited',
    exchange: 'NSE',
    currency: '₹',
    sector: 'Financials · Consumer Lending & Fintech',
    price: 7248.50,
    previousClose: 7180.00,
    openPrice: 7195.00,
    dayHigh: 7310.00,
    dayLow: 7160.00,
    change: 68.50,
    changePercent: 0.95,
    marketCap: '₹4.48 Lakh Cr',
    peRatio: 27.8,
    high52: 8190.00,
    low52: 6375.00,
    volume: '1.2M',
    avgVolume: '1.5M',
    dividendYield: '0.48%',
    beta: 1.18,
    eps: 260.74,
    rating: 'Strong Buy',
    ratingScore: 4.6,
    analystsCount: { buy: 27, hold: 6, sell: 2 },
    targetPrice: { low: 6900, avg: 8200, high: 8900 },
    about: 'Bajaj Finance is India\'s largest diversified retail lending NBFC, famous for creating the zero-cost consumer durable financing ecosystem, serving over 88 million active customers through omnichannel digital finance.',
    strengths: [
      'Superior automated credit assessment algorithms and predictive risk engines.',
      'Presence in 4,000+ cities with 150,000+ merchant distribution touchpoints.',
      'Industry-leading return ratios with Return on Assets (ROA) over 4.5% and ROE over 21%.',
    ],
    risks: [
      'Central bank regulatory guidelines on unsecured retail credit risk weightings.',
      'Fintech and private bank competition in instant personal loans.',
    ],
    financials: {
      revenue: '₹54,980 Cr',
      netIncome: '₹14,451 Cr',
      profitMargin: '26.3%',
      revenueGrowth: '+24.8% YoY',
    },
    news: [
      {
        id: 'in13',
        title: 'Bajaj Finance Customer Franchise Crosses 88 Million with Strong AUM Growth',
        source: 'LiveMint',
        time: '2h ago',
        sentiment: 'Positive',
      },
    ],
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX (BSE 30 Benchmark)',
    exchange: 'BSE',
    currency: '₹',
    sector: 'Index · Indian Benchmark Index',
    price: 81650.20,
    previousClose: 81480.00,
    openPrice: 81520.00,
    dayHigh: 81890.00,
    dayLow: 81410.00,
    change: 170.20,
    changePercent: 0.21,
    marketCap: '₹460 Lakh Cr Total BSE',
    peRatio: 23.4,
    high52: 85978.25,
    low52: 63583.00,
    volume: '185.0M',
    avgVolume: '210.0M',
    dividendYield: '1.18%',
    beta: 0.98,
    eps: 3489.30,
    rating: 'Strong Buy',
    ratingScore: 4.6,
    analystsCount: { buy: 35, hold: 8, sell: 2 },
    targetPrice: { low: 79000, avg: 86500, high: 91000 },
    about: 'The BSE SENSEX is India\'s oldest and most renowned benchmark stock index, tracking 30 of the largest and most actively traded companies across key sectors on the Bombay Stock Exchange (BSE).',
    strengths: [
      'Decades-long track record of Indian wealth creation compounding at over 14% annually.',
      'High representation of the most profitable Indian conglomerates and private banks.',
      'Massive global investor recognition as India\'s primary market barometer.',
    ],
    risks: [
      'Sensitivity to international fund flows and dollar index shifts.',
      'Macro inflation and global interest rate adjustments.',
    ],
    financials: {
      revenue: 'Aggregate Index Basket',
      netIncome: 'N/A',
      profitMargin: 'N/A',
      revenueGrowth: '+13.5% YoY Aggregate EPS Growth',
    },
    news: [
      {
        id: 'in14',
        title: 'Sensex Gains Over 170 Points with Banking and Auto Stocks Leading the Rally',
        source: 'NDTV Profit',
        time: '1h ago',
        sentiment: 'Positive',
      },
    ],
  },
];

// Helper to compute Moving Averages
function calculateMAs(candles: ChartCandle[]) {
  const prices = candles.map((c) => c.close);
  for (let i = 0; i < candles.length; i++) {
    // 20-period MA
    if (i >= 4) {
      const window20 = prices.slice(Math.max(0, i - 19), i + 1);
      const sum = window20.reduce((acc, v) => acc + v, 0);
      candles[i].ma20 = Number((sum / window20.length).toFixed(2));
    }
    // 50-period MA
    if (i >= 8) {
      const window50 = prices.slice(Math.max(0, i - 49), i + 1);
      const sum = window50.reduce((acc, v) => acc + v, 0);
      candles[i].ma50 = Number((sum / window50.length).toFixed(2));
    }
  }
}

// Generates highly realistic, accurate financial data points (candlesticks + volume + MAs)
// with authentic long momentum bars, short dojis, hammers, and pullbacks like in real stock markets
export function generateRealisticStockChart(
  stock: StockData,
  range: '1D' | '1W' | '1M' | '1Y' | 'ALL'
): ChartCandle[] {
  const candles: ChartCandle[] = [];
  const currentPrice = stock.price;
  const prevClose = stock.previousClose;
  const isUp = stock.change >= 0;

  if (range === '1D') {
    // 32 12-minute bars spanning 9:30 AM to 4:00 PM EST
    const timeLabels = [
      '9:30 AM', '9:42 AM', '9:54 AM', '10:06 AM', '10:18 AM', '10:30 AM', '10:42 AM', '10:54 AM',
      '11:06 AM', '11:18 AM', '11:30 AM', '11:42 AM', '11:54 AM', '12:06 PM', '12:18 PM', '12:30 PM',
      '12:42 PM', '12:54 PM', '1:06 PM', '1:18 PM', '1:30 PM', '1:42 PM', '1:54 PM', '2:06 PM',
      '2:18 PM', '2:30 PM', '2:42 PM', '2:54 PM', '3:06 PM', '3:18 PM', '3:30 PM', '3:45 PM', '4:00 PM',
    ];

    const totalBars = timeLabels.length;

    // Realistic market phases throughout the day
    const targetPath: number[] = [];
    const openP = stock.openPrice;
    const lowP = stock.dayLow;
    const highP = stock.dayHigh;
    const closeP = currentPrice;

    for (let i = 0; i < totalBars; i++) {
      const p = i / (totalBars - 1);
      let target = openP;
      if (p < 0.15) {
        target = openP + (lowP - openP) * (p / 0.15);
      } else if (p < 0.45) {
        const sub = (p - 0.15) / 0.3;
        target = lowP + (openP + (highP - lowP) * 0.65 - lowP) * sub;
      } else if (p < 0.7) {
        target = openP + (highP - lowP) * 0.65;
      } else if (p < 0.85) {
        const sub = (p - 0.7) / 0.15;
        target = (openP + (highP - lowP) * 0.65) + (highP - (openP + (highP - lowP) * 0.65)) * sub;
      } else {
        const sub = (p - 0.85) / 0.15;
        target = highP + (closeP - highP) * sub;
      }
      targetPath.push(target);
    }

    let runningOpen = openP;

    for (let i = 0; i < totalBars; i++) {
      const isFirst = i === 0;
      const isLast = i === totalBars - 1;

      // Determine candle character: Long, Short, or Normal
      const isLongImpulse = i === 4 || i === 7 || i === 22 || i === 25;
      const isShortDoji = i === 12 || i === 13 || i === 15 || i === 17 || i === 29;
      const isHammer = i === 2 || i === 20;

      const baseStep = targetPath[i] - (isFirst ? openP : targetPath[i - 1]);
      const openVal = isFirst ? openP : runningOpen;
      let delta = baseStep;

      if (isLongImpulse) {
        delta = (stock.dayHigh - stock.dayLow) * 0.22 * (baseStep >= 0 ? 1 : -1);
      } else if (isShortDoji) {
        delta = (Math.random() - 0.5) * (stock.price * 0.0008);
      } else {
        delta = baseStep + (Math.random() - 0.48) * (stock.price * 0.003);
      }

      let closeVal = isLast ? closeP : Number((openVal + delta).toFixed(2));
      closeVal = Math.max(stock.dayLow, Math.min(stock.dayHigh, closeVal));

      const bodyMax = Math.max(openVal, closeVal);
      const bodyMin = Math.min(openVal, closeVal);
      const bodySize = Math.abs(closeVal - openVal);

      let upperWick = Math.random() * (stock.price * 0.002);
      let lowerWick = Math.random() * (stock.price * 0.002);

      if (isHammer) {
        lowerWick = (stock.dayHigh - stock.dayLow) * 0.18;
        upperWick = (stock.dayHigh - stock.dayLow) * 0.02;
      } else if (isShortDoji) {
        upperWick = (stock.dayHigh - stock.dayLow) * 0.08;
        lowerWick = (stock.dayHigh - stock.dayLow) * 0.08;
      } else if (isLongImpulse) {
        upperWick = bodySize * 0.15;
        lowerWick = bodySize * 0.1;
      }

      let highVal = Number((bodyMax + upperWick).toFixed(2));
      let lowVal = Number((bodyMin - lowerWick).toFixed(2));

      highVal = Math.min(stock.dayHigh + 0.2, highVal);
      lowVal = Math.max(stock.dayLow - 0.2, lowVal);

      let vol = 850000;
      if (isLongImpulse) {
        vol = Math.floor(2800000 + Math.random() * 1200000);
      } else if (isShortDoji) {
        vol = Math.floor(320000 + Math.random() * 200000);
      } else {
        vol = Math.floor(800000 + Math.random() * 600000);
      }

      candles.push({
        time: timeLabels[i],
        dateLabel: `Today · ${timeLabels[i]}`,
        open: openVal,
        high: highVal,
        low: lowVal,
        close: closeVal,
        volume: vol,
      });

      runningOpen = closeVal;
    }

    calculateMAs(candles);
    return candles;
  }

  if (range === '1W') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const subTimes = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
    let runningPrice = prevClose * (isUp ? 0.985 : 1.015);
    const totalBars = days.length * subTimes.length;
    const step = (currentPrice - runningPrice) / totalBars;

    let barIdx = 0;
    days.forEach((day, dIdx) => {
      subTimes.forEach((sub, sIdx) => {
        barIdx++;
        const isLast = barIdx === totalBars;
        const openVal = Number(runningPrice.toFixed(2));

        const isLongBar = barIdx % 5 === 2 || barIdx % 7 === 0;
        const isDoji = barIdx % 4 === 1;

        let delta = step;
        if (isLongBar) {
          delta = step * 2.8 + (Math.random() - 0.3) * (currentPrice * 0.008);
        } else if (isDoji) {
          delta = (Math.random() - 0.5) * (currentPrice * 0.001);
        } else {
          delta = step + (Math.random() - 0.48) * (currentPrice * 0.004);
        }

        const closeVal = isLast ? currentPrice : Number((openVal + delta).toFixed(2));
        const bodyMax = Math.max(openVal, closeVal);
        const bodyMin = Math.min(openVal, closeVal);

        const highVal = Number((bodyMax + (isDoji ? currentPrice * 0.006 : currentPrice * 0.0025) + Math.random() * (currentPrice * 0.002)).toFixed(2));
        const lowVal = Number((bodyMin - (isDoji ? currentPrice * 0.006 : currentPrice * 0.0025) - Math.random() * (currentPrice * 0.002)).toFixed(2));

        candles.push({
          time: `${day} ${sub}`,
          dateLabel: `${day}, Oct ${dIdx + 3} · ${sub}`,
          open: openVal,
          high: highVal,
          low: lowVal,
          close: closeVal,
          volume: Math.floor(isLongBar ? 3200000 : isDoji ? 650000 : 1500000 + Math.random() * 800000),
        });

        runningPrice = closeVal;
      });
    });

    calculateMAs(candles);
    return candles;
  }

  if (range === '1M') {
    const totalBars = 22;
    let runningPrice = isUp ? currentPrice * 0.91 : currentPrice * 1.08;
    const step = (currentPrice - runningPrice) / totalBars;

    for (let d = 1; d <= totalBars; d++) {
      const isLast = d === totalBars;
      const openVal = Number(runningPrice.toFixed(2));

      const isBigDay = d === 4 || d === 11 || d === 18;
      const isInsideDay = d === 5 || d === 12 || d === 19;

      let delta = step;
      if (isBigDay) {
        delta = step * 3.2 + (Math.random() - 0.3) * (currentPrice * 0.012);
      } else if (isInsideDay) {
        delta = (Math.random() - 0.5) * (currentPrice * 0.003);
      } else {
        delta = step + (Math.random() - 0.48) * (currentPrice * 0.009);
      }

      const closeVal = isLast ? currentPrice : Number((openVal + delta).toFixed(2));
      const bodyMax = Math.max(openVal, closeVal);
      const bodyMin = Math.min(openVal, closeVal);

      const highVal = Number((bodyMax + Math.random() * (currentPrice * 0.008)).toFixed(2));
      const lowVal = Number((bodyMin - Math.random() * (currentPrice * 0.008)).toFixed(2));

      candles.push({
        time: `Day ${d}`,
        dateLabel: `Day ${d} of Month`,
        open: openVal,
        high: highVal,
        low: lowVal,
        close: closeVal,
        volume: Math.floor(isBigDay ? 38000000 : 18000000 + Math.random() * 10000000),
      });

      runningPrice = closeVal;
    }

    calculateMAs(candles);
    return candles;
  }

  if (range === '1Y') {
    const totalBars = 52;
    const yearStart = stock.low52 + (stock.price - stock.low52) * 0.15;
    let runningPrice = yearStart;
    const step = (currentPrice - yearStart) / totalBars;

    for (let w = 1; w <= totalBars; w++) {
      const isLast = w === totalBars;
      const openVal = Number(runningPrice.toFixed(2));

      const isCatalystWeek = w % 13 === 0 || w === 18 || w === 36;
      let delta = step;
      if (isCatalystWeek) {
        delta = step * 3.5 + (Math.random() - 0.25) * (currentPrice * 0.025);
      } else {
        delta = step + (Math.random() - 0.46) * (currentPrice * 0.015);
      }

      const closeVal = isLast ? currentPrice : Number((openVal + delta).toFixed(2));
      const bodyMax = Math.max(openVal, closeVal);
      const bodyMin = Math.min(openVal, closeVal);

      const highVal = Number((bodyMax + Math.random() * (currentPrice * 0.015)).toFixed(2));
      const lowVal = Number((bodyMin - Math.random() * (currentPrice * 0.015)).toFixed(2));

      candles.push({
        time: `Wk ${w}`,
        dateLabel: `Week ${w} of 52`,
        open: openVal,
        high: highVal,
        low: lowVal,
        close: closeVal,
        volume: Math.floor(isCatalystWeek ? 75000000 : 42000000 + Math.random() * 15000000),
      });

      runningPrice = closeVal;
    }

    calculateMAs(candles);
    return candles;
  }

  // ALL (5Y - 60 monthly points)
  const totalBars = 60;
  const fiveYearStart = stock.low52 * 0.7;
  let runningPrice = fiveYearStart;
  const step = (currentPrice - fiveYearStart) / totalBars;

  for (let m = 1; m <= totalBars; m++) {
    const isLast = m === totalBars;
    const openVal = Number(runningPrice.toFixed(2));
    const isQuarterClose = m % 3 === 0;

    let delta = step;
    if (isQuarterClose) {
      delta = step * 2.8 + (Math.random() - 0.3) * (currentPrice * 0.03);
    } else {
      delta = step + (Math.random() - 0.45) * (currentPrice * 0.02);
    }

    const closeVal = isLast ? currentPrice : Number((openVal + delta).toFixed(2));
    const bodyMax = Math.max(openVal, closeVal);
    const bodyMin = Math.min(openVal, closeVal);

    const highVal = Number((bodyMax + Math.random() * (currentPrice * 0.022)).toFixed(2));
    const lowVal = Number((bodyMin - Math.random() * (currentPrice * 0.022)).toFixed(2));

    const yr = 2021 + Math.floor(m / 12);
    const mo = ((m - 1) % 12) + 1;

    candles.push({
      time: `${yr}-${mo < 10 ? '0' : ''}${mo}`,
      dateLabel: `${yr}-${mo < 10 ? '0' : ''}${mo}`,
      open: openVal,
      high: highVal,
      low: lowVal,
      close: closeVal,
      volume: Math.floor(isQuarterClose ? 110000000 : 75000000 + Math.random() * 30000000),
    });

    runningPrice = closeVal;
  }

  calculateMAs(candles);
  return candles;
}
