import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LeadershipAndDevelopment = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">
                    Leadership &amp; Development
                </h1>

                <div className="max-w-4xl space-y-12">
                    {/* Leadership Introduction */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif text-foreground">Leadership</h2>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            <strong className="text-foreground font-medium">Dr. Saturday T. Nbete</strong> is a seasoned Christian leader, Anglican Archdeacon/Rector, and has served as Clerical Synod Secretary in the Diocese of Niger Delta North, with over three decades of proven leadership in ministry, education, and institutional development. With dual doctoral qualifications in Christian Education &amp; Leadership and New Testament Studies, he brings a rare blend of theological depth, administrative wisdom, and transformational leadership insight to the church and society. He has served as pastor outside the Anglican climes in ecumenical and interdenominational churches.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Renowned for his passion for leadership development, Dr. Nbete is committed to raising principled, effective, and spiritually grounded leaders for the Church and beyond. His leadership philosophy is rooted in character formation, strategic thinking, innovation, and sustainable growth. He has demonstrated this through mentoring clergy, training church workers, designing renewal programmes, and strengthening governance systems within the Anglican context and other institutional settings.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Through his leadership platform, he delivers strategic and innovative leadership development training programmes for individuals, organisations, churches, para-church ministries, and institutions. These programmes are designed to cultivate clarity of vision, strengthen systems and structures, build healthy teams, and produce measurable growth and long-term impact.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            A published author, trainer, and thought leader, Dr. Nbete equips leaders to navigate complex ministry and organisational environments with integrity, competence, and excellence. His work in leadership training, church renewal, and governance reflects a lifelong dedication to building leaders and institutions that will outlive their founders and serve generations with purpose and distinction.
                        </p>
                    </div>

                    {/* Development Section */}
                    <section className="border-t border-border pt-12">
                        <h2 className="text-2xl font-serif text-foreground mb-8">Development</h2>
                        <div className="space-y-6 mb-12">
                            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                                True development is multifaceted, encompassing intellectual growth, skill acquisition, character formation, and spiritual maturity. Dr. Nbete approaches development not as a destination, but as a continuous, intentional process of becoming equipped to fulfill one's calling and maximize impact in society.
                            </p>
                            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                                Through strategic training programmes, seminars, and organizational consulting, he provides frameworks that help individuals and institutions bridge the gap between their current reality and their ultimate potential. His development models are designed to be practical, scalable, and deeply rooted in both theological truth and sound administrative practice.
                            </p>
                        </div>

                        {/* Key Areas */}
                        <h3 className="text-xl font-medium text-foreground mb-6">Key Areas of Focus</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <h4 className="text-xl font-medium text-foreground mb-3">Personal Development</h4>
                                <p className="text-muted-foreground leading-relaxed">Cultivating self-awareness, discipline, and the foundational character traits necessary for sustainable success and influence in any sphere of life.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🏢</span>
                                </div>
                                <h4 className="text-xl font-medium text-foreground mb-3">Institutional Capacity</h4>
                                <p className="text-muted-foreground leading-relaxed">Strengthening organizational structures, governance systems, and operational frameworks to ensure churches and institutions can scale their impact without compromising their core values.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h4 className="text-xl font-medium text-foreground mb-3">Team Dynamics</h4>
                                <p className="text-muted-foreground leading-relaxed">Building healthy, cohesive, and high-performing teams through effective communication, conflict resolution, and aligned vision.</p>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border hover:border-brand-navy/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                                    <span className="text-2xl">🧠</span>
                                </div>
                                <h4 className="text-xl font-medium text-foreground mb-3">Strategic Leadership</h4>
                                <p className="text-muted-foreground leading-relaxed">Equipping rising leaders with the critical thinking and decision-making skills required to navigate complex challenges and lead through change.</p>
                            </div>
                        </div>
                    </section>

                    {/* Training Programs */}
                    <section className="border-t border-border pt-12 pb-8">
                        <h2 className="text-2xl font-serif text-foreground mb-6">Training &amp; Seminars</h2>
                        <div className="bg-brand-navy text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <p className="text-lg leading-relaxed opacity-90 mb-8 max-w-2xl">
                                    Dr. Nbete regularly hosts leadership summits, clergy retreats, and organizational development workshops. These sessions are highly interactive, blending theological insight with practical case studies.
                                </p>
                                <h3 className="font-semibold text-xl mb-4">Available Formats:</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Intensive weekend retreats for executive teams",
                                        "Multi-week leadership certification courses",
                                        "Customized in-house organizational training",
                                        "Keynote addresses and conference speaking"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded bg-blue-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default LeadershipAndDevelopment;
