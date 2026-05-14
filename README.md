# SportsPro AI 🏆

**Professional Sports Statistics & AI-Powered Predictions Platform**

Una plataforma moderna de estadísticas deportivas en tiempo real con inteligencia artificial para pronósticos profesionales, análisis tipo tipster y gestión de banca.

## 🎯 Características Principales

### 📊 Resultados en Vivo
- Marcadores en tiempo real
- Cronómetro sincronizado
- Eventos minuto a minuto (goles, tarjetas, sustituciones)
- Estadísticas en vivo
- Momentum del partido

### 🤖 Inteligencia Artificial
- Pronósticos automáticos con probabilidades
- Análisis de valor en apuestas
- Sistema tipster profesional
- Predicciones de goles esperados (xG)
- Detección de oportunidades live betting

### 📈 Estadísticas Avanzadas
- xG (Expected Goals)
- Tiros al arco
- Posesión de balón
- Mapas de calor
- Radar de jugadores
- Presión ofensiva
- Enfrentamientos directos
- Forma local/visitante

### 💰 Gestión de Apuestas
- Bankroll Manager
- Parlays inteligentes
- Alertas en tiempo real
- Comparador de cuotas
- Simulador de apuestas
- Picks VIP premium

### 🎨 Experiencia Premium
- Interfaz oscura y moderna
- Diseño minimalista elegante
- Animaciones suaves (Framer Motion)
- Tablas dinámicas
- Gráficos en tiempo real
- Modo responsive completo

## 🛠 Stack Tecnológico

### Frontend
- **Next.js 14** - Framework React moderno
- **React 18** - Librería UI
- **TailwindCSS** - Estilos
- **Framer Motion** - Animaciones
- **Recharts** - Gráficos
- **Socket.io Client** - Comunicación en tiempo real

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **Socket.io** - WebSockets en tiempo real
- **Redis** - Cache y sesiones
- **OpenAI API** - Procesamiento de IA

### Integración de APIs
- **API-Football** - Datos de fútbol
- **TheSportsDB** - Base de datos deportiva
- **SportMonks** - Estadísticas avanzadas

### Autenticación & Hosting
- **Firebase Auth** - Autenticación
- **Vercel** - Hosting Frontend
- **Railway/Render** - Hosting Backend
- **Supabase** - PostgreSQL en la nube

## 📁 Estructura del Proyecto

```
sportsproai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── ai/
│   │   └── app.js
│   ├── database/
│   │   └── migrations/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── lib/
│   │   ├── hooks/
│   │   └── context/
│   ├── public/
│   ├── .env.local.example
│   └── package.json
├── database/
│   └── schema.sql
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── AI_SYSTEM.md
└── package.json
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/caicedo1523-crypto/sportsproai.git
cd sportsproai
```

2. **Instala dependencias**
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

3. **Configura variables de entorno**
```bash
# Backend
cp backend/.env.example backend/.env
# Agrega tus API keys

# Frontend
cp frontend/.env.local.example frontend/.env.local
```

4. **Configura la base de datos**
```bash
# Crea la base de datos
createdb sportsproai

# Ejecuta migraciones
cd backend && npm run migrate
```

5. **Inicia el desarrollo**
```bash
npm run dev
```

El servidor estará disponible en:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📚 Documentación

- [Arquitectura del Sistema](./docs/ARCHITECTURE.md)
- [API REST Endpoints](./docs/API.md)
- [Sistema de IA Predictiva](./docs/AI_SYSTEM.md)
- [Guía de Base de Datos](./docs/DATABASE.md)

## 🔑 Variables de Entorno

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/sportsproai
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project
OPENAI_API_KEY=your_openai_api_key
API_FOOTBALL_KEY=your_api_football_key
SPORTS_DB_KEY=your_sports_db_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_CONFIG=your_firebase_config
```

## 🎯 Roadmap

- [x] Estructura base del proyecto
- [ ] Backend API completa
- [ ] Frontend UI/UX
- [ ] Sistema de autenticación
- [ ] Integración de APIs deportivas
- [ ] Sistema IA predictivo
- [ ] WebSockets tiempo real
- [ ] Panel administrador
- [ ] Sistema de suscripciones
- [ ] App móvil
- [ ] Analytics y monitoreo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**caicedo1523-crypto**

## 📧 Contacto

Para preguntas o soporte, abre un issue en el repositorio.

---

**SportsPro AI** - Donde la inteligencia artificial y el deporte se encuentran. 🚀⚽
