import { Crypto, load, _ } from './lib/cat.js';

let key = 'haoxi';
let HOST = 'https://haoxi.vip';
let siteKey = '';
let siteType = 0;

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';

const parseUrlMap = new Map([
    ['*', ['https://json.vipjx.cnow.eu.org/?url=']],
]);

async function request(reqUrl, timeout = 60000) {
    let res = await req(reqUrl, {
        method: 'get',
        headers: {
            'User-Agent': UA,
            'Referer': HOST
        },
        timeout: timeout,
    });
    return res.content;
}

// cfg = {skey: siteKey, ext: extend}
async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;
}

async function home(filter) {
    let classes = [{"type_id":1,"type_name":"电影"},{"type_id":2,"type_name":"连续剧"},{"type_id":3,"type_name":"综艺"},{"type_id":4,"type_name":"动漫"}];
    let filterObj = {
		"1":[{"key":"cateId","name":"分类","init":"","value":[{"n":"全部","v":""},{"n":"剧情片","v":"12"},{"n":"喜剧片","v":"7"},{"n":"动作片","v":"8"},{"n":"爱情片","v":"9"},{"n":"科幻片","v":"10"},{"n":"恐怖片","v":"20"},{"n":"动画片","v":"25"},{"n":"战争片","v":"21"},{"n":"惊悚片","v":"22"},{"n":"犯罪片","v":"23"},{"n":"冒险片","v":"24"},{"n":"奇幻片","v":"11"},{"n":"悬疑片","v":"26"},{"n":"武侠片","v":"27"},{"n":"纪录片","v":"32"},{"n":"网络电影","v":"52"},{"n":"预告片","v":"57"},{"n":"其他片","v":"28"}]},{"key":"class","name":"类型","init":"","value":[{"n":"全部","v":""},{"n":"Netflix","v":"Netflix"},{"n":"仙侠","v":"仙侠"},{"n":"剧情","v":"剧情"},{"n":"科幻","v":"科幻"},{"n":"动作","v":"动作"},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"冒险","v":"冒险"},{"n":"儿童","v":"儿童"},{"n":"歌舞","v":"歌舞"},{"n":"音乐","v":"音乐"},{"n":"奇幻","v":"奇幻"},{"n":"动画","v":"动画"},{"n":"恐怖","v":"恐怖"},{"n":"惊悚","v":"惊悚"},{"n":"丧尸","v":"丧尸"},{"n":"战争","v":"战争"},{"n":"传记","v":"传记"},{"n":"纪录","v":"纪录"},{"n":"犯罪","v":"犯罪"},{"n":"悬疑","v":"悬疑"},{"n":"西部","v":"西部"},{"n":"灾难","v":"灾难"}]},{"key":"area","name":"地区","init":"","value":[{"n":"全部","v":""},{"n":"大陆","v":"大陆"},{"n":"香港","v":"香港"},{"n":"台湾","v":"台湾"},{"n":"美国","v":"美国"},{"n":"日本","v":"日本"},{"n":"韩国","v":"韩国"},{"n":"英国","v":"英国"},{"n":"法国","v":"法国"},{"n":"德国","v":"德国"},{"n":"印度","v":"印度"},{"n":"泰国","v":"泰国"},{"n":"丹麦","v":"丹麦"},{"n":"瑞典","v":"瑞典"},{"n":"巴西","v":"巴西"},{"n":"加拿大","v":"加拿大"},{"n":"俄罗斯","v":"俄罗斯"},{"n":"比利时","v":"比利时"},{"n":"爱尔兰","v":"爱尔兰"},{"n":"西班牙","v":"西班牙"},{"n":"澳大利亚","v":"澳大利亚"}]},{"key":"year","name":"年份","init":"","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]},{"key":"letter","name":"字母","init":"","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"}]},{"key":"version","name":"版本","init":"","value":[{"n":"全部","v":""},{"n":"4K","v":"4K"},{"n":"蓝光","v":"蓝光"},{"n":"高清版","v":"高清版"},{"n":"剧场版","v":"剧场版"},{"n":"抢先版","v":"抢先版"},{"n":"TV","v":"TV"},{"n":"影院版","v":"影院版"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],
        "2":[{"key":"cateId","name":"分类","init":"","value":[{"n":"全部","v":""},{"n":"国产剧","v":"13"},{"n":"港台剧","v":"14"},{"n":"欧美剧","v":"15"},{"n":"日韩剧","v":"16"},{"n":"短剧","v":"49"},{"n":"其他剧","v":"29"}]},{"key":"class","name":"类型","init":"","value":[{"n":"全部","v":""},{"n":"Netflix","v":"Netflix"},{"n":"剧情","v":"剧情"},{"n":"丧尸","v":"丧尸"},{"n":"仙侠","v":"仙侠"},{"n":"穿越","v":"穿越"},{"n":"惊悚","v":"惊悚"},{"n":"恐怖","v":"恐怖"},{"n":"言情","v":"言情"},{"n":"科幻","v":"科幻"},{"n":"动作","v":"动作"},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"偶像","v":"偶像"},{"n":"都市","v":"都市"},{"n":"军旅","v":"军旅"},{"n":"谍战","v":"谍战"},{"n":"罪案","v":"罪案"},{"n":"宫廷","v":"宫廷"},{"n":"冒险","v":"冒险"},{"n":"儿童","v":"儿童"},{"n":"歌舞","v":"歌舞"},{"n":"音乐","v":"音乐"},{"n":"奇幻","v":"奇幻"},{"n":"动画","v":"动画"}]},{"key":"area","name":"地区","init":"","value":[{"n":"全部","v":""},{"n":"大陆","v":"大陆"},{"n":"香港","v":"香港"},{"n":"韩国","v":"韩国"},{"n":"美国","v":"美国"},{"n":"日本","v":"日本"},{"n":"法国","v":"法国"},{"n":"英国","v":"英国"},{"n":"德国","v":"德国"},{"n":"台湾","v":"台湾"},{"n":"泰国","v":"泰国"},{"n":"印度","v":"印度"},{"n":"其他","v":"其他"}]},{"key":"year","name":"年份","init":"","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]},{"key":"letter","name":"字母","init":"","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"}]},{"key":"version","name":"版本","init":"","value":[{"n":"全部","v":""},{"n":"4K","v":"4K"},{"n":"热门连续剧","v":"热门连续剧"},{"n":"港台剧","v":"港台剧"},{"n":"日韩剧","v":"日韩剧"},{"n":"欧美剧","v":"欧美剧"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],
		"3":[{"key":"cateId","name":"分类","init":"","value":[{"n":"全部","v":""},{"n":"大陆综艺","v":"34"},{"n":"港台综艺","v":"35"},{"n":"日韩综艺","v":"36"},{"n":"欧美综艺","v":"37"}]},{"key":"class","name":"类型","init":"","value":[{"n":"全部","v":""},{"n":"Netflix","v":"Netflix"},{"n":"脱口秀","v":"脱口秀"},{"n":"真人秀","v":"真人秀"},{"n":"选秀","v":"选秀"},{"n":"八卦","v":"八卦"},{"n":"访谈","v":"访谈"},{"n":"情感","v":"情感"},{"n":"生活","v":"生活"},{"n":"晚会","v":"晚会"},{"n":"搞笑","v":"搞笑"},{"n":"音乐","v":"音乐"},{"n":"时尚","v":"时尚"},{"n":"游戏","v":"游戏"},{"n":"少儿","v":"少儿"},{"n":"体育","v":"体育"},{"n":"纪实","v":"纪实"},{"n":"科教","v":"科教"}]},{"key":"year","name":"年份","init":"","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]},{"key":"letter","name":"字母","init":"","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],
		"4":[{"key":"cateId","name":"分类","init":"","value":[{"n":"全部","v":""},{"n":"国产动漫","v":"38"},{"n":"日韩动漫","v":"39"},{"n":"欧美动漫","v":"40"},{"n":"港台动漫","v":"41"},{"n":"海外动漫","v":"42"}]},{"key":"class","name":"类型","init":"","value":[{"n":"全部","v":""},{"n":"Netflix","v":"Netflix"},{"n":"热血","v":"热血"},{"n":"科幻","v":"科幻"},{"n":"美少女","v":"美少女"},{"n":"魔幻","v":"魔幻"},{"n":"经典","v":"经典"},{"n":"励志","v":"励志"},{"n":"少儿","v":"少儿"},{"n":"冒险","v":"冒险"},{"n":"搞笑","v":"搞笑"},{"n":"推理","v":"推理"},{"n":"恋爱","v":"恋爱"},{"n":"治愈","v":"治愈"},{"n":"幻想","v":"幻想"},{"n":"校园","v":"校园"},{"n":"动物","v":"动物"},{"n":"机战","v":"机战"},{"n":"亲子","v":"亲子"},{"n":"儿歌","v":"儿歌"},{"n":"运动","v":"运动"},{"n":"悬疑","v":"悬疑"},{"n":"怪物","v":"怪物"},{"n":"战争","v":"战争"},{"n":"益智","v":"益智"},{"n":"青春","v":"青春"}]},{"key":"year","name":"年份","init":"","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"}]},{"key":"letter","name":"字母","init":"","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}]
	};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
    if (pg <= 0) pg = 1;
    let version = '';
    if (extend.version) {
        version = '/version/' + extend.version;
    }
    let page = '';
    if (pg > 1) {
        page = pg;
    }
    const link = HOST + '/vodshow/' + (extend.cateId || tid) + '-' + (extend.area || '') + '-' + (extend.by || '') + '-' + (extend.class || '') + '--' + (extend.letter || '') + '---' + page + '---' + (extend.year || '') + version + '/';//https://haoxi.vip/vodshow/1----%E8%8B%B1%E8%AF%AD-------2023/version/4K/
    const html = await request(link);
    const $ = load(html);
    const items = $('.public-list-div');
    let videos = _.map(items, (item) => {
        const itname = $(item).find('a:first')[0];
        const itimg = $(item).find('img:first')[0];
        const remarks = $($(item).find('span.public-list-prb')[0]).text().trim();
        return {
            vod_id: itname.attribs.href,
            vod_name: itname.attribs.title,
            vod_pic: itimg.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div.page-info > a.page-link:contains(下一页)').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 24,
        total: 24 * pgCount,
        list: videos,
    });
}

async function detail(id) {
    let html = await request(HOST + id);
    let $ = load(html);
    let vod = {
        vod_id: id,
        vod_name: $('h3.slide-info-title').text().trim(),
        vod_type: $('span.hl-ma0').text().trim(),
        vod_area: $('.detail-info .slide-info span:nth-child(2)').text(),
        vod_year: $('.detail-info .slide-info span:nth-child(1)').text(),
        vod_director: $('.search-show em.cor4:contains(导演：)').parent().text().replace('导演：', ''),
        vod_actor: $('.search-show em.cor4:contains(主演：)').parent().text().replace('主演：', ''),
        vod_pic: $('.detail-pic img:first').attr('data-src'),
        vod_remarks : $('.detail-info div:nth-child(2)').text() || '',
        vod_content: $('#height_limit').text().trim(),
    };
    let playMap = {};
    let tabs = $('a.swiper-slide');
    let playlists = $('ul.anthology-list-play');
    _.each(tabs, (tab, i) => {
        let from = tab.children[1].data;
        let list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            let title = it.children[0].data.trim();
            let playUrl = it.attribs.href;
            if (!playMap.hasOwnProperty(from)) {
                playMap[from] = [];
            }
            playMap[from].push(title + '$' + playUrl);
        });
    });
    vod.vod_play_from = _.keys(playMap).join('$$$');
    let urls = _.values(playMap);
    let vod_play_url = _.map(urls, (urlist) => {
        return urlist.join('#');
    });
    vod.vod_play_url = vod_play_url.join('$$$');
    return JSON.stringify({
        list: [vod],
    });
}

async function play(flag, id, flags) {
    const link = HOST + id;
    const html = await request(link);
    const $ = load(html);
    const json = $('script:contains(player_aaaa)').text().replace('var player_aaaa=','');
    const js = JSON.parse(json);
    const playurl = js.url;
    let playUrl = unescape(playurl); 
    if (playUrl.indexOf('bilibili.com/') >= 0 ||
        playUrl.indexOf('youku.com/') >= 0 ||
        playUrl.indexOf('iqiyi.com/') >= 0 ||
        playUrl.indexOf('qq.com/') >= 0 ||
        playUrl.indexOf('mgtv.com/') >= 0) { //官源解析
        let parseUrls = parseUrlMap.get(flag);
        if (!parseUrls) {
            parseUrls = parseUrlMap.get('*');
        }
        const result = await getFinalVideo(parseUrls, playUrl);
        if (result !== null) {
            return JSON.stringify(result);
        }
    } else if (playUrl.indexOf('2kj.org/') >= 0) { //4K解析
        const html = await request(playUrl);
        const json = html.match(/var config = {([\w\W]*)}/)[1];
        const config = JSON.parse('{' + json.trim().replace(/,$/g, '') + '}');
        let urlstr = config.url;
        urlstr = urlstr.replaceAll('-','1');
        urlstr = urlstr.replaceAll('&','5');
        urlstr = urlstr.replaceAll('*','9');
        playUrl = base64Decode(urlstr);
    }
    return JSON.stringify({
        parse: 0,
        url: playUrl,
    });
}

async function getFinalVideo(parseUrls, url) {
    for (const parseUrl of parseUrls) {
        if (parseUrl === "" || parseUrl === "null") {
            continue;
        }
        const playUrl = parseUrl + url;
        const content = await request(playUrl, 10000); // 10秒请求，兼容bilibili
        let tryJson = null;
        try {
            tryJson = jsonParse(url, content);
        } catch (error) {
        }

        if (tryJson !== null && tryJson.hasOwnProperty("url") && tryJson.hasOwnProperty("header")) {
            tryJson.header = JSON.stringify(tryJson.header);
            return tryJson;
        }
    }
    const result = {
            parse: 0,
            playUrl: "",
            url: url
        };
    return JSON.stringify(result);
}

function jsonParse(input, json) {
    // 处理解析接口返回的报文，如果返回的报文中包含header信息，就加到返回值中
    let jsonPlayData = JSON.parse(json);
    // 处理293的解析结果url在data字段的解析
    if (jsonPlayData.hasOwnProperty("data") && typeof jsonPlayData.data === "object" && !jsonPlayData.hasOwnProperty("url")) {
        jsonPlayData = jsonPlayData.data;
    }

    let url = jsonPlayData.url;

    if (url.startsWith("//")) {
        url = "https:" + url;
    }
    if (!url.trim().startsWith("http")) {
        return null;
    }
    if (url === input) {
        if (!isVideoFormat(url)) {
            return null;
        }
    }

    let headers = {};
    if (jsonPlayData.hasOwnProperty("header")) {
        headers = jsonPlayData.header;
    } else if (jsonPlayData.hasOwnProperty("Header")) {
        headers = jsonPlayData.Header;
    } else if (jsonPlayData.hasOwnProperty("headers")) {
        headers = jsonPlayData.headers;
    } else if (jsonPlayData.hasOwnProperty("Headers")) {
        headers = jsonPlayData.Headers;
    }

    let ua = "";
    if (jsonPlayData.hasOwnProperty("user-agent")) {
        ua = jsonPlayData["user-agent"];
    } else if (jsonPlayData.hasOwnProperty("User-Agent")) {
        ua = jsonPlayData["User-Agent"];
    }
    if (ua.trim().length > 0) {
        headers["User-Agent"] = " " + ua;
    }

    let referer = "";
    if (jsonPlayData.hasOwnProperty("referer")) {
        referer = jsonPlayData.referer;
    } else if (jsonPlayData.hasOwnProperty("Referer")) {
        referer = jsonPlayData.Referer;
    }
    if (referer.trim().length > 0) {
        headers["Referer"] = " " + referer;
    }

    headers = fixJsonVodHeader(headers, input, url);

    const taskResult = {
        header: headers,
        url: url,
        parse: 0
    };

    return taskResult;
}

function fixJsonVodHeader(headers, input, url) {
    if (headers === null) {
        headers = {};
    }

    if (input.includes("www.mgtv.com")) {
        headers["Referer"] = " ";
        headers["User-Agent"] = " Mozilla/5.0";
    } else if (url.includes("titan.mgtv")) {
        headers["Referer"] = " ";
        headers["User-Agent"] = " Mozilla/5.0";
    } else if (input.includes("bilibili")) {
        headers["Referer"] = " https://www.bilibili.com/";
        headers["User-Agent"] = " " + UA;
    }

    return headers;
}

const snifferMatch = /http((?!http).){26,}?\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg)\?.*|http((?!http).){26,}\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg)|http((?!http).){26,}\/m3u8\?pt=m3u8.*|http((?!http).)*?default\.ixigua\.com\/.*|http((?!http).)*?cdn-tos[^\?]*|http((?!http).)*?\/obj\/tos[^\?]*|http.*?\/player\/m3u8play\.php\?url=.*|http.*?\/player\/.*?[pP]lay\.php\?url=.*|http.*?\/playlist\/m3u8\/\?vid=.*|http.*?\.php\?type=m3u8&.*|http.*?\/download.aspx\?.*|http.*?\/api\/up_api.php\?.*|https.*?\.66yk\.cn.*|http((?!http).)*?netease\.com\/file\/.*/;

function isVideoFormat(url) {
    if (snifferMatch.test(url)) {
        return !url.includes("cdn-tos") || !url.includes(".js");
    }
    return false;
}

function base64Decode(text) {
    return Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(text));
}

async function search(wd, quick) {
    let data = JSON.parse(await request(HOST + '/index.php/ajax/suggest?mid=1&limit=50&wd=' + wd)).list;
    let videos = [];
    for (const vod of data) {
        videos.push({
            vod_id: '/voddetail/' + vod.id,
            vod_name: vod.name,
            vod_pic: vod.pic,
            vod_remarks: '',
        });
    }
    return JSON.stringify({
        list: videos,
    });
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        search: search,
    };
}