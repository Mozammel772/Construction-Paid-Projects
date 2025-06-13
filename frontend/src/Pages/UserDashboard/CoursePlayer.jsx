"use client"

import {
    AlertCircle,
    Bookmark,
    CheckCircle,
    ChevronLeft,
    Clock,
    Download,
    FileText,
    Loader2,
    Maximize,
    Menu,
    Minimize,
    Pause,
    Play,
    RotateCcw,
    RotateCw,
    Settings,
    SkipBack,
    SkipForward,
    Star,
    Users,
    Volume2,
    VolumeX,
    X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const CoursePlayer = () => {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const progressRef = useRef(null)
    const progressUpdateInterval = useRef(null)

    // State Management
    const [courseData, setCourseData] = useState(null)
    const [enrollmentData, setEnrollmentData] = useState(null)
    const [currentLesson, setCurrentLesson] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [showSettings, setShowSettings] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const [activeTab, setActiveTab] = useState("curriculum")
    const [notes, setNotes] = useState("")
    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lessonProgress, setLessonProgress] = useState({})
    const [userEmail, setUserEmail] = useState("");
    // const [user] = useAuthState(auth);
const {user} = useAuth()
    // Mobile responsive
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth < 768) {
                setShowSidebar(false)
            }
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        if (courseId) {
            // Get user email from localStorage or your auth system
            const email = user?.email
            setUserEmail(email)
            fetchCourseAndEnrollmentData(email)
        }
    }, [courseId])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateTime = () => {
            setCurrentTime(video.currentTime)
            // Update progress every 5 seconds while playing
            if (isPlaying && video.currentTime > 0) {
                updateProgressInBackground(video.currentTime)
            }
        }
        const updateDuration = () => setDuration(video.duration)

        video.addEventListener("timeupdate", updateTime)
        video.addEventListener("loadedmetadata", updateDuration)
        video.addEventListener("ended", handleVideoEnd)

        return () => {
            video.removeEventListener("timeupdate", updateTime)
            video.removeEventListener("loadedmetadata", updateDuration)
            video.removeEventListener("ended", handleVideoEnd)
        }
    }, [currentLesson, isPlaying])

    // Auto-save progress every 10 seconds while playing
    useEffect(() => {
        if (isPlaying && currentTime > 0) {
            progressUpdateInterval.current = setInterval(() => {
                updateProgressInBackground(currentTime)
            }, 10000) // Update every 10 seconds
        } else {
            if (progressUpdateInterval.current) {
                clearInterval(progressUpdateInterval.current)
            }
        }

        return () => {
            if (progressUpdateInterval.current) {
                clearInterval(progressUpdateInterval.current)
            }
        }
    }, [isPlaying, currentTime])

    const fetchCourseAndEnrollmentData = async (email) => {
        try {
            setLoading(true)
            setError(null)

            // Fetch user dashboard data to get enrollment info
            const dashboardResponse = await fetch(`http://localhost:9000/api/user/dashboard/${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!dashboardResponse.ok) {
                throw new Error(`HTTP error! status: ${dashboardResponse.status}`)
            }

            const dashboardResult = await dashboardResponse.json()

            if (!dashboardResult.success) {
                throw new Error(dashboardResult.message || "Failed to fetch user data")
            }

            // Find the enrollment for this course
            const enrollment = dashboardResult.data.enrolledCourses.find((course) => course._id === courseId)

            if (!enrollment) {
                throw new Error("Course not found in your enrollments")
            }

            setEnrollmentData(enrollment)

            // Create mock course data with lessons (you can replace this with actual course API)
            const mockCourseData = {
                _id: courseId,
                title: enrollment.title,
                instructor: enrollment.instructor,
                description: enrollment.description,
                totalLessons: 5, // You can get this from your course data
                totalDuration: enrollment.duration,
                level: enrollment.level,
                rating: enrollment.rating,
                students: enrollment.enrollmentCount || 1500,
                lessons: [
                    {
                        id: 1,
                        title: "Introduction to the Course",
                        duration: "15:30",
                        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        description: "Welcome to the course! Let's get started with the basics.",
                        resources: [
                            { name: "Course Slides.pdf", url: "#", type: "pdf" },
                            { name: "Code Examples.zip", url: "#", type: "zip" },
                        ],
                    },
                    {
                        id: 2,
                        title: "Core Concepts",
                        duration: "25:45",
                        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                        description: "Deep dive into the fundamental concepts",
                        resources: [
                            { name: "Concept Guide.pdf", url: "#", type: "pdf" },
                            { name: "Practice Files.zip", url: "#", type: "zip" },
                        ],
                    },
                    {
                        id: 3,
                        title: "Practical Applications",
                        duration: "35:20",
                        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                        description: "Apply what you've learned in real scenarios",
                        resources: [{ name: "Application Guide.pdf", url: "#", type: "pdf" }],
                    },
                    {
                        id: 4,
                        title: "Advanced Techniques",
                        duration: "45:15",
                        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                        description: "Master advanced techniques and best practices",
                        resources: [{ name: "Advanced Examples.zip", url: "#", type: "zip" }],
                    },
                    {
                        id: 5,
                        title: "Final Project",
                        duration: "55:30",
                        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                        description: "Put everything together in a comprehensive project",
                        resources: [{ name: "Project Template.zip", url: "#", type: "zip" }],
                    },
                ],
            }

            setCourseData(mockCourseData)

            // Set current lesson based on enrollment progress
            const currentLessonIndex = (enrollment.currentLesson || 1) - 1
            setCurrentLesson(Math.max(0, currentLessonIndex))

            // Initialize lesson progress from enrollment data
            const completedLessons = enrollment.completedLessons || []
            const progressMap = {}
            completedLessons.forEach((lessonId) => {
                const lessonIndex = mockCourseData.lessons.findIndex((lesson) => lesson.id === lessonId)
                if (lessonIndex !== -1) {
                    progressMap[lessonIndex] = true
                }
            })
            setLessonProgress(progressMap)

            setLoading(false)
        } catch (error) {
            console.error("Error fetching course data:", error)
            setError(error.message)
            setLoading(false)
        }
    }

    const updateProgressInBackground = async (videoCurrentTime) => {
        if (!courseData || !enrollmentData || !videoCurrentTime) return

        try {
            const currentLessonData = courseData.lessons[currentLesson]
            const progressPercentage = duration > 0 ? Math.min((videoCurrentTime / duration) * 100, 100) : 0

            // Only update if progress is significant (more than 5%)
            if (progressPercentage < 5) return

            const response = await fetch("http://localhost:9000/api/user/progress", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId: courseData._id,
                    lessonId: currentLessonData.id,
                    progressPercentage: Math.round(progressPercentage),
                    completedLessons: Object.keys(lessonProgress)
                        .filter((key) => lessonProgress[key])
                        .map((key) => courseData.lessons[Number.parseInt(key)].id),
                    currentLesson: currentLesson + 1,
                }),
            })

            if (response.ok) {
                console.log("Progress updated successfully")
            }
        } catch (error) {
            console.error("Error updating progress:", error)
        }
    }

    const handlePlayPause = () => {
        const video = videoRef.current
        if (!video) return

        if (isPlaying) {
            video.pause()
        } else {
            video.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleVideoEnd = () => {
        setIsPlaying(false)
        markLessonComplete(currentLesson)
        // Auto-play next lesson after 3 seconds
        if (currentLesson < courseData.lessons.length - 1) {
            setTimeout(() => {
                handleNextLesson()
            }, 3000)
        }
    }

    const handleNextLesson = () => {
        if (currentLesson < courseData.lessons.length - 1) {
            setCurrentLesson(currentLesson + 1)
            setIsPlaying(false)
            setCurrentTime(0)
        }
    }

    const handlePreviousLesson = () => {
        if (currentLesson > 0) {
            setCurrentLesson(currentLesson - 1)
            setIsPlaying(false)
            setCurrentTime(0)
        }
    }

    const handleSeek = (e) => {
        const video = videoRef.current
        const progressBar = progressRef.current
        if (!video || !progressBar) return

        const rect = progressBar.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width
        video.currentTime = pos * duration
    }

    const handleVolumeChange = (newVolume) => {
        const video = videoRef.current
        if (!video) return

        setVolume(newVolume)
        video.volume = newVolume
        setIsMuted(newVolume === 0)
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return

        if (isMuted) {
            video.volume = volume
            setIsMuted(false)
        } else {
            video.volume = 0
            setIsMuted(true)
        }
    }

    const toggleFullscreen = () => {
        const videoContainer = videoRef.current?.parentElement
        if (!videoContainer) return

        if (!isFullscreen) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
        setIsFullscreen(!isFullscreen)
    }

    const changePlaybackSpeed = (speed) => {
        const video = videoRef.current
        if (!video) return

        video.playbackRate = speed
        setPlaybackSpeed(speed)
        setShowSettings(false)
    }

    const skipTime = (seconds) => {
        const video = videoRef.current
        if (!video) return

        video.currentTime += seconds
    }

    const markLessonComplete = async (lessonIndex) => {
        try {
            // Update local state immediately
            setLessonProgress((prev) => ({
                ...prev,
                [lessonIndex]: true,
            }))

            const currentLessonData = courseData.lessons[lessonIndex]
            const completedLessons = {
                ...lessonProgress,
                [lessonIndex]: true,
            }

            // Update progress in backend
            const response = await fetch("http://localhost:9000/api/user/progress", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId: courseData._id,
                    lessonId: currentLessonData.id,
                    progressPercentage: 100,
                    completedLessons: Object.keys(completedLessons)
                        .filter((key) => completedLessons[key])
                        .map((key) => courseData.lessons[Number.parseInt(key)].id),
                    currentLesson: lessonIndex + 1,
                }),
            })

            if (response.ok) {
                console.log("Lesson marked as complete successfully")
                // Show success message
                showSuccessMessage("Lesson completed! 🎉")
            } else {
                throw new Error("Failed to update progress")
            }
        } catch (error) {
            console.error("Error marking lesson complete:", error)
            // Revert local state if API call failed
            setLessonProgress((prev) => ({
                ...prev,
                [lessonIndex]: false,
            }))
        }
    }

    const showSuccessMessage = (message) => {
        // Create a temporary success notification
        const notification = document.createElement("div")
        notification.className =
            "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300"
        notification.textContent = message
        document.body.appendChild(notification)

        setTimeout(() => {
            notification.style.opacity = "0"
            setTimeout(() => {
                document.body.removeChild(notification)
            }, 300)
        }, 3000)
    }

    const addBookmark = () => {
        const newBookmark = {
            id: Date.now(),
            lessonId: courseData.lessons[currentLesson].id,
            time: currentTime,
            note: `Bookmark at ${formatTime(currentTime)}`,
        }
        setBookmarks([...bookmarks, newBookmark])
        showSuccessMessage("Bookmark added! 📌")
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const calculateProgress = () => {
        if (!courseData) return 0
        const completedLessons = Object.keys(lessonProgress).filter((key) => lessonProgress[key]).length
        return (completedLessons / courseData.lessons.length) * 100
    }

    const jumpToBookmark = (bookmark) => {
        const video = videoRef.current
        if (!video) return

        // Find the lesson index for this bookmark
        const lessonIndex = courseData.lessons.findIndex((lesson) => lesson.id === bookmark.lessonId)
        if (lessonIndex !== -1 && lessonIndex !== currentLesson) {
            setCurrentLesson(lessonIndex)
            setTimeout(() => {
                video.currentTime = bookmark.time
            }, 1000) // Wait for video to load
        } else {
            video.currentTime = bookmark.time
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading course content...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Failed to load course</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    const currentLessonData = courseData.lessons[currentLesson]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Header */}
            <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">{courseData.title}</h1>
                                <p className="text-gray-400 text-sm">
                                    Lesson {currentLesson + 1} of {courseData.lessons.length}: {currentLessonData.title}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-32 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${calculateProgress()}%` }}
                                    ></div>
                                </div>
                                <span>{Math.round(calculateProgress())}%</span>
                            </div>
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="p-2 text-gray-400 hover:text-white transition-colors md:hidden"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-80px)]">
                {/* Main Video Area */}
                <div className={`flex-1 flex flex-col ${showSidebar && !isMobile ? "mr-80" : ""}`}>
                    {/* Video Player */}
                    <div className="relative bg-black flex-1 flex items-center justify-center group">
                        <video
                            ref={videoRef}
                            src={currentLessonData.videoUrl}
                            className="w-full h-full object-contain"
                            onClick={handlePlayPause}
                        />

                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Center Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={handlePlayPause}
                                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause size={24} className="text-white" />
                                    ) : (
                                        <Play size={24} className="text-white ml-1" />
                                    )}
                                </button>
                            </div>

                            {/* Top Controls */}
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <button
                                    onClick={addBookmark}
                                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
                                >
                                    <Bookmark size={16} />
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
                                >
                                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                                </button>
                            </div>

                            {/* Bottom Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                {/* Progress Bar */}
                                <div
                                    ref={progressRef}
                                    className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                                    onClick={handleSeek}
                                >
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    ></div>
                                </div>

                                {/* Control Buttons */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button onClick={handlePlayPause} className="p-2 text-white hover:text-blue-400 transition-colors">
                                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                        </button>
                                        <button
                                            onClick={() => skipTime(-10)}
                                            className="p-2 text-white hover:text-blue-400 transition-colors"
                                        >
                                            <RotateCcw size={20} />
                                        </button>
                                        <button
                                            onClick={() => skipTime(10)}
                                            className="p-2 text-white hover:text-blue-400 transition-colors"
                                        >
                                            <RotateCw size={20} />
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <button onClick={toggleMute} className="p-2 text-white hover:text-blue-400 transition-colors">
                                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={isMuted ? 0 : volume}
                                                onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                                                className="w-20 h-1 bg-white/20 rounded-full appearance-none slider"
                                            />
                                        </div>
                                        <span className="text-white text-sm">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowSettings(!showSettings)}
                                                className="p-2 text-white hover:text-blue-400 transition-colors"
                                            >
                                                <Settings size={20} />
                                            </button>
                                            {showSettings && (
                                                <div className="absolute bottom-12 right-0 bg-gray-900 rounded-lg p-4 min-w-48 border border-gray-700">
                                                    <h4 className="text-white font-semibold mb-3">Playback Speed</h4>
                                                    <div className="space-y-2">
                                                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                                            <button
                                                                key={speed}
                                                                onClick={() => changePlaybackSpeed(speed)}
                                                                className={`w-full text-left px-3 py-2 rounded transition-colors ${playbackSpeed === speed ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                                                                    }`}
                                                            >
                                                                {speed}x
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lesson Navigation */}
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <button
                                onClick={handlePreviousLesson}
                                disabled={currentLesson === 0}
                                className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SkipBack size={20} />
                            </button>
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <button
                                onClick={handleNextLesson}
                                disabled={currentLesson === courseData.lessons.length - 1}
                                className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SkipForward size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="bg-gray-900/80 backdrop-blur-sm p-6 border-t border-gray-800/50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white mb-2">{currentLessonData.title}</h2>
                                <p className="text-gray-400 text-sm mb-4">{currentLessonData.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{currentLessonData.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={14} />
                                        <span>{courseData.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-400 fill-current" />
                                        <span>{courseData.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => markLessonComplete(currentLesson)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${lessonProgress[currentLesson]
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        }`}
                                >
                                    <CheckCircle size={16} />
                                    {lessonProgress[currentLesson] ? "Completed" : "Mark Complete"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                {showSidebar && (
                    <div
                        className={`${isMobile ? "fixed inset-y-0 right-0 z-50" : "relative"
                            } w-80 bg-gray-900/90 backdrop-blur-sm border-l border-gray-800/50 flex flex-col`}
                    >
                        {/* Sidebar Header */}
                        <div className="p-4 border-b border-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Course Content</h3>
                                {isMobile && (
                                    <button
                                        onClick={() => setShowSidebar(false)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {["curriculum", "notes", "resources"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeTab === "curriculum" && (
                                <div className="p-4 space-y-2">
                                    {courseData.lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            onClick={() => setCurrentLesson(index)}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${index === currentLesson
                                                ? "bg-blue-600/20 border border-blue-600/30"
                                                : "bg-gray-800/50 hover:bg-gray-700/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-white font-medium text-sm">{lesson.title}</h4>
                                                {lessonProgress[index] && <CheckCircle size={16} className="text-green-400" />}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock size={12} />
                                                <span>{lesson.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "notes" && (
                                <div className="p-4">
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Take notes while learning..."
                                        className="w-full h-64 bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                                    />
                                    <div className="mt-4">
                                        <h4 className="text-white font-semibold mb-3">Bookmarks</h4>
                                        <div className="space-y-2">
                                            {bookmarks.map((bookmark) => (
                                                <div
                                                    key={bookmark.id}
                                                    onClick={() => jumpToBookmark(bookmark)}
                                                    className="p-2 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                                                >
                                                    <div className="text-white text-sm">{bookmark.note}</div>
                                                    <div className="text-gray-400 text-xs">Lesson {bookmark.lessonId}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "resources" && (
                                <div className="p-4">
                                    <h4 className="text-white font-semibold mb-3">Lesson Resources</h4>
                                    <div className="space-y-2">
                                        {currentLessonData.resources?.map((resource, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={16} className="text-blue-400" />
                                                    <span className="text-white text-sm">{resource.name}</span>
                                                </div>
                                                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                                    <Download size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoursePlayer
