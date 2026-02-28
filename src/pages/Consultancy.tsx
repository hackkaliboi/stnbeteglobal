import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Consultancy = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">Consultancy</h1>

                <div className="max-w-4xl space-y-12">
                    {/* Introduction */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            <strong className="text-foreground font-medium">Dr. Saturday T. Nbete</strong> offers expert consultancy services to churches, para-church organisations, educational institutions, and leadership bodies seeking to strengthen their governance, renew their vision, and build sustainable structures for long-term impact.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            With dual doctoral qualifications in Christian Education & Leadership and New Testament Studies, combined with decades of hands-on administrative and pastoral experience within the Anglican Communion, Dr. Nbete brings a uniquely qualified perspective to organisational challenges in ministry and institutional settings.
                        </p>
                    </div>

                    {/* Services */}
                    <section className="pt-4">
                        <h2 className="text-2xl font-serif text-foreground mb-8">Consultancy Services</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">⛪</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Church Governance & Renewal</h3>
                                <p className="text-muted-foreground leading-relaxed">Reviewing and strengthening governance systems, constitutions, and operational frameworks to help church bodies become more transparent, effective, and aligned with their founding values.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Strategic Planning</h3>
                                <p className="text-muted-foreground leading-relaxed">Facilitating vision-setting and strategic planning sessions that align leadership teams, clarify priorities, and map out concrete pathways for measurable, sustainable growth.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🎓</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Educational Institution Advisory</h3>
                                <p className="text-muted-foreground leading-relaxed">Providing guidance to seminaries, theological colleges, and Christian schools on curriculum design, leadership formation, and institutional policy development.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Conflict Resolution & Mediation</h3>
                                <p className="text-muted-foreground leading-relaxed">Offering structured mediation and reconciliation processes for churches and institutions navigating internal conflict, leadership transitions, or doctrinal disputes.</p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="border-t border-border pt-12 pb-8">
                        <div className="bg-brand-navy text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-light mb-4">Ready to Work Together?</h3>
                                <p className="text-lg leading-relaxed opacity-90 mb-8 max-w-2xl">
                                    Each consultancy engagement is uniquely tailored to the context, needs, and goals of the organisation. Dr. Nbete works collaboratively with leadership teams to co-create practical, implementable solutions.
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-white text-brand-navy font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default Consultancy;
