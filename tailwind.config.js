module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
      extend: {
        fontfamily:{
            poppins:['var(--font-poppins)', 'sans-serif'],
        }
      },
    },
    plugins: [],
  };
  