import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuizByCourse } from '../../services/api';
import CompletionModal from '../Modal/quizModal';

const QuizDisplay = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  //Ambil data quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await fetchQuizByCourse(courseId);
        if (data && Array.isArray(data) && data.length > 0) {
          setQuiz(data[0]);
        } else {
          setQuiz(null);
        }
      } catch (err) {
        setError('Failed to fetch quiz data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    const allAnswered = quiz.questions.every((_, index) => userAnswers[index] !== undefined);

    if (!allAnswered) {
      alert('Silakan jawab semua pertanyaan sebelum submit!');
      return;
    }

    const totalQuestions = quiz.questions.length;
    const pointsPerQuestion = totalQuestions > 0 ? 100 / totalQuestions : 0;
    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score += pointsPerQuestion;
      }
    });

    setTotalScore(score);
    setSubmitted(true);
    setShowModal(true);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!quiz) {
    return (
      <div className="text-center p-6 mt-20">
        <h2 className="text-lg font-semibold">Tidak ada kuis tersedia untuk course ini.</h2>
        <button type="button" onClick={() => window.history.back()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Kembali
        </button>
      </div>
    );
  }

  const pointsPerQuestion = quiz.questions.length > 0 ? 100 / quiz.questions.length : 0;
  const skor = pointsPerQuestion.toFixed(2).split('.')[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showModal && <CompletionModal skor={totalScore} courseId={courseId} onClose={handleCloseModal} />}

      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      {submitted && <h2 className="text-lg font-semibold mb-4">{`Total Skor: ${totalScore.toFixed(2).split('.')[0]}/100`}</h2>}
      <ul className="space-y-4">
        {quiz.questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const correctAnswer = question.correctAnswer;
          const isUserAnswerCorrect = submitted && userAnswer === correctAnswer;
          const isUserAnswerIncorrect = submitted && userAnswer !== correctAnswer;

          return (
            <li key={index} className="border p-4 rounded-lg">
              <div className="flex flex-nowrap justify-between items-start">
                <h2 className="text-lg font-semibold">{`${index + 1}.) ${question.question}`}</h2>
                {!submitted && <p className="text-sm text-gray-600 w-24 text-right pt-1">{`${skor} points`}</p>}
                {submitted && <p className="mt-1 text-sm w-24 text-right">{isUserAnswerCorrect ? `${skor}/${skor}` : isUserAnswerIncorrect ? `0/${skor}` : ''}</p>}
              </div>
              <ul className="mt-2 space-y-2">
                {question.options.map((option, optionIndex) => {
                  let optionClass = '';

                  if (submitted) {
                    if (isUserAnswerIncorrect && optionIndex === userAnswer) {
                      optionClass = 'bg-red-300 w-full p-2 rounded-md';
                    }
                    if (optionIndex === correctAnswer) {
                      optionClass = 'bg-green-300 w-full p-2 rounded-md';
                    }
                  } else {
                    optionClass = userAnswer === optionIndex ? 'w-full p-2 border-2 border-gray-500 rounded-md bg-gray-50' : 'bg-gray-100 w-full p-2 rounded-md';
                  }

                  return (
                    <li key={optionIndex} className="flex w-full ">
                      <button type="button" onClick={() => handleAnswerChange(index, optionIndex)} className={`flex ${optionClass} transition duration-200`} disabled={submitted}>
                        <span className="ml-2">{option}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      {!submitted && (
        <button type="button" onClick={handleSubmit} className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mt-4">
          Submit
        </button>
      )}

      <button type="button" onClick={() => window.history.back()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
        Kembali
      </button>
    </div>
  );
};

QuizDisplay.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
  userAnswers: PropTypes.objectOf(PropTypes.number),
  submitted: PropTypes.bool,
  totalScore: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

QuizDisplay.defaultProps = {
  quiz: null,
  userAnswers: {},
  submitted: false,
  totalScore: 0,
  loading: true,
  error: null,
};

export default QuizDisplay;
