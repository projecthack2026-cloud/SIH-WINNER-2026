export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
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
    accessLabel: string;
  };
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
  infoStrip: {
    telemetryHeader: string;
    sampleDataLabel: string;
    projMonitored: string;
    projMonitoredSub: string;
    projRisk: string;
    projRiskSub: string;
    underReview: string;
    underReviewSub: string;
    citizenReports: string;
    citizenReportsSub: string;
  };
  problems: {
    badge: string;
    title: string;
    subtitle: string;
    delTitle: string;
    delDesc: string;
    expTitle: string;
    expDesc: string;
    costTitle: string;
    costDesc: string;
    dupTitle: string;
    dupDesc: string;
    progTitle: string;
    progDesc: string;
    defTitle: string;
    defDesc: string;
    boxTitle: string;
    boxDesc: string;
    boxBadge: string;
  };
  capabilities: {
    badge: string;
    title: string;
    subtitle: string;
    moduleTag: string;
    exploreDetails: string;
    riskTitle: string;
    riskDesc: string;
    monTitle: string;
    monDesc: string;
    finTitle: string;
    finDesc: string;
    dupTitle: string;
    dupDesc: string;
    gisTitle: string;
    gisDesc: string;
    citTitle: string;
    citDesc: string;
  };
  gisPreview: {
    badge: string;
    title: string;
    subtitle: string;
    viewMode: string;
    vectorMap: string;
    satelliteLayer: string;
    telemetryActive: string;
    spatialGrid: string;
    sentinelLayer: string;
    gisSyncOk: string;
    loadingDb: string;
    pendingGps: string;
    projectsIngested: string;
    recordDetails: string;
    projName: string;
    canonicalId: string;
    utilization: string;
    status: string;
    sanctioned: string;
    finUtil: string;
    pendingCoords: string;
  };
  aiProcess: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    flowSummary: string;
  };
  homeCta: {
    badge: string;
    title: string;
    desc: string;
    btnReport: string;
    btnTrack: string;
    safetyGuarantee: string;
  };
  categories: {
    roadLabel: string;
    roadDesc: string;
    drainLabel: string;
    drainDesc: string;
    waterLabel: string;
    waterDesc: string;
    eduLabel: string;
    eduDesc: string;
    healthLabel: string;
    healthDesc: string;
    commLabel: string;
    commDesc: string;
    pubLabel: string;
    pubDesc: string;
    elecLabel: string;
    elecDesc: string;
    sanLabel: string;
    sanDesc: string;
    othLabel: string;
    othDesc: string;
  };
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
    step1Heading: string;
    step1Subtitle: string;
    step2Heading: string;
    step2Subtitle: string;
    step3Heading: string;
    step3Subtitle: string;
    step4Heading: string;
    step4Subtitle: string;
    step5Heading: string;
    step5Subtitle: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    sendOtp: string;
    sendingOtp: string;
    otpLabel: string;
    verifyOtp: string;
    verifyingOtp: string;
    otpSuccess: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    stateLabel: string;
    selectState: string;
    districtLabel: string;
    selectDistrict: string;
    localityLabel: string;
    localityPlaceholder: string;
    landmarkLabel: string;
    landmarkPlaceholder: string;
    categoryLabel: string;
    categorySelect: string;
    workTitleLabel: string;
    workTitlePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descNotice: string;
    dateObservedLabel: string;
    isOngoingLabel: string;
    optYes: string;
    optNo: string;
    optNotSure: string;
    locationTitle: string;
    locationDesc: string;
    detectGps: string;
    detectingGps: string;
    gpsVerified: string;
    evidenceTitle: string;
    evidenceDesc: string;
    uploadPhoto: string;
    uploadDrag: string;
    uploadFormats: string;
    attachSample: string;
    inspectingFile: string;
    photoVerified: string;
    attachedEvidence: string;
    reqEvidenceAlert: string;
    btnNext: string;
    btnBack: string;
    btnSubmit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    complaintIdLabel: string;
    trackNowBtn: string;
    backHomeBtn: string;
    valMobileReq: string;
    valCategoryReq: string;
    valTitleReq: string;
    valDescReq: string;
    identityNoticeTitle: string;
    identityNoticeDesc: string;
    verifiedStatusLabel: string;
    identityProtectedLabel: string;
    anonymousIdLabel: string;
    visibleAuthorityTitle: string;
    hiddenDataTitle: string;
  };
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
    reportDetails: string;
    categoryLabel: string;
    locationLabel: string;
    submittedLabel: string;
    assignedDeskLabel: string;
    verificationSummary: string;
    identityStatusLabel: string;
    photoMetadataLabel: string;
    aiRiskLevelLabel: string;
    descriptionHeader: string;
    auditTrailHeader: string;
  };
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
  roleSelection: {
    portalHeader: string;
    pageTitle: string;
    pageSubtitle: string;
    continueBtn: string;
    securityNotice: string;
  };
  roleLogin: {
    backToRoles: string;
    portalHeader: string;
    pageTitle: string;
    authorizedOnly: string;
    emailLabel: string;
    passwordLabel: string;
    forgotPassword: string;
    captchaLabel: string;
    captchaPlaceholder: string;
    rememberDevice: string;
    signInBtn: string;
    signingIn: string;
    backToRolesBtn: string;
    securityNotice: string;
    credentialSupportTitle: string;
    credentialSupportSub: string;
    credentialSupportDesc: string;
    modalClose: string;
  };
  projectDetail: {
    backToDash: string;
    loadingText: string;
    errorText: string;
    canonicalIdLabel: string;
    mpConstituencyLabel: string;
    sanctionedAmtLabel: string;
    finUtilLabel: string;
    physicalStatusLabel: string;
    physicalDataUnavailable: string;
    geoCoordsLabel: string;
    geoDataUnavailable: string;
  };
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
      reportIssueBtn: 'Report Issue',
      accessLabel: 'Access:'
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
    infoStrip: {
      telemetryHeader: 'National Infrastructure Monitoring Telemetry',
      sampleDataLabel: 'Live System Telemetry',
      projMonitored: 'PROJECTS MONITORED',
      projMonitoredSub: 'Active Constituency Infrastructure Works',
      projRisk: 'PROJECTS AT RISK',
      projRiskSub: 'Flagged by Anomaly AI Models',
      underReview: 'UNDER REVIEW',
      underReviewSub: 'Pending District Nodal Verification',
      citizenReports: 'CITIZEN REPORTS',
      citizenReportsSub: 'Verified Anonymous Complaints'
    },
    problems: {
      badge: 'Public Oversight Objective',
      title: 'Key Infrastructure Anomalies Addressed',
      subtitle: 'Automated intelligence assists district officers and representatives in early risk identification.',
      delTitle: 'Project Delays',
      delDesc: 'Detects works lagging far behind approved completion timelines before funds stall.',
      expTitle: 'Unusual Expenditure Patterns',
      expDesc: 'Flags suspicious lump-sum disbursements without corresponding physical progress on ground.',
      costTitle: 'Cost Overruns',
      costDesc: 'Monitors financial deviations exceeding sanctioned budgets and alerts nodal authorities.',
      dupTitle: 'Potential Duplicate Works',
      dupDesc: 'Cross-checks project proposals against state/municipal databases to prevent double-funding.',
      progTitle: 'Progress Anomalies',
      progDesc: 'Compares satellite elevation and drone evidence against reported physical progress claims.',
      defTitle: 'Infrastructure Defects',
      defDesc: 'Channels direct evidence from citizens on roads, drains, water, and public facilities.',
      boxTitle: 'Empowering MPs, District Authorities & Citizens Alike',
      boxDesc: 'AI acts as an objective decision-support tool highlighting high-priority works needing physical audit.',
      boxBadge: 'Audited & Accountable Workflow'
    },
    capabilities: {
      badge: 'Platform Capabilities',
      title: 'Key Monitoring & Transparency Tools',
      subtitle: 'Integrated AI and GIS oversight tools designed for administrative transparency, fraud prevention, and public service accountability.',
      moduleTag: 'MODULE',
      exploreDetails: 'Explore Module Details',
      riskTitle: 'AI Risk Detection',
      riskDesc: 'Predictive risk scoring models analyze physical progress vs. financial utilization to flag delay and compliance concerns.',
      monTitle: 'Project Monitoring',
      monDesc: 'End-to-end milestone tracking across all constituency works with standardized status reporting and audit trails.',
      finTitle: 'Financial Intelligence',
      finDesc: 'Automated tracking of fund recommendations, sanction releases, and expenditure utilization certificates.',
      dupTitle: 'Duplicate & Irregular Work Detection',
      dupDesc: 'Geospatial and text similarity algorithms flag overlapping or duplicate works claimed across adjacent schemes.',
      gisTitle: 'Digital Twin & Geospatial Monitoring',
      gisDesc: 'High-resolution Sentinel satellite imagery cross-referenced with geotagged site photographs for physical verification.',
      citTitle: 'Citizen Reporting',
      citDesc: 'Secure citizen grievance reporting with identity protection and automated evidence authenticity evaluation.'
    },
    gisPreview: {
      badge: 'GIS Oversight Engine',
      title: 'Digital Infrastructure Monitoring',
      subtitle: 'Live database telemetry and project record oversight.',
      viewMode: 'View Mode:',
      vectorMap: 'Vector GIS Map',
      satelliteLayer: 'Satellite Layer',
      telemetryActive: 'Digital Twin Telemetry: ACTIVE',
      spatialGrid: 'National Spatial Grid',
      sentinelLayer: 'Sentinel-2 Layer',
      gisSyncOk: 'GIS Sync: OK',
      loadingDb: 'Loading live project records from database...',
      pendingGps: 'Coordinates Pending Ground Verification',
      projectsIngested: 'Projects Ingested',
      recordDetails: 'PROJECT RECORD DETAILS',
      projName: 'PROJECT NAME:',
      canonicalId: 'CANONICAL ID:',
      utilization: 'UTILIZATION:',
      status: 'STATUS:',
      sanctioned: 'SANCTIONED:',
      finUtil: 'Financial Utilization',
      pendingCoords: 'Geospatial coordinates & satellite verification status: pending ground connection.'
    },
    aiProcess: {
      badge: 'Process Diagram',
      title: 'AI Oversight Process',
      subtitle: '5-stage automated intelligence flow for public infrastructure monitoring.',
      step1Title: 'DATA COLLECTION',
      step1Desc: 'Physical progress records, financial allocation entries, geotagged photos, and satellite imagery ingested.',
      step2Title: 'AI ANALYSIS',
      step2Desc: 'Machine learning algorithms cross-evaluate financial burn rates against physical execution milestones.',
      step3Title: 'VERIFICATION',
      step3Desc: 'Satellite EXIF metadata and spatial coordinates cross-checked against municipal master databases.',
      step4Title: 'RISK IDENTIFICATION',
      step4Desc: 'Projects assigned automated risk scores (Low, Medium, High) based on anomaly severity.',
      step5Title: 'AUTHORITY ACTION',
      step5Desc: 'Flagged reports routed to District Nodal Officers for targeted site audits and enforcement.',
      flowSummary: '01 DATA COLLECTION → 02 AI ANALYSIS → 03 VERIFICATION → 04 RISK IDENTIFICATION → 05 AUTHORITY ACTION'
    },
    homeCta: {
      badge: 'Identity Protected',
      title: 'See an Infrastructure Problem?',
      desc: 'Report damaged, incomplete, delayed or improperly executed public infrastructure work.',
      btnReport: 'REPORT AN ISSUE',
      btnTrack: 'Track Complaint',
      safetyGuarantee: 'Identity Safety Guarantee: Verified citizen reporting keeps user identity protected.'
    },
    categories: {
      roadLabel: 'Road / Street',
      roadDesc: 'Potholes, broken paving, incomplete asphalt, missing culverts',
      drainLabel: 'Drainage',
      drainDesc: 'Open drains, blocked storm culverts, flooding hazards',
      waterLabel: 'Water Supply',
      waterDesc: 'Broken borewells, leaks, overhead tanks, pipeline delay',
      eduLabel: 'Education Facility',
      eduDesc: 'School classrooms, roofs, toilets, digital lab delay',
      healthLabel: 'Healthcare Center',
      healthDesc: 'Primary health center building, diagnostic equipment work',
      commLabel: 'Community Hall',
      commDesc: 'Panchayat hall, library, Anganwadi building defect',
      pubLabel: 'Public Facility',
      pubDesc: 'Bus stop shelter, parks, public toilet infrastructure',
      elecLabel: 'Electricity / Lighting',
      elecDesc: 'Solar streetlights, transformer platform, cabling',
      sanLabel: 'Sanitation',
      sanDesc: 'Waste collection point, public sanitation unit',
      othLabel: 'Other Infrastructure',
      othDesc: 'Any other MPLADS funded community development work'
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
      step1Heading: 'Select Infrastructure Issue Category *',
      step1Subtitle: 'Choose the infrastructure category that best describes the reported problem.',
      step2Heading: 'Location Details',
      step2Subtitle: 'Specify the state, district, and locality where the infrastructure issue is situated.',
      step3Heading: 'Issue Description & Timeline',
      step3Subtitle: 'Provide detailed information regarding the defect, delay, or improper execution observed.',
      step4Heading: 'Identity Protection & Citizen Verification',
      step4Subtitle: 'Your identity is verified separately and is not exposed to the authority handling the complaint.',
      step5Heading: 'UPLOAD SUPPORTING EVIDENCE',
      step5Subtitle: 'Upload a clear photograph of the reported issue. Accepted formats: JPG / PNG up to 15MB.',
      mobileLabel: 'Mobile Number for Verification *',
      mobilePlaceholder: 'Enter 10-digit mobile number',
      sendOtp: 'Send Verification OTP',
      sendingOtp: 'Sending OTP...',
      otpLabel: 'Enter 4-Digit Verification OTP * (Demo Code: 1234)',
      verifyOtp: 'Confirm Verification & Mask Identity',
      verifyingOtp: 'Verifying Identity...',
      otpSuccess: 'Mobile number verified successfully',
      fullNameLabel: 'Full Name (Optional)',
      fullNamePlaceholder: 'Enter full name',
      stateLabel: 'State / Union Territory *',
      selectState: '-- Select State --',
      districtLabel: 'District *',
      selectDistrict: '-- Select District --',
      localityLabel: 'Locality / Village / Ward Name *',
      localityPlaceholder: 'e.g. Sector 4, Near Primary Health Center',
      landmarkLabel: 'Nearby Landmark (Optional)',
      landmarkPlaceholder: 'e.g. Opposite Panchayat Office',
      categoryLabel: 'Infrastructure Category *',
      categorySelect: 'Select Work Category',
      workTitleLabel: 'Project Title / Location Name *',
      workTitlePlaceholder: 'e.g. Community Center Roof Leakage, Road Potholes',
      descriptionLabel: 'Problem Description *',
      descriptionPlaceholder: 'Describe what is incomplete, damaged, delayed, or improper. Include details regarding structural condition or timeline stalls.',
      descNotice: 'Provide accurate details for nodal review.',
      dateObservedLabel: 'Date First Observed *',
      isOngoingLabel: 'Is the issue currently ongoing? *',
      optYes: 'Yes',
      optNo: 'No',
      optNotSure: 'Not Sure',
      locationTitle: 'GPS Coordinates Capture',
      locationDesc: 'Optionally capture GPS coordinates to pin the issue precisely.',
      detectGps: 'Use My Location',
      detectingGps: 'Locating...',
      gpsVerified: 'GPS Location Verified',
      evidenceTitle: 'Photo & Document Evidence',
      evidenceDesc: 'Upload photo evidence of the site defect. Photos are automatically scanned for authenticity.',
      uploadPhoto: 'Click or drag files here to upload evidence',
      uploadDrag: 'Click or drag files here to upload evidence',
      uploadFormats: 'Accepted formats: JPG / PNG / WEBP up to 15MB',
      attachSample: 'Attach Sample Photo (Quick Demo)',
      inspectingFile: 'Inspecting File...',
      photoVerified: 'Photo Evidence Authenticity Verified',
      attachedEvidence: 'Attached Evidence',
      reqEvidenceAlert: 'At least 1 supporting photo or video evidence file is required.',
      btnNext: 'Next Step',
      btnBack: 'Previous Step',
      btnSubmit: 'Submit Grievance',
      submitting: 'Submitting Official Report...',
      successTitle: 'Grievance Submitted Successfully',
      successDesc: 'Your complaint has been logged with the District Nodal Authority. Keep your Complaint ID safe for tracking.',
      complaintIdLabel: 'Unique Complaint ID',
      trackNowBtn: 'Track Complaint Status',
      backHomeBtn: 'Back to Home Page',
      valMobileReq: 'Please enter a valid 10-digit mobile number.',
      valCategoryReq: 'Please select an infrastructure category.',
      valTitleReq: 'Please enter a project title or location name.',
      valDescReq: 'Please provide a detailed description of the issue.',
      identityNoticeTitle: 'Identity Protection Notice',
      identityNoticeDesc: 'Your phone number is used strictly to verify citizen authenticity. It is encrypted in isolation and will NEVER be shared with District Authorities.',
      verifiedStatusLabel: 'VERIFIED',
      identityProtectedLabel: 'PROTECTED',
      anonymousIdLabel: 'Anonymous ID',
      visibleAuthorityTitle: 'Visible to Authority:',
      hiddenDataTitle: 'Protected / Hidden Data:'
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
      verifiedCitizen: 'Verified Citizen ID',
      reportDetails: 'Report Details',
      categoryLabel: 'Category:',
      locationLabel: 'Location:',
      submittedLabel: 'Submitted:',
      assignedDeskLabel: 'Assigned Desk:',
      verificationSummary: 'Verification Summary',
      identityStatusLabel: 'Identity Status:',
      photoMetadataLabel: 'Photo Metadata:',
      aiRiskLevelLabel: 'AI Risk Level:',
      descriptionHeader: 'Submitted Problem Description',
      auditTrailHeader: 'Audit Trail & Action History'
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
    roleSelection: {
      portalHeader: 'MPLADS AI Monitor • Official Portal',
      pageTitle: 'Secure Official Stakeholder Login',
      pageSubtitle: 'Select your administrative or official role below to proceed to the secure credential login portal.',
      continueBtn: 'Continue to Login Form',
      securityNotice: 'Security Notice: Authorized official access log recorded & monitored.'
    },
    roleLogin: {
      backToRoles: 'Back to Role Selection',
      portalHeader: 'MPLADS AI Monitor • Official Portal',
      pageTitle: 'Secure Official Login',
      authorizedOnly: 'Authorized personnel only —',
      emailLabel: 'Official Email / ID *',
      passwordLabel: 'Password *',
      forgotPassword: 'Forgot Password?',
      captchaLabel: 'Security Check (Captcha) *',
      captchaPlaceholder: 'Enter code',
      rememberDevice: 'Remember this device for official session',
      signInBtn: 'SIGN IN',
      signingIn: 'Authenticating Officer...',
      backToRolesBtn: 'BACK TO ROLE SELECTION',
      securityNotice: 'Security Notice: Authorized official access log recorded & monitored.',
      credentialSupportTitle: 'Credential Support',
      credentialSupportSub: 'Official Officer Recovery',
      credentialSupportDesc: 'To reset credentials for official ID, please submit a token request to your State Nodal Administrator or Ministry IT Nodal Desk.',
      modalClose: 'Close'
    },
    projectDetail: {
      backToDash: 'Back to Dashboard',
      loadingText: 'Loading project details from PostgreSQL database...',
      errorText: 'Unable to load project details from database.',
      canonicalIdLabel: 'Canonical ID:',
      mpConstituencyLabel: 'MP & Constituency',
      sanctionedAmtLabel: 'Sanctioned Amount',
      finUtilLabel: 'Financial Utilization',
      physicalStatusLabel: 'Physical Progress Status',
      physicalDataUnavailable: 'Physical progress data unavailable',
      geoCoordsLabel: 'Geospatial Coordinates',
      geoDataUnavailable: 'Location coordinates unavailable'
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
      reportIssueBtn: 'समस्या दर्ज करें',
      accessLabel: 'अभिगम (Access):'
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
    infoStrip: {
      telemetryHeader: 'राष्ट्रीय अवसंरचना निगरानी टेलीमेट्री',
      sampleDataLabel: 'लाइव सिस्टम टेलीमेट्री',
      projMonitored: 'निगरानी की जा रही परियोजनाएं',
      projMonitoredSub: 'सक्रिय संसदीय क्षेत्र अवसंरचना कार्य',
      projRisk: 'जोखिम वाली परियोजनाएं',
      projRiskSub: 'एआई मॉडल द्वारा चिन्हित विसंगतियां',
      underReview: 'समीक्षाधीन',
      underReviewSub: 'जिला नोडल सत्यापन के लिए लंबित',
      citizenReports: 'नागरिक शिकायतें',
      citizenReportsSub: 'सत्यापित गुप्त शिकायतें'
    },
    problems: {
      badge: 'सार्वजनिक निगरानी उद्देश्य',
      title: 'प्रमुख अवसंरचना विसंगतियों का समाधान',
      subtitle: 'स्वचालित इंटेलिजेंस जिला अधिकारियों और प्रतिनिधियों को प्रारंभिक जोखिम पहचान में सहायता करती है।',
      delTitle: 'परियोजना में देरी',
      delDesc: 'स्वीकृत पूर्णता समय-सीमा से पीछे चल रहे कार्यों की पहचान करता है।',
      expTitle: 'असामान्य व्यय पैटर्न',
      expDesc: 'ज़मीनी प्रगति के बिना संदिग्ध एकमुश्त भुगतानों को चिन्हित करता है।',
      costTitle: 'लागत वृद्धि',
      costDesc: 'स्वीकृत बजट से अधिक वित्तीय विचलन पर नज़र रखता है और चेतावनी देता है।',
      dupTitle: 'संभावित डुप्लिकेट कार्य',
      dupDesc: 'दोहरे वित्तपोषण को रोकने के लिए राज्य/नगरपालिका डेटाबेस से मिलान करता है।',
      progTitle: 'प्रगति विसंगतियां',
      progDesc: 'दावों के विरुद्ध उपग्रह ऊंचाई और ड्रोन साक्ष्यों की तुलना करता है।',
      defTitle: 'बुनियादी ढांचे की खराबी',
      defDesc: 'सड़कों, नालियों, पानी और सार्वजनिक सुविधाओं पर नागरिकों से साक्ष्य प्राप्त करता है।',
      boxTitle: 'सांसदों, जिला अधिकारियों और नागरिकों को सशक्त बनाना',
      boxDesc: 'एआई एक वस्तुनिष्ठ निर्णय-समर्थन उपकरण के रूप में कार्य करता है।',
      boxBadge: 'लेखापरीक्षित व जवाबदेह कार्यप्रवाह'
    },
    capabilities: {
      badge: 'मंच क्षमताएं',
      title: 'मुख्य निगरानी और पारदर्शिता उपकरण',
      subtitle: 'प्रशासनिक पारदर्शिता, धोखाधड़ी रोकथाम और जवाबदेही के लिए डिज़ाइन किए गए एआई व जीआईएस उपकरण।',
      moduleTag: 'मॉड्यूल',
      exploreDetails: 'मॉड्यूल विवरण देखें',
      riskTitle: 'एआई जोखिम पहचान',
      riskDesc: 'पूर्वानुमानित जोखिम स्कोरिंग मॉडल भौतिक प्रगति बनाम वित्तीय उपयोग का विश्लेषण करते हैं।',
      monTitle: 'परियोजना निगरानी',
      monDesc: 'मानकीकृत स्थिति रिपोर्टिंग और ऑडिट ट्रेल के साथ सभी संसदीय कार्यों की ट्रैकिंग।',
      finTitle: 'वित्तीय इंटेलिजेंस',
      finDesc: 'निधि अनुशंसाओं, स्वीकृति जारी करने और व्यय उपयोग प्रमाणपत्रों की स्वचालित ट्रैकिंग।',
      dupTitle: 'डुप्लिकेट कार्य पहचान',
      dupDesc: 'स्थानिक और पाठ समानता एल्गोरिदम दोहरे दावों को चिन्हित करते हैं।',
      gisTitle: 'डिजिटल ट्विन व जीआईएस निगरानी',
      gisDesc: 'भौतिक सत्यापन के लिए उच्च-रिज़ॉल्यूशन सेंटिनल उपग्रह छवियों का मिलान।',
      citTitle: 'नागरिक रिपोर्टिंग',
      citDesc: 'पहचान सुरक्षा और स्वचालित साक्ष्य प्रामाणिकता के साथ सुरक्षित शिकायत रिपोर्टिंग।'
    },
    gisPreview: {
      badge: 'जीआईएस ओवरसाइट इंजन',
      title: 'डिजिटल अवसंरचना निगरानी',
      subtitle: 'लाइव डेटाबेस टेलीमेट्री और परियोजना रिकॉर्ड ओवरसाइट।',
      viewMode: 'व्यू मोड:',
      vectorMap: 'वेक्टर जीआईएस मैप',
      satelliteLayer: 'उपग्रह परत (Satellite)',
      telemetryActive: 'डिजिटल ट्विन टेलीमेट्री: सक्रिय',
      spatialGrid: 'राष्ट्रीय स्थानिक ग्रिड',
      sentinelLayer: 'सेंटिनल-2 उपग्रह परत',
      gisSyncOk: 'जीआईएस सिंक: ओके',
      loadingDb: 'डेटाबेस से लाइव परियोजना रिकॉर्ड लोड हो रहे हैं...',
      pendingGps: 'ग्राउंड सत्यापन के लिए निर्देशांक लंबित हैं',
      projectsIngested: 'शामिल की गई परियोजनाएं',
      recordDetails: 'परियोजना रिकॉर्ड विवरण',
      projName: 'परियोजना का नाम:',
      canonicalId: 'आईडी (Canonical ID):',
      utilization: 'उपयोगिता (Utilization):',
      status: 'स्थिति:',
      sanctioned: 'स्वीकृत राशि:',
      finUtil: 'वित्तीय उपयोगिता',
      pendingCoords: 'जियोस्पेशियल निर्देशांक और उपग्रह सत्यापन स्थिति लंबित है।'
    },
    aiProcess: {
      badge: 'प्रक्रिया आरेख',
      title: 'एआई निगरानी प्रक्रिया',
      subtitle: 'सार्वजनिक अवसंरचना निगरानी के लिए 5-स्तरीय स्वचालित प्रक्रिया।',
      step1Title: 'डेटा संग्रह',
      step1Desc: 'भौतिक प्रगति रिकॉर्ड, वित्तीय आवंटन, जियोटैग की गई तस्वीरें और उपग्रह चित्र शामिल।',
      step2Title: 'एआई विश्लेषण',
      step2Desc: 'मशीन लर्निंग एल्गोरिदम वित्तीय दरों का भौतिक मील के पत्थरों से मिलान करते हैं।',
      step3Title: 'सत्यापन',
      step3Desc: 'उपग्रह मेटाडेटा और निर्देशांकों का नगरपालिका डेटाबेस से सत्यापन।',
      step4Title: 'जोखिम पहचान',
      step4Desc: 'गंभीरता के आधार पर स्वचालित जोखिम स्कोर (निम्न, मध्यम, उच्च) आवंटित।',
      step5Title: 'प्राधिकरण कार्रवाई',
      step5Desc: 'लक्षित ऑडिट और प्रवर्तन के लिए जिला अधिकारियों को रिपोर्ट भेजी जाती है।',
      flowSummary: '01 डेटा संग्रह → 02 एआई विश्लेषण → 03 सत्यापन → 04 जोखिम पहचान → 05 प्राधिकरण कार्रवाई'
    },
    homeCta: {
      badge: 'पहचान सुरक्षित',
      title: 'क्या बुनियादी ढांचे में कोई समस्या दिख रही है?',
      desc: 'क्षतिग्रस्त, अधूरी, विलंबित या घटिया सार्वजनिक अवसंरचना कार्य की रिपोर्ट दर्ज करें।',
      btnReport: 'समस्या की रिपोर्ट करें',
      btnTrack: 'शिकायत ट्रैक करें',
      safetyGuarantee: 'सुरक्षा गारंटी: सत्यापित नागरिक रिपोर्टिंग आपकी पहचान सुरक्षित रखती है।'
    },
    categories: {
      roadLabel: 'सड़क / मार्ग',
      roadDesc: 'गड्ढे, टूटी फुटपाथ, अधूरी डामर सड़क, गायब पुलिया',
      drainLabel: 'जल निकासी (नाली)',
      drainDesc: 'खुली नालियां, बंद नाले, जलभराव की समस्या',
      waterLabel: 'जल आपूर्ति',
      waterDesc: 'टूटे बोरवेल, रिसाव, ओवरहेड टैंक, पाइपलाइन में देरी',
      eduLabel: 'शिक्षा सुविधा',
      eduDesc: 'स्कूल के कमरे, छत, शौचालय, डिजिटल लैब में देरी',
      healthLabel: 'स्वास्थ्य केंद्र',
      healthDesc: 'प्राथमिक स्वास्थ्य केंद्र भवन, नैदानिक उपकरण कार्य',
      commLabel: 'सामुदायिक भवन',
      commDesc: 'पंचायत भवन, पुस्तकालय, आंगनवाड़ी भवन में खराबी',
      pubLabel: 'सार्वजनिक सुविधा',
      pubDesc: 'बस स्टॉप शेल्टर, पार्क, सार्वजनिक शौचालय इंफ्रास्ट्रक्चर',
      elecLabel: 'बिजली / प्रकाश व्यवस्था',
      elecDesc: 'सौर स्ट्रीटलाइट्स, ट्रांसफार्मर प्लेटफॉर्म, केबल बिछाना',
      sanLabel: 'स्वच्छता',
      sanDesc: 'कचरा संग्रहण बिंदु, सार्वजनिक स्वच्छता इकाई',
      othLabel: 'अन्य अवसंरचना',
      othDesc: 'एमपीलैड्स द्वारा वित्तपोषित कोई अन्य सामुदायिक विकास कार्य'
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
      step1Heading: 'बुनियादी ढांचा समस्या श्रेणी चुनें *',
      step1Subtitle: 'रिपोर्ट की गई समस्या का सर्वोत्तम वर्णन करने वाली श्रेणी चुनें।',
      step2Heading: 'स्थान का विवरण',
      step2Subtitle: 'वह राज्य, जिला और क्षेत्र निर्दिष्ट करें जहाँ समस्या स्थित है।',
      step3Heading: 'समस्या का विवरण और समयरेखा',
      step3Subtitle: 'देखे गए दोष, देरी या अनुचित निष्पादन के बारे में विस्तृत जानकारी दें।',
      step4Heading: 'पहचान सुरक्षा और नागरिक सत्यापन',
      step4Subtitle: 'आपकी पहचान अलग से सत्यापित की जाती है और अधिकारी के सामने प्रकट नहीं होती।',
      step5Heading: 'सहायक साक्ष्य अपलोड करें',
      step5Subtitle: 'समस्या की एक स्पष्ट तस्वीर अपलोड करें। स्वीकृत प्रारूप: JPG / PNG (15MB तक)।',
      mobileLabel: 'सत्यापन के लिए मोबाइल नंबर *',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      sendOtp: 'ओटीपी भेजें',
      sendingOtp: 'ओटीपी भेजा जा रहा है...',
      otpLabel: '4-अंकीय ओटीपी दर्ज करें * (डेमो कोड: 1234)',
      verifyOtp: 'सत्यापन की पुष्टि करें और पहचान सुरक्षित करें',
      verifyingOtp: 'पहचान सत्यापित हो रही है...',
      otpSuccess: 'मोबाइल नंबर सफलतापूर्वक सत्यापित',
      fullNameLabel: 'पूरा नाम (वैकल्पिक)',
      fullNamePlaceholder: 'पूरा नाम दर्ज करें',
      stateLabel: 'राज्य / केंद्र शासित प्रदेश *',
      selectState: '-- राज्य चुनें --',
      districtLabel: 'जिला *',
      selectDistrict: '-- जिला चुनें --',
      localityLabel: 'क्षेत्र / गाँव / वार्ड का नाम *',
      localityPlaceholder: 'उदा. सेक्टर 4, प्राथमिक स्वास्थ्य केंद्र के पास',
      landmarkLabel: 'निकटतम मील का पत्थर (वैकल्पिक)',
      landmarkPlaceholder: 'उदा. पंचायत कार्यालय के सामने',
      categoryLabel: 'बुनियादी ढांचा श्रेणी *',
      categorySelect: 'कार्य श्रेणी चुनें',
      workTitleLabel: 'परियोजना का नाम / स्थान का नाम *',
      workTitlePlaceholder: 'उदा. सामुदायिक भवन छत का रिसाव, सड़क के गड्ढे',
      descriptionLabel: 'समस्या का विस्तृत विवरण *',
      descriptionPlaceholder: 'बुनियादी ढांचे की खराबी, देरी या क्षति का विस्तार से वर्णन करें...',
      descNotice: 'समीक्षा के लिए सटीक विवरण प्रदान करें।',
      dateObservedLabel: 'समस्या पहली बार कब देखी गई? *',
      isOngoingLabel: 'क्या यह समस्या वर्तमान में जारी है? *',
      optYes: 'हाँ',
      optNo: 'नहीं',
      optNotSure: 'पक्का नहीं पता',
      locationTitle: 'जीपीएस निर्देशांक कैप्चर',
      locationDesc: 'सटीक स्थान तय करने के लिए जीपीएस निर्देशांक कैप्चर करें।',
      detectGps: 'मेरे स्थान का उपयोग करें',
      detectingGps: 'स्थान खोजा जा रहा है...',
      gpsVerified: 'जीपीएस स्थान सत्यापित',
      evidenceTitle: 'फोटो व दस्तावेज साक्ष्य',
      evidenceDesc: 'साइट की समस्या की फोटो अपलोड करें। तस्वीरें स्वचालित स्कैन होती हैं।',
      uploadPhoto: 'साक्ष्य अपलोड करने के लिए फ़ाइलें यहाँ क्लिक करें या खींचें',
      uploadDrag: 'साक्ष्य अपलोड करने के लिए फ़ाइलें यहाँ क्लिक करें या खींचें',
      uploadFormats: 'स्वीकृत प्रारूप: JPG / PNG / WEBP (15MB तक)',
      attachSample: 'नमूना फोटो संलग्न करें (त्वरित डेमो)',
      inspectingFile: 'फ़ाइल की जांच हो रही है...',
      photoVerified: 'फोटो साक्ष्य की प्रामाणिकता सत्यापित',
      attachedEvidence: 'संलग्न साक्ष्य',
      reqEvidenceAlert: 'कम से कम 1 सहायक फोटो या वीडियो फ़ाइल आवश्यक है।',
      btnNext: 'अगला चरण',
      btnBack: 'पिछला चरण',
      btnSubmit: 'शिकायत दर्ज करें',
      submitting: 'आधिकारिक रिपोर्ट सबमिट हो रही है...',
      successTitle: 'शिकायत सफलतापूर्वक दर्ज की गई',
      successDesc: 'आपकी शिकायत जिला नोडल प्राधिकरण के पास पंजीकृत हो गई है। ट्रैकिंग के लिए अपनी शिकायत आईडी सुरक्षित रखें।',
      complaintIdLabel: 'विशेष शिकायत आईडी (Complaint ID)',
      trackNowBtn: 'शिकायत की स्थिति ट्रैक करें',
      backHomeBtn: 'मुख्य पृष्ठ पर लौटें',
      valMobileReq: 'कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।',
      valCategoryReq: 'कृपया एक बुनियादी ढांचा श्रेणी चुनें।',
      valTitleReq: 'कृपया परियोजना का नाम या स्थान दर्ज करें।',
      valDescReq: 'कृपया समस्या का विस्तृत विवरण प्रदान करें।',
      identityNoticeTitle: 'पहचान सुरक्षा सूचना',
      identityNoticeDesc: 'आपका फोन नंबर केवल प्रामाणिकता सत्यापित करने के लिए उपयोग किया जाता है। यह एन्क्रिप्टेड है और अधिकारियों से साझा नहीं किया जाएगा।',
      verifiedStatusLabel: 'सत्यापित',
      identityProtectedLabel: 'सुरक्षित',
      anonymousIdLabel: 'गुप्त आईडी',
      visibleAuthorityTitle: 'प्राधिकरण को दिखाई देने वाला डेटा:',
      hiddenDataTitle: 'सुरक्षित / छिपा हुआ डेटा:'
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
      verifiedCitizen: 'सत्यापित नागरिक आईडी',
      reportDetails: 'रिपोर्ट विवरण',
      categoryLabel: 'श्रेणी:',
      locationLabel: 'स्थान:',
      submittedLabel: 'सबमिट तिथि:',
      assignedDeskLabel: 'आवंटित डेस्क:',
      verificationSummary: 'सत्यापन सारांश',
      identityStatusLabel: 'पहचान स्थिति:',
      photoMetadataLabel: 'फोटो मेटाडेटा:',
      aiRiskLevelLabel: 'एआई जोखिम स्तर:',
      descriptionHeader: 'प्रस्तुत समस्या का विवरण',
      auditTrailHeader: 'ऑडिट ट्रेल और कार्रवाई इतिहास'
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
    roleSelection: {
      portalHeader: 'एमपीलैड्स एआई मॉनिटर • आधिकारिक पोर्टल',
      pageTitle: 'सुरक्षित आधिकारिक हितधारक लॉगिन',
      pageSubtitle: 'सुरक्षित क्रेडेंशियल लॉगिन पोर्टल पर जाने के लिए नीचे अपनी प्रशासनिक भूमिका चुनें।',
      continueBtn: 'लॉगिन फॉर्म पर आगे बढ़ें',
      securityNotice: 'सुरक्षा सूचना: अधिकृत अधिकारी पहुंच लॉग रिकॉर्ड और निगरानी की जाती है।'
    },
    roleLogin: {
      backToRoles: 'भूमिका चयन पर वापस जाएं',
      portalHeader: 'एमपीलैड्स एआई मॉनिटर • आधिकारिक पोर्टल',
      pageTitle: 'सुरक्षित आधिकारिक लॉगिन',
      authorizedOnly: 'केवल अधिकृत कर्मियों के लिए —',
      emailLabel: 'आधिकारिक ईमेल / आईडी *',
      passwordLabel: 'पासवर्ड *',
      forgotPassword: 'पासवर्ड भूल गए?',
      captchaLabel: 'सुरक्षा जांच (कैप्चा) *',
      captchaPlaceholder: 'कोड दर्ज करें',
      rememberDevice: 'आधिकारिक सत्र के लिए इस डिवाइस को याद रखें',
      signInBtn: 'साइन इन करें',
      signingIn: 'अधिकारी का सत्यापन हो रहा है...',
      backToRolesBtn: 'भूमिका चयन पर वापस जाएं',
      securityNotice: 'सुरक्षा सूचना: अधिकृत अधिकारी पहुंच लॉग रिकॉर्ड और निगरानी की जाती है।',
      credentialSupportTitle: 'क्रेडेंशियल सहायता',
      credentialSupportSub: 'आधिकारिक अधिकारी पुनर्प्राप्ति',
      credentialSupportDesc: 'आधिकारिक आईडी के लिए क्रेडेंशियल रीसेट करने के लिए, कृपया अपने राज्य नोडल प्रशासक को एक टोकन अनुरोध सबमिट करें।',
      modalClose: 'बंद करें'
    },
    projectDetail: {
      backToDash: 'डैशबोर्ड पर वापस जाएं',
      loadingText: 'डेटाबेस से परियोजना विवरण लोड हो रहे हैं...',
      errorText: 'डेटाबेस से परियोजना विवरण लोड करने में असमर्थ।',
      canonicalIdLabel: 'कैनोनिकल आईडी:',
      mpConstituencyLabel: 'सांसद व संसदीय क्षेत्र',
      sanctionedAmtLabel: 'स्वीकृत राशि',
      finUtilLabel: 'वित्तीय उपयोगिता',
      physicalStatusLabel: 'भौतिक प्रगति स्थिति',
      physicalDataUnavailable: 'भौतिक प्रगति डेटा अनुपलब्ध है',
      geoCoordsLabel: 'जियोस्पेशियल निर्देशांक',
      geoDataUnavailable: 'स्थान निर्देशांक अनुपलब्ध हैं'
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
      reportIssueBtn: 'समस्या नोंदवा',
      accessLabel: 'अॅक्सेस (Access):'
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
    infoStrip: {
      telemetryHeader: 'राष्ट्रीय पायाभूत सुविधा देखरेख टेलिमेट्री',
      sampleDataLabel: 'थेट सिस्टीम टेलिमेट्री',
      projMonitored: 'देखरेख खालील प्रकल्प',
      projMonitoredSub: 'सक्रिय मतदारसंघातील पायाभूत सुविधांची कामे',
      projRisk: 'जोखीम असलेले प्रकल्प',
      projRiskSub: 'एआय मॉडेल्सद्वारे ध्वजंकित त्रुटी',
      underReview: 'पुनरावलोकनाधीन',
      underReviewSub: 'जिल्हा नोडल पडताळणीसाठी प्रलंबित',
      citizenReports: 'नागरिक तक्रारी',
      citizenReportsSub: 'सत्यापित निनावी तक्रारी'
    },
    problems: {
      badge: 'सार्वजनिक सनियंत्रण उद्दिष्ट',
      title: 'पायाभूत सुविधेतील मुख्य त्रुटींचे निवारण',
      subtitle: 'ऑटोमॅटिक इंटेलिजन्स जिल्हा अधिकारी व प्रतिनिधींना सुरुवातीच्या टप्प्यात जोखीम ओळखण्यास मदत करते.',
      delTitle: 'प्रकल्पातील विलंब',
      delDesc: 'मंजूर पूर्णतेच्या वेळेपेक्षा मागे असलेल्या कामांची वेळेवर ओळख करते.',
      expTitle: 'असामान्य खर्च पद्धती',
      expDesc: 'प्रत्यक्ष प्रगतीशिवाय संशयास्पद एकरकमी निधी वाटपावर लक्ष ठेवते.',
      costTitle: 'खर्च वाढणे',
      costDesc: 'मंजूर बजेटपेक्षा जास्त होणाऱ्या खर्चाबाबत नोडल अधिकाऱ्यांना सतर्क करते.',
      dupTitle: 'संभाव्य दुहेरी कामे',
      dupDesc: 'दुहेरी निधी वाटप रोखण्यासाठी इतर योजनांच्या डेटाबेसशी जुळवून पाहते.',
      progTitle: 'प्रगतीतील तफावत',
      progDesc: 'दाव्यांच्या तुलनेत उपग्रह प्रतिमा आणि ड्रोन पुराव्यांची तपासणी करते.',
      defTitle: 'पायाभूत सुविधांमधील त्रुटी',
      defDesc: 'रस्ते, गटारे, पाणी व सार्वजनिक सुविधांवरील नागरिकांचे पुरावे थेट संकलित करते.',
      boxTitle: 'खासदार, जिल्हा अधिकारी आणि नागरिकांना सक्षम बनवणे',
      boxDesc: 'एआय वस्तुनिष्ठ निर्णय घेण्यास मदत करणारे साधन म्हणून कार्य करते.',
      boxBadge: 'ऑडिट केलेले व उत्तरदायी कार्यप्रवाह'
    },
    capabilities: {
      badge: 'प्लॅटफॉर्म क्षमता',
      title: 'मुख्य देखरेख आणि पारदर्शकता साधने',
      subtitle: 'प्रशासकीय पारदर्शकता, गैरव्यवहार रोखणे आणि उत्तरदायित्वासाठी तयार केलेली एआय व जीआयएस साधने.',
      moduleTag: 'मॉड्यूल',
      exploreDetails: 'मॉड्यूल तपशील पहा',
      riskTitle: 'एआय जोखीम शोध',
      riskDesc: 'प्रत्यक्ष प्रगती विरुद्ध आर्थिक निधी वापराचे विश्लेषण करणारे मॉडेल.',
      monTitle: 'प्रकल्प सनियंत्रण',
      monDesc: 'प्रकल्पाच्या प्रगतीची आणि ऑडिट ट्रेलची टप्प्याटप्प्याने तपासणी.',
      finTitle: 'आर्थिक विश्लेषक',
      finDesc: 'निधी शिफारशी, मंजुरी आणि खर्च उपयोग प्रमाणपत्रांची ऑटोमॅटिक ट्रॅकिंग.',
      dupTitle: 'दुहेरी कामे शोधणे',
      dupDesc: 'इतर शासकीय योजनांमधील दुहेरी दाव्यांचा शोध घेणारे अल्गोरिदम.',
      gisTitle: 'डिजिटल ट्विन आणि जीआयएस मॅपिंग',
      gisDesc: 'प्रत्यक्ष पडताळणीसाठी उच्च-गुणवत्तेच्या सॅटेलाईट फोटोंचा वापर.',
      citTitle: 'नागरिक तक्रार प्रणाली',
      citDesc: 'गोपनीयता आणि फोटो सत्यता तपासणीसह सुरक्षित तक्रार नोंदणी.'
    },
    gisPreview: {
      badge: 'जीआयएस देखरेख इंजिन',
      title: 'डिजिटल पायाभूत सुविधा देखरेख',
      subtitle: 'थेट डेटाबेस टेलिमेट्री आणि प्रकल्प नोंदणी निरीक्षण.',
      viewMode: 'दृश्य प्रकार (View Mode):',
      vectorMap: 'वेक्टर जीआयएस नकाशा',
      satelliteLayer: 'उपग्रह स्तर (Satellite Layer)',
      telemetryActive: 'डिजिटल ट्विन टेलिमेट्री: सक्रिय',
      spatialGrid: 'राष्ट्रीय नकाशा ग्रिड',
      sentinelLayer: 'सेंटिनेल-२ सॅटेलाईट लेयर',
      gisSyncOk: 'जीआयएस सिंक: ओके',
      loadingDb: 'डेटाबेसवरून थेट प्रकल्प नोंदी लोड होत आहेत...',
      pendingGps: 'अक्षांश-रेखांश पडताळणी प्रलंबित',
      projectsIngested: 'समाविष्ट केलेले प्रकल्प',
      recordDetails: 'प्रकल्प नोंद तपशील',
      projName: 'प्रकल्पाचे नाव:',
      canonicalId: 'आयडी (Canonical ID):',
      utilization: 'निधी वापर (Utilization):',
      status: 'स्थिती:',
      sanctioned: 'मंजूर रक्कम:',
      finUtil: 'निधी वापर टक्केवारी',
      pendingCoords: 'जिओस्पेशिअल स्थान आणि सॅटेलाईट पडताळणी प्रलंबित आहे.'
    },
    aiProcess: {
      badge: 'कार्यपद्धती आकृती',
      title: 'एआय देखरेख प्रक्रिया',
      subtitle: 'सार्वजनिक विकास कामांच्या देखरेखीसाठी ५-टप्प्यांची ऑटोमॅटिक प्रक्रिया.',
      step1Title: 'डेटा संकलन',
      step1Desc: 'प्रत्यक्ष प्रगती नोंदी, निधी वाटप, जिओटॅग फोटो आणि उपग्रह प्रतिमा संकलन.',
      step2Title: 'एआय विश्लेषण',
      step2Desc: 'आर्थिक निधी वापराचा प्रत्यक्ष कामाच्या टप्प्यांशी ताळमेळ घालणे.',
      step3Title: 'पडताळणी',
      step3Desc: 'उपग्रह मेटाडेटा आणि स्थान निर्देशांकांची पालिका डेटाबेसशी तुलना.',
      step4Title: 'जोखीम वर्गीकरण',
      step4Desc: 'गंभीरतेनुसार स्वयंचलित जोखीम गुण (कमी, मध्यम, जास्त) देणे.',
      step5Title: 'शासकीय कारवाई',
      step5Desc: 'प्रत्यक्ष पाहणीसाठी जिल्हा नोडल अधिकाऱ्यांकडे अहवाल पाठवणे.',
      flowSummary: '०१ डेटा संकलन → ०२ एआय विश्लेषण → ०३ पडताळणी → ०४ जोखीम वर्गीकरण → ०५ शासकीय कारवाई'
    },
    homeCta: {
      badge: 'ओळख सुरक्षित',
      title: 'पायाभूत सुविधेत समस्या आढळली का?',
      desc: 'खराब, अपूर्ण, रखडलेल्या किंवा निकृष्ट दर्जाच्या सार्वजनिक कामांची तक्रार नोंदवा.',
      btnReport: 'तक्रार नोंदवा',
      btnTrack: 'तक्रार आलेख ट्रॅक करा',
      safetyGuarantee: 'सुरक्षा हमी: सत्यापित नागरिक अहवालामुळे तुमची ओळख गोपनीय राहते.'
    },
    categories: {
      roadLabel: 'रस्ता / मार्ग',
      roadDesc: 'खड्डे, तोडलेले डांबरीकरण, अपूर्ण रस्ता, मोरी गहाळ',
      drainLabel: 'गटार / जलनिस्सारण',
      drainDesc: 'उघडी गटारे, तुंबलेली मोरी, पाणी साचण्याची समस्या',
      waterLabel: 'पाणी पुरवठा',
      waterDesc: 'विंधन विहीर (बोरवेल) दुरुस्ती, गळती, पाण्याची टाकी, पाईपलाईन विलंब',
      eduLabel: 'शिक्षण सुविधा',
      eduDesc: 'शाळेच्या खोल्या, छत, स्वच्छतागृह, संगणक लॅब काम विलंब',
      healthLabel: 'आरोग्य केंद्र',
      healthDesc: 'प्राथमिक आरोग्य केंद्र इमारत, वैद्यकीय उपकरणे काम',
      commLabel: 'समाज मंदिर / भवन',
      commDesc: 'ग्रामपंचायत हॉल, अभ्यासिका, अंगणवाडी इमारत दोष',
      pubLabel: 'सार्वजनिक सुविधा',
      pubDesc: 'बस थांबा निवारा, उद्यान, सार्वजनिक स्वच्छतागृह कामातील दोष',
      elecLabel: 'वीज / पथदिवे',
      elecDesc: 'सौर पथदिवे, ट्रान्सफॉर्मर प्लॅटफॉर्म, केबल टाकणे',
      sanLabel: 'स्वच्छता',
      sanDesc: 'कचरा संकलन केंद्र, सार्वजनिक स्वच्छता युनिट',
      othLabel: 'इतर पायाभूत सुविधा',
      othDesc: 'इतर कोणताही एमपीलॅड्स निधीतून झालेला विकास प्रकल्प'
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
      step1Heading: 'पायाभूत सुविधा समस्या वर्ग निवडा *',
      step1Subtitle: 'तुमच्या समस्येशी संबंधित अचूक प्रकार निवडा.',
      step2Heading: 'स्थानाचा तपशील',
      step2Subtitle: 'समस्या असलेले राज्य, जिल्हा आणि परिसर निवडा.',
      step3Heading: 'समस्येचे वर्णन आणि वेळापत्रक',
      step3Subtitle: 'दिसून आलेल्या त्रुटी किंवा विलंबाबाबत सविस्तर माहिती द्या.',
      step4Heading: 'ओळख संरक्षण आणि नागरिक पडताळणी',
      step4Subtitle: 'तुमची ओळख स्वतंत्रपणे सत्यापित केली जाते आणि अधिकाऱ्यांसमोर उघड केली जात नाही.',
      step5Heading: 'पुराव्याची कागदपत्रे / फोटो अपलोड करा',
      step5Subtitle: 'घटनास्थळाचा स्पष्ट फोटो अपलोड करा. स्वीकार्य फॉरमॅट: JPG / PNG (१५ MB पर्यंत).',
      mobileLabel: 'पडताळणीसाठी मोबाईल क्रमांक *',
      mobilePlaceholder: '10 अंकी मोबाईल क्रमांक टाका',
      sendOtp: 'ओटीपी पाठवा',
      sendingOtp: 'ओटीपी पाठवला जात आहे...',
      otpLabel: '4-अंकी ओटीपी टाका * (डेमो कोड: 1234)',
      verifyOtp: 'सत्यापित करा आणि ओळख गोपनीय ठेवा',
      verifyingOtp: 'ओळख पडताळणी सुरू आहे...',
      otpSuccess: 'मोबाईल क्रमांक यशस्वीरित्या सत्यापित झाला',
      fullNameLabel: 'पूर्ण नाव (पर्यायी)',
      fullNamePlaceholder: 'पूर्ण नाव प्रविष्ट करा',
      stateLabel: 'राज्य / केंद्रशासित प्रदेश *',
      selectState: '-- राज्य निवडा --',
      districtLabel: 'जिल्हा *',
      selectDistrict: '-- जिल्हा निवडा --',
      localityLabel: 'परिसर / गाव / वॉर्डाचे नाव *',
      localityPlaceholder: 'उदा. सेक्टर ४, प्राथमिक आरोग्य केंद्राजवळ',
      landmarkLabel: 'जवळची प्रसिद्ध जागा (पर्यायी)',
      landmarkPlaceholder: 'उदा. ग्रामपंचायत कार्यालयासमोर',
      categoryLabel: 'पायाभूत सुविधा वर्ग *',
      categorySelect: 'कामाचा प्रकार निवडा',
      workTitleLabel: 'प्रकल्पाचे नाव / ठिकाण *',
      workTitlePlaceholder: 'उदा. समाज मंदिर छताची गळती, रस्त्यावरील खड्डे',
      descriptionLabel: 'समस्येचे सविस्तर वर्णन *',
      descriptionPlaceholder: 'पायाभूत सुविधेतील त्रुटी, विलंब किंवा नुकसानाचे सविस्तर वर्णन करा...',
      descNotice: 'शासकीय पुनरावलोकनासाठी अचूक माहिती द्या.',
      dateObservedLabel: 'ही समस्या प्रथम कधी दिसून आली? *',
      isOngoingLabel: 'ही समस्या सध्या चालू आहे का? *',
      optYes: 'होय',
      optNo: 'नाही',
      optNotSure: 'नक्की माहिती नाही',
      locationTitle: 'जीपीएस स्थान पडताळणी',
      locationDesc: 'अचूक स्थान निश्चित करण्यासाठी जीपीएस नोंदवा.',
      detectGps: 'माझे स्थान शोधा',
      detectingGps: 'स्थान शोधत आहे...',
      gpsVerified: 'जीपीएस स्थान पडताळणी पूर्ण',
      evidenceTitle: 'फोटो आणि कागदपत्र पुरावे',
      evidenceDesc: 'घटनास्थळाचा फोटो अपलोड करा. फोटोची सत्यता ऑटोमॅटिक तपासली जाते.',
      uploadPhoto: 'अपलोड करण्यासाठी फोटोवर क्लिक करा किंवा येथे आणा',
      uploadDrag: 'अपलोड करण्यासाठी फोटोवर क्लिक करा किंवा येथे आणा',
      uploadFormats: 'स्वीकार्य प्रकार: JPG / PNG / WEBP (15MB पर्यंत)',
      attachSample: 'नमूना फोटो जोडा (त्वरित डेमो)',
      inspectingFile: 'फोटो तपासणी सुरू आहे...',
      photoVerified: 'फोटो पुराव्याची सत्यता सत्यापित झाली',
      attachedEvidence: 'जोडलेले पुरावे',
      reqEvidenceAlert: 'कमविना १ फोटो किंवा व्हिडिओ पुरावा आवश्यक आहे.',
      btnNext: 'पुढील पायरी',
      btnBack: 'मागील पायरी',
      btnSubmit: 'तक्रार नोंदवा (सबमिट करा)',
      submitting: 'अधिकृत अहवाल सादर होत आहे...',
      successTitle: 'तक्रार यशस्वीरित्या नोंदवली गेली',
      successDesc: 'तुमची तक्रार जिल्हा नोडल प्राधिकरणाकडे नोंदवण्यात आली आहे. पुढील ट्रॅकिंगसाठी तुमची तक्रार आयडी जपून ठेवा.',
      complaintIdLabel: 'युनिक तक्रार आयडी (Complaint ID)',
      trackNowBtn: 'तक्रार स्थिती ट्रॅक करा',
      backHomeBtn: 'मुख्य पृष्ठावर जा',
      valMobileReq: 'कृपया वैध १०-अंकी मोबाईल क्रमांक प्रविष्ट करा.',
      valCategoryReq: 'कृपया पायाभूत सुविधेचा प्रकार निवडा.',
      valTitleReq: 'कृपया प्रकल्पाचे किंवा ठिकाणाचे नाव प्रविष्ट करा.',
      valDescReq: 'कृपया समस्येचे सविस्तर वर्णन प्रविष्ट करा.',
      identityNoticeTitle: 'ओळख संरक्षण सूचना',
      identityNoticeDesc: 'तुमचा फोन नंबर फक्त सत्यता तपासण्यासाठी वापरला जातो. तो एन्क्रिप्टेड आहे आणि अधिकाऱ्यांशी शेअर केला जाणार नाही.',
      verifiedStatusLabel: 'सत्यापित',
      identityProtectedLabel: 'सुरक्षित',
      anonymousIdLabel: 'गोपनीय आयडी',
      visibleAuthorityTitle: 'अधिकाऱ्यांना दिसणारी माहिती:',
      hiddenDataTitle: 'गोपनीय / लपवलेली माहिती:'
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
      verifiedCitizen: 'सत्यापित नागरिक आयडी',
      reportDetails: 'तक्रार तपशील',
      categoryLabel: 'प्रकार:',
      locationLabel: 'स्थान:',
      submittedLabel: 'सादर तारीख:',
      assignedDeskLabel: 'नियुक्त डेस्क:',
      verificationSummary: 'पडताळणी सारांश',
      identityStatusLabel: 'ओळख स्थिती:',
      photoMetadataLabel: 'फोटो मेटाडेटा:',
      aiRiskLevelLabel: 'एआय जोखीम स्तर:',
      descriptionHeader: 'सादर केलेल्या समस्येचे वर्णन',
      auditTrailHeader: 'ऑडिट ट्रेल आणि कारवाई इतिहास'
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
    roleSelection: {
      portalHeader: 'एमपीलॅड्स एआय मॉनिटर • अधिकृत पोर्टल',
      pageTitle: 'सुरक्षित अधिकृत अधिकारी लॉगिन',
      pageSubtitle: 'सुरक्षित क्रेडेंशियल लॉगिन पोर्टलवर जाण्यासाठी खालील तुमची प्रशासकीय भूमिका निवडा.',
      continueBtn: 'लॉगिन फॉर्मवर पुढे जा',
      securityNotice: 'सुरक्षा सूचना: अधिकृत अधिकारी प्रवेश नोंद आणि निरीक्षण केले जाते.'
    },
    roleLogin: {
      backToRoles: 'भूमिका निवडीवर परत जा',
      portalHeader: 'एमपीलॅड्स एआय मॉनिटर • अधिकृत पोर्टल',
      pageTitle: 'सुरक्षित अधिकृत अधिकारी प्रवेश (Login)',
      authorizedOnly: 'फक्त अधिकृत अधिकाऱ्यांसाठी —',
      emailLabel: 'अधिकृत ईमेल / आयडी *',
      passwordLabel: 'पासवर्ड *',
      forgotPassword: 'पासवर्ड विसरलात?',
      captchaLabel: 'सुरक्षा तपासणी (Captcha) *',
      captchaPlaceholder: 'कोड टाका',
      rememberDevice: 'अधिकृत सत्रासाठी हे डिव्हाइस लक्षात ठेवा',
      signInBtn: 'साइन इन करा',
      signingIn: 'अधिकाऱ्याची पडताळणी सुरू आहे...',
      backToRolesBtn: 'भूमिका निवडीवर परत जा',
      securityNotice: 'सुरक्षा सूचना: अधिकृत अधिकारी प्रवेश नोंद आणि निरीक्षण केले जाते.',
      credentialSupportTitle: 'क्रेडेंशियल मदत',
      credentialSupportSub: 'अधिकृत अधिकारी पुनर्प्राप्ती',
      credentialSupportDesc: 'अधिकृत आयडीचे पासवर्ड रीसेट करण्यासाठी, कृपया तुमच्या राज्य नोडल प्रशासकाकडे विनंती पाठवा.',
      modalClose: 'बंद करा'
    },
    projectDetail: {
      backToDash: 'डॅशबोर्डवर परत जा',
      loadingText: 'डेटाबेसवरून प्रकल्पाचे सविस्तर तपशील लोड होत आहेत...',
      errorText: 'डेटाबेसवरून प्रकल्पाचे तपशील लोड करता आले नाहीत.',
      canonicalIdLabel: 'आयडी (Canonical ID):',
      mpConstituencyLabel: 'खासदार आणि मतदारसंघ',
      sanctionedAmtLabel: 'मंजूर रक्कम',
      finUtilLabel: 'निधी वापर टक्केवारी',
      physicalStatusLabel: 'प्रत्यक्ष प्रगती स्थिती',
      physicalDataUnavailable: 'प्रत्यक्ष प्रगती डेटा उपलब्ध नाही',
      geoCoordsLabel: 'जिओस्पेशिअल स्थान निर्देशांक',
      geoDataUnavailable: 'स्थान निर्देशांक उपलब्ध नाहीत'
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
