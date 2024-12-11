import React from 'react'

const loadComment = async(courseId) => {
  const responeApi = await fetch(`http://localhost:5000/api/courses/${courseId}/comments`);
  const data = await responeApi.json();
  return data
}

export default loadComment