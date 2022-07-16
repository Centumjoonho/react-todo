import React, { Component } from 'react';

//property = > props
// this.props -> 이건 jax 파일의 필수 !!! 

//react ->subject라는 이름의 태그 생성 (하나의 클래스)
class Subject extends Component {

  render() {
    return (

      <header>
        <h1><a href="/" onClick={function (ev) {
          ev.preventDefault();
          this.props.onClick();

        }.bind(this)}>{this.props.title}</a></h1>

        {this.props.sub}

      </header>
    );
  }


}
//이 태그의 내용은 아래 

class TOC extends Component {

  render() {
    //담을 그릇
    var list = [];
    //loop문 data = state.contents
    var i = 0;
    while (i < this.props.data.length) {
      var data = this.props.data[i];
      //list에 목록 집어 넣기  
      //data.id = 유일무이 식별자
      list.push(
        <li key={data.id}>
          <a href={data.id + ".html"} onClick={function (id, ev) {
            ev.preventDefault();
            this.props.onSelect(id);
          }.bind(this, data.id)}>
            {data.title}
          </a>
        </li>)

      i = i + 1;

    }
    //map 함수 확인해 보기 

    return (

      <nav>
        <ol>
          {list}
        </ol>
      </nav>

    );
  }
}

class Content extends Component {
  render() {
    return (

      <article>
        <h2>{this.props.data.title}</h2>
        {this.props.data.desc}
      </article>


    );
  }
}




class App extends Component {

  state = {
    mode: 'read',
    selected_content_id: 1,
    contents: [
      { id: 1, title: 'HTML', desc: 'HTML is for information' },
      { id: 2, title: 'CSS', desc: 'CSS is for Design' },
      { id: 3, title: 'JavaScript', desc: 'JavaScript is for interaction' }
    ]
  }
  getSelectedContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (this.state.selected_content_id === data.id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContentComponent() {
    if (this.state.mode === 'read') {
      return <Content data={this.getSelectedContent()}></Content>

    } else if (this.state.mode === 'welcome') {
      return <Content data={{ title: 'Welcome', desc: 'Hello React !!!' }}></Content>
    }

  }
  render() {

    return (
      <div className="App">

        <Subject onClick={function () {
          this.setState({ mode: 'welcome' })

        }.bind(this)} title="WEB" sub="World Wide Web"></Subject>

        <TOC onSelect={function (id) {
          // this.state.selected_content_id 값을 id으로 바꿔라
          //읽기가 아닌 쓰기 
          this.setState({ selected_content_id: id, mode: 'read' });
          //-> 이 문법 매우 중요 
        }.bind(this)} data={this.state.contents}></TOC>
        {this.getContentComponent()}



      </div>
    );
  }
}

//Subject -> tag

export default App;
