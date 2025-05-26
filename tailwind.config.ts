import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				company: {
					dark: "#11142b",
					darker: "#0a0c1c",
					blue: "#2563eb",
					purple: "#7c3aed",
					accent: "#38bdf8",
					light: "#f8fafc",
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				float: {
					"0%, 100%": { transform: "translateY(0) scale(1)" },
					"50%": { transform: "translateY(-20px) scale(1.05)" },
				},
				floatReverse: {
					"0%, 100%": { transform: "translateY(0) scale(1)" },
					"50%": { transform: "translateY(20px) scale(1.05)" },
				},
				pulseSlow: {
					"0%, 100%": { opacity: "0.4" },
					"50%": { opacity: "0.7" },
				},
				gradientShift: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
				flare: {
					"0%": { opacity: "0.3", transform: "translateX(-20px) scale(0.8)" },
					"50%": { opacity: "0.6", transform: "translateX(0) scale(1.2)" },
					"100%": { opacity: "0.3", transform: "translateX(20px) scale(0.8)" },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-in-out',
				'slide-up': 'slide-up 0.7s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'float-slow': "float 8s ease-in-out infinite",
				'float-slow-reverse': "floatReverse 10s ease-in-out infinite",
				'pulse-slow': "pulseSlow 6s ease-in-out infinite",
				'pulse-slow-alt': "pulseSlow 8s ease-in-out infinite 1s",
				'gradient-slow': "gradientShift 15s ease infinite alternate",
				'nebula': "gradientShift 30s ease-in-out infinite alternate",
				'flare': "flare 8s ease-in-out infinite",
				'flare-delayed': "flare 10s ease-in-out infinite 2s",
			},
			backgroundImage: {
				'hero-gradient': 'radial-gradient(circle at center, rgba(124, 58, 237, 0.8) 0%, rgba(17, 20, 43, 0) 70%)',
				'feature-gradient': 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
				'mesh': "url('/mesh-bg.png')",
				'grid-white': "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
				'gradient-radial': "radial-gradient(var(--tw-gradient-stops))",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
