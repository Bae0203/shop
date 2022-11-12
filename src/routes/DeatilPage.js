import React from "react";
import { useParams } from "react-router-dom";

//얘를 쓰면 css파일과 다르데 다른 js파일을 오염안시킨다.
//React특성상 모든 파일을 하나로 만들어주는데 그때 css도 하나로 만들어져서
//파일에 묻히는데 그 css파일을 얘를들어 App.js의 종속파일로 만들고 싶으면
//App.module.css 라고 작명하면 저 css파일은 App.js파일에만 적용되서 오염이 안된다
//아 그리고 이거 쓰면 로딩시간 단축됨
import styled from "styled-components";

//styled-component에도 props문법을 쓸수 있는데
/**
 * 예를들어
 * let Abtm = styled.button`
 *  background-color : ${props=>props.bg}
 *
 *  간단한 프로그래밍도 가능한데
 *  color : ${props => props.bg == 'black'? 'white':'black'}
 *  이렇게 간단한 프로그래밍도 가능하다
 * `
 *
 * <Abtn bg="red"> dd </Abtn>
 *
 * 이렇게 하면 props를 넘겨 받을 수 있다
 */

/**
 * 기존에 했던 스타일을 복사할 수도 있는데
 * let Bbtn = styled.button(Abtn)`
 *  ...
 * `
 * 이렇게 커스터마이징도 할 수 있다.
 */

const DeatilPage = (props) => {
  //유저가 입력한 파라미터가 나옴
  let { id } = useParams();
  console.log(id);
  console.log(props.shoes.filter((i) => console.log("i : " + i.id)));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={ImgCh(id)} width="100%" />
        </div>
        <div className="col-md-6">
          {/* 응용하는 방법 : 상품 정렬 버튼이 있다 하면 분명 꼬일거임
          예) 0번이 하하 였는데 갑자기 0번 페이지가 가가가가 로 변함
          따라서 URL파라미터 접속시 0번째 상품말고 상품의 id로 구분하는게 좋을 듯*/}
          <h4 className="pt-5">{IdCheck(props, id, 0)}</h4>
          <p>{IdCheck(props, id, 1)}</p>
          <p>{IdCheck(props, id, 2)}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default DeatilPage;

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
  console.log(id);
  return `https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`;
};
