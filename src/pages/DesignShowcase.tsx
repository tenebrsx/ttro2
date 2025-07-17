import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Heart,
  Star,
  Check,
  Smartphone,
  Palette,
  Type,
  Layout,
} from "lucide-react";
import Button from "../components/Button";

const DesignShowcase: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const improvements = [
    {
      icon: Smartphone,
      title: "Mobile Whitespace",
      description: "Fluid spacing that adapts naturally across all devices",
      features: [
        "clamp() based spacing",
        "Viewport-responsive margins",
        "Consistent visual rhythm",
      ],
    },
    {
      icon: Palette,
      title: "Enhanced Contrast",
      description: "WCAG AA compliant inputs and CTAs for better accessibility",
      features: [
        "High contrast inputs",
        "Improved button visibility",
        "Clear focus states",
      ],
    },
    {
      icon: Type,
      title: "Typography Consistency",
      description: "Unified font system with standardized weights and spacing",
      features: [
        "Academy Engraved headings",
        "Bodoni body text",
        "Consistent letter spacing",
      ],
    },
    {
      icon: Layout,
      title: "Brand-Aligned Design",
      description: "WhatsApp button and components match brand aesthetics",
      features: [
        "Sage green palette",
        "Elegant shadows",
        "Refined interactions",
      ],
    },
  ];

  const typographyExamples = [
    {
      class: "heading-consistent text-fluid-4xl",
      text: "Main Heading",
      type: "H1",
    },
    {
      class: "subheading-consistent text-fluid-2xl",
      text: "Elegant Subheading",
      type: "H2",
    },
    {
      class: "font-bodoni text-fluid-lg text-contrast-high",
      text: "Body text with enhanced readability",
      type: "Body",
    },
    {
      class: "font-academy text-fluid-base tracking-academy",
      text: "Academy Font Example",
      type: "Accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-400 to-cream-500">
      {/* Header */}
      <section className="mobile-section-consistent text-center">
        <div className="mobile-padding max-w-6xl mx-auto">
          <div className="mobile-heading-consistent">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-consistent text-fluid-5xl text-cocoa-500 mb-4">
                Design Refinements
              </h1>
              <p className="subheading-consistent text-fluid-xl text-sage-500 mb-6">
                Elevated from Beautiful to Brand-Transcendent
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-sage-300 to-cocoa-400 rounded-full mx-auto"></div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bodoni text-fluid-lg text-cocoa-500/80 font-medium leading-relaxed text-contrast-high max-w-4xl mx-auto mobile-content-consistent"
          >
            A comprehensive showcase of the design improvements that enhance
            usability while maintaining the warm, minimal, and handcrafted
            aesthetic that defines Cucina.
          </motion.p>
        </div>
      </section>

      {/* Improvements Grid */}
      <section className="mobile-section-consistent">
        <div className="mobile-padding max-w-6xl mx-auto">
          <h2 className="heading-consistent text-fluid-3xl text-cocoa-500 mobile-heading-consistent">
            Key Improvements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg">
            {improvements.map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-brand-medium hover:shadow-brand-strong transition-all duration-300 p-6 border border-sage-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mr-4">
                    <improvement.icon className="w-6 h-6 text-sage-600" />
                  </div>
                  <h3 className="font-academy text-fluid-xl text-cocoa-600 font-semibold tracking-wide">
                    {improvement.title}
                  </h3>
                </div>
                <p className="font-bodoni text-fluid-base text-cocoa-500/80 mb-4 text-contrast-high">
                  {improvement.description}
                </p>
                <ul className="space-y-2">
                  {improvement.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm"
                    >
                      <Check className="w-4 h-4 text-sage-500 mr-2 flex-shrink-0" />
                      <span className="font-bodoni text-cocoa-500/70 text-contrast-high">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="mobile-section-consistent bg-white/50">
        <div className="mobile-padding max-w-6xl mx-auto">
          <h2 className="heading-consistent text-fluid-3xl text-cocoa-500 mobile-heading-consistent">
            Typography System
          </h2>

          <div className="space-y-6">
            {typographyExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-brand-soft p-6 border border-sage-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-academy text-sm text-sage-600 tracking-wide uppercase">
                    {example.type}
                  </span>
                  <code className="text-xs bg-sage-50 px-2 py-1 rounded font-mono text-cocoa-600">
                    {example.class}
                  </code>
                </div>
                <div className={example.class}>{example.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Form Example */}
      <section className="mobile-section-consistent">
        <div className="mobile-padding max-w-4xl mx-auto">
          <h2 className="heading-consistent text-fluid-3xl text-cocoa-500 mobile-heading-consistent">
            Enhanced Forms & CTAs
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-brand-medium p-8 border border-sage-200"
          >
            <h3 className="font-academy text-fluid-xl text-cocoa-600 font-semibold tracking-wide mb-6 text-center">
              Contact Form Example
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-cocoa-600 mb-2 font-academy tracking-wide">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg input-high-contrast font-bodoni text-base"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cocoa-600 mb-2 font-academy tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg input-high-contrast font-bodoni text-base"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cocoa-600 mb-2 font-academy tracking-wide">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg input-high-contrast font-bodoni text-base resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Send}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Enviar Mensaje
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  icon={Heart}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Guardar Borrador
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Spacing Demo */}
      <section className="mobile-section-consistent bg-gradient-to-r from-sage-50 to-cream-100">
        <div className="mobile-padding max-w-6xl mx-auto">
          <h2 className="heading-consistent text-fluid-3xl text-cocoa-500 mobile-heading-consistent">
            Responsive Spacing System
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {["Mobile", "Tablet", "Desktop"].map((device, index) => (
              <motion.div
                key={device}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-brand-soft p-6 text-center"
              >
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-sage-600" />
                </div>
                <h4 className="font-academy text-fluid-lg text-cocoa-600 font-semibold tracking-wide mb-2">
                  {device}
                </h4>
                <p className="font-bodoni text-fluid-base text-cocoa-500/80 text-contrast-high">
                  Fluid spacing adapts naturally to provide optimal readability
                  and visual hierarchy.
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-brand-soft p-6"
          >
            <h4 className="font-academy text-fluid-lg text-cocoa-600 font-semibold tracking-wide mb-4 text-center">
              Spacing Examples
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <code className="block bg-sage-50 p-2 rounded font-mono text-cocoa-600">
                  mobile-section-consistent
                </code>
                <p className="font-bodoni text-cocoa-500/70">
                  clamp(3rem, 8vw, 5rem) vertical padding
                </p>
              </div>
              <div className="space-y-2">
                <code className="block bg-sage-50 p-2 rounded font-mono text-cocoa-600">
                  mobile-padding
                </code>
                <p className="font-bodoni text-cocoa-500/70">
                  clamp(16px, 4vw, 24px) responsive padding
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="mobile-section-consistent">
        <div className="mobile-padding max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-sage-50 to-cream-100 rounded-2xl shadow-brand-medium p-8 border border-sage-200"
          >
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-sage-600" />
            </div>

            <h2 className="heading-consistent text-fluid-3xl text-cocoa-500 mb-4">
              Brand-Transcendent Results
            </h2>

            <p className="font-bodoni text-fluid-lg text-cocoa-500/80 font-medium leading-relaxed text-contrast-high mb-6">
              These refinements successfully elevate Cucina&apos;s design while
              preserving the warm, minimal, and handcrafted aesthetic that
              defines the brand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { metric: "Mobile UX", improvement: "Enhanced" },
                { metric: "Accessibility", improvement: "WCAG AA" },
                { metric: "Brand Consistency", improvement: "Unified" },
              ].map((result, index) => (
                <div key={index} className="text-center">
                  <div className="font-academy text-fluid-xl text-sage-600 font-semibold tracking-wide">
                    {result.improvement}
                  </div>
                  <div className="font-bodoni text-fluid-base text-cocoa-500/70">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FloatingActionButton is included globally */}
    </div>
  );
};

export default DesignShowcase;
