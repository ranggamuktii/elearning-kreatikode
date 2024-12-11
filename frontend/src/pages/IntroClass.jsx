import React, { useEffect, useState } from "react";
import SubMaterial from "../components/Course/SubMaterial.";
import AboutCourse from "../components/Course/AboutCourse";
import ReviewCourse from "../components/Course/ReviewCourse";
import ClassBanner from "../components/Course/ClassBanner";
import { use } from "react";
import loadComment from "../api/load-comment";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
    const topics = [
        "Struktur Dokumen HTML",
        "HTML Tag, Element, Attribute & Comment",
        "HTML Tag untuk Menampilkan Teks",
        "HTML Tag untuk Multimedia",
        "HTML Tag untuk Tabel",
        "HTML Tag untuk Formulir",
        "HTML Tag untuk Membagi Layout Website",
    ];

    const reviews = [
        { name: "Elodni Mosul", time: "17 jam yang lalu", comment: "Sangat bermanfaat!" },
        { name: "Diana Kusuma", time: "2 hari yang lalu", comment: "Materinya aplikatif!" },
    ];
        const {courseId } = useParams();
        const [comments, setComments] = useState([]);
        useEffect(() => {
                getAllComments();
        },[courseId])
        const getAllComments = async () => {
            try {
                const comments = await loadComment(courseId);
                console.log(comments)
                setComments(comments);
            }
            catch (error) {
                console.log(error.message)
            }
        }
    return (
        <div>
            <ClassBanner />
            <div className="max-w-full mx-auto px-8 mt-8">
                <div className="flex gap-6">
                    <AboutCourse />
                    <SubMaterial topics={topics} />
                </div>
                <section className="border bg-white rounded-lg p-6 mb-8 h-fit w-2/3">
                    <h2 className="font-bold text-xl mb-4">Ulasan</h2>
                    <ReviewCourse reviews={comments} />
                </section>
                <section className="mt-8">
                    <h2 className="font-bold text-xl mb-4">Rekomendasi Kelas Untuk Kamu</h2>
                </section>
            </div>
        </div>

    );
};

export default CourseDetail;
