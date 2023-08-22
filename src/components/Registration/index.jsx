import "./style.scss"

// components
import Wrapper from "../Wrapper";
import Input from "../Input";

// images
import Article from "../../assets/images/article.svg"
import Search from "../../assets/images/find_in_page.svg"
import Calculate from "../../assets/images/calculate.svg"
import Info from "../../assets/images/info.svg"
import Remove from "../../assets/images/remove.svg"

function Registration (){

  return(
    <div className="Registration">
      <Wrapper>
        <Input  type={"password"} label={"Хужжат тури"} width="240px">
          <option value="">Маъмурий низо</option>
        </Input>
        <Input  type={"password"} label={"Хужжат тури"} width="240px">
          <option value="">Биринчи инстанция</option>
        </Input>
      </Wrapper>
      <Wrapper>
        <div className="title">
          <img src={Article} alt="" />
          Маъмурий низо - Биринчи инстанция
        </div>
        <Input input type={"number"} label={"Номер документа"} width="152px"/>
        <Input input type={"date"}  width="160px"/>
        <Input input type={"date"} width="160px"/>
        <Input  width="328px">
          <option value="">Тип отправки</option>
          <option value="">Тип отправки</option>
        </Input>
        <Input type={"password"}  width="328px">
          <option value="">Манфаатдор идора</option>
        </Input>
      </Wrapper>
      <Wrapper>
        <div className="title">
          <img src={Search} alt="" />
          Ариза (шикоят) мазмуни
        </div>
        <Input type={"password"} label={"Жавобгар"} width="328px">
          <option value="">PARPIYEVA SHAXLO SHOKIR QIZI</option>
        </Input>
        <Input type={"password"} label={"Иш туркуми"} width="328px">
          <option value="">2.2 - Маъмурий орган, фукаролар узини узи бошк</option>
        </Input>
        <Input type={"password"} label={"Иккиламчи иш туркуми"} width="328px">
          <option value="">PARPIYEVA SHAXLO SHOKIR QIZI</option>
        </Input>
        <Input type={"password"} label={"Кушимча иш туркумлари"} width="328px">
          <option value="">PARPIYEVA SHAXLO SHOKIR QIZI</option>
        </Input>
      </Wrapper>
      <Wrapper>
        <div className="title">
          <img src={Calculate} alt="" />
          Суд ҳаражатлари
        </div>
        <div><Input input type={"text"} placeholder={"Электрон тўлов рақами"} width="280px"/></div>
        <div className="wrap">
          <div>
            <div className="output">
              <div className="left">Ихтиёрий туланган давлат божи:</div>
              <div className="right">40140000 сум</div>
            </div>
            <Input width="320px">
              <option value="">Давлат божи холати</option>
            </Input>
            <button className="large" type="button">Чет эл валютасидаги тўлов</button>
            <Input width="120px" label={"Валюта"}>
              <option value="">1 - Сум</option>
            </Input>
            <Input input type={"text"} label={"Квитанция рақами"} width={"144px"}/>
            <Input input type={"text"} label={"Суммаси"} width={"192px"}/>
            <Input input type={"date"} label={"Санаси"} width={"128px"}/>
          </div>
            <button className="remove" type="button">
              <img src={Remove} alt="" />
            </button>
        </div>
        <div className="wrap">
          <div className="output">
            <div className="left">Ихтиёрий туланган почта харажатлари:</div>
            <div className="right"></div>
          </div>
          <Input width="320px">
            <option value="">Почта харажати холати</option>
          </Input>
          <button className="large" type="button">Чет эл валютасидаги тўлов</button>
        </div>
        <div className="wrap">
          <div className="output">
            <div className="left">Ихтиёрий туланган ВКА харажатлари:</div>
            <div className="right"></div>
          </div>
          <Input width="320px">
            <option value="">ВКА харажати холати</option>
          </Input>
          <button className="large" type="button">Чет эл валютасидаги тўлов</button>
        </div>
      </Wrapper>
      <Wrapper>
        <div className="title">
          <img src={Info} alt="" />
          Бошка маълумотлар
        </div>
        <Input input type={"textarea"} label={"Номер документа"} width="100%" placeholder={"Изох"}/>
      </Wrapper>
    </div>
  )
}

export default Registration;