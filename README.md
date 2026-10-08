## 🏆 Entregales actividad 1: Desarrollo front-end: SPA con React 

### Enlaces de la entrega  🔗 

#### [Vídeo-memoria](https://alumnosunir-my.sharepoint.com/:v:/g/personal/leonardocashiel2447_comunidadunir_net/IQD_-ymoqmrhTKKjEah7x2OBAVU-v1bTaFLpcCKqH5-KWBI?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=wpDFaR)

#### [URL del proyecto despleago en Vercel](https://unir-software-g18-relatos-papel.vercel.app)

# 📚 Relatos de Papel - E-Commerce de Libros

Plataforma e-commerce moderna para la venta de libros físicos y digitales, desarrollada con **React** y **Vite**, como proyecto del Máster Universitario en Ingeniería de Software y Sistemas Informáticos de UNIR.

## 🚀 Stack Tecnológico

### Frontend

- **React 19.2.4** - Framework UI con hooks modernos
- **Vite 8.0.4** - Build tool con HMR (Hot Module Replacement)
- **React Router DOM 7.14.1** - Enrutamiento SPA
- **JavaScript ES6+** - Sintaxis moderna
- **JSX** - Templates en JavaScript
- **HTML5** y **CSS3** - Markup y estilos
- **Bootstrap 5.3.8** - Framework UI
- **Bootstrap Icons 1.13.1** - Librería de iconos
- **Tailwind CSS 4.2.4** - Utilidades CSS

### Herramientas de Desarrollo

- **ESLint 9.39.4** - Linter de código
- **Vite Plugin React 6.0.1** - Integración React + Vite
- **@types/react** - Type definitions

## 🔌 Backend local (API Gateway)

El front consume **solo** el API Gateway (por defecto `http://localhost:8080`):

- Catálogo y pedidos: `src/services/api.js` → `/api/books`, `/api/orders`
- Login y perfil: `src/hooks/useLogin.js` → `/api/v1/tokens`, `/api/v1/users/{cif}` vía `src/apiConfig.js`
- Agente (WebSocket): `src/hooks/useCustomerAgent.js` → `ws://localhost:8080/ws-api/v1/communications/chat`

Copia `FRONT/.env.example` a `.env` y ajusta `VITE_GATEWAY_URL` si tu gateway no está en el puerto 8080.

Levanta el stack backend según `../dev_full_stack/README.md` (Docker Compose o microservicios en IDE).

## 📁 Estructura del Proyecto

src/
├── assets/ # Imágenes y archivos estáticos
├── components/ # Componentes reutilizables
│ ├── Footer/
│ ├── Header/
│ ├── HeaderBookDetails/
│ ├── HeaderSearch/
│ ├── Logo/
│ ├── SideCart/
├── context/ # Context API providers
│ ├── auth/ # Autenticación y usuario
│ ├── cart/ # Carrito de compras
│ └── global/ # Estado global (búsqueda)
├── hooks/ # Custom hooks
│ ├── useBook.js # Obtiene detalles de un libro
│ ├── useBooks.js # Obtiene catálogo de libros
│ ├── useCart.js # Integración con carrito
│ └── useLogin.js # Lógica de autenticación
├── pages/ # Páginas de la aplicación
│ ├── BookDetail/
│ ├── Cart/
│ ├── Checkout/
│ ├── Home/
│ ├── Landing/
│ ├── Login/
│ ├── Profile/
├── routes/ # Configuración de rutas
└── utils/ # Utilidades y mocks
└── mocks/
├── mockBookDetail.js
├── mockBooks.js
└── mockCompanies.js

Code

## 🎯 Funcionalidades Principales

### 1. **Catálogo de Libros**

- Listado completo con grid responsive
- Búsqueda por título y autor
- Filtrado por género y rango de precios personalizado
- Ordenamiento: precio, fecha, popularidad

### 2. **Detalle de Libro**

- Información completa del producto
- Galería de imágenes
- Sistema de reseñas de clientes
- Indicador de stock y disponibilidad
- Botón de agregar al carrito

### 3. **Carrito de Compras**

- Persistencia en localStorage
- Cálculo automático de totales
- Actualización de cantidades
- Validación de stock
- Integración con botón flotante

### 4. **Autenticación**

- Login con validación
- Registro de usuarios
- Sesión persistente
- Perfil de usuario

### 5. **Agente de atención**

- Chat flotante integrado con el microservicio `communications`
- Conexión WebSocket por medio del API Gateway
- Respuestas generadas desde Gemini en el back-end

## 🛠️ Instalación y Configuración

### Requisitos
* Node.js 20.19+ o 22.12+
* npm

### Pasos

## Clonar repositorio

```bash
git clone https://github.com/Dreamlocked/UNIR-SOFTWARE-G18-RELATOS-PAPEL.git 

cd UNIR-SOFTWARE-G18-RELATOS-PAPEL
```

## Instalar dependencias

```bash
npm install
```

## Configurar API Gateway

Crear un archivo `.env` local si el Gateway no está en `http://localhost:8080`:

```bash
VITE_API_GATEWAY_URL=http://localhost:8080
```

El agente se conecta a:

```text
ws://localhost:8080/ws-api/v1/communications/chat
```

## Iniciar servidor de desarrollo

```bash
npm run dev
```

## Build para producción
```bash
npm run build
```

## Preview de build

```bash
npm run preview
```

👥 Integrantes
Proyecto desarrollado por el Grupo 18 de la materia Desarrollo Full Stack del Máster Universitario en Ingeniería de Software y Sistemas Informáticos - UNIR.

* Julieth Camila Mogollón Bernal 
* Leonardo Cashiel Olaechea Saavedra 
* José Miguel Jamette Garrido 
* Francisco Javier Febles Jimenez
* Elsy Paola Amaya Lazo
