import { getApplicationList, writeUserApplicationStatus, writeApplicationStatusAdmin } from '../../../services/firebase'
import { useState, useEffect } from 'react'
import './applicationManagement.scss'
import Pagination from '../../../components/pagination/Pagination';

const ApplicationManagementAdmin = () => {
  const [list, setList] = useState({})
  const [arrowOne, setArrowOne] = useState("")
  const [arrowTwo, setArrowTwo] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(10)

  useEffect(() => {
    getApplicationList()
      .then(data => {
        setList(data)
      })
  }, [])

  function filterForDate() {
    const array = Object.entries(list)
    const arrayList = array.map(e => Object.entries(e)).filter(e => e[1][1].date)//filter- чтобы исключить заявки без дат
    if (Date.parse(arrayList[0][1][1].date) >= Date.parse(arrayList[arrayList.length - 1][1][1].date)) {
      const sortList = arrayList.sort((a, b) => Date.parse(a[1][1].date) - Date.parse(b[1][1].date))
      setList(Object.fromEntries(sortList.map(e => Object.fromEntries(e))))
      setArrowOne("1")
    } else {
      const sortList = arrayList.sort((a, b) => Date.parse(b[1][1].date) - Date.parse(a[1][1].date))
      setList(Object.fromEntries(sortList.map(e => Object.fromEntries(e))))
      setArrowOne("2")
    }
  }

  function filterForStatus() {
    const arrayList = Object.entries(list)

    const mapping = arrayList.map((e) => {
      if ("status" in e[1]) {
        if (e[1].status.status === "В обработке") {
          e[1].controlIndex = "1"
        }
        if (e[1].status.status === "Отменить") {
          e[1].controlIndex = "3"
        }
        if (e[1].status.status === "Завершена") {
          e[1].controlIndex = "4"
        }
      } else {
        e[1].controlIndex = "2"
      }
      return e
    })
    if (mapping[0][1].controlIndex > mapping[mapping.length - 1][1].controlIndex) {
      const sortList = mapping.sort((a, b) => a[1].controlIndex - b[1].controlIndex)
      setList(Object.fromEntries(sortList))
      setArrowTwo("1")
    } else {
      const sortList = mapping.sort((a, b) => b[1].controlIndex - a[1].controlIndex)
      setList(Object.fromEntries(sortList))
      setArrowTwo("2")
    }

  }

  const handleStatusAdmin = (e, key) => {
    const idApplication = key
    writeApplicationStatusAdmin(idApplication, e.target.value)
  }

  // пагинация
  const lastCountryIndex = currentPage * countriesPerPage
  const firstCountryIndex = lastCountryIndex - countriesPerPage
  const totalCoutries = Object.keys(list).length
  const currentCountry = Object.entries(list).slice(firstCountryIndex, lastCountryIndex)
  const currentCountryList = Object.fromEntries(currentCountry)
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <>
      <div className='applicationManagmentAdminFilter'>
        <div className='applicationManagmentAdminFilter__title' >Сортировать:</div>
        <div className='applicationManagmentAdminFilter__radioBox'>
          <label htmlFor="radioDown">
            <button id="radioDown" className='radio' name="radio"
              onClick={filterForDate} >
              {arrowOne === "1" && <span className='arrow'> &#9650;</span>}
              {arrowOne === "2" && <span className='arrow'> &#9660;</span>}
              {arrowOne === "" && <span> </span>}
            </button>
            <span>  по дате </span>
          </label>
        </div>
        <div className='applicationManagmentAdminFilter__radioBox'>
          <label htmlFor="radioUp" >
            <button id="radioDown" className='radio' name="radio"
              onClick={filterForStatus} >
              {arrowTwo === "1" && <span className='arrow'> &#9650;</span>}
              {arrowTwo === "2" && <span className='arrow'> &#9660;</span>}
              {arrowTwo === "" && <span> </span>}
            </button>
            <span>по статусу</span>
          </label>
        </div>
      </div>
      <div className="applicationManagmentAdmin">
        {Object.keys(currentCountryList).map((key, i) => (
          <div className="applicationManagmentAdmin__item" key={key}>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title borderLeft">№ заказа</div>
              <div className="applicationManagmentAdmin__item_iner-key">{(currentPage-1)*10+1+i}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">Дата</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].date}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">Название</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].card?.name}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">Id пользователя</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].userId}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">Имя</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].name}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">Телефон</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].phone}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">E-mail</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].email}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title">Статус</div>
              <div className="applicationManagmentAdmin__item_iner-key">{list[key].status?.status}</div>
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title borderRight">Комментарий</div>
              <div className="applicationManagmentAdmin__item_iner-key">
              
              <textarea className="applicationManagmentAdmin__item_iner-key-input"
                type='text' 
                onBlur={(e) => handleStatusAdmin(e, key)}
                placeholder='Введите...'
                defaultValue={list[key].statusAdmin?.statusAdmin}
            ></textarea>
              </div>
            </div>
          </div>
        ))}
         <Pagination
            countriesPerPage={countriesPerPage}
            totalCoutries={totalCoutries}
            paginate={paginate}
            currentPage={currentPage}
          />
      </div>
     
    </>
  )
}

export default ApplicationManagementAdmin