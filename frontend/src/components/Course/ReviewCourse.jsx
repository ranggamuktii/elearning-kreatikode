import React from "react";

const ReviewCourse = ({ reviews }) => {
    return (
        <div className="space-y-4">
            {reviews.map((review, index) => (
                <div key={index} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                        <div>
                            <h3 className="font-semibold">{review.name}</h3>
                            <p className="text-sm text-gray-500">{review.time}</p>
                        </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewCourse;
