import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import { useState } from "react";
import data from "./Server";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/DeatilPage";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let [page, setPage] = useState(2);
  let [load, setLoad] = useState(false);
  let [loadInfo, setLoadInfo] = useState(true);

  //페이지 이동 도와주는 Navigate (이거도 훅임)
  //쓰는 방법은 그냥 href대신 Navigate쓰면 됩니다.
  let Navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand
            onClick={() => {
              Navigate("/");
            }}
          >
            ShoeShop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                Navigate("/");
                //-1도 되는데 그냥 뒤로가기 버튼임
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                Navigate("/about/member");
              }}
            >
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="main_bg"></div>
              <Container>
                <Row>
                  {shoes.map(function (e, i) {
                    return <Card data={e} index={i} key={i} />;
                  })}
                </Row>
              </Container>
              {/* 서버 요청하기 (Ajax) */}

              {load ? (
                <div className="alert alert-warning">로딩중 입니다.</div>
              ) : null}
              {loadInfo ? (
                <button
                  onClick={() => {
                    setLoad(true);
                    setPage(page + 1);
                    axios
                      .get(
                        `https://codingapple1.github.io/shop/data${page}.json`
                      )
                      .then((e) => {
                        let copy = [...shoes, ...e.data];

                        // e.data.map((e) => {
                        //   copy.push(e);
                        // });
                        setShoes(copy);
                        setLoad(false);
                        console.log(load);
                      })
                      .catch((e) => {
                        console.log(e);
                        console.log("실패 ㅜㅜ");
                        if (e.response.status == 404) {
                          alert("상품이 없습니다.");
                          setLoadInfo(false);
                        }
                        setLoad(false);
                        console.log(load);
                      });

                    /**
                     * 동시에 ajax요청 여러개 할려면
                     * Promise.all([ axios.get('/url1'), axios.get('/url2') ])
                     * .then()
                     * 이런식으로 하면 됨
                     *
                     * fetch?
                     * fetch를 쓰면 json그대로 보내주기때문에 배열, 오브젝트로 변환을 해야되서
                     * axios를 쓴다.
                     */
                  }}
                >
                  버튼
                </button>
              ) : null}
            </div>
          }
        />
        {/* 페이지 여러개 만들고 싶으면 :URL 파라미터 쓰면 된다. 참고로 여러개 써도됨 예) /detail/:id/:user...*/}
        {/* /detail/아무거나 */}
        <Route path="/detail/:id" element={<Detail shoes={shoes}></Detail>} />

        {/* Nested Routes라는 문법, 밑에 꺼랑 똑같이 작동함 */}
        <Route path="/about" element={<About></About>}>
          {/* 그냥 태그를 달면 안되고 어디에 보여야 될지 작성해야됨(Outlet) */}
          {/* 이거 path 쓸 때 절대 / 쓰면 안됨!! */}
          <Route path="member" element={<div>맴버임</div>} />
          <Route path="location" element={<div>위치임</div>} />
        </Route>
        {/* 언제씀? -> 여러개의 유사한 페이지가 필요할때 */}

        {/* 
        <Route path="/about" element={<About></About>}>
        <Route path="/about/member" element={<About></About>} />
        <Route path="/about/location" element={<About></About>} /> */}

        {/* 404 페이지 구현하는 방법 */}
        <Route path="*" element={<div>없는 페이지임!</div>} />
      </Routes>
    </div>
  );
}

export default App;

const About = () => {
  return (
    <>
      <h4>회사 정보임</h4>
      <Outlet></Outlet>
    </>
  );
};

const Card = (props) => {
  let Navigate = useNavigate();
  return (
    <Col>
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg`}
        width="80%"
        onClick={() => {
          Navigate(`/detail/${props.index}`);
        }}
      />
      <h4>{props.data.title}</h4>
      <p>{props.data.price}</p>
    </Col>
  );
};
