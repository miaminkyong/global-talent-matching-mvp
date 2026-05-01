import React, { useMemo, useState } from "react";

const jobPostings = [
  {
    id: "J001",
    company: "Ultium Cells LLC",
    title: "Smart Factory Engineer",
    location: "Warren, Ohio",
    state: "OH",
    category: "Smart Factory / Battery",
    seniority: "Mid",
    koreanRequired: true,
    englishRequired: true,
    keywords: ["battery", "smart factory", "automation", "PLC", "python", "data analytics", "korean"],
    regionProfile: {
      cityLife: 2,
      cost: 5,
      safety: 3,
      school: 3,
      diversity: 2,
      koreanCommunity: 2,
      familyFit: 5,
      directFlight: 2
    },
    summary:
      "배터리 제조 공정과 스마트팩토리 자동화 역량을 요구하는 한영 바이링구얼 엔지니어 포지션",
    source: "공개 공고 기반 샘플"
  },
  {
    id: "J002",
    company: "Ultium Cells LLC",
    title: "Equipment Tech Engineer",
    location: "Spring Hill, Tennessee",
    state: "TN",
    category: "Manufacturing Equipment",
    seniority: "Mid",
    koreanRequired: false,
    englishRequired: true,
    keywords: ["equipment", "manufacturing", "logistics", "battery", "electronics", "autocad", "PLC"],
    regionProfile: {
      cityLife: 2,
      cost: 4,
      safety: 3,
      school: 3,
      diversity: 2,
      koreanCommunity: 2,
      familyFit: 4,
      directFlight: 2
    },
    summary:
      "제조·물류 장비 이해와 현장 대응 역량을 요구하는 배터리/전자 제조 기반 엔지니어 포지션",
    source: "공개 공고 기반 샘플"
  },
  {
    id: "J003",
    company: "AVACO Inc.",
    title: "Field Service Engineer",
    location: "Spring Hill, Tennessee",
    state: "TN",
    category: "Automation / Field Service",
    seniority: "Junior-Mid",
    koreanRequired: true,
    englishRequired: true,
    keywords: ["field service", "automation", "maintenance", "production support", "customer", "korean"],
    regionProfile: {
      cityLife: 2,
      cost: 4,
      safety: 3,
      school: 3,
      diversity: 2,
      koreanCommunity: 2,
      familyFit: 4,
      directFlight: 2
    },
    summary:
      "자동화 물류 장비 유지보수와 고객사 현장 대응을 담당하는 한영 바이링구얼 엔지니어 포지션",
    source: "공개 공고 기반 샘플"
  },
  {
    id: "J004",
    company: "대기업 미국법인",
    title: "Financial Controller",
    location: "Philadelphia, Pennsylvania",
    state: "PA",
    category: "Finance / Controller",
    seniority: "Senior",
    koreanRequired: true,
    englishRequired: true,
    keywords: ["finance", "controller", "accounting", "compliance", "korean", "english"],
    regionProfile: {
      cityLife: 4,
      cost: 3,
      safety: 4,
      school: 4,
      diversity: 4,
      koreanCommunity: 3,
      familyFit: 4,
      directFlight: 4
    },
    summary:
      "미국 법인 재무관리와 내부통제 경험을 요구하는 현지 채용 기반 컨트롤러 포지션",
    source: "공개 공고 기반 샘플"
  },
  {
    id: "J005",
    company: "Qcells 계열",
    title: "Jr. Accounting Associate",
    location: "Irvine, California",
    state: "CA",
    category: "Accounting",
    seniority: "Junior",
    koreanRequired: true,
    englishRequired: true,
    keywords: ["accounting", "finance", "excel", "erp", "korean", "bilingual"],
    regionProfile: {
      cityLife: 5,
      cost: 1,
      safety: 4,
      school: 4,
      diversity: 5,
      koreanCommunity: 5,
      familyFit: 3,
      directFlight: 5
    },
    summary:
      "한인 인프라가 강한 캘리포니아 지역의 회계·재무 주니어 포지션",
    source: "공개 공고 기반 샘플"
  },
  {
    id: "J006",
    company: "Daesang America / KOTRA 연계",
    title: "Marketing / Operations Specialist",
    location: "Hackensack, New Jersey",
    state: "NJ",
    category: "Marketing / Operations",
    seniority: "Junior-Mid",
    koreanRequired: false,
    englishRequired: true,
    keywords: ["marketing", "operations", "excel", "google sheets", "communication", "korean preferred"],
    regionProfile: {
      cityLife: 5,
      cost: 2,
      safety: 4,
      school: 4,
      diversity: 5,
      koreanCommunity: 5,
      familyFit: 4,
      directFlight: 5
    },
    summary:
      "뉴저지 한인 인프라와 직항 접근성이 강한 마케팅·오퍼레이션 포지션",
    source: "공개 공고 기반 샘플"
  }
];

const candidates = [
  {
    id: "C001",
    name: "김서연",
    residence: "대한민국",
    targetRole: "Smart Factory Engineer",
    skills: ["battery", "automation", "python", "PLC", "data analytics", "korean"],
    experienceYears: 5,
    urbanPreference: "suburb",
    hasChild: true,
    educationImportance: 7,
    safetyTolerance: "very_safe",
    housingCost: "avg_minus_15",
    diversityPreference: 3,
    koreaVisit: "direct_important",
    spouseESL: true,
    notes: "초등 자녀 교육과 안정적 생활비를 중시. 제조업 현장 경험 보유."
  },
  {
    id: "C002",
    name: "박준호",
    residence: "미국",
    targetRole: "Field Service Engineer",
    skills: ["field service", "automation", "maintenance", "customer", "korean"],
    experienceYears: 3,
    urbanPreference: "town",
    hasChild: false,
    educationImportance: 2,
    safetyTolerance: "average_ok",
    housingCost: "avg_minus_30",
    diversityPreference: 2,
    koreaVisit: "rare",
    spouseESL: false,
    notes: "생활비가 낮고 현장성이 강한 지역 선호. 이동 유연성 높음."
  },
  {
    id: "C003",
    name: "이민지",
    residence: "대한민국",
    targetRole: "Financial Controller",
    skills: ["finance", "controller", "accounting", "compliance", "korean", "english"],
    experienceYears: 12,
    urbanPreference: "city",
    hasChild: true,
    educationImportance: 6,
    safetyTolerance: "safe",
    housingCost: "average",
    diversityPreference: 4,
    koreaVisit: "direct_required",
    spouseESL: true,
    notes: "재무관리 경력 강점. 도시 인프라, 학군, 한국 접근성을 중시."
  },
  {
    id: "C004",
    name: "최현우",
    residence: "대한민국",
    targetRole: "Equipment Tech Engineer",
    skills: ["equipment", "manufacturing", "autocad", "PLC", "electronics"],
    experienceYears: 4,
    urbanPreference: "suburb",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "average_ok",
    housingCost: "avg_minus_15",
    diversityPreference: 2,
    koreaVisit: "sometimes_direct",
    spouseESL: false,
    notes: "제조 장비와 현장 대응 경험. 교외형 근무지 수용 가능."
  },
  {
    id: "C005",
    name: "정하은",
    residence: "미국",
    targetRole: "Accounting Associate",
    skills: ["accounting", "excel", "erp", "bilingual", "finance"],
    experienceYears: 2,
    urbanPreference: "city",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "safe",
    housingCost: "avg_plus_15",
    diversityPreference: 4,
    koreaVisit: "direct_required",
    spouseESL: false,
    notes: "한인 커뮤니티와 도시 인프라 선호. 주니어 회계 포지션 적합."
  },
  {
    id: "C006",
    name: "윤도현",
    residence: "대한민국",
    targetRole: "Marketing Specialist",
    skills: ["marketing", "operations", "excel", "google sheets", "communication", "korean"],
    experienceYears: 3,
    urbanPreference: "city",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "safe",
    housingCost: "average",
    diversityPreference: 4,
    koreaVisit: "sometimes_direct",
    spouseESL: false,
    notes: "마케팅/운영 경험. J1/OPT 가능성을 탐색하는 청년 인재 프로필."
  },
  {
    id: "C007",
    name: "한지수",
    residence: "대한민국",
    targetRole: "Battery Engineer",
    skills: ["battery", "manufacturing", "quality", "process", "korean"],
    experienceYears: 6,
    urbanPreference: "suburb",
    hasChild: true,
    educationImportance: 5,
    safetyTolerance: "very_safe",
    housingCost: "avg_minus_15",
    diversityPreference: 3,
    koreaVisit: "sometimes_direct",
    spouseESL: true,
    notes: "가족 동반 가능성 높음. 배터리 제조 품질/공정 경험 보유."
  },
  {
    id: "C008",
    name: "오세훈",
    residence: "기타 지역",
    targetRole: "Automation Engineer",
    skills: ["automation", "smart factory", "PLC", "python", "network"],
    experienceYears: 7,
    urbanPreference: "town",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "risk_ok",
    housingCost: "avg_minus_30",
    diversityPreference: 3,
    koreaVisit: "rare",
    spouseESL: false,
    notes: "비인기 지역 수용성이 높고 기술 적합도가 높은 자동화 인재."
  },
  {
    id: "C009",
    name: "강유진",
    residence: "대한민국",
    targetRole: "HR / Operations Coordinator",
    skills: ["operations", "hr", "onboarding", "communication", "korean", "excel"],
    experienceYears: 4,
    urbanPreference: "suburb",
    hasChild: true,
    educationImportance: 6,
    safetyTolerance: "very_safe",
    housingCost: "average",
    diversityPreference: 3,
    koreaVisit: "direct_required",
    spouseESL: true,
    notes: "가족 정착 안정성을 최우선으로 보는 운영/HR 인재."
  },
  {
    id: "C010",
    name: "배성민",
    residence: "미국",
    targetRole: "Manufacturing Engineer",
    skills: ["manufacturing", "equipment", "logistics", "process", "electronics"],
    experienceYears: 5,
    urbanPreference: "suburb",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "average_ok",
    housingCost: "avg_minus_15",
    diversityPreference: 2,
    koreaVisit: "rare",
    spouseESL: false,
    notes: "미국 체류 중인 제조 엔지니어. 현장 투입 가능성과 이동 유연성 보유."
  }
];

const prefMap = {
  city: 5,
  suburb: 3,
  town: 1,
  very_safe: 5,
  safe: 4,
  average_ok: 3,
  risk_ok: 1,
  avg_minus_30: 5,
  avg_minus_15: 4,
  average: 3,
  avg_plus_15: 2,
  direct_required: 5,
  direct_important: 4,
  sometimes_direct: 3,
  rare: 1
};

function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function scoreMatch(candidate, job) {
  const cSkills = candidate.skills.map((s) => s.toLowerCase());
  const jKeywords = job.keywords.map((s) => s.toLowerCase());

  const skillHits = jKeywords.filter((k) =>
    cSkills.some((s) => k.includes(s) || s.includes(k))
  ).length;

  const skillScore = clamp((skillHits / Math.max(4, jKeywords.length)) * 100);

  const roleScore =
    candidate.targetRole
      .toLowerCase()
      .split(/\s|\/|-/)
      .some(
        (w) =>
          w.length > 2 &&
          (job.title.toLowerCase().includes(w) ||
            job.category.toLowerCase().includes(w))
      )
      ? 90
      : 55;

  const cityPref = prefMap[candidate.urbanPreference];
  const costPref = prefMap[candidate.housingCost];
  const safetyPref = prefMap[candidate.safetyTolerance];
  const flightPref = prefMap[candidate.koreaVisit];
  const r = job.regionProfile;

  const fit = [
    100 - Math.abs(cityPref - r.cityLife) * 18,
    100 - Math.abs(costPref - r.cost) * 18,
    100 - Math.abs(safetyPref - r.safety) * 18,
    100 - Math.abs(candidate.educationImportance / 1.4 - r.school) * 14,
    100 - Math.abs(candidate.diversityPreference - r.diversity) * 16,
    100 - Math.abs(flightPref - r.directFlight) * 12,
    candidate.hasChild ? r.familyFit * 18 : 78
  ];

  const settlementScore = clamp(fit.reduce((a, b) => a + b, 0) / fit.length);
  const koreanBonus = job.koreanRequired && cSkills.includes("korean") ? 8 : 0;

  const total = clamp(
    skillScore * 0.38 +
      roleScore * 0.22 +
      settlementScore * 0.35 +
      koreanBonus
  );

  const risks = [];
  if (candidate.hasChild && r.school < 4) risks.push("자녀 교육환경 확인 필요");
  if (prefMap[candidate.housingCost] > r.cost + 1)
    risks.push("생활비 기대치 대비 부담 가능성");
  if (candidate.koreaVisit.includes("direct") && r.directFlight < 4)
    risks.push("한국 방문 접근성 점검 필요");
  if (candidate.spouseESL && r.koreanCommunity < 3)
    risks.push("배우자 지원 인프라 확인 필요");
  if (risks.length === 0) risks.push("주요 정착 리스크 낮음");

  return {
    total: Math.round(total),
    skillScore: Math.round(skillScore),
    roleScore: Math.round(roleScore),
    settlementScore: Math.round(settlementScore),
    risks
  };
}

function getMatchReason(candidate, job, match) {
  const reasons = [];

  const skillOverlap = candidate.skills.filter((skill) =>
    job.keywords.some(
      (keyword) =>
        keyword.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  if (skillOverlap.length > 0) {
    reasons.push(
      `직무 키워드(${skillOverlap.slice(0, 3).join(", ")})가 공고 요구사항과 일치합니다.`
    );
  }

  if (match.skillScore >= 70) {
    reasons.push("직무 경험과 기술 키워드의 직접 적합도가 높습니다.");
  } else if (match.skillScore >= 45) {
    reasons.push("일부 직무 키워드가 일치하여 추가 검토 가치가 있습니다.");
  }

  if (match.settlementScore >= 80) {
    reasons.push("생활 성향과 지역 정착 조건의 적합도가 높습니다.");
  } else if (match.settlementScore >= 65) {
    reasons.push("정착 적합도는 보통 수준이며 일부 생활 조건 확인이 필요합니다.");
  } else {
    reasons.push("직무 적합도는 있으나 정착 리스크 검토가 필요합니다.");
  }

  if (candidate.hasChild && job.regionProfile.familyFit >= 4) {
    reasons.push("가족 동반 정착에 비교적 적합한 지역 조건을 보입니다.");
  }

  if (job.koreanRequired && candidate.skills.includes("korean")) {
    reasons.push("한국어 역량이 필요한 포지션에 대응 가능합니다.");
  }

  return [...new Set(reasons)].slice(0, 3);
}

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

function ScorePill({ label, value }) {
  return (
    <div className="score-pill">
      <div className="score-pill-label">{label}</div>
      <div className="score-pill-value">{value}</div>
    </div>
  );
}

function MatchBar({ score }) {
  return (
    <div className="match-bar-wrap">
      <div className="match-bar-label-row">
        <span>종합 적합도</span>
        <strong>{score}%</strong>
      </div>
      <div className="match-bar">
        <div className="match-bar-fill" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("matching");
  const [selectedJobId, setSelectedJobId] = useState("J001");
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [sortMode, setSortMode] = useState("total");

  const selectedJob =
    jobPostings.find((job) => job.id === selectedJobId) || jobPostings[0];

  const matchResults = useMemo(() => {
    return candidates
      .map((candidate) => ({
        candidate,
        match: scoreMatch(candidate, selectedJob)
      }))
      .sort((a, b) => {
        if (sortMode === "skill") return b.match.skillScore - a.match.skillScore;
        if (sortMode === "settlement")
          return b.match.settlementScore - a.match.settlementScore;
        return b.match.total - a.match.total;
      });
  }, [selectedJob, sortMode]);

  const filteredJobs = useMemo(() => {
    return jobPostings.filter((job) => {
      const q = query.trim().toLowerCase();
      const target = [
        job.company,
        job.title,
        job.location,
        job.category,
        job.summary,
        ...job.keywords
      ]
        .join(" ")
        .toLowerCase();

      const queryOk = q === "" || target.includes(q);
      const stateOk = stateFilter === "ALL" || job.state === stateFilter;

      return queryOk && stateOk;
    });
  }, [query, stateFilter]);

  return (
    <div className="app-shell">
      <div className="page-container">
        <header className="hero-card">
          <div className="hero-topline">Global Talent Landing Platform · MVP</div>
          <h1 className="hero-title">글로벌 인재 발굴·정착 지원 대시보드</h1>
          <p className="hero-desc">
            공개 공고 샘플과 가상 지원자 데이터를 기반으로 직무 적합도와
            정착 적합도를 함께 확인할 수 있는 초기 데모 화면입니다.
          </p>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">{jobPostings.length}</div>
              <div className="stat-label">공고 수</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{candidates.length}</div>
              <div className="stat-label">가상 지원자 수</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{matchResults[0]?.match.total || 0}%</div>
              <div className="stat-label">최고 매칭 점수</div>
            </div>
          </div>
        </header>

        <nav className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "matching" ? "active" : ""}`}
            onClick={() => setActiveTab("matching")}
          >
            공고/지원자 매칭
          </button>
          <button
            className={`tab-btn ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            공고 모음
          </button>
          <button
            className={`tab-btn ${activeTab === "candidates" ? "active" : ""}`}
            onClick={() => setActiveTab("candidates")}
          >
            지원자 데이터 (가상)
          </button>
        </nav>

        {activeTab === "matching" && (
          <section className="section-card">
            <div className="section-head">
              <div>
                <h2>공고 선택</h2>
                <p>
                  여러 공고 중 하나를 선택하면 해당 공고에 대한 추천 지원자
                  카드가 아래에 정렬됩니다.
                </p>
              </div>
            </div>

            <div className="card-grid jobs-grid">
              {jobPostings.map((job) => (
                <button
                  key={job.id}
                  className={`job-card selectable ${
                    selectedJobId === job.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <div className="card-top-row">
                    <Tag>{job.state}</Tag>
                    <Tag>{job.category}</Tag>
                  </div>
                  <h3>{job.title}</h3>
                  <div className="card-subtitle">{job.company}</div>
                  <div className="card-meta">{job.location}</div>
                  <p className="card-summary">{job.summary}</p>
                </button>
              ))}
            </div>

            <div className="selected-info">
              <div className="selected-info-box">
                <div className="selected-label">선택된 공고</div>
                <div className="selected-title">{selectedJob.title}</div>
                <div className="selected-subtitle">
                  {selectedJob.company} · {selectedJob.location}
                </div>
                <div className="tag-row">
                  <Tag>{selectedJob.category}</Tag>
                  <Tag>{selectedJob.seniority}</Tag>
                  <Tag>
                    {selectedJob.koreanRequired
                      ? "Korean Required"
                      : "Korean Preferred"}
                  </Tag>
                </div>
              </div>
            </div>

            <div className="section-head">
              <div>
                <h2>추천 지원자</h2>
                <p>
                  직무 키워드, 역할 적합도, 정착 적합도를 종합하여 정렬했습니다.
                </p>
              </div>
            </div>

            <div className="sort-control">
              <button
                className={`sort-btn ${sortMode === "total" ? "active" : ""}`}
                onClick={() => setSortMode("total")}
              >
                종합 적합도순
              </button>
              <button
                className={`sort-btn ${sortMode === "skill" ? "active" : ""}`}
                onClick={() => setSortMode("skill")}
              >
                직무 적합도순
              </button>
              <button
                className={`sort-btn ${
                  sortMode === "settlement" ? "active" : ""
                }`}
                onClick={() => setSortMode("settlement")}
              >
                정착 적합도순
              </button>
            </div>

            <div className="card-grid candidate-grid">
              {matchResults.map(({ candidate, match }, index) => (
                <div key={candidate.id} className="candidate-card">
                  <div className="card-top-row">
                    <span className="rank-badge">추천 {index + 1}</span>
                    <span className="candidate-id">{candidate.id}</span>
                  </div>

                  <h3>{candidate.name}</h3>
                  <div className="card-subtitle">
                    {candidate.targetRole} · 경력 {candidate.experienceYears}년
                  </div>
                  <div className="card-meta">{candidate.residence}</div>

                  <MatchBar score={match.total} />

                  <div className="score-row">
                    <ScorePill label="직무" value={match.skillScore} />
                    <ScorePill label="역할" value={match.roleScore} />
                    <ScorePill label="정착" value={match.settlementScore} />
                  </div>

                  <div className="tag-row">
                    {candidate.skills.slice(0, 5).map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>

                  <p className="card-summary">{candidate.notes}</p>

                  <div className="reason-box">
                    <div className="reason-title">추천 사유</div>
                    <ul>
                      {getMatchReason(candidate, selectedJob, match).map(
                        (reason) => (
                          <li key={reason}>{reason}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="risk-box">
                    <div className="risk-title">정착 리스크</div>
                    <ul>
                      {match.risks.map((risk) => (
                        <li key={risk}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "jobs" && (
          <section className="section-card">
            <div className="section-head section-head-inline">
              <div>
                <h2>공고 모음</h2>
                <p>
                  미국 진출 한국기업 관련 공개 공고 샘플을 한눈에 확인할 수
                  있습니다.
                </p>
              </div>
              <div className="filter-wrap">
                <input
                  className="search-input"
                  placeholder="회사명, 직무명, 지역, 키워드 검색"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <select
                  className="state-select"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                >
                  <option value="ALL">전체 주</option>
                  {[...new Set(jobPostings.map((job) => job.state))].map(
                    (state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="card-grid jobs-grid">
              {filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="card-top-row">
                    <Tag>{job.state}</Tag>
                    <Tag>{job.category}</Tag>
                  </div>
                  <h3>{job.title}</h3>
                  <div className="card-subtitle">{job.company}</div>
                  <div className="card-meta">
                    {job.location} · {job.source}
                  </div>
                  <p className="card-summary">{job.summary}</p>

                  <div className="tag-row">
                    {job.keywords.slice(0, 6).map((keyword) => (
                      <Tag key={keyword}>{keyword}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "candidates" && (
          <section className="section-card">
            <div className="section-head">
              <div>
                <h2>지원자 데이터 (가상)</h2>
                <p>
                  설문 기반 가상 후보자 데이터를 포토카드형으로 정리한 화면입니다.
                </p>
              </div>
            </div>

            <div className="card-grid candidate-grid">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="candidate-card">
                  <div className="card-top-row">
                    <Tag>{candidate.hasChild ? "자녀 있음" : "자녀 없음"}</Tag>
                    <span className="candidate-id">{candidate.id}</span>
                  </div>

                  <h3>{candidate.name}</h3>
                  <div className="card-subtitle">
                    {candidate.targetRole} · 경력 {candidate.experienceYears}년
                  </div>
                  <div className="card-meta">{candidate.residence}</div>

                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label">주거 선호</div>
                      <div className="info-value">{candidate.urbanPreference}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">교육 중요도</div>
                      <div className="info-value">
                        {candidate.educationImportance}/7
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">한국 방문</div>
                      <div className="info-value">{candidate.koreaVisit}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">배우자 지원</div>
                      <div className="info-value">
                        {candidate.spouseESL ? "필요" : "해당 없음"}
                      </div>
                    </div>
                  </div>

                  <div className="tag-row">
                    {candidate.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>

                  <p className="card-summary">{candidate.notes}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="footer-note">
          본 화면은 제안서 제출용 MVP 예시입니다. 실제 서비스에서는 공식 채용
          데이터, 기업 입력 데이터, 지역 생활환경 데이터 등을 연동해 고도화할 수
          있습니다.
        </footer>
      </div>
    </div>
  );
}
