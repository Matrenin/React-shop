import Slider from '../components/slider/Slider'
import Advantages from '../components/advantages/Advantages'
import CatalogHomePage from '../components/catalogImpressions/CatalogHomePage'
import Questions from '../components/questions/QuestionsContent'
import Sertificates from '../components/sertificates/Sertificates'
import Stocksslider from '../components/stocksslider/Stocksslider'

const HomePage = () => {
  return (
    <>
      <Slider/>
      <Advantages/>
      <CatalogHomePage/>
      <Stocksslider/>
      <Sertificates/>
      <Questions/>
    </>
  )
}

export default HomePage