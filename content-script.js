const key = '抓包Authorization字段Bearer后的字符串'

window.addEventListener('load', async () => {
    const name = document.querySelector('.wrapper .title')?.innerText
    if (name) {
        console.log('获取到name: ', name)
        const list = await search(name)
        const data = list.data || {}
        data['ud_ziyuan_5a6bcd'].forEach(async (item) => {
            const res = await getUrl(item.id)
            res.data.ziyuan.forEach(resource => {
                createDownloadButton(resource.ud_wangpanlianjie_46c21b, resource.ud_mima_73219a)
                console.log(resource.ud_wangpanlianjie_46c21b, resource.ud_mima_73219a)
            })
        })
    }
})

function search(name) {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("Authorization", `Bearer ${key}`);
    myHeaders.append("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f2f) NetType/WIFI Language/zh_CN");
    myHeaders.append("Referer", "https://servicewechat.com/wxc8db7be358bebe61/25/page-frame.html");
    const raw = JSON.stringify({
        "operationName": "ud_ziyuan_5a6bcd_udZiyuan5A6BcdList_laf9y4tz_u1",
        "variables": {},
        "query": `query ud_ziyuan_5a6bcd_udZiyuan5A6BcdList_laf9y4tz_u1 {\n  ud_ziyuan_5a6bcd(where: {_and: [{ud_title_3d7485: {_ilike: \"%${name}%\"}}, {_or: [{_and: [{}, {}]}, {}]}]}, order_by: [{created_at: desc_nulls_last}, {id: desc_nulls_last}], limit: 10) {\n id\n ud_title_3d7485\n }\n}\n`
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch("https://zion-app.functorz.com/X5YYjkqOo5E/zero/y7xXo5wz4g0/api/graphql-v2", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function getUrl(id) {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("Authorization", `Bearer ${key}`);
    myHeaders.append("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f2f) NetType/WIFI Language/zh_CN");
    myHeaders.append("Referer", "https://servicewechat.com/wxc8db7be358bebe61/25/page-frame.html");
    const raw = JSON.stringify({
        "operationName": "batchQueryu23",
        "variables": {},
        "query": `query batchQueryu23 {\n  ziyuan: ud_ziyuan_5a6bcd(where: {_and: [{id: {_eq: ${id}}}]}, limit: 1) {\n  id\n  ud_title_3d7485\n  ud_wangpanlianjie_46c21b\n    ud_mima_73219a\n  }\n   }\n`
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch("https://zion-app.functorz.com/X5YYjkqOo5E/zero/y7xXo5wz4g0/api/graphql-v2", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function createDownloadButton(shortUrl, password) {
    const button = document.createElement('button');
    button.setAttribute('class', 'header__btn btn btn_blue mob-lg-hide');
    button.innerText = '下载';
    button.addEventListener('click', () => {
        window.open(`https://pan.baidu.com/s/${shortUrl}?pwd=${password}`)
    })
    document.querySelector('.header__right').appendChild(button);
}