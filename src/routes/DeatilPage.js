import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const DeatilPage = (props) => {
  //유저가 입력한 파라미터가 나옴
  let { id } = useParams();
  console.log(id);
  console.log(props.shoes.filter((i) => console.log("i : " + i.id)));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          {/* 응용하는 방법 : 상품 정렬 버튼이 있다 하면 분명 꼬일거임
          예) 0번이 하하 였는데 갑자기 0번 페이지가 가가가가 로 변함
          따라서 URL파라미터 접속시 0번째 상품말고 상품의 id로 구분하는게 좋을 듯*/}
          <h4 className="pt-5">
            {() => {
              let title = props.shoes.filter((i) => i.id == id);
              console.log("ti : ", title);
              return <div>dd</div>;
            }}
          </h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default DeatilPage;
