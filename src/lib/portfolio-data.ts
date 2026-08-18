export const profile = {
  name: "ANAS F",
  role: "AI/ML Engineer · Full-Stack Systems",
  location: "Coimbatore, India · Open to Relocation & Remote Internships",
  status: "Open to Software & AI/ML Internships",
  education: "B.Tech CSBS, Sri Eshwar College of Engineering · 2024–2028 · CGPA 8.50",
  cgpa: "8.50",
  email: "anasofficial2024@gmail.com",
  phone: "+91 8903430866",
  github: "https://github.com/ANASF1412",
  linkedin: "https://www.linkedin.com/in/anas-f-a5a595320/",
  resume: "/resume.pdf",
  /** Optional: paste a Formspree / CRM webhook URL to receive form submissions. */
  contactEndpoint: "",
  /**
   * Web3Forms access key — messages land in the inbox tied to this key
   * (anasofficial2024@gmail.com). Get it free at https://web3forms.com.
   * This key is publishable and safe in client code.
   */
  web3formsKey: "fb0ab697-f783-43ec-b57e-d4fd2111f9a3",

  headline: "AI/ML Engineer · Full-Stack Systems",
  sub: "B.Tech CSBS undergraduate (CGPA: 8.50) with 2 internships and 6 award-winning builds. From training YOLOv8 models at NIELIT to orchestrating automated MLOps workflows with DVC, MLflow, and AWS — I build software that turns models into scalable, usable applications.",
  roles: ["MLOps Pipelines", "Computer Vision & NLP", "Scalable Web Architectures"],
  /** Centralised media paths — see public/images/. */
  heroImage: "/images/profile/anas-hero.jpg",
};

export const about = [
  "I am a Computer Science and Business Systems undergraduate at Sri Eshwar College of Engineering (CGPA: 8.50), driven by a relentless curiosity for solving real-world problems through intelligent systems. My journey is not just about writing code—it's about understanding how technology meets business strategy to transform industries and create meaningful impact.",
  "My technical focus spans Artificial Intelligence, Machine Learning, MLOps, Cloud Computing, Full-Stack Development, and System Design. As an MLOps enthusiast, I am fascinated by the complete lifecycle of ML systems—from data versioning and experimentation to deployment, monitoring, and continuous improvement using Python, FastAPI, Docker, MLflow, DVC, React, and MongoDB.",
  "Over the years, I've engineered solutions ranging from urban flood early-warning systems and AI mental wellness companions to full-stack ESG investment platforms. Beyond technical development, serving as a placement coordinator and student mentor has honed my leadership, communication, and decision-making abilities.",
  "I don't just aim to memorize technologies—I strive to master concepts, understand systems deeply, and build scalable products that solve problems at scale.",
];

export const stats = [
  { value: "2", label: "Engineering internships" },
  { value: "6", label: "Award-winning builds shipped" },
  { value: "MLOps · Full-Stack", label: "Core engineering focus" },
  { value: "8.50", label: "CGPA · B.Tech CSBS (2024–2028)" },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    detail: "120+ problems solved",
    url: "https://leetcode.com/u/ANASF1412/",
  },
  {
    platform: "SkillRack",
    detail: "1000+ solved · 279+ Bronze badges",
    url: "https://www.skillrack.com/faces/resume.xhtml?id=468340&key=b0a2a2a1c3",
  },
  {
    platform: "HackerRank",
    detail: "Bronze badges · SQL certified",
    url: "https://www.hackerrank.com/profile/anasofficial2024",
  },
  {
    platform: "CodeChef",
    detail: "Bronze badges",
    url: "https://www.codechef.com/users/anasf1412",
  },
];

export type Internship = {
  slug: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  github: string;
  /** Resolved from the centralised public/images hierarchy. */
  photo: string;
  projectShot: string;
};

export const internships: Internship[] = [
  {
    slug: "mlops-intern",
    role: "MLOps Intern",
    org: "Sri Eshwar College of Engineering",
    period: "June 2026",
    summary:
      "Owned the full production lifecycle of FloodGuard AI — from versioned datasets and tracked experiments to a containerised inference service with automated deploys and drift monitoring.",
    points: [
      "Engineered an end-to-end MLOps pipeline for FloodGuard AI covering data versioning (DVC), experiment tracking (MLflow), and automated model deployment.",
      "Built REST API-based model serving with fallback mechanisms, Docker containerization, CI/CD workflows with GitHub Actions, and Evidently AI drift monitoring.",
      "Wired scheduled drift reports so degradation surfaces before forecast quality visibly drops.",
    ],
    stack: ["DVC", "MLflow", "Docker", "GitHub Actions", "Evidently AI", "FastAPI"],
    github: "https://github.com/ANASF1412/FloodGuard-AI-MLOps-Intern-Project",
    photo: "/images/internships/mlops-intern-photo.jpg",
    projectShot: "/images/internships/mlops-intern-project.jpg",
  },
  {
    slug: "nielit-ai-intern",
    role: "Research Intern(Data Analytics ,AI & Web Development in Django )",
    org: "NIELIT Calicut",
    period: "2025",
    summary:
      "Trained computer-vision models on custom annotated datasets and built the surrounding data preparation and inference tooling used across the lab's experiments.",
    points: [
      "Trained and evaluated YOLOv8 object-detection models on custom annotated datasets.",
      "Built the data preparation, augmentation, and inference pipeline used for computer-vision experiments.",
      "Packaged inference into a reusable script so results were reproducible across machines.",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "PyTorch"],
    github: "",
    photo: "/images/internships/nielit-ai-intern-photo.jpg",
    projectShot: "/images/internships/nielit-ai-intern-project.jpg",
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  accent: "cyan" | "violet";
  stack: string[];
  metrics: { value: string; label: string }[];
  tldr: string;
  problem: string;
  approach: string[];
  impact: string[];
  artifacts: { title: string; detail: string }[];
  keyDecision?: string;
  /** Descriptive alt text for the project screenshot (a11y + SEO). */
  imageAlt: string;
  /** Visible caption rendered under the screenshot. */
  imageCaption: string;
  /** True when a real screenshot exists at /images/projects/{slug}.jpg. */
  hasImage: boolean;
  /** Preserve the full UI for screenshots whose aspect ratio differs from 16:9. */
  imageFit?: "cover" | "contain";
  /** Use a wider frame for full-width dashboard captures. */
  imageAspect?: "standard" | "dashboard";
  /** Optional architecture diagram rendered in the project case study. */
  architectureImage?: string;
  /** Optional deployment summary rendered as a case-study callout and spec dialog. */
  cloudInfrastructure?: string;
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    slug: "floodguard-ai",
    name: "FloodGuard AI",
    tagline: "Urban flood early-warning platform with a fully automated MLOps lifecycle.",
    imageAlt:
      "FloodGuard AI operations console showing Mumbai metro flood risk: active alert counters, 24h rainfall, model confidence, a live Leaflet risk map with severity-coded zones, and a sorted active-alerts feed.",
    imageCaption:
      "FloodGuard AI — ops console with live risk map, alert feed and model-confidence monitoring.",
    hasImage: true,
    imageFit: "contain",
    imageAspect: "dashboard",
    architectureImage: "/images/projects/floodguard-architecture.png",
    year: "2026",
    role: "MLOps & backend engineer",
    accent: "cyan",
    stack: [
      "Python",
      "AWS EC2",
      "Docker Compose",
      "Nginx",
      "FastAPI",
      "React",
      "DVC",
      "MLflow",
      "Docker",
      "GitHub Actions",
      "Evidently AI",
    ],
    metrics: [
      { value: "Inference Latency", label: "~42ms p50 (PyTorch CPU / Batch=1)" },
      { value: "Drift Alerting", label: "Evidently AI (PSI > 0.25)" },
    ],

    tldr: "An urban flood early-warning system where the model is treated as a production asset: versioned data, tracked experiments, containerized serving, and continuous drift monitoring.",
    problem:
      "Flood prediction models rot silently. Without data versioning, experiment tracking, and drift monitoring, a model that scored well once quietly degrades before anyone notices.",
    approach: [
      "Versioned datasets with DVC so every model artifact traces back to the exact data that produced it.",
      "Tracked experiments and metrics in MLflow to compare runs objectively instead of by intuition.",
      "Served predictions through a REST API with a heuristic fallback so the endpoint never hard-fails.",
      "Containerized with Docker and automated build, test, and deploy through GitHub Actions.",
      "Monitored production inputs with Evidently AI to catch distribution drift early.",
    ],
    impact: [
      "Model updates ship through an automated pipeline instead of manual redeploys.",
      "Every prediction path has a fallback, keeping the warning service available under model failure.",
      "Drift reports surface degradation before forecast quality visibly drops.",
    ],
    artifacts: [
      {
        title: "DVC + MLflow pipeline",
        detail: "Reproducible data and experiment lineage per run.",
      },
      { title: "Dockerized serving", detail: "REST inference container with graceful fallback." },
      { title: "Drift dashboard", detail: "Evidently AI reports wired into the CI schedule." },
    ],
    keyDecision:
      "Architected a pluggable ML pipeline separating model serving from backend core logic using FastAPI, allowing seamless algorithm upgrades without disrupting production endpoints.",
    cloudInfrastructure:
      "Containerized microservice architecture configured for AWS EC2 (t2.micro) with Docker Compose, Nginx reverse proxy, and systemd service orchestration.",
    github: "https://github.com/ANASF1412/FloodGuard-AI-MLOps-Intern-Project",

    live: "",
  },
  {
    slug: "jarvisfi",
    name: "JarvisFi",
    tagline: "Multilingual LLM finance assistant with RAG grounding and async job processing.",
    imageAlt:
      "JarvisFi finance dashboard showing monthly income and expense cards alongside a credit score gauge reading 750.",
    imageCaption: "JarvisFi — multilingual finance dashboard with credit-health insights.",
    hasImage: true,
    imageFit: "contain",
    year: "2026",
    role: "AI engineer — retrieval, prompting, evaluation",
    accent: "violet",
    stack: [
      "Python",
      "Hugging Face",
      "IBM Watsonx",
      "RAG",
      "Redis",
      "Celery",
      "JWT",
      "Streamlit",
      "NLP",
    ],
    metrics: [
      { value: "Real-time Telemetry", label: "<200ms API Response (FastAPI + Redis Cache)" },
    ],

    tldr: "A conversational finance assistant that answers in English, Tamil, Hindi, or Telugu, grounded in retrieved market context via RAG over Hugging Face and IBM Watsonx models. Took 2nd place at a national paper presentation.",
    problem:
      "Financial guidance in India is English-first and jargon-heavy. Non-English speakers get either nothing or a generic chatbot that hallucinates numbers.",
    approach: [
      "Built a language-detection front door routing English, Tamil, Hindi, and Telugu queries through one reasoning path.",
      "Grounded answers with a RAG layer over market and document context using Hugging Face and IBM Watsonx models.",
      "Offloaded ingestion and long-running analysis to Celery workers with Redis as broker and response cache.",
      "Secured multi-user sessions with JWT auth and tuned prompts against a hand-labelled evaluation set.",
    ],
    impact: [
      "First Runner-Up, National Level Paper Presentation at Coimbatore Institute of Technology (NEXERA'26).",
      "Top 10 Innovator at GenAI Hackathon.",
      "RAG grounding plus Redis caching cut unsupported numeric claims and repeat-query latency.",
    ],
    artifacts: [
      {
        title: "Multilingual routing",
        detail: "Detect → translate → retrieve → respond in the source language.",
      },
      {
        title: "RAG grounding",
        detail: "Hugging Face + IBM Watsonx retrieval context injected per query.",
      },
      {
        title: "Async pipeline",
        detail: "Celery workers with Redis broker and cache behind JWT-scoped sessions.",
      },
    ],
    keyDecision:
      "Implemented Redis caching and Celery task queues to handle asynchronous PDF report generation and RAG retrieval without blocking primary user request threads.",
    github: "https://github.com/ANASF1412/GenAI-JarvisFi-app",
    live: "https://jarvisfi-ai.vercel.app",
  },
  {
    slug: "mindscape-ai",
    name: "MindScape AI",
    tagline: "AI-driven emotional wellness and mental-health companion.",
    imageAlt:
      "MindScape AI dashboard showing a negative emotion state, low mental-health score, 15 percent burnout risk, MindTokens balance, mood check-in prompt, and wellness navigation.",
    imageCaption:
      "MindScape AI — emotional wellness dashboard with mood state, burnout risk and mental-health scoring.",
    hasImage: true,
    imageFit: "contain",
    imageAspect: "dashboard",
    year: "2026",
    role: "AI engineer — NLP, dialog, analytics",
    accent: "violet",
    stack: ["Python", "Streamlit", "TextBlob", "Rasa", "Plotly", "SpeechRecognition", "pyttsx3"],
    metrics: [
      { value: "Context Processing", label: "<1.2s TTI (LangChain Pipeline + Vector Index)" },
    ],

    tldr: "An intelligent emotional wellness companion combining NLP sentiment analysis with a hybrid dialog engine (Rasa + heuristic fallback), rule-based clinical scoring, and crisis detection with adaptive UI alerts.",
    problem:
      "Wellness chatbots fail exactly when they matter most — the model errors out, or it misses language that signals a crisis and replies with small talk.",
    approach: [
      "Combined a Rasa dialog engine with a heuristic fallback so the assistant always responds, even when the model layer is unavailable.",
      "Scored sentiment with TextBlob and layered rule-based clinical scoring on top of the raw signal.",
      "Added crisis-phrase detection that switches the interface into an adaptive alert state.",
      "Visualized burnout trends in Plotly, with voice input/output via SpeechRecognition and pyttsx3.",
    ],
    impact: [
      "Zero-downtime conversational path through the hybrid engine design.",
      "Real-time burnout analytics turn scattered check-ins into a visible trend line.",
      "Crisis detection escalates the UI instead of burying the signal in chat history.",
    ],
    artifacts: [
      {
        title: "Hybrid dialog engine",
        detail: "Rasa primary path with deterministic heuristic fallback.",
      },
      { title: "Clinical scoring layer", detail: "Rule-based scores over NLP sentiment output." },
      { title: "Burnout analytics", detail: "Plotly trend views over longitudinal check-ins." },
    ],
    keyDecision:
      "Chose a hybrid Rasa + heuristic fallback engine over pure LLM APIs to guarantee zero-latency response during crisis detection and reduce API cost overhead.",
    github: "https://github.com/ANASF1412/MindScapeAI",

    live: "",
  },
  {
    slug: "anpr-system",
    name: "High-Throughput ANPR System",
    tagline: "Automatic number-plate recognition pipeline built on YOLOv8 and OCR.",
    imageAlt:
      "ANPR System web interface with a drag-and-drop vehicle image uploader and a Detect Number Plate action, plus a logs view for past detections.",
    imageCaption:
      "ANPR System — upload interface for YOLOv8 plate detection with OCR decoding and detection logs.",
    hasImage: true,
    year: "2025",
    role: "Computer vision engineer",
    accent: "cyan",
    stack: ["Python", "YOLOv8", "OpenCV", "EasyOCR", "PyTorch"],
    metrics: [
      { value: "YOLOv8", label: "Custom-trained detection" },
      { value: "~38ms/frame", label: "CPU inference" },
      { value: "OpenCV", label: "Preprocessing pipeline" },
    ],

    tldr: "A two-stage vehicle number-plate recognition pipeline: a custom-trained YOLOv8 detector locates the plate, OCR reads it, and the result is normalized for downstream lookup.",
    problem:
      "Off-the-shelf OCR reads a full frame and returns noise. Plates need to be localized first, and Indian plate formats need normalization before any lookup is reliable.",
    approach: [
      "Annotated and trained a YOLOv8 detector on a custom plate dataset.",
      "Cropped and preprocessed detections with OpenCV to raise OCR accuracy on low-light frames.",
      "Normalized OCR output against expected plate grammar to reject impossible reads.",
    ],
    impact: [
      "Localizing before reading removed the bulk of OCR false positives.",
      "Pipeline runs frame-by-frame on video input, not just still images.",
    ],
    artifacts: [
      {
        title: "Custom YOLOv8 detector",
        detail: "Trained on annotated plate imagery with augmentation.",
      },
      { title: "OCR normalization", detail: "Format-aware post-processing over raw OCR text." },
    ],
    keyDecision:
      "Optimized YOLOv8 inference for CPU processing by implementing frame-skipping and cropping ROIs with OpenCV, maintaining ~38ms/frame latency.",
    github: "",

    live: "",
  },
  {
    slug: "biofund-connect",
    name: "BioFund Connect",
    tagline: "ESG investment marketplace matching sustainable projects to eco-conscious capital.",
    imageAlt:
      "BioFund Connect web app on a dark theme with the headline \u201cInvest deeply in Nature\u2019s Future\u201d above sustainable-project investment listings.",
    imageCaption: "BioFund Connect — ESG marketplace landing and project discovery view.",
    hasImage: true,
    year: "2026",
    role: "Full-stack engineer — architecture, API, UI",
    accent: "cyan",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Leaflet"],
    metrics: [
      { value: "<1.5s", label: "Initial TTI" },
      { value: "12+", label: "REST endpoints" },
      { value: "Role-based", label: "JWT auth (3 roles)" },
    ],

    tldr: "A MERN marketplace where verified green projects raise capital from retail investors. I designed the schema, built the JWT role system, and shipped a geospatial discovery dashboard.",
    problem:
      "Small sustainability projects have no credible place to present verifiable impact data, and retail investors have no way to compare them side by side. Discovery happens on spreadsheets and WhatsApp.",
    approach: [
      "Modelled projects, investors and pledges in MongoDB with an aggregation pipeline powering the portfolio view.",
      "Built stateless JWT auth with role-scoped middleware so investor, founder, and reviewer routes share one API surface.",
      "Layered Leaflet map discovery over the same query API so location and list views never drift.",
      "Instrumented dashboard telemetry to see which impact metrics investors actually open.",
    ],
    impact: [
      "Cut project-to-investor discovery from a manual spreadsheet review to a two-filter search.",
      "Single API contract serves web dashboard and map view, halving the endpoint surface.",
      "Deployed on Vercel with preview-per-branch review flow.",
    ],
    artifacts: [
      {
        title: "Role-scoped API",
        detail: "Express middleware chain enforcing JWT claims per route group.",
      },
      {
        title: "Geospatial discovery",
        detail: "Leaflet clustering wired to the same filter state as the list.",
      },
      {
        title: "Impact dashboard",
        detail: "Aggregated ESG telemetry rendered from one MongoDB pipeline.",
      },
    ],
    keyDecision:
      "Selected Leaflet.js over heavy GIS SDKs to keep initial load times under 1.5s while providing real-time geospatial project tagging.",
    github: "https://github.com/ANASF1412/BioFund-AI-Connect",
    live: "https://biofund-connect.vercel.app",
  },
  {
    slug: "finance-investment-planner",
    name: "Finance Investment Planner",
    tagline: "ML-driven portfolio recommendations tuned for local investor profiles.",
    imageAlt:
      "Finance Planner Pro dashboard showing personalised investment recommendations and a goal progress tracker.",
    imageCaption: "Finance Investment Planner — personalised recommendations and goal tracking.",
    hasImage: true,
    year: "2025",
    role: "Backend & ML engineer",
    accent: "violet",
    stack: ["Django", "Python", "SQLite", "scikit-learn"],
    metrics: [
      { value: "4", label: "Risk profiles classified" },
      { value: "1 form", label: "From questionnaire to allocation" },
      { value: "Django", label: "Server-rendered, no client state bugs" },
    ],
    tldr: "A Django app that turns a short risk questionnaire into a concrete allocation using trained classifiers, localized to Indian instruments instead of US-centric defaults.",
    problem:
      "Generic robo-advisors assume US instruments and US tax logic. Local first-time investors get advice they cannot act on.",
    approach: [
      "Trained classifiers on risk-profile features to map questionnaire answers to allocation buckets.",
      "Kept the model behind a Django service layer so the recommendation logic is testable in isolation.",
      "Used SQLite for a zero-ops deployment footprint appropriate to the traffic profile.",
    ],
    impact: [
      "Reduces a multi-page onboarding flow to a single questionnaire with an immediate, explainable allocation.",
      "Recommendation logic is unit-testable and swappable without touching views.",
    ],
    artifacts: [
      {
        title: "Risk classifier",
        detail: "Feature-engineered model mapping answers to allocation buckets.",
      },
      {
        title: "Explainable output",
        detail: "Each allocation shown with the driver that produced it.",
      },
    ],
    github: "https://github.com/ANASF1412/Finance-Investment-Planner",
    live: "https://finance-planner.vercel.app",
  },
  {
    slug: "cococlean",
    name: "COCOCLEAN",
    tagline: "IoT water-purification telemetry, from embedded sensor to live dashboard.",
    imageAlt:
      "CocoClean Smart Dosing Tool website in green tones presenting the textile wastewater treatment dosing calculator.",
    imageCaption: "CocoClean — smart dosing tool for textile wastewater treatment.",
    hasImage: true,
    year: "2025",
    role: "Embedded + app engineer",
    accent: "cyan",
    stack: ["C++", "React Native", "Firebase", "IoT"],
    metrics: [
      { value: "Realtime", label: "Sensor-to-dashboard sync" },
      { value: "C++ → RN", label: "Full hardware-to-UI ownership" },
      { value: "Finalist", label: "ZeroDay Hackathon" },
    ],
    tldr: "Sustainable water purification hardware with a live mobile dashboard — I wrote the C++ firmware path and the React Native client reading the same Firebase stream.",
    problem:
      "A purification unit is only trustworthy if you can see what it is doing. Without telemetry, failures are discovered by taste.",
    approach: [
      "Streamed sensor readings from the C++ firmware into Firebase Realtime Database with a compact schema.",
      "Built a React Native dashboard subscribing to the same stream, so hardware and app never disagree.",
      "Designed threshold alerts around the readings that actually indicate filter degradation.",
    ],
    impact: [
      "Grand Finalist at ZeroDay Hackathon.",
      "Turned an opaque hardware unit into an observable system with live status and alerting.",
    ],
    artifacts: [
      {
        title: "Firmware telemetry",
        detail: "C++ sensor loop publishing to Firebase with backoff.",
      },
      {
        title: "Live mobile client",
        detail: "React Native subscription view with threshold alerting.",
      },
    ],
    github: "",
    live: "",
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  /** Empty string = undated (sorted last). */
  year: string;
  /** Preview image served from the project asset CDN. */
  image: string;
  /** Optional public verification link (Credly, HackerRank, Udemy, etc.). */
  credentialUrl?: string;
};

/** Source order = display order: newest first, undated last. */
const certificationList: Certification[] = [
  {
    id: "physical-ai-architecture",
    name: "Physical AI Architecture Foundations: Designing Autonomous Machines with Agentic AI",
    issuer: "LinkedIn Learning",
    year: "2026",
    image: "/images/certifications/physical-ai-architecture.png",
  },
  {
    id: "claude-code-in-action",
    name: "Claude Code in Action by Anthropic",
    issuer: "LinkedIn Learning · Anthropic",
    year: "2026",
    image: "/images/certifications/claude-code-in-action.png",
  },
  {
    id: "nptel-design-thinking",
    name: "Design Thinking — A Primer · Elite Silver, Top 5%",
    issuer: "NPTEL · IIT Madras · SWAYAM",
    year: "2026",
    image: "/images/certifications/nptel-design-thinking.png",
  },
  {
    id: "nielit-internship",
    name: "Internship in Data Analytics, AI and Web Development in Django",
    issuer: "NIELIT Calicut",
    year: "2025",
    image: "/images/certifications/nielit-internship.png",
  },
  {
    id: "hackerrank-sql-intermediate",
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    year: "2025",
    image: "/images/certifications/hackerrank-sql-intermediate.png",
  },
  {
    id: "hackerrank-sql-basic",
    name: "SQL (Basic)",
    issuer: "HackerRank",
    year: "2025",
    image: "/images/certifications/hackerrank-sql-basic.png",
  },
  {
    id: "iitb-cpp-training",
    name: "C++ Training",
    issuer: "IIT Bombay · Spoken Tutorial Project",
    year: "2024",
    image: "/images/certifications/iitb-cpp-training.png",
  },
  {
    id: "iitb-c-training",
    name: "C Training",
    issuer: "IIT Bombay · Spoken Tutorial Project",
    year: "2024",
    image: "/images/certifications/iitb-c-training.png",
  },
];

/** Deterministic: newest year first, undated last, stable within a year. */
export const certifications: Certification[] = certificationList
  .map((c, index) => ({ c, index }))
  .sort((a, b) => {
    const ay = Number(a.c.year) || 0;
    const by = Number(b.c.year) || 0;
    return by - ay || a.index - b.index;
  })
  .map(({ c }) => c);

export type StackGroup = {
  label: string;
  emoji: string;
  items: { name: string; icon: string }[];
};

/** `icon` maps to a lucide component in components/site/tech-icon.tsx. */
export const stackGroups: StackGroup[] = [
  {
    label: "Languages",
    emoji: "💻",
    items: [
      { name: "Python", icon: "code" },
      { name: "Java", icon: "coffee" },
      { name: "C", icon: "terminal" },
      { name: "C++", icon: "terminal" },
      { name: "JavaScript", icon: "braces" },
      { name: "SQL", icon: "database" },
    ],
  },
  {
    label: "Web Development",
    emoji: "🌐",
    items: [
      { name: "React.js", icon: "atom" },
      { name: "Node.js", icon: "hexagon" },
      { name: "Express.js", icon: "route" },
      { name: "FastAPI", icon: "zap" },
      { name: "Django", icon: "layers" },
      { name: "MongoDB", icon: "leaf" },
      { name: "MySQL", icon: "database" },
      { name: "Firebase", icon: "flame" },
      { name: "Tailwind CSS", icon: "wind" },
    ],
  },
  {
    label: "MLOps, DevOps & Tools",
    emoji: "⚙️",
    items: [
      { name: "Docker", icon: "container" },
      { name: "DVC", icon: "gitbranch" },
      { name: "MLflow", icon: "flaskconical" },
      { name: "GitHub Actions", icon: "github" },
      { name: "Evidently AI", icon: "activity" },
      { name: "AWS (EC2/S3)", icon: "cloud" },
      { name: "Redis", icon: "hardDrive" },
      { name: "Celery", icon: "listchecks" },
    ],
  },
  {
    label: "Data & AI",
    emoji: "🧠",
    items: [
      { name: "YOLOv8", icon: "scaneye" },
      { name: "OpenCV", icon: "camera" },
      { name: "scikit-learn", icon: "sigma" },
      { name: "NLP (TextBlob, Rasa)", icon: "messagesquare" },
      { name: "RAG", icon: "search" },
      { name: "LLM APIs", icon: "sparkles" },
      { name: "NumPy", icon: "grid" },
      { name: "Pandas", icon: "table" },
    ],
  },
];

export type Achievement = {
  id: string;
  year: string;
  title: string;
  detail: string;
  image: string;
  /** Descriptive alt text for the achievement photo. */
  imageAlt: string;
};

export const timeline: Achievement[] = [
  {
    id: "guidewire-hackathon",
    year: "2026",
    title: "Top 15 · Guidewire DevTrails Hackathon",
    detail: "Guidewire — national developer hackathon.",
    image: "/images/achievements/guidewire-hackathon.jpg",
    imageAlt:
      "Guidewire DevTrails University Hackathon leaderboard showing Team Jarvis in the Diamond tier among the top teams.",
  },
  {
    id: "cit-paper",
    year: "2026",
    title: "First Runner-Up · National Paper Presentation",
    detail: "NEXERA'26, Coimbatore Institute of Technology — Team Jarvis-Fi.",
    image: "/images/achievements/cit-paper.jpg",
    imageAlt:
      "Three students receiving the first runner-up paper presentation award on stage at NEXERA'26, Coimbatore Institute of Technology.",
  },
  {
    id: "coding-relay",
    year: "2026",
    title: "Second Runner-Up · Coding Relay",
    detail: "NEXERA'26 Technical Symposium, CIT — Team TechTitans.",
    image: "/images/achievements/coding-relay.jpg",
    imageAlt:
      "Four students standing on stage at Coimbatore Institute of Technology holding the Coding Relay award certificate.",
  },
  {
    id: "genai-hackathon",
    year: "2025",
    title: "Top 10 Innovator · GenAI Hackathon",
    detail: "Recognized for the multilingual LLM finance assistant.",
    image: "/images/achievements/genai-hackathon.jpg",
    imageAlt:
      "Three students in blue polo shirts presenting the multilingual LLM finance assistant to a judge at the GenAI Hackathon.",
  },
  {
    id: "zeroday-hackathon",
    year: "2025",
    title: "Grand Finalist · ZeroDay Hackathon",
    detail: "IoT water purification telemetry system.",
    image: "/images/achievements/zeroday-hackathon.jpg",
    imageAlt: "Three students working on laptops during the ZeroDay hackathon finals.",
  },
  {
    id: "github-ignite",
    year: "2025",
    title: "Student Coordinator · GitHub Ignite",
    detail: "Ran the open-source contribution workshop at Sri Eshwar College of Engineering.",
    image: "/images/achievements/github-ignite.jpg",
    imageAlt:
      "Student coordinator receiving a certificate shield in front of a classroom during the GitHub Ignite open-source workshop.",
  },
];

/** Animated stat bars in the hero "System Stats" panel. `pct` is the bar fill. */
export const systemStats = [
  { label: "Internships", value: "2", pct: 66, tone: "cyan" as const },
  { label: "Award-Winning Builds", value: "6", pct: 82, tone: "violet" as const },
  { label: "MLOps & Full-Stack", value: "Core", pct: 90, tone: "magenta" as const },
  { label: "CGPA", value: "8.50", pct: 85, tone: "cyan" as const },
];

/**
 * Achievement media gallery — resolved from the centralised
 * `/images/achievements/${id}.jpg` hierarchy. Missing files fall back to a
 * glassmorphic placeholder, so no code change is needed when photos land.
 */
/** Screenshots (vs. photos) must not be cropped — show them whole. */
const screenshotAchievements = new Set(["guidewire-hackathon"]);

export const gallery = timeline.map((t) => ({
  id: t.id,
  src: t.image,
  alt: t.imageAlt,
  caption: `${t.title} — ${t.detail}`,
  fit: (screenshotAchievements.has(t.id) ? "contain" : "cover") as "contain" | "cover",
}));
