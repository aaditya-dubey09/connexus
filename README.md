# 🌐 Connexus - Real-time Chat Application

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Socket.io-4.7-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Node.js-22.18-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA" />
</div>

<div align="center">
  <h3>A modern, feature-rich real-time chat application built with the MERN stack</h3>
  <p>Experience seamless communication with WhatsApp/Telegram-like features, stunning animations, and mobile-first design.</p>
</div>

---

## 🚀 Features

### 💬 **Real-time Messaging**

- **Instant Communication**: Socket.io powered real-time messaging
- **Message Status**: Read receipts with double-tick indicators
- **Online Status**: Live user presence indicators
- **Message History**: Persistent chat history with infinite scroll
- **Date Separators**: WhatsApp-style date dividers between conversations

### ✏️ **Advanced Message Management**

- **Edit Messages**: Click-to-edit with main input field integration
- **Delete Messages**: Remove sent messages with confirmation
- **Message Timestamps**: Bottom-right corner time display like WhatsApp
- **Visual Feedback**: Dark overlay during editing mode
- **Keyboard Shortcuts**: Enter to save, Escape to cancel

### 👥 **User Experience**

- **User Profiles**: Comprehensive profile viewing system
- **Avatar Interactions**: Click avatars for quick actions menu
- **Profile Viewer**: Full-screen profile modals on mobile
- **Last Message Preview**: Recent message display under user names
- **Unread Counters**: WhatsApp-style message count badges

### 🎨 **Modern UI/UX**

- **Multiple Themes**: Light, dark, and custom theme options
- **Chat Themes**: Customizable bubble color schemes
- **Wallpapers**: Beautiful background options for chat areas
- **Smooth Animations**: Professional transitions and hover effects
- **Mobile Responsive**: Telegram/WhatsApp-like mobile experience

### 📱 **Progressive Web App (PWA)**

- **Offline Capability**: Service worker for offline functionality
- **App-like Experience**: Install on mobile devices
- **Push Notifications**: Browser notification support (Coming Soon)
- **Background Sync**: Seamless message synchronization

### 🔧 **Developer Features**

- **Redux Toolkit**: Efficient state management
- **Modern React**: React 19 with hooks and context
- **TypeScript Support**: Type safety with PropTypes
- **Component Architecture**: Modular and reusable components
- **Error Boundaries**: Graceful error handling

---

## 🛠️ Tech Stack

### **Frontend**

- **React 19** - Modern UI library with latest features
- **Redux Toolkit** - State management with RTK Query
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **Socket.io Client** - Real-time communication
- **React Router** - Client-side routing
- **Vite** - Fast build tool and development server

### **Backend**

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimal web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database for scalability
- **Mongoose** - Object modeling for MongoDB
- **JWT** - Secure authentication tokens

### **DevOps & Tools**

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Git** - Version control system
- **npm** - Package management

---

## 📦 Installation & Setup

### **Prerequisites**

- Node.js (v18.0.0 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/connexus.git
cd connexus
```

### **2. Backend Setup**

```bash
cd server
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLIENT_URL=http://localhost:5173
# PORT=5000

# Start the server
npm start
```

### **3. Frontend Setup**

```bash
cd ../client
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
# VITE_DB_ORIGIN=http://localhost:5000

# Start the development server
npm run dev
```

### **4. Access the Application**

- **Frontend**: <http://localhost:5173>
- **Backend**: <http://localhost:5000>

---

## 📱 Usage Guide

### **Getting Started**

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access your account with credentials
3. **Find Users**: Browse the user list in the sidebar
4. **Start Chatting**: Click on any user to begin a conversation

### **Core Features**

#### **Messaging**

- Type in the input field and press Enter or click Send
- Click the three-dot menu on your messages to edit or delete
- See read receipts (✓✓) on sent messages
- View message timestamps in bottom-right corner

#### **User Interactions**

- Click user avatars in sidebar for quick action menu
- Click user name/avatar in chat header to view full profile
- See online status with green dot indicators
- View unread message counts with green badges

#### **Customization**

- Access Settings via the three-dot menu in top-right
- Choose from multiple app themes (Light, Dark, etc.)
- Select chat bubble color schemes
- Pick from beautiful wallpaper options

#### **Mobile Experience**

- Full-screen interface on mobile devices
- Touch-optimized interactions
- Swipe-friendly navigation
- Install as PWA for app-like experience

---

## 🏗️ Project Structure

```
connexus/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets and PWA files
│   │   ├── icons/              # App icons for PWA
│   │   ├── manifest.json       # PWA manifest
│   │   └── sw.js              # Service worker
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── About.jsx       # About modal
│   │   │   ├── Settings.jsx    # Settings panel
│   │   │   ├── UserProfile.jsx # User profile editor
│   │   │   └── UserProfileViewer.jsx # Profile viewer
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useTheme.js     # Theme management hook
│   │   ├── pages/              # Main application pages
│   │   │   ├── authentication/ # Login/Signup pages
│   │   │   └── home/          # Chat interface components
│   │   ├── store/              # Redux store configuration
│   │   │   └── slice/         # Redux slices
│   │   ├── utils/              # Utility functions
│   │   └── index.css          # Global styles
│   ├── package.json
│   └── vite.config.js         # Vite configuration
├── server/                     # Backend Node.js application
│   ├── controllers/            # Route controllers
│   ├── db/                     # Database configuration
│   ├── middlewares/            # Express middlewares
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── socket/                 # Socket.io configuration
│   ├── utilities/              # Helper functions
│   ├── package.json
│   └── server.js              # Main server file
└── README.md                   # This file
```

---

## 🔧 Environment Variables

### **Server (.env)**

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/connexus
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### **Client (.env)**

```env
VITE_DB_ORIGIN=http://localhost:5000
VITE_APP_TITLE=Connexus
```

---

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**

```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### **Backend (Heroku/Railway)**

```bash
cd server
# Ensure environment variables are set
# Deploy using your preferred platform
```

### **Database (MongoDB Atlas)**

- Create a MongoDB Atlas cluster
- Update `MONGO_URI` in environment variables
- Configure network access and database users

---

## 🤝 Contributing

We welcome contributions to Connexus! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**

- Follow the existing code style and conventions
- Write descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📈 Roadmap

### **🔮 Upcoming Features**

- [ ] **Voice Messages** - Send and receive audio messages
- [ ] **File Sharing** - Share documents, images, and videos
- [ ] **Group Chats** - Create and manage group conversations
- [ ] **Video Calls** - WebRTC-powered video communication
- [ ] **Message Encryption** - End-to-end encryption for privacy
- [ ] **Bot Integration** - Automated bots and AI assistants
- [ ] **Message Reactions** - React to messages with emojis
- [ ] **Advanced Search** - Search through message history
- [ ] **Custom Notifications** - Personalized notification settings
- [ ] **Multi-device Sync** - Synchronize across multiple devices

### **🛠️ Technical Improvements**

- [ ] **TypeScript Migration** - Full TypeScript implementation
- [ ] **Testing Suite** - Comprehensive unit and integration tests
- [ ] **Performance Optimization** - Code splitting and lazy loading
- [ ] **Docker Support** - Containerization for easy deployment
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **Monitoring** - Application performance monitoring
- [ ] **Caching** - Redis caching for improved performance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aaditya Dubey**

- GitHub: [@aaditya-dubey09](https://github.com/aaditya-dubey09)
- LinkedIn: [aadityadubey](https://linkedin.com/in/aadityadubey)
- Email: [ad2340033@gmail.com](mailto:ad2340033@gmail.com)

---

## 🙏 Acknowledgments

- **Socket.io** for real-time communication capabilities
- **MongoDB** for robust database solutions
- **Tailwind CSS** for beautiful and responsive design
- **React Community** for the amazing ecosystem
- **Open Source Contributors** for inspiration and code references

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Search existing GitHub issues
2. **Create New Issue**: Open a detailed bug report or feature request
3. **Documentation**: Refer to this README and inline code comments
4. **Community**: Join our discussions and get help from the community

---

<div align="center">
  <h3>⭐ Star this repository if you found it helpful!</h3>
  <p>Made with ❤️ by Aaditya</p>
</div>
