import './App.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { amountAdded } from './features/counter/counter-slice';
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice';

function App() {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	function handleClick() {
		dispatch(amountAdded(10));
	}

	const [numDogs, setNumDogs] = useState(10);
	const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

	return (
		<div className='App'>
			<header className='App-header'>
				<p>Hello Vite + React!</p>
				<p>
					<button onClick={handleClick} type='button'>
						count is: {count}
					</button>
				</p>
			</header>

			<h2>Dogs to fetch: </h2>
			<select value={numDogs} onChange={(e) => setNumDogs(Number(e.target.value))}>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
			</select>

			<div>
				<h1>Number of dogs fetched: {data.length}</h1>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Picture</th>
						</tr>
					</thead>
					<tbody>
						{data.map((breed) => {
							return (
								<tr key={breed.id}>
									<td>{breed.name}</td>
									<td>
										<img src={breed.image.url} alt={breed.name} height={250} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
