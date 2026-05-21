‎⚡ Bingham Merge (Study-Sync)
‎Real-time study group matching for Bingham University students.
‎
‎📌 Elevator Pitch
‎Merge is a lightweight, cloud-powered web application designed to eliminate academic isolation. It instantly connects university students with compatible study partners based on their faculty, academic level, and preferred learning roles, seamlessly bridging the gap between those who want to learn and those who want to teach.
‎
‎🛠️ Languages & Technologies
‎Core Languages: HTML5, CSS3, Vanilla JavaScript (ES6+)
‎Database & Backend: PostgreSQL (Hosted on Supabase)
‎Hosting/Deployment: Netlify
‎
‎📚 Libraries & APIs Used
‎Supabase JS Library (@supabase/supabase-js): Pulled via CDN to securely connect our frontend directly to our cloud database without needing a traditional backend server.
‎Supabase REST API: Handles our real-time database queries, including data insertion (.insert) and advanced case-insensitive filtering (.ilike).
‎WhatsApp Web API: Utilizes the wa.me Click-to-Chat protocol to seamlessly convert raw database phone numbers into direct, pre-filled WhatsApp messages.
‎
‎📱 UI/UX & Device Friendliness
‎Mobile-First & Fully Responsive: Since university students primarily use their smartphones, the interface was built using CSS Grid and Flexbox to adapt perfectly to any screen size—from mobile phones to desktop monitors.
‎Modern Interface (Glassmorphism): The UI features frosted-glass effects, soft shadows, and dynamic background blobs to create a highly engaging, modern aesthetic.
‎Seamless Single-Page Application (SPA) Feel: View transitions are handled instantly via JavaScript DOM manipulation, meaning the user never has to sit through a page reload.
‎
‎⚠️ The Problem
‎At Bingham University, students often struggle to find serious study partners within their specific departments. Existing communication channels are cluttered and noisy. There is no centralized, efficient way to pair students based on their complementary learning styles.
‎
‎💡 The Solution
‎Merge solves this by providing a streamlined matching portal. Students input their academic details and define their "Study Role" (The Teacher, The Writer, The Listener). Our algorithm instantly queries a live database to find peers in the exact same Faculty and Level. Once a match is found, students can connect instantly via WhatsApp.
‎
‎🚀 How It Works (User Flow)
‎Onboarding: The user enters their details, selecting their exact Faculty from a strict dropdown menu to prevent spelling errors.
‎Cloud Save: Data is securely pushed to the Supabase backend.
‎The Algorithm: The system fetches all active users within the same Faculty and Level, prioritizing gender preferences.
‎Display: Matches are displayed on dynamic UI cards with the partner's details and a direct contact button.
‎
‎🔮 Future Roadmap
‎Campus Expansion: Scaling the database to support other universities across Nigeria.
‎In-App Messaging: Building a native chat feature to keep phone numbers entirely private until users decide to share them.
