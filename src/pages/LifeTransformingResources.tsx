import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LifeTransformingResources = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">Life-transforming<br /><span className="italic font-serif text-brand-navy dark:text-blue-400">Resources</span></h1>

                <div className="max-w-4xl space-y-12">
                    {/* Introduction */}
                    <div className="space-y-6">
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Knowledge is the catalyst for transformation. At STNBETE Global, we curate, publish, and distribute resources designed to renew the mind, equip the spirit, and empower the hands for effective service.
                        </p>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                            Drawing from decades of pastoral experience, academic research, and leadership practice, Dr. Saturday T. Nbete has authored materials that serve as practical guides for navigating modern challenges with timeless wisdom. These resources range from comprehensive books to study guides and audio teachings.
                        </p>
                    </div>

                    {/* Categories */}
                    <section className="pt-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Category 1 */}
                            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-950 flex items-center justify-center">
                                    <span className="text-4xl">📚</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-semibold mb-2">Books & Publications</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        In-depth explorations of theological concepts, leadership principles, and practical Christian living.
                                    </p>
                                    <Link to="/books" className="text-sm text-brand-navy font-medium hover:underline inline-flex items-center">
                                        Browse Books <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                                    </Link>
                                </div>
                            </div>

                            {/* Category 2 */}
                            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-32 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-950 flex items-center justify-center">
                                    <span className="text-4xl">📖</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-semibold mb-2">Study Guides</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        Structured materials for group study, pastoral training, and personal devotional time.
                                    </p>
                                    <span className="text-sm text-muted-foreground font-medium italic">Available upon request</span>
                                </div>
                            </div>

                            {/* Category 3 */}
                            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-950 flex items-center justify-center">
                                    <span className="text-4xl">🎧</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-semibold mb-2">Audio & Video</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        Recorded seminars, retreat sessions, and teachings from various leadership platforms.
                                    </p>
                                    <span className="text-sm text-muted-foreground font-medium italic">Coming soon via podcast</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Themes */}
                    <section className="border-t border-border pt-12 pb-8">
                        <h2 className="text-2xl font-serif text-foreground mb-8">Core Themes Explored</h2>

                        <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground mb-1">Church Governance</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">Navigating the administrative and spiritual complexities of leading large congregations and diocesan structures.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground mb-1">New Testament Ethics</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">Applying first-century biblical principles to twenty-first-century moral and ethical dilemmas.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground mb-1">Organizational Leadership</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">Strategies for leading change, managing transition, and building resilient teams across generations.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground mb-1">Spiritual Formation</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">Practical disciplines for deep character growth, prayer, and sustained passion in ministry over the long haul.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};

export default LifeTransformingResources;
