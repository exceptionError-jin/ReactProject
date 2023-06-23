import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead'; 
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow'; 
import TableCell from '@mui/material/TableCell';
import { styled } from "@mui/material/styles";

const styles = {
  table: {
    minWidth: 1080 // 테이블 최소 너비 설정
  }
};

const StyledTable = styled(Table)(styles.table); // 스타일이 적용된 테이블 생성

const App = () => {
  const [customers, setCustomers] = useState([]); // useState를 사용하여 리랜더링(상태관리)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers"); // 서버로부터 customers 데이터 가져오기
        const data = await response.json(); // 응답 데이터를 JSON으로 변환
        setCustomers(data); // customers 상태 업데이트
      } catch (error) {
        console.log(error); // 오류 발생 시 에러 로깅
      }
    };
  
    fetchCustomers(); // 컴포넌트가 마운트될 때 fetchCustomers 함수 호출
  }, []);

  return (
    <Paper> {/*Material-UI의 Paper 컴포넌트*/} 
      <StyledTable> {/*스타일이 적용된 테이블 컴포넌트*/} 
        <TableHead> {/*테이블 헤더*/} 
          <TableRow> {/*테이블 헤더의 행*/} 
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> {/*테이블 내용*/} 
          {customers.map((c) => ( // customers 배열을 순회하며 행 생성
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
          ))}
        </TableBody>
      </StyledTable>
    </Paper>
  );
}

export default App; // App 컴포넌트를 내보내기
