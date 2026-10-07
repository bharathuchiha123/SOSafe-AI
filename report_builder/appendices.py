# -*- coding: utf-8 -*-
import os
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether
from reportlab.lib import colors
from reportlab.lib.units import inch

def get_appendices_and_references_story(styles, assets_dir):
    story = []
    
    # ---------------------------------------------------------
    # APPENDIX I: SYSTEM SCREENSHOTS & USER INTERFACE
    # ---------------------------------------------------------
    story.append(Paragraph("APPENDIX I", styles['h1']))
    story.append(Paragraph("SYSTEM SCREENSHOTS AND USER INTERFACE", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph(
        "This appendix documents the primary user interfaces and workflow views captured during operational deployment of the SOSafe system.",
        styles['body']
    ))
    
    # Screenshot 1: Login
    img_login = os.path.join(assets_dir, "media_1787816289183.png")
    if os.path.exists(img_login):
        story.append(KeepTogether([
            Image(img_login, width=3.2*inch, height=4.5*inch),
            Paragraph("Figure A.1: SOSafe User Authentication & Sign-in Interface (login.html)", styles['caption'])
        ]))
    story.append(Spacer(1, 0.08 * inch))
    
    # Screenshot 2: Dashboard
    img_dash = os.path.join(assets_dir, "media_1789748058973.png")
    if os.path.exists(img_dash):
        story.append(KeepTogether([
            Image(img_dash, width=5.5*inch, height=3.5*inch),
            Paragraph("Figure A.2: Primary Emergency Dashboard with One-Touch SOS Dispatch (dashboard.html)", styles['caption'])
        ]))
    story.append(PageBreak())
    
    # Screenshot 3: Contacts
    img_contacts = os.path.join(assets_dir, "media_1790090802057.png")
    if os.path.exists(img_contacts):
        story.append(KeepTogether([
            Image(img_contacts, width=5.5*inch, height=3.5*inch),
            Paragraph("Figure A.3: Emergency Contacts Configuration & Status Verification Interface (contacts.html)", styles['caption'])
        ]))
    story.append(Spacer(1, 0.08 * inch))
    
    # Screenshot 4: Profile
    img_profile = os.path.join(assets_dir, "media_1790091466420.png")
    if os.path.exists(img_profile):
        story.append(KeepTogether([
            Image(img_profile, width=5.5*inch, height=3.5*inch),
            Paragraph("Figure A.4: Emergency Profile & Medical Details Record Management (profile.html)", styles['caption'])
        ]))
    story.append(Spacer(1, 0.08 * inch))
    
    # Screenshot 5: Live Location
    img_loc = os.path.join(assets_dir, "media_1787850445264.png")
    if os.path.exists(img_loc):
        story.append(KeepTogether([
            Image(img_loc, width=5.5*inch, height=3.5*inch),
            Paragraph("Figure A.5: Real-Time GPS Geolocation Tracking & Map Navigation Interface (location.html)", styles['caption'])
        ]))
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # APPENDIX II: CORE SOURCE CODE SNIPPETS
    # ---------------------------------------------------------
    story.append(Paragraph("APPENDIX II", styles['h1']))
    story.append(Paragraph("CORE SOURCE CODE SNIPPETS", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("A2.1 Database Schema & Row-Level Security Policies (schema.sql)", styles['h2']))
    sql_snippet = (
        "-- 1. Create Profiles Table with Medical Notes<br/>"
        "CREATE TABLE public.profiles (<br/>"
        "&nbsp;&nbsp;id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,<br/>"
        "&nbsp;&nbsp;full_name VARCHAR(255) NOT NULL,<br/>"
        "&nbsp;&nbsp;phone_number VARCHAR(20) NOT NULL,<br/>"
        "&nbsp;&nbsp;blood_group VARCHAR(10),<br/>"
        "&nbsp;&nbsp;medical_notes TEXT,<br/>"
        "&nbsp;&nbsp;created_at TIMESTAMPTZ DEFAULT NOW(),<br/>"
        "&nbsp;&nbsp;updated_at TIMESTAMPTZ DEFAULT NOW()<br/>"
        ");<br/>"
        "ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;<br/>"
        "CREATE POLICY \"Users can manage own profile\" ON public.profiles<br/>"
        "&nbsp;&nbsp;FOR ALL USING (auth.uid() = id);<br/><br/>"
        "-- 2. Create Emergency Contacts Table<br/>"
        "CREATE TABLE public.emergency_contacts (<br/>"
        "&nbsp;&nbsp;id UUID PRIMARY KEY DEFAULT gen_random_uuid(),<br/>"
        "&nbsp;&nbsp;user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,<br/>"
        "&nbsp;&nbsp;contact_name VARCHAR(255) NOT NULL,<br/>"
        "&nbsp;&nbsp;contact_phone VARCHAR(20) NOT NULL,<br/>"
        "&nbsp;&nbsp;relationship VARCHAR(50) NOT NULL,<br/>"
        "&nbsp;&nbsp;created_at TIMESTAMPTZ DEFAULT NOW()<br/>"
        ");<br/>"
        "ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;<br/>"
        "CREATE POLICY \"Users can manage own contacts\" ON public.emergency_contacts<br/>"
        "&nbsp;&nbsp;FOR ALL USING (auth.uid() = user_id);"
    )
    t_sql = Table([[Paragraph(sql_snippet, styles['code'])]], colWidths=[6.7*inch])
    t_sql.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 6), ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8), ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_sql)
    story.append(Spacer(1, 0.08 * inch))
    
    story.append(Paragraph("A2.2 One-Touch SOS Dispatch Webhook Trigger (js/dashboard.js)", styles['h2']))
    js_snippet = (
        "async function triggerSOS() {<br/>"
        "&nbsp;&nbsp;try {<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;// 1. Fetch current authenticated user<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;const { data: { user }, error: authErr } = await supabase.auth.getUser();<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;if (authErr || !user) throw new Error('User authentication failed');<br/><br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;// 2. Sound client-side acoustic emergency alarm<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;startEmergencySiren();<br/><br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;// 3. Dispatch POST request to n8n webhook<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;const response = await fetch(N8N_WEBHOOK_URL, {<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method: 'POST',<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;headers: { 'Content-Type': 'application/json' },<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body: JSON.stringify({ user_id: user.id })<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;});<br/><br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;if (response.ok) {<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showToast('SOS Triggered Successfully! Guardians Notified.', 'success');<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;} else {<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw new Error(`Webhook error: ${response.statusText}`);<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;}<br/>"
        "&nbsp;&nbsp;} catch (error) {<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;console.error('SOS Trigger Error:', error);<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;showToast('Failed to trigger SOS: ' + error.message, 'error');<br/>"
        "&nbsp;&nbsp;}<br/>"
        "}"
    )
    t_js = Table([[Paragraph(js_snippet, styles['code'])]], colWidths=[6.7*inch])
    t_js.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 6), ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8), ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_js)
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # REFERENCES
    # ---------------------------------------------------------
    story.append(Paragraph("REFERENCES", styles['h1']))
    story.append(Spacer(1, 0.08 * inch))
    
    refs = [
        "[1] World Health Organization (WHO), 'Violence against women: Intimate partner and sexual violence against women evidence brief,' WHO Technical Report, Geneva, 2021.",
        "[2] National Crime Records Bureau (NCRB), 'Crime in India 2022 Statistics: Volume I (Crimes Against Women and Vulnerable Groups),' Ministry of Home Affairs, New Delhi, 2023.",
        "[3] W3C Geolocation API Specification (2nd Edition), W3C Recommendation, Available: https://www.w3.org/TR/geolocation-API/, 2022.",
        "[4] W3C Web Audio API Specification, W3C Recommendation, Available: https://www.w3.org/TR/webaudio/, 2021.",
        "[5] PostgreSQL Global Development Group, 'PostgreSQL 15.0 Documentation: Row Security Policies and Concurrency Control,' PostgreSQL Documentation, 2022.",
        "[6] Supabase Inc., 'Supabase Documentation: Open Source Firebase Alternative with PostgreSQL and Realtime Subscriptions,' Available: https://supabase.com/docs, 2024.",
        "[7] n8n GmbH, 'n8n Documentation: Fair-Code Workflow Automation Platform and Webhook Orchestration Architecture,' Available: https://docs.n8n.io, 2024.",
        "[8] Twilio Inc., 'Twilio REST API Documentation: Programmable SMS and Global Telecommunications Architecture,' Available: https://www.twilio.com/docs/sms, 2024.",
        "[9] M. Fowler, 'Patterns of Enterprise Application Architecture,' Addison-Wesley Professional, Boston, MA, 2002.",
        "[10] A. Silberschatz, H. F. Korth, and S. Sudarshan, 'Database System Concepts (7th Edition),' McGraw-Hill Education, New York, NY, 2019.",
        "[11] R. Fielding, 'Architectural Styles and the Design of Network-based Software Architectures,' Ph.D. dissertation, University of California, Irvine, 2000.",
        "[12] Open Source Geospatial Foundation, 'Leaflet: An Open-Source JavaScript Library for Mobile-Friendly Interactive Maps,' Available: https://leafletjs.com, 2023."
    ]
    
    for ref in refs:
        story.append(Paragraph(ref, styles['body']))
        story.append(Spacer(1, 0.03 * inch))
        
    return story
