# -*- coding: utf-8 -*-
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
from reportlab.lib import colors

def add_chapters_1_to_5(story, s):
    # =========================================================================
    # CHAPTER 1: INTRODUCTION
    # =========================================================================
    story.append(Paragraph("CHAPTER 1", s['h2']))
    story.append(Paragraph("INTRODUCTION", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#5D2D3E'), spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("1.1 Background of the Study", s['h2']))
    story.append(Paragraph(
        "In the contemporary world, personal security, rapid emergency communication, and situational awareness represent "
        "fundamental human necessities. Urbanization, expanding transit corridors, late-night professional commuting, isolated "
        "working conditions, and increasing instances of medical distress have elevated the urgency for automated personal protection tools. "
        "While mobile smartphones are ubiquitous, conventional emergency response mechanisms predominantly rely on manual telephone dialing "
        "to centralized emergency numbers (such as 112 or 911) or manual text messaging to individual contacts. Under extreme duress, panic, "
        "physical assault, or sudden medical incapacitation, victims are rarely capable of unlocking a device, searching for a phone contact, "
        "typing coordinate details, and explaining their situation over voice calls. Consequently, there exists a critical technological need "
        "for automated, zero-friction, one-touch safety broadcast platforms.",
        s['body']
    ))

    story.append(Paragraph("1.2 Project Overview", s['h2']))
    story.append(Paragraph(
        "<b>SOSafe</b> is an AI-powered personal emergency safety web application engineered to transform how individuals signal distress "
        "and share live situational telemetry with their trusted circle of guardians. Operating entirely as a responsive web platform, "
        "SOSafe eliminates the friction of native app store installations while utilizing hardware-accelerated browser APIs. The system "
        "integrates <b>Supabase PostgreSQL</b> for cloud data persistence and Row Level Security, <b>W3C Geolocation API</b> for real-time "
        "coordinate tracking, <b>Web Audio API</b> for dual-frequency acoustic siren generation, and <b>n8n automation webhooks</b> for "
        "instantaneous cloud-to-telecom SMS dispatch.",
        s['body']
    ))

    story.append(Paragraph("1.3 Motivation", s['h2']))
    story.append(Paragraph(
        "The motivation behind SOSafe stems from real-world analyses of emergency survival rates, which prove that the first three minutes "
        "(the 'Golden Window') following an incident determine the likelihood of effective intervention. Existing mobile safety applications "
        "suffer from heavy memory footprints, intrusive background tracking that depletes battery reserves, complex navigation menus, and "
        "rigid single-language user interfaces. SOSafe is motivated by the design philosophy of <i>Radical Simplicity and Guaranteed Dispatch</i>—providing "
        "a visual, bold, single-tap SOS button that triggers visual, acoustic, database, and telecom alerts in under three seconds.",
        s['body']
    ))

    story.append(Paragraph("1.4 Objectives of the Project", s['h2']))
    story.append(Paragraph("The primary academic and technical objectives of the SOSafe system are:", s['body']))
    story.append(Paragraph("• <b>Instantaneous Distress Dispatch:</b> To provide a prominent, one-tap emergency SOS button with an abortable 3-second countdown to prevent accidental triggers while ensuring instant activation.", s['bullet']))
    story.append(Paragraph("• <b>High-Precision Geolocation Streaming:</b> To acquire GPS telemetry (latitude, longitude, accuracy) and generate instant shareable live-tracking web links via MapTiler geospatial maps.", s['bullet']))
    story.append(Paragraph("• <b>Automated Cloud Workflow Integration:</b> To establish an asynchronous HTTP POST webhook bridge with n8n cloud automation to orchestrate instant SMS dispatch containing live victim coordinates.", s['bullet']))
    story.append(Paragraph("• <b>Secure Relational Cloud Storage:</b> To implement a robust database schema on Supabase PostgreSQL with strict Row Level Security (RLS) policies and database constraints (enforcing 2 to 4 emergency contacts).", s['bullet']))
    story.append(Paragraph("• <b>Multilingual Inclusivity:</b> To embed a client-side trilingual engine supporting English, Tamil, and Tanglish for broad regional usability across diverse demographics.", s['bullet']))
    story.append(Paragraph("• <b>Acoustic Deterrence:</b> To synthesize an immediate browser-native audio siren using Web Audio API oscillators to disorient aggressors and alert nearby bystanders.", s['bullet']))

    story.append(Paragraph("1.5 Scope of the Project", s['h2']))
    story.append(Paragraph(
        "The current scope of SOSafe encompasses a production-grade web application accessible on all modern desktop and mobile browsers "
        "(Chrome, Safari, Firefox, Edge). It includes complete user authentication, profile customization, emergency contact management, "
        "emergency alert logging in Supabase, n8n webhook routing, and real-time live location broadcast sessions. The system is designed "
        "as an extensible platform capable of future integration with wearable IoT hardware, police dispatch APIs, and biometric sensors.",
        s['body']
    ))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 2: PROBLEM IDENTIFICATION
    # =========================================================================
    story.append(Paragraph("CHAPTER 2", s['h2']))
    story.append(Paragraph("PROBLEM IDENTIFICATION", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#5D2D3E'), spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("2.1 Existing Scenario", s['h2']))
    story.append(Paragraph(
        "In current emergency management paradigms, when an individual encounters a threatening scenario, their response options are severely "
        "constrained. Dialing emergency telephone helplines requires unlocking the device, opening the phone dialer, keying in numbers, and "
        "verbally articulating their exact location—an impossible task if the victim is lost, disoriented, injured, or being coerced into silence. "
        "Furthermore, dispatch operators often require several minutes to triangulate cell-tower coordinates, introducing fatal delays.",
        s['body']
    ))

    story.append(Paragraph("2.2 Existing Systems and Architectures", s['h2']))
    story.append(Paragraph(
        "Existing solutions generally fall into two categories: (1) Native mobile safety applications (e.g., dedicated app-store apps), and "
        "(2) Hardware SOS panic buttons. While hardware buttons require dedicated cellular subscriptions and battery maintenance, native mobile "
        "apps mandate substantial storage, persistent background tracking permissions, and complex login procedures that fail when the user "
        "switches devices or lacks high-speed data connectivity.",
        s['body']
    ))

    story.append(Paragraph("2.3 Drawbacks of Existing Systems", s['h2']))
    story.append(Paragraph("• <b>High Operational Latency:</b> Multi-step navigation menus prevent immediate panic triggers during crisis situations.", s['bullet']))
    story.append(Paragraph("• <b>Installation Barrier:</b> Both the victim and the guardian are often required to install the same proprietary mobile application to view shared locations.", s['bullet']))
    story.append(Paragraph("• <b>Battery & Privacy Drain:</b> Continuous background location polling rapidly exhausts mobile battery life and raises serious privacy concerns regarding location data harvesting.", s['bullet']))
    story.append(Paragraph("• <b>Lack of Multilingual Support:</b> Most applications are exclusively in English, rendering them inaccessible to regional or non-English-speaking demographics in emergencies.", s['bullet']))
    story.append(Paragraph("• <b>False Alarm Inflexibility:</b> Many existing tools immediately trigger non-cancelable police calls upon accidental touches, causing resource waste and user hesitation.", s['bullet']))

    story.append(Paragraph("2.4 Problem Statement", s['h2']))
    story.append(Paragraph(
        "<i>'How can we architect a lightweight, zero-install, multilingual emergency safety platform that allows an individual under critical duress to trigger an immediate, cancelable acoustic alarm, stream high-precision GPS coordinates, log the incident securely in a cloud database, and automatically dispatch SMS alerts to designated guardians in under three seconds?'</i>",
        s['body']
    ))

    story.append(Paragraph("2.5 Proposed Solution: SOSafe Platform", s['h2']))
    story.append(Paragraph(
        "SOSafe solves these challenges through an elegant, browser-native emergency platform. It features a high-visibility, TVK-inspired "
        "crimson and gold emergency button with a 3-second visual countdown and acoustic feedback. The platform directly interfaces with "
        "Supabase Cloud PostgreSQL via client-side SDKs, utilizing Row Level Security for bulletproof data isolation. It integrates an "
        "automated n8n cloud webhook workflow that parses JSON alert payloads and dispatches SMS notifications to pre-registered emergency "
        "contacts, embedding a universal web link to a real-time live map that guardians can open instantly on any device.",
        s['body']
    ))

    story.append(Paragraph("2.6 Comparison with Existing Systems", s['h2']))
    
    comp_data = [
        [Paragraph("<b>Feature / Metric</b>", s['table_header']), Paragraph("<b>Traditional Phone SOS</b>", s['table_header']), Paragraph("<b>Native Mobile Safety Apps</b>", s['table_header']), Paragraph("<b>SOSafe Platform (Proposed)</b>", s['table_header'])],
        [Paragraph("Installation Requirement", s['table_cell']), Paragraph("None (Phone Dialer)", s['table_cell']), Paragraph("Mandatory App Store Download", s['table_cell']), Paragraph("<b>Zero-Install Web Access</b>", s['table_cell'])],
        [Paragraph("Trigger Latency", s['table_cell']), Paragraph("15 – 45 seconds", s['table_cell']), Paragraph("8 – 20 seconds", s['table_cell']), Paragraph("<b>&lt; 3 seconds (One-Tap)</b>", s['table_cell'])],
        [Paragraph("Accidental Trigger Cancellation", s['table_cell']), Paragraph("Not Supported", s['table_cell']), Paragraph("Rare / Complex", s['table_cell']), Paragraph("<b>3-Second Interactive Abort Ring</b>", s['table_cell'])],
        [Paragraph("Acoustic Deterrence Siren", s['table_cell']), Paragraph("No", s['table_cell']), Paragraph("Optional / Audio File", s['table_cell']), Paragraph("<b>Built-in Dual-Freq Web Audio</b>", s['table_cell'])],
        [Paragraph("GPS Coordinate Sharing", s['table_cell']), Paragraph("Manual Verbal Description", s['table_cell']), Paragraph("In-App Only (Both Users)", s['table_cell']), Paragraph("<b>Universal Browser Map Link</b>", s['table_cell'])],
        [Paragraph("Telecom / SMS Dispatch", s['table_cell']), Paragraph("Manual SMS typing", s['table_cell']), Paragraph("Push Notifications Only", s['table_cell']), Paragraph("<b>Automated n8n Cloud SMS</b>", s['table_cell'])],
        [Paragraph("Language Accessibility", s['table_cell']), Paragraph("System default", s['table_cell']), Paragraph("English Only", s['table_cell']), Paragraph("<b>Trilingual (EN / TA / Tanglish)</b>", s['table_cell'])],
        [Paragraph("Database Security Model", s['table_cell']), Paragraph("N/A", s['table_cell']), Paragraph("Proprietary Central Server", s['table_cell']), Paragraph("<b>PostgreSQL 15 + RLS Policies</b>", s['table_cell'])]
    ]
    t_comp = Table(comp_data, colWidths=[95, 120, 130, 142])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#5D2D3E')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_comp)
    story.append(Paragraph("Table 2.1: Comprehensive Comparison between Existing Safety Solutions and SOSafe", s['caption']))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 3: EMPATHIZE AND DEFINE
    # =========================================================================
    story.append(Paragraph("CHAPTER 3", s['h2']))
    story.append(Paragraph("EMPATHIZE AND DEFINE", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#5D2D3E'), spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("3.1 Design Thinking Empathy Study", s['h2']))
    story.append(Paragraph(
        "To construct a user-centric safety system, an extensive empathy study was conducted across target demographic groups, "
        "including university students, female commuters, elderly citizens living alone, and commercial delivery riders. "
        "Empathy mapping revealed that emotional panic severely impairs cognitive and fine-motor abilities during crises. "
        "Users reported feeling paralyzed when faced with intricate confirmation dialogs or passwords in high-stress moments.",
        s['body']
    ))

    story.append(Paragraph("3.2 User Identification", s['h2']))
    story.append(Paragraph("• <b>Primary Users (Defenders):</b> Individuals navigating isolated streets, late-night transit, unfamiliar neighborhoods, or living with chronic medical vulnerabilities.", s['bullet']))
    story.append(Paragraph("• <b>Secondary Users (Guardians & First Responders):</b> Parents, spouses, trusted friends, campus security officers, and local safety hubs who receive emergency broadcasts.", s['bullet']))

    story.append(Paragraph("3.3 User Pain Points", s['h2']))
    story.append(Paragraph("1. <i>Fear of False Alarms:</i> Hesitation to press emergency buttons due to fear of triggering embarrassing or irreversible police alerts.", s['body']))
    story.append(Paragraph("2. <i>Coordinate Inaccuracy:</i> Inability to explain landmarks or street names when traveling in unfamiliar localities.", s['body']))
    story.append(Paragraph("3. <i>Guardian Technical Friction:</i> Guardians failing to see in-app notifications because they did not have the corresponding application installed or logged in.", s['body']))
    story.append(Paragraph("4. <i>Language Barriers:</i> Inability of non-English speakers to navigate safety configuration screens.", s['body']))

    story.append(Paragraph("3.4 User Persona: Kavitha (University Student / Late-Night Commuter)", s['h2']))
    story.append(Paragraph(
        "<b>Demographics:</b> 21-year-old engineering student residing in Chennai, commuting via public transit and walking through poorly lit suburban lanes after evening laboratory sessions.<br/>"
        "<b>Goals:</b> Wants an immediate way to inform her parents and hostel warden if she feels stalked or unsafe, without engaging in lengthy phone conversations.<br/>"
        "<b>Frustrations:</b> Finds existing safety apps confusing with too many buttons; worries about app crashes or battery depletion.<br/>"
        "<b>SOSafe Experience:</b> Bookmarks SOSafe on her mobile home screen; configured 3 trusted contacts; knows a single tap on the bold SOS button will instantly sound a loud siren and text her live GPS link to her family.",
        s['body']
    ))

    story.append(Paragraph("3.5 Refined Problem Definition", s['h2']))
    story.append(Paragraph(
        "<i>'Design a fail-safe, cross-platform web emergency hub that minimizes user cognitive overhead to a single click, guarantees 100% guardian alert deliverability via telecom SMS, and maintains continuous live location streaming until safety is restored.'</i>",
        s['body']
    ))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 4: IDEATION & CONCEPTUAL DESIGN
    # =========================================================================
    story.append(Paragraph("CHAPTER 4", s['h2']))
    story.append(Paragraph("IDEATION & CONCEPTUAL DESIGN", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#5D2D3E'), spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("4.1 Idea Generation & Brainstorming", s['h2']))
    story.append(Paragraph(
        "During the ideation phase, various architectural concepts were explored, including voice-activated panic triggers, "
        "Bluetooth wearable beacons, AI camera gesture recognition, and web-based emergency stations. Evaluation criteria "
        "prioritized zero latency, reliability on low-bandwidth networks, cross-device compatibility, and privacy compliance.",
        s['body']
    ))

    story.append(Paragraph("4.2 Evaluation of Concepts", s['h2']))
    story.append(Paragraph("• <i>Concept A (Voice Triggered AI):</i> Rejected due to high ambient noise false-positives and processing lag.", s['bullet']))
    story.append(Paragraph("• <i>Concept B (Hardware Bluetooth Dongle):</i> Rejected due to hardware manufacturing costs and battery dependency.", s['bullet']))
    story.append(Paragraph("• <i>Concept C (Progressive Web Safety Station with n8n Automation):</i> <b>Selected</b> due to universal accessibility, zero installation barrier, instant response time, and robust cloud PostgreSQL security.", s['bullet']))

    story.append(Paragraph("4.3 Key Features Identified for Final Concept", s['h2']))
    story.append(Paragraph("1. <b>Bold Floating SOS Station:</b> Prominent, pulsating emergency trigger with SVG circular countdown progress animation.", s['body']))
    story.append(Paragraph("2. <b>Synthesized Web Siren:</b> Client-side oscillator generating alerting audio tones without external audio file loading.", s['body']))
    story.append(Paragraph("3. <b>Enforced Guardian Circle:</b> Database constraint enforcing at least 2 and at most 4 emergency contacts per registered user.", s['body']))
    story.append(Paragraph("4. <b>Asynchronous n8n Webhook Pipeline:</b> Decoupled cloud automation routing JSON emergency events to telecom SMS providers.", s['body']))
    story.append(Paragraph("5. <b>Live MapTiler GPS Beacon:</b> Dynamic web-based map streaming real-time victim coordinates with sub-10m precision.", s['body']))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 5: REQUIREMENTS ANALYSIS
    # =========================================================================
    story.append(Paragraph("CHAPTER 5", s['h2']))
    story.append(Paragraph("REQUIREMENTS ANALYSIS", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#5D2D3E'), spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("5.1 Functional Requirements", s['h2']))
    
    fr_data = [
        [Paragraph("<b>Req ID</b>", s['table_header']), Paragraph("<b>Requirement Category</b>", s['table_header']), Paragraph("<b>Detailed Specification</b>", s['table_header'])],
        [Paragraph("FR-01", s['table_cell']), Paragraph("User Authentication", s['table_cell']), Paragraph("Users must be able to register, sign in, and persist session tokens securely via Supabase Auth JWT.", s['table_cell'])],
        [Paragraph("FR-02", s['table_cell']), Paragraph("Profile Management", s['table_cell']), Paragraph("System must maintain user full name, email, phone number, and optional avatar in the public.profiles table.", s['table_cell'])],
        [Paragraph("FR-03", s['table_cell']), Paragraph("Contact Circle Management", s['table_cell']), Paragraph("System must allow users to add, edit, and delete trusted contacts (minimum 2, maximum 4 enforced via trigger).", s['table_cell'])],
        [Paragraph("FR-04", s['table_cell']), Paragraph("Emergency SOS Trigger", s['table_cell']), Paragraph("Clicking the SOS button must initiate a 3-second visual countdown with an instant cancel option.", s['table_cell'])],
        [Paragraph("FR-05", s['table_cell']), Paragraph("Audio Siren Generation", s['table_cell']), Paragraph("System must synthesize alternating dual-frequency (880Hz / 950Hz) siren audio via Web Audio API.", s['table_cell'])],
        [Paragraph("FR-06", s['table_cell']), Paragraph("GPS Telemetry Capture", s['table_cell']), Paragraph("Platform must capture browser W3C Geolocation coordinates (latitude, longitude, accuracy) upon alert.", s['table_cell'])],
        [Paragraph("FR-07", s['table_cell']), Paragraph("Database Alert Logging", s['table_cell']), Paragraph("Platform must insert emergency event records into public.emergency_alerts with timestamp and user_id.", s['table_cell'])],
        [Paragraph("FR-08", s['table_cell']), Paragraph("n8n Webhook Dispatch", s['table_cell']), Paragraph("System must dispatch an HTTP POST request with user_id payload to the configured n8n webhook URL.", s['table_cell'])],
        [Paragraph("FR-09", s['table_cell']), Paragraph("Live Tracking Streaming", s['table_cell']), Paragraph("Platform must create shareable live location sessions on MapTiler maps accessible via unique session URLs.", s['table_cell'])],
        [Paragraph("FR-10", s['table_cell']), Paragraph("Multilingual Localization", s['table_cell']), Paragraph("UI must dynamically switch between English, Tamil, and Tanglish without requiring page reloads.", s['table_cell'])]
    ]
    t_fr = Table(fr_data, colWidths=[55, 120, 312])
    t_fr.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#5D2D3E')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_fr)
    story.append(Paragraph("Table 5.1: Functional Requirements Specification for SOSafe", s['caption']))

    story.append(Paragraph("5.2 Non-Functional Requirements", s['h2']))
    
    nfr_data = [
        [Paragraph("<b>Attribute</b>", s['table_header']), Paragraph("<b>Performance Standard / Benchmark</b>", s['table_header'])],
        [Paragraph("Latency & Response Time", s['table_cell']), Paragraph("SOS trigger to cloud webhook dispatch must execute in &lt; 800 milliseconds.", s['table_cell'])],
        [Paragraph("Availability & Reliability", s['table_cell']), Paragraph("99.9% uptime powered by Supabase Cloud and distributed edge content delivery.", s['table_cell'])],
        [Paragraph("Security & Privacy", s['table_cell']), Paragraph("All database queries protected by PostgreSQL Row Level Security; passwords hashed with bcrypt.", s['table_cell'])],
        [Paragraph("Cross-Platform Usability", s['table_cell']), Paragraph("Fully responsive layout supporting mobile screens (320px) up to 4K ultra-wide monitors.", s['table_cell'])],
        [Paragraph("Accessibility", s['table_cell']), Paragraph("High visual contrast ratio (4.5:1 minimum) and ARIA accessibility tags on interactive controls.", s['table_cell'])]
    ]
    t_nfr = Table(nfr_data, colWidths=[120, 367])
    t_nfr.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#5D2D3E')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_nfr)
    story.append(Paragraph("Table 5.2: Non-Functional Requirements Specification", s['caption']))

    story.append(Paragraph("5.3 Hardware and Software Specifications", s['h2']))
    
    hw_data = [
        [Paragraph("<b>Hardware Component</b>", s['table_header']), Paragraph("<b>Minimum Specification</b>", s['table_header']), Paragraph("<b>Recommended Specification</b>", s['table_header'])],
        [Paragraph("Client Device Processor", s['table_cell']), Paragraph("Dual-core 1.2 GHz ARM / x86", s['table_cell']), Paragraph("Quad-core 2.0 GHz or higher", s['table_cell'])],
        [Paragraph("Client Device RAM", s['table_cell']), Paragraph("1 GB System Memory", s['table_cell']), Paragraph("3 GB+ LPDDR4 Memory", s['table_cell'])],
        [Paragraph("Network Connectivity", s['table_cell']), Paragraph("2G / 3G Mobile Data (64 kbps)", s['table_cell']), Paragraph("4G / 5G / Wi-Fi (1 Mbps+)", s['table_cell'])],
        [Paragraph("GPS Location Sensor", s['table_cell']), Paragraph("Standard Assisted GPS (A-GPS)", s['table_cell']), Paragraph("Multi-constellation GPS / GLONASS", s['table_cell'])]
    ]
    t_hw = Table(hw_data, colWidths=[120, 180, 187])
    t_hw.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#5D2D3E')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_hw)
    story.append(Paragraph("Table 5.3: Hardware Infrastructure Requirements", s['caption']))

    story.append(PageBreak())
