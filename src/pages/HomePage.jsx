import Slider from '../components/slider/Slider'
import Advantages from '../components/advantages/Advantages'
import CatalogImpressions from '../components/catalogImpressions/CatalogImpressions'
import Questions from '../components/questions/QuestionsContent'
import Sertificates from '../components/sertificates/Sertificates'

const HomePage = () => {
  return (
    <>
      <Slider/>
      <Advantages/>
      <CatalogImpressions/>
      <Sertificates/>
      <Questions/>
    </>
  )
}

export default HomePage