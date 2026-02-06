import pypdf
import sys

try:
    reader = pypdf.PdfReader("BRAND IDENTITY STNBETE.pdf")
    print(f"Number of pages: {len(reader.pages)}")
    
    full_text = ""
    for i, page in enumerate(reader.pages):
        print(f"--- Page {i+1} ---")
        text = page.extract_text()
        print(text)
        full_text += text + "\n"
        
except Exception as e:
    print(f"Error reading PDF: {e}")
