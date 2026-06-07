import PortfolioContent from "../components/Portfolio/portfolio"
import { Helmet } from "react-helmet-async"

const Portfolio = () => {
    return (
        <div className="pt-24 min-h-screen">
            <Helmet>
                <meta property="og:image" content="/Portfolio.jpeg" />
            </Helmet>
            <PortfolioContent />
        </div>
    )
}

export default Portfolio;
