# Software Defect AI

AI-Powered Software Testing Platform for automated code analysis, vulnerability detection, and defect prediction using machine learning.

## 🚀 Features

- **AI-Powered Code Analysis** - Leverages Groq AI (LLaMA 3.3) for intelligent code review
- **Multi-Model Predictions** - Ensemble of Deep Learning, Random Forest, SVM, and Bayesian models
- **Static Code Metrics** - Calculates LOC, Cyclomatic Complexity, and Halstead metrics
- **Vulnerability Detection** - Identifies security issues and potential bugs
- **Risk Assessment** - Color-coded risk levels (LOW, MEDIUM, HIGH, CRITICAL)
- **Interactive Chat Assistant** - Get real-time testing guidance and best practices
- **PDF Report Export** - Generate professional assessment reports
- **Multi-Language Support** - Python, JavaScript, TypeScript, Java, C++

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **AI Integration:** Groq API (LLaMA 3.3-70B)
- **PDF Generation:** jsPDF
- **Runtime:** Node.js

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key (get from [console.groq.com](https://console.groq.com))

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai_powered_software_testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_actual_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Code Analysis

1. Navigate to the **Analyze** page
2. Choose input method:
   - Upload a code file
   - Paste code directly
   - Load a sample
3. Enter a file name for identification
4. Click **Analyze Code**
5. Review results: metrics, issues, recommendations
6. Export PDF report if needed

### AI Chat Assistant

1. Navigate to the **Chat** page
2. Ask questions about testing, debugging, or code quality
3. Get instant AI-powered responses
4. Paste code snippets for analysis

### Documentation

Visit the **Docs** page for comprehensive guides on:
- Getting started
- Understanding results
- Using the chat assistant
- Best practices

## 📊 Code Metrics Explained

- **LOC (Lines of Code):** Total number of lines in the code
- **Cyclomatic Complexity:** Number of independent paths through code
- **Halstead Volume:** Code volume based on operators and operands
- **Halstead Difficulty:** Estimated difficulty to understand/maintain
- **Operators/Operands:** Count of unique operators and operands

## 🔒 Security

- API keys stored in environment variables (never committed)
- No code storage on servers (privacy-focused)
- HTTPS only in production
- Client-side validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `GROQ_API_KEY` to environment variables
4. Deploy

### Other Platforms

Compatible with any Node.js hosting platform:
- Netlify
- Railway
- Render
- AWS Amplify

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── analyze/           # Code analysis feature
│   │   ├── chat/              # AI chat assistant
│   │   ├── docs/              # Documentation
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── analyze/           # Analysis components
│   │   ├── chat/              # Chat components
│   │   ├── home/              # Home page sections
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utilities
├── public/                    # Static assets
└── ...config files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Groq AI](https://groq.com/)
- Based on research from the PROMISE repository
- Inspired by software engineering best practices

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for better software quality**
