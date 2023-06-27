import React from 'react';
import axios from 'axios';

//axios란?
//Javascript 진영에서 사용되는 Promise를 기반으로 한 HTTP 클라이언트로 서버 통신을 할 수 있게 해줌
//Promise는 비동기 작업의 결과를 나중에 받아서 처리할 수 있도록 도와주는 객체

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //값 담을 상태
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    // 고객 추가 메서드
    addCustomer = () => {
        const url = '/api/customers'; // POST 요청을 보낼 엔드포인트 URL
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data' // 요청 헤더에 multipart/form-data 설정
            }
        }
        return axios.post(url, formData, config); // POST 요청을 보내고 Promise 반환
    }

    // 폼 제출 이벤트
    handleFormSubmit = (e) => {
        e.preventDefault(); // 폼의 기본 동작 방지
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
    }

    // 파일 선택 이벤트
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], // 파일 객체 업데이트(파일 하나만 선택하니깐 [0]으로 지정)
            fileName: e.target.value // 업로드된 파일의 이름 업데이트
        })
    }

    // 입력값 변경 이벤트
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value; // 해당 입력 필드의 값을 업데이트
        this.setState(nextState);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type='text' name='birthday' value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type='text' name='job' value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type='submit'>추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;
