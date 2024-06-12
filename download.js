function download(title,headers, rows) {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Add title
doc.setFontSize(16);
doc.text(title, 20, 20);
// Add table
doc.autoTable({
    startY: 40,
    head: [headers],
    body: rows,
});

// Save the PDF
doc.save(`${title}.pdf`);
}
  