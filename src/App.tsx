import { useState } from 'react'
import './App.css'

type List = {
	id: number
	title: string
}

function App() {
	const [todos, setTodos] = useState<List[]>([{ id: 1, title: 'Groceries' }])
	const [complete, setComplete] = useState<List[] | []>([])

	function handlePrompt(todos: List[]) {
		const title = window.prompt('Enter your new task')

		if (title === '' || !title) {
			return
		}

		setTodos([...todos, { id: todos.length + 1, title }])
	}

	function handleOnComplete(
		todo: List,
		{ todos, complete }: { todos: List[]; complete: List[] }
	) {
		const itemExists = complete.some((c) => c.id === todo.id)

		if (!itemExists) setComplete([...complete, todo])

		const updatedTodos = todos.filter((t) => t.id !== todo.id)
		setTodos(updatedTodos)
	}

	return (
		<div className='App'>
			<button onClick={() => handlePrompt(todos)}>Add Todo</button>
			<div>
				<ListComponent
					headerText='Todo'
					list={todos}
					actionName='✅'
					handleOnComplete={handleOnComplete}
					todos={todos}
					complete={complete}
				/>
			</div>

			<div>
				<ListComponent headerText='Completed' list={complete} />
			</div>
		</div>
	)
}

export default App

type Props = {
	headerText: string
	list: List[]
	actionName?: string
	handleOnComplete?: (
		li: List,
		{ todos, complete }: { todos: List[]; complete: List[] }
	) => void
	todos?: List[] | []
	complete?: List[] | []
}

function ListComponent({
	headerText,
	list,
	actionName,
	todos,
	complete,
	handleOnComplete,
}: Props) {
	return (
		<div>
			<h2>{headerText}</h2>
			<ul>
				{list
					.map((li) => (
						<li>
							{handleOnComplete && actionName && todos && complete && (
								<button
									onClick={() => handleOnComplete(li, { todos, complete })}
								>
									{actionName}
								</button>
							)}
							{li.title}
						</li>
					))
					.reverse()}
			</ul>
		</div>
	)
}
