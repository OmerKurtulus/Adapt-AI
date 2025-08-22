# Adapt - Code Modernization Platform

<div align="center">
  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center" alt="Adapt Banner" width="800" height="400" style="border-radius: 10px;">
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 🚀 Overview

**Adapt** is a modern, AI-powered code transformation platform that helps developers modernize legacy HTML and CSS code into responsive, contemporary web designs. Built with React, TypeScript, and powered by Google's Gemini AI, Adapt provides an intuitive interface for code transformation with real-time preview capabilities.

## ✨ Features

### 🔧 Core Functionality
- **AI-Powered Code Transformation**: Leverage Google Gemini AI to modernize legacy code
- **Dual Code Editor**: Side-by-side HTML and CSS editors with Monaco Editor
- **Real-time Preview**: Instant preview of transformed code
- **Transformation History**: Keep track of all your code transformations
- **Copy to Clipboard**: Easy copying of transformed code

### 🤖 AI Assistant
- **Interactive Chat Interface**: Built-in AI assistant for coding help
- **Code Syntax Highlighting**: Proper syntax highlighting for multiple languages
- **Smart Code Detection**: Automatic detection of programming languages
- **Copy Code Blocks**: One-click copying of AI-generated code

### 👥 User Management
- **Secure Authentication**: Encrypted user credentials storage
- **Admin Panel**: User management interface for administrators
- **Role-based Access**: Admin and regular user roles
- **Secure Local Storage**: Encrypted user data storage

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Modern glass-effect UI components
- **Animated Background**: Dynamic hexagon pattern background
- **Responsive Design**: Works seamlessly on all device sizes
- **Dark Theme**: Eye-friendly dark interface
- **Smooth Animations**: Fluid transitions and hover effects

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Code Editor**: Monaco Editor (VS Code editor)
- **AI Integration**: Google Generative AI (Gemini)
- **Security**: CryptoJS for data encryption
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript ESLint

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/adapt-code-transformer.git
   cd adapt-code-transformer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## 👤 Default Login Credentials

- **Username**: `admin.OmerKurtulus`
- **Password**: `admin.OmerKurtulus`
- **Role**: Administrator

## 🎯 Usage Guide

### Code Transformation
1. **Login** with your credentials
2. **Enter your legacy HTML** in the left editor
3. **Enter your legacy CSS** in the right editor
4. **Click "Transform Code"** to modernize your code
5. **Preview the results** in the output modal
6. **Copy the transformed code** to your clipboard

### AI Assistant
1. **Click the floating "A" button** in the bottom-right corner
2. **Ask coding questions** or request code examples
3. **Copy code blocks** directly from the assistant's responses
4. **Get help** with debugging, best practices, and more

### Admin Features
1. **Access Admin Panel** from the profile menu
2. **Add new users** with username and password
3. **Remove users** (except admin users)
4. **Manage user permissions**

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AdminPanel.tsx   # User management interface
│   ├── AIChatButton.tsx # AI assistant chat interface
│   ├── CodeEditor.tsx   # Monaco editor wrapper
│   ├── Dashboard.tsx    # Main application dashboard
│   ├── HexagonBackground.tsx # Animated background
│   ├── OutputModal.tsx  # Code output display
│   ├── PreviewModal.tsx # Live code preview
│   ├── ProfileMenu.tsx  # User profile dropdown
│   ├── TransformButton.tsx # Code transformation trigger
│   └── TransformHistory.tsx # Transformation history
├── services/            # Business logic
│   └── userService.ts   # User management and authentication
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and animations
```

## 🔒 Security Features

- **Encrypted Storage**: User credentials are encrypted using AES encryption
- **Secure Authentication**: Password-based authentication system
- **Role-based Access**: Admin and user role separation
- **Input Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Graceful error handling throughout the application

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-effect design elements
- **Animated Hexagon Background**: Dynamic geometric background pattern
- **Smooth Transitions**: Fluid animations and hover effects
- **Responsive Layout**: Mobile-first responsive design
- **Dark Theme**: Professional dark color scheme
- **Custom Scrollbars**: Styled scrollbars matching the theme

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful code transformation capabilities
- **Monaco Editor** for the excellent code editing experience
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **React Community** for the amazing ecosystem

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/adapt-code-transformer/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release
- AI-powered code transformation
- User management system
- Interactive AI assistant
- Real-time code preview
- Transformation history
- Secure authentication

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>