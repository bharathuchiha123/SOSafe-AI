# -*- coding: utf-8 -*-
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
from reportlab.lib import colors

def add_preliminary_pages(story, s):
    # =========================================================================
    # MANDATORY CONSTRAINT: PAGES 1 & 2 ARE STRICTLY RESERVED BLANK FOR THE USER
    # =========================================================================
    story.append(Spacer(1, 10))
    story.append(PageBreak())
    story.append(Spacer(1, 10))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: ABSTRACT
    # =========================================================================
    story.append(Paragraph("ABSTRACT", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0F172A'), spaceBefore=2, spaceAfter=8))

    story.append(Paragraph(
        "Personal security, emergency distress signalling, and rapid communication have become critical societal imperatives "
        "in modern urban and travel environments. Traditional emergency reporting workflows often suffer from critical latency "
        "due to manual dialing, locked device constraints, poor network connectivity, linguistic barriers, and complex multi-step "
        "user interfaces. In sudden critical situations—such as physical harassment, medical emergencies, vehicle accidents, or "
        "isolated transit perils—victims require an instantaneous, foolproof, and automated mechanism to broadcast their high-precision "
        "coordinates and dispatch emergency notifications to trusted guardians.",
        s['body']
    ))

    story.append(Paragraph(
        "This project presents <b>SOSafe</b>, a cloud-native, AI-assisted personal safety and emergency response web platform designed "
        "to deliver rapid, one-tap emergency activation and multi-channel guardian alerting. The system is architected using modern web "
        "technologies (HTML5, Vanilla JavaScript ES6+, CSS3) integrated with <b>Supabase Cloud PostgreSQL 15</b> for secure user authentication, "
        "Row-Level Security (RLS) policies, and live session management. Upon triggering the prominent SOS emergency interface, the system "
        "executes an instantaneous safety sequence accompanied by a dual-frequency synthesized audio siren (Web Audio API). "
        "Simultaneously, the platform captures high-precision coordinates using the W3C Geolocation API, logs the alert in Supabase, and "
        "dispatches an automated HTTP POST webhook payload to an <b>n8n workflow automation engine</b> for immediate SMS routing via Twilio to "
        "pre-configured emergency contacts.",
        s['body']
    ))

    story.append(Paragraph(
        "Furthermore, SOSafe incorporates an interactive real-time GPS telemetry broadcast module powered by Leaflet and OpenStreetMap, "
        "allowing guardians to track the victim's live location without requiring third-party native app installations. The user interface "
        "provides client-side trilingual localization supporting English, Tamil (தமிழ்), and Hindi (हिन्दी). Comprehensive unit, integration, "
        "and latency testing confirm an emergency dispatch time of under 450 milliseconds, proving SOSafe to be an indispensable, robust, "
        "and accessible personal safety ecosystem.",
        s['body']
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<b>Keywords:</b> Personal Safety System, Emergency SOS Dispatch, Supabase Cloud, PostgreSQL Row-Level Security, "
        "n8n Workflow Automation, Twilio Telephony Gateway, W3C Geolocation API, Web Audio Siren, Trilingual Localization.",
        s['body']
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGES 4 & 5: TABLE OF CONTENTS
    # =========================================================================
    story.append(Paragraph("TABLE OF CONTENTS", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0F172A'), spaceBefore=2, spaceAfter=8))

    toc_data = [
        [Paragraph("<b>Chapter / Section</b>", s['table_header']),
         Paragraph("<b>Title / Topic Description</b>", s['table_header']),
         Paragraph("<b>Page No.</b>", s['table_header'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>ABSTRACT</b>", s['table_cell']), Paragraph("<b>3</b>", s['table_cell'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>LIST OF TABLES</b>", s['table_cell']), Paragraph("<b>6</b>", s['table_cell'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>LIST OF FIGURES</b>", s['table_cell']), Paragraph("<b>6</b>", s['table_cell'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>LIST OF SYMBOLS AND ABBREVIATIONS</b>", s['table_cell']), Paragraph("<b>7</b>", s['table_cell'])],
        [Paragraph("<b>1</b>", s['table_cell']), Paragraph("<b>INTRODUCTION</b>", s['table_cell']), Paragraph("<b>8</b>", s['table_cell'])],
        [Paragraph("1.1", s['table_cell']), Paragraph("Background of the Study", s['table_cell']), Paragraph("8", s['table_cell'])],
        [Paragraph("1.2", s['table_cell']), Paragraph("Project Overview", s['table_cell']), Paragraph("8", s['table_cell'])],
        [Paragraph("1.3", s['table_cell']), Paragraph("Motivation and Need for the System", s['table_cell']), Paragraph("8", s['table_cell'])],
        [Paragraph("1.4", s['table_cell']), Paragraph("Objectives of the Project", s['table_cell']), Paragraph("8", s['table_cell'])],
        [Paragraph("1.5", s['table_cell']), Paragraph("Scope of the Project", s['table_cell']), Paragraph("9", s['table_cell'])],
        [Paragraph("<b>2</b>", s['table_cell']), Paragraph("<b>PROBLEM IDENTIFICATION</b>", s['table_cell']), Paragraph("<b>10</b>", s['table_cell'])],
        [Paragraph("2.1", s['table_cell']), Paragraph("Existing Scenario & Crime Dynamics", s['table_cell']), Paragraph("10", s['table_cell'])],
        [Paragraph("2.2", s['table_cell']), Paragraph("Problem Statement & Formulation", s['table_cell']), Paragraph("10", s['table_cell'])],
        [Paragraph("2.3", s['table_cell']), Paragraph("Challenges & Gaps in Current Solutions", s['table_cell']), Paragraph("10", s['table_cell'])],
        [Paragraph("2.4", s['table_cell']), Paragraph("Target Audience & Stakeholder Profile", s['table_cell']), Paragraph("10", s['table_cell'])],
        [Paragraph("2.5", s['table_cell']), Paragraph("Proposed Solution Overview", s['table_cell']), Paragraph("10", s['table_cell'])],
        [Paragraph("2.6", s['table_cell']), Paragraph("Comparison with Existing Safety Systems", s['table_cell']), Paragraph("11", s['table_cell'])],
        [Paragraph("<b>3</b>", s['table_cell']), Paragraph("<b>EMPATHIZE AND DEFINE</b>", s['table_cell']), Paragraph("<b>12</b>", s['table_cell'])],
        [Paragraph("3.1", s['table_cell']), Paragraph("Design Thinking Empathy Study", s['table_cell']), Paragraph("12", s['table_cell'])],
        [Paragraph("3.2", s['table_cell']), Paragraph("User Personas & Pain Points", s['table_cell']), Paragraph("12", s['table_cell'])],
        [Paragraph("3.3", s['table_cell']), Paragraph("Empathy Mapping Matrix", s['table_cell']), Paragraph("12", s['table_cell'])],
        [Paragraph("3.4", s['table_cell']), Paragraph("Point-of-View (POV) Problem Framework", s['table_cell']), Paragraph("12", s['table_cell'])],
        [Paragraph("<b>4</b>", s['table_cell']), Paragraph("<b>IDEATION & CONCEPTUAL DESIGN</b>", s['table_cell']), Paragraph("<b>13</b>", s['table_cell'])],
        [Paragraph("4.1", s['table_cell']), Paragraph("Idea Generation & Brainstorming", s['table_cell']), Paragraph("13", s['table_cell'])],
        [Paragraph("4.2", s['table_cell']), Paragraph("Concept Evaluation & Feasibility Matrix", s['table_cell']), Paragraph("13", s['table_cell'])],
        [Paragraph("4.3", s['table_cell']), Paragraph("Architecture Selection & Technical Strategy", s['table_cell']), Paragraph("13", s['table_cell'])],
        [Paragraph("<b>5</b>", s['table_cell']), Paragraph("<b>REQUIREMENTS ANALYSIS</b>", s['table_cell']), Paragraph("<b>14</b>", s['table_cell'])],
        [Paragraph("5.1", s['table_cell']), Paragraph("Functional Requirements", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("5.2", s['table_cell']), Paragraph("Non-Functional Requirements", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("5.3", s['table_cell']), Paragraph("Hardware & Environmental Specifications", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("5.4", s['table_cell']), Paragraph("Software Requirements", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("<b>6</b>", s['table_cell']), Paragraph("<b>TECHNOLOGY STACK AND TOOLS SELECTION</b>", s['table_cell']), Paragraph("<b>15</b>", s['table_cell'])],
        [Paragraph("6.1", s['table_cell']), Paragraph("Architecture Selection Rationale", s['table_cell']), Paragraph("15", s['table_cell'])],
        [Paragraph("6.2", s['table_cell']), Paragraph("Frontend Layer: Responsive Web & Browser APIs", s['table_cell']), Paragraph("15", s['table_cell'])],
        [Paragraph("6.3", s['table_cell']), Paragraph("Backend-as-a-Service: Supabase & PostgreSQL", s['table_cell']), Paragraph("15", s['table_cell'])],
        [Paragraph("6.4", s['table_cell']), Paragraph("Automation & Notification: n8n & Twilio", s['table_cell']), Paragraph("15", s['table_cell'])],
        [Paragraph("<b>7</b>", s['table_cell']), Paragraph("<b>SYSTEM DESIGN AND ARCHITECTURE</b>", s['table_cell']), Paragraph("<b>17</b>", s['table_cell'])],
        [Paragraph("7.1", s['table_cell']), Paragraph("Overall System Architecture", s['table_cell']), Paragraph("17", s['table_cell'])],
        [Paragraph("7.2", s['table_cell']), Paragraph("End-to-End Emergency Workflow", s['table_cell']), Paragraph("17", s['table_cell'])],
        [Paragraph("7.3", s['table_cell']), Paragraph("Data Flow Diagrams (DFD Level 0 & Level 1)", s['table_cell']), Paragraph("19", s['table_cell'])],
        [Paragraph("7.4", s['table_cell']), Paragraph("Use Case Diagram & Actor Analysis", s['table_cell']), Paragraph("19", s['table_cell'])],
        [Paragraph("<b>8</b>", s['table_cell']), Paragraph("<b>DATABASE DESIGN AND DATA MODELING</b>", s['table_cell']), Paragraph("<b>21</b>", s['table_cell'])],
        [Paragraph("8.1", s['table_cell']), Paragraph("Entity Relationship (ER) Model", s['table_cell']), Paragraph("21", s['table_cell'])],
        [Paragraph("8.2", s['table_cell']), Paragraph("Database Tables Data Dictionaries", s['table_cell']), Paragraph("21", s['table_cell'])],
        [Paragraph("8.3", s['table_cell']), Paragraph("Row-Level Security (RLS) Policy Implementation", s['table_cell']), Paragraph("23", s['table_cell'])],
        [Paragraph("<b>9</b>", s['table_cell']), Paragraph("<b>DETAILED MODULE DESCRIPTION</b>", s['table_cell']), Paragraph("<b>24</b>", s['table_cell'])],
        [Paragraph("9.1", s['table_cell']), Paragraph("Authentication and Session Management Module", s['table_cell']), Paragraph("24", s['table_cell'])],
        [Paragraph("9.2", s['table_cell']), Paragraph("Emergency Profile & Medical Details Module", s['table_cell']), Paragraph("24", s['table_cell'])],
        [Paragraph("9.3", s['table_cell']), Paragraph("Trusted Emergency Contacts Module", s['table_cell']), Paragraph("24", s['table_cell'])],
        [Paragraph("9.4", s['table_cell']), Paragraph("One-Touch SOS Dispatch & Siren Alert Module", s['table_cell']), Paragraph("24", s['table_cell'])],
        [Paragraph("9.5", s['table_cell']), Paragraph("Real-Time Geolocation Tracking & Session Engine", s['table_cell']), Paragraph("24", s['table_cell'])],
        [Paragraph("9.6", s['table_cell']), Paragraph("n8n Multi-Channel Orchestrator Module", s['table_cell']), Paragraph("24", s['table_cell'])],
        [Paragraph("9.7", s['table_cell']), Paragraph("Trilingual Localization Engine", s['table_cell']), Paragraph("25", s['table_cell'])],
        [Paragraph("<b>10</b>", s['table_cell']), Paragraph("<b>IMPLEMENTATION AND CODE FLOW</b>", s['table_cell']), Paragraph("<b>26</b>", s['table_cell'])],
        [Paragraph("10.1", s['table_cell']), Paragraph("SOS Dispatch Execution Flow", s['table_cell']), Paragraph("26", s['table_cell'])],
        [Paragraph("10.2", s['table_cell']), Paragraph("Robust Error Handling and Fault Tolerance", s['table_cell']), Paragraph("26", s['table_cell'])],
        [Paragraph("<b>11</b>", s['table_cell']), Paragraph("<b>TESTING AND QUALITY ASSURANCE</b>", s['table_cell']), Paragraph("<b>27</b>", s['table_cell'])],
        [Paragraph("11.1", s['table_cell']), Paragraph("Comprehensive Test Strategy & Matrix", s['table_cell']), Paragraph("27", s['table_cell'])],
        [Paragraph("<b>12</b>", s['table_cell']), Paragraph("<b>RESULTS AND PERFORMANCE EVALUATION</b>", s['table_cell']), Paragraph("<b>28</b>", s['table_cell'])],
        [Paragraph("12.1", s['table_cell']), Paragraph("Performance Metrics & Benchmark Analysis", s['table_cell']), Paragraph("28", s['table_cell'])],
        [Paragraph("12.2", s['table_cell']), Paragraph("Real-World Operational Evaluation", s['table_cell']), Paragraph("28", s['table_cell'])],
        [Paragraph("<b>13</b>", s['table_cell']), Paragraph("<b>CONCLUSION AND FUTURE ENHANCEMENTS</b>", s['table_cell']), Paragraph("<b>29</b>", s['table_cell'])],
        [Paragraph("13.1", s['table_cell']), Paragraph("Project Summary and Key Achievements", s['table_cell']), Paragraph("29", s['table_cell'])],
        [Paragraph("13.2", s['table_cell']), Paragraph("Future Research and Technical Roadmap", s['table_cell']), Paragraph("29", s['table_cell'])],
        [Paragraph("<b>14</b>", s['table_cell']), Paragraph("<b>DEPLOYMENT AND ACCESS</b>", s['table_cell']), Paragraph("<b>30</b>", s['table_cell'])],
        [Paragraph("14.1", s['table_cell']), Paragraph("Production Hosting and Deployment Architecture", s['table_cell']), Paragraph("30", s['table_cell'])],
        [Paragraph("14.2", s['table_cell']), Paragraph("Live Project Access and QR Code", s['table_cell']), Paragraph("30", s['table_cell'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>APPENDIX I: SYSTEM SCREENSHOTS & UI</b>", s['table_cell']), Paragraph("<b>31</b>", s['table_cell'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>APPENDIX II: CORE SOURCE CODE SNIPPETS</b>", s['table_cell']), Paragraph("<b>35</b>", s['table_cell'])],
        [Paragraph("<b>-</b>", s['table_cell']), Paragraph("<b>REFERENCES</b>", s['table_cell']), Paragraph("<b>36</b>", s['table_cell'])]
    ]

    t_toc = Table(toc_data, colWidths=[1.1*50, 4.3*72, 0.7*72])
    t_toc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_toc)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 6: LIST OF TABLES & LIST OF FIGURES
    # =========================================================================
    story.append(Paragraph("LIST OF TABLES", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0F172A'), spaceBefore=2, spaceAfter=6))

    lot_data = [
        [Paragraph("<b>Table No.</b>", s['table_header']),
         Paragraph("<b>Table Caption / Title</b>", s['table_header']),
         Paragraph("<b>Page No.</b>", s['table_header'])],
        [Paragraph("Table 2.1", s['table_cell']), Paragraph("Comparative Analysis: SOSafe vs Traditional Systems", s['table_cell']), Paragraph("11", s['table_cell'])],
        [Paragraph("Table 5.1", s['table_cell']), Paragraph("Functional Requirements Specification Matrix", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("Table 5.2", s['table_cell']), Paragraph("Non-Functional Performance & Reliability Matrix", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("Table 5.3", s['table_cell']), Paragraph("Hardware & Environmental Operational Criteria", s['table_cell']), Paragraph("14", s['table_cell'])],
        [Paragraph("Table 6.1", s['table_cell']), Paragraph("Comprehensive Technology Stack Matrix", s['table_cell']), Paragraph("16", s['table_cell'])],
        [Paragraph("Table 8.1", s['table_cell']), Paragraph("Data Dictionary for `profiles` Table", s['table_cell']), Paragraph("22", s['table_cell'])],
        [Paragraph("Table 8.2", s['table_cell']), Paragraph("Data Dictionary for `emergency_contacts` Table", s['table_cell']), Paragraph("22", s['table_cell'])],
        [Paragraph("Table 8.3", s['table_cell']), Paragraph("Data Dictionary for `live_location_sessions` Table", s['table_cell']), Paragraph("23", s['table_cell'])],
        [Paragraph("Table 8.4", s['table_cell']), Paragraph("Data Dictionary for `emergency_alerts` Table", s['table_cell']), Paragraph("23", s['table_cell'])],
        [Paragraph("Table 11.1", s['table_cell']), Paragraph("Comprehensive Test Cases Execution and Verification Matrix", s['table_cell']), Paragraph("27", s['table_cell'])],
        [Paragraph("Table 12.1", s['table_cell']), Paragraph("Performance Benchmark and Evaluation Metrics", s['table_cell']), Paragraph("28", s['table_cell'])]
    ]

    t_lot = Table(lot_data, colWidths=[1.1*50, 4.3*72, 0.7*72])
    t_lot.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_lot)
    story.append(Spacer(1, 10))

    story.append(Paragraph("LIST OF FIGURES", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0F172A'), spaceBefore=2, spaceAfter=6))

    lof_data = [
        [Paragraph("<b>Figure No.</b>", s['table_header']),
         Paragraph("<b>Figure Caption / Title</b>", s['table_header']),
         Paragraph("<b>Page No.</b>", s['table_header'])],
        [Paragraph("Figure 7.1", s['table_cell']), Paragraph("SOSafe Multi-Tier Cloud & Edge System Architecture", s['table_cell']), Paragraph("17", s['table_cell'])],
        [Paragraph("Figure 7.2", s['table_cell']), Paragraph("End-to-End Emergency Alert & Notification Workflow", s['table_cell']), Paragraph("18", s['table_cell'])],
        [Paragraph("Figure 7.3", s['table_cell']), Paragraph("Data Flow Diagram (DFD Level 0 & Level 1 Decomposition)", s['table_cell']), Paragraph("19", s['table_cell'])],
        [Paragraph("Figure 7.4", s['table_cell']), Paragraph("UML Use Case Diagram for User and System Interactions", s['table_cell']), Paragraph("20", s['table_cell'])],
        [Paragraph("Figure 8.1", s['table_cell']), Paragraph("Entity Relationship (ER) Diagram with Cardinality", s['table_cell']), Paragraph("21", s['table_cell'])],
        [Paragraph("Figure 14.1", s['table_cell']), Paragraph("Direct Access QR Code for SOSafe Live Application", s['table_cell']), Paragraph("30", s['table_cell'])],
        [Paragraph("Figure A.1", s['table_cell']), Paragraph("User Authentication & Sign-in Interface (login.html)", s['table_cell']), Paragraph("31", s['table_cell'])],
        [Paragraph("Figure A.2", s['table_cell']), Paragraph("Primary Emergency Dashboard with SOS Dispatch (dashboard.html)", s['table_cell']), Paragraph("32", s['table_cell'])],
        [Paragraph("Figure A.3", s['table_cell']), Paragraph("Emergency Contacts Configuration Interface (contacts.html)", s['table_cell']), Paragraph("33", s['table_cell'])],
        [Paragraph("Figure A.4", s['table_cell']), Paragraph("Emergency Profile & Medical Details Form (profile.html)", s['table_cell']), Paragraph("33", s['table_cell'])],
        [Paragraph("Figure A.5", s['table_cell']), Paragraph("Real-Time GPS Tracking & Map Navigation (location.html)", s['table_cell']), Paragraph("34", s['table_cell'])]
    ]

    t_lof = Table(lof_data, colWidths=[1.1*50, 4.3*72, 0.7*72])
    t_lof.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_lof)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 7: LIST OF SYMBOLS AND ABBREVIATIONS
    # =========================================================================
    story.append(Paragraph("LIST OF SYMBOLS AND ABBREVIATIONS", s['h1']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0F172A'), spaceBefore=2, spaceAfter=8))

    abbrev_data = [
        [Paragraph("<b>Abbreviation</b>", s['table_header']),
         Paragraph("<b>Full Expansion / Description</b>", s['table_header']),
         Paragraph("<b>Domain Context</b>", s['table_header'])],
        [Paragraph("API", s['table_cell']), Paragraph("Application Programming Interface", s['table_cell']), Paragraph("Software Architecture", s['table_cell'])],
        [Paragraph("BaaS", s['table_cell']), Paragraph("Backend-as-a-Service", s['table_cell']), Paragraph("Cloud Infrastructure", s['table_cell'])],
        [Paragraph("CAD", s['table_cell']), Paragraph("Computer-Aided Dispatch", s['table_cell']), Paragraph("Emergency Services", s['table_cell'])],
        [Paragraph("CDN", s['table_cell']), Paragraph("Content Delivery Network", s['table_cell']), Paragraph("Web Performance", s['table_cell'])],
        [Paragraph("CORS", s['table_cell']), Paragraph("Cross-Origin Resource Sharing", s['table_cell']), Paragraph("Web Security", s['table_cell'])],
        [Paragraph("CSS", s['table_cell']), Paragraph("Cascading Style Sheets", s['table_cell']), Paragraph("Frontend Design", s['table_cell'])],
        [Paragraph("DFD", s['table_cell']), Paragraph("Data Flow Diagram", s['table_cell']), Paragraph("System Modeling", s['table_cell'])],
        [Paragraph("DOM", s['table_cell']), Paragraph("Document Object Model", s['table_cell']), Paragraph("Browser Runtime", s['table_cell'])],
        [Paragraph("ERD", s['table_cell']), Paragraph("Entity Relationship Diagram", s['table_cell']), Paragraph("Database Design", s['table_cell'])],
        [Paragraph("ES6", s['table_cell']), Paragraph("ECMAScript 2015 (Modern JavaScript Standard)", s['table_cell']), Paragraph("Programming Language", s['table_cell'])],
        [Paragraph("GPS", s['table_cell']), Paragraph("Global Positioning System", s['table_cell']), Paragraph("Geospatial Telemetry", s['table_cell'])],
        [Paragraph("HTML", s['table_cell']), Paragraph("HyperText Markup Language", s['table_cell']), Paragraph("Web Structure", s['table_cell'])],
        [Paragraph("HTTP", s['table_cell']), Paragraph("Hypertext Transfer Protocol", s['table_cell']), Paragraph("Networking", s['table_cell'])],
        [Paragraph("HTTPS", s['table_cell']), Paragraph("Hypertext Transfer Protocol Secure (SSL/TLS)", s['table_cell']), Paragraph("Network Security", s['table_cell'])],
        [Paragraph("IoT", s['table_cell']), Paragraph("Internet of Things", s['table_cell']), Paragraph("Hardware & Sensors", s['table_cell'])],
        [Paragraph("JSON", s['table_cell']), Paragraph("JavaScript Object Notation", s['table_cell']), Paragraph("Data Interchange", s['table_cell'])],
        [Paragraph("JWT", s['table_cell']), Paragraph("JSON Web Token", s['table_cell']), Paragraph("Authentication", s['table_cell'])],
        [Paragraph("NCRB", s['table_cell']), Paragraph("National Crime Records Bureau", s['table_cell']), Paragraph("Statistical Domain", s['table_cell'])],
        [Paragraph("PWA", s['table_cell']), Paragraph("Progressive Web Application", s['table_cell']), Paragraph("Mobile Web", s['table_cell'])],
        [Paragraph("RLS", s['table_cell']), Paragraph("Row-Level Security", s['table_cell']), Paragraph("PostgreSQL Security", s['table_cell'])],
        [Paragraph("SMS", s['table_cell']), Paragraph("Short Message Service", s['table_cell']), Paragraph("Telecommunications", s['table_cell'])],
        [Paragraph("SOS", s['table_cell']), Paragraph("International Distress Signal", s['table_cell']), Paragraph("Emergency Safety", s['table_cell'])],
        [Paragraph("SQL", s['table_cell']), Paragraph("Structured Query Language", s['table_cell']), Paragraph("Database Management", s['table_cell'])],
        [Paragraph("TTFB", s['table_cell']), Paragraph("Time to First Byte", s['table_cell']), Paragraph("Network Latency", s['table_cell'])],
        [Paragraph("UI / UX", s['table_cell']), Paragraph("User Interface / User Experience", s['table_cell']), Paragraph("Human-Computer Interaction", s['table_cell'])],
        [Paragraph("UML", s['table_cell']), Paragraph("Unified Modeling Language", s['table_cell']), Paragraph("Software Engineering", s['table_cell'])],
        [Paragraph("UUID", s['table_cell']), Paragraph("Universally Unique Identifier", s['table_cell']), Paragraph("Database Keys", s['table_cell'])],
        [Paragraph("W3C", s['table_cell']), Paragraph("World Wide Web Consortium", s['table_cell']), Paragraph("Web Standards", s['table_cell'])],
        [Paragraph("WGS84", s['table_cell']), Paragraph("World Geodetic System 1984", s['table_cell']), Paragraph("Coordinate Standard", s['table_cell'])],
        [Paragraph("WHO", s['table_cell']), Paragraph("World Health Organization", s['table_cell']), Paragraph("Global Health Data", s['table_cell'])]
    ]

    t_abbrev = Table(abbrev_data, colWidths=[1.1*50, 4.1*72, 0.9*72])
    t_abbrev.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_abbrev)
    story.append(PageBreak())
