# -*- coding: utf-8 -*-
from reportlab.pdfgen import canvas
from reportlab.lib import colors

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        # Pages 1 and 2 are strictly reserved for user cover/certificate
        if self._pageNumber <= 2:
            return

        self.saveState()
        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(colors.HexColor('#475569'))

        # Running Header (Top)
        header_text = 'SOSafe: Personal Emergency Safety & Real-Time Guardian Response System'
        self.drawString(54, 802, header_text)
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.6)
        self.line(54, 795, 541, 795)

        # Running Footer (Bottom)
        self.line(54, 46, 541, 46)
        self.setFont('Helvetica', 8)
        footer_left = 'Department of Computer Science & Engineering | Project Report'
        self.drawString(54, 34, footer_left)
        
        page_str = f'Page {self._pageNumber}'
        self.drawRightString(541, 34, page_str)
        self.restoreState()
