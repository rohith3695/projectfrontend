import Aboutsection from "../components/AboutSection/about"
import Herosection from "../components/Herosection/herosection"
import Process from "../components/Process/process"
import Team from "../components/Team/team"
import Services from "../components/Differentsection"
import Challenges from "../components/Challenges"
import Portfolio from "../components/Portfolio/portfolio"
import DynamicSEO from "../components/DynamicSEO";

const Home = () => {
    return (
        <>
            <DynamicSEO 
                pageId="home" 
                defaultData={{ ogImage: '/How_it_works.jpeg', title: 'Home | Ryleni' }} 
            />
            <Herosection />
            <Aboutsection />
            <Team />
            <Services />
            <Challenges />
            <Process />
            <Portfolio />
        </>
    )
}

export default Home;
