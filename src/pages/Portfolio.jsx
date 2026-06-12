import PortfolioContent from "../components/Portfolio/portfolio"
import DynamicSEO from '../components/DynamicSEO';

const Portfolio = () => {
    return (
        <div className="pt-24 min-h-screen">
            <DynamicSEO 
                pageId="portfolio" 
                defaultData={{ ogImage: '/Portfolio.jpeg', title: 'Portfolio | Ryleni' }} 
            />
            <PortfolioContent />
        </div>
    )
}

export default Portfolio;
