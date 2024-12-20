import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuizByCourse, addQuizScore, fetchCourseById, addProgress } from '../../services/api';
import CompletionModal from '../Modal/quizModal';
import { showErrorToast } from '../Utils/toastUtils';

const QuizDisplay = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      const decoded = decodeJwt(token);
      setUserDetails(decoded);
    }
  }, []);

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

    const fetchCourses = async () => {
      try {
        const { data } = await fetchCourseById(courseId);
        setCourse(data);
      } catch (err) {
        setError('Failed to fetch course data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
    fetchCourses();
  }, [courseId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = async () => {
    const allAnswered = quiz.questions.every((_, index) => userAnswers[index] !== undefined);
    if (!allAnswered) {
      showErrorToast('Silakan jawab semua pertanyaan sebelum submit!');
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

    const lastMaterial = course.materials[course.materials.length - 1];
    const materialId = lastMaterial._id;

    try {
      await addQuizScore(courseId, userDetails.id, { score });
      await addProgress(courseId, materialId, userDetails.id);
    } catch (error) {
      console.error('Failed to add quiz score:', error);
    }
    setSubmitted(true);
    setShowModal(true);
    window.scrollTo(0, 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(`/course/${courseId}`);
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index);
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
        <button type="button" onClick={handleBack} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Kembali
        </button>
      </div>
    );
  }

  const pointsPerQuestion = quiz.questions.length > 0 ? 100 / quiz.questions.length : 0;
  const skor = pointsPerQuestion.toFixed(2).split('.')[0];

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      {showModal && <CompletionModal skor={totalScore} courseId={courseId} onClose={handleCloseModal} />}

      {/* Judul kursus */}
      {course && <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{course.title}</h1>}

      {/* Judul kuis */}
      <h2 className="text-lg sm:text-xl text-center font-semibold mb-4">{quiz.title}</h2>

      {submitted && <h3 className="text-lg text-center font-semibold mb-4">{`Total Skor: ${totalScore.toFixed(2).split('.')[0]}/100`}</h3>}
      <ul className="space-y-4">
        {quiz.questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const correctAnswer = question.correctAnswer;
          const isUserAnswerCorrect = submitted && userAnswer === correctAnswer;
          const isUserAnswerIncorrect = submitted && userAnswer !== correctAnswer;

          return (
            <li key={index} className="border p-4 rounded-2xl">
              <div className="flex flex-nowrap justify-between items-start">
                <h2 className="text-base sm:text-lg font-medium sm:font-semibold">{`${index + 1}.) ${question.question}`}</h2>
                {!submitted && <p className="text-sm text-gray-600 min-w-24 text-right pt-1">{`${skor} points`}</p>}
                {submitted && <p className="mt-1 text-sm w-24 text-right">{isUserAnswerCorrect ? `${skor}/${skor}` : isUserAnswerIncorrect ? `0/${skor}` : ''}</p>}
              </div>
              <ul className="mt-5 space-y-2">
                {question.options.map((option, optionIndex) => {
                  let optionClass = '';
                  let labelClass = 'mr-3 font-semibold px-4 py-2 rounded-xl';

                  if (submitted) {
                    if (isUserAnswerIncorrect && optionIndex === userAnswer) {
                      optionClass = 'bg-red-100 border-red-600 w-full p-2 rounded-xl';
                      labelClass += ' bg-red-200 text-white border-red-500';
                    }
                    if (optionIndex === correctAnswer) {
                      optionClass = 'bg-green-200 text-green-600 w-full p-2 rounded-xl';
                      labelClass += ' bg-green-300 text-white border-green-600';
                    }
                    if (!isUserAnswerIncorrect && optionIndex !== correctAnswer) {
                      optionClass = 'bg-gray-50 w-full p-2 rounded-xl';
                      labelClass += ' bg-gray-100 text-gray-600 border-gray-200';
                    }
                  } else {
                    optionClass = userAnswer === optionIndex ? 'w-full p-2 border-2 border-secondary-100 rounded-xl bg-primary-100 text-primary-500 font-medium bg-opacity-50' : 'border border-gray-200 bg-gray-0 w-full p-2 rounded-xl';
                    labelClass += userAnswer === optionIndex ? ' bg-primary-100 text-primary-500 border-primary-500' : ' text-gray-700 border border-gray-200';
                  }

                  return (
                    <li key={optionIndex} className="flex w-full">
                      <button type="button" onClick={() => handleAnswerChange(index, optionIndex)} className={`flex items-center w-full ${optionClass} transition duration-200`} disabled={submitted}>
                        <span className={labelClass}>{getOptionLabel(optionIndex)}</span>
                        <span className="text-left">{option}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between gap-10 mt-4">
        <button type="button" onClick={handleBack} className="flex items-center justify-center gap-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg w-1/2 transition duration-200">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        {!submitted && (
          <button type="button" onClick={handleSubmit} className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg w-1/2 transition duration-200">
            Submit
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      </div>
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

export default QuizDisplay;
