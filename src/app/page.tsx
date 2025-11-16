"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
	Star,
	Check,
	ArrowRight,
	TrendingUp,
	Shield,
	Zap,
	Users,
	BarChart3,
	Globe,
	Menu,
	X,
	Mail,
	Phone,
	MapPin,
	Sun,
	Moon,
} from "lucide-react";
import { apiClient, Testimonial } from "../lib/api";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import { staticTestimonials } from "@/data/testimonials";

const navLinks = [
	{ href: "#features", label: "Features", icon: Check },
	{ href: "#track-record", label: "Track Record", icon: BarChart3 },
	{ href: "/pricing", label: "Pricing", icon: Zap },
	{ href: "#testimonials", label: "Testimonials", icon: Users },
	{ href: "#faq", label: "FAQ", icon: Shield },
];

const features = [
	{
		icon: TrendingUp,
		title: "Real-Time Trade Alerts",
		description:
			"Get instant notifications for Crypto, Forex, and US Stocks opportunities.",
	},
	{
		icon: Shield,
		title: "Daily Market Analysis",
		description:
			"Professional insights and trade ideas from experienced traders.",
	},
	{
		icon: Globe,
		title: "Educational Materials",
		description:
			"Learn from comprehensive guides and become an independent trader.",
	},
];

const faqItems = [
	{
		question: "What markets do you cover?",
		answer:
			"We cover Crypto, Forex, and US Stocks. Our analysts monitor these markets 24/7 to provide the best trade opportunities.",
	},
	{
		question: "How do I receive the trade alerts?",
		answer:
			"Trade alerts are sent through our private Discord community with instant notifications to your phone or desktop.",
	},
	{
		question: "Can I cancel my subscription anytime?",
		answer:
			"Yes, you can cancel anytime directly from your account dashboard—no fees or hidden terms.",
	},
	{
		question: "Do you provide educational content?",
		answer:
			"Yes. Members get access to tutorials, strategy breakdowns, and market insights to improve independent trading skills.",
	},
	{
		question: "What makes Data Trader Premium different?",
		answer:
			"We provide full trade explanations, daily analysis, and transparent performance reports—focused on education and trust.",
	},
	{
		question: "How much should I invest to get started?",
		answer:
			"There's no minimum. Start with any amount you're comfortable with and always apply sound risk management.",
	},
];

export default function HomePage() {
	const { user, isAuthenticated, logout } = useAuth();
	const [testimonials, setTestimonials] = useState<Testimonial[]>(
		staticTestimonials,
	);
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				// This fetch is for show only, as requested.
				await apiClient.getActiveTestimonials();
			} catch (error) {
				console.error("Failed to fetch testimonials:", error);
			}
		};
		fetchTestimonials();
	}, []);

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<span key={i}>{i < rating ? "⭐" : "☆"}</span>
		));
	};

	// Duplicate testimonials for seamless scrolling effect
	const duplicatedTestimonials =
		testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

	return (
		<>
			{/* Navigation */}
			<nav className="fixed w-full bg-nav-bg backdrop-blur-sm z-50">
				{/* Desktop Navigation */}
				<div className="hidden md:block">
					<div className="container mx-auto px-4">
						<div className="flex justify-between items-center h-16">
							<div className="flex items-center">
								<Link href="/">
									<img
										src="/images/logo.png"
										alt="Data Trader Premium"
										className="h-8"
									/>
								</Link>
							</div>
							<div className="flex space-x-8">
								<a href="/#features" className="hover:text-green-500">
									Features
								</a>
								<a href="/#track-record" className="hover:text-green-500">
									Track Record
								</a>
								<a href="/pricing" className="hover:text-green-500">
									Pricing
								</a>
								<a href="/#testimonials" className="hover:text-green-500">
									Testimonials
								</a>
								<a href="/#faq" className="hover:text-green-500">
									FAQ
								</a>
							</div>
							<div className="flex items-center space-x-4">
								<ThemeToggle />
								<Link
									href="/pricing"
									className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all duration-200"
								>
									Join Now
								</Link>
							</div>
						</div>
					</div>
				</div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
                <Link href="/">
                  <img
                    src="/images/logo.png"
                    alt="Data Trader Premium"
                    className="h-8"
                  />
                </Link>
              </div>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full bg-sidebar-bg backdrop-blur-lg w-64 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 pt-20`}
      >
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-green-500"
              onClick={toggleMenu}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/pricing"
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all duration-200 text-center"
          >
            Join Now
          </Link>
        </div>
      </div>

			{/* Main Content */}
			<main className="md:ml-0">
				{/* Hero Section */}
				<section className="pt-20 pb-20">
					<div className="container mx-auto px-8 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Profit from Markets with Pro Traders
						</h1>
						<p className="text-xl mb-8">
							Get Trade Alerts, Daily Analysis, and Educational Guides.
						</p>
						<p className="text-green-500 text-lg mb-8">
							Direct access to Expert traders with a proven track record ↗
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
							<Link
								href="/pricing"
								className="bg-green-500 text-white px-8 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
							>
								Join Now
							</Link>
							{isAuthenticated ? (
								<button
									onClick={logout}
									className="bg-red-500 text-white px-8 py-3 rounded-full text-lg hover:bg-red-600 transition duration-300"
								>
									Logout
								</button>
							) : (
								<>
									<Link
										href="/login"
										className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-300"
									>
										Login
									</Link>
									<Link
										href="/register"
										className="bg-purple-500 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-600 transition duration-300"
									>
										Sign Up
									</Link>
								</>
							)}
						</div>
						<div className="mt-8">
							<p className="text-gray-500 dark:text-gray-400">
								770k+ Subscribers on YouTube
							</p>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-20 bg-section-bg">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12">
							What You Get
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{features.map((feature, index) => (
								<div key={index} className="text-center">
									<div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
										<feature.icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold mb-4">{feature.title}</h3>
									<p className="text-gray-600 dark:text-gray-400">
										{feature.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Track Record Section */}
				<section id="track-record" className="py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12">
							Our Track Record
						</h2>
						<div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
								<div>
									<div className="text-3xl font-bold text-green-500 mb-2">
										85%
									</div>
									<div className="text-gray-600 dark:text-gray-400">
										Win Rate
									</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-green-500 mb-2">
										770k+
									</div>
									<div className="text-gray-600 dark:text-gray-400">
										YouTube Subscribers
									</div>
								</div>
								<div>
									<div className="text-3xl font-bold text-green-500 mb-2">
										24/7
									</div>
									<div className="text-gray-600 dark:text-gray-400">
										Market Monitoring
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section id="testimonials" className="py-20 bg-section-bg">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12">
							What members say about us
						</h2>
						<div className="relative testimonials-wrapper">
							<div className="testimonial-fade-left absolute left-0 top-0 bottom-0 z-10"></div>
      						<div className="testimonial-fade-right absolute right-0 top-0 bottom-0 z-10"></div>
							<div className="testimonials-container">
								{isLoading ? (
									<p className="text-center">Loading testimonials...</p>
								) : testimonials.length > 0 ? (
									<div className="testimonials-track flex gap-6">
										{duplicatedTestimonials.map((testimonial, index) => (
											<div
												key={`${testimonial.id}-${index}`}
												className="testimonial-card flex-shrink-0 w-80 md:w-96"
											>
												<h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
													{testimonial.position}
												</h3>
												<p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
													{testimonial.content}
												</p>
												<div className="testimonial-footer">
													<div className="testimonial-author">
														{testimonial.avatar ? (
															<img
																src={testimonial.avatar}
																alt={testimonial.name}
																className="testimonial-avatar"
															/>
														) : (
															<div className="testimonial-avatar bg-gray-300"></div>
														)}
														<h4 className="font-semibold">
															{testimonial.name}
														</h4>
													</div>
													<div className="testimonial-rating">
														{renderStars(testimonial.rating)}
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="text-center text-gray-500">
										No testimonials available at the moment.
									</p>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section id="faq" className="py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
							Frequently Asked Questions
						</h2>
						<div className="max-w-3xl mx-auto space-y-4">
							{faqItems.map((item, index) => (
								<div
									key={index}
									className={`faq-item bg-white dark:bg-gray-800 rounded-lg shadow-sm ${
										openFaqIndex === index ? "active" : ""
									}`}
								>
									<button
										onClick={() =>
											setOpenFaqIndex(openFaqIndex === index ? null : index)
										}
										className="faq-question w-full px-6 py-4 text-left font-semibold text-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 text-gray-900 dark:text-gray-200"
									>
										<span className="flex-1 text-center">{item.question}</span>
										<svg
											className="faq-icon w-5 h-5 transform transition-transform duration-200"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
												clipRule="evenodd"
											></path>
										</svg>
									</button>
									<div className="faq-answer px-6 pb-4">
										<p className="text-gray-600 dark:text-gray-300">
											{item.answer}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-4xl font-bold text-white mb-6">
							Ready to Transform Your Trading?
						</h2>
						<p className="text-xl text-green-100 mb-8">
							Join thousands of successful traders who trust our signals
						</p>
						<Link
							href="/pricing"
							className="inline-block bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
						>
							Get Started Today
						</Link>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-100 py-12 transition-colors duration-300">
				<div className="container mx-auto px-4 text-center">
					<div className="mb-8">
						<img
							src="/images/logo.png"
							alt="Data Trader Premium"
							className="h-12 mx-auto mb-4"
						/>
						<p className="text-gray-400 dark:text-gray-300">
							Profit from Markets with Pro Traders
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
						<div>
							<h4 className="font-bold mb-4 text-white dark:text-gray-100">
								Platform
							</h4>
							<ul className="space-y-2 text-gray-400 dark:text-gray-300">
								<li>
									<a
										href="/#features"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href="/pricing"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href="/#track-record"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Track Record
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-4 text-white dark:text-gray-100">
								Community
							</h4>
							<ul className="space-y-2 text-gray-400 dark:text-gray-300">
								<li>
									<a
										href="/#testimonials"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Testimonials
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Discord
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										YouTube
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-bold mb-4 text-white dark:text-gray-100">
								Support
							</h4>
							<ul className="space-y-2 text-gray-400 dark:text-gray-300">
								<li>
									<a
										href="/#faq"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Contact
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white dark:hover:text-green-400 transition-colors duration-200"
									>
										Help Center
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 dark:border-gray-600 pt-8">
						<p className="text-gray-400 dark:text-gray-300">
							© {new Date().getFullYear()} Data Trader Premium. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}
