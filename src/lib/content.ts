export type Localized = {
  ar: string;
  en: string;
};

export const localize = (ar: string, en: string): Localized => ({ ar, en });

export type NavigationItem = {
  href: string;
  label: Localized;
  children?: Array<{ href: string; label: Localized }>;
};

export const navigation: NavigationItem[] = [
  { href: "/", label: localize("الرئيسية", "Home") },
  {
    href: "/about",
    label: localize("عن الشركة", "About"),
    children: [
      { href: "/about#story", label: localize("من نحن", "Who we are") },
      { href: "/about#values", label: localize("قيمنا ومبادئنا", "Values & principles") },
      { href: "/about#leadership-message", label: localize("رسالة الرئيس التنفيذي", "CEO message") },
      { href: "/about#why-us", label: localize("ما يميزنا", "Why Frey-M") },
      { href: "/about#companies", label: localize("شركات المجموعة", "Group companies") },
    ],
  },
  { href: "/services", label: localize("خدماتنا", "Services") },
  {
    href: "/projects",
    label: localize("مشروعاتنا", "Projects"),
    children: [
      { href: "/projects", label: localize("كل المشروعات", "All projects") },
      { href: "/projects#construction", label: localize("المقاولات العامة", "General contracting") },
      { href: "/projects#maintenance", label: localize("الصيانة والتشغيل", "Maintenance") },
      { href: "/projects#interiors", label: localize("الديكورات والتشطيبات", "Décor & finishes") },
      { href: "/projects#supplies", label: localize("التوريدات العمومية", "General supplies") },
      // { href: "/services#soil-dewatering", label: localize("تجفيف التربة ونزح المياه", "Soil dewatering") },
    ],
  },
  {
    href: "/profile",
    label: localize("سابقة الأعمال", "Work profile"),
    children: [
      { href: "/profile#current", label: localize("الأعمال الحالية", "Current work") },
      { href: "/profile#previous", label: localize("الأعمال السابقة", "Previous work") },
    ],
  },
  { href: "/news", label: localize("الأخبار", "News") },
  { href: "/contact", label: localize("تواصل معنا", "Contact") },
];

export const common = {
  brandLine: localize(
    "مجموعة فري أم للمقاولات والاستشارات",
    "Contracting & consultancy group",
  ),
  nav: navigation,
  startProject: localize("ابدأ مشروعك", "Start your project"),
  exploreProjects: localize("استكشف مشروعاتنا", "Explore our projects"),
  contactUs: localize("تواصل معنا", "Contact us"),
  discoverMore: localize("اكتشف المزيد", "Discover more"),
  viewProject: localize("عرض تفاصيل المشروع", "View project details"),
  email: "freymcompanygroup@gmail.com",
  phone: "01227060667",
  address: localize(
    "المنوفية - بركة السبع - شارع مسجد الأبرار",
    "Berket El Sabaa, Menoufia, Egypt",
  ),
};

export const services = [
  {
    slug: "construction",
    number: "01",
    icon: "construction",
    image: "/images/services/construction-hd.png",
    title: localize(
      "التشييد والمقاولات العامة",
      "Construction & general contracting",
    ),
    description: localize(
      "متخصصون في تشييد المباني السكنية والتجارية الكبرى، الأنفاق وخزانات المياه والمباني العامة باستخدام أحدث الطرق الإنشائية والإشرافية.",
      "Large-scale residential, commercial and public construction delivered with modern structural methods and disciplined supervision.",
    ),
    features: [
      localize("أعمال البنية التحتية والطرق", "Infrastructure and roads"),
      localize(
        "المنشآت الخرسانية والمباني",
        "Concrete structures and buildings",
      ),
      localize("المباني العامة والخدمية", "Public and service buildings"),
    ],
    link: localize("التفاصيل والقدرات", "Capabilities & details"),
  },
  {
    slug: "medical",
    number: "02",
    icon: "medical",
    image: "/images/services/medical-hd.png",
    title: localize("التجهيزات العامة والطبية", "General & medical fit-outs"),
    description: localize(
      "تجهيز المنشآت الطبية وغير الطبية بأحدث الأنظمة، بما في ذلك غرف العمليات المعقمة ووحدات العناية المركزة.",
      "Advanced fit-outs for medical and general facilities, including sterile operating rooms and intensive-care units.",
    ),
    features: [
      localize("تجهيز غرف العمليات الكبرى", "Major operating rooms"),
      localize("شبكات الغازات الطبية", "Medical gas networks"),
      localize("التجهيزات الكهروميكانيكية", "Electromechanical systems"),
    ],
    link: localize("استعرض التجهيزات", "Explore fit-outs"),
  },
  {
    slug: "supplies",
    number: "03",
    icon: "supplies",
    image: "/images/services/supplies-hd.png",
    title: localize("التوريدات العمومية", "General supplies"),
    description: localize(
      "توريد كافة الاحتياجات الهندسية والصناعية والطبية للمؤسسات الحكومية وقطاع الأعمال بأعلى معايير الجودة.",
      "Reliable engineering, industrial and medical supplies for public institutions and enterprise clients.",
    ),
    features: [
      localize(
        "التوريدات الطبية والدوائية",
        "Medical and pharmaceutical supplies",
      ),
      localize("أنظمة الأمن والطاقة", "Security and power systems"),
      localize("مولدات الديزل والطاقة", "Diesel and power generators"),
    ],
    link: localize("قائمة التوريدات", "Supply catalogue"),
  },
  {
    slug: "maintenance",
    number: "04",
    icon: "maintenance",
    image: "/images/services/maintenance-hd.png",
    title: localize("أعمال الصيانة والتشغيل", "Maintenance & operations"),
    description: localize(
      "إدارة وصيانة المنشآت والمجمعات السكنية والتجارية لضمان استدامة الأداء والكفاءة التشغيلية.",
      "Facility operations and maintenance that protect uptime, safety and long-term performance.",
    ),
    features: [
      localize(
        "الصيانة الطبية والكهروميكانيكية",
        "Medical and electromechanical maintenance",
      ),
      localize("صيانة المصاعد وأنظمة التكييف", "Elevator and HVAC maintenance"),
      localize("إدارة المنشآت الحكومية", "Public-facility operations"),
    ],
    link: localize("حلول الصيانة", "Maintenance solutions"),
  },
  {
    slug: "interiors",
    number: "05",
    icon: "interiors",
    image: "/images/services/interiors-hd.png",
    title: localize("التصميمات الداخلية والديكور", "Interior design & décor"),
    description: localize(
      "خلق بيئات معمارية ملهمة من خلال التصميم الداخلي والخارجي المبتكر والتشطيبات فائقة الجودة.",
      "Inspiring architectural environments shaped through thoughtful interior design and premium finishes.",
    ),
    features: [
      localize("تصميم المنشآت الحكومية", "Public-space design"),
      localize("تشطيبات الوحدات السكنية", "Residential finishing"),
      localize("التصميم الخارجي والواجهات", "Façades and exteriors"),
    ],
    link: localize("معرض التصاميم", "Design portfolio"),
  },
  {
    slug: "landscape",
    number: "06",
    icon: "landscape",
    image: "/images/services/landscape-hd.png",
    title: localize("تجهيز المساحات الخضراء", "Landscape development"),
    description: localize(
      "تنسيق الحدائق والمتنزهات العامة واللاندسكيب لخلق مساحات خضراء متناغمة مع البيئة العمرانية.",
      "Landscape planning and public-realm development for resilient, welcoming green spaces.",
    ),
    features: [
      localize("تخطيط الحدائق العامة", "Public garden planning"),
      localize("أعمال اللاندسكيب والري", "Landscaping and irrigation"),
      localize("تطوير المساحات المفتوحة", "Open-space development"),
    ],
    link: localize("استكشف المزيد", "Explore landscapes"),
  },
  // {
  //   slug: "soil-dewatering",
  //   number: "07",
  //   icon: "dewatering",
  //   image: "/images/services/soil-dewatering-hd.png",
  //   title: localize(
  //     "تجفيف التربة ونزح المياه الجوفية",
  //     "Soil dewatering & groundwater control",
  //   ),
  //   description: localize(
  //     "تصميم وتنفيذ أنظمة خفض منسوب المياه الجوفية وتجفيف مواقع الحفر باستخدام حلول Wellpoint وDeep Well المناسبة لطبيعة التربة.",
  //     "Engineered groundwater control and excavation dewatering using wellpoint and deep-well systems selected for the site conditions.",
  //   ),
  //   features: [
  //     localize("دراسات الموقع ومنسوب المياه", "Site and groundwater assessment"),
  //     localize("أنظمة Wellpoint وDeep Well", "Wellpoint and deep-well systems"),
  //     localize("المراقبة والتشغيل المستمر", "Continuous monitoring and operation"),
  //   ],
  //   link: localize("حلول نزح المياه", "Dewatering solutions"),
  // },
];

export const projects = [
  {
    slug: "blood-bank",
    image: "/images/projects/blood-bank-hd.png",
    category: "supplies",
    tag: localize("صيانة وتوريد طبي", "Medical supply"),
    location: localize(
      "مديرية الشؤون الصحية بكفر الشيخ",
      "Kafr El Sheikh Health Directorate",
    ),
    title: localize(
      "توريد 10 ثلاجات طعوم بنك الدم",
      "Supply of 10 blood-bank refrigerators",
    ),
    description: localize(
      "مشروع توريد وتجهيز ثلاجات طبية متخصصة لحفظ الطعوم وفق أعلى المواصفات الطبية.",
      "Specialized medical refrigerators supplied and commissioned to exacting clinical standards.",
    ),
  },
  {
    slug: "autoclave",
    image: "/images/projects/autoclave-hd.png",
    category: "maintenance",
    tag: localize("صيانة طبية", "Medical maintenance"),
    location: localize(
      "مستشفى فيصل سعود العام",
      "Faisal Saud General Hospital",
    ),
    title: localize(
      "صيانة جهاز أوتوكلاف روسي 75 لتر",
      "75-litre autoclave maintenance",
    ),
    description: localize(
      "إصلاح وصيانة دورية شاملة لأجهزة التعقيم المركزية لضمان كفاءة العمليات التشغيلية.",
      "Comprehensive preventive and corrective maintenance for central sterile equipment.",
    ),
  },
  {
    slug: "icu",
    image: "/images/projects/icu-hd.png",
    category: "maintenance",
    tag: localize("صيانة طبية", "Medical maintenance"),
    location: localize("مستشفى حميات دسوق", "Desouk Fever Hospital"),
    title: localize(
      "عقد صيانة وحدة العناية المركزة",
      "Intensive-care maintenance contract",
    ),
    description: localize(
      "الإشراف الفني والصيانة الوقائية لكافة التجهيزات الكهروميكانيكية والطبية بوحدة العناية المركزة.",
      "Technical oversight and preventive care for ICU medical and electromechanical equipment.",
    ),
  },
  {
    slug: "generator",
    image: "/images/projects/generator-hd.png",
    category: "supplies",
    tag: localize("كهروميكانيك", "Electromechanical"),
    location: localize("مستشفى قفط المركزي", "Qift Central Hospital"),
    title: localize(
      "أنظمة الديزل والكهرباء الاحتياطية",
      "Diesel and standby power systems",
    ),
    description: localize(
      "تركيب وصيانة المولدات الاحتياطية ولوحات التحكم لضمان استمرارية التيار الكهربائي.",
      "Standby generators and control panels installed to protect critical electrical continuity.",
    ),
  },
  {
    slug: "operating-rooms",
    image: "/images/projects/operating-room-hd.png",
    category: "construction",
    tag: localize("إنشاءات طبية", "Medical construction"),
    location: localize(
      "مستشفى كفر الشيخ العام",
      "Kafr El Sheikh General Hospital",
    ),
    title: localize(
      "استكمال غرف العمليات الكبرى",
      "Completion of major operating rooms",
    ),
    description: localize(
      "أعمال التشطيب والتجهيز لغرف العمليات بأحدث الأنظمة المعقمة وشبكات الغازات الطبية.",
      "Operating-room construction with sterile finishes and integrated medical-gas systems.",
    ),
  },
  {
    slug: "elevators",
    image: "/images/projects/elevator-hd.png",
    category: "interiors",
    tag: localize("تطوير وتجديد", "Upgrade & renewal"),
    location: localize("المجمعات الحكومية", "Government facilities"),
    title: localize(
      "رفع كفاءة المصاعد بالمجمعات الحكومية",
      "Government elevator modernization",
    ),
    description: localize(
      "مشروع تحديث أنظمة التشغيل والأمان للمصاعد ورفع مستوى الكفاءة والاعتمادية.",
      "Modernized lift controls and safety systems for stronger reliability and performance.",
    ),
  },
];

export const processSteps = [
  localize("دراسة الجدوى", "Feasibility study"),
  localize("التصميم الأولي", "Concept design"),
  localize("التصميم التفصيلي", "Detailed design"),
  localize("التنفيذ والبناء", "Construction"),
  localize("التشغيل والتكليف", "Commissioning"),
  localize("الصيانة", "Maintenance"),
  localize("التسليم", "Handover"),
];

export const executiveLeader = {
  image: "/images/team/mohamed-haggag.png",
  name: localize("د / محمد حجاج ", "Dr. Mohamed Haggag"),
  role: localize("الرئيس التنفيذي والمؤسس", "CEO & Founder"),
};

export const values = [
  {
    icon: "integrity",
    title: localize("المصداقية", "Integrity"),
    body: localize(
      "نلتزم بقيم مهنية راسخة لضمان استدامة علاقاتنا.",
      "Clear commitments and responsible delivery in every relationship.",
    ),
  },
  {
    icon: "quality",
    title: localize("الإتقان المستمر", "Lasting quality"),
    body: localize(
      "نرفع سقف الجودة في كل مرحلة من مراحل التنفيذ.",
      "We raise the quality bar at every stage of delivery.",
    ),
  },
  {
    icon: "innovation",
    title: localize("الابتكار المستمر", "Innovation"),
    body: localize(
      "نوظف أحدث التقنيات لبناء حلول عملية ومستدامة.",
      "Modern tools and thinking solve real operational needs.",
    ),
  },
  {
    icon: "development",
    title: localize("التطوير المتواصل", "Continuous growth"),
    body: localize(
      "نستثمر في الكفاءات والمعرفة ونطور منظومة العمل.",
      "We invest in people, expertise and better ways of working.",
    ),
  },
];

export const whyUs = [
  {
    number: "01",
    title: localize("خبرة ميدانية متراكمة", "Accumulated field expertise"),
    body: localize(
      "خبرات عملية ممتدة في المواقع الحيوية والمشروعات ذات المتطلبات الفنية الدقيقة.",
      "Practical experience across essential facilities and technically demanding projects.",
    ),
  },
  {
    number: "02",
    title: localize("حلول هندسية متكاملة", "Integrated engineering solutions"),
    body: localize(
      "نجمع التصميم والتوريد والتنفيذ والصيانة داخل منظومة واحدة واضحة المسؤوليات.",
      "Design, supply, delivery and maintenance coordinated through one accountable system.",
    ),
  },
  {
    number: "03",
    title: localize("تطوير وتدريب مستمر", "Continuous development"),
    body: localize(
      "نستثمر في الكفاءات الفنية والإدارية ونطوّر أدوات العمل وفق أحدث المعايير.",
      "We invest in technical and managerial talent and keep our delivery methods current.",
    ),
  },
  {
    number: "04",
    title: localize("حلول عملية مبتكرة", "Practical innovation"),
    body: localize(
      "نحوّل تحديات الموقع إلى حلول قابلة للتنفيذ تحمي الجودة والوقت والتكلفة.",
      "Site challenges become buildable solutions that protect quality, time and cost.",
    ),
  },
  {
    number: "05",
    title: localize("أعمالنا تتحدث عنا", "A track record that speaks"),
    body: localize(
      "كل مشروع هو مرجع جديد لجودة التنفيذ والانضباط في التسليم وخدمة ما بعد التشغيل.",
      "Every project adds a reference for delivery quality, schedule discipline and aftercare.",
    ),
  },
  {
    number: "06",
    title: localize("كوادر متخصصة", "Specialist teams"),
    body: localize(
      "فرق متعددة التخصصات تعمل بروح واحدة ومسؤولية واضحة في كل مرحلة.",
      "Multidisciplinary teams work as one, with clear ownership at every stage.",
    ),
  },
];

export const leadershipMessage = {
  eyebrow: localize("من الحلم إلى أثرٍ مستدام", "From a dream to lasting impact"),
  title: localize("رسالة الرئيس التنفيذي", "A message from the CEO"),
  lead: localize(
    "ثقة عملائنا هي أساس نجاحنا، والجودة هي خيارنا الوحيد.",
    "Our clients' trust is the foundation of our success, and quality is our only choice.",
  ),
  paragraphs: [
    localize(
      "بدأت رحلتنا حلمًا، ثم أصبحت — بفضل الله وجهود فريقنا المخلص — واقعًا يتقدم بثبات. عبرنا التحديات وحققنا نجاحات متتالية حتى رسّخت Frey-M مكانتها بين الشركات الموثوقة في مصر، وما زلنا نطوّر قدراتنا وخططنا الاستراتيجية لنشارك بفاعلية في النهضة العمرانية والاقتصادية.",
      "Our journey began as a dream and, by God's grace and the dedication of our team, became a reality that continues to advance. We overcame challenges and built Frey-M into a trusted name in Egypt, while continuously developing our capabilities to contribute to the country's urban and economic progress.",
    ),
    localize(
      "نجعل الجودة خيارًا وحيدًا لا بديل له؛ من الطرق والجسور والمنشآت المعقدة والمباني المرموقة، إلى أعمال البنية التحتية والتجهيزات والصيانة الطبية والكهروميكانيكية والإلكترونية. يقف خلف كل إنجاز فريق يعمل بروح واحدة ومسؤولية كاملة، لنوفي بالتزاماتنا في جميع الظروف ونقدّم نتائج تتجاوز تطلعات عملائنا.",
      "Quality is our only standard—from roads, bridges and complex structures to distinguished buildings, infrastructure, specialist fit-outs, and medical, electromechanical and electronic maintenance. Behind every achievement is one accountable team, committed to delivering in every circumstance and exceeding our clients' expectations.",
    ),
  ],
  principles: [
    localize("المصداقية", "Integrity"),
    localize("المهنية", "Professionalism"),
    localize("الالتزام", "Commitment"),
  ],
};

export const newsItems = [
  {
    slug: "operating-rooms-milestone",
    image: "/images/news/operating-room-handover.png",
    tag: localize("تحديثات المشروعات", "Project update"),
    title: localize(
      "استكمال منظومة تجهيز غرف العمليات الكبرى",
      "Major operating-room fit-out milestone",
    ),
    description: localize(
      "نظرة على تكامل التشطيبات المعقمة وشبكات الغازات الطبية وأنظمة التحكم البيئي داخل المشروع.",
      "A closer look at sterile finishes, medical-gas networks and environmental controls working as one system.",
    ),
    href: "/projects/operating-rooms",
  },
  {
    slug: "critical-maintenance",
    image: "/images/news/preventive-maintenance.png",
    tag: localize("الصيانة والتشغيل", "Maintenance & operations"),
    title: localize(
      "لماذا تبدأ موثوقية المنشآت الحيوية بالصيانة الوقائية؟",
      "Why critical-facility reliability starts with preventive care",
    ),
    description: localize(
      "منهج واضح للفحص الدوري وإدارة الأعطال وحماية استمرارية التشغيل داخل وحدات الرعاية الحرجة.",
      "A disciplined approach to inspections, fault management and uptime in critical-care environments.",
    ),
    href: "/projects/icu",
  },
  {
    slug: "standby-power",
    image: "/images/news/standby-power-test.png",
    tag: localize("حلول الطاقة", "Power systems"),
    title: localize(
      "رفع جاهزية أنظمة الديزل والطاقة الاحتياطية",
      "Improving standby power readiness",
    ),
    description: localize(
      "كيف تتكامل المولدات ولوحات التحكم وخطط الاختبار لحماية المنشآت من توقف التيار.",
      "How generators, control panels and testing plans combine to protect essential facilities from outages.",
    ),
    href: "/projects/generator",
  },
];

export const companies = [
  {
    number: "01",
    title: localize(
      "شركة Frey-M للتشييد والصيانة",
      "Frey-M Construction & Maintenance",
    ),
    body: localize(
      "الذراع المتخصص في أعمال التشييد والبناء والصيانة والاستشارات الهندسية.",
      "The group arm for construction, maintenance and engineering consultancy.",
    ),
  },
  {
    number: "02",
    title: localize(
      "مكتب ثري 3 أم للمقاولات العمومية",
      "3M General Contracting Office",
    ),
    body: localize(
      "متخصص في تنفيذ المباني السكنية والتوريدات العمومية وخدمات المؤسسات.",
      "Residential construction, public supply and institutional field services.",
    ),
  },
  {
    number: "03",
    title: localize("شركة الرحاب ميديكال", "Al Rehab Medical"),
    body: localize(
      "متخصصة في التوريدات والتجهيزات الطبية وصيانة المستشفيات.",
      "Medical supplies, clinical fit-outs and hospital maintenance.",
    ),
  },
];

export const faqs = [
  {
    q: localize(
      "ما هو مجال عمل شركة Frey-M Group الرئيسي؟",
      "What is Frey-M Group's core business?",
    ),
    a: localize(
      "نقدم حلولاً متكاملة في التشييد والصيانة والتجهيزات الطبية والتوريدات والتصميم الداخلي.",
      "We deliver integrated construction, maintenance, medical fit-out, supply and interior-design solutions.",
    ),
  },
  {
    q: localize(
      "ما هي الكيانات التي تضمها مجموعة فري أم؟",
      "Which companies make up the group?",
    ),
    a: localize(
      "تضم المجموعة ثلاثة كيانات متخصصة تغطي الأنشطة الهندسية والتنفيذية والطبية.",
      "Three specialist entities cover the group's engineering, delivery and medical capabilities.",
    ),
  },
  {
    q: localize(
      "كيف يمكنني الحصول على عرض سعر؟",
      "How can I request a quotation?",
    ),
    a: localize(
      "أرسل تفاصيل مشروعك عبر نموذج التواصل وسيتواصل فريقنا معك لدراسة المتطلبات.",
      "Send your project details through the contact form and our team will review the requirements with you.",
    ),
  },
  {
    q: localize(
      "هل تقدم الشركة خدمات الصيانة الطبية؟",
      "Do you provide medical maintenance?",
    ),
    a: localize(
      "نعم، تشمل خدماتنا الصيانة الوقائية والتصحيحية للتجهيزات الطبية والكهروميكانيكية.",
      "Yes. We provide preventive and corrective maintenance for medical and electromechanical equipment.",
    ),
  },
];

export const partners = [
  {
    name: localize(
      "شركة أبو زعبل للصناعات المتخصصة",
      "Abu Zaabal Specialized Industries",
    ),
    logo: "/images/partners/azsi-cutout.webp",
  },
  {
    name: localize(
      "الهيئة العربية للتصنيع",
      "Arab Organization for Industrialization",
    ),
    logo: "/images/partners/aoi-cutout.webp",
  },
  {
    name: localize("جامعة المنصورة", "Mansoura University"),
    logo: "/images/partners/mansoura-university-cutout.webp",
  },
  {
    name: localize(
      "مديرية الشؤون الصحية بكفر الشيخ",
      "Kafr El Sheikh Health Directorate",
    ),
    logo: "/images/partners/kafr-el-sheikh-health-cutout.webp",
  },
  {
    name: localize("مستشفى قفط التخصصي", "Qeft Specialized Hospital"),
    logo: "/images/partners/qeft-hospital-cutout.webp",
  },
  {
    name: localize(
      "مديرية الصحة والسكان بالبحيرة",
      "Beheira Health Directorate",
    ),
    logo: "/images/partners/beheira-health-cutout.webp",
  },
  {
    name: localize(
      "مديرية الشؤون الصحية ببني سويف",
      "Beni Suef Health Directorate",
    ),
    logo: "/images/partners/beni-suef-health-cutout.webp",
  },
  {
    name: localize("جامعة أسيوط", "Assiut University"),
    logo: "/images/partners/assiut-university-cutout.webp",
  },
];
