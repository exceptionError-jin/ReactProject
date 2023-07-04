import React from 'react';

class CustomerDelete extends React.Component {

    //아이디 삭제
    deleteCustomer(id) {

        const url = "http://localhost:5000/api/customers/" + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();

        console.log('삭제할 고객의 ID:', id);
    }

    render() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }

}

export default CustomerDelete;