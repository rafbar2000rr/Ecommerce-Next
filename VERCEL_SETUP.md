# 🔧 Configuración de Vercel para API URLs

## Problema
En Vercel, los fetchs con URLs relativas (`/api/...`) pueden fallar porque el servidor no sabe cuál es la URL correcta para construir la URL completa.

## Solución
Se ha creado una función auxiliar `apiCall()` en `lib/api.ts` que:
- En el navegador: usa `window.location.origin` (la URL actual de Vercel)
- En el servidor: usa la variable de entorno `NEXT_PUBLIC_API_URL`
- En desarrollo local: usa `http://localhost:3000` por defecto

## Pasos para Configurar en Vercel

### 1. Agregar variable de entorno en Vercel
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto (`ecommerce-next-five-rosy`)
3. Ve a **Settings** → **Environment Variables**
4. Agrega una nueva variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://ecommerce-next-five-rosy.vercel.app`
   - **Environment:** Production, Preview, Development

### 2. Redeploy en Vercel
Después de agregar la variable de entorno, debes hacer un redeploy:
1. En Vercel Dashboard, ve a **Deployments**
2. Haz clic en el último deployment
3. Haz clic en **Redeploy**

O simplemente haz un `git push` a tu rama main para trigger un nuevo deployment.

### 3. Verificar en Desarrollo Local
En tu `.env.local` ya está configurado:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Checklist
- [ ] Variable `NEXT_PUBLIC_API_URL` agregada en Vercel
- [ ] Redeploy realizado en Vercel
- [ ] Probar clicking en productos en Vercel
- [ ] Probar login/register en Vercel
- [ ] Probar carrito en Vercel
- [ ] Probar checkout en Vercel

## Archivos Actualizados
- ✅ `lib/api.ts` - Función auxiliar para URLs
- ✅ `hooks/useUser.ts` - Usa apiCall()
- ✅ `shared/components/Navbar.tsx` - Usa apiCall()
- ✅ `app/login/page.tsx` - Usa apiCall()
- ✅ `app/register/page.tsx` - Usa apiCall()
- ✅ `app/checkout/page.tsx` - Usa apiCall()
- ✅ `app/admin/orders/page.tsx` - Usa apiCall()
- ✅ `app/orders/[id]/page.tsx` - Usa apiCall()
- ✅ `features/cart/context/CartContext.tsx` - Usa apiCall()
- ✅ `.env.local` - Agregada variable NEXT_PUBLIC_API_URL
- ✅ `.env.example` - Documentadas variables necesarias
