import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SocialImpactScore from '@/components/Charts/SocialImpactScore';
import  SustainabilityScore  from '@/components/Charts/SustainabilityScore';
import TransparencyScore  from '@/components/Charts/TransparencyScore';
import  DonutChart  from '@/components/Charts/DonutChart';
import  InteractiveLinePlot  from '@/components/Charts/InteractiveLinePlot';

interface ReportTabProps {
    project: {
        project_name: string;
        description: string;
        budget: number;
        start_date: string;
        end_date: string;
        project_id: string;
        targeted_outcome: string;
        beneficiaries: string;
        important_fields: string | null;
    };
}

const ReportsTabContent = ({ project }: ReportTabProps) => {
    const [reportContent, setReportContent] = useState('');
    const [loadingReport, setLoadingReport] = useState(true);
    interface ReportSection {
        heading: string | null;
        subheading: string | null;
        content: string;
        graphMatch: string | null;
    }
    
    const [parsedReport, setParsedReport] = useState<ReportSection[]>([]);
    const [chartData, setChartData] = useState<any | null>(null);

    useEffect(() => {
        const generateReport = async () => {
            setLoadingReport(true);
            try {
               // Simulate an API response
              const simulatedReport = `
                [Project: "Vidya Kendra" - Empowering Education in Rural India]

                <HEADING_START>Problem Statement<HEADING_END>
                India faces a significant disparity in educational opportunities, particularly in rural regions characterized by low literacy rates and pervasive poverty. Many children from economically disadvantaged backgrounds are unable to access quality education due to a lack of infrastructure, qualified teachers, and financial resources. This educational gap perpetuates a cycle of poverty and limits the potential of future generations. Recent data indicates that only 35% of rural students complete secondary education, compared to 78% in urban areas. Moreover, the teacher-student ratio in rural schools is often skewed, with one teacher serving an average of 50 students, hindering personalized learning.
                <SECTION_END>

                <HEADING_START>Challenges Faced<HEADING_END>
                Addressing the educational disparity in rural India involves overcoming numerous complex challenges. Securing sustained funding for the construction and maintenance of educational centers is a critical hurdle. Attracting and retaining qualified teachers in remote areas requires competitive compensation packages and professional development opportunities. Overcoming cultural barriers and parental resistance to education, particularly for girls, is also essential. Ensuring access to essential resources such as textbooks, computers, and internet connectivity poses logistical and financial challenges. Moreover, the diverse linguistic and cultural landscape of India necessitates a localized and culturally sensitive approach to curriculum development and teaching methods.
                <SECTION_END>

                <HEADING_START>Solution<HEADING_END>
                "Vidya Kendra" is a comprehensive initiative designed to provide quality education and empower children from underprivileged backgrounds in rural India. Key components of our solution include:

                1.  **Establishment of community-based education centers:** We are constructing well-equipped education centers in underserved rural areas, providing a safe and conducive learning environment for children. These centers will be staffed by qualified teachers and equipped with modern teaching aids.
                2.  **Provision of merit-based scholarships:** We are offering merit-based scholarships to talented students from economically disadvantaged families, enabling them to pursue higher education without financial constraints. These scholarships will cover tuition fees, textbooks, and other essential educational expenses.
                3.  **Implementation of a holistic curriculum:** We are developing a comprehensive curriculum that focuses not only on academic excellence but also on character development, life skills, and vocational training. This curriculum will be tailored to the specific needs and context of rural communities.
                4.  **Community engagement and parental involvement:** We are actively engaging parents and community members in the educational process through regular meetings, workshops, and awareness campaigns. This will foster a sense of ownership and promote the value of education within the community.
                <SECTION_END>

                <HEADING_START>Beneficiaries<HEADING_END>
                The primary beneficiaries of the "Vidya Kendra" initiative are the 1000 children from low-income families residing in the five targeted rural districts. By gaining access to quality education, these children will acquire the knowledge, skills, and values necessary to break the cycle of poverty and achieve their full potential. They will also serve as role models and catalysts for change within their communities, inspiring future generations to pursue education. Moreover, the project will create local employment opportunities for teachers, administrators, and support staff.
                <SECTION_END>

                <HEADING_START>A Brief Analysis of the Impacts of the Solution<HEADING_END>
                <SUBHEADING_START>EFFECTIVENESS ASSESSMENT<SUBHEADING_END>
                The project's effectiveness will be assessed through a combination of quantitative and qualitative measures. We will track the improvement in student test scores, the increase in school enrollment rates, and the reduction in dropout rates. We will also conduct student and teacher surveys to gather feedback on the project's impact and identify areas for improvement. Key success factors include strong community support, effective teacher training, and a relevant and engaging curriculum. Challenges include addressing learning gaps among students from diverse backgrounds and ensuring the long-term sustainability of funding.
                <SECTION_END>
                <SUBHEADING_START>SCOPE & OUTREACH<SUBHEADING_END>
                The project directly benefits 1000 students in five rural districts. Indirect beneficiaries include their families, communities, and the local economy, which will benefit from a more educated and skilled workforce. The project has the potential to be scaled to other underserved regions in India. However, regional, economic, and policy constraints may limit the scope of expansion. These include variations in educational infrastructure, differing cultural contexts, and the availability of funding.
                <SECTION_END>
                <SUBHEADING_START>SOCIAL & ENVIRONMENTAL IMPACT<SUBHEADING_END>
                SDG ALIGNMENT
                This project directly aligns with Sustainable Development Goal (SDG) 4: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all." It also contributes to SDG 1: "End poverty in all its forms everywhere," SDG 5: "Achieve gender equality and empower all women and girls," and SDG 8: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all." By providing access to education, the project promotes social equity, empowers marginalized communities, and fosters sustainable development.
                <SECTION_END>
                <SUBHEADING_START>GRI SUSTAINABILITY<SUBHEADING_END>
                The project adheres to the principles of the Global Reporting Initiative (GRI) Sustainability Reporting Standards. Relevant GRI indicators include:

                - GRI 404-1: Average hours of training per year per employee
                - GRI 406-1: Incidents of discrimination and corrective actions taken
                - GRI 413-1: Local community engagement, impact assessments, and development programs
                <SECTION_END>
                <SUBHEADING_START>RECOMMENDATIONS FOR IMPROVEMENT<SUBHEADING_END>
                To further enhance the project's effectiveness and impact, we recommend:

                - Strengthening partnerships with local businesses and organizations to provide vocational training and employment opportunities for students.
                - Implementing a comprehensive monitoring and evaluation system to track student progress and identify areas for improvement.
                - Providing counseling and support services to students and their families to address social and emotional challenges.
                - Expanding the project to include early childhood education programs to provide a strong foundation for learning.
                <SECTION_END>

                <HEADING_START>Key Performance Indicators<HEADING_END>
                Overall Project Score (Weighted average of all KPIs) - 7.8/10
                Social Impact Score (Extent of positive social change) - 8.2/10
                Budget Utilization Efficiency (Effective use of allocated funds) - 7.5/10
                Beneficiary Reach & Inclusion (Diversity, inclusivity, and number of people impacted) - 8.0/10
                Stakeholder Engagement & Partnerships (Collaboration effectiveness) - 7.9/10
                Sustainability & Long-Term Viability (Likelihood of continued impact) - 7.6/10


                <GRAPH_INSERTION>Graph 0: Overall Project Score</GRAPH_INSERTION>
                <GRAPH_INSERTION>Graph 1: Social Impact Score</GRAPH_INSERTION>
                <GRAPH_INSERTION>Graph 2: Sustainability Score</GRAPH_INSERTION>
                <GRAPH_INSERTION>Graph 3: Transparency Score</GRAPH_INSERTION>
                <GRAPH_INSERTION>Graph 4: Donut Chart of Scholarship Distribution by Gender</GRAPH_INSERTION>
                <GRAPH_INSERTION>Graph 5: Interactive Line Plot of Student Performance Over Time</GRAPH_INSERTION>
                <SECTION_END>

                <HEADING_START>Expected Outcomes and Timeline<HEADING_END>
                Over the next five years, we expect to achieve the following outcomes:

                - Increase literacy rates in the targeted communities by 50%.
                - Improve school enrollment rates by 40%.
                - Reduce dropout rates by 30%.
                - Provide scholarships to 500 deserving students.
                - Establish sustainable partnerships with local businesses and organizations.
                <SECTION_END>

                <HEADING_START>Future Scope<HEADING_END>
                The project has the potential to expand to other underserved regions in India and beyond. We also plan to explore the integration of technology-enabled learning solutions to enhance the quality and accessibility of education. Additionally, we will investigate the feasibility of establishing a regional teacher training institute to develop and disseminate innovative teaching methods.
                <SECTION_END>

                <HEADING_START>Current State of the Project<HEADING_END>
                The first education center has been constructed and is fully operational, serving 200 students. We have recruited and trained qualified teachers and have launched the merit-based scholarship program. We are currently developing the holistic curriculum and engaging parents and community members in the educational process. Initial results indicate a positive impact on student attendance and engagement.
                <SECTION_END>
              `;

                setReportContent(simulatedReport);
                setLoadingReport(false);

            } catch (error) {
                console.error("Error generating report:", error);
                setReportContent("Error generating report. Please try again later.");
            } finally {
                setLoadingReport(false);
            }
        };

        generateReport();
    }, [project]);

    useEffect(() => {
        if (reportContent) {
            setParsedReport(parseReportContent(reportContent));
        }
    }, [reportContent]);

    const downloadReport = () => {
        try {
            const doc = new jsPDF();
            doc.text(`Project Report: ${project.project_name}`, 10, 10);
            doc.setFontSize(12);
            const pageWidth = doc.internal.pageSize.getWidth();
            const text = doc.splitTextToSize(reportContent, pageWidth - 20);
            doc.text(text, 10, 20);
            doc.save(`${project.project_name}_report.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            // Handle PDF generation error (e.g., display an error message)
        }
    };

    const parseReportContent = (content: string): any[] => {
        const headingStart = "<HEADING_START>";
        const headingEnd = "<HEADING_END>";
        const subheadingStart = "<SUBHEADING_START>";
        const subheadingEnd = "<SUBHEADING_END>";
        const graphInsertion = "<GRAPH_INSERTION>";
        const sectionEnd = "<SECTION_END>";

        const sections = content.split(sectionEnd);
        return sections.map((section, index) => {
            let heading = null;
            let subheading = null;
            let sectionContent = section;
            let graphMatch = null;

            const headingStartIndex = section.indexOf(headingStart);
            if (headingStartIndex !== -1) {
                const headingEndIndex = section.indexOf(headingEnd);
                if (headingEndIndex !== -1) {
                    heading = section.substring(headingStartIndex + headingStart.length, headingEndIndex).trim();
                    sectionContent = section.substring(headingEndIndex + headingEnd.length).trim();
                }
            }

            const subheadingStartIndex = sectionContent.indexOf(subheadingStart);
            if (subheadingStartIndex !== -1) {
                const subheadingEndIndex = sectionContent.indexOf(subheadingEnd);
                if (subheadingEndIndex !== -1) {
                    subheading = sectionContent.substring(subheadingStartIndex + subheadingStart.length, subheadingEndIndex).trim();
                    sectionContent = sectionContent.substring(subheadingEndIndex + subheadingEnd.length).trim();
                }
            }

            const graphStartIndex = section.indexOf(graphInsertion);
            if (graphStartIndex !== -1) {
                const graphEndIndex = section.indexOf("</GRAPH_INSERTION>");
                if (graphEndIndex !== -1) {
                    graphMatch = section.substring(graphStartIndex + graphInsertion.length, graphEndIndex).trim();
                    sectionContent = section.substring(0, graphStartIndex).trim() + section.substring(graphEndIndex + "</GRAPH_INSERTION>".length).trim();
                }
            }

            return { heading, subheading, content: sectionContent, graphMatch };
        });
    };

    return (
        <Card className="shadow-lg border border-border bg-card">
            <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
                <CardTitle className="text-xl font-bold">Project Report</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Report for <span className="font-semibold">{project.project_name}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                {loadingReport ? (
                    <p className="text-muted-foreground text-center animate-pulse">Generating report...</p>
                ) : (
                    <div>
                        {reportContent && reportContent.startsWith("[") && reportContent.includes("] ") ? (
                            <h1 className="text-2xl font-bold text-center mb-6">{reportContent.split("] ")[0].substring(1)}</h1>
                        ) : null}

                        {parsedReport.map((section, index) => (
                            <div key={index} className="mb-4">
                                {section.heading && (
                                    <h2 className="text-xl font-semibold text-primary-foreground mb-2">
                                        {section.heading}
                                    </h2>
                                )}
                                {section.subheading && (
                                    <h3 className="text-lg font-medium text-muted-foreground mb-1">
                                        {section.subheading}
                                    </h3>
                                )}

                                {/* Conditionally render chart components based on section and chartData */}
                                {section.heading === "Key Performance Indicators" && (
                                    <div className="mb-4">
                                        {/* First Row: Three Charts in a Row */}
                                        <div className="flex flex-wrap justify-between mb-4">
                                            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0 text-center">
                                                <SocialImpactScore />
                                                <p className="text-xs text-muted-foreground">Social Impact Score</p>
                                            </div>
                                            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0 text-center">
                                                <SustainabilityScore />
                                                <p className="text-xs text-muted-foreground">Sustainability Score</p>
                                            </div>
                                            <div className="w-full md:w-1/3 px-2 text-center">
                                                <TransparencyScore />
                                                <p className="text-xs text-muted-foreground">Transparency Score</p>
                                            </div>
                                        </div>

                                        {/* Second Row: DonutChart and InteractiveLinePlot */}
                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 text-center">
                                                <DonutChart />
                                                <p className="text-xs text-muted-foreground">Scholarship Distribution by Gender</p>
                                            </div>
                                            <div className="w-full md:w-1/2 px-2 text-center">
                                                <InteractiveLinePlot />
                                                <p className="text-xs text-muted-foreground">Student Performance Over Time</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {section.graphMatch && section.heading !== "Key Performance Indicators" && (
                                    <div className="text-sm text-gray-500 italic">
                                        Graph Description: {section.graphMatch}
                                    </div>
                                )}

                                {section.heading !== "Key Performance Indicators" &&(
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                                )}

                            </div>
                        ))}
                        <Button onClick={downloadReport} disabled={loadingReport}>
                            Download PDF
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ReportsTabContent;
