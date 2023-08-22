import { Link } from "react-router-dom";
import { useRef, useState } from "react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

// components
import Wrapper from "../Wrapper"
import Registration from "../Registration";
import { Switch, Route } from "react-router-dom";

// images
import Settings from "../../assets/images/filter.svg";
import Search from "../../assets/images/search.svg"
import Close from "../../assets/images/button_close.svg"
import Expand_more from "../../assets/images/expand_more.svg"
import Gavel from "../../assets/images/gavel.svg"
import Next from "../../assets/images/navigate_next.svg"
import Prev from "../../assets/images/navigate_prev.svg"
import Download from "../../assets/images/file_download.svg"


function AdministrativeWork(){
  const leftRef = useRef()
  const closeRefImg = useRef()

  function closeLeft(){
    leftRef.current.classList.toggle("left--close");
    closeRefImg.current.classList.toggle("--close")
  }
  
  return(
    <div className="AdminstrativeWork">
      <header>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link to={"/admin/main"}>
            Электрон кабул
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/registration"}>
            Руйхатга олиш
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/distribution"}>
            Таксимаш
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/restoration-work"}>Иш юритишни тиклаш</Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/accept-result"}>Натижани кабул килиш</Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/redistribution"}>Кайта таксимлаш</Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/deleted"}>Учирилган</Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/admin/main/rejected"}>Рад этилган</Link>
        </SwiperSlide>
      </Swiper>
      </header>
      <Switch>
        <Route path={"/admin/main"} exact>
          <div className="wrap">
            <div ref={leftRef} className="left">
              <div>
                <div className="search-wrap">
                  <button>
                    <img src={Settings} alt="" width={24} height={24} />
                  </button>
                  <div className="input">
                    <input type="text" id="search_id" placeholder="Поиск"/>
                    <label htmlFor="search_id">
                      <img src={Search} alt="" />
                    </label>
                  </div>
                </div>
                <ul className="items">
                  <li className="item">
                    <div className="dates">
                      <div className="date-1">1-2676-2021/5677</div>
                      <div className="date-2">
                        <img src={Download} alt="" />
                         12.02.2021</div>
                      <div className="date-3">
                        <img src={Gavel} alt="" />
                        12.02.2021 - 12:00
                      </div>
                    </div>
                    <div className="title">10- Сайлов комиссиясининг харакатлари низолаш тугрисида</div>
                    <span className="info-green">
                      Тулик канаотлантирилган
                    </span>
                  </li>
                  <li className="item">
                    <div className="dates">
                      <div className="date-1">1-2676-2021/5677</div>
                      <div className="date-2">
                        <img src={Download} alt="" />
                         12.02.2021</div>
                      <div className="date-3">
                        <img src={Gavel} alt="" />
                        12.02.2021 - 12:00
                      </div>
                    </div>
                    <div className="title">10- Сайлов комиссиясининг харакатлари низолаш тугрисида</div>
                    <span className="info-green">
                      Тулик канаотлантирилган
                    </span>
                  </li>
                  <li className="item">
                    <div className="dates">
                      <div className="date-1">1-2676-2021/5677</div>
                      <div className="date-2">
                        <img src={Download} alt="" />
                         12.02.2021</div>
                      <div className="date-3">
                        <img src={Gavel} alt="" />
                        12.02.2021 - 12:00
                      </div>
                    </div>
                    <div className="title">10- Сайлов комиссиясининг харакатлари низолаш тугрисида</div>
                    <span className="info-green">
                      Тулик канаотлантирилган
                    </span>
                  </li>
                  <li className="item">
                    <div className="dates">
                      <div className="date-1">1-2676-2021/5677</div>
                      <div className="date-2">
                        <img src={Download} alt="" />
                         12.02.2021</div>
                      <div className="date-3">
                        <img src={Gavel} alt="" />
                        12.02.2021 - 12:00
                      </div>
                    </div>
                    <div className="title">10- Сайлов комиссиясининг харакатлари низолаш тугрисида</div>
                    <span className="info-green">
                      Тулик канаотлантирилган
                    </span>
                  </li>
                  <li className="item">
                    <div className="dates">
                      <div className="date-1">1-2676-2021/5677</div>
                      <div className="date-2">
                        <img src={Download} alt="" />
                         12.02.2021</div>
                      <div className="date-3">
                        <img src={Gavel} alt="" />
                        12.02.2021 - 12:00
                      </div>
                    </div>
                    <div className="title">10- Сайлов комиссиясининг харакатлари низолаш тугрисида</div>
                    <span className="info-green">
                      Тулик канаотлантирилган
                    </span>
                  </li>
                  <li className="item">
                    <div className="dates">
                      <div className="date-1">1-2676-2021/5677</div>
                      <div className="date-2">
                        <img src={Download} alt="" />
                         12.02.2021</div>
                      <div className="date-3">
                        <img src={Gavel} alt="" />
                        12.02.2021 - 12:00
                      </div>
                    </div>
                    <div className="title">10- Сайлов комиссиясининг харакатлари низолаш тугрисида</div>
                    <span className="info-green">
                      Тулик канаотлантирилган
                    </span>
                  </li>
                </ul>
                <div className="navigate-wrap">
                  <p className="text">(7 тадан 7)</p>
                  <div className="navigate-wrap">
                    <button>
                      <img src={Prev} alt="" />
                    </button>
                    <span className="display">1</span>
                    <button>
                      <img src={Next} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-close-left" onClick={closeLeft}>
              <img ref={closeRefImg}  src={Close} alt="" />
            </button>
            <div className="right">
              <div className="render-content">
                <Wrapper>
                  <div className="right_top--main-title">
                    Маъмурий низо - Биринчи инстанция
                  </div>
                  <div style={{marginBottom: "16px", display: "flex",alignItems: "center", justifyContent: "space-between" }}>
                    <ul className="right_top--items">
                      <li className="right_top--item">
                        <div className="right_top--title">
                          Хужжат номери
                        </div>
                        <div className="content">
                          1234567890
                        </div>
                      </li>
                      <li className="right_top--item">
                        <div className="right_top--title">
                          Хужжат санаси
                        </div>
                        <div className="content">
                          12.02.2021
                        </div>
                      </li>
                      <li className="right_top--item">
                        <div className="right_top--title">
                          Кирим санаси
                        </div>
                        <div className="content">
                          12.02.2021
                        </div>
                      </li>
                      <li className="right_top--item">
                        <div className="right_top--title">
                          Жунатиш тури
                        </div>
                        <div className="content">
                          Почта
                        </div>
                      </li>
                      <li className="right_top--item">
                        <div className="right_top--title">
                          Манфаатдор идора
                        </div>
                        <div className="content">
                          Идоранинг номи
                        </div>
                      </li>
                    </ul>
                    <button className="right_top--btn">Тулик куриш</button>
                  </div>
                </Wrapper>
                <Wrapper>
                  <div className="right_bottom--main-title">
                    Ариза (Шикоят) мазмуни
                  </div>
                  <div className="table-header">
                    <div className="number">№</div>
                    <div className="title-wrap">
                      <div className="column">Иш туркуми</div>
                      <div className="column">Кушимча иш туркуми</div>
                      <div className="column">Иккиламчи иш туркуми</div>
                    </div>
                  </div>
                  <div className="table-body">
                    <TableTr />
                    <TableTr />
                    <TableTr />
                  </div>
                </Wrapper>
              </div>
              <div className="buttons-wrap">
                <button type="button">Иш муддатини узайтириш</button>
                <button type="button">Кайта таксимлаш</button>
                <button type="button">Учириш</button>
              </div>
            </div>
          </div>
        </Route>
        <Route path={"/admin/main/registration"}><h1 style={{textAlign: "center"}}>Registration</h1></Route>
        <Route path={"/admin/main/distribution"}><h1 style={{textAlign: "center"}}>Distribution</h1></Route>
        <Route path={"/admin/main/restoration-work"}><h1 style={{textAlign: "center"}}>Restoration of office work</h1></Route>
        <Route path={"/admin/main/accept-result"}><h1 style={{textAlign: "center"}}>Accept the result</h1></Route>
        <Route path={"/admin/main/redistribution"}><h1 style={{textAlign: "center"}}>Redistribution</h1></Route>
        <Route path={"/admin/main/deleted"}><h1 style={{textAlign: "center"}}>Deleted</h1></Route>
        <Route path={"/admin/main/rejected"}><h1 style={{textAlign: "center"}}>Rejected</h1></Route>
      </Switch>
    </div>
  )
}

function TableTr(){
  const columnsRef = useRef()
  const columnsBtnImgRef = useRef()
  const [expand, setExpand] = useState(false)
    

  function closeTopTable(){
    const height = columnsRef.current?.scrollHeight+ "px"
    columnsRef.current.style.height = height;
    columnsBtnImgRef.current.classList.toggle("expand_more-btn--close")
      if (expand) {
          columnsRef.current.style.height = 0;
          setExpand(false)
      } else {
        columnsRef.current.style.height = height+"px";
          setExpand(true)
      }

    }
  return(
    <div className="tr">
      <div className="number">1</div>
      <div className="content-wrap">
        <div className="titles-wrap">
          <div className="title">10-Сайлов комиссияларнинг харакатлари низолашиш тугрисида</div>
          <div className="title">2.2 - Маъмурий орган, фукаролар узини узи бошкариш органларининг ва...</div>
          <div className="title">2.2 - Маъмурий орган, фукаролар узини узи бошкариш органл...</div>
        </div>
        <div ref={columnsRef} className={`columns`}>
          <div className="column">
            <div className="col">
              <div className="col-title">
                Карор раками
              </div>
              <div className="col-text">
                1234567890
              </div>
            </div>
            <div className="col">
              <div className="col-title">
                Карор санаси
              </div>
              <div className="col-text">
                12.03.2021
              </div>
            </div>
          </div>
          <div className="column">
            <div className="col">
              <div className="col-title">
                Карор кучга кирган сана
              </div>
              <div className="col-text">
                12.03.2021
              </div>
            </div>
            <div className="col">
              <div className="col-title">
                Бекор килиш учун асос
              </div>
              <div className="col-text">
                Келтирилган асос
              </div>
            </div>
          </div>
          <div className="column">
            <div className="col">
              <div className="col-title">
                Маъмурий орган номи
              </div>
              <div className="col-text">
                Маъмурий орган номи
              </div>
            </div>
            <div className="col">
              <div className="col-title">
                Карорни имзолаган шахс
              </div>
              <div className="col-text">
                ANTONYUK SERGEY ALEKSANDROVICH
              </div>
            </div>
          </div>
        </div>
      </div>
      <button ref={columnsBtnImgRef} className="expand_more-btn" onClick={closeTopTable}>
        <img  src={Expand_more} alt="" />
      </button>
    </div>
  )
}

export default AdministrativeWork;