import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Leadership = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-24 min-h-[70vh]">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-12 tracking-tight">Leadership</h1>
                <div className="max-w-3xl space-y-8">
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                        <strong className="text-foreground font-medium">Dr. Saturday T. Nbete</strong> is a seasoned Christian leader, Anglican Archdeacon/Rector, and has served as Clerical Synod Secretary in the Diocese of Niger Delta North, with over three decades of proven leadership in ministry, education, and institutional development. With dual doctoral qualifications in Christian Education & Leadership and New Testament Studies, he brings a rare blend of theological depth, administrative wisdom, and transformational leadership insight to the church and society. He has served as pastor outside the Anglican climes in ecumenical and interdenominational churches.
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
            </div>
        </MainLayout>
    );
};

export default Leadership;
