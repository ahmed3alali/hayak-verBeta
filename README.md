# 🍽️ Hayak - QR Menu & Order System

**A full-stack MERN application for restaurant menu management with QR code integration and real-time order processing.**  
Built to enhance full-stack development skills with modern web technologies.

<p align="center">
  <img src="./images/hero-banner.png" alt="Hayak Demo" width="800">
</p>

---

## 📖 About Hayak

**Hayak** is a simple yet powerful QR menu application that allows restaurants to:
- Create and manage digital menus
- Generate QR codes for contactless menu access
- Accept and track customer orders in real-time
- Manage menu items with full CRUD operations

This project was built as a learning exercise to strengthen full-stack development skills using the MERN stack.

---

## ✨ Features

### 🍕 Menu Management
- ✅ Create, read, update, and delete menu items
- 🖼️ Upload and manage food images
- 🏷️ Categorize items (Appetizers, Main Course, Desserts, Beverages)
- 💰 Set prices and descriptions
- ⭐ Mark items as featured or available

### 📱 QR Code System
- 🔲 Generate unique QR codes for restaurant tables
- 📲 Instant menu access via mobile scan
- 🔗 Shareable menu links

### 🛒 Order Management
- 📝 Place orders directly from the menu
- 👀 View order history and status
- ⏱️ Real-time order updates
- 🔔 Order notifications

### 🎨 User Interface
- 📱 Fully responsive design
- 🌙 Modern and clean UI
- 🚀 Fast loading times
- 💫 Smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **QR Generation** | qrcode.react |
| **Styling** | CSS3, Flexbox/Grid |
| **Image Upload** | Multer |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📂 Project Structure

```
📦 hayak
┣ 📂 client/                # React Frontend
┃ ┣ 📂 public/
┃ ┣ 📂 src/
┃ ┃ ┣ 📂 components/       # Reusable components
┃ ┃ ┣ 📂 pages/            # Page components
┃ ┃ ┣ 📂 context/          # Context API
┃ ┃ ┣ 📂 utils/            # Helper functions
┃ ┃ ┣ 📜 App.js
┃ ┃ ┗ 📜 index.js
┃ ┗ 📜 package.json
┣ 📂 server/               # Express Backend
┃ ┣ 📂 config/            # Configuration files
┃ ┣ 📂 controllers/       # Route controllers
┃ ┣ 📂 models/            # Mongoose models
┃ ┣ 📂 routes/            # API routes
┃ ┣ 📂 middleware/        # Custom middleware
┃ ┣ 📂 uploads/           # Image uploads
┃ ┣ 📜 server.js          # Entry point
┃ ┗ 📜 package.json
┣ 📂 images/              # README assets
┗ 📜 README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hayak.git
cd hayak
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. **Run the application**

In the `server` directory:
```bash
npm run dev
```

In the `client` directory:
```bash
npm start
```

The app will run on:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

---

## 📸 Screenshots

### Menu Dashboard
<p align="center">
  <img src="./images/dashboard.png" alt="Dashboard" width="700">
</p>

### Mobile Menu View
<p align="center">
  <img src="./images/mobile-menu.png" alt="Mobile Menu" width="350">
</p>

### Order Management
<p align="center">
  <img src="./images/orders.png" alt="Orders" width="700">
</p>

### QR Code Generation
<p align="center">
  <img src="./images/qr-code.png" alt="QR Code" width="400">
</p>

---

## 🔌 API Endpoints

### Menu Items
```
GET    /api/menu           - Get all menu items
GET    /api/menu/:id       - Get single menu item
POST   /api/menu           - Create new menu item
PUT    /api/menu/:id       - Update menu item
DELETE /api/menu/:id       - Delete menu item
```

### Orders
```
GET    /api/orders         - Get all orders
GET    /api/orders/:id     - Get single order
POST   /api/orders         - Create new order
PUT    /api/orders/:id     - Update order status
DELETE /api/orders/:id     - Delete order
```

### QR Codes
```
GET    /api/qr/:tableId    - Get QR code for table
POST   /api/qr/generate    - Generate new QR code
```

---

## 💾 Database Schema

### Menu Item Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  available: Boolean,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  tableNumber: String,
  items: [{ menuItem: ObjectId, quantity: Number }],
  totalPrice: Number,
  status: String, // pending, preparing, ready, completed
  customerNote: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Key Learning Outcomes

Through building Hayak, I strengthened my skills in:

- ✅ Building RESTful APIs with Express.js
- ✅ MongoDB database design and relationships
- ✅ React component architecture and state management
- ✅ JWT authentication and authorization
- ✅ File upload handling with Multer
- ✅ QR code generation and integration
- ✅ Responsive design principles
- ✅ Error handling and validation
- ✅ Deployment and environment configuration

---

## 🔮 Future Enhancements

- [ ] User authentication for restaurant owners
- [ ] Multi-restaurant support
- [ ] Payment gateway integration
- [ ] Order analytics dashboard
- [ ] Push notifications for orders
- [ ] Table reservation system
- [ ] Customer reviews and ratings
- [ ] Multi-language support
- [ ] Dark mode theme

---

## 🐛 Known Issues

- Image upload size needs optimization
- Order status updates require manual refresh
- QR codes could be more customizable

---

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


---

## 👨‍💻 Author

**Your Name**

- GitHub: [@ahmed3alali](https://github.com/ahmed3alali)
- LinkedIn: [My Profile](https://www.linkedin.com/in/ahmed-al-ali-fullstack/)
- Portfolio: [a-alali.dev](https://a-alali.dev)

---

## 🙏 Acknowledgments

- Inspired by modern restaurant ordering systems
- Built as part of my MERN stack learning journey
- Thanks to the open-source community for amazing tools and resources

---

<p align="center">
  <strong>Made with ❤️ and lots of ☕</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>
