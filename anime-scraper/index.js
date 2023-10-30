import WebTorrent from 'webtorrent'

const client = new WebTorrent()
const magnetURI = "magnet:?xt=urn:btih:4F49BB9A9928E82B7D44808E67D05769801E35B5&dn=www.1TamilMV.lat%20-%20Leo%20%282023%29%20Telugu%c2%a0HQ%20PreDVD%20-%20720p%20-%20x264%20-%20HQ%20Clean%20Aud%20-%201.6GB.mkv&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.trackerfix.com%3a85%2fannounce&tr=%2audp%3a%2f%2f9.rarbg.me%3a2960%2fannounce&tr=%2audp%3a%2f%2f9.rarbg.to%3a2980%2fannounce&tr=%2audp%3a%2f%2ftracker.thinelephant.org%3a12710%2fannounce&tr=%2audp%3a%2f%2ftracker.slowcheetah.org%3a14760%2fannounce&tr=wss%3a%2f%2fwstracker.online"


client.add(magnetURI, { path: './downloads', maxConns: 100, downloadLimit: 15000000 }, torrent => {
    torrent.on('download', bytes => {
        const percentDone = (torrent.progress * 100).toFixed(2);
        console.log(`Downloaded ${bytes} bytes - ${percentDone}% complete`);
    });
    torrent.on('done', () => {
        console.log('Torrent download finished');
        client.destroy()
    });
});

// import { XMLParser } from "fast-xml-parser";
//
// const parser = new XMLParser();
//
//
// const response = await fetch('https://nyaa.si/?page=rss');
// const xml = await response.text();
// const { rss } = parser.parse(xml)
//
// const categories = {
//     "All categories": "0_0",
//     "Anime": "1_0",
//     "Anime - AMV": "1_1",
//     "Anime - English": "1_2",
//     "Anime - Non-English": "1_3",
//     "Anime - Raw": "1_4",
//     "Audio": "2_0",
//     "Audio - Lossless": "2_1",
//     "Audio - Lossy": "2_2",
//     "Literature": "3_0",
//     "Literature - English": "3_1",
//     "Literature - Non-English": "3_2",
//     "Literature - Raw": "3_3",
//     "Live Action": "4_0",
//     "Live Action - English": "4_1",
//     "Live Action - Idol/PV": "4_2",
//     "Live Action - Non-English": "4_3",
//     "Live Action - Raw": "4_4",
//     "Pictures": "5_0",
//     "Pictures - Graphics": "5_1",
//     "Pictures - Photos": "5_2",
//     "Software": "6_0",
//     "Software - Applications": "6_1",
//     "Software - Games": "6_2"
// }
//
// const filter = {
//     "No filter": "0",
//     "No remakes": "1",
//     "Trusted only": "2"
// }
//
// const data = rss.channel.item.map(i => {
//     return {
//         category: i['nyaa:category'],
//         title: i.title,
//         size: i['nyaa:size'],
//         pubdate: i.pubDate.split(' ', 4).join(' '),
//         leechers: i["nyaa:leechers"],
//         seeders: i["nyaa:seeders"],
//         downloads: i["nyaa:downloads"],
//         trusted: i["nyaa:trusted"],
//         link: i.link,
//         view: i.guid,
//     }
// })
//
// console.log(JSON.stringify(data))
