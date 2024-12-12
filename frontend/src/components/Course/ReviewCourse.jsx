import React from "react";

const ReviewCourse = ({ reviews }) => {
    return (
        <div className="space-y-4">
            {reviews.map((review, index) => (
                <div key={index} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                        <img src={review?.user.photoURL} className="bg-gray-300 w-10 h-10 rounded-full"></img>
                        <div>
                            <h3 className="font-semibold">{review?.user.name}</h3>
                            <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewCourse;
