import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Development = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">Development</h1>

                <div className="max-w-4xl space-y-12">
                    {/* Introduction */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            True development is multifaceted, encompassing intellectual growth, skill acquisition, character formation, and spiritual maturity. Dr. Saturday T. Nbete approaches development not as a destination, but as a continuous, intentional process of becoming equipped to fulfill one's calling and maximize impact in society.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Through strategic training programmes, seminars, and organizational consulting, he provides frameworks that help individuals and institutions bridge the gap between their current reality and their ultimate potential. His development models are designed to be practical, scalable, and deeply rooted in both theological truth and sound administrative practice.
                        </p>
                    </div>

                    {/* Key Areas of Focus */}
                    <section className="pt-8">
                        <h2 className="text-2xl font-serif text-foreground mb-8">Key Areas of Focus</h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Personal Development</h3>
                                <p className="text-muted-foreground leading-relaxed">Cultivating self-awareness, discipline, and the foundational character traits necessary for sustainable success and influence in any sphere of life.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🏢</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Institutional Capacity</h3>
                                <p className="text-muted-foreground leading-relaxed">Strengthening organizational structures, governance systems, and operational frameworks to ensure churches and institutions can scale their impact without compromising their core values.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Team Dynamics</h3>
                                <p className="text-muted-foreground leading-relaxed">Building healthy, cohesive, and high-performing teams through effective communication, conflict resolution, and aligned vision.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🧠</span>
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">Strategic Leadership</h3>
                                <p className="text-muted-foreground leading-relaxed">Equipping rising leaders with the critical thinking and decision-making skills required to navigate complex challenges and lead through change.</p>
                            </div>
                        </div>
                    </section>

                    {/* Training Programs */}
                    <section className="border-t border-border pt-12 pb-8">
                        <h2 className="text-2xl font-serif text-foreground mb-6">Training & Seminars</h2>
                        <div className="bg-brand-navy text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <p className="text-lg leading-relaxed opacity-90 mb-8 max-w-2xl">
                                    Dr. Nbete regularly hosts leadership summits, clergy retreats, and organizational development workshops. These sessions are highly interactive, blending theological insight with practical case studies.
                                </p>

                                <h3 className="font-semibold text-xl mb-4">Available Formats:</h3>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded bg-blue-400" />
                                        <span>Intensive weekend retreats for executive teams</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded bg-blue-400" />
                                        <span>Multi-week leadership certification courses</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded bg-blue-400" />
                                        <span>Customized in-house organizational training</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded bg-blue-400" />
                                        <span>Keynote addresses and conference speaking</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default Development;
