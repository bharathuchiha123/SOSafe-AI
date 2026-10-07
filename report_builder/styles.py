# -*- coding: utf-8 -*-
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def get_report_styles():
    styles = getSampleStyleSheet()

    style_h1 = ParagraphStyle(
        'ReportH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'ReportH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    style_h3 = ParagraphStyle(
        'ReportH3',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'ReportBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=6,
        alignment=4
    )

    style_bullet = ParagraphStyle(
        'ReportBullet',
        parent=style_body,
        leftIndent=12,
        bulletIndent=4,
        spaceAfter=3
    )

    style_table_cell = ParagraphStyle(
        'ReportTableCell',
        fontName='Helvetica',
        fontSize=7.8,
        leading=10,
        textColor=colors.HexColor('#1E293B')
    )

    style_table_header = ParagraphStyle(
        'ReportTableHeader',
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=11,
        textColor=colors.white
    )

    style_caption = ParagraphStyle(
        'ReportCaption',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#334155'),
        alignment=1,
        spaceBefore=4,
        spaceAfter=8
    )

    style_code = ParagraphStyle(
        'ReportCode',
        fontName='Courier',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor('#0F172A')
    )

    return {
        'h1': style_h1,
        'h2': style_h2,
        'h3': style_h3,
        'body': style_body,
        'bullet': style_bullet,
        'table_cell': style_table_cell,
        'table_header': style_table_header,
        'caption': style_caption,
        'code': style_code
    }
