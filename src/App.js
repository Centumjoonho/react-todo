import React, { Component, version } from 'react';

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
class ContentCreate extends Component {
  // 약속 -> 전송을 위한 

  state = {
    title: '',
    desc: ''
  }
  changeFormHandler(ev) {
    //setState -> name의 값에 따라서 변경

    this.setState({ [ev.target.name]: ev.target.value });
    console.log(ev.target.value);

  }
  render() {
    return (
      <article>
        {/* form을 쓰는 이유 -> 전송 */}
        <form onSubmit={function (ev) {
          ev.preventDefault();
          this.props.onSubmit(this.state);

        }.bind(this)}>
          <p><input type="text" placeholder='title' name='title' value={this.state.title} onChange={this.changeFormHandler.bind(this)}></input></p>
          <p><textarea placeholder='description' name='desc' value={this.state.desc} onChange={this.changeFormHandler.bind(this)}></textarea></p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    );

  }
}



class App extends Component {
  last_content_id = 3
  state = {
    mode: 'read',
    selected_content_id: 3,
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

    } else if (this.state.mode === "create") {
      return <ContentCreate onSubmit={function (formdata) {
        console.log(formdata);
        this.last_content_id = this.last_content_id + 1;
        formdata.id = this.last_content_id;

        //Object.assign -> 변수 값을 복제해 새로운 변수에 넣어준다. 
        var newContents = Object.assign([], this.state.contents)
        newContents.push(formdata);
        //화면 세팅! 
        this.setState({
          contents: newContents,

          selected_content_id: this.last_content_id,

          mode: 'read'
        });

      }.bind(this)}></ContentCreate>
    }

  }
  //버트구형
  getControlComponent() {
    return [
      <a key="1" href='/crate' onClick={function (ev) {
        ev.preventDefault();
        this.setState({ mode: "create" })
      }.bind(this)}>create</a>,

      <a key="2" href='/update' onClick={function (ev) {
        ev.preventDefault();
      }.bind(this)}>update</a>,

      <input key="3" type='button' href='/delete' onClick={function () {

        var newContents = this.state.contents.filter(function (el) {
          // 선택한 컨텐츠를 제외한 나머지를 다시 띄워 올린다 .
          if (el.id !== this.state.selected_content_id) {
            return el;
          }
        }.bind(this));
        this.setState({
          contents: newContents,
          mode: 'welcome'
        });
      }.bind(this)} value='delete'></input>,
    ];
  }
  render() {

    return (
      <div className="App">

        <Subject onClick={function () {
          this.setState({ mode: 'welcome' });

        }.bind(this)} title="WEB" sub="World Wide Web"></Subject>

        <TOC onSelect={function (id) {
          // this.state.selected_content_id 값을 id으로 바꿔라
          //읽기가 아닌 쓰기 
          this.setState({
            selected_content_id: id,
            mode: 'read'
          });
          //-> 이 문법 매우 중요 
        }.bind(this)} data={this.state.contents}></TOC>

        {/* 여기 부터는 아예 함수에 태그를 집어 넣었다. */}
        {this.getControlComponent()}
        {this.getContentComponent()}



      </div>
    );
  }
}

//Subject -> tag

export default App;
