# -*- coding: utf-8 -*-
import os
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether
from reportlab.lib import colors
from reportlab.lib.units import inch

def get_chapters_6_to_10_story(styles, assets_dir):
    story = []
    
    # ---------------------------------------------------------
    # CHAPTER 6: TECHNOLOGY STACK & TOOLS SELECTION
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 6", styles['h1']))
    story.append(Paragraph("TECHNOLOGY STACK AND TOOLS SELECTION", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("6.1 Architecture Selection Rationale", styles['h2']))
    story.append(Paragraph(
        "The technological blueprint of the SOSafe system is deliberately engineered to prioritize ultra-low latency, "
        "high availability, zero-friction client deployment, and decoupled enterprise-grade orchestration. Traditional "
        "monolithic client-server architectures introduce single points of failure, cold-start latency penalties, and high "
        "server maintenance overheads that compromise reliability during life-critical emergencies. To overcome these "
        "vulnerabilities, SOSafe implements a serverless, event-driven web architecture combining client-side native browser "
        "APIs, managed PostgreSQL cloud infrastructure (Supabase), and self-hosted low-code workflow automation (n8n).",
        styles['body']
    ))
    
    story.append(Paragraph("6.2 Frontend Layer: Responsive Web & Native Browser APIs", styles['h2']))
    story.append(Paragraph(
        "<b>HTML5 & Semantic Structure:</b> Pure semantic HTML5 elements are utilized to establish accessible, fast-rendering "
        "interfaces that operate seamlessly across desktop browsers, low-end mobile viewports, and Progressive Web App (PWA) environments.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>Modern CSS3 & Glassmorphic UI:</b> The visual design employs custom CSS3 custom properties (variables), Flexbox, "
        "CSS Grid layouts, and backdrop-filter glassmorphism. It guarantees fluid responsiveness across screen resolutions from 320px "
        "mobile displays up to 4K desktop screens without requiring third-party heavy UI frameworks.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>Vanilla JavaScript (ES6+):</b> Built entirely with native ES6+ asynchronous JavaScript (Fetch API, Promises, Async/Await), "
        "eliminating heavyweight framework dependencies (such as React or Angular) to achieve sub-50ms DOM execution times and instant "
        "button responsiveness during emergency dispatch.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>W3C Geolocation API:</b> Provides high-accuracy real-time GPS coordinate acquisition (latitude, longitude, altitude, accuracy "
        "radius, heading, and speed) directly from hardware sensors with battery-efficient continuous watchPosition listeners.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>W3C Web Audio API:</b> Synthesizes loud, multi-frequency emergency distress acoustic sirens client-side using native audio "
        "oscillators without needing pre-cached audio files or external streaming bandwidth.",
        styles['body']
    ))
    
    story.append(Paragraph("6.3 Backend-as-a-Service: Supabase & PostgreSQL", styles['h2']))
    story.append(Paragraph(
        "<b>PostgreSQL 15 Relational Database:</b> High-performance relational database ensuring strict ACID compliance, relational integrity "
        "between users, contacts, and telemetry records, and advanced JSONB querying capabilities.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>GoTrue Authentication Engine:</b> Provides cryptographic JWT-based authentication, user session persistence via LocalStorage, "
        "and secure password hashing using bcrypt algorithms.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>Row-Level Security (RLS):</b> PostgreSQL granular security policies executed at the database kernel level to guarantee complete "
        "data isolation between authenticated users, blocking unauthorized data access or horizontal privilege escalation.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>Real-Time Websocket Subscriptions:</b> Supabase Realtime engine listens to database WAL (Write-Ahead Logging) changes and "
        "streams live location telemetry to active monitoring interfaces with sub-second latencies.",
        styles['body']
    ))
    
    story.append(Paragraph("6.4 Automation & Notification Layer: n8n & Twilio", styles['h2']))
    story.append(Paragraph(
        "<b>n8n Workflow Automation Platform:</b> A powerful, self-hosted, node-based workflow engine that receives HTTP POST emergency "
        "webhook triggers, queries the Supabase database via REST APIs to resolve user profiles and emergency contact lists, formats multi-channel "
        "dispatch payloads, and orchestrates SMS, WhatsApp, and email dispatch pipelines concurrently.",
        styles['body']
    ))
    story.append(Paragraph(
        "<b>Twilio Programmable SMS API:</b> Tier-1 global telecommunications gateway ensuring instant SMS message delivery to registered "
        "emergency contacts with dynamic Google Maps GPS navigation hyperlinks and medical profile summaries.",
        styles['body']
    ))
    
    story.append(Paragraph("Table 6.1: Comprehensive Technology Stack Matrix", styles['caption']))
    tech_data = [
        [Paragraph("<b>Component / Layer</b>", styles['table_header']),
         Paragraph("<b>Technology / Tool</b>", styles['table_header']),
         Paragraph("<b>Version / Specification</b>", styles['table_header']),
         Paragraph("<b>Functional Role & Justification</b>", styles['table_header'])],
        [Paragraph("Frontend UI / UX", styles['table_cell']),
         Paragraph("HTML5, CSS3, JavaScript", styles['table_cell']),
         Paragraph("ES6+ / Modern Standards", styles['table_cell']),
         Paragraph("Zero-dependency, high-speed DOM rendering, responsive layout", styles['table_cell'])],
        [Paragraph("Location Telemetry", styles['table_cell']),
         Paragraph("W3C Geolocation API", styles['table_cell']),
         Paragraph("W3C Recommendation", styles['table_cell']),
         Paragraph("Hardware-level GPS coordinate retrieval with high accuracy", styles['table_cell'])],
        [Paragraph("Audio Alert Engine", styles['table_cell']),
         Paragraph("W3C Web Audio API", styles['table_cell']),
         Paragraph("W3C Audio Context", styles['table_cell']),
         Paragraph("Pure client-side acoustic oscillator siren generation", styles['table_cell'])],
        [Paragraph("Database Engine", styles['table_cell']),
         Paragraph("PostgreSQL", styles['table_cell']),
         Paragraph("v15.1 Enterprise", styles['table_cell']),
         Paragraph("ACID relational store, foreign keys, cascading constraints", styles['table_cell'])],
        [Paragraph("BaaS Platform", styles['table_cell']),
         Paragraph("Supabase Cloud", styles['table_cell']),
         Paragraph("Client SDK v2.39+", styles['table_cell']),
         Paragraph("JWT Auth, PostgREST API, RLS security, Realtime streaming", styles['table_cell'])],
        [Paragraph("Workflow Orchestrator", styles['table_cell']),
         Paragraph("n8n Automation Platform", styles['table_cell']),
         Paragraph("v1.x Community / Cloud", styles['table_cell']),
         Paragraph("Webhook listener, contact expansion, multi-channel dispatch", styles['table_cell'])],
        [Paragraph("Telephony Gateway", styles['table_cell']),
         Paragraph("Twilio REST API", styles['table_cell']),
         Paragraph("v2010-04-01", styles['table_cell']),
         Paragraph("Global SMS delivery to emergency contacts with GPS links", styles['table_cell'])],
        [Paragraph("Localization", styles['table_cell']),
         Paragraph("JSON Translation Engine", styles['table_cell']),
         Paragraph("Custom Client Dictionary", styles['table_cell']),
         Paragraph("Trilingual interface switching (English, Tamil, Hindi)", styles['table_cell'])]
    ]
    t_tech = Table(tech_data, colWidths=[1.3*inch, 1.4*inch, 1.3*inch, 2.7*inch])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_tech)
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # CHAPTER 7: SYSTEM DESIGN & ARCHITECTURE
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 7", styles['h1']))
    story.append(Paragraph("SYSTEM DESIGN AND ARCHITECTURE", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("7.1 Overall System Architecture", styles['h2']))
    story.append(Paragraph(
        "The SOSafe platform follows a robust multi-tier decoupled architecture comprising the Client Application Layer, "
        "the Security & Database Layer (Supabase), the Workflow Orchestration Layer (n8n), and the External Telecommunications Layer (Twilio). "
        "When an emergency is triggered, the client simultaneously fires an acoustic alarm, pushes telemetry data into PostgreSQL via Supabase, "
        "and dispatches an HTTP POST event to n8n for parallel message dispatch.",
        styles['body']
    ))
    
    arch_img_path = os.path.join(assets_dir, "arch_diagram.png")
    if os.path.exists(arch_img_path):
        story.append(KeepTogether([
            Image(arch_img_path, width=6.5*inch, height=3.6*inch),
            Paragraph("Figure 7.1: SOSafe Multi-Tier Cloud & Edge System Architecture", styles['caption'])
        ]))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("7.2 End-to-End Emergency Workflow", styles['h2']))
    story.append(Paragraph(
        "The operational lifecycle of an emergency event begins when the user triggers the SOS button or automatically initiates "
        "live location sharing. The client acquires high-precision GPS coordinates, persists the alert record in Supabase, and contacts the "
        "n8n webhook. n8n executes a multi-step workflow: resolving contact telephone numbers from Supabase, constructing personalized SMS text "
        "containing live tracking links and user medical profiles, and transmitting the messages via Twilio.",
        styles['body']
    ))
    
    workflow_img_path = os.path.join(assets_dir, "workflow_diagram.png")
    if os.path.exists(workflow_img_path):
        story.append(KeepTogether([
            Image(workflow_img_path, width=6.5*inch, height=3.6*inch),
            Paragraph("Figure 7.2: End-to-End Emergency Alert & Notification Workflow", styles['caption'])
        ]))
    story.append(PageBreak())
    
    story.append(Paragraph("7.3 Data Flow Diagrams (DFD Level 0 and Level 1)", styles['h2']))
    story.append(Paragraph(
        "The Data Flow Diagram represents the logical progression of data through the system boundaries. In DFD Level 0 (Context Diagram), "
        "the external entities (End User, Emergency Contacts, Supabase Cloud, and Twilio Gateway) interact directly with the SOSafe Central System. "
        "In DFD Level 1, the processes are decomposed into Authentication Management (1.0), Profile & Medical Records (2.0), Contact Management (3.0), "
        "Live Telemetry & Tracking Engine (4.0), and SOS Dispatch Orchestrator (5.0).",
        styles['body']
    ))
    
    dfd_img_path = os.path.join(assets_dir, "dfd_diagram.png")
    if os.path.exists(dfd_img_path):
        story.append(KeepTogether([
            Image(dfd_img_path, width=6.5*inch, height=3.6*inch),
            Paragraph("Figure 7.3: Data Flow Diagram (DFD Level 0 Context & Level 1 Decomposition)", styles['caption'])
        ]))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("7.4 Use Case Diagram & Actor Analysis", styles['h2']))
    story.append(Paragraph(
        "The primary actors in the SOSafe ecosystem include the Vulnerable User (Citizen/Individual), the Emergency Guardian (Trusted Contact), "
        "the System Administrator, and the Third-Party Automation Engine (n8n/Twilio). Use cases encompass account creation, medical profile configuration, "
        "contact list management, one-touch SOS activation, live location broadcast, and distress siren triggering.",
        styles['body']
    ))
    
    usecase_img_path = os.path.join(assets_dir, "usecase_diagram.png")
    if os.path.exists(usecase_img_path):
        story.append(KeepTogether([
            Image(usecase_img_path, width=6.5*inch, height=3.6*inch),
            Paragraph("Figure 7.4: UML Use Case Diagram for User and System Interactions", styles['caption'])
        ]))
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # CHAPTER 8: DATABASE DESIGN & DATA MODELING
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 8", styles['h1']))
    story.append(Paragraph("DATABASE DESIGN AND DATA MODELING", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("8.1 Entity Relationship (ER) Model", styles['h2']))
    story.append(Paragraph(
        "The relational schema of SOSafe is strictly normalized to Third Normal Form (3NF) to eliminate data redundancy while maintaining "
        "referential integrity. The schema is anchored around the central `auth.users` authentication entity provided by Supabase GoTrue, "
        "which maintains a 1-to-1 relationship with `profiles`, and 1-to-Many relationships with `emergency_contacts`, `live_location_sessions`, "
        "and `emergency_alerts`.",
        styles['body']
    ))
    
    er_img_path = os.path.join(assets_dir, "er_diagram.png")
    if os.path.exists(er_img_path):
        story.append(KeepTogether([
            Image(er_img_path, width=6.5*inch, height=3.6*inch),
            Paragraph("Figure 8.1: Entity Relationship (ER) Diagram with Cardinality and Foreign Key Mappings", styles['caption'])
        ]))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("8.2 Database Tables Data Dictionaries", styles['h2']))
    
    story.append(Paragraph("Table 8.1: Data Dictionary for `profiles` Table", styles['caption']))
    t81_data = [
        [Paragraph("<b>Column Name</b>", styles['table_header']),
         Paragraph("<b>Data Type</b>", styles['table_header']),
         Paragraph("<b>Constraints</b>", styles['table_header']),
         Paragraph("<b>Description</b>", styles['table_header'])],
        [Paragraph("id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("PK, FK -> auth.users(id) ON DELETE CASCADE", styles['table_cell']), Paragraph("Unique identifier bound to Supabase auth user", styles['table_cell'])],
        [Paragraph("full_name", styles['table_cell']), Paragraph("VARCHAR(255)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Full legal name of the user", styles['table_cell'])],
        [Paragraph("phone_number", styles['table_cell']), Paragraph("VARCHAR(20)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Primary contact mobile phone number", styles['table_cell'])],
        [Paragraph("blood_group", styles['table_cell']), Paragraph("VARCHAR(10)", styles['table_cell']), Paragraph("NULLABLE", styles['table_cell']), Paragraph("Blood type (e.g., O+, A+, B-, AB+)", styles['table_cell'])],
        [Paragraph("medical_notes", styles['table_cell']), Paragraph("TEXT", styles['table_cell']), Paragraph("NULLABLE", styles['table_cell']), Paragraph("Critical medical conditions, allergies, or medications", styles['table_cell'])],
        [Paragraph("created_at", styles['table_cell']), Paragraph("TIMESTAMPTZ", styles['table_cell']), Paragraph("DEFAULT NOW()", styles['table_cell']), Paragraph("Timestamp of profile creation", styles['table_cell'])],
        [Paragraph("updated_at", styles['table_cell']), Paragraph("TIMESTAMPTZ", styles['table_cell']), Paragraph("DEFAULT NOW()", styles['table_cell']), Paragraph("Timestamp of last profile update", styles['table_cell'])]
    ]
    t_t81 = Table(t81_data, colWidths=[1.1*inch, 1.0*inch, 2.3*inch, 2.3*inch])
    t_t81.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_t81)
    story.append(Spacer(1, 0.06 * inch))
    
    story.append(Paragraph("Table 8.2: Data Dictionary for `emergency_contacts` Table", styles['caption']))
    t82_data = [
        [Paragraph("<b>Column Name</b>", styles['table_header']),
         Paragraph("<b>Data Type</b>", styles['table_header']),
         Paragraph("<b>Constraints</b>", styles['table_header']),
         Paragraph("<b>Description</b>", styles['table_header'])],
        [Paragraph("id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("PK, DEFAULT gen_random_uuid()", styles['table_cell']), Paragraph("Unique contact identifier", styles['table_cell'])],
        [Paragraph("user_id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("FK -> auth.users(id) ON DELETE CASCADE", styles['table_cell']), Paragraph("Owner user ID who registered the contact", styles['table_cell'])],
        [Paragraph("contact_name", styles['table_cell']), Paragraph("VARCHAR(255)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Name of the trusted guardian", styles['table_cell'])],
        [Paragraph("contact_phone", styles['table_cell']), Paragraph("VARCHAR(20)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Phone number for SMS dispatch", styles['table_cell'])],
        [Paragraph("relationship", styles['table_cell']), Paragraph("VARCHAR(50)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Relation (Parent, Spouse, Sibling, Friend)", styles['table_cell'])],
        [Paragraph("created_at", styles['table_cell']), Paragraph("TIMESTAMPTZ", styles['table_cell']), Paragraph("DEFAULT NOW()", styles['table_cell']), Paragraph("Registration timestamp", styles['table_cell'])]
    ]
    t_t82 = Table(t82_data, colWidths=[1.1*inch, 1.0*inch, 2.3*inch, 2.3*inch])
    t_t82.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_t82)
    story.append(PageBreak())
    
    story.append(Paragraph("Table 8.3: Data Dictionary for `live_location_sessions` Table", styles['caption']))
    t83_data = [
        [Paragraph("<b>Column Name</b>", styles['table_header']),
         Paragraph("<b>Data Type</b>", styles['table_header']),
         Paragraph("<b>Constraints</b>", styles['table_header']),
         Paragraph("<b>Description</b>", styles['table_header'])],
        [Paragraph("id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("PK, DEFAULT gen_random_uuid()", styles['table_cell']), Paragraph("Unique telemetry session identifier", styles['table_cell'])],
        [Paragraph("user_id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("FK -> auth.users(id) ON DELETE CASCADE", styles['table_cell']), Paragraph("User streaming geographic position", styles['table_cell'])],
        [Paragraph("latitude", styles['table_cell']), Paragraph("NUMERIC(10,8)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Current WGS84 GPS latitude", styles['table_cell'])],
        [Paragraph("longitude", styles['table_cell']), Paragraph("NUMERIC(11,8)", styles['table_cell']), Paragraph("NOT NULL", styles['table_cell']), Paragraph("Current WGS84 GPS longitude", styles['table_cell'])],
        [Paragraph("accuracy", styles['table_cell']), Paragraph("NUMERIC(8,2)", styles['table_cell']), Paragraph("NULLABLE", styles['table_cell']), Paragraph("GPS horizontal accuracy radius in meters", styles['table_cell'])],
        [Paragraph("is_active", styles['table_cell']), Paragraph("BOOLEAN", styles['table_cell']), Paragraph("DEFAULT TRUE", styles['table_cell']), Paragraph("Flag indicating active location broadcast", styles['table_cell'])],
        [Paragraph("updated_at", styles['table_cell']), Paragraph("TIMESTAMPTZ", styles['table_cell']), Paragraph("DEFAULT NOW()", styles['table_cell']), Paragraph("Timestamp of most recent coordinate update", styles['table_cell'])]
    ]
    t_t83 = Table(t83_data, colWidths=[1.1*inch, 1.0*inch, 2.3*inch, 2.3*inch])
    t_t83.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_t83)
    story.append(Spacer(1, 0.06 * inch))
    
    story.append(Paragraph("Table 8.4: Data Dictionary for `emergency_alerts` Table", styles['caption']))
    t84_data = [
        [Paragraph("<b>Column Name</b>", styles['table_header']),
         Paragraph("<b>Data Type</b>", styles['table_header']),
         Paragraph("<b>Constraints</b>", styles['table_header']),
         Paragraph("<b>Description</b>", styles['table_header'])],
        [Paragraph("id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("PK, DEFAULT gen_random_uuid()", styles['table_cell']), Paragraph("Unique SOS alert dispatch log ID", styles['table_cell'])],
        [Paragraph("user_id", styles['table_cell']), Paragraph("UUID", styles['table_cell']), Paragraph("FK -> auth.users(id) ON DELETE CASCADE", styles['table_cell']), Paragraph("Victim initiating the distress event", styles['table_cell'])],
        [Paragraph("status", styles['table_cell']), Paragraph("VARCHAR(50)", styles['table_cell']), Paragraph("DEFAULT 'ACTIVE'", styles['table_cell']), Paragraph("Alert state ('ACTIVE', 'RESOLVED', 'FALSE_ALARM')", styles['table_cell'])],
        [Paragraph("latitude", styles['table_cell']), Paragraph("NUMERIC(10,8)", styles['table_cell']), Paragraph("NULLABLE", styles['table_cell']), Paragraph("Snapshot latitude at time of trigger", styles['table_cell'])],
        [Paragraph("longitude", styles['table_cell']), Paragraph("NUMERIC(11,8)", styles['table_cell']), Paragraph("NULLABLE", styles['table_cell']), Paragraph("Snapshot longitude at time of trigger", styles['table_cell'])],
        [Paragraph("created_at", styles['table_cell']), Paragraph("TIMESTAMPTZ", styles['table_cell']), Paragraph("DEFAULT NOW()", styles['table_cell']), Paragraph("Timestamp of SOS button press", styles['table_cell'])]
    ]
    t_t84 = Table(t84_data, colWidths=[1.1*inch, 1.0*inch, 2.3*inch, 2.3*inch])
    t_t84.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 3), ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_t84)
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("8.3 Row-Level Security (RLS) Policy Implementation", styles['h2']))
    story.append(Paragraph(
        "To ensure uncompromising data privacy, PostgreSQL Row-Level Security is strictly enabled across all application tables. "
        "Policies leverage the PostgreSQL session variable `auth.uid()` to evaluate whether the requesting JWT owns the row: <br/>"
        "• <b>Profiles Policy:</b> `CREATE POLICY \"Users can manage own profile\" ON profiles FOR ALL USING (auth.uid() = id);`<br/>"
        "• <b>Contacts Policy:</b> `CREATE POLICY \"Users can manage own contacts\" ON emergency_contacts FOR ALL USING (auth.uid() = user_id);`<br/>"
        "• <b>Location Policy:</b> `CREATE POLICY \"Users can update own location\" ON live_location_sessions FOR ALL USING (auth.uid() = user_id);`<br/>"
        "• <b>Service Role Bypass:</b> Automation workflows running in n8n authenticate via a secure Supabase Service Role Key to read contact lists across tenants solely during active emergency dispatch routines.",
        styles['body']
    ))
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # CHAPTER 9: DETAILED MODULE DESCRIPTION
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 9", styles['h1']))
    story.append(Paragraph("DETAILED MODULE DESCRIPTION", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("9.1 Authentication and Session Management Module", styles['h2']))
    story.append(Paragraph(
        "The authentication module handles user sign-up, sign-in, session validation, and secure sign-out. "
        "Implemented in `js/auth.js` and `js/supabase.js`, it interfaces with Supabase GoTrue Auth. When a user submits their "
        "credentials, Supabase validates the email/password hash and returns a cryptographic JWT access token along with a refresh token. "
        "The client securely stores these in browser LocalStorage. Global navigation guards verify session validity on every page load; "
        "unauthenticated requests are immediately routed to `login.html`, while authenticated sessions are directed to the primary `dashboard.html`.",
        styles['body']
    ))
    
    story.append(Paragraph("9.2 Emergency Profile & Medical Details Module", styles['h2']))
    story.append(Paragraph(
        "Implemented in `profile.html` and `js/profile.js`, this module manages the victim's personal identification, phone number, "
        "blood group, and critical medical history (allergies, diabetic conditions, cardiovascular ailments, ongoing prescriptions). "
        "Upon registration or update, form inputs are sanitized, validated, and upserted into the `profiles` table in Supabase. "
        "In an emergency, this structured profile data is automatically pulled by n8n and bundled into the distress message for first responders.",
        styles['body']
    ))
    
    story.append(Paragraph("9.3 Trusted Emergency Contacts Module", styles['h2']))
    story.append(Paragraph(
        "Located in `contacts.html` and `js/contacts.js`, this module enforces the configuration of at least two to four trusted contacts "
        "(e.g., parents, guardians, spouse, close friends). Users can add, view, update, and delete contacts. The user interface provides "
        "instant visual status indicators (e.g., green badge when >= 2 contacts are saved, amber badge when under-configured). "
        "Every contact record is persisted to `emergency_contacts` with full foreign-key binding to the active user.",
        styles['body']
    ))
    
    story.append(Paragraph("9.4 One-Touch SOS Dispatch & Siren Alert Module", styles['h2']))
    story.append(Paragraph(
        "The core life-safety engine resides in `js/dashboard.js` and `dashboard.html`. When the prominent red SOS button is tapped: <br/>"
        "1. <b>Haptic & Visual Feedback:</b> The UI activates an urgent pulsing animation and provides immediate haptic feedback.<br/>"
        "2. <b>Acoustic Alarm:</b> The module initializes a Web Audio API `AudioContext` and modulates dual-frequency oscillator tones "
        "(800Hz to 1200Hz frequency sweeps) to generate a piercing distress siren designed to deter attackers and attract bystanders.<br/>"
        "3. <b>HTTP Webhook POST:</b> Asynchronously dispatches a clean JSON payload `{ \"user_id\": currentUserId }` via the standard "
        "Fetch API to the configured n8n webhook endpoint.<br/>"
        "4. <b>Toast Notification:</b> Confirms successful dispatch to the user with a reassuring high-visibility banner.",
        styles['body']
    ))
    
    story.append(Paragraph("9.5 Real-Time Geolocation Tracking & Session Engine", styles['h2']))
    story.append(Paragraph(
        "Managed in `location.html` and `js/live-location.js`, this engine interfaces with `navigator.geolocation.watchPosition()`. "
        "It captures high-accuracy GPS coordinates, horizontal accuracy, heading, and velocity. The module establishes a persistent "
        "telemetry session in `live_location_sessions`, continually updating the database row. In addition, an interactive Leaflet / OpenStreetMap "
        "visualizer renders the victim's position and creates direct Google Maps navigation URLs formatted for mobile guardians.",
        styles['body']
    ))
    
    story.append(Paragraph("9.6 n8n Multi-Channel Orchestrator Module", styles['h2']))
    story.append(Paragraph(
        "The n8n automation pipeline acts as the intelligent backend dispatch engine. It receives the webhook POST request, queries Supabase "
        "to retrieve the user's name and medical notes from `profiles`, and fetches all associated guardians from `emergency_contacts`. "
        "It then iterates over the contact list, assembling custom SMS message bodies containing: the victim's name, emergency alert status, "
        "exact Google Maps navigation link, and vital medical notes. Finally, it invokes the Twilio node to broadcast the messages across cellular networks.",
        styles['body']
    ))
    
    story.append(Paragraph("9.7 Trilingual Localization Engine", styles['h2']))
    story.append(Paragraph(
        "Engineered in `js/language.js`, this module provides zero-latency client-side translation between English, Tamil (தமிழ்), "
        "and Hindi (हिन्दी). A comprehensive JSON dictionary maps UI text keys across all views. Language preference is stored in LocalStorage, "
        "ensuring that users under severe stress can navigate the platform in their native regional language.",
        styles['body']
    ))
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # CHAPTER 10: IMPLEMENTATION AND CODE FLOW
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 10", styles['h1']))
    story.append(Paragraph("IMPLEMENTATION AND CODE FLOW", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("10.1 SOS Dispatch Execution Flow", styles['h2']))
    story.append(Paragraph(
        "The execution path during an emergency activation follows a rigorous, non-blocking asynchronous pipeline designed to prevent "
        "UI freezes and guarantee message delivery even under spotty network connectivity:",
        styles['body']
    ))
    story.append(Paragraph("• <b>Step 1: User Gesture Event:</b> User taps the SOS button element (`#sos-btn`) on `dashboard.html`.", styles['bullet']))
    story.append(Paragraph("• <b>Step 2: Session Extraction:</b> `supabase.auth.getUser()` verifies the active user token and retrieves `user.id`.", styles['bullet']))
    story.append(Paragraph("• <b>Step 3: Web Audio Initialization:</b> `startEmergencySiren()` creates an `AudioContext` and modulates sine/square oscillators.", styles['bullet']))
    story.append(Paragraph("• <b>Step 4: Geolocation Acquisition:</b> `navigator.geolocation.getCurrentPosition()` obtains instant GPS coordinates.", styles['bullet']))
    story.append(Paragraph("• <b>Step 5: Database Alert Insertion:</b> An alert record is inserted into `emergency_alerts` via Supabase PostgREST client.", styles['bullet']))
    story.append(Paragraph("• <b>Step 6: Webhook POST Dispatch:</b> `fetch(WEBHOOK_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ user_id: currentUserId }) })` is dispatched to n8n.", styles['bullet']))
    story.append(Paragraph("• <b>Step 7: n8n Workflow Processing:</b> Webhook node triggers -> Supabase node reads `profiles` & `emergency_contacts` -> Twilio node sends SMS -> Webhook responds with HTTP 200 OK.", styles['bullet']))
    story.append(Paragraph("• <b>Step 8: UI Feedback & State Update:</b> The dashboard displays an alert confirmation toast and switches into active emergency tracking mode.", styles['bullet']))
    
    story.append(Paragraph("10.2 Robust Error Handling and Fault Tolerance", styles['h2']))
    story.append(Paragraph(
        "Life-critical systems must degrade gracefully. SOSafe implements multi-layer fault tolerance mechanisms: <br/>"
        "1. <b>Network Timeout & Retry Logic:</b> Fetch requests to n8n include timeout traps with fallback SMS trigger attempts.<br/>"
        "2. <b>CORS & HTTP Method Guard:</b> The webhook endpoint explicitly accepts HTTP POST with standard JSON headers, resolving earlier 405 Method Not Allowed misconfigurations.<br/>"
        "3. <b>GPS Hardware Fallback:</b> If high-accuracy GPS fails or times out, the system falls back to coarse IP-based geolocation while notifying contacts of the wider accuracy radius.<br/>"
        "4. <b>Audio Autoplay Policy Handling:</b> The Web Audio API context is resumed inside a direct user-interaction callback to comply with modern browser autoplay restrictions without failing.",
        styles['body']
    ))
    story.append(PageBreak())
    
    return story
