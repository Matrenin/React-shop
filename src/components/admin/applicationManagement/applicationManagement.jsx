import { getApplicationList, writeUserApplicationStatus, writeApplicationStatusAdmin } from '../../../services/firebase'
import { useState, useEffect } from 'react'
import './applicationManagement.scss'

const ApplicationManagementAdmin = () => {
  const [list, setList] = useState({})
  const [arrowOne, setArrowOne] = useState("")
  const [arrowTwo, setArrowTwo] = useState("")

  useEffect(() => {
    getApplicationList()
      .then(data => {
        setList(data)
      })
  }, [])

  function filterForDate() {
    const arrayList = Object.values(list)
    if (Date.parse(arrayList[0].date) >= Date.parse(arrayList[arrayList.length - 1].date)) {
      const sortList = arrayList.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      setList(Object.assign(sortList))
      setArrowOne("1")
    } else {
      const sortList = arrayList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      setList(Object.assign(sortList))
      setArrowOne("2")
    }
  }

  function filterForStatus() {
    console.log(list);
    const arrayList = Object.values(list)
    const mapping = arrayList.map((e) => {
      console.log(e.status);
      if ("status" in e) {
        if (e.status.status === "В обработке") {
          e.controlIndex = "1"
        }
        if (e.status.status === "Отменить") {
          e.controlIndex = "3"
        }
        if (e.status.status === "Завершена") {
          e.controlIndex = "4"
        }
      } else {
        e.controlIndex = "2"
      }
      return e
    })
    console.log(mapping);
    if (mapping[0].controlIndex > mapping[mapping.length - 1].controlIndex) {
      const sortList = mapping.sort((a, b) => a.controlIndex - b.controlIndex)
      setList(Object.assign(sortList))
      setArrowTwo("1")
    } else {
      const sortList = mapping.sort((a, b) => b.controlIndex - a.controlIndex)
      setList(Object.assign(sortList))
      setArrowTwo("2")
    }
  }

  const handleStatusAdmin = (e, key) => {
    const idApplication = key
    writeApplicationStatusAdmin(idApplication, e.target.value)
  }

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
        {Object.keys(list).map((key, i) => (
          <div className="applicationManagmentAdmin__item" key={key}>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title borderLeft">№</div>
              <div className="applicationManagmentAdmin__item_iner-key">{i + 1}</div>
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
              {(list[key].status?.status === "В обработке" && <div className="applicationManagmentAdmin__item_iner-key yellow">{list[key].status?.status}</div>) ||
                (list[key].status?.status === "Отменить" && <div className="applicationManagmentAdmin__item_iner-key rose">{list[key].status?.status}</div>) ||
                (list[key].status?.status === `Завершена` && <div className="applicationManagmentAdmin__item_iner-key green">{list[key].status?.status}</div>) ||
                (list[key].status?.status === undefined && <div className="applicationManagmentAdmin__item_iner-key ">{list[key].status?.status}</div>)}
            </div>
            <div className="applicationManagmentAdmin__item_iner">
              <div className="applicationManagmentAdmin__item_iner-title borderRight">Комментарий</div>
              <div className="applicationManagmentAdmin__item_iner-key">

                <textarea className="applicationManagmentAdmin__item_iner-key-input"
                  type='text'
                  onBlur={(e) => handleStatusAdmin(e, key)}
                  placeholder='Введите...'
                  defaultValue={list[key].statusAdmin?.statusAdmin?.statusAdmin}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ApplicationManagementAdmin