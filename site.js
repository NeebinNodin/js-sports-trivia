
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js'

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
//const nextQuestionElement = document.querySelector('#nextQuestion')

	// IIFE (so we can use async/await)
	; (async () => {

		// todo: create your "getNextQuestion" function
		const getNextQuestion = async () => {
			const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple')
			const json = await response.json()
			const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
			const answers = shuffle([...incorrect, correct])
			return { question, answers, correct }

		}
		// todo: create your "renderQuestion" function
		const renderQuestion = ({ question, answers }) => {

			answersElement.innerHTML = ''

			questionElement.textContent = decodeHtml(question)
			answers.forEach(answer => {
				const button = document.createElement('button')
				button.textContent = (answer)

				button.addEventListener('click', () => {
					if (answer === correct) {
						button.classList.add('correct')
						answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
						alert('Correct!')
						return
					}
					
					button.disabled = true
					alert('Incorrect!')
					
				})
				answersElement.appendChild(button)
			})
		}
		// todo: add the event listener to the "nextQuestion" button
		//console.log(await getNextQuestion())
		//renderQuestion(await getNextQuestion())
	})()

// mimic a click on the "nextQuestion" button to show the first question
//nextQuestionElement.click()
