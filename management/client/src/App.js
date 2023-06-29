import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead'; 
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow'; 
import TableCell from '@mui/material/TableCell';
import { styled } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomerAdd from "./components/CustomerAdd";

const styles = {
  table: {
    minWidth: 1080 // 테이블 최소 너비 설정(이 크기보다 작아져도 화면 안깨짐)
  }
};

const StyledTable = styled(Table)(styles.table); // 스타일이 적용된 테이블 생성

const CircularProgressWithLabel = (props) => { // 페이지 로딩 이미지
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10)); //0.2초씩 10씩 증가
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={progress} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const App = () => {
  const [customers, setCustomers] = useState([]); // useState를 사용하여 리랜더링(상태관리)
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수(로딩창 보여주기 위해 사용)


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // 데이터를 가져오기 전에 isLoading을 true로 설정하여 CircularProgress를 보이게 함
        setIsLoading(true);

        // 지연을 발생시키기 위해 setTimeout을 사용하여 2초 후에 데이터를 가져옴
        setTimeout(async () => {
          const response = await fetch("http://localhost:5000/api/customers"); // 서버로부터 customers 데이터 가져오기
          const data = await response.json(); // 가져온 데이터를 JSON으로 변환
          setCustomers(data); // 가져온 데이터 상태 업데이트
          setIsLoading(false); // 데이터를 가져온 후에 isLoading을 false로 설정하여 CircularProgress를 숨김
        }, 2000); // 2초 지연 설정
      } catch (error) {
        console.log(error); // 오류 발생 시 에러 로깅
        setIsLoading(false); // 오류 발생 시에도 isLoading을 false로 설정하여 CircularProgress를 숨김
      }
    };
  
    fetchCustomers(); // 컴포넌트가 마운트될 때 fetchCustomers 함수 호출
  }, []);

  return (
    <div>
    <Paper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> {/*테이블 내용*/}
          {isLoading ? (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgressWithLabel />
              </TableCell>
            </TableRow>
          ) : (
            customers.map((c) => ( // customers 배열을 순회하며 행 생성
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>
                  <img src={c.image} alt="프로필" />
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.birthday}</TableCell>
                <TableCell>{c.gender}</TableCell>
                <TableCell>{c.job}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>
    </Paper>
    <CustomerAdd/>
    </div>
  );
}

export default App;
