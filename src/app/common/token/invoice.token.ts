
export let invoiceTokens: Array<any> = [
    {
        value: '{Ten_Khoan_Thu}', text: '#: Item[i].Name #'
    },
    {
        value: '{Don_Vi}', text: '#: Item[i].Unit #'
    },
    {
        value: '{So_Luong}', text: '#: Item[i].Quantity #'
    },
    {
        value: '{Don_Gia}', text: '#=kendo.toString((Item[i].Price), \'n0\') #'
    },
    {
        value: '{Thanh_Tien}', text: '#=kendo.toString((Item[i].TotalPrice),\'n0\')#'
    },
    {
        value: '{Ghi_Chu}', text: '#: Item[i].Note #'
    },
    {
        value: '{Ma_Hoa_Don}', text: '#: data.Code #'
    },
    {
        value: '{Ten_Nha}', text: '#: data.HouseName #'
    },
    {
        value: '{Dia_Chi_Nha}', text: '#: data.HouseAddress #'
    },
    {
        value: '{Tong_Tien_Can_Thu}', text: '#: data.Total #'
    },
    {
        value: '{Tong_Tien_Thanh_Toan}', text: '#: data.CustomerAmount #'
    },
    {
        value: '{Tong_Tien_Con_Thieu}', text: '#: data.CustomerMiss #'
    },
    {
        value: '{First}', text: '#for (var i = 0; i < data.Item.length; i++) { if (!data.Item[i].ToppingParentUuid) { #'
    },
    {
        value: '{Last}', text: '# }} #'
    },
    {
        value: '{STT}', text: '#=i + 1#'
    }
];
