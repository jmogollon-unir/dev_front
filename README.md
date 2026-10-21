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

- Catálogo y pedidos: `src/services/api.js` → `GET /api/books`, `GET /api/books/{id}`, `POST /api/orders`, `GET /api/orders/user/{userId}`
- Login: `src/hooks/useLogin.js` → `POST /api/users/login` con `{ username: <CIF>, password: <MD5> }` (vía `src/apiConfig.js`). La respuesta es el perfil del usuario, que se guarda en `localStorage` (`rp_user`) para mantener la sesión.

Copia `.env.example` a `.env` y ajusta `VITE_GATEWAY_URL` si tu gateway no está en el puerto 8080.

Levanta el backend según el README de `../dev_full_stack` (MySQL en Docker y Eureka, gateway y microservicios). El gateway permite CORS desde `localhost:5173-5177`.

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
├── services/ # Cliente HTTP hacia el API Gateway (api.js)
├── hooks/ # Custom hooks
│ ├── useBook.js # Obtiene detalles de un libro
│ ├── useBooks.js # Obtiene catálogo de libros
│ ├── useCart.js # Integración con carrito
│ └── useLogin.js # Login (CIF + contraseña) y logout
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

- Login con CIF de empresa + contraseña (la contraseña se envía como MD5)
- Sesión persistente en `localStorage` (sin JWT ni tokens de sesión)
- Perfil de usuario con sus pedidos
- Rutas privadas: `/checkout` y `/profile`

## 🛠️ Instalación y Configuración

### Requisitos
* Node.js 20.19+ o 22.12+
* npm

### Pasos

## Clonar repositorio

## Instalar dependencias

```bash
npm install
```

## Configurar API Gateway

Crear un archivo `.env` local (puedes copiar `.env.example`) si el Gateway no está en `http://localhost:8080`:

```bash
VITE_GATEWAY_URL=http://localhost:8080
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
