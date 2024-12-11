const CourseCard = () => {
  const progress = 80;

  const courses = [
    {
      _id: '6750356a6195eec91c2bb5bf',
      title: 'Pemrograman Web',
      description: 'Belajar pengembangan web dari dasar hingga mahir.',
      category: 'Pemrograman',
      thumbnail: './HTML.png',
      materials: [
        { id: '1', title: 'Pengenalan HTML' },
        { id: '2', title: 'Pengenalan CSS' },
        { id: '3', title: 'Pengenalan JavaScript' },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course) => (
        <div key={course._id} className="w-full xs:w-80 sm:w-80 p-4">
          <div className="border rounded-2xl shadow-md overflow-hidden h-auto">
            <div className="relative pb-[56.25%]">
              <img src={course.thumbnail} alt={course.title} className="absolute top-0 left-0 w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-base  sm:text-lg">{course.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-3">{course.category}</p>
              <p className="mt-2 text-xs sm:text-sm">{course.description.slice(0, 100)}</p>
              <div className="flex items-center gap-1 mt-3 -mb-1">
                <div className="w-full h-2 bg-gray-200 border-0  rounded-xl border-current">
                  <div className="bg-primary-500 rounded-xl p-1 h-full text-xs sm:text-sm" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs xs:text-sm sm:text-base">{Math.round(progress)}%</p>
              </div>
              <button onClick={() => (window.location.href = `/course/${course._id}`)} className="w-full mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl text-xs xs:text-sm sm:text-base">
                Lihat Kelas
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
