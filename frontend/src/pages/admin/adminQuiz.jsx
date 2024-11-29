import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createQuiz, fetchQuizByCourse, updateQuiz, deleteQuiz, deleteQuestion } from '../../services/api'; 
import QuizForm from '../../components/admin/QuizForm';

const AdminCourseQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await fetchQuizByCourse(id);
        console.log(data)
        if (data && Array.isArray(data) && data.length > 0) {
          setQuizData(data[0]);
        } else {
          setQuizData(null);
        }
      } catch (err) {
        setError('Failed to fetch quiz data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleQuizSubmit = async (quiz) => {
    setLoading(true);
    try {
      console.log('Quiz data to submit:', quiz);
  
      if (quizData && quizData._id) {
        const updatedQuiz = await updateQuiz(id, quizData._id, quiz);
        console.log('Quiz updated:', updatedQuiz);
  
        setQuizData(updatedQuiz.data);
      } else {
        const newQuiz = await createQuiz(id, quiz);
        console.log('New quiz created:', newQuiz);
  
        setQuizData(newQuiz.data);
      }
    } catch (err) {
      setError('Failed to save quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async () => {
    setLoading(true);
    try {
      if (quizData && quizData._id) {
        await deleteQuiz(id, quizData._id);
        navigate(`/admin/course/${id}/quizzes`);
      } else {
        setError('Quiz ID not found');
      }
    } catch (err) {
      setError('Failed to delete quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionIndex) => {
    try {
      const questionId = quizData.questions[questionIndex]._id;
      if (questionId) {
        await deleteQuestion(id, quizData._id, questionId);
      }
      
      const updatedQuestions = quizData.questions.filter((_, index) => index !== questionIndex);
      setQuizData((prevData) => ({
        ...prevData,
        questions: updatedQuestions,
      }));
    } catch (err) {
      console.error('Failed to delete question:', err);
      setError('Failed to delete question');
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-5">{quizData ? 'EDIT QUIZ' : 'ADD NEW QUIZ'}</h1>
      <QuizForm
        initialData={quizData || { title: '', questions: [] }}
        onSubmit={handleQuizSubmit}
        onDeleteQuiz={handleDeleteQuiz}
        onDeleteQuestion={handleDeleteQuestion}
      />
    </div>
  );
};

export default AdminCourseQuiz;

