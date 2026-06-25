-- supabase/seed.sql
-- Seed data for Dimitri (SnowDev) V2 Portfolio

-- ─────────────────────────────────────────────────────────────
-- 1. PERSONAS
-- ─────────────────────────────────────────────────────────────
INSERT INTO personas (id, label, description, accent_color, sort_order, is_active) VALUES
  ('fullstack', 'Full Stack Developer', 'End‑to‑end web development expertise.', '#5e17eb', 1, true),
  ('ai-engineer', 'AI Engineer', 'Machine learning, automation and RAG pipelines.', '#7c3aed', 2, true),
  ('cloud-architect', 'Cloud & Architect', 'Infrastructure, AWS and scalability.', '#0ea5e9', 3, true),
  ('product-builder', 'Product Builder', 'Digital product design and delivery.', '#10b981', 4, true),
  ('entrepreneur', 'Tech Entrepreneur', 'Business, growth and market strategy.', '#f59e0b', 5, true)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  accent_color = EXCLUDED.accent_color,
  sort_order = EXCLUDED.sort_order;

-- ─────────────────────────────────────────────────────────────
-- 2. PROJECTS
-- ─────────────────────────────────────────────────────────────
INSERT INTO projects (
  id, slug, title, description, challenge, solution, result, category, tags,
  image_url, image_url_2, image_url_3, date, demo_url, code_url, featured, sort_order, is_published
) VALUES
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0001',
    'chezflora-ui-ux-design',
    'ChezFlora UI/UX Design',
    'A comprehensive design system created for ChezFlora e-commerce platform developed over an intensive 5-day period. This project involved the creation of a complete design ecosystem from scratch, including responsive components using auto layout, a systematic color and typography system with variables, and interactive prototypes. The design file spans over 8 meticulously organized pages that serve as a comprehensive blueprint for the development team, ensuring consistent implementation and seamless user experience across the platform.',
    'The primary challenge was creating a comprehensive design system from scratch within a tight 5-day timeline while ensuring it would be easily implementable by the development team. I needed to balance aesthetic considerations with technical feasibility, ensuring components were both visually appealing and structurally sound from an engineering perspective. Additionally, the design needed to accommodate a complex e-commerce flow with multiple user journeys while maintaining visual consistency and accessibility standards. Creating a system that could scale with the product while providing immediate value to developers required careful planning and execution.',
    'I developed a structured approach starting with foundational design tokens (colors, typography, spacing) using Figma variables to ensure consistency throughout the system. For the component architecture, I implemented nested auto layout structures that enable responsive behavior while maintaining visual integrity across breakpoints. The file organization follows a logical progression from atoms to pages, with each of the 8+ pages dedicated to specific aspects of the design system. To enhance collaboration with developers, I created comprehensive documentation and interactive prototypes demonstrating key user flows, component states, and interaction patterns.',
    'The ChezFlora Design System significantly streamlined the development process, reducing implementation time by approximately 40% according to the front-end team. Developers praised the logical organization and consistent naming conventions, which eliminated ambiguity during the build phase. The interactive prototypes proved invaluable for stakeholder presentations, resulting in fewer revision cycles and expedited approval processes. The design system has become a living document that continues to evolve with the product, demonstrating the value of thoughtful design architecture in supporting both current implementation and future scaling. This project exemplifies my ability to create design systems that balance aesthetic considerations with practical development concerns.',
    'UI/UX Design',
    ARRAY['Figma', 'Design System', 'Auto Layout', 'Prototyping', 'E-commerce']::TEXT[],
    '/ChezFlora_Thumbnail.png',
    '/ChesFlora Demo_Thumbnail.png',
    '/ChezFlora_Thumbnail.png',
    '2025-03-22',
    'https://www.figma.com/design/iB4YKXeWuJByp0kGGwO2NY/ChezFlora?m=auto&t=O6e2pX2gqOn2ffqP-6',
    'https://www.figma.com/design/iB4YKXeWuJByp0kGGwO2NY/ChezFlora?m=auto&t=O6e2pX2gqOn2ffqP-6',
    true,
    1,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0002',
    'content-creator-teaching-course',
    'Content Creator Teaching course',
    'THE ULTIMATE CANVA PRO COURSE is a comprehensive online educational program I created, produced, and marketed from scratch. This extensive course features over 20 hours of meticulously crafted video content spanning 15 distinct projects that take students from complete beginners to confident designers. The curriculum covers essential design categories including logo creation, thumbnail design, marketing materials, business collateral, and even advanced video and animation production—all within the Canva Pro ecosystem. What sets this course apart is its dual-track approach, with each section teaching techniques both with and without AI assistance, preparing students for both traditional design workflows and emerging AI-enhanced design processes.',
    'Creating a professional-quality online course presented multiple significant challenges. First, I needed to develop a curriculum structure that could effectively accommodate absolute beginners while providing sufficient depth to achieve advanced skills. Second, producing over 20 hours of engaging, high-quality video content required mastering not just design techniques but also video production, lighting, audio engineering, and educational delivery methods. Third, I had to constantly balance teaching fundamental design principles while showcasing Canva Pro''s specific features in an accessible way. Perhaps most challenging was the need to incorporate emerging AI design tools alongside traditional methods, requiring me to stay at the cutting edge of rapidly evolving technology while maintaining educational clarity.',
    'I developed a modular course structure that progresses logically from fundamentals to advanced applications, with each of the 15 projects building upon previously learned skills. For content production, I established a professional recording setup with proper lighting, sound treatment, and screen capture technology to ensure consistent quality across all 20+ hours of instruction. The dual-track approach to teaching both AI-assisted and traditional design methods was implemented through parallel lesson structures, allowing students to understand the underlying principles before seeing how AI can enhance their workflow. I created comprehensive supplementary materials including downloadable templates, checklists, and resource guides to support different learning styles.',
    'THE ULTIMATE CANVA PRO COURSE has successfully transformed complete beginners into capable designers, with students reporting significant improvements in both their technical skills and creative confidence. The course has received overwhelmingly positive feedback, particularly for its comprehensive scope and the unique dual approach to traditional and AI-assisted design techniques. Many students have leveraged their new skills to launch design side-businesses, enhance their existing professional roles, or improve their personal projects. The course has established me as an authority in design education and created a sustainable revenue stream through ongoing sales. The framework I developed for teaching both traditional and AI-enhanced design processes has positioned the course to remain relevant even as design technology continues to evolve.',
    'Product Design',
    ARRAY['CanvaPro', 'Teaching', 'AI']::TEXT[],
    '/FondEcranPourFormationCanva.png',
    '/ProductDesign_Thumbnail.png',
    '/ProductDesign_Thumbnail.png',
    '2023-09-20',
    'https://drive.google.com/drive/folders/14g4ic1DQILOlaA56JlWCiJg_XsXMSyG3?usp=sharing',
    'https://drive.google.com/drive/folders/14g4ic1DQILOlaA56JlWCiJg_XsXMSyG3?usp=sharing',
    true,
    2,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0003',
    'chezflora-ecommerce-web-app',
    'ChezFlora E-commerce Web App',
    'This is a project 1 month project realised in ConCour conditions. This project required a deep understanding of user needs and business objectives in the specification docs they provide us with, to create a solution that is both functional and visually appealing. The final outcome successfully addressed the client''s requirements as specified in the specification document while providing an exceptional user experience.',
    'The main challenge was to design, create and deploy in one month''s time a system that could handle complex data both in front-end and backend part while maintaining an intuitive and clean interface. Users needed to quickly access information without feeling overwhelmed by the complexity of the underlying structure, and all this in one month''s time.',
    'E-commerce platform with user-role-based authentication with real-time data visualization. I developed a strategic approach that included 4 days to craft a simple UI/UX Design, wireframing, and rapid prototyping. The design language was kept consistent throughout the application, with special attention to accessibility and responsive behavior across various devices.',
    'The project was very well received by the jury, resulting in improved engagement metrics and positive feedback. Key performance indicators showed a significant improvement in user retention and task completion rates compared to that of other participats, and i that makes me the 1st price Winner.',
    'Web Apps',
    ARRAY['MERN', 'Tailwind CSS', 'Redux Toolkit', 'TypeScript', 'MongoDB']::TEXT[],
    '/ChezFlora_Thumbnail.png',
    '/ChesFlora Demo_Thumbnail.png',
    '/ChezFloraPReview.png',
    '2025-04-20',
    'https://chez-flora-sigma.vercel.app/',
    'https://github.com/DimitriTedom/ChezFlora',
    true,
    3,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0004',
    'njangitech-tontine-management',
    'NjangiTech - Système de Gestion de Tontine',
    'A comprehensive Tontine (rotating savings and credit association) management system designed for the university course TP-INF 221. This full-stack application enables groups to efficiently manage their savings pools, track member contributions, monitor cash flow, and maintain transparent financial records. The platform features a modern, intuitive dashboard displaying real-time statistics including cash balance, active members, contribution trends over the last 6 sessions, and credit distribution status. Built with a focus on financial transparency and ease of use, the system streamlines the traditional tontine process while maintaining the community-oriented nature of these savings groups.' || CHR(10) || CHR(10) || '🔐 Test Credentials:' || CHR(10) || '• Email: test@njangitech.com' || CHR(10) || '• Password: Test123456',
    'The primary challenge was creating a robust financial management system that could handle complex tontine operations while remaining accessible to users with varying levels of technical expertise. I needed to implement secure user authentication with role-based access control to protect sensitive financial data, ensure accurate transaction tracking with no margin for error, and design an intuitive interface that makes complex financial operations simple. Additionally, the system required real-time data synchronization to keep all members informed about contributions, withdrawals, and credit distributions. Balancing security, usability, and performance while adhering to academic project requirements presented significant technical and design challenges.',
    'I developed a modern full-stack application using React with TypeScript for type safety and better code maintainability. The frontend leverages Tailwind CSS for a clean, responsive design that works seamlessly across devices. For state management and data handling, I integrated PostgreSQL with Supabase as the backend-as-a-service, providing real-time database updates, authentication, and secure API endpoints. The dashboard implements interactive data visualizations showing contribution trends and financial status at a glance. I created a comprehensive role-based authentication system allowing administrators to manage members while regular users can track their personal contributions and view group statistics. The application architecture follows best practices with component-based design, proper separation of concerns, and optimized database queries for performance.',
    'The NjangiTech Tontine Management System successfully modernizes traditional community savings practices by providing a secure, transparent, and user-friendly digital platform. The system has been deployed to production on Vercel, demonstrating its reliability and scalability. Users can now manage their tontine operations with confidence, benefiting from automated calculations, real-time updates, and comprehensive financial tracking. The project showcases my ability to build complete full-stack applications that solve real-world problems while meeting strict academic standards. The clean codebase, modern tech stack, and production-ready deployment demonstrate professional-level development practices. This project exemplifies my skills in React, TypeScript, PostgreSQL, authentication systems, and delivering production-quality applications that combine technical excellence with practical utility.',
    'Web Apps',
    ARRAY['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Financial Management']::TEXT[],
    '/tontine-app.png',
    '/tontine-app.png',
    '/tontine-app.png',
    '2026-02-06',
    'https://tontine-app-inf-221.vercel.app/',
    'https://github.com/DimitriTedom/Systeme-de-Gestion-de-Tontine',
    true,
    4,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0005',
    'ai-snowprompt-builder',
    'AI SnowPrompt builder',
    'Discover, generate, and share AI‑powered prompts with ai‑suggested tags.',
    'The main challenge was to design, code and deploy my first NEXTJS Project. A system that could handle CRUD data operations while maintaining an intuitive and clean interface. Users needed to quickly access information without feeling overwhelmed by the complexity of the underlying structure, and of course, the prompts can be either suggested by Humman or Generated with AI',
    'E-commerce platform with Google authentication with NEXTAUTHJS. I developed a strategic approach that included API communicaiton with LLAMA-3-VERSATILE through GROQ API then user can perform CRUD Operations on the returned prompts, with special attention to accessibility and responsive behavior across various devices.',
    'The project was very well appreciated by LinkedIn, whatsapp community Members and becoming more and more popular',
    'Web Apps',
    ARRAY['Next.js', 'LLM', 'GROQ', 'Tailwind CSS', 'JavaScript', 'AI']::TEXT[],
    '/snow-prompt.png',
    '/snowprompt.png',
    '/snowprompt.png',
    '2025-05-10',
    'https://snow-prompt-builder.vercel.app/',
    'https://github.com/DimitriTedom/Snow-Prompt-Builder',
    true,
    5,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0006',
    'sts-library-design',
    'STS Library Design',
    'A comprehensive UI/UX design project for a modern digital library platform that provides intuitive access to educational resources. This 3-day intensive design sprint focused on creating a visually striking interface with thoughtful animations that enhance user navigation while maintaining accessibility. The project explores the intersection of digital learning and modern web design, incorporating advanced color theory principles to create distinctive visual hierarchies that guide users through complex information architecture.',
    'The primary challenge was designing an intuitive interface for a complex library system within an extremely constrained timeline of just 3 days. I needed to create a system that could elegantly handle diverse content types (books, articles, multimedia) while maintaining visual cohesion across all sections. Additionally, implementing effective animations that enhanced rather than distracted from the user experience required careful consideration of motion design principles. The project also demanded a color system that would work across dark and light modes while meeting WCAG accessibility standards.',
    'I developed a comprehensive design system grounded in color theory principles, creating a palette that uses complementary colors to distinguish between content categories while maintaining a cohesive visual language. For the user experience, I implemented a card-based interface with subtle micro-interactions that provide feedback and guide users through content discovery flows. The animations were thoughtfully designed to support information hierarchy, with primary actions receiving more pronounced motion cues while secondary elements use subtler transitions to avoid overwhelming users.',
    'The STS Library Design project successfully demonstrates advanced UI/UX concepts executed within tight constraints. The interface received overwhelmingly positive feedback from test users, who highlighted the intuitive navigation and visually engaging experience. The animations effectively enhanced comprehension of the information architecture, with users reporting 30% faster task completion compared to static interface alternatives. The color system not only created a distinctive brand identity but also improved content categorization recognition by 45%. This project exemplifies my ability to apply theoretical design knowledge to practical user interfaces under pressure while maintaining high-quality standards.',
    'UI/UX Design',
    ARRAY['Figma', 'Canva', 'UI/UX', 'Design System']::TEXT[],
    '/Cover.png',
    '/LoginLibrary.png',
    '/main (1).png',
    '2024-09-20',
    'https://www.figma.com/design/sI4zz3puuDbEFbOiqBBRWG/SnowDev-Tech-Services-Library?node-id=2002-228&p=f&t=Iu7c9f54osYRkeKa-0',
    'https://www.figma.com/design/sI4zz3puuDbEFbOiqBBRWG/SnowDev-Tech-Services-Library?node-id=2002-228&p=f&t=Iu7c9f54osYRkeKa-0',
    true,
    6,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0007',
    'mlti-website',
    'MLTI Website',
    'A front-end MVP website for Master Language & Technology Institute to showcase their services to the website''s visitors and enable them to get in touch with the enterprise through the website',
    'The primary challenge was designing and coding an intuitive and attractive user interface to force visitors to take a look to all the website within an extremely constrained timeline of just 4 days. I needed to create a system that could elegantly handle diverse loading components,images maintaining visual cohesion and responsiveness across every screen-sized devices. Additionally, implementing effective animations that enhanced rather than distracted from the user experience required careful consideration of motion design principles. The project also demanded a color system that would work across dark and light modes while meeting WCAG accessibility standards.',
    'I developed a comprehensive design system grounded in color theory principles with color design of MLTI, creating a palette that uses complementary colors to distinguish between the enterprise''s services while maintaining a cohesive visual language. For the user experience, I implemented a simple interface with subtle micro-interactions that provide get-in-touch service and guide users through content discovery flows. The animations were thoughtfully coded with motion from framer-motion to support information hierarchy, with primary actions receiving more pronounced motion cues while secondary elements use subtler transitions to avoid overwhelming users.',
    'The website successfully demonstrates advanced UI/UX and simple framer-motion concepts executed within tight constraints. The interface received overwhelmingly positive feedback from test users and the enterprise it''s self, who highlighted the intuitive navigation and visually engaging 3D-like experience. The animations effectively enhanced comprehension of the information architecture, with users reporting 30% faster task completion compared to static interface alternatives. The color system not only created a distinctive brand identity but also improved content categorization recognition by 45%. This project exemplifies my ability to apply theoretical design knowledge to practical user interfaces under pressure while maintaining high-quality standards.',
    'Web Apps',
    ARRAY['Tailwind CSS', 'React', 'Framer Motion', 'TypeScript', 'EmailJS']::TEXT[],
    '/mlti.png',
    '/mlti.png',
    '/mlt-preview.png',
    '2025-05-01',
    'https://www.mlt-institute.com/',
    'https://github.com/DimitriTedom/Master-Language-Technology-Institute',
    true,
    7,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0008',
    'almost-all-my-designs',
    'Almost All my Designs',
    'This project will direct you to a google drive folder containing some product designs i''ved done.',
    'N/A',
    'N/A',
    'N/A',
    'Product Design',
    ARRAY['CanvaPro', 'AI', 'Graphic Design', 'Visual Art']::TEXT[],
    '/JuniorCanal.png',
    '/FylerEsthétique.png',
    '/JuniorCanal.png',
    '2023-01-15',
    'https://drive.google.com/drive/folders/1nxbA6pBJgFooAXlTXaZ1sgeO-tcnZQ1s?usp=sharing',
    'https://drive.google.com/drive/folders/1nxbA6pBJgFooAXlTXaZ1sgeO-tcnZQ1s?usp=sharing',
    true,
    8,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0009',
    'snow-brain-ai-chatbot',
    'Snow Brain Ai',
    'This is a ChatBot powered by gemini-1.5-flash of Google, optimized for speed and efficiency with real-time multimodal reasoning capabilities. The application leverages the model''s long context window to provide fast, accurate responses while maintaining low latency for seamless user interaction across multiple languages and complex queries.',
    'The main challenge was creating a responsive AI assistant that could handle complex multimodal inputs while maintaining high performance on resource-constrained devices. We needed to balance the advanced capabilities of the Gemini model with fast response times and implement proper context management to maintain coherent conversations across extended user sessions.',
    'I developed a React-based front-end that efficiently interfaces with Google''s Gemini API. The architecture includes strategic caching mechanisms, stream-based responses for improved perceived performance, and a markdown interpreter that enhances the model''s responses for humman easy lecture.',
    'Snow Brain AI has achieved exceptional user satisfaction with response times averaging under 1 second while maintaining high-quality interactions. The application successfully processes over 10,000 daily queries with a 92% satisfaction rate based on user feedback demonstrating strong market validation for AI-powered conversational interfaces.',
    'Web Apps',
    ARRAY['React', 'Gemini-1.5-flash', 'LLM', 'TypeScript', 'AI']::TEXT[],
    '/Snow-Brain-ai-preview.png',
    '/Snow-Brain-AI.png',
    '/img_2.png',
    '2024-09-12',
    'https://snow-brain-ai.vercel.app/',
    'https://github.com/DimitriTedom/Snow-Brain-Ai',
    true,
    9,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0010',
    'front-end-portfolio-for-a-client',
    'Front-end Portfolio for a Client',
    'A fully responsive front-end portfolio website developed in React within an extremely tight timeline of just 2 days. This project showcases the client''s work, skills, and contact information through a modern, clean interface designed for optimal user experience across all devices. The site features smooth animations, an interactive project gallery, and a functional contact form with email integration.',
    'The primary challenge was delivering a complete, polished portfolio website in just 48 hours while meeting all client requirements. The project demanded rapid design decisions, efficient coding practices, and seamless implementation of responsive layouts. Additionally, integrating a reliable contact form system with email functionality without backend infrastructure required creative solutions within the limited timeframe.',
    'I leveraged React''s component-based architecture to rapidly build reusable UI elements and implemented responsive design principles using modern CSS techniques. For the contact functionality, I integrated EmailJS to handle form submissions directly from the frontend, eliminating the need for a custom backend. The development process was streamlined by focusing on core features first and utilizing efficient state management for interactive elements.',
    'The project was successfully delivered within the 48-hour deadline, exceeding the client''s expectations both aesthetically and functionally. The responsive design performs flawlessly across desktop, tablet, and mobile devices, and the EmailJS integration provides reliable communication capabilities. The client was able to immediately showcase their work to potential employers, resulting in multiple interview opportunities within the first week of deployment.',
    'Web Apps',
    ARRAY['React', 'Framer Motion', 'EmailJS', 'TypeScript']::TEXT[],
    '/Paul_portfolio_thumbnail1.png',
    '/Thumbnail_PAulPortfolio.png',
    '/PaulProtFolio_Thumbnail.png',
    '2024-09-12',
    'https://paulportofolio.netlify.app/',
    'https://github.com/DimitriTedom/PORTOFOLIO_MR_PAUL',
    false,
    10,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0011',
    'sts-html-css-portfolio',
    'STS HTML/CSS Portfolio',
    'A fully responsive one-page educational website created as a reference model for students I mentor at WorketYamo. This project demonstrates modern web development practices with NEXT.js technology while emphasizing the importance of understanding and implementing raw CSS without relying on frameworks. The site features clean code organization, semantic HTML structure, and responsive design principles that scale elegantly across all device sizes.',
    'The main challenge was creating an educational project that would effectively demonstrate best practices while remaining accessible to beginning developers. I needed to balance sophisticated techniques with clear, understandable code that students could learn from. Additionally, choosing to implement responsive design with raw CSS rather than using frameworks required careful planning and implementation of media queries and flexible layout systems that would serve as good learning examples.',
    'I developed a structured approach using NEXT.js as the foundation while implementing custom CSS for all styling needs. The project architecture was organized to highlight component-based development while the CSS demonstrated fundamental concepts like the box model, flexbox, grid layouts, and responsive design techniques. I included detailed comments throughout the codebase to explain key concepts and decisions, creating a learning resource alongside a functional website.',
    'The project successfully served as both a reference implementation and teaching tool for the WorketYamo students. The students were able to analyze a complete, professional implementation that demonstrated the concepts they were learning. This approach significantly improved their understanding of NEXT.js architecture and raw CSS capabilities, with several students successfully completing their own projects based on the principles demonstrated. The educational value extended beyond the initial assignment, becoming a continued reference for best practices in their development journey.',
    'Web Apps',
    ARRAY['HTML5', 'CSS3', 'Next.js', 'SnowDev']::TEXT[],
    '/preview.png',
    '/STS PORTOFOLIO.png',
    '/preview-mobile.jpg',
    '2023-03-10',
    'https://snow-port.netlify.app/',
    'https://github.com/DimitriTedom/SnowDev-Portfolio-Version1',
    false,
    11,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0012',
    'sts-keycode-app-ascii',
    'STS_KeyCode App: ASCCI',
    'A Character to ASCII Converter application developed as an educational tool for students at WorketYamo. This interactive web application allows users to input any keyboard character and instantly see its corresponding ASCII code. The project demonstrates fundamental JavaScript concepts including event handling, character encoding, DOM manipulation, and user input processing while providing a simple but effective user interface for immediate visual feedback.',
    'The main challenge was creating an approachable learning project that would effectively teach important JavaScript concepts to beginning developers. I needed to design a project that was simple enough for students to understand completely, yet complex enough to demonstrate real-world programming concepts. Additionally, I had to present character encoding principles in an accessible way while ensuring the application handled all possible inputs correctly, including edge cases like special characters.',
    'I developed a clean, intuitive interface using HTML and CSS with JavaScript handling the core functionality. The solution implements event listeners to capture keyboard input in real-time, leveraging JavaScript''s charCodeAt() method to perform the conversion to ASCII. The code structure emphasizes readability and best practices, with clearly named functions, proper error handling, and informative comments explaining each step of the process. I also included visual feedback elements to help students understand the relationship between user actions and program responses.',
    'The project successfully served as both a practical demonstration and effective teaching tool. Students gained hands-on experience with core JavaScript concepts by studying and then recreating the application. Many were able to extend the functionality with their own features, such as supporting conversions in both directions (ASCII to character) or displaying binary representations. The project sparked discussions about character encoding standards and helped solidify understanding of event-driven programming, demonstrating how abstract programming concepts apply to tangible user interactions.',
    'Web Apps',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'KeyCodes']::TEXT[],
    '/preview_KeyCode.png',
    '/preview_KeyCode.png',
    '/preview_KeyCode.png',
    '2023-07-10',
    'https://sts-keycode.netlify.app/',
    'https://github.com/DimitriTedom/STS_KeyCode_App',
    false,
    12,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0013',
    'sts-password-generator',
    'STS Password Generator',
    'A fully responsive web application that generates strong, secure passwords based on user-defined parameters. This tool addresses the critical security vulnerability of weak password usage by creating complex combinations of characters that are significantly more resistant to brute force attacks and dictionary-based hacking attempts. Users can customize their password length and select which character types to include (uppercase letters, lowercase letters, numbers, and special symbols), giving them control over the security level while maintaining compatibility with various platform requirements.',
    'The primary challenge was designing an application that balances high security standards with user-friendly functionality. Creating a truly random password generation algorithm that avoids patterns while ensuring the inclusion of all selected character types required careful implementation. Additionally, developing an intuitive interface that works seamlessly across all device sizes while clearly communicating password strength and security concepts to non-technical users presented significant design challenges.',
    'I developed the application using modern web technologies with a focus on client-side security. The password generation algorithm uses cryptographically secure random number generation combined with character set manipulation to ensure truly unpredictable results. The responsive interface was designed with a mobile-first approach, featuring interactive controls for password length and character type selection. The solution also includes visual password strength indicators and a one-click copy function for user convenience, along with visual feedback to confirm actions.',
    'The password generator has been positively received by users who report increased confidence in their online security practices. The application successfully creates passwords that meet or exceed the security requirements of major platforms and security standards. Users appreciate the balance between security and usability, with many citing the customization options as particularly valuable when dealing with platforms that have specific password requirements. The tool now serves as a practical security enhancement for individuals looking to strengthen their digital presence without needing to understand complex cryptographic principles.',
    'Web Apps',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'Security']::TEXT[],
    '/PAssword_preview.png',
    '/PasswordGen_Dark.png',
    '/PAssword_preview.png',
    '2023-11-08',
    'https://sts-password-gen.netlify.app/',
    'https://github.com/DimitriTedom/STS-Password_Generator',
    false,
    13,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0014',
    'sts-coin-flip',
    'STS Coin Flip',
    'A fully responsive web application that digitally recreates the classic heads-or-tails coin flip game from childhood. This interactive experience features realistic 3D coin animations that simulate the physics of a flipping coin, complete with appropriate sound effects and visual feedback. Users can make predictions before each flip, keep track of their score, and enjoy a nostalgic gaming experience that works seamlessly across desktop and mobile devices. The application combines playful design elements with smooth animations to capture the simple joy and suspense of this timeless game of chance.',
    'The main challenge was creating convincingly realistic coin flip animations that would maintain the authentic feeling of unpredictability found in the physical game. Implementing 3D transformations and physics-based animations that render consistently across different devices and browsers required significant CSS expertise. Additionally, building a truly random outcome generator while maintaining the illusion of a physical coin flip presented an interesting balance of visual design and programming logic. Creating a responsive layout that preserved the game''s immersive quality on both large and small screens added another layer of complexity.',
    'I implemented advanced CSS animations using keyframes, 3D transforms, and perspective properties to create a realistic coin-flipping effect. The solution uses JavaScript''s modern random number generation to ensure fair and unpredictable outcomes, independent of the animation. To achieve responsive behavior, I employed CSS media queries and flexible layout techniques that dynamically adjust the game interface based on screen size while maintaining the proportions and physics of the animation. The code structure follows best practices with separation of concerns, modular functions, and clean state management to facilitate future enhancements.',
    'The project successfully captures the nostalgia and excitement of the physical coin toss game while showcasing significant improvements in my front-end development skills. The CSS animations provide a smooth, realistic experience that users find engaging and satisfying. The responsive design ensures the game is playable on any device, from desktop computers to smartphones, without compromising on visual quality or gameplay. Through this project, I significantly enhanced my capabilities with CSS 3D transformations, animation timing, and JavaScript best practices, creating a portfolio piece that demonstrates both technical skill and creative implementation.',
    'Web Apps',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'Game']::TEXT[],
    '/StsCoinThmbnail.png',
    '/StsCoinThmbnail.png',
    '/StsCoinThmbnail.png',
    '2024-01-15',
    'https://stscoinapp.netlify.app/',
    'https://github.com/Dimitri-Tedom/STS_CoinFlipApp',
    false,
    14,
    true
  ),
  (
    'da1f3910-1e58-4c91-9e7f-c1f0340b0015',
    'sts-tech-stickers-generator',
    'STS Tech Stickers Generator App',
    'A fully responsive web application that generates random tech-themed stickers with vibrant designs and modern typography. Users can generate stickers for various technology names, frameworks, and programming languages with a simple click. Each sticker features unique color combinations, shapes, and styling that represent the tech brand''s identity while maintaining a cohesive visual language across the collection.',
    'The primary challenge was creating a system that could generate visually appealing and unique stickers on demand while ensuring they looked professional and maintained brand recognition. I needed to implement a randomization algorithm that would create varied design elements without producing unappealing color combinations or illegible text. Additionally, ensuring responsive behavior across all device sizes while preserving the visual quality of the stickers presented significant layout and scaling challenges.',
    'I developed the application using HTML, CSS, and JavaScript to demonstrate core web development skills without relying on frameworks. The solution implements custom algorithms for color harmony selection that ensures readable text against dynamic backgrounds. For the sticker generation, I created a modular design system with interchangeable visual elements (backgrounds, borders, shadows, and typography styles) that combine randomly while following established design principles. The responsive layout uses fluid typography and flexible containers to maintain sticker proportions across devices.',
    'The Tech Name Stickers generator has become a popular tool among developers and tech enthusiasts who use it to create visually appealing stickers for their laptops, project documentation, and social media. The application consistently produces professional-looking designs that effectively represent various technology brands while maintaining visual interest. The project demonstrates my proficiency in core web technologies and algorithmic thinking while showcasing my understanding of design principles and user experience considerations. The clean, framework-free implementation has also made it an excellent teaching example for beginner web developers.',
    'Web Apps',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'TechStickers']::TEXT[],
    '/SickersThumbanil.png',
    '/SickersThumbanil.png',
    '/SickersThumbanil.png',
    '2023-10-23',
    'https://sts-tech-sticker.netlify.app/',
    'https://github.com/DimitriTedom/STS_TechStickers',
    false,
    15,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  challenge = EXCLUDED.challenge,
  solution = EXCLUDED.solution,
  result = EXCLUDED.result,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  image_url_2 = EXCLUDED.image_url_2,
  image_url_3 = EXCLUDED.image_url_3,
  demo_url = EXCLUDED.demo_url,
  code_url = EXCLUDED.code_url,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

-- ─────────────────────────────────────────────────────────────
-- 3. PROJECT PERSONAS
-- ─────────────────────────────────────────────────────────────
INSERT INTO project_personas (project_id, persona_id, relevance) VALUES
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0001', 'product-builder', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0002', 'entrepreneur', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0002', 'ai-engineer', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0003', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0003', 'product-builder', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0004', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0004', 'cloud-architect', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0005', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0005', 'ai-engineer', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0006', 'product-builder', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0007', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0007', 'entrepreneur', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0008', 'product-builder', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0008', 'entrepreneur', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0009', 'ai-engineer', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0009', 'fullstack', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0010', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0010', 'product-builder', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0011', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0011', 'entrepreneur', 1),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0012', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0013', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0014', 'fullstack', 2),
  ('da1f3910-1e58-4c91-9e7f-c1f0340b0015', 'fullstack', 2)
ON CONFLICT (project_id, persona_id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 4. EXPERIENCES
-- ─────────────────────────────────────────────────────────────
INSERT INTO experiences (id, company, position, duration, start_date, type, description, skills, sort_order) VALUES
  (
    'eb7a3311-2f69-4d92-bf7f-d1e0340c0001',
    'Worketyamo',
    'Graphic Designer & Full Stack Developer Teacher',
    '2023–Present',
    '2023-09-01',
    'Part-time',
    'Designed brand assets, marketing collateral and digital content at scale using Canva Pro and Figma. Simultaneously taught Full Stack web development (HTML, CSS, JavaScript, React) to junior developers — 15+ students onboarded into production-ready coding workflows.',
    ARRAY['Canva Pro', 'Figma', 'HTML', 'CSS', 'JavaScript', 'React', 'Teaching', 'Brand Identity']::TEXT[],
    1
  ),
  (
    'eb7a3311-2f69-4d92-bf7f-d1e0340c0002',
    'Master Language & Tech Institute (MLTI)',
    'Community Manager & Full Stack JS Developer',
    'April 2025–Present',
    '2025-04-01',
    'Full-time',
    'Leading digital presence and community engagement strategy for MLTI. Built and deployed the institutional website using React and Framer Motion. Orchestrated social media growth (+140% engagement) and automated content workflows using n8n and AI tools.',
    ARRAY['React', 'Framer Motion', 'n8n', 'Community Management', 'Content Strategy', 'Social Media', 'AI Automation']::TEXT[],
    2
  )
ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  position = EXCLUDED.position,
  duration = EXCLUDED.duration,
  start_date = EXCLUDED.start_date,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  skills = EXCLUDED.skills,
  sort_order = EXCLUDED.sort_order;

-- ─────────────────────────────────────────────────────────────
-- 5. EXPERIENCE PERSONAS
-- ─────────────────────────────────────────────────────────────
INSERT INTO experience_personas (experience_id, persona_id) VALUES
  ('eb7a3311-2f69-4d92-bf7f-d1e0340c0001', 'fullstack'),
  ('eb7a3311-2f69-4d92-bf7f-d1e0340c0001', 'product-builder'),
  ('eb7a3311-2f69-4d92-bf7f-d1e0340c0001', 'entrepreneur'),
  ('eb7a3311-2f69-4d92-bf7f-d1e0340c0002', 'fullstack'),
  ('eb7a3311-2f69-4d92-bf7f-d1e0340c0002', 'ai-engineer'),
  ('eb7a3311-2f69-4d92-bf7f-d1e0340c0002', 'entrepreneur')
ON CONFLICT (experience_id, persona_id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 6. SKILLS
-- ─────────────────────────────────────────────────────────────
INSERT INTO skills (id, name, category, icon_slug, proficiency, sort_order) VALUES
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0001', 'React', 'Frontend', 'react', 90, 1),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0002', 'Next.js', 'Frontend', 'nextdotjs', 88, 2),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0003', 'TypeScript', 'Language', 'typescript', 85, 3),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0004', 'Tailwind CSS', 'Frontend', 'tailwindcss', 92, 4),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0005', 'Node.js', 'Backend', 'nodedotjs', 82, 5),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0006', 'Express.js', 'Backend', 'express', 80, 6),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0007', 'PostgreSQL', 'Database', 'postgresql', 80, 7),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0008', 'Supabase', 'Database', 'supabase', 85, 8),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0009', 'MongoDB', 'Database', 'mongodb', 78, 9),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0010', 'n8n', 'AI & Automation', 'n8n', 80, 10),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0011', 'Google Gemini API', 'AI & Automation', 'google', 85, 11),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0012', 'OpenAI API', 'AI & Automation', 'openai', 80, 12),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0013', 'GROQ / Llama', 'AI & Automation', 'groq', 78, 13),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0014', 'Figma', 'Design', 'figma', 90, 14),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0015', 'Canva Pro', 'Design', 'canva', 95, 15),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0016', 'AWS', 'Cloud & DevOps', 'amazonaws', 65, 16),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0017', 'Docker', 'Cloud & DevOps', 'docker', 72, 17),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0018', 'Vercel', 'Cloud & DevOps', 'vercel', 90, 18),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0019', 'Business Development', 'Tools', NULL, 85, 19),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0020', 'Content Creation', 'Design', NULL, 90, 20),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0021', 'Course Design', 'Design', NULL, 88, 21),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0022', 'Community Building', 'Tools', NULL, 85, 22),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0023', 'Digital Marketing', 'Tools', NULL, 80, 23)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  icon_slug = EXCLUDED.icon_slug,
  proficiency = EXCLUDED.proficiency,
  sort_order = EXCLUDED.sort_order;

-- ─────────────────────────────────────────────────────────────
-- 7. SKILL PERSONAS
-- ─────────────────────────────────────────────────────────────
INSERT INTO skill_personas (skill_id, persona_id) VALUES
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0001', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0001', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0002', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0002', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0003', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0003', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0004', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0004', 'product-builder'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0005', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0006', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0007', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0007', 'cloud-architect'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0008', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0008', 'cloud-architect'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0009', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0010', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0011', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0012', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0013', 'ai-engineer'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0014', 'product-builder'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0015', 'product-builder'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0016', 'cloud-architect'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0017', 'cloud-architect'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0017', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0018', 'cloud-architect'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0018', 'fullstack'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0019', 'entrepreneur'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0020', 'entrepreneur'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0020', 'product-builder'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0021', 'entrepreneur'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0022', 'entrepreneur'),
  ('fb8a3311-2f69-4d92-bf7f-d1e0340d0023', 'entrepreneur')
ON CONFLICT (skill_id, persona_id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 8. ACHIEVEMENTS
-- ─────────────────────────────────────────────────────────────
INSERT INTO achievements (id, title, provider, category, description, date) VALUES
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0001',
    'Figma Essential for UI/UX Design',
    'Udemy',
    'UI/UX Design',
    'Mastered Figma fundamentals — components, auto layout, variables, prototyping and design systems.',
    '2024-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0002',
    'React: All You Need to Know',
    'Udemy',
    'Development',
    'Advanced React patterns — hooks, context, performance optimization, custom hooks.',
    '2024-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0003',
    'Canva 100 Designs Milestone',
    'Canva',
    'Design',
    'Reached 100 published design templates on Canva Pro platform.',
    '2023-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0004',
    'Canva 200 Designs Milestone',
    'Canva',
    'Design',
    'Reached 200 published design templates — entering the top contributor tier.',
    '2024-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0005',
    'ChatGPT Master Course',
    'Udemy',
    'AI & Productivity',
    'Advanced ChatGPT usage, prompt engineering and AI productivity techniques.',
    '2024-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0006',
    'Complete WordPress Developer',
    'Udemy',
    'Development',
    'Complete WordPress development — themes, plugins, Gutenberg, WooCommerce.',
    '2023-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0007',
    'Canva + AI Passive Income',
    'Udemy',
    'Business & AI',
    'Monetizing design skills with Canva and AI tools for passive income streams.',
    '2024-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0008',
    'Canva Productivity Masterclass',
    'Udemy',
    'Productivity',
    'Advanced Canva workflows, brand kit management, and team collaboration.',
    '2023-01-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0009',
    '🏆 ChezFlora — 1st Place National Competition',
    'National Competition',
    'Competition',
    'Won first place in a national e-commerce web development competition. Judged on UX, code quality, and feature completeness.',
    '2025-04-01'
  ),
  (
    'ac8a3311-2f69-4d92-bf7f-d1e0340e0010',
    'AWS Solutions Architect Associate (SAA-C03)',
    'AWS',
    'Cloud Computing',
    'Currently pursuing AWS SAA-C03 certification — EC2, S3, VPC, RDS, IAM, serverless architecture.',
    '2026-01-01'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  provider = EXCLUDED.provider,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  date = EXCLUDED.date;
