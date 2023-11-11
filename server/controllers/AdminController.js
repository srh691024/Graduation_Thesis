const asyncHandler = require('express-async-handler');
const User = require('../models/User')
const Couple = require('../models/Couple');
const Post = require('../models/Post');
const moment = require('moment');

const getTotalStatistic = asyncHandler(async (req, res) => {
    const listTotal = [
        {
            totalAccounts: 0,
            rate: 0,
        },
        {
            totalCouples: 0,
            rate: 0,
        },
        {
            totalInteractions: 0,
            rate: 0,
        },
        {
            totalPosts: 0,
            rate: 0,
        }
    ]

    // const currentDate = new Date();
    // const lastMonthDate = moment(currentDate).subtract(1, 'month').toDate();

    const now = moment(); // Lấy ngày hiện tại
    const thisMonthStart = now.clone().startOf('month'); // Ngày đầu tiên của tháng hiện tại
    const lastMonthStart = thisMonthStart.clone().subtract(1, 'months'); // Ngày đầu tiên của tháng trước
    //ACCOUNTS
    const accounts = await User.find()
    listTotal[0].totalAccounts = accounts.length;

    // Số lượng người dùng trong tháng hiện tại
    const usersThisMonth = await User.countDocuments({
        createdAt: { $gte: thisMonthStart.toDate(), $lt: now.toDate() }
    });

    // Số lượng người dùng trong tháng trước
    const usersLastMonth = await User.countDocuments({
        createdAt: { $gte: lastMonthStart.toDate(), $lt: thisMonthStart.toDate() }
    });

    // Tính tỷ lệ số người dùng tháng này so với tháng trước
    const userRatio = (usersThisMonth - usersLastMonth) / usersLastMonth * 100;
    listTotal[0].rate = userRatio.toFixed(1)


    //COUPLES
    const couples = await Couple.find({ isConnected: true })
    listTotal[1].totalCouples = couples.length;

    //Số lượng couple tháng hiện tại 
    const couplesThisMonth = await Couple.countDocuments({
        $and: [
            { isConnected: true },
            { startConnectedDate: { $gte: thisMonthStart.toDate(), $lt: now.toDate() } }
        ]
    })


    //Số lượng couple tháng trước
    const couplesLastMonth = await Couple.countDocuments({
        $and: [
            { isConnected: true },
            { startConnectedDate: { $gte: lastMonthStart.toDate(), $lt: thisMonthStart.toDate() } }
        ]
    })

    //Tỷ lệ couple tháng hiện tại so với tháng trước
    const coupleRatio = (couplesThisMonth - couplesLastMonth) / couplesLastMonth * 100;
    listTotal[1].rate = coupleRatio.toFixed(1);

    //INTERACTIONS
    const posts = await Post.find();
    let totalLike = 0;
    let totalComment = 0;
    posts.map((post) => (totalLike += post.likes.length));
    posts.map((post) => (totalComment += post.comments.length));
    listTotal[2].totalInteractions = totalLike + totalComment;

    //Số lượng interaction tháng hiện tại
    const commentsThisMonth = await Post.countDocuments({
        'comments.created': { $gte: thisMonthStart.toDate(), $lt: now.toDate() }
    })

    //Số lượng interaction tháng trước
    const commentsLastMonth = await Post.countDocuments({
        'comments.created': { $gte: lastMonthStart.toDate(), $lt: thisMonthStart.toDate() }
    })

    // Tỷ lệ interaction tháng hiện tại và tháng trước
    const interactionRatio = (commentsThisMonth - commentsLastMonth) / commentsLastMonth * 100;
    listTotal[2].rate = interactionRatio.toFixed(1);

    //POSTS
    listTotal[3].totalPosts = posts.length;

    //Số lượng posts tháng hiện tại
    const postsThisMonth = await Post.countDocuments({
        createdAt: { $gte: thisMonthStart.toDate(), $lt: now.toDate() }
    })

    //Số lượng posts tháng trước
    const postsLastMonth = await Post.countDocuments({
        createdAt: { $gte: lastMonthStart.toDate(), $lt: thisMonthStart.toDate() }
    })

    //Tỷ lệ posts tháng hiện tại và tháng trước
    const postRatio = (postsThisMonth - postsLastMonth) / postsLastMonth * 100;
    listTotal[3].rate = postRatio.toFixed(1);

    return res.status(200).json({
        success: true,
        result: listTotal
    })

})

const getPost12Months = asyncHandler(async (req, res) => {
    let currentDate = new Date(); // Lấy ngày hiện tại
    let currentYear = currentDate.getFullYear(); // Lấy năm hiện tại

    // Tạo ngày bắt đầu và ngày kết thúc cho khoảng thời gian (12 tháng của năm 2023)
    const startDate = new Date(currentYear, 0, 1); // 0 đại diện cho tháng 1 (tháng đầu tiên của năm)
    const endDate = new Date(currentYear, 12, 1); // 12 đại diện cho tháng 1 của năm sau

    let pipeline = [
        {
            $match: {
                // Tìm các bài post đã được tạo trong khoảng thời gian cần xem
                createdAt: {
                    $gte: startDate,
                    $lt: endDate, // Đến tháng hiện tại
                },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                totalPosts: { $sum: 1 },
            },
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1 },
        },
    ];

    let result = await Post.aggregate(pipeline);

    // Tạo một đối tượng Map để theo dõi các tháng và tổng số bài post
    const monthPostMap = new Map();

    // Khởi tạo tất cả tháng có tổng số bài post là 0
    for (let i = 1; i <= 12; i++) {
        monthPostMap.set(i, 0);
    }

    // Cập nhật tổng số bài post từ kết quả truy vấn
    result.forEach((record) => {
        const month = record._id.month;
        const totalPosts = record.totalPosts;
        monthPostMap.set(month, totalPosts);
    });

    // Tạo kết quả cuối cùng với totalPost của tất cả các tháng
    const monthlyPostCounts = [...monthPostMap.values()];


    return res.status(200).json({
        success: true,
        result: monthlyPostCounts
    })
})

const getComments12Months = asyncHandler(async (req, res) => {
    let currentDate = new Date(); // Lấy ngày hiện tại
    let currentYear = currentDate.getFullYear(); // Lấy năm hiện tại
    let pipeline = [
        {
            $unwind: '$comments', // Giải quyết mảng 'comments'
        },
        {
            $match: {
                // Tìm các bài viết có bình luận trong khoảng thời gian cần xem
                "comments.created": {
                    $gte: new Date(currentYear, 0, 1), // 0 đại diện cho tháng 1 (tháng đầu tiên của năm)
                    $lt: new Date(currentYear + 1, 0, 1), // Lấy đến tháng 1 của năm sau
                },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$comments.created' },
                    month: { $month: '$comments.created' },
                },
                totalComments: { $sum: 1 },
            },
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1 },
        },
    ];

    let result = await Post.aggregate(pipeline);


    // Tạo một đối tượng Map để theo dõi các tháng và tổng số bài post
    const monthCommentMap = new Map();

    // Khởi tạo tất cả tháng có tổng số bài post là 0
    for (let i = 1; i <= 12; i++) {
        monthCommentMap.set(i, 0);
    }

    // Cập nhật tổng số bài post từ kết quả truy vấn
    result.forEach((record) => {
        const month = record._id.month;
        const totalComments = record.totalComments;
        monthCommentMap.set(month, totalComments);
    });

    // Tạo kết quả cuối cùng với totalPost của tất cả các tháng
    const monthlyCommentCounts = [...monthCommentMap.values()];


    return res.status(200).json({
        success: true,
        result: monthlyCommentCounts
    });
});

const getAccounts12Months = asyncHandler(async (req, res) => {
    let currentDate = new Date(); // Lấy ngày hiện tại
    let currentYear = currentDate.getFullYear(); // Lấy năm hiện tại

    // Tạo ngày bắt đầu và ngày kết thúc cho khoảng thời gian (12 tháng của năm 2023)
    const startDate = new Date(currentYear, 0, 1); // 0 đại diện cho tháng 1 (tháng đầu tiên của năm)
    const endDate = new Date(currentYear, 12, 1); // 12 đại diện cho tháng 1 của năm sau

    let pipeline = [
        {
            $match: {
                // Tìm các bài post đã được tạo trong khoảng thời gian cần xem
                createdAt: {
                    $gte: startDate,
                    $lt: endDate, // Đến tháng hiện tại
                },
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                totalAccounts: { $sum: 1 },
            },
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1 },
        },
    ];

    let result = await User.aggregate(pipeline);

    // Tạo một đối tượng Map để theo dõi các tháng và tổng số bài post
    const monthAccountMap = new Map();

    // Khởi tạo tất cả tháng có tổng số bài post là 0
    for (let i = 1; i <= 12; i++) {
        monthAccountMap.set(i, 0);
    }

    // Cập nhật tổng số bài post từ kết quả truy vấn
    result.forEach((record) => {
        const month = record._id.month;
        const totalAccounts = record.totalAccounts;
        monthAccountMap.set(month, totalAccounts);
    });

    // Tạo kết quả cuối cùng với totalPost của tất cả các tháng
    const monthlyAccountCounts = [...monthAccountMap.values()];


    return res.status(200).json({
        success: true,
        result: monthlyAccountCounts
    })
})

const getDataDoughnut = asyncHandler(async (req, res) => {
    const data = [
        {
            disconnectThismonth: 0,
            connectThismonth: 0,
        },
        {
            disconnectLastmonth: 0,
            connectLastmonth: 0,
        }
    ]

    const now = moment(); // Lấy ngày hiện tại
    const thisMonthStart = now.clone().startOf('month'); // Ngày đầu tiên của tháng hiện tại
    const lastMonthStart = thisMonthStart.clone().subtract(1, 'months'); // Ngày đầu tiên của tháng trước

    //Số lượng couple connect tháng hiện tại
    const connectCoupleThismonth = await Couple.countDocuments({
        $and: [
            { isConnected: true },
            { startConnectedDate: { $gte: thisMonthStart.toDate(), $lt: now.toDate() } }
        ]
    })
    data[0].connectThismonth = connectCoupleThismonth

    //Số lượng couple connect tháng trước
    const connectCoupleLastmonth = await Couple.countDocuments({
        $and: [
            { isConnected: true },
            { startConnectedDate: { $gte: lastMonthStart.toDate(), $lt: thisMonthStart.toDate() } }
        ]
    })
    data[1].connectLastmonth = connectCoupleLastmonth

    //Số lượng couple disconnect tháng hiện tại
    const disconnectCoupleThismonth = await Couple.countDocuments({
        $and: [
            { isConnected: false },
            { disconnectedDate: { $gte: thisMonthStart.toDate(), $lt: now.toDate() } }
        ]
    })
    data[0].disconnectThismonth = disconnectCoupleThismonth

    //Số lượng couple disconnect tháng trước
    const disconnectCoupleLastmonth = await Couple.countDocuments({
        $and: [
            { isConnected: false },
            { disconnectedDate: { $gte: lastMonthStart.toDate(), $lt: thisMonthStart.toDate() } }
        ]
    })
    data[1].disconnectLastmonth = disconnectCoupleLastmonth

    return res.status(200).json({
        success: true,
        result: data
    })
})

const isDaytime = (post) => {
    const postHour = moment(post.createdAt).hour();
    return postHour >= 6 && postHour < 18; // Daytime: 6:00 AM : 18:00PM
};

const dataForBarStackChart = asyncHandler(async (req, res) => {
    const startDate = moment().startOf('week'); // Firstday of week
    const endDate = moment().endOf('week'); // Last day of week

    const posts = await Post.find({
        createdAt: {
            $gte: startDate,
            $lt: endDate,
        }
    })

    const postsByDay = {
        Monday: { daytime: 0, nighttime: 0 },
        Tuesday: { daytime: 0, nighttime: 0 },
        Wednesday: { daytime: 0, nighttime: 0 },
        Thursday: { daytime: 0, nighttime: 0 },
        Friday: { daytime: 0, nighttime: 0 },
        Saturday: { daytime: 0, nighttime: 0 },
        Sunday: { daytime: 0, nighttime: 0 },
    };

    posts.forEach((post) => {
        const dayOfWeek = moment(post.createdAt).format('dddd');
        if (isDaytime(post)) {
            postsByDay[dayOfWeek].daytime += 1;
        } else {
            postsByDay[dayOfWeek].nighttime += 1;
        }
    });

    return res.status(200).json({
        success: true,
        result: postsByDay
    })
})

const banReport = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const post = await Post.findByIdAndUpdate(postId, { isBanned: true, mode: 'Private' })

    return res.status(200).json({
        success: post ? true : false,
        result: post ? post : 'Can not ban this post'
    })
})

const unBanReport = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const post = await Post.findByIdAndUpdate(postId, { isBanned: false })

    return res.status(200).json({
        success: post ? true : false,
        result: post ? post : 'Can not unban this post'
    })
})




module.exports = {
    getTotalStatistic,
    getPost12Months,
    getComments12Months,
    getAccounts12Months,
    getDataDoughnut,
    dataForBarStackChart,
    banReport,
    unBanReport
}
