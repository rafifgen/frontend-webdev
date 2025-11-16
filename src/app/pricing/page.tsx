"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus, Minus, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
	{ href: "/#features", label: "Features" },
	{ href: "/#track-record", label: "Track Record" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/#testimonials", label: "Testimonials" },
	{ href: "/#faq", label: "FAQ" },
];

const featuresList = [
	"Real-Time Crypto, Forex, US Stocks trade alerts",
	"Daily market analysis & Trade ideas",
	"Expert guidance from Pro traders",
	"Educational Materials & Trading Guides",
	"Access to exclusive Discord community",
	"24/7 Market monitoring & support",
];

const includedFeatures = [
	{
		icon: '<path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15v-3a1 1 0 011-1h2a1 1 0 011 1v3H8z"></path>',
		title: "Discord Community Access",
		description:
			"Join our exclusive Discord server with real-time alerts, market discussions, and direct access to professional traders.",
	},
	{
		icon: '<path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 009 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a4.75 4.75 0 01.332-1.973z"></path>',
		title: "Multi-Market Coverage",
		description:
			"Get signals across Crypto, Forex, and US Stock markets. Diversify your trading opportunities with expert analysis.",
	},
	{
		icon: '<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>',
		title: "Daily Analysis",
		description:
			"Receive comprehensive daily market analysis, trade setups, and economic event previews to stay ahead of the market.",
	},
	{
		icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
		title: "Proven Track Record",
		description:
			"85% win rate with transparent reporting. All results are documented and shared with the community for full transparency.",
	},
	{
		icon: '<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>',
		title: "Educational Resources",
		description:
			"Access comprehensive trading courses, strategy guides, and risk management materials to become an independent trader.",
	},
	{
		icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>',
		title: "24/7 Support",
		description:
			"Round-the-clock market monitoring and community support. Get help when you need it, regardless of your timezone.",
	},
];

const pricingFaqs = [
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and cryptocurrency payments. All transactions are processed securely through our encrypted payment gateway.",
	},
	{
		question: "Can I upgrade from monthly to yearly?",
		answer:
			"Yes! You can upgrade to the yearly plan at any time. We'll prorate your remaining monthly subscription and apply the credit to your yearly subscription, so you'll start saving immediately.",
	},
	{
		question: "Is there a free trial available?",
		answer:
			"While we don't offer a traditional free trial, you can cancel your subscription at any time with just one click. We're confident in our service quality and believe you'll see the value immediately upon joining.",
	},
	{
		question: "Do you offer refunds?",
		answer:
			"Due to the nature of our digital services and immediate access to premium content, we do not offer refunds. However, you can cancel your subscription at any time to avoid future charges. We're confident you'll find value in our service from day one.",
	},
	{
		question: "What happens if I cancel my subscription?",
		answer:
			"When you cancel, you'll continue to have access to all premium features until the end of your current billing period. After that, your access to the Discord community and premium content will be removed. You can resubscribe at any time.",
	},
];

export default function PricingPage() {
	const [plan, setPlan] = useState("yearly");
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			{/* Navigation */}
			<nav className="fixed w-full bg-nav-bg backdrop-blur-sm z-50">
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
								{navLinks.map((link) => (
									<a
										key={link.href}
										href={link.href}
										className="hover:text-green-500"
									>
										{link.label}
									</a>
								))}
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
					<a
						className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all duration-200 text-center"
						href="/pricing"
					>
						Join Now
					</a>
				</div>
			</div>

			<main className="md:ml-0">
				{/* Pricing Hero Section */}
				<section className="pt-20 pb-20">
					<div className="container mx-auto px-4 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							You've seen the results.
							<br />
							Now it's your turn
						</h1>
						<p className="text-xl mb-8">
							Join thousands of successful traders who trust our signals
						</p>
					</div>
				</section>

				{/* Main Pricing Section */}
				<section id="pricing" className="py-20">
					<div className="container mx-auto px-4 text-center">
						<div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
							<div className="flex justify-center space-x-4 mb-8">
								<button
									onClick={() => setPlan("monthly")}
									className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
										plan === "monthly"
											? "bg-green-500 text-white"
											: "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
									}`}
								>
									Monthly
								</button>
								<button
									onClick={() => setPlan("yearly")}
									className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
										plan === "yearly"
											? "bg-green-500 text-white"
											: "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
									}`}
								>
									Yearly
								</button>
							</div>

							{plan === "monthly" && (
								<div className="pricing-plan">
									<h3 className="text-2xl font-bold mb-4">Monthly Plan</h3>
									<div className="text-5xl font-bold mb-8">
										$119
										<span className="text-xl font-normal text-gray-500 dark:text-gray-400">
											/month
										</span>
									</div>
									<ul className="text-left space-y-4 mb-8">
										{featuresList.map((feature, i) => (
											<li key={i} className="flex items-center">
												<Check className="w-5 h-5 text-green-500 mr-3" />
												{feature}
											</li>
										))}
									</ul>
								</div>
							)}

							{plan === "yearly" && (
								<div className="pricing-plan">
									<h3 className="text-2xl font-bold mb-4">Yearly Plan</h3>
									<div className="text-5xl font-bold mb-4">
										$99
										<span className="text-xl font-normal text-gray-500 dark:text-gray-400">
											/month
										</span>
									</div>
									<div className="mb-8">
										<span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-semibold">
											Save $240/year
										</span>
									</div>
									<ul className="text-left space-y-4 mb-8">
										{featuresList.map((feature, i) => (
											<li key={i} className="flex items-center">
												<Check className="w-5 h-5 text-green-500 mr-3" />
												{feature}
											</li>
										))}
										<li className="flex items-center">
											<Check className="w-5 h-5 text-green-500 mr-3" />
											<span className="font-semibold">
												BONUS: Priority support & 1-on-1 consultation
											</span>
										</li>
									</ul>
								</div>
							)}

							<a
								href="#subscribe"
								className="block w-full bg-green-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300 mb-4"
							>
								Join Now
							</a>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Cancel anytime in one click • No hidden fees • Secure payment
							</p>
						</div>
					</div>
				</section>

				{/* Risk Disclaimer */}
				<section className="py-20 bg-section-bg">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto text-center">
							<h2 className="text-3xl font-bold mb-8">Risk Disclaimer</h2>
							<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-left">
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
									<strong>Important Risk Notice:</strong> Trading and investing
									in financial markets involves substantial risk of loss and is
									not suitable for all investors. You should carefully consider
									your financial situation, level of experience, and risk
									appetite before making any trading decisions.
								</p>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
									All trading signals and analysis provided are for educational
									and informational purposes only and should not be construed as
									financial advice. Past performance is not indicative of future
									results. The value of investments can go down as well as up,
									and you may lose some or all of your invested capital.
								</p>
								<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
									Before trading, please ensure you fully understand the risks
									involved and seek independent financial advice if necessary.
									Never invest money you cannot afford to lose. Data Trader
									Premium and its affiliates will not be liable for any losses
									or damages resulting from the use of the information provided.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* What You Get Section */}
				<section className="py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12">
							What's Included in Your Membership
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{includedFeatures.map((feature, i) => (
								<div key={i} className="text-center">
									<div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
										<svg
											className="w-8 h-8 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
											dangerouslySetInnerHTML={{ __html: feature.icon }}
										></svg>
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

				{/* FAQ Section */}
				<section id="pricing-faq" className="py-20 bg-section-bg">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
							Pricing FAQ
						</h2>
						<div className="max-w-3xl mx-auto space-y-4">
							{pricingFaqs.map((faq, index) => (
								<div
									key={index}
									className="faq-item bg-white dark:bg-gray-800 rounded-lg shadow-sm"
								>
									<button
										onClick={() => toggleFaq(index)}
										className="faq-question w-full px-6 py-4 text-left font-semibold text-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 text-gray-900 dark:text-gray-100"
									>
										<span className="flex-1 text-center">{faq.question}</span>
										{openFaq === index ? (
											<Minus className="w-5 h-5" />
										) : (
											<Plus className="w-5 h-5" />
										)}
									</button>
									{openFaq === index && (
										<div className="faq-answer px-6 pb-4">
											<p className="text-gray-600 dark:text-gray-300">
												{faq.answer}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Final CTA */}
				<section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-4xl font-bold text-white mb-6">
							Ready to Start Trading Like a Pro?
						</h2>
						<p className="text-xl text-green-100 mb-8">
							Join 770k+ traders who trust our signals
						</p>
						<a
							href="#subscribe"
							className="inline-block bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 mr-4"
						>
							Start Monthly Plan
						</a>
						<a
							href="#subscribe-yearly"
							className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
						>
							Save with Yearly
						</a>
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
									<a href="/#features" className="hover:text-white">
										Features
									</a>
								</li>
								<li>
									<a href="/pricing" className="hover:text-white">
										Pricing
									</a>
								</li>
								<li>
									<a href="/#track-record" className="hover:text-white">
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
									<a href="/#testimonials" className="hover:text-white">
										Testimonials
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Discord
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
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
									<a href="/#faq" className="hover:text-white">
										FAQ
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Contact
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
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
