# Shamsiya KP — Data Scientist Portfolio

A responsive HTML/CSS/JavaScript portfolio with:

- Dark and light themes
- Professional role cards
- Single total GitHub repository highlight
- Six project cards with matching images and Streamlit demos
- Skills and progress indicators
- Education and recognition timeline
- Contact form using mailto
- Local portfolio chatbot

## Run in VS Code

1. Open this complete folder in VS Code.
2. Trust the folder when prompted.
3. Install **Live Server** by Ritwick Dey.
4. Right-click `index.html` and choose **Open with Live Server**.

Alternatively run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Skill animation fix
The skill progress bars now use a dedicated IntersectionObserver, numeric count-up animation, and a fallback for pages opened directly at `#skills`.
