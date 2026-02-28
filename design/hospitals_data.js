/**
 * 국가보훈 장해진단서 발급기관 전국 140곳 데이터
 * 2026년 1월 시행 기준
 *
 * type: "상급종합병원" | "보훈병원" | "위탁병원" | "공공의료기관"
 * region: 서울, 경기, 인천, 강원, 충북, 충남, 대전, 전북, 전남, 광주, 경북, 경남, 대구, 부산, 울산, 제주
 */

const HOSPITALS_DATA = [
  // ============================================================
  // 서울 (16곳: 상급종합 14 + 보훈 1 + 위탁 1 + 공공 1 = 17... 재확인 → 상급14+보훈1+위탁1+공공1=17 → 데이터 기준 그대로)
  // ============================================================

  // --- 서울 상급종합병원 (14곳) ---
  {
    name: "강남세브란스병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.4969,
    lng: 127.0482,
    address: "서울특별시 강남구 언주로 211",
    website: "https://gs.iseverance.com",
    phone: "02-2019-3114"
  },
  {
    name: "삼성서울병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.4881,
    lng: 127.0855,
    address: "서울특별시 강남구 일원로 81",
    website: "https://www.samsunghospital.com",
    phone: "02-3410-2114"
  },
  {
    name: "건국대학교병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5408,
    lng: 127.0713,
    address: "서울특별시 광진구 능동로 120-1",
    website: "https://www.kuh.ac.kr",
    phone: "02-2030-5114"
  },
  {
    name: "고려대학교 부속구로병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.4895,
    lng: 126.8867,
    address: "서울특별시 구로구 구로동로 148",
    website: "https://guro.kumc.or.kr",
    phone: "02-2626-1114"
  },
  {
    name: "경희대학교병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5943,
    lng: 127.0522,
    address: "서울특별시 동대문구 경희대로 23",
    website: "https://www.khmc.or.kr",
    phone: "02-958-8114"
  },
  {
    name: "중앙대학교병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5016,
    lng: 126.9978,
    address: "서울특별시 동작구 흑석로 102",
    website: "https://ch.caumc.or.kr",
    phone: "02-6299-1114"
  },
  {
    name: "세브란스병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5622,
    lng: 126.9410,
    address: "서울특별시 서대문구 연세로 50-1",
    website: "https://www.severance.healthcare",
    phone: "02-2228-0114"
  },
  {
    name: "서울성모병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5018,
    lng: 127.0048,
    address: "서울특별시 서초구 반포대로 222",
    website: "https://www.cmcseoul.or.kr",
    phone: "02-2258-5114"
  },
  {
    name: "한양대학교병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5579,
    lng: 127.0445,
    address: "서울특별시 성동구 왕십리로 222-1",
    website: "https://seoul.hyumc.com",
    phone: "02-2290-8114"
  },
  {
    name: "안암병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5867,
    lng: 127.0265,
    address: "서울특별시 성북구 고려대로 73",
    website: "https://anam.kumc.or.kr",
    phone: "02-920-5114"
  },
  {
    name: "서울아산병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5268,
    lng: 127.1083,
    address: "서울특별시 송파구 올림픽로43길 88",
    website: "https://www.amc.seoul.kr",
    phone: "02-3010-3114"
  },
  {
    name: "이대목동병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5347,
    lng: 126.8862,
    address: "서울특별시 양천구 안양천로 1071",
    website: "https://mokdong.eumc.ac.kr",
    phone: "02-2650-5114"
  },
  {
    name: "서울대학교병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5796,
    lng: 126.9990,
    address: "서울특별시 종로구 대학로 101",
    website: "https://www.snuh.org",
    phone: "02-2072-2114"
  },
  {
    name: "강북삼성병원",
    type: "상급종합병원",
    region: "서울",
    lat: 37.5681,
    lng: 126.9688,
    address: "서울특별시 종로구 새문안로 29",
    website: "https://www.kbsmc.co.kr",
    phone: "02-2001-2001"
  },

  // --- 서울 보훈병원 (1곳) ---
  {
    name: "중앙보훈병원",
    type: "보훈병원",
    region: "서울",
    lat: 37.5214,
    lng: 127.1073,
    address: "서울특별시 강동구 진황도로 61길 53",
    website: "https://seoul.bohun.or.kr",
    phone: "02-2225-1114"
  },

  // --- 서울 위탁병원 (1곳) ---
  {
    name: "서울적십자병원",
    type: "위탁병원",
    region: "서울",
    lat: 37.5756,
    lng: 126.9677,
    address: "서울특별시 종로구 새문안로 9",
    website: "https://www.redcrosshospital.com",
    phone: "02-2002-8000"
  },

  // --- 서울 공공의료기관 (1곳) ---
  {
    name: "경찰병원",
    type: "공공의료기관",
    region: "서울",
    lat: 37.5000,
    lng: 127.0845,
    address: "서울특별시 송파구 가락로 123",
    website: "https://www.nph.go.kr",
    phone: "02-3400-1114"
  },

  // ============================================================
  // 경기·인천 (36곳: 상급종합 9 + 위탁 26 + 공공 1)
  // ============================================================

  // --- 경기·인천 상급종합병원 (9곳) ---
  {
    name: "순천향대 부천병원",
    type: "상급종합병원",
    region: "경기",
    lat: 37.4877,
    lng: 126.7750,
    address: "경기도 부천시 조마루로 170",
    website: "https://www.schmc.ac.kr/bucheon",
    phone: "032-621-5114"
  },
  {
    name: "분당서울대병원",
    type: "상급종합병원",
    region: "경기",
    lat: 37.3520,
    lng: 127.1236,
    address: "경기도 성남시 분당구 구미로173번길 82",
    website: "https://www.snubh.org",
    phone: "031-787-7114"
  },
  {
    name: "아주대학교병원",
    type: "상급종합병원",
    region: "경기",
    lat: 37.2797,
    lng: 127.0465,
    address: "경기도 수원시 영통구 월드컵로 164",
    website: "https://hosp.ajoumc.or.kr",
    phone: "031-219-5114"
  },
  {
    name: "성빈센트병원",
    type: "상급종합병원",
    region: "경기",
    lat: 37.2682,
    lng: 127.0013,
    address: "경기도 수원시 팔달구 중부대로 93",
    website: "https://www.cmcvincent.or.kr",
    phone: "031-249-7114"
  },
  {
    name: "고려대 안산병원",
    type: "상급종합병원",
    region: "경기",
    lat: 37.3195,
    lng: 126.8544,
    address: "경기도 안산시 단원구 적금로 123",
    website: "https://ansan.kumc.or.kr",
    phone: "031-412-5114"
  },
  {
    name: "한림대성심병원",
    type: "상급종합병원",
    region: "경기",
    lat: 37.3911,
    lng: 126.9585,
    address: "경기도 안양시 동안구 관평로170번길 22",
    website: "https://hallym.or.kr/sacred",
    phone: "031-380-3114"
  },
  {
    name: "길병원",
    type: "상급종합병원",
    region: "인천",
    lat: 37.4503,
    lng: 126.7037,
    address: "인천광역시 남동구 남동대로 774번길 21",
    website: "https://www.gilhospital.com",
    phone: "032-460-3114"
  },
  {
    name: "인천성모병원",
    type: "상급종합병원",
    region: "인천",
    lat: 37.4478,
    lng: 126.6997,
    address: "인천광역시 부평구 동수로 56",
    website: "https://www.cmcincheon.or.kr",
    phone: "032-280-5114"
  },
  {
    name: "인하대병원",
    type: "상급종합병원",
    region: "인천",
    lat: 37.4497,
    lng: 126.6833,
    address: "인천광역시 중구 인항로 27",
    website: "https://www.inha.com",
    phone: "032-890-2114"
  },

  // --- 경기·인천 위탁병원 (26곳) ---
  {
    name: "일산백병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.6522,
    lng: 126.7735,
    address: "경기도 고양시 일산서구 주화로 170",
    website: "https://ilsan.paik.ac.kr",
    phone: "031-910-7114"
  },
  {
    name: "광명성애병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.4756,
    lng: 126.8660,
    address: "경기도 광명시 디지털로 36",
    website: "https://www.gmsah.co.kr",
    phone: "02-2680-7114"
  },
  {
    name: "산본병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.3600,
    lng: 126.9299,
    address: "경기도 군포시 번영로 515번길 12",
    website: "https://www.sanbonhospital.co.kr",
    phone: "031-393-3311"
  },
  {
    name: "김포우리병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.6185,
    lng: 126.7157,
    address: "경기도 김포시 김포대로 848",
    website: "https://www.gimpo-woori.co.kr",
    phone: "031-999-1000"
  },
  {
    name: "뉴대성병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.4028,
    lng: 126.9504,
    address: "경기도 안양시 만안구 안양로 261",
    website: "https://www.newdaesung.co.kr",
    phone: "031-470-9114"
  },
  {
    name: "성남중앙병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.4388,
    lng: 127.1377,
    address: "경기도 성남시 수정구 산성대로 171",
    website: "https://www.snjh.co.kr",
    phone: "031-727-0114"
  },
  {
    name: "경기도의료원 수원병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.2806,
    lng: 127.0079,
    address: "경기도 수원시 장안구 수성로 245",
    website: "https://www.gmcsuwon.or.kr",
    phone: "031-250-8800"
  },
  {
    name: "동수원병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.2690,
    lng: 127.0380,
    address: "경기도 수원시 팔달구 중부대로 165",
    website: "https://www.dswhospital.co.kr",
    phone: "031-210-0114"
  },
  {
    name: "센트럴병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.3191,
    lng: 126.8378,
    address: "경기도 안산시 단원구 광덕대로 123",
    website: "https://www.centralhospital.co.kr",
    phone: "031-413-8114"
  },
  {
    name: "한도병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.3233,
    lng: 126.8328,
    address: "경기도 안산시 단원구 고잔로 63",
    website: "https://www.handoh.com",
    phone: "031-8040-1114"
  },
  {
    name: "경기도의료원 안성병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.0053,
    lng: 127.2751,
    address: "경기도 안성시 혜산로 15",
    website: "https://www.gmcanseong.or.kr",
    phone: "031-8046-5000"
  },
  {
    name: "안양샘병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.3871,
    lng: 126.9531,
    address: "경기도 안양시 동안구 경수대로 616",
    website: "https://www.saemhospital.com",
    phone: "031-467-9114"
  },
  {
    name: "조은오산병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.1499,
    lng: 127.0693,
    address: "경기도 오산시 경기대로 135",
    website: "https://www.joeunoshan.co.kr",
    phone: "031-378-8700"
  },
  {
    name: "용인강남병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.2347,
    lng: 127.2051,
    address: "경기도 용인시 처인구 금령로 59",
    website: "https://www.yikangnam.co.kr",
    phone: "031-330-6000"
  },
  {
    name: "다보스병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.2412,
    lng: 127.1890,
    address: "경기도 용인시 처인구 중부대로 1422",
    website: "https://www.davos.co.kr",
    phone: "031-8021-0114"
  },
  {
    name: "경기도의료원 의정부병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.7382,
    lng: 127.0468,
    address: "경기도 의정부시 흥선로 142",
    website: "https://www.gmcuijeongbu.or.kr",
    phone: "031-828-5000"
  },
  {
    name: "경기도의료원 이천병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.2746,
    lng: 127.4378,
    address: "경기도 이천시 이섭대천로 1478",
    website: "https://www.gmcicheon.or.kr",
    phone: "031-630-4114"
  },
  {
    name: "경기도의료원 파주병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.7644,
    lng: 126.7801,
    address: "경기도 파주시 중앙로 154",
    website: "https://www.gmcpaju.or.kr",
    phone: "031-940-9114"
  },
  {
    name: "평택성모병원",
    type: "위탁병원",
    region: "경기",
    lat: 36.9917,
    lng: 127.0858,
    address: "경기도 평택시 중앙로 263",
    website: "https://www.ptcmc.co.kr",
    phone: "031-659-0114"
  },
  {
    name: "경기도의료원 포천병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.8947,
    lng: 127.2002,
    address: "경기도 포천시 중앙로 63",
    website: "https://www.gmcpocheon.or.kr",
    phone: "031-538-7000"
  },
  {
    name: "화성중앙병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.1992,
    lng: 126.8314,
    address: "경기도 화성시 봉담읍 동화길 51",
    website: "https://www.hscentralhospital.co.kr",
    phone: "031-8059-2000"
  },
  {
    name: "비에스종합병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.2625,
    lng: 127.0348,
    address: "경기도 수원시 권선구 권선로 371",
    website: "https://www.bshospital.co.kr",
    phone: "031-299-0114"
  },
  {
    name: "한림병원",
    type: "위탁병원",
    region: "경기",
    lat: 37.7392,
    lng: 127.0560,
    address: "경기도 의정부시 가능로 135",
    website: "https://www.hallimhospital.com",
    phone: "031-850-9114"
  },
  {
    name: "인천광역시의료원",
    type: "위탁병원",
    region: "인천",
    lat: 37.4523,
    lng: 126.7267,
    address: "인천광역시 동구 방축로 217",
    website: "https://www.icmc.or.kr",
    phone: "032-580-6000"
  },
  {
    name: "현대유비스병원",
    type: "위탁병원",
    region: "인천",
    lat: 37.4358,
    lng: 126.6875,
    address: "인천광역시 중구 연안부두로 15",
    website: "https://www.ubis.co.kr",
    phone: "032-520-0114"
  },
  {
    name: "부평세림병원",
    type: "위탁병원",
    region: "인천",
    lat: 37.5060,
    lng: 126.7216,
    address: "인천광역시 부평구 부평대로 39",
    website: "https://www.saerim.co.kr",
    phone: "032-510-0114"
  },

  // --- 경기·인천 공공의료기관 (1곳) ---
  {
    name: "국군수도병원",
    type: "공공의료기관",
    region: "경기",
    lat: 37.3860,
    lng: 127.0800,
    address: "경기도 성남시 분당구 야탑로 81",
    website: "https://www.afch.mil.kr",
    phone: "031-725-6114"
  },

  // ============================================================
  // 강원 (10곳: 상급종합 2 + 위탁 8)
  // ============================================================

  // --- 강원 상급종합병원 (2곳) ---
  {
    name: "강릉아산병원",
    type: "상급종합병원",
    region: "강원",
    lat: 37.7717,
    lng: 128.8742,
    address: "강원특별자치도 강릉시 사천면 방동길 38",
    website: "https://gnah.amc.seoul.kr",
    phone: "033-610-3114"
  },
  {
    name: "원주세브란스기독병원",
    type: "상급종합병원",
    region: "강원",
    lat: 37.3486,
    lng: 127.9435,
    address: "강원특별자치도 원주시 일산로 20",
    website: "https://www.wonjuseverance.org",
    phone: "033-741-0114"
  },

  // --- 강원 위탁병원 (8곳) ---
  {
    name: "강릉동인병원",
    type: "위탁병원",
    region: "강원",
    lat: 37.7534,
    lng: 128.8960,
    address: "강원특별자치도 강릉시 경강로 2007",
    website: "https://www.gndih.co.kr",
    phone: "033-650-6114"
  },
  {
    name: "동해동인병원",
    type: "위탁병원",
    region: "강원",
    lat: 37.5255,
    lng: 129.1145,
    address: "강원특별자치도 동해시 한섬로 88",
    website: "https://www.dhdih.co.kr",
    phone: "033-530-0114"
  },
  {
    name: "삼척의료원",
    type: "위탁병원",
    region: "강원",
    lat: 37.4497,
    lng: 129.1651,
    address: "강원특별자치도 삼척시 중앙로 19",
    website: "https://www.samcheok.go.kr",
    phone: "033-570-7114"
  },
  {
    name: "속초의료원",
    type: "위탁병원",
    region: "강원",
    lat: 38.1905,
    lng: 128.5917,
    address: "강원특별자치도 속초시 영랑호반길 3",
    website: "https://www.sokchomed.or.kr",
    phone: "033-630-6114"
  },
  {
    name: "영월의료원",
    type: "위탁병원",
    region: "강원",
    lat: 37.1828,
    lng: 128.4616,
    address: "강원특별자치도 영월군 영월읍 영월로 20",
    website: "https://www.ywmc.or.kr",
    phone: "033-370-2114"
  },
  {
    name: "강원대학교병원",
    type: "위탁병원",
    region: "강원",
    lat: 37.8660,
    lng: 127.7203,
    address: "강원특별자치도 춘천시 백령로 156",
    website: "https://www.knuh.or.kr",
    phone: "033-258-2000"
  },
  {
    name: "태백병원",
    type: "위탁병원",
    region: "강원",
    lat: 37.1625,
    lng: 128.9863,
    address: "강원특별자치도 태백시 중앙로 205",
    website: "https://www.taebaekhospital.co.kr",
    phone: "033-550-9114"
  },
  {
    name: "홍천아산병원",
    type: "위탁병원",
    region: "강원",
    lat: 37.6951,
    lng: 127.8868,
    address: "강원특별자치도 홍천군 홍천읍 석화로 55",
    website: "https://hcah.amc.seoul.kr",
    phone: "033-430-0114"
  },

  // ============================================================
  // 충청 (17곳: 상급종합 4 + 보훈 1 + 위탁 12)
  // ============================================================

  // --- 충청 상급종합병원 (4곳) ---
  {
    name: "충북대학교병원",
    type: "상급종합병원",
    region: "충북",
    lat: 36.6296,
    lng: 127.4582,
    address: "충청북도 청주시 서원구 1순환로 776",
    website: "https://www.cbnuh.or.kr",
    phone: "043-269-6114"
  },
  {
    name: "건양대학교병원",
    type: "상급종합병원",
    region: "대전",
    lat: 36.3280,
    lng: 127.4132,
    address: "대전광역시 서구 관저동로 158",
    website: "https://www.kyuh.ac.kr",
    phone: "042-600-9999"
  },
  {
    name: "충남대학교병원",
    type: "상급종합병원",
    region: "대전",
    lat: 36.3207,
    lng: 127.4084,
    address: "대전광역시 중구 문화로 282",
    website: "https://www.cnuh.co.kr",
    phone: "042-280-7114"
  },
  {
    name: "단국대학교 부속병원",
    type: "상급종합병원",
    region: "충남",
    lat: 36.8006,
    lng: 127.1467,
    address: "충청남도 천안시 동남구 망향로 201",
    website: "https://www.dkuh.co.kr",
    phone: "041-550-6114"
  },

  // --- 충청 보훈병원 (1곳) ---
  {
    name: "대전보훈병원",
    type: "보훈병원",
    region: "대전",
    lat: 36.3685,
    lng: 127.3475,
    address: "대전광역시 유성구 유성대로 1514",
    website: "https://daejeon.bohun.or.kr",
    phone: "042-610-8114"
  },

  // --- 충청 위탁병원 (12곳) ---
  {
    name: "옥천성모병원",
    type: "위탁병원",
    region: "충북",
    lat: 36.3048,
    lng: 127.5713,
    address: "충청북도 옥천군 옥천읍 금구리 401-1",
    website: "https://www.occmc.co.kr",
    phone: "043-730-0114"
  },
  {
    name: "명지병원",
    type: "위탁병원",
    region: "충북",
    lat: 36.9740,
    lng: 127.9347,
    address: "충청북도 제천시 근우로 32",
    website: "https://www.mjhosp.co.kr",
    phone: "043-640-8114"
  },
  {
    name: "중앙제일병원",
    type: "위탁병원",
    region: "충북",
    lat: 36.6400,
    lng: 127.4900,
    address: "충청북도 청주시 상당구 상당로 57",
    website: "https://www.jungangjeil.co.kr",
    phone: "043-290-1114"
  },
  {
    name: "효성병원",
    type: "위탁병원",
    region: "충북",
    lat: 36.6490,
    lng: 127.4278,
    address: "충청북도 청주시 흥덕구 2순환로 9",
    website: "https://www.hyosung.org",
    phone: "043-230-6114"
  },
  {
    name: "건국대학교충주병원",
    type: "위탁병원",
    region: "충북",
    lat: 36.9703,
    lng: 127.9316,
    address: "충청북도 충주시 국원대로 82",
    website: "https://www.kuch.ac.kr",
    phone: "043-840-8200"
  },
  {
    name: "공주의료원",
    type: "위탁병원",
    region: "충남",
    lat: 36.4654,
    lng: 127.0003,
    address: "충청남도 공주시 의료원길 18",
    website: "https://www.gongjumed.or.kr",
    phone: "041-850-5700"
  },
  {
    name: "백제종합병원",
    type: "위탁병원",
    region: "충남",
    lat: 36.7814,
    lng: 126.4508,
    address: "충청남도 태안군 태안읍 관청로 85",
    website: "https://www.baekjehospital.co.kr",
    phone: "041-674-0100"
  },
  {
    name: "보령아산병원",
    type: "위탁병원",
    region: "충남",
    lat: 36.3335,
    lng: 126.6138,
    address: "충청남도 보령시 대천로 889번길 17",
    website: "https://www.brah.co.kr",
    phone: "041-930-6114"
  },
  {
    name: "서산의료원",
    type: "위탁병원",
    region: "충남",
    lat: 36.7848,
    lng: 126.4517,
    address: "충청남도 서산시 율지6로 111",
    website: "https://www.seosanmc.or.kr",
    phone: "041-661-5000"
  },
  {
    name: "아산충무병원",
    type: "위탁병원",
    region: "충남",
    lat: 36.7897,
    lng: 127.0040,
    address: "충청남도 아산시 번영로 79번길 31",
    website: "https://www.cmhasan.co.kr",
    phone: "041-536-6000"
  },
  {
    name: "천안충무병원",
    type: "위탁병원",
    region: "충남",
    lat: 36.8210,
    lng: 127.1538,
    address: "충청남도 천안시 동남구 청수14로 47",
    website: "https://www.cmhcheonan.co.kr",
    phone: "041-570-7555"
  },
  {
    name: "홍성의료원",
    type: "위탁병원",
    region: "충남",
    lat: 36.6005,
    lng: 126.6637,
    address: "충청남도 홍성군 홍성읍 조양로 224",
    website: "https://www.hongseongmed.or.kr",
    phone: "041-630-6114"
  },

  // ============================================================
  // 전라 (22곳: 상급종합 5 + 보훈 1 + 위탁 16)
  // ============================================================

  // --- 전라 상급종합병원 (5곳) ---
  {
    name: "원광대학교병원",
    type: "상급종합병원",
    region: "전북",
    lat: 35.9615,
    lng: 126.9545,
    address: "전북특별자치도 익산시 무왕로 895",
    website: "https://www.wkuh.org",
    phone: "063-859-1114"
  },
  {
    name: "전북대학교병원",
    type: "상급종합병원",
    region: "전북",
    lat: 35.8383,
    lng: 127.1380,
    address: "전북특별자치도 전주시 덕진구 건지로 20",
    website: "https://www.jbuh.co.kr",
    phone: "063-250-1114"
  },
  {
    name: "전남대학교병원",
    type: "상급종합병원",
    region: "광주",
    lat: 35.1400,
    lng: 126.9215,
    address: "광주광역시 동구 제봉로 42",
    website: "https://www.cnuh.com",
    phone: "062-220-5114"
  },
  {
    name: "조선대학교병원",
    type: "상급종합병원",
    region: "광주",
    lat: 35.1416,
    lng: 126.9278,
    address: "광주광역시 동구 필문대로 365",
    website: "https://hosp.chosun.ac.kr",
    phone: "062-220-3114"
  },
  {
    name: "화순전남대학교병원",
    type: "상급종합병원",
    region: "전남",
    lat: 35.0536,
    lng: 126.9859,
    address: "전라남도 화순군 화순읍 서양로 322",
    website: "https://www.cnuhh.com",
    phone: "061-379-7114"
  },

  // --- 전라 보훈병원 (1곳) ---
  {
    name: "광주보훈병원",
    type: "보훈병원",
    region: "광주",
    lat: 35.2015,
    lng: 126.8166,
    address: "광주광역시 광산구 첨단월봉로 99번길 20",
    website: "https://gwangju.bohun.or.kr",
    phone: "062-602-6114"
  },

  // --- 전라 위탁병원 (16곳) ---
  {
    name: "고창병원",
    type: "위탁병원",
    region: "전북",
    lat: 35.4358,
    lng: 126.7020,
    address: "전북특별자치도 고창군 고창읍 중앙로 58",
    website: "https://www.gochanghospital.co.kr",
    phone: "063-560-1100"
  },
  {
    name: "군산의료원",
    type: "위탁병원",
    region: "전북",
    lat: 35.9687,
    lng: 126.7127,
    address: "전북특별자치도 군산시 의료원로 27",
    website: "https://www.gunsanmc.or.kr",
    phone: "063-472-5000"
  },
  {
    name: "남원의료원",
    type: "위탁병원",
    region: "전북",
    lat: 35.4156,
    lng: 127.3905,
    address: "전북특별자치도 남원시 의료원길 3",
    website: "https://www.namwonmc.or.kr",
    phone: "063-620-1114"
  },
  {
    name: "익산병원",
    type: "위탁병원",
    region: "전북",
    lat: 35.9480,
    lng: 126.9542,
    address: "전북특별자치도 익산시 무왕로 895",
    website: "https://www.iksanhospital.co.kr",
    phone: "063-840-9114"
  },
  {
    name: "전주예수병원",
    type: "위탁병원",
    region: "전북",
    lat: 35.8119,
    lng: 127.1461,
    address: "전북특별자치도 전주시 완산구 서원로 365",
    website: "https://www.jesushospital.com",
    phone: "063-230-8114"
  },
  {
    name: "정읍아산병원",
    type: "위탁병원",
    region: "전북",
    lat: 35.5700,
    lng: 126.8564,
    address: "전북특별자치도 정읍시 충정로 1000",
    website: "https://jeah.amc.seoul.kr",
    phone: "063-530-6114"
  },
  {
    name: "고흥종합병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.6044,
    lng: 127.2816,
    address: "전라남도 고흥군 고흥읍 터미널길 19",
    website: "https://www.goheunghospital.co.kr",
    phone: "061-830-1000"
  },
  {
    name: "광양사랑병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.9405,
    lng: 127.6960,
    address: "전라남도 광양시 광양읍 순광로 85",
    website: "https://www.gysaranghospital.co.kr",
    phone: "061-797-0114"
  },
  {
    name: "나주종합병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.9936,
    lng: 126.7146,
    address: "전라남도 나주시 빛가람로 752",
    website: "https://www.najuhosp.co.kr",
    phone: "061-330-7575"
  },
  {
    name: "목포시의료원",
    type: "위탁병원",
    region: "전남",
    lat: 34.8025,
    lng: 126.3918,
    address: "전라남도 목포시 비파로 2",
    website: "https://www.mokpomc.or.kr",
    phone: "061-260-6500"
  },
  {
    name: "무안병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.9903,
    lng: 126.4818,
    address: "전라남도 무안군 무안읍 무안로 268",
    website: "https://www.muanhospital.co.kr",
    phone: "061-450-5500"
  },
  {
    name: "순천성가롤로병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.9507,
    lng: 127.4876,
    address: "전라남도 순천시 순광로 221",
    website: "https://www.carollo.or.kr",
    phone: "061-720-2000"
  },
  {
    name: "여수전남병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.7604,
    lng: 127.6622,
    address: "전라남도 여수시 좌수영로 300",
    website: "https://www.ysjnhospital.co.kr",
    phone: "061-640-7575"
  },
  {
    name: "영광기독병원",
    type: "위탁병원",
    region: "전남",
    lat: 35.2770,
    lng: 126.5120,
    address: "전라남도 영광군 영광읍 중앙로 1",
    website: "https://www.ygch.co.kr",
    phone: "061-350-8114"
  },
  {
    name: "장흥종합병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.6813,
    lng: 126.9073,
    address: "전라남도 장흥군 장흥읍 읍내리",
    website: "https://www.jangheunghospital.co.kr",
    phone: "061-860-0114"
  },
  {
    name: "해남종합병원",
    type: "위탁병원",
    region: "전남",
    lat: 34.5719,
    lng: 126.5992,
    address: "전라남도 해남군 해남읍 중앙1로 50",
    website: "https://www.haenamhospital.co.kr",
    phone: "061-530-5000"
  },

  // ============================================================
  // 경상·울산 (35곳: 상급종합 13 + 보훈 2 + 위탁 20)
  // ============================================================

  // --- 경상 상급종합병원 (13곳) ---
  {
    name: "대구가톨릭대학교병원",
    type: "상급종합병원",
    region: "대구",
    lat: 35.8513,
    lng: 128.6299,
    address: "대구광역시 남구 두류공원로17길 33",
    website: "https://www.dcmc.co.kr",
    phone: "053-650-4114"
  },
  {
    name: "영남대학교병원",
    type: "상급종합병원",
    region: "대구",
    lat: 35.8574,
    lng: 128.6312,
    address: "대구광역시 남구 현충로 170",
    website: "https://yumc.ac.kr",
    phone: "053-620-3114"
  },
  {
    name: "계명대학교동산병원",
    type: "상급종합병원",
    region: "대구",
    lat: 35.8553,
    lng: 128.4897,
    address: "대구광역시 달서구 달구벌대로 1035",
    website: "https://www.dsmc.or.kr",
    phone: "053-258-6114"
  },
  {
    name: "칠곡경북대학교병원",
    type: "상급종합병원",
    region: "대구",
    lat: 35.9416,
    lng: 128.5609,
    address: "대구광역시 북구 호국로 807",
    website: "https://knuch.kr",
    phone: "053-200-2114"
  },
  {
    name: "경북대학교병원",
    type: "상급종합병원",
    region: "대구",
    lat: 35.8660,
    lng: 128.6072,
    address: "대구광역시 중구 동덕로 130",
    website: "https://www.knuh.kr",
    phone: "053-200-5114"
  },
  {
    name: "양산부산대학교병원",
    type: "상급종합병원",
    region: "경남",
    lat: 35.3293,
    lng: 129.0121,
    address: "경상남도 양산시 물금읍 금오로 20",
    website: "https://www.pnuyh.or.kr",
    phone: "055-360-1114"
  },
  {
    name: "경상국립대학교병원",
    type: "상급종합병원",
    region: "경남",
    lat: 35.1683,
    lng: 128.0890,
    address: "경상남도 진주시 강남로 79",
    website: "https://www.gnuh.co.kr",
    phone: "055-750-8114"
  },
  {
    name: "삼성창원병원",
    type: "상급종합병원",
    region: "경남",
    lat: 35.2287,
    lng: 128.6818,
    address: "경상남도 창원시 마산회원구 팔용로 158",
    website: "https://www.samsungchangwon.com",
    phone: "055-290-6114"
  },
  {
    name: "인제대부산백병원",
    type: "상급종합병원",
    region: "부산",
    lat: 35.1010,
    lng: 129.0210,
    address: "부산광역시 부산진구 복지로 75",
    website: "https://www.paik.ac.kr/busan",
    phone: "051-890-6114"
  },
  {
    name: "고신대복음병원",
    type: "상급종합병원",
    region: "부산",
    lat: 35.0953,
    lng: 129.0177,
    address: "부산광역시 서구 감천로 262",
    website: "https://www.kosinmed.or.kr",
    phone: "051-990-6114"
  },
  {
    name: "부산대학교병원",
    type: "상급종합병원",
    region: "부산",
    lat: 35.1058,
    lng: 129.0132,
    address: "부산광역시 서구 구덕로 179",
    website: "https://www.pnuh.or.kr",
    phone: "051-240-7114"
  },
  {
    name: "동아대학교병원",
    type: "상급종합병원",
    region: "부산",
    lat: 35.0978,
    lng: 129.0115,
    address: "부산광역시 서구 대신공원로 26",
    website: "https://www.damc.or.kr",
    phone: "051-240-2400"
  },
  {
    name: "울산대학교병원",
    type: "상급종합병원",
    region: "울산",
    lat: 35.5517,
    lng: 129.2587,
    address: "울산광역시 동구 방어진순환도로 877",
    website: "https://www.uuh.ulsan.kr",
    phone: "052-250-7000"
  },

  // --- 경상 보훈병원 (2곳) ---
  {
    name: "대구보훈병원",
    type: "보훈병원",
    region: "대구",
    lat: 35.8932,
    lng: 128.5521,
    address: "대구광역시 북구 호국로 1027",
    website: "https://daegu.bohun.or.kr",
    phone: "053-630-7114"
  },
  {
    name: "부산보훈병원",
    type: "보훈병원",
    region: "부산",
    lat: 35.1240,
    lng: 128.9860,
    address: "부산광역시 사하구 대티로 60",
    website: "https://busan.bohun.or.kr",
    phone: "051-601-6114"
  },

  // --- 경상·울산 위탁병원 (20곳) ---
  {
    name: "세명병원",
    type: "위탁병원",
    region: "경북",
    lat: 35.8589,
    lng: 128.7471,
    address: "대구광역시 수성구 달구벌대로 3260",
    website: "https://www.semyung.co.kr",
    phone: "053-659-3000"
  },
  {
    name: "동국대 경주병원",
    type: "위탁병원",
    region: "경북",
    lat: 35.8278,
    lng: 129.2975,
    address: "경상북도 경주시 동대로 87",
    website: "https://www.dghospital.com",
    phone: "054-770-8114"
  },
  {
    name: "순천향대 구미병원",
    type: "위탁병원",
    region: "경북",
    lat: 36.1185,
    lng: 128.3521,
    address: "경상북도 구미시 공단1로 179",
    website: "https://www.schmc.ac.kr/gumi",
    phone: "054-468-9114"
  },
  {
    name: "김천제일병원",
    type: "위탁병원",
    region: "경북",
    lat: 36.1198,
    lng: 128.1118,
    address: "경상북도 김천시 모암길 24",
    website: "https://www.gcjeilhospital.co.kr",
    phone: "054-420-9114"
  },
  {
    name: "문경제일병원",
    type: "위탁병원",
    region: "경북",
    lat: 36.5868,
    lng: 128.1867,
    address: "경상북도 문경시 중앙로 63",
    website: "https://www.mkjeil.co.kr",
    phone: "054-550-7700"
  },
  {
    name: "상주성모병원",
    type: "위탁병원",
    region: "경북",
    lat: 36.4108,
    lng: 128.1592,
    address: "경상북도 상주시 무양로 105",
    website: "https://www.sjcmc.co.kr",
    phone: "054-530-1114"
  },
  {
    name: "안동의료원",
    type: "위탁병원",
    region: "경북",
    lat: 36.5684,
    lng: 128.7297,
    address: "경상북도 안동시 앙실로 11",
    website: "https://www.admc.or.kr",
    phone: "054-850-6000"
  },
  {
    name: "영천병원",
    type: "위탁병원",
    region: "경북",
    lat: 35.9732,
    lng: 128.9388,
    address: "경상북도 영천시 시청로 14",
    website: "https://www.ychospital.co.kr",
    phone: "054-330-7500"
  },
  {
    name: "포항의료원",
    type: "위탁병원",
    region: "경북",
    lat: 36.0190,
    lng: 129.3650,
    address: "경상북도 포항시 남구 대잠동길 36",
    website: "https://www.pohangmc.or.kr",
    phone: "054-247-0551"
  },
  {
    name: "대우병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.1780,
    lng: 128.0751,
    address: "경상남도 거제시 장승포로 14길 3",
    website: "https://www.daewoohospital.co.kr",
    phone: "055-680-8114"
  },
  {
    name: "맑은샘병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.2476,
    lng: 128.6929,
    address: "경상남도 창원시 마산합포구 3·15대로 172",
    website: "https://www.malgeunsam.co.kr",
    phone: "055-249-1114"
  },
  {
    name: "조은금강병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.1800,
    lng: 128.0850,
    address: "경상남도 진주시 진주대로 816",
    website: "https://www.joungkk.co.kr",
    phone: "055-790-8100"
  },
  {
    name: "베데스다복음병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.1823,
    lng: 128.0596,
    address: "경상남도 진주시 에나로 17",
    website: "https://www.bethesda.co.kr",
    phone: "055-750-0000"
  },
  {
    name: "진주제일병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.1800,
    lng: 128.0730,
    address: "경상남도 진주시 동진로 51",
    website: "https://www.jjjeilhospital.co.kr",
    phone: "055-750-6200"
  },
  {
    name: "마산의료원",
    type: "위탁병원",
    region: "경남",
    lat: 35.2355,
    lng: 128.5726,
    address: "경상남도 창원시 마산합포구 3·15대로 231",
    website: "https://www.masanmc.or.kr",
    phone: "055-249-1000"
  },
  {
    name: "창원파티마병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.2271,
    lng: 128.6848,
    address: "경상남도 창원시 의창구 창원대로 45",
    website: "https://www.fatima.or.kr",
    phone: "055-270-1000"
  },
  {
    name: "연세에스병원",
    type: "위탁병원",
    region: "경남",
    lat: 35.2480,
    lng: 128.5803,
    address: "경상남도 창원시 마산합포구 문화남7길 3",
    website: "https://www.yonseis.co.kr",
    phone: "055-220-0500"
  },
  {
    name: "울산병원",
    type: "위탁병원",
    region: "울산",
    lat: 35.5484,
    lng: 129.3134,
    address: "울산광역시 동구 태화강변로 25",
    website: "https://www.ulsanhospital.co.kr",
    phone: "052-259-5000"
  },
  {
    name: "울산시티병원",
    type: "위탁병원",
    region: "울산",
    lat: 35.5382,
    lng: 129.3362,
    address: "울산광역시 남구 삼산로 264",
    website: "https://www.ulsancity.co.kr",
    phone: "052-226-1114"
  },
  {
    name: "서울산보람병원",
    type: "위탁병원",
    region: "울산",
    lat: 35.5116,
    lng: 129.2749,
    address: "울산광역시 울주군 언양읍 반구대로 572",
    website: "https://www.boramssh.co.kr",
    phone: "052-227-3000"
  },

  // ============================================================
  // 제주 (3곳: 위탁 3)
  // ============================================================
  {
    name: "서귀포의료원",
    type: "위탁병원",
    region: "제주",
    lat: 33.2509,
    lng: 126.5097,
    address: "제주특별자치도 서귀포시 동홍중앙로 63",
    website: "https://www.sgpmc.or.kr",
    phone: "064-730-3100"
  },
  {
    name: "제주한라병원",
    type: "위탁병원",
    region: "제주",
    lat: 33.4890,
    lng: 126.4864,
    address: "제주특별자치도 제주시 도령로 65",
    website: "https://www.hallahospital.co.kr",
    phone: "064-740-5000"
  },
  {
    name: "제주대학교병원",
    type: "위탁병원",
    region: "제주",
    lat: 33.4612,
    lng: 126.5612,
    address: "제주특별자치도 제주시 아란13길 15",
    website: "https://www.jejunuh.co.kr",
    phone: "064-717-1114"
  }
];

// 병원 통계 요약
const HOSPITALS_SUMMARY = {
  total: HOSPITALS_DATA.length,
  byType: {
    "상급종합병원": HOSPITALS_DATA.filter(h => h.type === "상급종합병원").length,
    "보훈병원": HOSPITALS_DATA.filter(h => h.type === "보훈병원").length,
    "위탁병원": HOSPITALS_DATA.filter(h => h.type === "위탁병원").length,
    "공공의료기관": HOSPITALS_DATA.filter(h => h.type === "공공의료기관").length
  },
  byRegion: HOSPITALS_DATA.reduce((acc, h) => {
    acc[h.region] = (acc[h.region] || 0) + 1;
    return acc;
  }, {}),
  // 지역별 색상 (지도 마커용)
  regionColors: {
    "서울": "#E53935",
    "경기": "#FB8C00",
    "인천": "#F4511E",
    "강원": "#43A047",
    "충북": "#1E88E5",
    "충남": "#3949AB",
    "대전": "#5E35B1",
    "전북": "#00897B",
    "전남": "#00ACC1",
    "광주": "#039BE5",
    "경북": "#7CB342",
    "경남": "#C0CA33",
    "대구": "#FFB300",
    "부산": "#F4511E",
    "울산": "#6D4C41",
    "제주": "#8E24AA"
  },
  // 병원 유형별 색상 (마커용)
  typeColors: {
    "상급종합병원": "#003478",
    "보훈병원": "#C62828",
    "위탁병원": "#2E7D32",
    "공공의료기관": "#1565C0"
  }
};

// 지역별 필터 함수
function getHospitalsByRegion(region) {
  return HOSPITALS_DATA.filter(h => h.region === region);
}

// 유형별 필터 함수
function getHospitalsByType(type) {
  return HOSPITALS_DATA.filter(h => h.type === type);
}

// 이름 검색 함수
function searchHospitals(query) {
  const q = query.toLowerCase();
  return HOSPITALS_DATA.filter(h =>
    h.name.toLowerCase().includes(q) ||
    h.address.toLowerCase().includes(q) ||
    h.region.toLowerCase().includes(q)
  );
}
