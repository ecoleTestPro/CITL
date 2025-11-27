<?php

namespace Database\Seeders;

use App\Models\Glossary;
use Illuminate\Database\Seeder;

class GlossarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $glossaries = [
            // Letter A
            [
                'term' => 'A/B testing',
                'definition' => 'A method of comparing two versions of a webpage, email, or feature to determine which performs better based on user behavior.',
                'letter' => 'A',
                'order' => 1,
            ],
            [
                'term' => 'Acquisition cost (CAC)',
                'definition' => 'Customer Acquisition Cost is the total expense required to acquire a new customer, including marketing, sales, and advertising costs.',
                'letter' => 'A',
                'order' => 2,
            ],
            [
                'term' => 'Agile development',
                'definition' => 'An iterative approach to software development that promotes collaboration, adaptability, and continuous delivery.',
                'letter' => 'A',
                'order' => 3,
            ],
            [
                'term' => 'API (Application Programming Interface)',
                'definition' => 'A set of protocols and tools that allow different software applications to communicate and share data.',
                'letter' => 'A',
                'order' => 4,
            ],

            // Letter B
            [
                'term' => 'Backlog',
                'definition' => 'A prioritized list of tasks, features, or bugs waiting to be developed or addressed in future sprints.',
                'letter' => 'B',
                'order' => 1,
            ],
            [
                'term' => 'Beta release',
                'definition' => 'A pre-launch version of a software product released to selected users for testing and feedback.',
                'letter' => 'B',
                'order' => 2,
            ],
            [
                'term' => 'Bootstrapping',
                'definition' => 'Building and growing a company using personal savings or internal revenue rather than external funding.',
                'letter' => 'B',
                'order' => 3,
            ],

            // Letter C
            [
                'term' => 'Churn Rate',
                'definition' => 'The percentage of customers who cancel or stop using a subscription service during a given period.',
                'letter' => 'C',
                'order' => 1,
            ],
            [
                'term' => 'Cloud computing',
                'definition' => 'The delivery of computing services including servers, storage, databases, and software over the internet instead of local infrastructure.',
                'letter' => 'C',
                'order' => 2,
            ],
            [
                'term' => 'Conversion rate',
                'definition' => 'The percentage of users who complete a desired action (such as signing up, purchasing, or upgrading) out of the total number of visitors.',
                'letter' => 'C',
                'order' => 3,
            ],
            [
                'term' => 'CRM (Customer Relationship Management)',
                'definition' => 'Software that helps businesses manage interactions with existing and potential customers to improve relationships and retention.',
                'letter' => 'C',
                'order' => 4,
            ],
            [
                'term' => 'Customer lifetime value (CLV or LTV)',
                'definition' => 'The total revenue a business can expect from a customer over the entire duration of their relationship.',
                'letter' => 'C',
                'order' => 5,
            ],

            // Letter D
            [
                'term' => 'Dashboard',
                'definition' => 'A visual interface that displays key metrics, analytics, and performance indicators in real time for easy monitoring and decision-making.',
                'letter' => 'D',
                'order' => 1,
            ],
            [
                'term' => 'Data analytics',
                'definition' => 'The process of collecting, analyzing, and interpreting data to uncover patterns, trends, and insights that guide business decisions.',
                'letter' => 'D',
                'order' => 2,
            ],
            [
                'term' => 'Data migration',
                'definition' => 'The process of transferring data from one system, platform, or storage type to another, often during upgrades or software transitions.',
                'letter' => 'D',
                'order' => 3,
            ],

            // Letter E
            [
                'term' => 'Engagement rate',
                'definition' => 'A metric that measures how actively users interact with your product, content, or platform, often through clicks, time spent, or feature usage.',
                'letter' => 'E',
                'order' => 1,
            ],
            [
                'term' => 'Enterprise SaaS',
                'definition' => 'Software-as-a-Service designed for large organizations with advanced scalability, security, and customization needs.',
                'letter' => 'E',
                'order' => 2,
            ],
            [
                'term' => 'Error Log',
                'definition' => 'A record of issues, bugs, or failures that occur within a system, used by developers to diagnose and resolve problems.',
                'letter' => 'E',
                'order' => 3,
            ],
            [
                'term' => 'ETL (Extract, Transform, Load)',
                'definition' => 'A process for collecting data from various sources, transforming it into a usable format, and loading it into a database or data warehouse.',
                'letter' => 'E',
                'order' => 4,
            ],
            [
                'term' => 'Event tracking',
                'definition' => 'Monitoring specific user actions within a product (such as clicks or form submissions) to analyze behavior and optimize experiences.',
                'letter' => 'E',
                'order' => 5,
            ],
            [
                'term' => 'Evergreen content',
                'definition' => 'Content that remains relevant and valuable over time, often used in marketing and SEO strategies to attract long-term traffic.',
                'letter' => 'E',
                'order' => 6,
            ],

            // Letter F
            [
                'term' => 'Feature flag',
                'definition' => 'A software switch that allows teams to enable, disable, or test features without deploying new code.',
                'letter' => 'F',
                'order' => 1,
            ],
            [
                'term' => 'Funnel',
                'definition' => 'A marketing or sales model that illustrates the stages users go through before converting into paying customers.',
                'letter' => 'F',
                'order' => 2,
            ],
            [
                'term' => 'Freemium model',
                'definition' => 'A business model offering a basic product for free while charging for premium features or advanced functionality.',
                'letter' => 'F',
                'order' => 3,
            ],
            [
                'term' => 'Full stack developer',
                'definition' => 'An engineer skilled in both front-end and back-end technologies, capable of building complete web applications.',
                'letter' => 'F',
                'order' => 4,
            ],
            [
                'term' => 'Functional requirements',
                'definition' => 'Specific behaviors or functions a system must perform, defining how software should operate from the user\'s perspective.',
                'letter' => 'F',
                'order' => 5,
            ],
            [
                'term' => 'Feedback loop',
                'definition' => 'A process of gathering user feedback, analyzing it, and applying insights to improve the product or customer experience.',
                'letter' => 'F',
                'order' => 6,
            ],

            // Letter G
            [
                'term' => 'Gamification',
                'definition' => 'The use of game-like elements (such as badges, points, or progress bars) in software to increase user engagement and motivation.',
                'letter' => 'G',
                'order' => 1,
            ],
            [
                'term' => 'Go-to-Market (GTM) Strategy',
                'definition' => 'A plan that outlines how a company will introduce a product to the market, reach target customers, and achieve competitive advantage.',
                'letter' => 'G',
                'order' => 2,
            ],

            // Letter H
            [
                'term' => 'Headless CMS',
                'definition' => 'A content management system that separates the backend (content repository) from the frontend (presentation layer), enabling flexible content delivery.',
                'letter' => 'H',
                'order' => 1,
            ],
            [
                'term' => 'Help desk Software',
                'definition' => 'Tools that manage customer support requests, tickets, and communication channels efficiently.',
                'letter' => 'H',
                'order' => 2,
            ],

            // Letter I
            [
                'term' => 'Ideation',
                'definition' => 'The creative process of generating, developing, and refining new ideas for products, features, or improvements.',
                'letter' => 'I',
                'order' => 1,
            ],
            [
                'term' => 'Infrastructure as a Service (IaaS)',
                'definition' => 'A cloud computing model that provides virtualized computing resources like servers, storage, and networking on demand.',
                'letter' => 'I',
                'order' => 2,
            ],

            // Letter J
            [
                'term' => 'JavaScript',
                'definition' => 'A core programming language used to build dynamic and interactive web applications, essential for modern SaaS interfaces.',
                'letter' => 'J',
                'order' => 1,
            ],
            [
                'term' => 'Journey mapping',
                'definition' => 'A visual representation of the steps users take when interacting with a product, used to identify pain points and opportunities for improvement.',
                'letter' => 'J',
                'order' => 2,
            ],

            // Letter K
            [
                'term' => 'KPI (Key Performance Indicator)',
                'definition' => 'A measurable value that shows how effectively a company or team is achieving its business objectives.',
                'letter' => 'K',
                'order' => 1,
            ],
            [
                'term' => 'Kanban',
                'definition' => 'An agile project management method that visualizes work on a board to improve flow, efficiency, and task prioritization.',
                'letter' => 'K',
                'order' => 2,
            ],
            [
                'term' => 'Knowledge base',
                'definition' => 'A centralized collection of articles, guides, and FAQs designed to help users find answers and learn independently.',
                'letter' => 'K',
                'order' => 3,
            ],
            [
                'term' => 'Kubernetes',
                'definition' => 'An open-source system for automating the deployment, scaling, and management of containerized applications.',
                'letter' => 'K',
                'order' => 4,
            ],

            // Letter L
            [
                'term' => 'Landing page',
                'definition' => 'A standalone webpage designed to convert visitors into leads or customers through focused messaging and a clear call-to-action.',
                'letter' => 'L',
                'order' => 1,
            ],
            [
                'term' => 'Lean Startup',
                'definition' => 'A methodology focused on building products quickly, testing hypotheses, and learning from user feedback to reduce waste.',
                'letter' => 'L',
                'order' => 2,
            ],
            [
                'term' => 'Lifetime Value (LTV)',
                'definition' => 'The total revenue a business can expect from a single customer throughout their relationship with the company.',
                'letter' => 'L',
                'order' => 3,
            ],
            [
                'term' => 'Low-Code Platform',
                'definition' => 'A development environment that enables users to create software with minimal manual coding through drag-and-drop tools and visual interfaces.',
                'letter' => 'L',
                'order' => 4,
            ],
            [
                'term' => 'Load Balancing',
                'definition' => 'A method of distributing network or application traffic across multiple servers to improve speed, reliability, and uptime.',
                'letter' => 'L',
                'order' => 5,
            ],

            // Letter M
            [
                'term' => 'Machine Learning (ML)',
                'definition' => 'A subset of artificial intelligence that enables systems to learn and improve from data without being explicitly programmed.',
                'letter' => 'M',
                'order' => 1,
            ],
            [
                'term' => 'Managed hosting',
                'definition' => 'A hosting service where the provider handles setup, maintenance, security, and performance optimization on behalf of the user.',
                'letter' => 'M',
                'order' => 2,
            ],
            [
                'term' => 'Market fit (Product-Market Fit)',
                'definition' => 'The stage where a product successfully meets the needs and demands of its target audience, resulting in strong user growth and retention.',
                'letter' => 'M',
                'order' => 3,
            ],
            [
                'term' => 'Marketing automation',
                'definition' => 'Software that automates repetitive marketing tasks such as email campaigns, lead nurturing, and social media management.',
                'letter' => 'M',
                'order' => 4,
            ],
            [
                'term' => 'Metrics dashboard',
                'definition' => 'A visual overview of key performance indicators (KPIs) and analytics used to track progress and business health.',
                'letter' => 'M',
                'order' => 5,
            ],
            [
                'term' => 'Microservices',
                'definition' => 'An architectural approach where software is built as a collection of small, independent services that communicate through APIs.',
                'letter' => 'M',
                'order' => 6,
            ],
            [
                'term' => 'Minimum viable product (MVP)',
                'definition' => 'The simplest version of a product that allows teams to test core assumptions and gather feedback from early users.',
                'letter' => 'M',
                'order' => 7,
            ],
            [
                'term' => 'Mobile optimization',
                'definition' => 'The process of designing and adjusting websites or applications to deliver a seamless experience on mobile devices.',
                'letter' => 'M',
                'order' => 8,
            ],
            [
                'term' => 'Monthly recurring revenue (MRR)',
                'definition' => 'A key SaaS metric that represents predictable monthly income from active subscriptions.',
                'letter' => 'M',
                'order' => 9,
            ],

            // Letter N
            [
                'term' => 'Net promoter score (NPS)',
                'definition' => 'A customer satisfaction metric that measures how likely users are to recommend a product or service to others.',
                'letter' => 'N',
                'order' => 1,
            ],
            [
                'term' => 'No-code platform',
                'definition' => 'A development environment that allows users to build apps and workflows without writing code, using visual interfaces instead.',
                'letter' => 'N',
                'order' => 2,
            ],
            [
                'term' => 'Notification system',
                'definition' => 'A feature that sends alerts or updates to users about important events, changes, or actions within a product.',
                'letter' => 'N',
                'order' => 3,
            ],
            [
                'term' => 'Niche market',
                'definition' => 'A focused segment of a broader market with specific needs that a product or service is designed to serve.',
                'letter' => 'N',
                'order' => 4,
            ],

            // Letter O
            [
                'term' => 'Onboarding flow',
                'definition' => 'A step-by-step process designed to help new users get started and experience the product\'s core value quickly.',
                'letter' => 'O',
                'order' => 1,
            ],
            [
                'term' => 'Open source',
                'definition' => 'Software whose source code is publicly available for modification, enhancement, and distribution.',
                'letter' => 'O',
                'order' => 2,
            ],
            [
                'term' => 'Opt-In',
                'definition' => 'A user\'s consent to receive communication, notifications, or marketing materials, typically via email or in-app prompts.',
                'letter' => 'O',
                'order' => 3,
            ],
            [
                'term' => 'Outbound marketing',
                'definition' => 'Marketing efforts that actively reach out to potential customers through channels like ads, cold emails, or events.',
                'letter' => 'O',
                'order' => 4,
            ],
            [
                'term' => 'Optimization',
                'definition' => 'The practice of improving a system, design, or process for better performance, speed, or conversion.',
                'letter' => 'O',
                'order' => 5,
            ],

            // Letter P
            [
                'term' => 'Paywall',
                'definition' => 'A system that restricts access to content or features until the user pays or subscribes.',
                'letter' => 'P',
                'order' => 1,
            ],
            [
                'term' => 'Persona (User persona)',
                'definition' => 'A fictional profile representing a key segment of your audience, used to guide product design and marketing strategies.',
                'letter' => 'P',
                'order' => 2,
            ],
            [
                'term' => 'Pipeline',
                'definition' => 'A structured process of stages that leads prospects from initial contact to conversion, often used in sales and development contexts.',
                'letter' => 'P',
                'order' => 3,
            ],
            [
                'term' => 'Plugin',
                'definition' => 'A piece of software that adds specific functionality to an existing application or platform.',
                'letter' => 'P',
                'order' => 4,
            ],
            [
                'term' => 'Prototype',
                'definition' => 'An early, simplified version of a product used to test concepts and gather feedback before full development.',
                'letter' => 'P',
                'order' => 5,
            ],
            [
                'term' => 'Product-Led growth (PLG)',
                'definition' => 'A go-to-market strategy where the product itself drives user acquisition, conversion, and expansion.',
                'letter' => 'P',
                'order' => 6,
            ],

            // Letter Q
            [
                'term' => 'Quality assurance (QA)',
                'definition' => 'The process of systematically testing software to ensure it meets quality standards and is free from defects.',
                'letter' => 'Q',
                'order' => 1,
            ],
            [
                'term' => 'Query',
                'definition' => 'A request made to a database to retrieve or manipulate specific information.',
                'letter' => 'Q',
                'order' => 2,
            ],
            [
                'term' => 'Quota',
                'definition' => 'A set limit or target for performance, usage, or sales within a defined period.',
                'letter' => 'Q',
                'order' => 3,
            ],

            // Letter R
            [
                'term' => 'REST API',
                'definition' => 'Representational State Transfer API, a web service architecture that uses standard HTTP methods to enable communication between systems.',
                'letter' => 'R',
                'order' => 1,
            ],
            [
                'term' => 'Refactoring',
                'definition' => 'The process of restructuring existing code to improve readability, maintainability, and performance without changing its functionality.',
                'letter' => 'R',
                'order' => 2,
            ],
            [
                'term' => 'Rate limiting',
                'definition' => 'A technique that controls the number of requests a user or application can make within a specific time period to prevent abuse and ensure system stability.',
                'letter' => 'R',
                'order' => 3,
            ],
            [
                'term' => 'Real-time processing',
                'definition' => 'The ability to process data and deliver results immediately as events occur, enabling instant updates and interactions.',
                'letter' => 'R',
                'order' => 4,
            ],
            [
                'term' => 'Recurring revenue',
                'definition' => 'Predictable income generated from subscription-based services, providing financial stability and growth predictability for SaaS businesses.',
                'letter' => 'R',
                'order' => 5,
            ],
            [
                'term' => 'Regression testing',
                'definition' => 'Testing performed to ensure that new changes or updates don\'t break existing functionality in previously working features.',
                'letter' => 'R',
                'order' => 6,
            ],
            [
                'term' => 'Repository',
                'definition' => 'A storage location where code, data, or project files are kept and version-controlled, typically using systems like Git.',
                'letter' => 'R',
                'order' => 7,
            ],

            // Letter S
            [
                'term' => 'Retention rate',
                'definition' => 'The percentage of customers who continue using a product over a specific period, indicating satisfaction and loyalty.',
                'letter' => 'S',
                'order' => 1,
            ],
            [
                'term' => 'Roadmap',
                'definition' => 'A visual plan outlining upcoming product features, improvements, and long-term goals.',
                'letter' => 'S',
                'order' => 2,
            ],
            [
                'term' => 'ROI (Return on Investment)',
                'definition' => 'A metric that measures the profitability or effectiveness of an investment relative to its cost.',
                'letter' => 'S',
                'order' => 3,
            ],
            [
                'term' => 'Release Notes',
                'definition' => 'Documentation detailing new features, bug fixes, or updates included in a product release.',
                'letter' => 'S',
                'order' => 4,
            ],
            [
                'term' => 'Responsive design',
                'definition' => 'A design approach that ensures websites and applications automatically adjust to different screen sizes and devices.',
                'letter' => 'S',
                'order' => 5,
            ],

            // Letter T
            [
                'term' => 'TAM',
                'definition' => 'The total revenue opportunity available for a product or service if 100% market share is achieved.',
                'letter' => 'T',
                'order' => 1,
            ],
            [
                'term' => 'Tech stack',
                'definition' => 'The combination of software technologies and tools a company uses to build and run its applications.',
                'letter' => 'T',
                'order' => 2,
            ],
            [
                'term' => 'Trial conversion rate',
                'definition' => 'The percentage of users who convert from a free trial to a paid subscription.',
                'letter' => 'T',
                'order' => 3,
            ],
            [
                'term' => 'Telemetry',
                'definition' => 'Data collected from software usage to monitor performance and user behavior.',
                'letter' => 'T',
                'order' => 4,
            ],

            // Letter U
            [
                'term' => 'Uptime',
                'definition' => 'The percentage of time a service or application is operational and available to users.',
                'letter' => 'U',
                'order' => 1,
            ],
            [
                'term' => 'User journey',
                'definition' => 'The path a user takes from first interaction with a product to achieving their goal.',
                'letter' => 'U',
                'order' => 2,
            ],
            [
                'term' => 'Usage-based pricing',
                'definition' => 'A pricing model where customers pay based on the amount they use a service.',
                'letter' => 'U',
                'order' => 3,
            ],
            [
                'term' => 'UX (User experience)',
                'definition' => 'The overall experience and satisfaction a user has while interacting with a product.',
                'letter' => 'U',
                'order' => 4,
            ],

            // Letter V
            [
                'term' => 'Viral coefficient',
                'definition' => 'A metric that measures how many new users each existing user generates through referrals.',
                'letter' => 'V',
                'order' => 1,
            ],
            [
                'term' => 'Venture capital (VC)',
                'definition' => 'Funding provided by investors to startups with high growth potential in exchange for equity.',
                'letter' => 'V',
                'order' => 2,
            ],

            // Letter W
            [
                'term' => 'Webhooks',
                'definition' => 'Automated messages sent from an app when a specific event occurs, enabling integrations between software.',
                'letter' => 'W',
                'order' => 1,
            ],
            [
                'term' => 'Workflow automation',
                'definition' => 'The use of software to automate repetitive tasks and processes within an organization.',
                'letter' => 'W',
                'order' => 2,
            ],
            [
                'term' => 'White-label SaaS',
                'definition' => 'A SaaS product that can be rebranded and sold by another company as its own.',
                'letter' => 'W',
                'order' => 3,
            ],

            // Letter X
            [
                'term' => 'XaaS (Anything-as-a-service)',
                'definition' => 'An umbrella term for services delivered over the cloud, including SaaS, PaaS, and IaaS.',
                'letter' => 'X',
                'order' => 1,
            ],
            [
                'term' => 'XML (Extensible markup language)',
                'definition' => 'A format for structuring and exchanging data between systems.',
                'letter' => 'X',
                'order' => 2,
            ],

            // Letter Y
            [
                'term' => 'Yield',
                'definition' => 'The return or revenue generated by a product, feature, or marketing channel.',
                'letter' => 'Y',
                'order' => 1,
            ],
            [
                'term' => 'Year-over-year (YoY)',
                'definition' => 'A growth metric comparing performance for the same period in consecutive years.',
                'letter' => 'Y',
                'order' => 2,
            ],
            [
                'term' => 'Young company metrics',
                'definition' => 'KPIs used to measure growth and traction in early-stage startups.',
                'letter' => 'Y',
                'order' => 3,
            ],

            // Letter Z
            [
                'term' => 'Zero downtime deployment',
                'definition' => 'Deploying software updates without disrupting service availability for users.',
                'letter' => 'Z',
                'order' => 1,
            ],
            [
                'term' => 'Zapier Integration',
                'definition' => 'Connecting apps and automating workflows using the Zapier platform. Z-Score: A statistical measure sometimes used to assess risk or financial stability.',
                'letter' => 'Z',
                'order' => 2,
            ],
        ];

        foreach ($glossaries as $glossary) {
            Glossary::create($glossary);
        }
    }
}
