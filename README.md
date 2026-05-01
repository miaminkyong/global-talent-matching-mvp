global-talent-matching-mvp
├─ package.json
├─ index.html
├─ src
│  ├─ import React, { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, Users, Plane, Home, Shield, GraduationCap, Mail, BarChart3, Filter, Sparkles } from "lucide-react";

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
    regionProfile: { cityLife: 2, cost: 5, safety: 3, school: 3, diversity: 2, koreanCommunity: 2, familyFit: 5, directFlight: 2 },
    summary: "배터리 제조 공정과 스마트팩토리 자동화 역량을 요구하는 한영 바이링구얼 엔지니어 포지션",
    source: "LinkedIn 공개 공고 기반 샘플"
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
    keywords: ["equipment", "manufacturing", "logistics", "battery", "electronics", "autocad", "PLC", "korean preferred"],
    regionProfile: { cityLife: 2, cost: 4, safety: 3, school: 3, diversity: 2, koreanCommunity: 2, familyFit: 4, directFlight: 2 },
    summary: "제조·물류 장비 이해와 현장 대응 역량을 요구하는 배터리/전자 제조 기반 엔지니어 포지션",
    source: "LinkedIn 공개 공고 기반 샘플"
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
    regionProfile: { cityLife: 2, cost: 4, safety: 3, school: 3, diversity: 2, koreanCommunity: 2, familyFit: 4, directFlight: 2 },
    summary: "자동화 물류 장비 유지보수와 고객사 현장 대응을 담당하는 한영 바이링구얼 엔지니어 포지션",
    source: "LinkedIn 공개 공고 기반 샘플"
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
    keywords: ["finance", "controller", "accounting", "compliance", "korean", "us subsidiary"],
    regionProfile: { cityLife: 4, cost: 3, safety: 4, school: 4, diversity: 4, koreanCommunity: 3, familyFit: 4, directFlight: 4 },
    summary: "미국 법인 재무관리와 내부통제 경험을 요구하는 현지 채용 기반 컨트롤러 포지션",
    source: "JobKorea 공개 공고 기반 샘플"
  },
  {
    id: "J005",
    company: "Qcells / Korean Practice 계열",
    title: "Jr. Accounting Associate",
    location: "Irvine, California",
    state: "CA",
    category: "Accounting",
    seniority: "Junior",
    koreanRequired: true,
    englishRequired: true,
    keywords: ["accounting", "finance", "excel", "erp", "korean", "bilingual"],
    regionProfile: { cityLife: 5, cost: 1, safety: 4, school: 4, diversity: 5, koreanCommunity: 5, familyFit: 3, directFlight: 5 },
    summary: "한인 인프라가 강한 캘리포니아 지역의 회계·재무 주니어 포지션",
    source: "Glassdoor 공개 검색 결과 기반 샘플"
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
    keywords: ["marketing", "operations", "excel", "google sheets", "communication", "korean preferred", "OPT", "J1"],
    regionProfile: { cityLife: 5, cost: 2, safety: 4, school: 4, diversity: 5, koreanCommunity: 5, familyFit: 4, directFlight: 5 },
    summary: "뉴저지 한인 인프라와 직항 접근성이 강한 마케팅·오퍼레이션 포지션",
    source: "KOTRA/JobKoreaUSA 공개 공고 기반 샘플"
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
    lifestyle: 3,
    diversityExperience: 3,
    diversityPreference: 3,
    sports: ["baseball"],
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
    lifestyle: 2,
    diversityExperience: 4,
    diversityPreference: 2,
    sports: ["soccer"],
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
    lifestyle: 5,
    diversityExperience: 3,
    diversityPreference: 4,
    sports: ["golf"],
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
    lifestyle: 3,
    diversityExperience: 2,
    diversityPreference: 2,
    sports: ["basketball"],
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
    lifestyle: 5,
    diversityExperience: 4,
    diversityPreference: 4,
    sports: ["golf", "basketball"],
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
    lifestyle: 4,
    diversityExperience: 3,
    diversityPreference: 4,
    sports: ["baseball", "soccer"],
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
    lifestyle: 3,
    diversityExperience: 2,
    diversityPreference: 3,
    sports: ["baseball"],
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
    lifestyle: 2,
    diversityExperience: 4,
    diversityPreference: 3,
    sports: ["soccer"],
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
    lifestyle: 4,
    diversityExperience: 2,
    diversityPreference: 3,
    sports: ["none"],
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
    lifestyle: 3,
    diversityExperience: 3,
    diversityPreference: 2,
    sports: ["basketball"],
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
  avg_plus_30: 1,
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
  const skillHits = jKeywords.filter((k) => cSkills.some((s) => k.includes(s) || s.includes(k))).length;
  const skillScore = clamp((skillHits / Math.max(4, jKeywords.length)) * 100);

  const roleScore = candidate.targetRole.toLowerCase().split(/\s|\//).some((w) => job.title.toLowerCase().includes(w) || job.category.toLowerCase().includes(w)) ? 90 : 55;

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
  const total = clamp(skillScore * 0.38 + roleScore * 0.22 + settlementScore * 0.35 + koreanBonus);

  const risk = [];
  if (candidate.hasChild && r.school < 4) risk.push("자녀 교육환경 확인 필요");
  if (prefMap[candidate.housingCost] > r.cost + 1) risk.push("생활비 기대치 대비 부담 가능성");
  if (candidate.koreaVisit.includes("direct") && r.directFlight < 4) risk.push("한국 방문 접근성 리스크");
  if (candidate.spouseESL && r.koreanCommunity < 3) risk.push("배우자 ESL/커뮤니티 지원 확인 필요");
  if (!risk.length) risk.push("주요 정착 리스크 낮음");

  return { total: Math.round(total), skillScore: Math.round(skillScore), roleScore: Math.round(roleScore), settlementScore: Math.round(settlementScore), risk };
}

function Badge({ children }) {
  return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{children}</span>;
}

function ScoreBar({ score }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-xs text-slate-500"><span>적합도</span><span>{score}%</span></div>
      <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-slate-900" style={{ width: `${score}%` }} /></div>
    </div>
  );
}

export default function GlobalTalentMatchingDashboard() {
  const [selectedJobId, setSelectedJobId] = useState("J001");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("matching");
  const [stateFilter, setStateFilter] = useState("ALL");

  const selectedJob = jobPostings.find((j) => j.id === selectedJobId) || jobPostings[0];
  const matches = useMemo(() => {
    return candidates
      .map((c) => ({ candidate: c, match: scoreMatch(c, selectedJob) }))
      .sort((a, b) => b.match.total - a.match.total);
  }, [selectedJob]);

  const filteredJobs = jobPostings.filter((j) => {
    const q = query.toLowerCase();
    const hit = [j.company, j.title, j.location, j.category, j.summary, ...j.keywords].join(" ").toLowerCase().includes(q);
    const stateHit = stateFilter === "ALL" || j.state === stateFilter;
    return hit && stateHit;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><Sparkles size={16} /> MVP Prototype</div>
              <h1 className="text-3xl font-bold tracking-tight">글로벌 인재 발굴·정착 매칭 대시보드</h1>
              <p className="mt-2 max-w-3xl text-slate-600">오늘 기준 공개 채용공고 샘플과 가상 설문 응답자 10명을 매칭하여, 직무 적합도와 정착 적합도를 함께 보여주는 AI 헤드헌팅 초기 화면입니다.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-slate-100 p-4"><div className="text-2xl font-bold">{jobPostings.length}</div><div className="text-xs text-slate-500">공고 샘플</div></div>
              <div className="rounded-2xl bg-slate-100 p-4"><div className="text-2xl font-bold">{candidates.length}</div><div className="text-xs text-slate-500">가상 지원자</div></div>
              <div className="rounded-2xl bg-slate-100 p-4"><div className="text-2xl font-bold">{matches[0].match.total}%</div><div className="text-xs text-slate-500">최고 매칭</div></div>
            </div>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2">
          {[
            ["matching", "공고-지원자 매칭"],
            ["jobs", "공고 모아보기"],
            ["candidates", "가상 지원자 데이터"]
          ].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === id ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}>{label}</button>
          ))}
        </nav>

        {activeTab === "matching" && (
          <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><Briefcase size={20} /> 기준 공고 선택</h2>
              <div className="space-y-3">
                {jobPostings.map((job) => (
                  <button key={job.id} onClick={() => setSelectedJobId(job.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedJobId === job.id ? "border-slate-900 bg-slate-50" : "border-slate-100 hover:border-slate-300"}`}>
                    <div className="text-sm font-bold">{job.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{job.company}</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-500"><MapPin size={13} /> {job.location}</div>
                  </button>
                ))}
              </div>
            </aside>

            <main className="space-y-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2"><Badge>{selectedJob.category}</Badge><Badge>{selectedJob.seniority}</Badge><Badge>{selectedJob.koreanRequired ? "Korean Required" : "Korean Preferred"}</Badge></div>
                    <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                    <p className="mt-1 text-slate-600">{selectedJob.company} · {selectedJob.location}</p>
                    <p className="mt-3 text-sm text-slate-600">{selectedJob.summary}</p>
                  </div>
                  <div className="min-w-56 rounded-2xl bg-slate-100 p-4 text-sm"><div className="mb-1 font-semibold">지역 정착 프로필</div><div>도시성 {selectedJob.regionProfile.cityLife}/5 · 생활비 {selectedJob.regionProfile.cost}/5 · 가족적합 {selectedJob.regionProfile.familyFit}/5</div></div>
                </div>
              </div>

              <div className="grid gap-4">
                {matches.map(({ candidate, match }, idx) => (
                  <article key={candidate.id} className="rounded-3xl bg-white p-5 shadow-sm">
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr] lg:items-center">
                      <div>
                        <div className="mb-2 text-xs font-bold text-slate-400">추천 #{idx + 1}</div>
                        <h3 className="text-xl font-bold">{candidate.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{candidate.targetRole} · {candidate.experienceYears}년 · {candidate.residence}</p>
                        <p className="mt-3 text-sm text-slate-600">{candidate.notes}</p>
                        <div className="mt-3 flex flex-wrap gap-2">{candidate.skills.slice(0, 5).map((s) => <Badge key={s}>{s}</Badge>)}</div>
                      </div>
                      <div className="space-y-3">
                        <ScoreBar score={match.total} />
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="rounded-xl bg-slate-50 p-2"><b>{match.skillScore}</b><br />직무</div>
                          <div className="rounded-xl bg-slate-50 p-2"><b>{match.roleScore}</b><br />역할</div>
                          <div className="rounded-xl bg-slate-50 p-2"><b>{match.settlementScore}</b><br />정착</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold"><Shield size={16} /> 정착 리스크</div>
                        <ul className="space-y-1 text-sm text-slate-600">{match.risk.map((r) => <li key={r}>· {r}</li>)}</ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </main>
          </section>
        )}

        {activeTab === "jobs" && (
          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="직무, 회사, 지역, 키워드 검색" className="w-full bg-transparent outline-none" /></div>
              <div className="flex items-center gap-2"><Filter size={18} /><select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="rounded-2xl bg-slate-100 px-4 py-3 outline-none"><option value="ALL">전체 주</option>{[...new Set(jobPostings.map((j) => j.state))].map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredJobs.map((job) => (
                <article key={job.id} className="rounded-3xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex flex-wrap gap-2"><Badge>{job.state}</Badge><Badge>{job.category}</Badge><Badge>{job.source}</Badge></div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{job.company} · {job.location}</p>
                  <p className="mt-3 text-sm text-slate-600">{job.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{job.keywords.map((k) => <Badge key={k}>{k}</Badge>)}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "candidates" && (
          <section className="grid gap-4 lg:grid-cols-2">
            {candidates.map((c) => (
              <article key={c.id} className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div><h3 className="text-xl font-bold">{c.name}</h3><p className="mt-1 text-sm text-slate-600">{c.targetRole} · {c.experienceYears}년 · {c.residence}</p></div>
                  <Badge>{c.hasChild ? "자녀 있음" : "자녀 없음"}</Badge>
                </div>
                <p className="mt-3 text-sm text-slate-600">{c.notes}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 p-3"><Home className="mb-1" size={16} />주거 선호: {c.urbanPreference}</div>
                  <div className="rounded-2xl bg-slate-50 p-3"><GraduationCap className="mb-1" size={16} />교육 중요도: {c.educationImportance}/7</div>
                  <div className="rounded-2xl bg-slate-50 p-3"><Plane className="mb-1" size={16} />한국 방문: {c.koreaVisit}</div>
                  <div className="rounded-2xl bg-slate-50 p-3"><Users className="mb-1" size={16} />ESL 지원: {c.spouseESL ? "필요" : "해당 없음"}</div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">{c.skills.map((s) => <Badge key={s}>{s}</Badge>)}</div>
              </article>
            ))}
          </section>
        )}

        <footer className="rounded-3xl bg-white p-5 text-sm text-slate-500 shadow-sm">
          <div className="mb-1 flex items-center gap-2 font-semibold text-slate-700"><BarChart3 size={16} /> 데모 설명</div>
          본 화면은 실제 서비스의 초기 MVP 예시입니다. 공개 검색 결과 기반 채용공고 샘플과 설문 문항을 반영한 가상 지원자 데이터를 사용하며, 실제 서비스에서는 기업 동의 데이터·공식 채용 데이터·공공/웹 지역 데이터를 RAG 방식으로 연동해 고도화할 수 있습니다.
        </footer>
      </div>
    </div>
  );
}

│  └─ main.jsx
