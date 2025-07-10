import React, { useEffect, useState } from "react";
import Todo from './Todo';

//create your first component
const Home = () => {
	return (
		<div className="d-flex justify-content-center p-5">
			<div className="card bg-dark text-white" style={{ width: "30rem" }} >
				<div className="card-body text-center">
					<h1 className="card-title">Todos</h1>
					<Todo />
				</div>
			</div>
		</div>
	);
};

export default Home;