const moment = require("moment")
const { ObjectId } = require("mongodb")
const { getUserCollection, getCourseCollection, getEnrollmentCollection } = require("../config/db")

const getUserDashboard = async (req, res) => {
    try {
        const userEmail = req.params.email

        // Verify the authenticated user matches the requested email
        if (req.user && req.user.email !== userEmail) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to user data",
            })
        }

        const userCollection = getUserCollection()
        const courseCollection = getCourseCollection()
        const enrollmentCollection = getEnrollmentCollection()

        // Get user data
        const user = await userCollection.findOne({ email: userEmail })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        // Get user's enrollments with course details
        const enrollments = await enrollmentCollection
            .aggregate([
                { $match: { studentEmail: userEmail } },
                {
                    $lookup: {
                        from: "courses",
                        localField: "courseId",
                        foreignField: "_id",
                        as: "courseDetails",
                    },
                },
                { $unwind: "$courseDetails" },
                {
                    $project: {
                        _id: 1,
                        courseId: 1,
                        enrollmentDate: 1,
                        progress: 1,
                        status: 1,
                        transactionId: 1,
                        amount: 1,
                        paymentMethod: 1,
                        lastAccessed: "$progress.lastAccessed",
                        completedLessons: "$progress.completedLessons",
                        currentLesson: "$progress.currentLesson",
                        progressPercentage: "$progress.progressPercentage",
                        course: {
                            _id: "$courseDetails._id",
                            title: "$courseDetails.title",
                            description: "$courseDetails.description",
                            thumbnailUrl: "$courseDetails.thumbnailUrl",
                            price: "$courseDetails.price",
                            duration: "$courseDetails.duration",
                            level: "$courseDetails.level",
                            category: "$courseDetails.category",
                            instructor: "$courseDetails.instructor",
                            rating: "$courseDetails.rating",
                            reviewCount: "$courseDetails.reviewCount",
                            contents: "$courseDetails.contents",
                        },
                    },
                },
                { $sort: { enrollmentDate: -1 } },
            ])
            .toArray()

        // Get user's favorite courses (if stored in user document)
        const favoriteIds = user.favoriteCourses || []
        const favorites =
            favoriteIds.length > 0
                ? await courseCollection
                    .find({
                        _id: { $in: favoriteIds.map((id) => new ObjectId(id)) },
                    })
                    .toArray()
                : []

        // Calculate statistics
        const totalCourses = enrollments.length
        const completedCourses = enrollments.filter((e) => e.progressPercentage >= 100).length
        const totalHours = enrollments.reduce((sum, enrollment) => {
            const duration = enrollment.course.duration || "0h"
            const hours = Number.parseInt(duration.replace(/[^\d]/g, "")) || 0
            return sum + hours
        }, 0)

        // Get recent transactions
        const transactions = enrollments.map((enrollment) => ({
            id: enrollment._id,
            courseTitle: enrollment.course.title,
            amount: enrollment.amount,
            paymentMethod: enrollment.paymentMethod,
            transactionId: enrollment.transactionId,
            date: enrollment.enrollmentDate,
            status: enrollment.status,
        }))

        // Generate achievements based on user progress
        const achievements = [
            {
                id: 1,
                title: "First Course Completed",
                icon: "Trophy",
                earned: completedCourses > 0,
                date: completedCourses > 0 ? enrollments.find((e) => e.progressPercentage >= 100)?.enrollmentDate : null,
            },
            {
                id: 2,
                title: "5 Courses Enrolled",
                icon: "BookOpen",
                earned: totalCourses >= 5,
                date: totalCourses >= 5 ? enrollments[4]?.enrollmentDate : null,
            },
            {
                id: 3,
                title: "Learning Streak - 7 Days",
                icon: "Zap",
                earned: false, // This would require tracking daily activity
                date: null,
            },
            {
                id: 4,
                title: "Top Performer",
                icon: "Star",
                earned: completedCourses >= 3,
                date: completedCourses >= 3 ? enrollments.filter((e) => e.progressPercentage >= 100)[2]?.enrollmentDate : null,
            },
        ]

        // Generate recent activity
        const recentActivity = []

        // Add recent enrollments
        enrollments.slice(0, 3).forEach((enrollment) => {
            recentActivity.push({
                id: `enrollment-${enrollment._id}`,
                type: "enrollment",
                course: enrollment.course.title,
                date: moment(enrollment.enrollmentDate).format("YYYY-MM-DD"),
                icon: "BookOpen",
            })
        })

        // Add recent completions
        enrollments
            .filter((e) => e.progressPercentage >= 100)
            .slice(0, 2)
            .forEach((enrollment) => {
                recentActivity.push({
                    id: `completion-${enrollment._id}`,
                    type: "completion",
                    course: enrollment.course.title,
                    date: moment(enrollment.enrollmentDate).format("YYYY-MM-DD"),
                    icon: "CheckCircle",
                })
            })

        // Sort by date
        recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date))

        const dashboardData = {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                instituteName: user.instituteName,
                imgUrl: user.imgUrl,
                role: user.role,
                createdAt: user.createdAt,
                lastActive: user.lastActive,
            },
            stats: {
                totalCourses,
                completedCourses,
                totalHours,
                certificates: completedCourses,
            },
            enrolledCourses: enrollments.map((e) => ({
                ...e.course,
                enrollmentId: e._id,
                enrollmentDate: e.enrollmentDate,
                progress: e.progressPercentage || 0,
                lastAccessed: e.lastAccessed,
                completedLessons: e.completedLessons || [],
                currentLesson: e.currentLesson || 1,
            })),
            favorites,
            transactions,
            achievements,
            recentActivity: recentActivity.slice(0, 10),
        }

        res.status(200).json({
            success: true,
            data: dashboardData,
        })
    } catch (error) {
        console.error("Error fetching user dashboard:", error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data",
            error: error.message,
        })
    }
}

const updateUserProgress = async (req, res) => {
    try {
        console.log(req.params.email)
        const { courseId, lessonId, progressPercentage, completedLessons } = req.body
        const userEmail = req.user.email

        if (!courseId || progressPercentage === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: courseId and progressPercentage",
            })
        }

        const enrollmentCollection = getEnrollmentCollection()

        // Update the enrollment progress
        const updateData = {
            "progress.progressPercentage": progressPercentage,
            "progress.lastAccessed": new Date(),
            updatedAt: new Date(),
        }

        if (lessonId) {
            updateData["progress.currentLesson"] = lessonId
        }

        if (completedLessons) {
            updateData["progress.completedLessons"] = completedLessons
        }

        const result = await enrollmentCollection.updateOne(
            {
                courseId: new ObjectId(courseId),
                studentEmail: userEmail,
            },
            { $set: updateData },
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
        })
    } catch (error) {
        console.error("Error updating user progress:", error)
        res.status(500).json({
            success: false,
            message: "Failed to update progress",
            error: error.message,
        })
    }
}

module.exports = {
    getUserDashboard,
    updateUserProgress,
}
