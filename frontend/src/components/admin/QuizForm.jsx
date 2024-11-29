import { useState, useEffect } from 'react';

const QuizForm = ({ initialData = {}, onSubmit, onDeleteQuiz, onDeleteQuestion }) => {
  const [quizData, setQuizData] = useState(initialData);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setQuizData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].correctAnswer = value;
    setQuizData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''], 
      correctAnswer: null,
    };
    setQuizData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, newQuestion],
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", quizData); 
    onSubmit(quizData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Quiz Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={quizData.title || ''}
          onChange={handleChange}
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800">Questions</h3>
        {quizData.questions?.map((question, questionIndex) => (
          <div key={questionIndex} className="space-y-4 border-2 border-gray-300 rounded-lg mt-2 p-2">
            <div>
              <label className="block text-md font-medium text-black">Question {questionIndex + 1}</label>
              <input
                type="text"
                value={question.question || ''}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-700">Options</h4>
              <div className="space-y-2">
                {question.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex space-x-3 items-center">
                    <span className="text-gray-700">Option {optionIndex + 1}:</span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700">Correct Answer</label>
              <select
                value={question.correctAnswer ?? ''}
                onChange={(e) => handleCorrectAnswerChange(questionIndex, parseInt(e.target.value))}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Select correct answer</option>
                {question.options.map((_, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </select>
            </div>

            {question._id && (
              <button
                type="button"
                onClick={() => onDeleteQuestion(questionIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Question
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Save Quiz
        </button>
        <button
          type="button"
          onClick={onDeleteQuiz}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete Quiz
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
