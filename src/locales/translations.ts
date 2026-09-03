export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  // Navigation & Utility Header
  nav: {
    platformTitle: string;
    officialPortal: string;
    subtitle: string;
    home: string;
    about: string;
    explore: string;
    howItWorks: string;
    citizenReport: string;
    trackComplaint: string;
    signIn: string;
    helpFaq: string;
    topPlatformLabel: string;
    reportIssueBtn: string;
  };

  // Hero Section
  hero: {
    portalBadge: string;
    mainTitle: string;
    mainTitleHighlight: string;
    subTitle: string;
    description: string;
    btnExplore: string;
    btnReport: string;
    identityProtected: string;
    aiRiskDetection: string;
    gisTwin: string;
    systemStatus: string;
    live: string;
    dbStatus: string;
    activeTelemetry: string;
    statesCovered: string;
    totalProjects: string;
    completedProjects: string;
    aiFlags: string;
    ingestedDatasets: string;
  };

  // Citizen Report Form Workflow
  reportForm: {
    pageBadge: string;
    pageTitle: string;
    pageSubtitle: string;
    privacyBadge: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    sendOtp: string;
    otpLabel: string;
    verifyOtp: string;
    otpSuccess: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    districtLabel: string;
    districtSelect: string;
    constituencyLabel: string;
    constituencyPlaceholder: string;
    categoryLabel: string;
    categorySelect: string;
    workTitleLabel: string;
    workTitlePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    locationTitle: string;
    locationDesc: string;
    detectGps: string;
    detectingGps: string;
    gpsVerified: string;
    evidenceTitle: string;
    evidenceDesc: string;
    uploadPhoto: string;
    aiChecking: string;
    photoVerified: string;
    btnNext: string;
    btnBack: string;
    btnSubmit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    complaintIdLabel: string;
    trackNowBtn: string;
    valMobileReq: string;
    valCategoryReq: string;
    valTitleReq: string;
    valDescReq: string;
  };

  // Track Complaint Page
  track: {
    badge: string;
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    btnTrack: string;
    sampleIds: string;
    statusSubmitted: string;
    statusUnderReview: string;
    statusAssigned: string;
    statusInProgress: string;
    statusResolved: string;
    statusClosed: string;
    timelineTitle: string;
    assignedAuthority: string;
    notFoundTitle: string;
    notFoundDesc: string;
    verifiedCitizen: string;
  };

  // Explore Page
  explore: {
    badge: string;
    title: string;
    subtitle: string;
    filterState: string;
    filterDistrict: string;
    filterStatus: string;
    filterCategory: string;
    allStates: string;
    allDistricts: string;
    allStatuses: string;
    allCategories: string;
    btnSearch: string;
    btnReset: string;
    testInDemo: string;
    noProjectsFound: string;
  };

  // About & How It Works Pages
  about: {
    badge: string;
    title: string;
    subtitle: string;
    objectivesTitle: string;
    objectivesDesc: string;
    obj1Title: string;
    obj1Desc: string;
    obj2Title: string;
    obj2Desc: string;
    obj3Title: string;
    obj3Desc: string;
    workflowTitle: string;
    workflowDesc: string;
    accessLoginBtn: string;
  };

  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    mechanismsTitle: string;
    mechanismsDesc: string;
    mech1Title: string;
    mech1Desc: string;
    mech2Title: string;
    mech2Desc: string;
    mech3Title: string;
    mech3Desc: string;
    mech4Title: string;
    mech4Desc: string;
    bannerTitle: string;
    btnReport: string;
    btnSignIn: string;
  };

  // Footer
  footer: {
    platformName: string;
    subtitle: string;
    publicServices: string;
    citizenReport: string;
    trackStatus: string;
    exploreWorks: string;
    aboutPlatform: string;
    howItWorks: string;
    helpFaq: string;
    quickLinks: string;
    roleLogin: string;
    privacyPolicy: string;
    termsService: string;
    disclaimer: string;
    mospiRef: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      platformTitle: 'MPLADS AI Monitor',
      officialPortal: 'OFFICIAL PORTAL',
      subtitle: 'AI-Powered Infrastructure Monitoring & Accountability Platform',
      home: 'Home',
      about: 'About Us',
      explore: 'Explore',
      howItWorks: 'How It Works',
      citizenReport: 'Citizen Report',
      trackComplaint: 'Track Complaint',
      signIn: 'Sign In',
      helpFaq: 'Help & FAQ',
      topPlatformLabel: 'Government Digital Infrastructure Monitoring Platform',
      reportIssueBtn: 'Report Issue'
    },
    hero: {
      portalBadge: 'Official Digital Infrastructure Monitoring Portal',
      mainTitle: 'MPLADS',
      mainTitleHighlight: 'AI Monitor',
      subTitle: 'AI-Powered Infrastructure Monitoring & Accountability',
      description: 'An AI-powered platform for monitoring MPLADS infrastructure projects, detecting anomalies, tracking expenditure and progress, and enabling citizen participation.',
      btnExplore: 'Explore Platform',
      btnReport: 'Report an Issue',
      identityProtected: 'Identity Protected',
      aiRiskDetection: 'AI Risk Detection',
      gisTwin: 'GIS Geospatial Twin',
      systemStatus: 'MPLADS MONITORING SYSTEM',
      live: 'Live',
      dbStatus: 'Database Status',
      activeTelemetry: 'Active Telemetry',
      statesCovered: 'States & UTs Covered',
      totalProjects: 'Total Registered Projects',
      completedProjects: 'Completed Projects',
      aiFlags: 'AI Risk Flags Detected',
      ingestedDatasets: 'Ingested Datasets'
    },
    reportForm: {
      pageBadge: 'DPDP-Compliant Citizen Portal',
      pageTitle: 'Report an Infrastructure Issue',
      pageSubtitle: 'Submit geotagged evidence on delayed, substandard, or damaged MPLADS infrastructure. Your identity remains protected.',
      privacyBadge: '🔒 Your identity is protected under DPDP Act protocols',
      step1: 'Step 1 — Details',
      step2: 'Step 2 — Location',
      step3: 'Step 3 — Description',
      step4: 'Step 4 — Evidence',
      step5: 'Step 5 — Submit',
      mobileLabel: 'Mobile Number *',
      mobilePlaceholder: 'Enter 10-digit mobile number',
      sendOtp: 'Send OTP',
      otpLabel: 'Enter 4-Digit OTP *',
      verifyOtp: 'Verify OTP',
      otpSuccess: 'Mobile number verified successfully',
      fullNameLabel: 'Full Name (Optional)',
      fullNamePlaceholder: 'Enter full name',
      districtLabel: 'District *',
      districtSelect: 'Select District',
      constituencyLabel: 'Parliamentary Constituency *',
      constituencyPlaceholder: 'e.g. Pune, Baramati, Shirur',
      categoryLabel: 'Infrastructure Category *',
      categorySelect: 'Select Work Category',
      workTitleLabel: 'Project Title / Location Name *',
      workTitlePlaceholder: 'e.g. Community Center Roof Leakage, Road Potholes',
      descriptionLabel: 'Issue Description *',
      descriptionPlaceholder: 'Describe the infrastructure defect, delay, or damage in detail...',
      locationTitle: 'GPS Location Verification',
      locationDesc: 'Capture precise geotagged coordinates to assist district officers in ground verification.',
      detectGps: 'Detect My Location',
      detectingGps: 'Fetching GPS Coordinates...',
      gpsVerified: 'GPS Location Verified',
      evidenceTitle: 'Photo & Document Evidence',
      evidenceDesc: 'Upload photo evidence of the site defect. Photos are automatically scanned for authenticity.',
      uploadPhoto: 'Click or Drag Photo Here to Upload',
      aiChecking: 'Scanning image metadata & authenticity...',
      photoVerified: 'Photo Evidence Authenticity Verified',
      btnNext: 'Next Step',
      btnBack: 'Previous Step',
      btnSubmit: 'Submit Grievance',
      submitting: 'Submitting Official Report...',
      successTitle: 'Grievance Submitted Successfully',
      successDesc: 'Your complaint has been logged with the District Nodal Authority. Keep your Complaint ID safe for tracking.',
      complaintIdLabel: 'Unique Complaint ID',
      trackNowBtn: 'Track Complaint Status',
      valMobileReq: 'Please enter a valid 10-digit mobile number.',
      valCategoryReq: 'Please select an infrastructure category.',
      valTitleReq: 'Please enter a project title or location name.',
      valDescReq: 'Please provide a detailed description of the issue.'
    },
    track: {
      badge: 'Public Inquiry System',
      title: 'Track Infrastructure Grievance Status',
      subtitle: 'Enter your unique Complaint ID to view official investigation status, assigned district authority, and resolution timeline.',
      inputPlaceholder: 'Enter Complaint ID (e.g. MPL-CMP-2026-001284)',
      btnTrack: 'Track Status',
      sampleIds: 'Sample IDs:',
      statusSubmitted: 'Submitted',
      statusUnderReview: 'Under Review',
      statusAssigned: 'Assigned',
      statusInProgress: 'In Progress',
      statusResolved: 'Resolved',
      statusClosed: 'Closed',
      timelineTitle: 'Resolution Audit Timeline',
      assignedAuthority: 'Assigned Authority',
      notFoundTitle: 'No Complaint Found',
      notFoundDesc: 'Please check your Complaint ID format and try again.',
      verifiedCitizen: 'Verified Citizen ID'
    },
    explore: {
      badge: 'Capability Overview',
      title: 'Explore MPLADS AI Monitor Capabilities',
      subtitle: 'Detailed breakdown of key modules, AI models, financial intelligence algorithms, and GIS tools.',
      filterState: 'State',
      filterDistrict: 'District',
      filterStatus: 'Status',
      filterCategory: 'Category',
      allStates: 'All States',
      allDistricts: 'All Districts',
      allStatuses: 'All Statuses',
      allCategories: 'All Categories',
      btnSearch: 'Search Works',
      btnReset: 'Reset Filters',
      testInDemo: 'Test In Demo',
      noProjectsFound: 'No infrastructure projects match the selected criteria.'
    },
    about: {
      badge: 'Platform Governance & Architecture',
      title: 'About MPLADS AI Monitor',
      subtitle: 'An AI-driven Digital Public Infrastructure platform designed to monitor physical and financial progress, identify execution anomalies, and enable secure citizen participation across MPLADS development works.',
      objectivesTitle: 'Institutional Objectives',
      objectivesDesc: 'Core principles guiding platform engineering and decision support.',
      obj1Title: 'Objective Accountability',
      obj1Desc: 'Replaces manual inspection sampling with continuous automated data validation and GIS verification across all parliamentary constituencies.',
      obj2Title: 'AI Risk Detection',
      obj2Desc: 'Identifies cost overruns, timeline stalls, duplicate scheme claims, and physical vs financial mismatch automatically.',
      obj3Title: 'Citizen Participation',
      obj3Desc: 'Enables citizens to submit geotagged evidence on infrastructure defects while protecting identity using isolated verification layers.',
      workflowTitle: 'Multi-Tier Governance Workflow',
      workflowDesc: 'Designed for seamless role-based collaboration across government tiers.',
      accessLoginBtn: 'Access Official Role Login'
    },
    howItWorks: {
      badge: 'Platform Workflow',
      title: 'How MPLADS AI Monitor Works',
      subtitle: 'Understanding the automated ingestion, AI risk detection, satellite verification, and citizen reporting workflows.',
      mechanismsTitle: 'Core Verification Mechanisms',
      mechanismsDesc: 'Automated algorithms and ground feedback integration.',
      mech1Title: 'Physical vs Financial Discrepancy Engine',
      mech1Desc: 'Cross-checks physical percentage reported in site inspections against financial utilization certificates released by the district treasury.',
      mech2Title: 'Duplicate Claim Detection',
      mech2Desc: 'Text and spatial similarity algorithms scan project titles and GPS coordinates against state PWD, MGNREGA, and municipal works databases.',
      mech3Title: 'Evidence Authenticity Check',
      mech3Desc: 'EXIF camera metadata, GPS location stamps, image noise consistency, and AI-generated image risks are inspected prior to routing citizen complaints.',
      mech4Title: 'Isolated Identity Protection',
      mech4Desc: 'Citizen mobile credentials are verified via isolated gateway and replaced with encrypted pseudonyms (DPDP Act compliant).',
      bannerTitle: 'Ready to Report an Issue or Access Command Dashboards?',
      btnReport: 'Report Infrastructure Issue',
      btnSignIn: 'Official Sign In'
    },
    footer: {
      platformName: 'MPLADS AI Monitor',
      subtitle: 'AI-Powered Infrastructure Monitoring & Accountability',
      publicServices: 'Citizen Services',
      citizenReport: 'Report an Issue',
      trackStatus: 'Track Complaint',
      exploreWorks: 'Explore Works',
      aboutPlatform: 'About Platform',
      howItWorks: 'How It Works',
      helpFaq: 'Help & FAQ',
      quickLinks: 'Quick Links',
      roleLogin: 'Official Role Login',
      privacyPolicy: 'Privacy Policy',
      termsService: 'Terms of Service',
      disclaimer: 'MoSPI Prototype Disclaimer',
      mospiRef: 'Ministry of Statistics & Programme Implementation',
      copyright: '© 2026 MPLADS AI Monitor • Digital Public Infrastructure Prototype'
    }
  },
  hi: {
    nav: {
      platformTitle: 'एमपीलैड्स एआई मॉनिटर',
      officialPortal: 'आधिकारिक पोर्टल',
      subtitle: 'एआई-संचालित बुनियादी ढांचा निगरानी और जवाबदेही मंच',
      home: 'मुख्य पृष्ठ',
      about: 'हमारे बारे में',
      explore: 'एक्सप्लोर करें',
      howItWorks: 'यह कैसे काम करता है',
      citizenReport: 'नागरिक रिपोर्ट',
      trackComplaint: 'शिकायत ट्रैक करें',
      signIn: 'साइन इन करें',
      helpFaq: 'सहायता और अक्सर पूछे जाने वाले प्रश्न',
      topPlatformLabel: 'सरकारी डिजिटल अवसंरचना निगरानी मंच',
      reportIssueBtn: 'समस्या दर्ज करें'
    },
    hero: {
      portalBadge: 'आधिकारिक डिजिटल बुनियादी ढांचा निगरानी पोर्टल',
      mainTitle: 'एमपीलैड्स',
      mainTitleHighlight: 'एआई मॉनिटर',
      subTitle: 'एआई-संचालित बुनियादी ढांचा निगरानी और पारदर्शिता',
      description: 'एमपीलैड्स विकास परियोजनाओं की निगरानी, विसंगतियों की पहचान, व्यय और प्रगति को ट्रैक करने तथा नागरिक भागीदारी सक्षम करने वाला एआई-संचालित मंच।',
      btnExplore: 'मंच एक्सप्लोर करें',
      btnReport: 'समस्या दर्ज करें',
      identityProtected: 'पहचान सुरक्षित',
      aiRiskDetection: 'एआई जोखिम पहचान',
      gisTwin: 'जीआईएस जियोस्पेशियल ट्विन',
      systemStatus: 'एमपीलैड्स निगरानी प्रणाली',
      live: 'लाइव',
      dbStatus: 'डेटाबेस स्थिति',
      activeTelemetry: 'सक्रिय टेलीमेट्री',
      statesCovered: 'कवर किए गए राज्य व केंद्र शासित प्रदेश',
      totalProjects: 'कुल पंजीकृत परियोजनाएं',
      completedProjects: 'पूर्ण परियोजनाएं',
      aiFlags: 'पहचाने गए एआई जोखिम संकेत',
      ingestedDatasets: 'शामिल किए गए डेटासेट'
    },
    reportForm: {
      pageBadge: 'डीपीडीपी-अनुपालक नागरिक पोर्टल',
      pageTitle: 'बुनियादी ढांचे की समस्या की रिपोर्ट करें',
      pageSubtitle: 'विलंबित, घटिया या क्षतिग्रस्त एमपीलैड्स बुनियादी ढांचे पर जियोटैग किए गए साक्ष्य जमा करें। आपकी पहचान पूर्णतः सुरक्षित रहेगी।',
      privacyBadge: '🔒 डीपीडीपी अधिनियम के तहत आपकी पहचान सुरक्षित है',
      step1: 'चरण 1 — विवरण',
      step2: 'चरण 2 — स्थान',
      step3: 'चरण 3 — विवरण',
      step4: 'चरण 4 — साक्ष्य',
      step5: 'चरण 5 — सबमिट करें',
      mobileLabel: 'मोबाइल नंबर *',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      sendOtp: 'ओटीपी भेजें',
      otpLabel: '4-अंकीय ओटीपी दर्ज करें *',
      verifyOtp: 'ओटीपी सत्यापित करें',
      otpSuccess: 'मोबाइल नंबर सफलतापूर्वक सत्यापित',
      fullNameLabel: 'पूरा नाम (वैकल्पिक)',
      fullNamePlaceholder: 'पूरा नाम दर्ज करें',
      districtLabel: 'जिला *',
      districtSelect: 'जिला चुनें',
      constituencyLabel: 'संसदीय क्षेत्र *',
      constituencyPlaceholder: 'उदा. पुणे, बारामती, शिरूर',
      categoryLabel: 'बुनियादी ढांचा श्रेणी *',
      categorySelect: 'कार्य श्रेणी चुनें',
      workTitleLabel: 'परियोजना का नाम / स्थान का नाम *',
      workTitlePlaceholder: 'उदा. सामुदायिक भवन छत का रिसाव, सड़क के गड्ढे',
      descriptionLabel: 'समस्या का विवरण *',
      descriptionPlaceholder: 'बुनियादी ढांचे की खराबी, देरी या क्षति का विस्तार से वर्णन करें...',
      locationTitle: 'जीपीएस स्थान सत्यापन',
      locationDesc: 'ग्राउंड सत्यापन के लिए सटीक जियोटैग किए गए निर्देशांक कैप्चर करें।',
      detectGps: 'मेरा स्थान पहचानें',
      detectingGps: 'जीपीएस निर्देशांक प्राप्त हो रहे हैं...',
      gpsVerified: 'जीपीएस स्थान सत्यापित',
      evidenceTitle: 'फोटो व दस्तावेज साक्ष्य',
      evidenceDesc: 'साइट की समस्या की फोटो अपलोड करें। प्रामाणिकता के लिए तस्वीरों को स्वचालित रूप से स्कैन किया जाता है।',
      uploadPhoto: 'अपलोड करने के लिए फोटो पर क्लिक करें या यहां खींचें',
      aiChecking: 'इमेज मेटाडेटा व प्रामाणिकता की जांच हो रही है...',
      photoVerified: 'फोटो साक्ष्य की प्रामाणिकता सत्यापित',
      btnNext: 'अगला चरण',
      btnBack: 'पिछला चरण',
      btnSubmit: 'शिकायत दर्ज करें',
      submitting: 'आधिकारिक रिपोर्ट सबमिट हो रही है...',
      successTitle: 'शिकायत सफलतापूर्वक दर्ज की गई',
      successDesc: 'आपकी शिकायत जिला नोडल प्राधिकरण के पास पंजीकृत हो गई है। ट्रैकिंग के लिए अपनी शिकायत आईडी सुरक्षित रखें।',
      complaintIdLabel: 'विशेष शिकायत आईडी (Complaint ID)',
      trackNowBtn: 'शिकायत की स्थिति ट्रैक करें',
      valMobileReq: 'कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।',
      valCategoryReq: 'कृपया एक बुनियादी ढांचा श्रेणी चुनें।',
      valTitleReq: 'कृपया परियोजना का नाम या स्थान दर्ज करें।',
      valDescReq: 'कृपया समस्या का विस्तृत विवरण प्रदान करें।'
    },
    track: {
      badge: 'सार्वजनिक पूछताछ प्रणाली',
      title: 'शिकायत की स्थिति ट्रैक करें',
      subtitle: 'आधिकारिक जांच स्थिति, आवंटित जिला अधिकारी और समाधान समयसीमा देखने के लिए अपनी शिकायत आईडी दर्ज करें।',
      inputPlaceholder: 'शिकायत आईडी दर्ज करें (उदा. MPL-CMP-2026-001284)',
      btnTrack: 'स्थिति ट्रैक करें',
      sampleIds: 'नमूना आईडी:',
      statusSubmitted: 'प्रस्तुत (Submitted)',
      statusUnderReview: 'समीक्षाधीन (Under Review)',
      statusAssigned: 'आवंटित (Assigned)',
      statusInProgress: 'प्रगति पर (In Progress)',
      statusResolved: 'निवारित (Resolved)',
      statusClosed: 'बंद (Closed)',
      timelineTitle: 'समाधान लेखापरीक्षा समयरेखा',
      assignedAuthority: 'आवंटित प्राधिकरण',
      notFoundTitle: 'कोई शिकायत नहीं मिली',
      notFoundDesc: 'कृपया अपनी शिकायत आईडी प्रारूप की जांच करें और पुनः प्रयास करें।',
      verifiedCitizen: 'सत्यापित नागरिक आईडी'
    },
    explore: {
      badge: 'क्षमता अवलोकन',
      title: 'एमपीलैड्स एआई मॉनिटर की क्षमताओं को एक्सप्लोर करें',
      subtitle: 'मुख्य मॉड्यूल, एआई मॉडल, वित्तीय विसंगति एल्गोरिदम और जीआईएस टूल का विस्तृत विवरण।',
      filterState: 'राज्य',
      filterDistrict: 'जिला',
      filterStatus: 'स्थिति',
      filterCategory: 'श्रेणी',
      allStates: 'सभी राज्य',
      allDistricts: 'सभी जिले',
      allStatuses: 'सभी स्थितियां',
      allCategories: 'सभी श्रेणियां',
      btnSearch: 'कार्य खोजें',
      btnReset: 'फ़िल्टर रीसेट करें',
      testInDemo: 'डेमो में परीक्षण करें',
      noProjectsFound: 'चयनित मानदंडों से मेल खाने वाली कोई परियोजना नहीं मिली।'
    },
    about: {
      badge: 'मंच प्रशासन और वास्तुकला',
      title: 'एमपीलैड्स एआई मॉनिटर के बारे में',
      subtitle: 'एमपीलैड्स विकास कार्यों में भौतिक व वित्तीय प्रगति की निगरानी, विसंगतियों की पहचान और सुरक्षित नागरिक भागीदारी सक्षम करने वाला डिजिटल पब्लिक इन्फ्रास्ट्रक्चर प्लेटफॉर्म।',
      objectivesTitle: 'संस्थागत उद्देश्य',
      objectivesDesc: 'प्लेटफॉर्म इंजीनियरिंग और निर्णय समर्थन का मार्गदर्शन करने वाले मूल सिद्धांत।',
      obj1Title: 'वस्तुनिष्ठ जवाबदेही',
      obj1Desc: 'सभी संसदीय क्षेत्रों में निरंतर स्वचालित डेटा सत्यापन और जीआईएस सत्यापन द्वारा मैनुअल निरीक्षण को प्रतिस्थापित करता है।',
      obj2Title: 'एआई जोखिम पहचान',
      obj2Desc: 'लागत वृद्धि, समय सीमा में देरी, डुप्लिकेट दावों और भौतिक बनाम वित्तीय बेमेल की स्वचालित पहचान करता है।',
      obj3Title: 'नागरिक भागीदारी',
      obj3Desc: 'नागरिकों को सुरक्षित सत्यापन परतों के साथ पहचान की रक्षा करते हुए जियोटैग किए गए साक्ष्य जमा करने की अनुमति देता है।',
      workflowTitle: 'बहु-स्तरीय शासन कार्यप्रवाह',
      workflowDesc: 'सरकारी स्तरों पर निर्बाध भूमिका-आधारित सहयोग के लिए डिज़ाइन किया गया।',
      accessLoginBtn: 'आधिकारिक भूमिका लॉगिन एक्सेस करें'
    },
    howItWorks: {
      badge: 'मंच कार्यप्रवाह',
      title: 'एमपीलैड्स एआई मॉनिटर कैसे काम करता है',
      subtitle: 'स्वचालित डेटा संग्रह, एआई जोखिम पहचान, उपग्रह सत्यापन और नागरिक रिपोर्टिंग कार्यप्रवाह को समझें।',
      mechanismsTitle: 'मुख्य सत्यापन तंत्र',
      mechanismsDesc: 'स्वचालित एल्गोरिदम और ज़मीनी फीडबैक एकीकरण।',
      mech1Title: 'भौतिक बनाम वित्तीय विसंगति इंजन',
      mech1Desc: 'साइट निरीक्षणों में रिपोर्ट की गई भौतिक प्रगति का जिला कोषगार द्वारा जारी वित्तीय उपयोग प्रमाणपत्रों से मिलान करता है।',
      mech2Title: 'डुप्लिकेट दावे की पहचान',
      mech2Desc: 'पाठ और स्थानिक समानता एल्गोरिदम राज्य पीडब्ल्यूडी, मनरेगा और नगरपालिका कार्यों के डेटाबेस से मिलान करते हैं।',
      mech3Title: 'साक्ष्य प्रामाणिकता जांच',
      mech3Desc: 'शिकायतों को भेजने से पहले कैमरा मेटाडेटा, जीपीएस लोकेशन और फोटो प्रामाणिकता का निरीक्षण किया जाता है।',
      mech4Title: 'पृथक पहचान सुरक्षा',
      mech4Desc: 'नागरिक मोबाइल क्रेडेंशियल्स को सुरक्षित गेटवे के माध्यम से सत्यापित किया जाता है और एन्क्रिप्टेड उपनामों से बदल दिया जाता है।',
      bannerTitle: 'क्या आप समस्या दर्ज करने या कमांड डैशबोर्ड तक पहुंचने के लिए तैयार हैं?',
      btnReport: 'बुनियादी ढांचा समस्या दर्ज करें',
      btnSignIn: 'आधिकारिक साइन इन'
    },
    footer: {
      platformName: 'एमपीलैड्स एआई मॉनिटर',
      subtitle: 'एआई-संचालित बुनियादी ढांचा निगरानी और जवाबदेही',
      publicServices: 'नागरिक सेवाएं',
      citizenReport: 'समस्या दर्ज करें',
      trackStatus: 'शिकायत स्थिति ट्रैक करें',
      exploreWorks: 'कार्यों को एक्सप्लोर करें',
      aboutPlatform: 'मंच के बारे में',
      howItWorks: 'यह कैसे काम करता है',
      helpFaq: 'सहायता व अक्सर पूछे जाने वाले प्रश्न',
      quickLinks: 'त्वरित लिंक',
      roleLogin: 'आधिकारिक भूमिका लॉगिन',
      privacyPolicy: 'गोपनीयता नीति',
      termsService: 'सेवा की शर्तें',
      disclaimer: 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय प्रोटोटाइप अस्वीकरण',
      mospiRef: 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)',
      copyright: '© 2026 एमपीलैड्स एआई मॉनिटर • डिजिटल पब्लिक इंफ्रास्ट्रक्चर प्रोटोटाइप'
    }
  },
  mr: {
    nav: {
      platformTitle: 'एमपीलॅड्स एआय मॉनिटर',
      officialPortal: 'अधिकृत पोर्टल',
      subtitle: 'एआय-आधारित पायाभूत सुविधा देखरेख आणि उत्तरदायित्व प्लॅटफॉर्म',
      home: 'मुख्य पृष्ठ',
      about: 'आमच्याबद्दल',
      explore: 'शोध घ्या (Explore)',
      howItWorks: 'हे कसे कार्य करते',
      citizenReport: 'नागरिक तक्रार',
      trackComplaint: 'तक्रार आलेख / ट्रॅक करा',
      signIn: 'साइन इन (प्रवेश)',
      helpFaq: 'मदत आणि वारंवार विचारलेले प्रश्न',
      topPlatformLabel: 'शासकीय डिजिटल पायाभूत सुविधा देखरेख प्लॅटफॉर्म',
      reportIssueBtn: 'समस्या नोंदवा'
    },
    hero: {
      portalBadge: 'अधिकृत डिजिटल पायाभूत सुविधा देखरेख पोर्टल',
      mainTitle: 'एमपीलॅड्स',
      mainTitleHighlight: 'एआय मॉनिटर',
      subTitle: 'एआय-आधारित पायाभूत सुविधा देखरेख आणि पारदर्शकता',
      description: 'एमपीलॅड्स विकास कामांचे सनियंत्रण, त्रुटींचे ऑटोमॅटिक विश्लेषण, खर्च व प्रगतीचा मागोवा आणि नागरिक सहभाग सुलभ करणारा एआय प्लॅटफॉर्म.',
      btnExplore: 'प्लेटफॉर्म एक्सप्लोर करा',
      btnReport: 'समस्या नोंदवा',
      identityProtected: 'ओळख सुरक्षित',
      aiRiskDetection: 'एआय जोखीम शोध',
      gisTwin: 'जीआयएस जिओस्पेशिअल ट्विन',
      systemStatus: 'एमपीलॅड्स मॉनिटरिंग सिस्टम',
      live: 'लाइव्ह',
      dbStatus: 'डेटाबेस स्थिती',
      activeTelemetry: 'सक्रिय टेलिमेस्ट्री',
      statesCovered: 'समाविष्ट राज्ये व केंद्रशासित प्रदेश',
      totalProjects: 'एकूण नोंदणीकृत प्रकल्प',
      completedProjects: 'पूर्ण झालेले प्रकल्प',
      aiFlags: 'शोधलेले एआय जोखीम संकेत',
      ingestedDatasets: 'समाविष्ट केलेले डेटासेट्स'
    },
    reportForm: {
      pageBadge: 'डीपीडीपी-सुसंगत नागरिक पोर्टल',
      pageTitle: 'पायाभूत सुविधांशी संबंधित समस्या नोंदवा',
      pageSubtitle: 'रखडलेल्या, निकृष्ट दर्जाच्या किंवा खराब झालेल्या एमपीलॅड्स कामांबाबत जिओटॅग केलेले पुरावे सादर करा. तुमची ओळख पूर्णपणे सुरक्षित राहते.',
      privacyBadge: '🔒 डीपीडीपी कायद्यांतर्गत तुमची ओळख पूर्णपणे सुरक्षित आहे',
      step1: 'पायरी 1 — तपशील',
      step2: 'पायरी 2 — स्थान',
      step3: 'पायरी 3 — वर्णन',
      step4: 'पायरी 4 — पुरावे',
      step5: 'पायरी 5 — सबमिट करा',
      mobileLabel: 'मोबाईल क्रमांक *',
      mobilePlaceholder: '10 अंकी मोबाईल क्रमांक टाका',
      sendOtp: 'ओटीपी पाठवा',
      otpLabel: '4-अंकी ओटीपी टाका *',
      verifyOtp: 'ओटीपी सत्यापित करा',
      otpSuccess: 'मोबाईल क्रमांक यशस्वीरित्या सत्यापित झाला',
      fullNameLabel: 'पूर्ण नाव (पर्यायी)',
      fullNamePlaceholder: 'पूर्ण नाव प्रविष्ट करा',
      districtLabel: 'जिल्हा *',
      districtSelect: 'जिल्हा निवडा',
      constituencyLabel: 'लोकसभा मतदारसंघ *',
      constituencyPlaceholder: 'उदा. पुणे, बारामती, शिरूर',
      categoryLabel: 'पायाभूत सुविधा वर्ग *',
      categorySelect: 'कामाचा प्रकार निवडा',
      workTitleLabel: 'प्रकल्पाचे नाव / ठिकाण *',
      workTitlePlaceholder: 'उदा. समाज मंदिर छताची गळती, रस्त्यावरील खड्डे',
      descriptionLabel: 'समस्येचे सविस्तर वर्णन *',
      descriptionPlaceholder: 'पायाभूत सुविधेतील त्रुटी, विलंब किंवा नुकसानाचे सविस्तर वर्णन करा...',
      locationTitle: 'जीपीएस स्थान पडताळणी',
      locationDesc: 'जिल्हा अधिकाऱ्यांना प्रत्यक्ष पाहणीसाठी अचूक जिओटॅग केलेले अक्षांश-रेखांश नोंदवा.',
      detectGps: 'माझे स्थान शोधा',
      detectingGps: 'जीपीएस स्थान शोधत आहे...',
      gpsVerified: 'जीपीएस स्थान पडताळणी पूर्ण',
      evidenceTitle: 'फोटो आणि कागदपत्र पुरावे',
      evidenceDesc: 'घटनास्थळाचा फोटो अपलोड करा. फोटोची सत्यता ऑटोमॅटिक तपासली जाते.',
      uploadPhoto: 'अपलोड करण्यासाठी फोटोवर क्लिक करा किंवा येथे आणा',
      aiChecking: 'फोटो मेटाडेटा आणि सत्यता तपासत आहे...',
      photoVerified: 'फोटो पुराव्याची सत्यता सत्यापित झाली',
      btnNext: 'पुढील पायरी',
      btnBack: 'मागील पायरी',
      btnSubmit: 'तक्रार नोंदवा (सबमिट करा)',
      submitting: 'अधिकृत अहवाल सादर होत आहे...',
      successTitle: 'तक्रार यशस्वीरित्या नोंदवली गेली',
      successDesc: 'तुमची तक्रार जिल्हा नोडल प्राधिकरणाकडे नोंदवण्यात आली आहे. पुढील ट्रॅकिंगसाठी तुमची तक्रार आयडी जपून ठेवा.',
      complaintIdLabel: 'युनिक तक्रार आयडी (Complaint ID)',
      trackNowBtn: 'तक्रार स्थिती ट्रॅक करा',
      valMobileReq: 'कृपया वैध १०-अंकी मोबाईल क्रमांक प्रविष्ट करा.',
      valCategoryReq: 'कृपया पायाभूत सुविधेचा प्रकार निवडा.',
      valTitleReq: 'कृपया प्रकल्पाचे किंवा ठिकाणाचे नाव प्रविष्ट करा.',
      valDescReq: 'कृपया समस्येचे सविस्तर वर्णन प्रविष्ट करा.'
    },
    track: {
      badge: 'सार्वजनिक चौकशी प्रणाली',
      title: 'तक्रारीची स्थिती ट्रॅक करा',
      subtitle: 'तपासणीची स्थिती, नियुक्त जिल्हा अधिकारी आणि निवारण वेळापत्रक पाहण्यासाठी युनिक तक्रार आयडी टाका.',
      inputPlaceholder: 'तक्रार आयडी टाका (उदा. MPL-CMP-2026-001284)',
      btnTrack: 'स्थिती ट्रॅक करा',
      sampleIds: 'नमूना आयडी:',
      statusSubmitted: 'सादर केले (Submitted)',
      statusUnderReview: 'पुनरावलोकनाधीन (Under Review)',
      statusAssigned: 'नियुक्त (Assigned)',
      statusInProgress: 'प्रगतीपथावर (In Progress)',
      statusResolved: 'निवारण झाले (Resolved)',
      statusClosed: 'बंद (Closed)',
      timelineTitle: 'निवारण ऑडिट वेळापत्रक',
      assignedAuthority: 'नियुक्त प्राधिकरण',
      notFoundTitle: 'तक्रार आढळली नाही',
      notFoundDesc: 'कृपया तुमचा तक्रार आयडी तपासा आणि पुन्हा प्रयत्न करा.',
      verifiedCitizen: 'सत्यापित नागरिक आयडी'
    },
    explore: {
      badge: 'क्षमता विहंगावलोकन',
      title: 'एमपीलॅड्स एआई मॉनिटरच्या क्षमतांचा शोध घ्या',
      subtitle: 'मुख्य मॉड्यूल्स, एआय मॉडेल, आर्थिक विश्लेषण अल्गोरिदम आणि जीआयएस साधनांचा सविस्तर तपशील.',
      filterState: 'राज्य',
      filterDistrict: 'जिल्हा',
      filterStatus: 'स्थिती',
      filterCategory: 'प्रकार',
      allStates: 'सर्व राज्ये',
      allDistricts: 'सर्व जिल्हे',
      allStatuses: 'सर्व स्थिती',
      allCategories: 'सर्व प्रकार',
      btnSearch: 'कामे शोधा',
      btnReset: 'फिल्टर रीसेट करा',
      testInDemo: 'डेमोमध्ये चाचणी करा',
      noProjectsFound: 'निवडलेल्या निकषांनुसार कोणतेही प्रकल्प आढळले नाहीत.'
    },
    about: {
      badge: 'प्लॅटफॉर्म प्रशासन आणि रचना',
      title: 'एमपीलॅड्स एआय मॉनिटरबद्दल',
      subtitle: 'एमपीलॅड्स विकास कामांमध्ये प्रत्यक्ष व आर्थिक प्रगतीचे निरीक्षण, त्रुटी ओळखणे आणि सुरक्षित नागरिक सहभाग सुलभ करणारा डिजिटल पब्लिक इन्फ्रास्ट्रक्चर प्लॅटफॉर्म.',
      objectivesTitle: 'संस्थात्मक उद्दिष्टे',
      objectivesDesc: 'प्लॅटफॉर्म इंजिनिअरिंग आणि निर्णय घेण्यास मदत करणारी मूलभूत तत्त्वे.',
      obj1Title: 'वस्तुनिष्ठ उत्तरदायित्व',
      obj1Desc: 'सर्व मतदारसंघांमध्ये सतत ऑटोमॅटिक डेटा पडताळणी आणि जीआयएस मॅपिंगद्वारे हस्तचलित तपासणीस पर्याय प्रदान करतो.',
      obj2Title: 'एआय जोखीम शोध',
      obj2Desc: 'खर्च वाढणे, कामातील विलंब, दुहेरी दावे आणि प्रत्यक्ष विरुद्ध आर्थिक तफावत स्वयंचलितपणे ओळखते.',
      obj3Title: 'नागरिक सहभाग',
      obj3Desc: 'नागरिकांची ओळख सुरक्षित ठेवून जिओटॅग केलेले पुरावे सादर करण्याची सुविधा प्रदान करतो.',
      workflowTitle: 'अनेकस्तरीय शासन कार्यपद्धती',
      workflowDesc: 'शासकीय स्तरांवर सुलभ भूमिका-आधारित सहकार्यासाठी तयार केले गेले आहे.',
      accessLoginBtn: 'अधिकृत अधिकारी लॉगिनवर जा'
    },
    howItWorks: {
      badge: 'प्लॅटफॉर्म कार्यपद्धती',
      title: 'एमपीलॅड्स एआय मॉनिटर कसे कार्य करते',
      subtitle: 'ऑटोमॅटिक डेटा संकलन, एआय जोखीम विश्लेषण, सॅटेलाईट पडताळणी आणि नागरिक अहवाल कार्यपद्धती समजून घ्या.',
      mechanismsTitle: 'मुख्य पडताळणी यंत्रणा',
      mechanismsDesc: 'ऑटोमॅटिक अल्गोरिदम आणि प्रत्यक्ष पाहणी अहवाल एकत्रीकरण.',
      mech1Title: 'प्रत्यक्ष विरुद्ध आर्थिक तफावत विश्लेषण',
      mech1Desc: 'प्रत्यक्ष पाहणीतील प्रगतीची टक्केवारी आणि जिल्हा तिजोरीने दिलेले निधी उपयुक्तता प्रमाणपत्र यांचा परस्परांशी ताळमेळ घालते.',
      mech2Title: 'दुहेरी दावा शोध प्रणाली',
      mech2Desc: 'सार्वजनिक बांधकाम (PWD), मनरेगा आणि नगरपालिका कामांच्या डेटाबेसशी ताळमेळ घालून दुहेरी निधी वाटप ओळखते.',
      mech3Title: 'पुरावा सत्यता तपासणी',
      mech3Desc: 'तक्रार वर्ग करण्यापूर्वी कॅमेरा मेटाडेटा, जीपीएस स्थान आणि फोटोची सत्यता स्वयंचलितपणे तपासली जाते.',
      mech4Title: 'गोपनीय ओळख संरक्षण',
      mech4Desc: 'नागरिक मोबाईल क्रेडेंशियल्स सुरक्षित गेटवेद्वारे सत्यापित करून एन्क्रिप्टेड टोपणनावांमध्ये बदलले जातात.',
      bannerTitle: 'तुम्ही तक्रार नोंदवण्यासाठी किंवा कमांड डॅशबोर्डवर जाण्यासाठी तयार आहात का?',
      btnReport: 'पायाभूत सुविधा समस्या नोंदवा',
      btnSignIn: 'अधिकृत साइन इन (प्रवेश)'
    },
    footer: {
      platformName: 'एमपीलॅड्स एआय मॉनिटर',
      subtitle: 'एआय-आधारित पायाभूत सुविधा देखरेख आणि उत्तरदायित्व',
      publicServices: 'नागरिक सेवा',
      citizenReport: 'समस्या नोंदवा',
      trackStatus: 'तक्रार स्थिती ट्रॅक करा',
      exploreWorks: 'कामे शोधा',
      aboutPlatform: 'प्लॅटफॉर्मबद्दल',
      howItWorks: 'हे कसे कार्य करते',
      helpFaq: 'मदत आणि वारंवार विचारलेले प्रश्न',
      quickLinks: 'जलद लिंक्स',
      roleLogin: 'अधिकृत अधिकारी लॉगिन',
      privacyPolicy: 'गोपनीयता धोरण',
      termsService: 'सेवा अटी',
      disclaimer: 'सांख्यिकी आणि कार्यक्रम अंमलबजावणी मंत्रालय प्रोटोटाइप सूचना',
      mospiRef: 'सांख्यिकी आणि कार्यक्रम अंमलबजावणी मंत्रालय (MoSPI)',
      copyright: '© 2026 एमपीलॅड्स एआय मॉनिटर • डिजिटल पब्लिक इन्फ्रास्ट्रक्चर प्रोटोटाइप'
    }
  }
};
