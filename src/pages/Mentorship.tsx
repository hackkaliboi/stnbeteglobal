import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Mentorship = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">Mentorship</h1>

                <div className="max-w-4xl space-y-12">
                    {/* Introduction */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            <strong className="text-foreground font-medium">Dr. Saturday T. Nbete</strong> is deeply committed to mentorship as a strategic instrument for raising principled, competent, and spiritually mature leaders. As an Anglican Archdeacon/Rector and former Clerical Synod Secretary in the Diocese of Niger Delta North, he has intentionally invested over three decades in mentoring clergy, church workers, emerging leaders, academics, and institutional administrators within and beyond the Anglican Communion.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            For Dr. Nbete, mentorship is not merely advisory, it is transformational. It is the deliberate transmission of character, wisdom, discipline, spiritual depth, and leadership competence from one generation to another. His mentoring approach integrates theological scholarship, practical ministry experience, governance insight, and personal accountability. With dual doctoral qualifications in Christian Education & Leadership and New Testament Studies, he offers mentees both intellectual rigour and spiritual formation.
                        </p>
                    </div>

                    {/* Philosophy */}
                    <section>
                        <h2 className="text-2xl font-serif text-foreground mb-6">His Mentorship Philosophy</h2>
                        <p className="text-muted-foreground mb-8">Dr. Nbete’s mentorship model is built on five core pillars:</p>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="bg-muted/50 p-6 rounded-xl border border-border">
                                <h3 className="font-semibold text-foreground mb-2">Character Before Competence</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Leadership influence flows from integrity. He prioritizes moral credibility, spiritual authenticity, and disciplined living as foundational to sustainable leadership.</p>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-xl border border-border">
                                <h3 className="font-semibold text-foreground mb-2">Clarity of Calling and Vision</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">He guides mentees to discover, refine, and align their calling with strategic vision, ensuring purpose-driven leadership rather than position-driven ambition.</p>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-xl border border-border">
                                <h3 className="font-semibold text-foreground mb-2">Strategic Thinking and Systems Development</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Drawing from his extensive work in church governance and institutional strengthening, he mentors leaders to think structurally—building systems that outlive personalities.</p>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-xl border border-border">
                                <h3 className="font-semibold text-foreground mb-2">Spiritual Depth and Theological Soundness</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Rooted in Scripture and Anglican tradition, his mentorship emphasizes doctrinal depth, liturgical appreciation, and balanced spirituality.</p>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-xl border border-border md:col-span-2">
                                <h3 className="font-semibold text-foreground mb-2">Sustainable Growth and Legacy Building</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">His focus is not short-term success but generational impact—raising leaders who will build institutions that endure.</p>
                            </div>
                        </div>
                    </section>

                    {/* Scope of Engagement */}
                    <section className="border-t border-border pt-12">
                        <h2 className="text-2xl font-serif text-foreground mb-6">Scope of Mentorship Engagement</h2>
                        <p className="text-muted-foreground mb-6">Dr. Nbete’s mentorship engagements extend across:</p>
                        <ul className="space-y-3 mb-8">
                            {[
                                "Clergy formation and ministerial effectiveness",
                                "Leadership development for church workers and administrators",
                                "Academic and theological research guidance",
                                "Governance and policy advisory for church institutions",
                                "Strategic renewal and organizational restructuring",
                                "Personal leadership coaching for emerging leaders"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-muted-foreground italic">
                            He has served across denominational lines, mentoring leaders in ecumenical and interdenominational contexts, reflecting his broad leadership exposure beyond Anglican climes.
                        </p>
                    </section>

                    {/* Methodology */}
                    <section className="border-t border-border pt-12">
                        <h2 className="text-2xl font-serif text-foreground mb-6">Methodology</h2>
                        <p className="text-muted-foreground mb-6">His mentorship process includes:</p>
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {[
                                "Structured one-on-one mentoring sessions",
                                "Leadership assessment and development frameworks",
                                "Strategic goal-setting and accountability systems",
                                "Reading and research guidance",
                                "Institutional leadership immersion and exposure",
                                "Practical ministry coaching and feedback"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg border border-border/50">
                                    <div className="w-2 h-2 rounded bg-brand-navy" />
                                    <span className="text-sm font-medium text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted-foreground">
                            Each mentoring relationship is tailored to the individual’s calling, capacity, and context, ensuring relevance and measurable growth.
                        </p>
                    </section>

                    {/* Impact and Legacy */}
                    <section className="border-t border-border pt-12 pb-8">
                        <h2 className="text-2xl font-serif text-foreground mb-6">Impact and Legacy</h2>
                        <p className="text-muted-foreground mb-6">Through intentional mentorship, Dr. Nbete has contributed to:</p>
                        <ul className="space-y-3 mb-8">
                            {[
                                "The emergence of confident and effective clergy",
                                "Strengthened governance systems within church institutions",
                                "Renewed ministry structures and strategic planning models",
                                "A growing network of principled leaders serving in various sectors"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-brand-navy text-white p-8 rounded-2xl shadow-xl mt-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl mix-blend-screen" />
                            <p className="text-lg leading-relaxed relative z-10 font-light opacity-90 mb-6">
                                His lifelong dedication to mentorship reflects his conviction that leadership is stewardship, and stewardship must be transferred. By investing in people, he ensures that leadership excellence, spiritual depth, and institutional strength will continue across generations.
                            </p>
                            <p className="text-lg leading-relaxed relative z-10 font-medium pb-2">
                                Dr. Saturday T. Nbete’s mentorship platform stands as a catalyst for raising leaders of integrity, competence, and lasting influence—leaders equipped not only to succeed, but to build institutions that will serve the Church and society with purpose and distinction for decades to come.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default Mentorship;
