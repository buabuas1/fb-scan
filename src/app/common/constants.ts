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

/* tslint:disable */
export const invoicePrintTemplate = `
<div><kv-print-div><kv-print-div><kv-print-div>
    <table style="width:100%">
        <tbody>
        <tr>
            <td style="text-align:center">
                <p>{Ten_Nha}<span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif"><strong></strong></span></span><br />
                    <span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">Đ/C: {Dia_Chi_Nha}</span></span></p>
            </td>
        </tr>
        <tr>
            <td style="text-align:center"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif"><strong>HÓA ĐƠN THANH TOÁN<br />
			Số HĐ:</strong> </span></span><span style="font-size:16px"><span style="font-family:Arial,Helvetica,sans-serif"><strong>{Ma_Hoa_Don}</strong></span></span></td>
        </tr>
        </tbody>
    </table>

    <div style="height:5px">&nbsp;</div>

    <div style="height:5px">&nbsp;</div>

    <div style="height:5px">&nbsp;</div>

    <table border="1" cellpadding="3" cellspacing="0" style="border-collapse:collapse; margin-top:20px; width:100%">
        <tbody>
            <tr>
                <td><strong>STT</strong></td>
                <td><strong>Tên hàng hóa, dịch vụ</strong></td>
                <td style="text-align:right"><strong>Đơn vị</strong></td>
                <td style="text-align:right"><strong>Số lượng</strong></td>
                <td style="text-align:right"><strong>Đơn giá</strong></td>
                <td style="text-align:right"><strong>Thành tiền</strong></td>
            </tr>
            <tr>
                <td style="border-bottom:1px solid black"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{STT}</span></span><br /></td>
                <td style="border-bottom:1px solid black; text-align:left"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Ten_Khoan_Thu}</span></span></td>
                <td style="border-bottom:1px solid black; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Don_Vi}</span></span></td>
                <td style="border-bottom:1px solid black; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{So_Luong}</span></span></td>
                <td style="border-bottom:1px solid black; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Don_Gia}</span></span></td>
                <td style="border-bottom:1px solid black; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Thanh_Tien}</span></span></td>
            </tr>
        </tbody>
    </table>

    <table border="0" cellpadding="3" cellspacing="0" style="border-collapse:collapse; margin-top:5px; width:98%">
        <tfoot>
        <tr>
            <td style="font-size:11px; font-weight:bold; text-align:left; white-space:nowrap"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">Tổng tiền cần thu:</span></span></td>
            <td>&nbsp;</td>
            <td style="font-size:11px; font-weight:bold; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Tong_Tien_Can_Thu}</span></span></td>
        </tr>
        <tr>
            <td style="font-size:11px; font-weight:bold; text-align:left; white-space:nowrap"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">Phụ huynh thanh toán:</span></span></td>
            <td>&nbsp;</td>
            <td style="font-size:11px; font-weight:bold; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Tong_Tien_Thanh_Toan}</span></span></td>
        </tr>
        <tr>
            <td style="font-size:11px; font-weight:bold; text-align:left; white-space:nowrap"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">Tổng tiền còn thiếu:</span></span></td>
            <td>&nbsp;</td>
            <td style="font-size:11px; font-weight:bold; text-align:right"><span style="font-size:12px"><span style="font-family:Arial,Helvetica,sans-serif">{Tong_Tien_Con_Thieu}</span></span></td>
        </tr>
        </tfoot>
    </table>

    <div style="border-bottom:1px solid black; height:10px">&nbsp;</div>
    <div style="border-bottom:1px solid black; height:5px">&nbsp;</div>

    <div style="text-align:center"><br />
        &nbsp;</div>
</kv-print-div></kv-print-div> </kv-print-div></div>
`;

/* tslint:enable */
