/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}', // ใช้ค้นหาคลาสที่ใช้ในไฟล์ .vue และ .js
    './components/**/*.{vue,js,ts,jsx,tsx}', // ใน components
    './layouts/**/*.{vue,js,ts,jsx,tsx}', // ใน layouts
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

