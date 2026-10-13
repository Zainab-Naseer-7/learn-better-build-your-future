/* ==========================================================================
   EDUVANTA - DATA REPOSITORY
   High-end International EdTech Curricula, Instructors & Testimonials
   ========================================================================== */

const EDUVANTA_DATA = {
  categories: [
    { id: 'all', name: 'All Specialties', icon: 'sparkles', count: 12 },
    { id: 'ai', name: 'Artificial Intelligence & ML', icon: 'cpu', count: 3 },
    { id: 'engineering', name: 'Full-Stack Engineering', icon: 'code', count: 3 },
    { id: 'data', name: 'Data Systems & Analytics', icon: 'database', count: 2 },
    { id: 'design', name: 'Digital Product Design', icon: 'palette', count: 2 },
    { id: 'cloud', name: 'Cloud Architecture & DevOps', icon: 'cloud', count: 2 }
  ],

  courses: [
    {
      id: 'course-ai-101',
      title: 'Generative AI Systems & Large Language Model Architecture',
      slug: 'generative-ai-systems-llm-architecture',
      category: 'ai',
      categoryName: 'Artificial Intelligence',
      level: 'Advanced',
      rating: 4.98,
      ratingCount: 1420,
      studentsCount: 9480,
      duration: '38h 45m',
      lessonsCount: 42,
      price: 189,
      originalPrice: 279,
      badge: 'Bestseller',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      instructor: {
        id: 'inst-dr-elena',
        name: 'Dr. Elena Vance',
        title: 'Staff AI Research Scientist',
        company: 'DeepMind',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
      },
      description: 'Master transformer architecture, attention mechanisms, fine-tuning with LoRA/QLoRA, RLHF pipelines, and production vector indexing.',
      whatYouLearn: [
        'Engineer deep neural transformer networks from raw PyTorch',
        'Train & fine-tune open weights LLMs using LoRA, PEFT, and DeepSpeed',
        'Implement enterprise Retrieval-Augmented Generation (RAG) with hybrid vector stores',
        'Evaluate hallucination metrics, safety guardrails, and latency optimization',
        'Deploy low-latency inference endpoints with vLLM, TensorRT-LLM, and Triton',
        'Architect autonomous multi-agent systems using state graphs'
      ],
      curriculum: [
        {
          module: 'Module 1: Mathematical Foundations of Attention',
          lessons: [
            { id: 'l1', title: 'Self-Attention Mechanics & Vector Matrix Computation', duration: '24m', isPreview: true },
            { id: 'l2', title: 'Positional Encoding: RoPE and ALiBi Deep-Dive', duration: '32m', isPreview: true },
            { id: 'l3', title: 'Multi-Head Attention vs. Grouped Query Attention (GQA)', duration: '28m', isPreview: false }
          ]
        },
        {
          module: 'Module 2: LLM Pre-Training & Quantization Engineering',
          lessons: [
            { id: 'l4', title: 'Dataset Tokenization, Curation & BPE Tokenizers', duration: '41m', isPreview: false },
            { id: 'l5', title: 'Distributed Model Parallelism with Megatron & FSDP', duration: '49m', isPreview: false },
            { id: 'l6', title: '4-bit and 8-bit Quantization (AWQ, GPTQ, BitsAndBytes)', duration: '35m', isPreview: false }
          ]
        },
        {
          module: 'Module 3: Enterprise RAG & Vector Data Infrastructures',
          lessons: [
            { id: 'l7', title: 'Semantic Chunking & Dense vs Sparse Hybrid Search', duration: '36m', isPreview: false },
            { id: 'l8', title: 'Re-Ranking Algorithms (Cohere Rerank, BGE Reranker)', duration: '29m', isPreview: false },
            { id: 'l9', title: 'Production GraphRAG & Context Window Management', duration: '44m', isPreview: false }
          ]
        }
      ]
    },
    {
      id: 'course-dev-201',
      title: 'Full-Stack High-Scale Architecture & Distributed Systems',
      slug: 'fullstack-high-scale-architecture-distributed-systems',
      category: 'engineering',
      categoryName: 'Full-Stack Engineering',
      level: 'Intermediate',
      rating: 4.96,
      ratingCount: 2180,
      studentsCount: 14200,
      duration: '46h 15m',
      lessonsCount: 54,
      price: 159,
      originalPrice: 249,
      badge: 'Popular',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      instructor: {
        id: 'inst-marcus-chen',
        name: 'Marcus Chen',
        title: 'Principal Distributed Architect',
        company: 'Stripe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
      },
      description: 'Learn how modern tier-1 engineering companies scale systems to millions of concurrent requests with distributed databases and event streaming.',
      whatYouLearn: [
        'Design resilient microservices with event-driven architectures via Kafka',
        'Handle distributed transactions with the Saga and Outbox patterns',
        'Master caching topologies with multi-tier Redis and cache-aside invalidation',
        'Mitigate database concurrency conflicts, row locks, and write amplification',
        'Build high-performance real-time WebSockets and gRPC microservices'
      ],
      curriculum: [
        {
          module: 'Module 1: Architectural Patterns for Extreme Throughput',
          lessons: [
            { id: 'l10', title: 'Monolith Decoupling: Strangler Fig Pattern in Production', duration: '27m', isPreview: true },
            { id: 'l11', title: 'Idempotency Keys and Exactly-Once Event Delivery', duration: '34m', isPreview: true },
            { id: 'l12', title: 'Rate Limiting Algorithms: Token Bucket vs Leaky Bucket', duration: '22m', isPreview: false }
          ]
        },
        {
          module: 'Module 2: Distributed Data & Event Streaming',
          lessons: [
            { id: 'l13', title: 'Kafka Partitioning Strategy, Lag Monitoring & Offsets', duration: '45m', isPreview: false },
            { id: 'l14', title: 'Database Sharding and Consistent Hashing Rings', duration: '39m', isPreview: false }
          ]
        }
      ]
    },
    {
      id: 'course-design-301',
      title: 'Design Systems at Enterprise Scale: Figma to Code Tokens',
      slug: 'design-systems-enterprise-scale-figma-to-code',
      category: 'design',
      categoryName: 'Digital Product Design',
      level: 'All Levels',
      rating: 4.95,
      ratingCount: 940,
      studentsCount: 7800,
      duration: '29h 10m',
      lessonsCount: 36,
      price: 139,
      originalPrice: 199,
      badge: 'Featured',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
      instructor: {
        id: 'inst-sarah-lindqvist',
        name: 'Sarah Lindqvist',
        title: 'Design Systems Director',
        company: 'Spotify',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      description: 'Bridge design and engineering with multi-brand design tokens, accessible component libraries, interactive states, and automated design linting.',
      whatYouLearn: [
        'Architect scalable multi-tier design tokens (Global, Semantic, Component)',
        'Configure Figma Variables with automated mode switching for dark/light themes',
        'Create bulletproof accessible component specs complying with WCAG 2.2 AAA',
        'Export tokens automatically to CSS and Tailwind with Style Dictionary pipelines'
      ],
      curriculum: [
        {
          module: 'Module 1: Foundations of Systematic Design',
          lessons: [
            { id: 'l15', title: 'Token Architecture: Semantic vs Literal Naming Tokens', duration: '21m', isPreview: true },
            { id: 'l16', title: 'Building Fluid Typography & Spacing Systems', duration: '30m', isPreview: true }
          ]
        },
        {
          module: 'Module 2: Advanced Interactive Component States',
          lessons: [
            { id: 'l17', title: 'State Machines for Complex Forms and Dropdowns', duration: '38m', isPreview: false },
            { id: 'l18', title: 'Automating Figma-to-Code Sync via GitHub Actions', duration: '42m', isPreview: false }
          ]
        }
      ]
    },
    {
      id: 'course-cloud-401',
      title: 'Kubernetes Platform Engineering & GitOps at Cloud Scale',
      slug: 'kubernetes-platform-engineering-gitops-scale',
      category: 'cloud',
      categoryName: 'Cloud Architecture & DevOps',
      level: 'Advanced',
      rating: 4.97,
      ratingCount: 1650,
      studentsCount: 8900,
      duration: '42h 00m',
      lessonsCount: 48,
      price: 179,
      originalPrice: 259,
      badge: 'New',
      thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
      instructor: {
        id: 'inst-tariq-mansour',
        name: 'Tariq Mansour',
        title: 'Lead SRE & Platform Architect',
        company: 'Google Cloud',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
      },
      description: 'Build enterprise Internal Developer Platforms (IDP) with ArgoCD, Terraform, service mesh networking (Istio), and zero-trust security postures.',
      whatYouLearn: [
        'Deploy production Kubernetes clusters with Infrastructure as Code',
        'Establish automated GitOps deployment pipelines with ArgoCD and Helm',
        'Configure Istio service mesh for canary deployments and mTLS security',
        'Implement Prometheus, Grafana, and OpenTelemetry observability stacks'
      ],
      curriculum: [
        {
          module: 'Module 1: Production Kubernetes Cluster Architecture',
          lessons: [
            { id: 'l19', title: 'Control Plane Internals, etcd Clustering & Quorum', duration: '35m', isPreview: true },
            { id: 'l20', title: 'Custom Resource Definitions (CRDs) & Operator SDK', duration: '41m', isPreview: false }
          ]
        }
      ]
    },
    {
      id: 'course-data-501',
      title: 'Modern Data Engineering with Snowflake, dbt & Apache Iceberg',
      slug: 'modern-data-engineering-snowflake-dbt-iceberg',
      category: 'data',
      categoryName: 'Data Systems & Analytics',
      level: 'Intermediate',
      rating: 4.94,
      ratingCount: 1100,
      studentsCount: 6540,
      duration: '34h 30m',
      lessonsCount: 39,
      price: 149,
      originalPrice: 219,
      badge: 'Bestseller',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      instructor: {
        id: 'inst-priya-sharma',
        name: 'Priya Sharma',
        title: 'VP of Data Engineering',
        company: 'FinTech Capital',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
      },
      description: 'Design analytical lakehouses, real-time streaming ETL, semantic data models with dbt, and open table formats with Apache Iceberg.',
      whatYouLearn: [
        'Architect resilient Lakehouse storage with Apache Iceberg and Parquet',
        'Build automated modular data transformation models with dbt Core',
        'Orchestrate multi-tenant data pipelines using Airflow and Dagster',
        'Implement automated data contracts and quality testing with Great Expectations'
      ],
      curriculum: [
        {
          module: 'Module 1: Open Table Formats & Lakehouse Storage',
          lessons: [
            { id: 'l21', title: 'Parquet Internals & Apache Iceberg Metadata Architecture', duration: '31m', isPreview: true },
            { id: 'l22', title: 'Time Travel, Partition Evolution & Compaction in Iceberg', duration: '37m', isPreview: false }
          ]
        }
      ]
    },
    {
      id: 'course-ai-102',
      title: 'Reinforcement Learning from Human Feedback (RLHF) & Alignment',
      slug: 'rlhf-reinforcement-learning-ai-alignment',
      category: 'ai',
      categoryName: 'Artificial Intelligence',
      level: 'Advanced',
      rating: 4.99,
      ratingCount: 820,
      studentsCount: 4200,
      duration: '31h 20m',
      lessonsCount: 33,
      price: 199,
      originalPrice: 299,
      badge: 'Featured',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
      instructor: {
        id: 'inst-dr-elena',
        name: 'Dr. Elena Vance',
        title: 'Staff AI Research Scientist',
        company: 'DeepMind',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
      },
      description: 'Implement Proximal Policy Optimization (PPO), Direct Preference Optimization (DPO), and KTO algorithms to safely align foundation models.',
      whatYouLearn: [
        'Train reward models on pairwise human preference datasets',
        'Implement PPO with reference model KL-divergence penalties',
        'Derive and code Direct Preference Optimization (DPO) from first principles',
        'Mitigate reward hacking and sycophancy in aligned language agents'
      ],
      curriculum: [
        {
          module: 'Module 1: Preference Modeling Foundations',
          lessons: [
            { id: 'l23', title: 'Bradley-Terry Preference Models & Loss Formulation', duration: '28m', isPreview: true },
            { id: 'l24', title: 'Collecting and Calibrating Human Annotation Data', duration: '33m', isPreview: false }
          ]
        }
      ]
    }
  ],

  instructors: [
    {
      id: 'inst-dr-elena',
      name: 'Dr. Elena Vance',
      role: 'Staff AI Research Scientist at DeepMind',
      company: 'DeepMind',
      bio: 'Leading contributor to transformer reasoning and alignment benchmarks. PhD in Computer Science from Stanford University with 14 years in deep learning.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      studentsCount: '13,680',
      rating: 4.98,
      coursesCount: 3,
      expertise: ['Large Language Models', 'Transformer Architectures', 'RLHF & Alignment', 'PyTorch']
    },
    {
      id: 'inst-marcus-chen',
      name: 'Marcus Chen',
      role: 'Principal Distributed Architect at Stripe',
      company: 'Stripe',
      bio: 'Specialized in ultra-resilient financial transaction infrastructure processing billions daily. Former infrastructure lead at AWS and Uber.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      studentsCount: '24,200',
      rating: 4.97,
      coursesCount: 4,
      expertise: ['Distributed Systems', 'Kafka Event Streaming', 'High-Scale Concurrency', 'Go & Rust']
    },
    {
      id: 'inst-sarah-lindqvist',
      name: 'Sarah Lindqvist',
      role: 'Design Systems Director at Spotify',
      company: 'Spotify',
      bio: 'Pioneered Spotify’s global design tokens framework across web, mobile, and desktop. Frequent keynote speaker at Config and Figma global summits.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      studentsCount: '18,400',
      rating: 4.96,
      coursesCount: 2,
      expertise: ['Design Tokens', 'Figma Variables', 'Component Architecture', 'Accessibility WCAG AAA']
    },
    {
      id: 'inst-tariq-mansour',
      name: 'Tariq Mansour',
      role: 'Lead SRE & Platform Architect at Google Cloud',
      company: 'Google Cloud',
      bio: 'Author of production platform blueprints used by Fortune 500 enterprises. Certified Kubernetes Security Specialist (CKS) and open-source maintainer.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      studentsCount: '15,100',
      rating: 4.97,
      coursesCount: 3,
      expertise: ['Kubernetes Platforms', 'GitOps & ArgoCD', 'Service Mesh (Istio)', 'Zero-Trust Security']
    }
  ],

  testimonials: [
    {
      id: 'test-1',
      name: 'Julian Ross',
      role: 'Senior Staff Engineer at Snowflake',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      course: 'Generative AI Systems & LLM Architecture',
      rating: 5,
      quote: 'EduVanta does not teach surface-level syntax; it teaches the mental models of Silicon Valley’s top 1% engineers. The transformer implementation module alone saved our team months of trial and error in our RAG deployment.'
    },
    {
      id: 'test-2',
      name: 'Camila Rodriguez',
      role: 'Lead Product Designer at Brex',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      course: 'Design Systems at Enterprise Scale',
      rating: 5,
      quote: 'The depth of Sarah Lindqvist’s token framework is extraordinary. We revamped our entire multi-brand design tokens using this curriculum and cut our cross-platform design debt by half.'
    },
    {
      id: 'test-3',
      name: 'David O’Connor',
      role: 'Principal Architect at Klarna',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
      course: 'Full-Stack High-Scale Architecture',
      rating: 5,
      quote: 'Marcus Chen’s explanations of the Saga pattern and distributed consensus algorithms are clearer than any textbook. Truly world-class instruction.'
    }
  ],

  faqs: [
    {
      question: 'How does EduVanta differ from standard massive open online courses (MOOCs)?',
      answer: 'EduVanta is curated exclusively with senior practitioners actively building frontier systems at top tech leaders (DeepMind, Stripe, Spotify, Google Cloud). Our curricula focus on real enterprise architectures, rigorous code audits, and production capstone projects rather than superficial beginner tutorials.'
    },
    {
      question: 'Are certificates verifiable by prospective employers?',
      answer: 'Yes. Every certificate issued by EduVanta includes a cryptographically verifiable identifier, an on-chain ledger timestamp, and a downloadable portfolio syllabus validating all completed modules and code repositories.'
    },
    {
      question: 'Do I get lifetime access to purchased courses and future updates?',
      answer: 'Absolutely. Enrolling in any EduVanta course grants permanent lifetime access to all current lectures, updated curriculum releases, code repositories, and our private engineering alumni community.'
    },
    {
      question: 'What is the refund and satisfaction guarantee policy?',
      answer: 'We offer an unconditional 30-day money-back guarantee. If you feel the curriculum does not deliver immense value to your engineering or leadership career, you can request a 100% refund with a single click.'
    }
  ]
};
