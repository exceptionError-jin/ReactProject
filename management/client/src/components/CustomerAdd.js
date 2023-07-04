import React from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    };
  }

  //모달 창 열기
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  //모달 창 닫기
  handleClose = () => {
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    })
  }

    // 고객 추가 메서드
    addCustomer = () => {
        const url = 'http://localhost:5000/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        return axios.post(url, formData, config);
    };

    // 이미지 크기 조정
    resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const MAX_WIDTH = 64;
                    const MAX_HEIGHT = 64;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', 1);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // 폼 제출 이벤트
    handleFormSubmit = async (e) => {
        e.preventDefault();
        const resizedFile = await this.resizeImage(this.state.file);

        const url = 'http://localhost:5000/api/customers';
        const formData = new FormData();
        formData.append('image', resizedFile);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post(url, formData, config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
        window.location.reload(); //값 추가 후 리로딩
    };

    // 파일 선택 이벤트
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    };

    // 입력값 변경 이벤트
    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
              고객 추가하기
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose} PaperProps={{style: {width: '400px'}}}>
              <DialogTitle>고객 추가</DialogTitle>
              <DialogContent>
              <input style={{ display: 'none' }} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />

                    <label htmlFor="raised-button-file" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" component="span" name="file" >
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} style={{ display: 'flex', justifyContent: 'center' }}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} style={{display: 'flex', justifyContent: 'center' }}/><br/>
                    <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} style={{ display: 'flex', justifyContent: 'center' }}/><br/>
                    <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} style={{display: 'flex', justifyContent: 'center' }}/><br/>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
        );
    }
}

export default CustomerAdd;