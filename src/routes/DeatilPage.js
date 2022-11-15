import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../App.css";
/**
 * 컴포넌트의 Life cycle
 * 1. 페이지에 장착 (mount)
 * 2. 컴포넌트 업데이트 (update)
 * 3. 메인에 detail페이지가 제거 됨(unmount)
 */

const DeatilPage = (props) => {
  let [count, setCount] = useState(0);
  let [hidediv, setHidediv] = useState(true);
  let [inputval, setInputval] = useState(0);
  let [numCh, setNumCh] = useState(true);
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState("");

  //detail 컴포넌트가 mount되거나 update될때 마다 실행함
  /**
   * 아니 useEffect 밖에다 써도 똑같은데 왜씀??
   *
   * 쓰는 이유
   * useEffect는 html 렌저링 후 동작,
   * 만약 만번정도 도는 for문이 1~2초 걸린다하면
   * 1~2초 뒤에 html이 보일 거임
   * 따라서 조금더 효율적으로 동작하는걸 알 수 있음
   *
   * 그럼 안에 뭐 적으면 되나?
   * 어려운 연산 같은거
   * 서버에서 데이터 가져오는 작업
   * 타이머
   */
  useEffect(() => {
    console.log("dd");
    setTimeout(() => {
      setHidediv(false);
    }, 2000);
    //타이머 제거하는법 (unmonut시 실행시키는 법)
    // let a = setTimeout(() => {
    //   setHidediv(false);
    // }, 2000);

    // return()=>{
    //   clearTimeout(a)
    // }
    //그래서 이거 언제쓰냐?
    //서버로 데이터 요청하는 코드가 2초정도 소요된다 치면
    //그 2초사이 재렌더링을 하면 요청을 계속하게 되서 버그가 발생 할 수 있음
    //그래서 return안에 기존 데이터요청은 제거해주세요~ 라는 코드를 짜면 됨
  }, [count]); //useEffect 실행조건 넣는곳 ( [] 안에 있는 변수가 변할때마다 실행해주세요~ )
  // 만약 [] 안에 아무것도 없으면 처음 렌더링 될때 한번만 실행됨
  /**
   * useEffect(()=>{}) - mount, update시 작동
   * useEffect(()=>{},[]) - mount시 작동
   */

  useEffect(() => {
    console.log("i", parseInt(inputval));
    if (isNaN(parseInt(inputval))) {
      setNumCh(true);
      console.log(numCh);
    } else {
      setNumCh(false);
      console.log(numCh);
    }
  }, [inputval]);
  //유저가 입력한 파라미터가 나옴
  let { id } = useParams();

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
      clearTimeout(a);
    };
  }, [tab]);

  return (
    <div className={"container start " + fade}>
      {hidediv ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}

      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        dd
      </button>
      <div className="row">
        <div className="col-md-6">
          <img src={ImgCh(id)} width="100%" />
        </div>
        <div className="col-md-6">
          {numCh ? (
            <div className="alert alert-warning">숫자만 입력해주세요!</div>
          ) : null}
          <input
            value={inputval}
            onChange={(e) => setInputval(e.target.value)}
          />
          {/* 응용하는 방법 : 상품 정렬 버튼이 있다 하면 분명 꼬일거임
          예) 0번이 하하 였는데 갑자기 0번 페이지가 가가가가 로 변함
          따라서 URL파라미터 접속시 0번째 상품말고 상품의 id로 구분하는게 좋을 듯*/}
          <h4 className="pt-5">{IdCheck(props, id, 0)}</h4>
          <p>{IdCheck(props, id, 1)}</p>
          <p>{IdCheck(props, id, 2)}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      {/* 
          defaultActiveKey : 기본적으로 눌려져 있을 버튼 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* html안에서 if 조건문 쓰는 법 (캄포넌트 안에 넣기)*/}
      <Tabcontent tab={tab} />
    </div>
  );
};

export default DeatilPage;

const Tabcontent = ({ tab }) => {
  let [fade, setFade] = useState("");
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);

    //automatic batching
    // State를 바꾸면 바꿀때 마다 렌더링 되는게 아니라 마지막에 한꺼번에 렌더링이 된다.
    //그래서 미세한 시간 차이를 두면 state를 바꿀때 마다 렌더링이 된다.
    return () => {
      setFade("");
      clearTimeout(a);
    };
  }, [tab]);
  // if (tab == 0) {
  //   return <div>내용0</div>;
  // } else if (tab == 1) {
  //   return <div>내용1</div>;
  // } else if (tab == 2) {
  //   return <div>내용2</div>;
  // }

  return (
    <div className={"start " + fade}>
      {/* 앞에 있는 배열에서 tab번째에 있는걸 꺼내주세요~ 라는 뜻임 */}
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
};

const IdCheck = (props, id, chnum) => {
  let title = props.shoes.filter((i) => i.id == id);
  if (parseInt(chnum) == 0) {
    return title[0].title;
  } else if (parseInt(chnum) == 1) {
    return title[0].content;
  } else if (parseInt(chnum) == 2) {
    return title[0].price;
  }
};

const ImgCh = (id) => {
  return `https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`;
};
