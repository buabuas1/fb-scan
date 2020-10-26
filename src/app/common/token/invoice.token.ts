
export let invoiceTokens: Array<any> = [
    {
        value: '{Ten_Khoan_Thu}', text: '#: item[i].name #'
    },
    {
        value: '{Don_Vi}', text: '#: item[i].unit #'
    },
    {
        value: '{So_Luong}', text: '#: item[i].quantity #'
    },
    {
        value: '{Don_Gia}', text: '#=kendo.toString((item[i].price), \'n0\') #'
    },
    {
        value: '{Thanh_Tien}', text: '#=kendo.toString((item[i].totalPrice),\'n0\')#'
    },
    {
        value: '{Ghi_Chu}', text: '#: item[i].note ? item[i].note : "" #'
    },
    {
        value: '{Ma_Hoa_Don}', text: '#: data.code #'
    },
    {
        value: '{Ten_Nha}', text: '#: data.house ? data.house.name : "" #'
    },
    {
        value: '{Ma_Phong}', text: '#: data.room ? data.room.name : "" #'
    },
    {
        value: '{Dia_Chi_Nha}', text: '#: data.house ? data.house.address : "" #'
    },
    {
        value: '{Chu_Nha}', text: '#: data.house && data.house.host ? (data.house.host.name + " - " + data.house.host.phone) : "" #'
    },
    {
        value: '{Tong_Tien_Can_Thu}', text: '#=kendo.toString(data.total, \'n0\') #'
    },
    {
        value: '{Tong_Tien_Thanh_Toan}', text: '#: data.CustomerAmount #'
    },
    {
        value: '{Tong_Tien_Con_Thieu}', text: '#: data.CustomerMiss #'
    },
    {
        value: '{First}', text: '#for (var i = 0; i < data.item.length; i++) { if (!data.item[i].ToppingParentUuid) { #'
    },
    {
        value: '{Last}', text: '# }} #'
    },
    {
        value: '{STT}', text: '#=i + 1#'
    }
];
