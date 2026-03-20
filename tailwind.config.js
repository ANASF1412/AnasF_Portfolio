/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-cyber-blue', 'bg-cyber-purple', 'bg-cyber-pink',
    'bg-cyber-blue/10', 'bg-cyber-purple/10', 'bg-cyber-pink/10',
    'border-cyber-blue', 'border-cyber-purple', 'border-cyber-pink',
    'border-cyber-blue/30', 'border-cyber-purple/30', 'border-cyber-pink/30',
    'text-cyber-blue', 'text-cyber-purple', 'text-cyber-pink',
    'stroke-cyber-blue', 'stroke-cyber-purple', 'stroke-cyber-pink',
    'fill-cyber-blue', 'fill-cyber-purple', 'fill-cyber-pink',
    'hover:bg-cyber-blue', 'hover:bg-cyber-purple', 'hover:bg-cyber-pink',
    'hover:border-cyber-blue', 'hover:border-cyber-purple', 'hover:border-cyber-pink',
    'hover:text-cyber-blue', 'hover:text-cyber-purple', 'hover:text-cyber-pink',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#020617",
          blue: "#00F5FF",
          purple: "#8B5CF6",
          pink: "#FF00FF",
        }
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        'cyber-grid': '30px 30px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
