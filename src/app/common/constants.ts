export const BdsType = {
    CHO_THUE_PHONG: 'CHO_THUE_PHONG',
    TIM_PHONG: 'TIM_PHONG',
    SANG_NHUONG: 'SANG_NHUONG',
    VAN_PHONG: 'VAN_PHONG',
    THANH_LY: 'THANH_LY',
    CHO_THUE_NHA: 'CHO_THUE_NHA'
};

export const BdsTypeArray = [
    {key: 'CHO_THUE_PHONG', value: 'Cho thuê phòng'},
    {key: 'TIM_PHONG', value: 'Tìm phòng'},
    {key: 'SANG_NHUONG', value: 'Sang nhượng'},
    {key: 'VAN_PHONG', value: 'Văn phòng'},
    {key: 'THANH_LY', value: 'Thanh lý'},
    {key: 'CHO_THUE_NHA', value: 'Nhà nguyên căn'},
    {key: 'KHAC', value: 'Khác'},
];

export const MAX_DBS_PRICE = 100000000; // 100tr
export const MID_DBS_PRICE = 20000000; // 20tr

export const BDS_REGEX = [
    {
        'id': 1,
        'name': 'Cho thuê phòng',
        'matched_expressions': [
            '(cho thuê, khoá vân tay)',
            'CCMN&24/7',
            'CCMN&24/24'
        ]
    },
    {
        'id': 2,
        'name': 'Cho thuê nhà nguyên căn',
        'matched_expressions': [
            '(nguyên căn)'
        ]
    },
    {
        'id': 3,
        'name': 'Tìm phòng',
        'matched_expressions': [
            '(Cần tìm phòng, tìm phòng, muốn thuê phòng, tìm phòg, tìm nhà, cần thuê)'
        ],
        'negative_expressions': [
            'nguyên căn'
        ]
    },
    {
        'id': 4,
        'name': 'Sang nhượng',
        'matched_expressions': [
            '(nhượng)'
        ]
    },
    {
        'id': 5,
        'name': 'Văn phòng',
        'matched_expressions': [
            '(văn phòng)'
        ]
    },
    {
        'id': 6,
        'name': 'Thanh lý',
        'matched_expressions': [
            '(thanh  lý , thanh lí)'
        ]
    }
];

export enum PrintTypes {
    Invoice = 1
}
export enum ProductTypesEnum {
    Normal= 1,
    ByNumber = 2,
    ByPerson = 3
}

export const ProductTypes = [
    {name: 'Hàng hóa thường', _id: ProductTypesEnum.Normal},
    {name: 'Hàng thu theo số', _id: ProductTypesEnum.ByNumber},
    {name: 'Hàng thu theo người', _id: ProductTypesEnum.ByPerson},
];


/* tslint:disable */
export const invoicePrintTemplate = `
<div>
    <kv-print-div>
        <kv-print-div>
            <kv-print-div>
                <table style="width:100%">
                    <tbody>
                    <tr>
                        <td style="text-align:center"><span style="font-size:12px"><span
                            style="font-family:Arial,Helvetica,sans-serif"><strong>HÓA ĐƠN THANH TOÁN<br/>
\t\t\tMã hóa đơn:</strong> </span></span><span style="font-size:16px"><span
                            style="font-family:Arial,Helvetica,sans-serif"><strong>{Ma_Hoa_Don}</strong></span></span>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:center">
                            <p>Nhà: {Ten_Nha}<span style="font-size:12px"><span
                                style="font-family:Arial,Helvetica,sans-serif"><strong></strong></span></span><br/>
                                <span style="font-size:12px">
                                    <span style="font-family:Arial,Helvetica,sans-serif">
                                    Địa chỉ: {Dia_Chi_Nha}
                                    </span>
                                </span>
                                <br/>
                                <br/>
                                <span style="font-size:12px">
                                    <strong>
                                    <span style="font-family:Arial,Helvetica,sans-serif">
                                    Phòng: {Ma_Phong}
                                    </span>
                                    </strong>
                                </span>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div style="height:5px">&nbsp;</div>

                <div style="height:5px">&nbsp;</div>

                <div style="height:5px">&nbsp;</div>

                <table border="1" cellpadding="3" cellspacing="0"
                       style="border-collapse:collapse; margin-top:20px; width:100%">
                    <tbody>
                    <tr>
                        <td><strong>STT</strong></td>
                        <td><strong>Tên hàng hóa, dịch vụ</strong></td>
                        <td style="text-align:right"><strong>Đơn vị</strong></td>
                        <td style="text-align:right"><strong>Đơn giá</strong></td>
                        <td style="text-align:right"><strong>Số lượng</strong></td>
                        <td style="text-align:right"><strong>Thành tiền</strong></td>
                        <td style="text-align:right"><strong>Ghi chú</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <p>{STT}</p>
                        </td>
                        <td>
                            <p>{Ten_Khoan_Thu}</p>
                        </td>
                        <td>
                            <p>{Don_Vi}</p>
                        </td>
                        <td style="text-align:right">
                            <p>{Don_Gia}</p>
                        </td>
                        <td style="text-align:right">
                            <p>{So_Luong}</p>
                        </td>
                        <td style="text-align:right">
                            <p>{Thanh_Tien}</p>
                        </td>
                        <td style="text-align:right">
                            <p>{Ghi_Chu}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table border="0" cellpadding="3" cellspacing="0"
                       style="border-collapse:collapse; margin-top:5px; width:98%">
                    <tfoot>
                    <tr>
                        <td style="font-size:11px; font-weight:bold; text-align:left; white-space:nowrap"><span
                            style="font-size:12px"><span
                            style="font-family:Arial,Helvetica,sans-serif">Tổng tiền:</span></span></td>
                        <td>&nbsp;</td>
                        <td style="font-size:11px; font-weight:bold; text-align:right">
                            <span
                                style="font-size:12px">
                                <span style="font-family:Arial,Helvetica,sans-serif">
                                    {Tong_Tien_Can_Thu}
                                </span>
                            </span>
                        </td>
                    </tr>
                    </tfoot>
                </table>

                <div style="border-bottom:1px solid black; height:10px">&nbsp;</div>
                <div style="border-bottom:1px solid black; height:5px">&nbsp;</div>

                <div style="text-align:right"><br/>
                    &nbsp;Liên hệ: {Chu_Nha}
                </div>
            </kv-print-div>
        </kv-print-div>
    </kv-print-div>
</div>
`;

export const vnCultures = {
    name: "vi-VN",
    numberFormat: {
        pattern: ["-n"],
        decimals: 2,
        ",": ".",
        ".": ",",
        groupSize: [3],
        percent: {
            pattern: ["-n%", "n%"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            symbol: "%"
        },
        currency: {
            name: "Vietnamese Dong",
            abbr: "VND",
            pattern: ["-n $", "n $"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            symbol: "₫"
        }
    },
    calendars: {
        standard: {
            days: {
                names: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
                namesAbbr: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
                namesShort: ["C", "H", "B", "T", "N", "S", "B"]
            },
            months: {
                names: ["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
                namesAbbr: ["Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6", "Thg7", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12"]
            },
            AM: ["SA", "sa", "SA"],
            PM: ["CH", "ch", "CH"],
            patterns: {
                d: "dd/MM/yyyy",
                D: "dd MMMM yyyy",
                F: "dd MMMM yyyy h:mm:ss tt",
                g: "dd/MM/yyyy h:mm tt",
                G: "dd/MM/yyyy h:mm:ss tt",
                m: "dd MMMM",
                M: "dd MMMM",
                s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                t: "h:mm tt",
                T: "h:mm:ss tt",
                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                y: "MMMM yyyy",
                Y: "MMMM yyyy"
            },
            "/": "/",
            ":": ":",
            firstDay: 1
        }
    }
}

/* tslint:enable */

export const COMMENT_STATUS = {
    NEW: 1,
    ISSUE: 2,
    SUCCESS: 3
};
