import React, { useMemo, useRef, useState } from "react";

const initialJobs = [
  {
    id: "J001",
    company: "Ultium Cells LLC",
    title: "Smart Factory Engineer",
    location: "Warren, Ohio",
    state: "OH",
    category: "Smart Factory / Battery",
    seniority: "Mid",
    koreanRequired: true,
    greenCardSupport: "비자/영주권 협의",
    keywords: ["battery", "smart factory", "automation", "PLC", "python", "data analytics", "korean"],
    regionProfile: { cityLife: 2, cost: 5, safety: 3, school: 3, diversity: 2, koreanCommunity: 2, familyFit: 5, directFlight: 2 },
    summary: "배터리 제조 공정과 스마트팩토리 자동화 역량을 요구하는 한영 바이링구얼 엔지니어 포지션",
    source: "공개 공고 기반 샘플",
    updatedAt: "오늘 09:00"
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
    greenCardSupport: "지원 여부 미확인",
    keywords: ["equipment", "manufacturing", "logistics", "battery", "electronics", "autocad", "PLC"],
    regionProfile: { cityLife: 2, cost: 4, safety: 3, school: 3, diversity: 2, koreanCommunity: 2, familyFit: 4, directFlight: 2 },
    summary: "제조·물류 장비 이해와 현장 대응 역량을 요구하는 배터리/전자 제조 기반 엔지니어 포지션",
    source: "공개 공고 기반 샘플",
    updatedAt: "오늘 09:00"
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
    greenCardSupport: "비자/영주권 협의",
    keywords: ["field service", "automation", "maintenance", "production support", "customer", "korean"],
    regionProfile: { cityLife: 2, cost: 4, safety: 3, school: 3, diversity: 2, koreanCommunity: 2, familyFit: 4, directFlight: 2 },
    summary: "자동화 물류 장비 유지보수와 고객사 현장 대응을 담당하는 한영 바이링구얼 엔지니어 포지션",
    source: "공개 공고 기반 샘플",
    updatedAt: "오늘 09:00"
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
    greenCardSupport: "영주권 지원 가능",
    keywords: ["finance", "controller", "accounting", "compliance", "korean", "english"],
    regionProfile: { cityLife: 4, cost: 3, safety: 4, school: 4, diversity: 4, koreanCommunity: 3, familyFit: 4, directFlight: 4 },
    summary: "미국 법인 재무관리와 내부통제 경험을 요구하는 현지 채용 기반 컨트롤러 포지션",
    source: "공개 공고 기반 샘플",
    updatedAt: "오늘 09:00"
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
    greenCardSupport: "지원 여부 미확인",
    keywords: ["accounting", "finance", "excel", "erp", "korean", "bilingual"],
    regionProfile: { cityLife: 5, cost: 1, safety: 4, school: 4, diversity: 5, koreanCommunity: 5, familyFit: 3, directFlight: 5 },
    summary: "한인 인프라가 강한 캘리포니아 지역의 회계·재무 주니어 포지션",
    source: "공개 공고 기반 샘플",
    updatedAt: "오늘 09:00"
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
    greenCardSupport: "비자/영주권 협의",
    keywords: ["marketing", "operations", "excel", "google sheets", "communication", "korean preferred"],
    regionProfile: { cityLife: 5, cost: 2, safety: 4, school: 4, diversity: 5, koreanCommunity: 5, familyFit: 4, directFlight: 5 },
    summary: "뉴저지 한인 인프라와 직항 접근성이 강한 마케팅·오퍼레이션 포지션",
    source: "공개 공고 기반 샘플",
    updatedAt: "오늘 09:00"
  }
];

const initialCandidates = [
  {
    id: "C001",
    name: "김서연",
    email: "seoyeon.kim@example.com",
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
    candidateType: "정착Fit 분석",
    fitType: "가족 안정형",
    resumeSummary: "배터리 제조 환경에서 스마트팩토리 자동화와 데이터 분석 경험을 보유한 엔지니어",
    notes: "초등 자녀 교육과 안정적 생활비를 중시. 제조업 현장 경험 보유."
  },
  {
    id: "C002",
    name: "박준호",
    email: "junho.park@example.com",
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
    candidateType: "프로필Fit 분석",
    fitType: "현장 적응형",
    resumeSummary: "자동화 설비 유지보수와 고객사 현장 대응 경험을 가진 필드 서비스 엔지니어",
    notes: "생활비가 낮고 현장성이 강한 지역 선호. 이동 유연성 높음."
  },
  {
    id: "C003",
    name: "이민지",
    email: "minji.lee@example.com",
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
    candidateType: "프로필Fit 분석",
    fitType: "도시 커리어형",
    resumeSummary: "미국 법인 재무관리와 내부통제 업무에 적합한 시니어 재무 인재",
    notes: "재무관리 경력 강점. 도시 인프라, 학군, 한국 접근성을 중시."
  },
  {
    id: "C004",
    name: "최현우",
    email: "hyunwoo.choi@example.com",
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
    candidateType: "정착Fit 분석",
    fitType: "균형 정착형",
    resumeSummary: "제조 장비 유지보수와 현장 대응 경험을 보유한 장비기술 엔지니어",
    notes: "교외형 근무지 수용 가능. 제조 장비와 현장 대응 경험 보유."
  },
  {
    id: "C005",
    name: "정하은",
    email: "haeun.jung@example.com",
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
    candidateType: "프로필Fit 분석",
    fitType: "도시 커리어형",
    resumeSummary: "회계, ERP, 엑셀 기반 업무 역량을 가진 주니어 회계 인재",
    notes: "한인 커뮤니티와 도시 인프라 선호. 주니어 회계 포지션 적합."
  },
  {
    id: "C006",
    name: "윤도현",
    email: "dohyun.yoon@example.com",
    residence: "대한민국",
    targetRole: "Marketing / Operations Specialist",
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
    candidateType: "공고 탐색",
    fitType: "도시 커리어형",
    resumeSummary: "마케팅 운영과 데이터 정리, 커뮤니케이션 역량을 갖춘 운영형 인재",
    notes: "J1/OPT 가능성을 탐색하는 청년 인재 프로필."
  },
  {
    id: "C007",
    name: "한지수",
    email: "jisu.han@example.com",
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
    candidateType: "정착Fit 분석",
    fitType: "가족 안정형",
    resumeSummary: "배터리 제조 품질과 공정 개선 경험을 가진 제조 엔지니어",
    notes: "가족 동반 가능성 높음. 안정적 정착 환경을 중시."
  },
  {
    id: "C008",
    name: "오세훈",
    email: "sehoon.oh@example.com",
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
    candidateType: "공고 탐색",
    fitType: "현장 적응형",
    resumeSummary: "스마트팩토리 자동화, PLC, 네트워크 기반 설비 개선 역량을 갖춘 인재",
    notes: "비인기 지역 수용성이 높고 기술 적합도가 높은 자동화 인재."
  },
  {
    id: "C009",
    name: "강유진",
    email: "yujin.kang@example.com",
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
    candidateType: "정착Fit 분석",
    fitType: "가족 안정형",
    resumeSummary: "온보딩, 운영관리, 커뮤니케이션 역량을 갖춘 HR/운영 인재",
    notes: "가족 정착 안정성을 최우선으로 보는 운영/HR 인재."
  },
  {
    id: "C010",
    name: "배성민",
    email: "sungmin.bae@example.com",
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
    candidateType: "프로필Fit 분석",
    fitType: "균형 정착형",
    resumeSummary: "제조 공정과 물류 장비 운영 경험을 보유한 현장형 엔지니어",
    notes: "미국 체류 중인 제조 엔지니어. 현장 투입 가능성과 이동 유연성 보유."
  },
  {
    id: "C011",
    name: "송예린",
    email: "yerin.song@example.com",
    residence: "대한민국",
    targetRole: "Supply Chain / Logistics Specialist",
    skills: ["logistics", "supply chain", "excel", "erp", "english", "korean"],
    experienceYears: 5,
    urbanPreference: "city",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "safe",
    housingCost: "average",
    diversityPreference: 4,
    koreaVisit: "direct_important",
    spouseESL: false,
    candidateType: "프로필Fit 분석",
    fitType: "도시 커리어형",
    resumeSummary: "공급망, 물류, ERP, 엑셀 기반 운영 분석 경험을 가진 물류/SCM 인재",
    notes: "도시 인프라와 직항 접근성을 중시하는 물류 운영 인재."
  },
  {
    id: "C012",
    name: "문태준",
    email: "taejun.moon@example.com",
    residence: "미국",
    targetRole: "Quality Engineer",
    skills: ["quality", "manufacturing", "process", "battery", "inspection", "english"],
    experienceYears: 8,
    urbanPreference: "suburb",
    hasChild: true,
    educationImportance: 4,
    safetyTolerance: "safe",
    housingCost: "average",
    diversityPreference: 3,
    koreaVisit: "sometimes_direct",
    spouseESL: true,
    candidateType: "공고 탐색",
    fitType: "균형 정착형",
    resumeSummary: "제조 품질, 검사, 공정 안정화 경험을 가진 시니어 품질 엔지니어",
    notes: "미국 체류 경험이 있고 가족 동반 정착 조건도 함께 검토 필요."
  },
  {
    id: "C013",
    name: "장나래",
    email: "narae.jang@example.com",
    residence: "대한민국",
    targetRole: "Data Analyst",
    skills: ["python", "data analytics", "excel", "dashboard", "operations", "english"],
    experienceYears: 4,
    urbanPreference: "city",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "average_ok",
    housingCost: "avg_plus_15",
    diversityPreference: 5,
    koreaVisit: "direct_required",
    spouseESL: false,
    candidateType: "프로필Fit 분석",
    fitType: "도시 커리어형",
    resumeSummary: "파이썬, 대시보드, 운영 데이터 분석 역량을 갖춘 데이터 분석 인재",
    notes: "도시 기반 커리어 확장과 직항 접근성을 중시."
  },
  {
    id: "C014",
    name: "임건우",
    email: "gunwoo.lim@example.com",
    residence: "대한민국",
    targetRole: "Field Service Engineer",
    skills: ["maintenance", "equipment", "field service", "electronics", "customer", "korean"],
    experienceYears: 6,
    urbanPreference: "town",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "average_ok",
    housingCost: "avg_minus_30",
    diversityPreference: 2,
    koreaVisit: "rare",
    spouseESL: false,
    candidateType: "정착Fit 분석",
    fitType: "현장 적응형",
    resumeSummary: "장비 유지보수, 고객사 대응, 현장 트러블슈팅 경험이 강한 필드 서비스 인재",
    notes: "비도심 제조 거점 근무 수용성이 높은 후보자."
  },
  {
    id: "C015",
    name: "노수아",
    email: "sua.noh@example.com",
    residence: "캐나다",
    targetRole: "Marketing / Operations Specialist",
    skills: ["marketing", "operations", "communication", "excel", "english", "korean"],
    experienceYears: 4,
    urbanPreference: "city",
    hasChild: false,
    educationImportance: 1,
    safetyTolerance: "safe",
    housingCost: "average",
    diversityPreference: 5,
    koreaVisit: "sometimes_direct",
    spouseESL: false,
    candidateType: "공고 탐색",
    fitType: "도시 커리어형",
    resumeSummary: "북미 생활 경험과 마케팅/운영 커뮤니케이션 역량을 갖춘 글로벌 운영 인재",
    notes: "북미 생활 경험이 있어 미국 근무 전환 가능성이 높은 후보자."
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

  const cityPref = prefMap[candidate.urbanPreference] || 3;
  const costPref = prefMap[candidate.housingCost] || 3;
  const safetyPref = prefMap[candidate.safetyTolerance] || 3;
  const flightPref = prefMap[candidate.koreaVisit] || 3;
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
  const greenCardBonus =
    job.greenCardSupport === "영주권 지원 가능" &&
    candidate.residence === "대한민국"
      ? 6
      : 0;

  const total = clamp(
    skillScore * 0.36 +
      roleScore * 0.2 +
      settlementScore * 0.34 +
      koreanBonus +
      greenCardBonus
  );

  const risks = [];
  if (candidate.hasChild && r.school < 4) risks.push("자녀 교육환경 확인 필요");
  if ((prefMap[candidate.housingCost] || 3) > r.cost + 1) {
    risks.push("생활비 기대치 대비 부담 가능성");
  }
  if (candidate.koreaVisit.includes("direct") && r.directFlight < 4) {
    risks.push("한국 방문 접근성 점검 필요");
  }
  if (candidate.spouseESL && r.koreanCommunity < 3) {
    risks.push("배우자 지원 인프라 확인 필요");
  }
  if (
    job.greenCardSupport === "지원 여부 미확인" &&
    candidate.residence === "대한민국"
  ) {
    risks.push("영주권/비자 지원 여부 확인 필요");
  }
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
      `직무 키워드(${skillOverlap
        .slice(0, 3)
        .join(", ")})가 공고 요구사항과 일치합니다.`
    );
  }

  if (match.settlementScore >= 80) {
    reasons.push("생활 성향과 지역 정착 조건의 적합도가 높습니다.");
  } else if (match.settlementScore >= 65) {
    reasons.push("정착 적합도는 보통 수준이며 일부 생활 조건 확인이 필요합니다.");
  } else {
    reasons.push("직무 적합도는 있으나 정착 리스크 검토가 필요합니다.");
  }

  if (job.greenCardSupport === "영주권 지원 가능") {
    reasons.push("한국 내 구직자에게 중요한 영주권 지원 가능성이 있는 공고입니다.");
  }

  if (job.koreanRequired && candidate.skills.includes("korean")) {
    reasons.push("한국어 역량이 필요한 포지션에 대응 가능합니다.");
  }

  return [...new Set(reasons)].slice(0, 3);
}

function getFitType(candidate) {
  if (candidate.hasChild && candidate.educationImportance >= 5) return "가족 안정형";
  if (candidate.urbanPreference === "city") return "도시 커리어형";
  if (candidate.housingCost === "avg_minus_30") return "비용 효율형";
  if (candidate.urbanPreference === "town") return "현장 적응형";
  return "균형 정착형";
}

function extractKeywords(text, fallback = []) {
  const dictionary = [
    "battery",
    "manufacturing",
    "automation",
    "smart factory",
    "PLC",
    "python",
    "data analytics",
    "finance",
    "accounting",
    "controller",
    "compliance",
    "marketing",
    "operations",
    "field service",
    "maintenance",
    "korean",
    "english",
    "excel",
    "ERP",
    "HR",
    "onboarding",
    "quality",
    "process",
    "logistics",
    "supply chain",
    "dashboard"
  ];

  const lowered = text.toLowerCase();
  const found = dictionary.filter((keyword) =>
    lowered.includes(keyword.toLowerCase())
  );

  return [...new Set([...found, ...fallback])].slice(0, 8);
}

function inferRoleFromKeywords(keywords) {
  const k = keywords.join(" ").toLowerCase();
  if (k.includes("finance") || k.includes("accounting") || k.includes("controller")) {
    return "Financial Controller";
  }
  if (k.includes("marketing") || k.includes("operations")) {
    return "Marketing / Operations Specialist";
  }
  if (k.includes("field service") || k.includes("maintenance")) {
    return "Field Service Engineer";
  }
  if (k.includes("automation") || k.includes("smart factory") || k.includes("plc")) {
    return "Smart Factory Engineer";
  }
  if (k.includes("logistics") || k.includes("supply chain")) {
    return "Supply Chain / Logistics Specialist";
  }
  if (k.includes("quality")) return "Quality Engineer";
  if (k.includes("battery") || k.includes("manufacturing")) {
    return "Manufacturing Engineer";
  }
  return "Open Position";
}

function makeResumeSummary(name, role, keywords) {
  const skillText = keywords.slice(0, 4).join(", ");
  return `${name || "지원자"}님은 ${role} 직무와 관련된 ${skillText} 역량을 중심으로 분석된 후보자입니다.`;
}

function downloadCSV(filename, rows) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((field) => {
          const value = row[field] ?? "";
          return `"${String(value).replaceAll('"', '""')}"`;
        })
        .join(",")
    )
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Tag({ children, tone = "default" }) {
  return (
    <span className={`tag ${tone === "visa" ? "visa-tag" : ""}`}>
      {children}
    </span>
  );
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
  const [jobs, setJobs] = useState(initialJobs);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [mode, setMode] = useState("seeker");
  const [adminTab, setAdminTab] = useState("matching");
  const [seekerTab, setSeekerTab] = useState("fit");
  const [selectedJobId, setSelectedJobId] = useState("J001");
  const [sortMode, setSortMode] = useState("total");
  const [jobQuery, setJobQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [greenCardFilter, setGreenCardFilter] = useState("ALL");
  const [lastRefresh, setLastRefresh] = useState("오늘 09:00");

  const [editingCandidateId, setEditingCandidateId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    targetRole: "",
    experienceYears: "",
    residence: "",
    skills: "",
    notes: "",
    resumeSummary: ""
  });

  const [fitForm, setFitForm] = useState({
    name: "테스트 지원자",
    email: "test@example.com",
    targetRole: "Battery Engineer",
    skills: "battery, manufacturing, korean",
    residence: "대한민국",
    urbanPreference: "suburb",
    hasChild: "true",
    educationImportance: 6,
    safetyTolerance: "very_safe",
    housingCost: "avg_minus_15",
    diversityPreference: 3,
    koreaVisit: "direct_important",
    spouseESL: "true"
  });

  const [fitResult, setFitResult] = useState(null);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    targetRole: "",
    years: 3,
    fileName: "",
    resumeText: ""
  });

  const [profileResult, setProfileResult] = useState(null);
  const seekerContentRef = useRef(null);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) || jobs[0];

  function goToSeekerTab(tabName) {
    setSeekerTab(tabName);
    setTimeout(() => {
      seekerContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
  }

  function upsertCandidate(nextCandidate) {
    setCandidates((prev) => {
      const normalizedEmail = nextCandidate.email?.trim().toLowerCase();
      const existingIndex = prev.findIndex(
        (c) => c.email?.trim().toLowerCase() === normalizedEmail && normalizedEmail
      );

      if (existingIndex >= 0) {
        return prev.map((candidate, index) => {
          if (index !== existingIndex) return candidate;

          return {
            ...candidate,
            ...nextCandidate,
            id: candidate.id,
            candidateType: [
              ...new Set([candidate.candidateType, nextCandidate.candidateType].filter(Boolean))
            ].join(" + "),
            skills: [...new Set([...(candidate.skills || []), ...(nextCandidate.skills || [])])],
            notes: nextCandidate.notes || candidate.notes,
            resumeSummary: nextCandidate.resumeSummary || candidate.resumeSummary,
            fitType: nextCandidate.fitType || candidate.fitType
          };
        });
      }

      return [
        {
          ...nextCandidate,
          id: `C${String(prev.length + 1).padStart(3, "0")}`
        },
        ...prev
      ];
    });
  }

  const matchResults = useMemo(() => {
    return candidates
      .map((candidate) => ({ candidate, match: scoreMatch(candidate, selectedJob) }))
      .sort((a, b) => {
        if (sortMode === "skill") return b.match.skillScore - a.match.skillScore;
        if (sortMode === "settlement") return b.match.settlementScore - a.match.settlementScore;
        return b.match.total - a.match.total;
      });
  }, [candidates, selectedJob, sortMode]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = jobQuery.trim().toLowerCase();
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
      const roleOk = roleFilter === "ALL" || job.category === roleFilter;
      const greenCardOk =
        greenCardFilter === "ALL" || job.greenCardSupport === greenCardFilter;

      return queryOk && stateOk && roleOk && greenCardOk;
    });
  }, [jobs, jobQuery, stateFilter, roleFilter, greenCardFilter]);

  function buildFitCandidate() {
    const base = {
      id: "TEMP",
      name: fitForm.name || "이름 미입력",
      email: fitForm.email || "",
      residence: fitForm.residence,
      targetRole: fitForm.targetRole || "Open Position",
      skills: fitForm.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      experienceYears: 3,
      urbanPreference: fitForm.urbanPreference,
      hasChild: fitForm.hasChild === "true",
      educationImportance: Number(fitForm.educationImportance),
      safetyTolerance: fitForm.safetyTolerance,
      housingCost: fitForm.housingCost,
      diversityPreference: Number(fitForm.diversityPreference),
      koreaVisit: fitForm.koreaVisit,
      spouseESL: fitForm.spouseESL === "true",
      candidateType: "정착Fit 분석",
      notes: "정착Fit 분석를 통해 생성된 예비 후보자 프로필"
    };

    return {
      ...base,
      fitType: getFitType(base)
    };
  }

  function runFitTest() {
    const candidate = buildFitCandidate();
    const rankedJobs = jobs
      .map((job) => ({ job, match: scoreMatch(candidate, job) }))
      .sort((a, b) => b.match.total - a.match.total)
      .slice(0, 3);

    setFitResult({
      candidate,
      fitType: getFitType(candidate),
      rankedJobs,
      saved: false
    });
  }

  function saveFitCandidate() {
    const candidate = buildFitCandidate();
    upsertCandidate(candidate);
    setFitResult((prev) => (prev ? { ...prev, saved: true } : prev));
  }

  function analyzeProfile() {
    const resumeText = profileForm.resumeText || "";
    const extracted = extractKeywords(resumeText);
    const inferredRole = profileForm.targetRole || inferRoleFromKeywords(extracted);
    const summary = makeResumeSummary(profileForm.name, inferredRole, extracted);

    const candidate = {
      id: "TEMP",
      name: profileForm.name || "이름 미입력",
      email: profileForm.email || "",
      residence: "대한민국",
      targetRole: inferredRole,
      skills: extracted.length ? extracted : ["korean", "communication"],
      experienceYears: Number(profileForm.years) || 0,
      urbanPreference: "suburb",
      hasChild: false,
      educationImportance: 2,
      safetyTolerance: "safe",
      housingCost: "average",
      diversityPreference: 3,
      koreaVisit: "sometimes_direct",
      spouseESL: false,
      candidateType: "프로필Fit 분석",
      fitType: "분석 대기",
      resumeSummary: summary,
      notes: `${profileForm.fileName || "이력서"} 기반으로 AI 분석 mock 처리된 후보자 프로필`
    };

    const rankedJobs = jobs
      .map((job) => ({ job, match: scoreMatch(candidate, job) }))
      .sort((a, b) => b.match.total - a.match.total)
      .slice(0, 3);

    upsertCandidate(candidate);
    setProfileResult({ candidate, rankedJobs });
  }

  function refreshJobs() {
    const now = new Date();
    const label = `오늘 ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setLastRefresh(label);
    setJobs((prev) => prev.map((job) => ({ ...job, updatedAt: label })));
  }

  function exportCandidates() {
    const rows = candidates.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      targetRole: c.targetRole,
      experienceYears: c.experienceYears,
      residence: c.residence,
      skills: c.skills.join(" / "),
      candidateType: c.candidateType,
      fitType: c.fitType,
      hasChild: c.hasChild ? "Y" : "N",
      educationImportance: c.educationImportance,
      safetyTolerance: c.safetyTolerance,
      housingCost: c.housingCost,
      resumeSummary: c.resumeSummary,
      notes: c.notes
    }));

    downloadCSV("talent-db.csv", rows);
  }

  function exportJobs() {
    const rows = jobs.map((j) => ({
      id: j.id,
      company: j.company,
      title: j.title,
      location: j.location,
      state: j.state,
      category: j.category,
      seniority: j.seniority,
      koreanRequired: j.koreanRequired ? "Y" : "N",
      greenCardSupport: j.greenCardSupport,
      keywords: j.keywords.join(" / "),
      source: j.source,
      updatedAt: j.updatedAt
    }));

    downloadCSV("job-postings.csv", rows);
  }

  function startEditCandidate(candidate) {
    setEditingCandidateId(candidate.id);
    setEditForm({
      name: candidate.name,
      email: candidate.email || "",
      targetRole: candidate.targetRole,
      experienceYears: candidate.experienceYears,
      residence: candidate.residence,
      skills: candidate.skills.join(", "),
      notes: candidate.notes,
      resumeSummary: candidate.resumeSummary || ""
    });
  }

  function cancelEditCandidate() {
    setEditingCandidateId(null);
    setEditForm({
      name: "",
      email: "",
      targetRole: "",
      experienceYears: "",
      residence: "",
      skills: "",
      notes: "",
      resumeSummary: ""
    });
  }

  function saveEditCandidate(candidateId) {
    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id !== candidateId) return candidate;

        return {
          ...candidate,
          name: editForm.name || "이름 미입력",
          email: editForm.email || "",
          targetRole: editForm.targetRole || "Open Position",
          experienceYears: Number(editForm.experienceYears) || 0,
          residence: editForm.residence || "미입력",
          skills: editForm.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          notes: editForm.notes || "관리자 수정 후보자 프로필",
          resumeSummary: editForm.resumeSummary
        };
      })
    );

    cancelEditCandidate();
  }

  function deleteCandidate(candidateId) {
    const target = candidates.find((candidate) => candidate.id === candidateId);
    const ok = window.confirm(`${target?.name || "선택한 후보자"} 데이터를 삭제할까요?`);

    if (!ok) return;

    setCandidates((prev) => prev.filter((candidate) => candidate.id !== candidateId));

    if (editingCandidateId === candidateId) {
      cancelEditCandidate();
    }
  }

  return (
    <div className={mode === "seeker" ? "app-shell seeker-mode" : "app-shell"}>
      <div className="top-bar">
        <div className="top-bar-left">Global Talent Landing Platform</div>
        <div className="top-bar-actions">
          <button
            className={`top-mode-btn ${mode === "admin" ? "active" : ""}`}
            onClick={() => setMode("admin")}
          >
            관리자용
          </button>
          <button
            className={`top-mode-btn ${mode === "seeker" ? "active seeker" : ""}`}
            onClick={() => setMode("seeker")}
          >
            구직자용
          </button>
          <button className="login-btn">Google 로그인</button>
          <button className="login-btn">이메일 로그인</button>
        </div>
      </div>

      <div className="page-container">
        <header className="hero-card">
          <h1 className="hero-title">글로벌 인재 발굴·정착 지원 플랫폼</h1>
          <p className="hero-desc">
            기업 수요 기반 인재 발굴, 정착Fit 분석, 프로필Fit 분석, 공고 탐색을 하나로 연결하는 AI 기반 헤드헌팅 플랫폼 데모입니다.
          </p>

          {mode === "admin" ? (
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{jobs.length}</div>
                <div className="stat-label">공고 수</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{candidates.length}</div>
                <div className="stat-label">인재 DB</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{lastRefresh}</div>
                <div className="stat-label">공고 갱신 기준</div>
              </div>
            </div>
          ) : (
            <div className="seeker-landing">
              <div className="fit-hero-card">
                <div className="fit-hero-content">
                  <h2>정착Fit 분석</h2>
                  <p>나에게 맞는 미국 근무지와 생활환경을 찾아보세요.</p>
                  <span>
                    미국은 지역마다 생활비, 학군, 안전도, 커뮤니티가 다릅니다. 간단한 테스트로 내게 맞는 근무지/생활환경을 확인해보세요.
                  </span>
                </div>
                <div className="fit-hero-action">
                  <button className="cta-btn fit-main-btn" onClick={() => goToSeekerTab("fit")}>
                    정착Fit 분석 시작하기
                  </button>
                </div>
              </div>

              <div className="seeker-info-grid">
                <div className="job-shortcut-card">
                  <h3>미국 진출 한국기업 공고</h3>
                  <button className="outline-btn job-view-btn" onClick={() => goToSeekerTab("explore")}>
                    공고 보기
                  </button>
                </div>

                <div className="seeker-welcome-box">
                  <p className="welcome-greeting">안녕하세요. 헤드헌터 성민경입니다.</p>
                  <p>
                    나에게 맞는 미국 근무지와 생활환경을 찾으려면{" "}
                    <button className="inline-link-pill" onClick={() => goToSeekerTab("fit")}>
                      정착Fit 분석
                    </button>
                    를,
                  </p>
                      <p>
                    보유한 이력서를 기반으로 맞춤 공고를 추천 받고 싶으면{" "}
                    <button className="inline-link-pill" onClick={() => goToSeekerTab("profile")}>
                      프로필Fit 분석
                    </button>
                    을,
                  </p>
                  <p>
                    관심 키워드와 지역 기준으로 미국에 진출한 한국기업 공고를 찾으려면{" "}
                    <button className="inline-link-pill" onClick={() => goToSeekerTab("explore")}>
                      공고 탐색
                    </button>
                    을 눌러보세요.
                  </p>
              
                  <p className="welcome-closing">안정적인 미국 정착과 성공적인 구직을 응원합니다!</p>
                </div>
              </div>
            </div>
          )}
        </header>

        {mode === "admin" ? (
          <>
            <nav className="tab-nav">
              <button
                className={`tab-btn ${adminTab === "matching" ? "active" : ""}`}
                onClick={() => setAdminTab("matching")}
              >
                매칭 대시보드
              </button>
              <button
                className={`tab-btn ${adminTab === "talent" ? "active" : ""}`}
                onClick={() => setAdminTab("talent")}
              >
                인재 DB
              </button>
              <button
                className={`tab-btn ${adminTab === "jobs" ? "active" : ""}`}
                onClick={() => setAdminTab("jobs")}
              >
                공고 관리
              </button>
            </nav>

            {adminTab === "matching" && (
              <section className="section-card">
                <div className="section-head">
                  <h2>매칭 대시보드</h2>
                  <p>공고를 선택하면 직무 적합도와 정착 적합도를 기준으로 추천 인재를 확인할 수 있습니다.</p>
                </div>

                <div className="card-grid jobs-grid">
                  {jobs.map((job) => (
                    <button
                      key={job.id}
                      className={`job-card selectable ${selectedJobId === job.id ? "selected" : ""}`}
                      onClick={() => setSelectedJobId(job.id)}
                    >
                      <div className="card-top-row">
                        <Tag>{job.state}</Tag>
                        <Tag tone="visa">{job.greenCardSupport}</Tag>
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
                      <Tag tone="visa">{selectedJob.greenCardSupport}</Tag>
                    </div>
                  </div>
                </div>

                <div className="section-head section-head-inline">
                  <div>
                    <h2>추천 인재</h2>
                    <p>종합, 직무, 정착 기준으로 정렬해 후보자를 검토할 수 있습니다.</p>
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
                      className={`sort-btn ${sortMode === "settlement" ? "active" : ""}`}
                      onClick={() => setSortMode("settlement")}
                    >
                      정착 적합도순
                    </button>
                  </div>
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
                      <div className="card-meta">{candidate.email}</div>

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

                      <p className="card-summary">{candidate.resumeSummary || candidate.notes}</p>

                      <div className="reason-box">
                        <div className="reason-title">추천 사유</div>
                        <ul>
                          {getMatchReason(candidate, selectedJob, match).map((reason) => (
                            <li key={reason}>{reason}</li>
                          ))}
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

            {adminTab === "talent" && (
              <section className="section-card">
                <div className="section-head section-head-inline">
                  <div>
                    <h2>인재 DB</h2>
                    <p>같은 이메일의 지원자는 프로필Fit 분석, 정착Fit 분석 결과가 하나의 DB에 누적 업데이트됩니다.</p>
                  </div>
                  <button className="primary-btn" onClick={exportCandidates}>
                    CSV 다운로드
                  </button>
                </div>

                <div className="card-grid candidate-grid">
                  {candidates.map((candidate) => {
                    const isEditing = editingCandidateId === candidate.id;

                    return (
                      <div key={candidate.id} className="candidate-card">
                        <div className="card-top-row">
                          <Tag>{candidate.candidateType}</Tag>
                          <span className="candidate-id">{candidate.id}</span>
                        </div>

                        {!isEditing ? (
                          <>
                            <h3>{candidate.name}</h3>
                            <div className="card-subtitle">
                              {candidate.targetRole} · 경력 {candidate.experienceYears}년
                            </div>
                            <div className="card-meta">{candidate.email}</div>

                            <div className="info-grid">
                              <div className="info-item">
                                <div className="info-label">정착 유형</div>
                                <div className="info-value">{candidate.fitType || "분석 전"}</div>
                              </div>
                              <div className="info-item">
                                <div className="info-label">거주지</div>
                                <div className="info-value">{candidate.residence}</div>
                              </div>
                              <div className="info-item">
                                <div className="info-label">교육 중요도</div>
                                <div className="info-value">{candidate.educationImportance}/7</div>
                              </div>
                              <div className="info-item">
                                <div className="info-label">한국 방문</div>
                                <div className="info-value">{candidate.koreaVisit}</div>
                              </div>
                            </div>

                            <div className="tag-row">
                              {candidate.skills.map((skill) => (
                                <Tag key={skill}>{skill}</Tag>
                              ))}
                            </div>

                            <p className="card-summary">{candidate.resumeSummary || candidate.notes}</p>

                            <div className="db-action-row">
                              <button className="db-edit-btn" onClick={() => startEditCandidate(candidate)}>
                                수정
                              </button>
                              <button className="db-delete-btn" onClick={() => deleteCandidate(candidate.id)}>
                                삭제
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="edit-panel">
                            <label>
                              이름
                              <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                            </label>
                            <label>
                              이메일
                              <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                            </label>
                            <label>
                              희망 직무
                              <input value={editForm.targetRole} onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value })} />
                            </label>
                            <label>
                              경력 연차
                              <input type="number" value={editForm.experienceYears} onChange={(e) => setEditForm({ ...editForm, experienceYears: e.target.value })} />
                            </label>
                            <label>
                              거주지
                              <input value={editForm.residence} onChange={(e) => setEditForm({ ...editForm, residence: e.target.value })} />
                            </label>
                            <label>
                              핵심 역량
                              <input value={editForm.skills} onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })} />
                            </label>
                            <label>
                              경력 요약
                              <textarea value={editForm.resumeSummary} onChange={(e) => setEditForm({ ...editForm, resumeSummary: e.target.value })} />
                            </label>
                            <label>
                              메모
                              <textarea value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
                            </label>
                            <div className="db-action-row">
                              <button className="db-save-btn" onClick={() => saveEditCandidate(candidate.id)}>
                                저장
                              </button>
                              <button className="db-cancel-btn" onClick={cancelEditCandidate}>
                                취소
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {adminTab === "jobs" && (
              <section className="section-card">
                <div className="section-head section-head-inline">
                  <div>
                    <h2>공고 관리</h2>
                    <p>매일 9시 자동 갱신을 가정한 공고 관리 화면입니다. 실제 서비스에서는 API, 크롤링, Firebase 연동으로 확장할 수 있습니다.</p>
                  </div>
                  <div className="button-row">
                    <button className="secondary-btn" onClick={refreshJobs}>
                      공고 갱신 시뮬레이션
                    </button>
                    <button className="primary-btn" onClick={exportJobs}>
                      CSV 다운로드
                    </button>
                  </div>
                </div>

                <div className="admin-summary">
                  <div>
                    <strong>{jobs.length}</strong>
                    <span>등록 공고</span>
                  </div>
                  <div>
                    <strong>{lastRefresh}</strong>
                    <span>마지막 갱신</span>
                  </div>
                  <div>
                    <strong>09:00</strong>
                    <span>예정 갱신 시간</span>
                  </div>
                </div>

                <div className="card-grid jobs-grid">
                  {jobs.map((job) => (
                    <div key={job.id} className="job-card">
                      <div className="card-top-row">
                        <Tag>{job.state}</Tag>
                        <Tag tone="visa">{job.greenCardSupport}</Tag>
                      </div>
                      <h3>{job.title}</h3>
                      <div className="card-subtitle">{job.company}</div>
                      <div className="card-meta">{job.location} · {job.source}</div>
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
          </>
        ) : (
          <>
            <div ref={seekerContentRef} className="seeker-content-anchor" />

            {seekerTab === "fit" && (
              <section className="section-card seeker-card">
                <div className="seeker-page-title">
                  <div>
                    <h2>정착Fit 분석</h2>
                    <p>나에게 맞는 미국 근무지와 생활환경을 찾아보세요.</p>
                  </div>
                </div>

                <div className="two-column-layout">
                  <div className="form-panel">
                    <label>
                      이름
                      <input value={fitForm.name} onChange={(e) => setFitForm({ ...fitForm, name: e.target.value })} />
                    </label>
                    <label>
                      이메일
                      <input value={fitForm.email} onChange={(e) => setFitForm({ ...fitForm, email: e.target.value })} />
                    </label>
                    <label>
                      희망 직무
                      <input value={fitForm.targetRole} onChange={(e) => setFitForm({ ...fitForm, targetRole: e.target.value })} />
                    </label>
                    <label>
                      핵심 역량 키워드
                      <input value={fitForm.skills} onChange={(e) => setFitForm({ ...fitForm, skills: e.target.value })} />
                    </label>
                    <label>
                      선호 생활권
                      <select value={fitForm.urbanPreference} onChange={(e) => setFitForm({ ...fitForm, urbanPreference: e.target.value })}>
                        <option value="city">대도시형</option>
                        <option value="suburb">교외 안정형</option>
                        <option value="town">소도시/현장 적응형</option>
                      </select>
                    </label>
                    <label>
                      자녀 동반 여부
                      <select value={fitForm.hasChild} onChange={(e) => setFitForm({ ...fitForm, hasChild: e.target.value })}>
                        <option value="true">자녀 있음</option>
                        <option value="false">자녀 없음</option>
                      </select>
                    </label>
                    <label>
                      교육환경 중요도
                      <input type="range" min="1" max="7" value={fitForm.educationImportance} onChange={(e) => setFitForm({ ...fitForm, educationImportance: e.target.value })} />
                      <span>{fitForm.educationImportance}/7</span>
                    </label>
                    <label>
                      안전도 민감도
                      <select value={fitForm.safetyTolerance} onChange={(e) => setFitForm({ ...fitForm, safetyTolerance: e.target.value })}>
                        <option value="very_safe">매우 안전한 지역 선호</option>
                        <option value="safe">안전한 지역 선호</option>
                        <option value="average_ok">평균 수준이면 가능</option>
                        <option value="risk_ok">기회가 좋으면 감수 가능</option>
                      </select>
                    </label>
                    <label>
                      주거비 선호
                      <select value={fitForm.housingCost} onChange={(e) => setFitForm({ ...fitForm, housingCost: e.target.value })}>
                        <option value="avg_minus_30">평균보다 30% 낮은 곳 선호</option>
                        <option value="avg_minus_15">평균보다 15% 낮은 곳 선호</option>
                        <option value="average">평균 수준 가능</option>
                        <option value="avg_plus_15">평균보다 15% 높아도 가능</option>
                      </select>
                    </label>
                    <button className="cta-btn" onClick={runFitTest}>
                      정착Fit 결과 보기
                    </button>
                  </div>

                  <div className="result-panel">
                    {!fitResult ? (
                      <div className="empty-result">
                        <h3>결과 미리보기</h3>
                        <p>응답을 입력하면 정착 유형, 추천 공고, 정착 리스크가 자동으로 생성됩니다.</p>
                      </div>
                    ) : (
                      <div>
                        <div className="fit-type-card">
                          <div className="fit-label">정착 유형</div>
                          <h3>{fitResult.fitType}</h3>
                          <p>입력한 생활환경 선호와 가족 조건을 기준으로 산출한 예비 정착 성향입니다.</p>
                        </div>

                        <h3 className="sub-title">추천 공고 TOP 3</h3>
                        <div className="mini-list">
                          {fitResult.rankedJobs.map(({ job, match }, index) => (
                            <div key={job.id} className="mini-card">
                              <div className="mini-rank">{index + 1}</div>
                              <div>
                                <strong>{job.title}</strong>
                                <p>{job.company} · {job.location}</p>
                                <span>종합 {match.total}% · 정착 {match.settlementScore}%</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button className="secondary-btn wide" onClick={saveFitCandidate}>
                          인재 DB에 저장/업데이트
                        </button>
                        {fitResult.saved && <p className="save-message">인재 DB에 저장 또는 업데이트되었습니다.</p>}
                      </div>
                    )}
                  </div>
                </div>

                <ProfilePrompt goToSeekerTab={goToSeekerTab} />
              </section>
            )}

            {seekerTab === "explore" && (
              <section className="section-card seeker-card">
                <div className="seeker-page-title">
                  <div>
                    <h2>공고 탐색</h2>
                    <p>관심 키워드, 지역, 직무, 영주권 지원 여부를 기준으로 미국 진출 한국기업의 공고를 찾아보세요.</p>
                  </div>
                </div>

                <div className="filter-wrap seeker-filter">
                  <input
                    className="search-input"
                    placeholder="회사명, 직무명, 키워드 검색"
                    value={jobQuery}
                    onChange={(e) => setJobQuery(e.target.value)}
                  />
                  <select className="state-select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                    <option value="ALL">지역 전체</option>
                    {[...new Set(jobs.map((job) => job.state))].map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <select className="state-select role-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="ALL">직무 전체</option>
                    {[...new Set(jobs.map((job) => job.category))].map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select className="state-select visa-select" value={greenCardFilter} onChange={(e) => setGreenCardFilter(e.target.value)}>
                    <option value="ALL">영주권 지원 전체</option>
                    <option value="영주권 지원 가능">영주권 지원 가능</option>
                    <option value="비자/영주권 협의">비자/영주권 협의</option>
                    <option value="지원 여부 미확인">지원 여부 미확인</option>
                  </select>
                </div>

                <div className="card-grid jobs-grid">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="job-card seeker-job-card">
                      <div className="card-top-row">
                        <Tag>{job.state}</Tag>
                        <Tag tone="visa">{job.greenCardSupport}</Tag>
                      </div>
                      <h3>{job.title}</h3>
                      <div className="card-subtitle">{job.company}</div>
                      <div className="card-meta">{job.location}</div>
                      <p className="card-summary">{job.summary}</p>
                      <div className="tag-row">
                        {job.keywords.slice(0, 6).map((keyword) => (
                          <Tag key={keyword}>{keyword}</Tag>
                        ))}
                      </div>

                      <div className="job-fit-actions">
                        <span className="fit-arrow">➜</span>
                        <button className="fit-pill" onClick={() => goToSeekerTab("fit")}>
                          정착Fit
                        </button>
                        <button className="fit-pill" onClick={() => goToSeekerTab("profile")}>
                          프로필Fit
                        </button>
                        <span className="fit-confirm-text">확인</span>
                      </div>
                    </div>
                  ))}
                </div>

                <ProfilePrompt goToSeekerTab={goToSeekerTab} />
              </section>
            )}

            {seekerTab === "profile" && (
              <section className="section-card seeker-card profile-section">
                <div className="seeker-page-title">
                  <div>
                    <h2>프로필Fit 분석</h2>
                    <p>더 정확한 맞춤 공고 추천을 받고 싶다면 이력서를 업로드해보세요.</p>
                  </div>
                </div>

                <div className="two-column-layout">
                  <div className="form-panel">
                    <label>
                      이름
                      <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} placeholder="예: 홍길동" />
                    </label>
                    <label>
                      이메일
                      <input value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} placeholder="예: name@email.com" />
                    </label>
                    <label>
                      희망직무(선택)
                      <input value={profileForm.targetRole} onChange={(e) => setProfileForm({ ...profileForm, targetRole: e.target.value })} placeholder="비워두면 AI가 추정합니다" />
                    </label>
                    <label>
                      경력 연차
                      <input type="number" value={profileForm.years} onChange={(e) => setProfileForm({ ...profileForm, years: e.target.value })} />
                    </label>
                    <label>
                      CV/Resume 파일
                      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setProfileForm({ ...profileForm, fileName: e.target.files?.[0]?.name || "" })} />
                      <span className="file-help">권장: PDF/DOC/DOCX, 10페이지 이내, 최대 5MB</span>
                    </label>
                    <label>
                      이력서 텍스트 붙여넣기
                      <textarea
                        value={profileForm.resumeText}
                        onChange={(e) => setProfileForm({ ...profileForm, resumeText: e.target.value })}
                        placeholder="MVP에서는 파일 내용을 직접 읽지 않고, 이력서 주요 내용을 붙여넣으면 AI 분석 mock으로 키워드를 추출합니다."
                      />
                    </label>
                    <button className="cta-btn" onClick={analyzeProfile}>
                      AI 프로필 분석하기
                    </button>
                  </div>

                  <div className="result-panel">
                    {!profileResult ? (
                      <div className="empty-result">
                        <h3>프로필 분석 결과</h3>
                        <p>업로드된 이력서와 입력 정보를 기반으로 경력 요약, 핵심 키워드, 맞춤 공고를 추천합니다.</p>
                      </div>
                    ) : (
                      <div>
                        <div className="fit-type-card">
                          <div className="fit-label">생성된 후보자 프로필</div>
                          <h3>{profileResult.candidate.name}</h3>
                          <p>{profileResult.candidate.resumeSummary}</p>
                        </div>

                        <h3 className="sub-title">추출 키워드</h3>
                        <div className="tag-row profile-keywords">
                          {profileResult.candidate.skills.map((skill) => (
                            <Tag key={skill}>{skill}</Tag>
                          ))}
                        </div>

                        <h3 className="sub-title">맞춤 공고 TOP 3</h3>
                        <div className="mini-list">
                          {profileResult.rankedJobs.map(({ job, match }, index) => (
                            <div key={job.id} className="mini-card">
                              <div className="mini-rank">{index + 1}</div>
                              <div>
                                <strong>{job.title}</strong>
                                <p>{job.company} · {job.location}</p>
                                <span>종합 {match.total}% · 직무 {match.skillScore}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="save-message">인재 DB에 저장 또는 업데이트되었습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <footer className="footer-note">
          본 화면은 제안서 제출용 MVP 예시입니다. 실제 서비스에서는 Firebase 기반 파일 저장, Firestore DB, Gemini API 기반 이력서 분석, 공고 자동 수집 기능으로 고도화할 수 있습니다.
        </footer>
      </div>
    </div>
  );
}

function ProfilePrompt({ goToSeekerTab }) {
  return (
    <div className="profile-prompt-box">
      <span>더 정확한 맞춤 공고 추천을 받고 싶다면 이력서를 업로드해보세요.</span>
      <button className="profile-prompt-link" onClick={() => goToSeekerTab("profile")}>
        프로필Fit 분석
      </button>
    </div>
  );
}
