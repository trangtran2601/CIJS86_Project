export const categories = [
    {
        id: 1,
        name: 'Phòng Khách',
        image: '//theme.hstatic.net/200000044142/1000773248/14/collection2_1.png?v=12022',
    },
    {
        id: 2,
        name: 'Phòng ngủ',
        image: '//theme.hstatic.net/200000044142/1000773248/14/collection2_2.png?v=12022',
    },
    {
        id: 3,
        name: 'Phòng bếp',
        image: '//theme.hstatic.net/200000044142/1000773248/14/collection2_3.png?v=12022',
    },
    {
        id: 4,
        name: 'Hành lang',
        image: '//theme.hstatic.net/200000044142/1000773248/14/collection2_4.png?v=12022',
    },
    {
        id: 5,
        name: 'Phòng làm việc',
        image: '//theme.hstatic.net/200000044142/1000773248/14/collection2_5.png?v=12022',
    },
    {
        id: 6,
        name: 'Trang trí nhà cửa',
        image: '//theme.hstatic.net/200000044142/1000773248/14/collection2_6.png?v=12022',
    }
]

export const navigationItems = [
    {
        id: 1,
        name: 'Giới thiệu',
        link: '/info'
    },
    {
        id: 2,
        name: 'Sản phẩm',
        link: '/collections',
        subnavList: categories
    },
    {
        id: 3,
        name: 'Thương hiệu',
    },
    {
        id: 4,
        name: 'Ưu đãi',
    },
    {
        id: 5,
        name: 'Thư viện & dịch vụ',
        subnavList: [
            {
                id: 1,
                name: 'Thư viện sản phẩm',
            },
            {
                id: 2,
                name: 'Dịch vụ thiết kế',
            },
        ],
    },
]

export const subCategories = [
    {
        id: 1,
        catId: 1,
        name: 'Sofa',
    },
    {
        id: 2,
        catId: 1,
        name: 'Bàn trà, bàn sofa',
    },
    {
        id: 3,
        catId: 1,
        name: 'Kệ tivi',
    },
    {
        id: 4,
        catId: 1,
        name: 'Tủ lưu trữ',
    },
    {
        id: 5,
        catId: 2,
        name: 'Giường ngủ',
    },
    {
        id: 6,
        catId: 2,
        name: 'Tủ đầu giường',
    },
    {
        id: 7,
        catId: 2,
        name: 'Tủ quần áo',
    },
    {
        id: 8,
        catId: 2,
        name: 'Bàn trang điểm',
    },
    {
        id: 9,
        catId: 2,
        name: 'Gương trang điểm',
    },
    {
        id: 10,
        catId: 3,
        name: 'Bàn ăn',
    },
    {
        id: 11,
        catId: 3,
        name: 'Ghế ăn',
    },
    {
        id: 12,
        catId: 4,
        name: 'Tủ giày',
    },
    {
        id: 13,
        catId: 4,
        name: 'Tủ lưu trữ',
    },{
        id: 14,
        catId: 6,
        name: 'Trang trí nhà cửa',
    }

]

export const paymentMethods = [
    {
        id: 1,
        name: "COD",
        shortText: "Thanh toán khi nhận hàng",
        description: [
            "Chính sách thanh toán:" ,
            "- Đối với đơn hàng có giá trị dưới 1.000.000đ: Quý khách vui lòng thanh toán khi nhận hàng.",
            "- Đối với đơn hàng có giá trị từ 1.000.000đ:",
            "+ Tại nội thành TP.HCM: Quý khách thanh toán trước tối thiểu 50% giá trị đơn hàng và thanh toán phần còn lại khi nhận hàng.",
            "+ Tại ngoại thành TP.HCM và các tỉnh: Quý khách thanh toán 100% giá trị đơn hàng trước khi BEYOURs giao hàng.",
            "BEYOURs xin trân trọng cảm ơn." 
        ],
        image: "https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4"
    }, {
        id: 2,
        name: "bank-transfer",
        shortText: "Chuyển khoản qua ngân hàng",
        description: [
            "Nội dung chuyển khoản: SĐT_Mã đơn_Tên" ,
            "Thông tin chuyển khoản:",
            "- Số tài khoản: 0001004902938",
            "- Chủ tài khoản: TRAN NGUYEN THANH NHI",
        ],
        image: "https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4"
    }
]