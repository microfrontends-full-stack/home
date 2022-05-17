import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getUsers, deleteUser } from "@quind/mf-styleguide";
import "./styles.css";
export default function ListUsersComponent() {
	const [data, setData] = useState([]);

	useEffect(() => {
		users();
	}, []);

	const onClick = (item) => {
		document.cookie = `name=${item.name};`;
		document.cookie = `email=${item.email};`;
		document.cookie = `contact=${item.contact};`;
	};
	const users = async () => {
		const response = await getUsers();
		setData(response);
	};

	const onDeleteUser = async (id) => {
		if (
			window.confirm("Are you sure that you wanted to deleted that user record")
		) {
			const response = await deleteUser(id);
			users();
		}
	};
	return (
		<Router>
			<div style={{ marginTop: "150px" }}>
				<table className="styled-table">
					<thead>
						<tr>
							<th style={{ textAling: "center" }}> No.</th>
							<th style={{ textAling: "center" }}>Name</th>
							<th style={{ textAling: "center" }}>Email</th>
							<th style={{ textAling: "center" }}>Contact</th>
							<th style={{ textAling: "center" }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item, index) => {
								return (
									<tr key={index}>
										<th scope="row"> {index + 1}</th>
										<td> {item.name}</td>
										<td> {item.email}</td>
										<td> {item.contact}</td>
										<td>
											<Link to={`/edit/${item.id}`}>
												<button className="btn btn-edit">Edit</button>
											</Link>
											<button
												className="btn btn-delete"
												onClick={() => onDeleteUser(item.id)}
											>
												Delete
											</button>
											<Link to={`/view/${item.id}`}>
												<button
													className="btn btn-view"
													onClick={() => onClick(item)}
												>
													View
												</button>
											</Link>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</Router>
	);
}
