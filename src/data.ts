import { Service, Clinician, Article } from './types';

export const SERVICES: Service[] = [
  {
    id: 'gp-consultations',
    name: 'General Practice & Consultations',
    category: 'General Practice',
    description: 'Expert, unhurried consultations with dedicated clinical experts. From acute illness management and routine physicals to comprehensive diagnostics and rapid referral letters.',
    price: 95,
    duration: 30,
    icon: 'Stethoscope',
    highlights: [
      'Same-day options available',
      'Thorough clinical history reviewing & symptoms analysis',
      'Direct link to specialist referrals without delay',
      'Comfortable, premium private clinical spaces'
    ],
    preparation: 'Please bring any active prescriptions, recent clinical records, or symptom logs you may have compiled.'
  },
  {
    id: 'diagnostic-imaging',
    name: 'Diagnostic & Advanced Imaging',
    category: 'Imaging',
    description: 'High-precision clinical diagnostic scanning. Guided by state-of-the-art imaging technology, facilitating rapid and accurate assessment of physical conditions.',
    price: 180,
    duration: 45,
    icon: 'Activity',
    highlights: [
      'State-of-the-art ultrasound scanning systems',
      'Radiologist reviewed reports within 24-48 hours',
      'Immediate referral pathways for MRI or CT scans',
      'Pristine, stress-free clinical configuration'
    ],
    preparation: 'For abdominal scans, please fast for 6 hours. For pelvic scans, please drink 1 litre of water an hour before.'
  },
  {
    id: 'physiotherapy-rehab',
    name: 'Physiotherapy & Musculoskeletal Rehab',
    category: 'Physiotherapy',
    description: 'Bespoke rehabilitation programs to resolve acute strain, chronic dysfunction, or sports injuries. Focused on biomechanical optimization and pain reduction.',
    price: 85,
    duration: 45,
    icon: 'Activity',
    highlights: [
      'Detailed gait, alignment, and movement diagnostics',
      'Manual therapies combined with strategic target exercises',
      'Comprehensive follow-home self-treatment programs',
      'Dynamic physical performance and bio-mobility tracking'
    ],
    preparation: 'Please wear comfortable, loose-fitting athletic clothing to allow unrestricted articulation of joints.'
  },
  {
    id: 'pathology-lab',
    name: 'Pathology & Precision Laboratory Tests',
    category: 'Pathology Lab',
    description: 'Advanced, high-accuracy biochemical screening. From routine complete blood counts to target hormonal profiles, metabolic assessments, and nutritional mapping.',
    price: 120,
    duration: 30,
    icon: 'Beaker',
    highlights: [
      'Over 40 comprehensive blood panels available',
      'Direct clinician analysis during results delivery',
      'Rapid turnaround times (often next-day results)',
      'Ultra-gentle drawing techniques with seasoned practitioners'
    ],
    preparation: 'Some panels require overnight fasting (10-12 hours). Please drink plain water to remain hydrated.'
  },
  {
    id: 'immunisations-vaccines',
    name: 'Clinical Immunisations & Boosters',
    category: 'Immunisations',
    description: 'Essential preventive healthcare. Seasonally adjusted flu and covid defense, comprehensive corporate vaccine programs, and complete occupational or travel immunisations.',
    price: 60,
    duration: 15,
    icon: 'ShieldAlert',
    highlights: [
      'Seasonal cold and flu vaccine protection',
      'Full suite of international travel vaccines available',
      'Post-vaccination window checks and recovery support',
      'Pediatric vaccinations held in quiet, calming environments'
    ],
    preparation: 'Please bring your vaccine history card or reference list, and avoid heavy meals or fasting prior to administration.'
  },
  {
    id: 'mental-wellness',
    name: 'Psychological Wellness & Counselling',
    category: 'Mental Wellness',
    description: 'Private, fully confidential consultations with sympathetic therapeutic experts. Integrating evidence-based clinical practices with strategic lifestyle advice.',
    price: 110,
    duration: 50,
    icon: 'Shield',
    highlights: [
      'Experienced psychotherapy practitioners',
      'Support for stress, burnout, mood disorders, and life transitions',
      'Strictly confidential and unhurried session lengths',
      'Holistic integration with general medical care'
    ],
    preparation: 'There is no formal preparation required; feel free to jot down core areas or feelings you are hoping to explore.'
  }
];

export const CLINICIANS: Clinician[] = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    role: 'Co-Founder & Lead Clinician',
    specialty: 'Family Medicine & Preventive Screenings',
    bio: 'Dr. Jenkins possesses over 15 years of family practice experience with a deep dedication to preventative health, cardiovascular wellness, and longevity medicine. She holds advanced degrees from Edinburgh School of Medicine.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    availableDays: [1, 2, 3, 4], // Mon - Thu
    timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM', '03:30 PM']
  },
  {
    id: 'james-thornton',
    name: 'James Thornton, PT',
    role: 'Head of Physiotherapy & Rehab',
    specialty: 'Musculoskeletal Rehab & Biomechanics',
    bio: 'James partners with patients ranging from elite regional sports professionals to those desiring mobility restoration. He utilizes hands-on tissue manipulation alongside strategic motor-pattern reeducation.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    availableDays: [1, 3, 5], // Mon, Wed, Fri
    timeSlots: ['08:30 AM', '10:15 AM', '11:30 AM', '02:00 PM', '03:15 PM', '04:30 PM']
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez, NP',
    role: 'Lead Nurse Practitioner',
    specialty: 'Acute Care & Integrative Wellness',
    bio: 'Elena is committed to immediate care and dynamic lifestyle interventions. She bridges standard clinical assessments with practical, functional nutrition, and preventive stress guidance plans.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600',
    availableDays: [2, 4, 5], // Tue, Thu, Fri
    timeSlots: ['09:00 AM', '10:30 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM']
  },
  {
    id: 'mark-walton',
    name: 'Dr. Mark Walton',
    role: 'Chief of Diagnostics & Pathology',
    specialty: 'Precision Diagnostics & Clinical Pathology',
    bio: 'Dr. Walton oversees our diagnostic accuracy, bringing clinical experience from leading teaching hospitals. He is a recognized authority on early tumor screening panels and advanced endocrine profiling.',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    availableDays: [1, 2, 4], // Mon, Tue, Thu
    timeSlots: ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM']
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'winter-immune-defense',
    title: 'Optimizing Your Immune System for the Winter Season',
    subtitle: 'How proactive nutrition, circadian rhythm adjustment, and strategic supplementation can shield you against cold-weather ailments.',
    author: {
      name: 'Dr. Emily Chen',
      role: 'Chief Medical Officer',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'
    },
    date: 'Oct 12, 2024',
    category: 'Preventative Medicine',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1511174511562-5f7f18b854f2?auto=format&fit=crop&q=80&w=800',
    tags: ['Immunity', 'Prevention', 'Winter Health'],
    content: [
      'As winter approaches, changes in daily ambient light levels, environmental temperatures, and crowd densities place exceptional stress on our biological defense systems. Our immune health is not a static shield, but a highly dynamic process that adapts continuously based on our behavior, rest, and nutritional intake.',
      'To build robust resistance against common winter pathogens without relying on late-stage reactive treatments, we must focus on three core areas: nourishing the intestinal mucosal barrier, stabilizing circadian cycles to generate restorative cytokine profiles, and incorporating highly validated clinical supplements.',
      '1. The Nutrient-Dense Foundation: It is estimated that more than 70% of human immune cells reside directly in the gut-associated lymphoid tissue (GALT). Protecting this barrier is paramount. Optimize your cellular health by consuming complex fiber-rich vegetables (such as kale, broccoli, brussels sprouts, and squash), powerful anti-inflammatory aromatics (ginger, raw garlic, and turmeric), and naturally fermented foods containing probiotic strains.',
      '2. Circadian Rhythm & Light: Our immune cells are governed by intrinsic biological clocks. When these clocks are disrupted by irregular sleep or lack of natural light, defense capacity drops severely. Ensure you seek 10 to 15 minutes of direct morning sunlight within an hour of rising, even on overcast winter days. Keep your sleep environment cool and dark, striving for 7-8 hours of continuous, unfragmented sleep. It is during deep slow-wave sleep that our bodies synthesize the critical cytokines necessary to neutralize invaders.',
      '3. Clinically Guided Supplementation: Precision dosing of winter supplements should always fit your physiological baselines. Highly targeted interventions include Vitamin D3 paired with K2 (which ensures calcium is directed to the bone matrix rather than soft blood vessels), bioactive Zinc (such as zinc picolinate) to inhibit viral replication enzymes, and raw Vitamin C for cell-level antioxidant support.',
      'By making these simple yet powerful lifestyle coordinates part of your winter preventative outline, you significantly reduce susceptible windows and foster long-term resilience for you and your family.'
    ]
  },
  {
    id: 'managing-cortisol',
    title: 'Managing Cortisol Through Breathwork',
    subtitle: 'Understand the biological pathways linking deep diaphragmatic breathing to immediate parasympathetic nervous system activation.',
    author: {
      name: 'Elena Rodriguez, NP',
      role: 'Lead Nurse Practitioner',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150'
    },
    date: 'Sep 28, 2024',
    category: 'Stress Management',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    tags: ['Mental Health', 'Breathwork', 'Stress Relief'],
    content: [
      'Chronic high levels of cortisol — the body\'s main stress hormone — can erode cellular health, impair focus, and degrade sleep patterns. While external life triggers can be hard to eliminate immediately, you hold a powerful direct dial to reset your stress responses instantly: your breathing control.',
      'When we experience stress, our breathing naturally becomes rapid and shallow, triggering the sympathetic nervous system (our "fight or flight" mode). Diaphragmatic breathing operates as a direct manual override. By consciously drawing breath deep into the lower lobes of your lungs, you expand your rib cage and exert downward force on the vagus nerve.',
      'The vagus nerve is the biological superhighway of the parasympathetic nervous system (our "rest and digest" mode). Stimulating it initiates a chemical cascade that lowers heart rate, dilates blood vessels, and curtails adrenal cortisol outputs.',
      'One exceptionally effective pattern is "Box Breathing" (Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4) performed for just five minutes twice daily. Integrating this practice is a robust, clinically validated habit to maintain biological balance amidst high-intensity modern schedules.'
    ]
  },
  {
    id: 'gut-brain-connection',
    title: 'The Gut-Brain Connection Explained',
    subtitle: 'Explore the vagus nerve and microbiome pathways that explain why intestinal health dictates cognitive clarity.',
    author: {
      name: 'Dr. Sarah Jenkins',
      role: 'Co-Founder & Lead Clinician',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'
    },
    date: 'Aug 17, 2024',
    category: 'Neuro-Gastroenterology',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    tags: ['Microbiome', 'Nutrition', 'Integrative Medicine'],
    content: [
      'Have you ever felt "butterflies" in your gut, or experienced a sour stomach when facing a difficult decision? These are not mere metaphors, but real-time examples of the bidirectional communication channel known as the Gut-Brain Axis.',
      'Your gut is home to the Enteric Nervous System (ENS), containing over 100 million neurons—so many that researchers frequently refer to it as our "second brain." The gut and the skull-brain communicate continuously via chemical transmitters and the vast physical cables of the vagus nerve.',
      'Remarkably, over 90% of the body\'s serotonin, the neurotransmitter responsible for mood, satisfaction, and sleep regulation, is synthesized not in your brain, but by the microscopic inhabitants of your digestive tract. An imbalanced microbiome can dispatch distress signals directly to the brain, inducing feelings of anxiety, mental fog, or fatigue.',
      'Nourishing this axis involves replacing processed, sugar-laden foods with prebiotic fibers and healthy fats. Incorporating organic olive oil, wild-caught mackerel, and rich fermented foods acts directly to reduce localized neuroinflammation, contributing to sustained mental clarity, stable emotional states, and robust daily cognitive performance.'
    ]
  },
  {
    id: 'annual-screenings',
    title: 'Annual Screenings: Why Precision Matters',
    subtitle: 'Why generic periodic physicals are failing, and how detailed laboratory tracking flags conditions before they manifest symptoms.',
    author: {
      name: 'Dr. Mark Walton',
      role: 'Chief of Diagnostics & Pathology',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150'
    },
    date: 'Jul 05, 2024',
    category: 'Diagnostics & Pathology',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800',
    tags: ['Diagnostics', 'Screenings', 'Longevity'],
    content: [
      'Conventional modern medicine operates predominantly on a reactive model: waiting for symptoms to manifest before initiating investigation. However, by the time symptoms arise, many metabolic and physiological imbalances have already quietly progressed for multiple years.',
      'Precision profiling changes this paradigm. By examining detailed biomarkers—such as hs-CRP (high-sensitivity C-reactive protein, a marker of vascular inflammation), HbA1c (comprehensive three-month glucose exposure), and extensive lipid sub-fractions—we discover subtle functional anomalies early.',
      'These advanced screenings act as a preventative alarm system. They afford us the critical opportunities to make lifestyle adjustments, dietary modifications, and mild diagnostic updates that can completely halt or reverse chronic disease vectors long before they require prescription treatments.',
      'To build a genuine healthspan plan, we recommend scheduling an individualized pathological mapping panel annually. Knowing your precise baselines empowers us to curate customized, proactive programs that secure your health decades into the future.'
    ]
  }
];
