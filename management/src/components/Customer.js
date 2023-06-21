import React from "react";

function Customer(props) {
    return (
      <div>
        <h2>{props.name}</h2>
        <p>{props.birthday}</p>
        <p>{props.gender}</p>
        <p>{props.job}</p>
      </div>
    );
}

export default Customer;
