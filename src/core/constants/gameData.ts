import { Category, Question } from '../types/game';

export const defaultCategories: Category[] = [
  {
    id: 'friends',
    name: 'Bạn Bè',
    description: 'Những câu hỏi dành cho bạn bè thân thiết',
    color: '#2ecc71',
  },
  {
    id: '18+',
    name: '18+',
    description: 'Những câu hỏi dành cho người trên 18 tuổi',
    color: '#9b59b6',
  },
];

// Default players
export const defaultPlayers: string[] = [
  'Mợ Linh',
  'Pé Nâu',
  'A2 Tiến',
  'Mợ Hân',
  'Cậu Nô',
  'Cậu Qin',
  'Quang Tèo',
  'Mợ Mi',
  'Lim',
  'Vanpe',
];

export const defaultQuestions: Question[] = [
  {
    id: 'gnbgqden5aczv4yfquzrx',
    type: 'truth',
    text: 'Bạn đã bao giờ nói dối để có được "cơ hội" với ai đó chưa?',
    category: '18+',
  },
  {
    id: '2x2yiw57ahs4sur824anvl',
    type: 'truth',
    text: 'Bạn đã từng quay clip nóng chưa?',
    category: '18+',
  },
  {
    id: 'lz08rqlyxjrczyxf79crpe',
    type: 'truth',
    text: 'Trong những người yêu cũ, ai là người hôn tệ nhất?',
    category: '18+',
  },
  {
    id: 'ohrcz9xvuqaejd5j8vuo3',
    type: 'dare',
    text: 'Nói một điều bậy bạ bằng tone giọng đáng yêu ',
    category: '18+',
  },
  {
    id: '63y4hb6jmcxkhk7vys9o4',
    type: 'dare',
    text: 'Diễn lại cảnh xem phim người lớn với người bạn yêu',
    category: '18+',
  },
  {
    id: 'kyw2vsliet4gqldllhq1t',
    type: 'dare',
    text: 'Diễn lại cảnh xem phim người lớn với người bạn yêu',
    category: '18+',
  },
  {
    id: 'x108oh38zrple8rddz165q',
    type: 'dare',
    text: 'Làm 1 biểu cảm lúc cao trào',
    category: '18+',
  },
  {
    id: '4h37yctkov1uh1vhvxltn',
    type: 'dare',
    text: 'Làm 1 biểu cảm lúc cao trào',
    category: '18+',
  },
  {
    id: 'mhwus642amdr49io4t6p8',
    type: 'dare',
    text: 'Gọi cho người yêu cũ và hỏi có nhớ k?',
    category: '18+',
  },
  {
    id: 'zwrsa5z1vy756zn9vtmd3',
    type: 'dare',
    text: 'Hôn người ngồi bên trái bạn',
    category: '18+',
  },
  {
    id: 'dpkd7don3pmc9w3xv5hzbh',
    type: 'dare',
    text: 'Ngồi lên đùi người ai đó trong 10s',
    category: '18+',
  },
  {
    id: 'j4hxc3b9huelzr02uphbk',
    type: 'dare',
    text: 'dùng tay mô tả cách bạn "mơn trớn"',
    category: '18+',
  },
  {
    id: 'j82531ulumlp1onah15cri',
    type: 'truth',
    text: 'Bạn thích tư thế nào nhất?',
    category: '18+',
  },
  {
    id: 'aduy66bns7gs8oejoq030a',
    type: 'truth',
    text: 'Bạn đã bao giờ "làm chuyện ấy" ở nơi công cộng chưa?',
    category: '18+',
  },
  {
    id: '7zxg0ownffybba3g450lg',
    type: 'truth',
    text: 'Bạn đã bao giờ xem phim người lớn với bạn bè chưa?',
    category: '18+',
  },
  {
    id: '67n8onk9fklxnr5hylaezt',
    type: 'truth',
    text: 'Bạn đã bao giờ có cảm xúc với người lớn tuổi hơn nhiều chưa?',
    category: '18+',
  },
  {
    id: 'fqtio6e6dacwn25e0gb0o',
    type: 'truth',
    text: 'Điều gì khiến bạn cảm thấy xấu hổ nhất khi "lên giường"?',
    category: '18+',
  },
  {
    id: 'yup1ks7jh7ptc6iqwl0rjq',
    type: 'truth',
    text: 'Bạn đã bao giờ dùng đồ chơi người lớn chưa?',
    category: '18+',
  },
  {
    id: 'gfm71qb115li6pzgd14om',
    type: 'dare',
    text: 'Hãy nói tên người trong phòng mà bạn thấy hấp dẫn nhất.',
    category: '18+',
  },
  {
    id: '3q7tz5epzp9m5emsoft2t',
    type: 'truth',
    text: 'Bạn đã bao giờ "tự sướng" khi nghĩ về ai đó trong phòng này?',
    category: '18+',
  },
  {
    id: '2cziy2cw8j5jq29wnlq',
    type: 'truth',
    text: 'Thời gian bạn đã từng "lên đỉnh" là bao lâu?',
    category: '18+',
  },
  {
    id: '7gxib0dc6blwz46bb01s',
    type: 'truth',
    text: 'Thời gian dài nhất bạn nhịn yêu là bao lâu?',
    category: '18+',
  },
  {
    id: 'uj4yc1893qptnsawyb4qq',
    type: 'truth',
    text: 'Bạn thích được nói những lời thế nào khi "lên giường"?',
    category: '18+',
  },
  {
    id: 'ltw8cv3uszlc45hmrjg2c5',
    type: 'dare',
    text: 'Hãy kể về lần "lên đỉnh" nhất của bạn.',
    category: '18+',
  },
  {
    id: 'cyvsdawrgch5bv6ak9aa42',
    type: 'truth',
    text: 'Bạn đã bao giờ "làm chuyện ấy" khi có người khác ở gần?',
    category: '18+',
  },
  {
    id: 'vnkvh4bz9hsun52pqy97mk',
    type: 'truth',
    text: 'Bạn đã bao giờ "làm chuyện ấy" với người mà bạn không thích?',
    category: '18+',
  },
  {
    id: '9pq0wc6cxmopmbiex5qzx9',
    type: 'truth',
    text: 'Bạn đã bao giờ bị người khác đánh giá về kỹ năng "giường chiếu"?',
    category: '18+',
  },
  {
    id: 'ftnx7483sgk563nt1x1cjl',
    type: 'truth',
    text: 'kể nơi kỳ lạ nhất bạn đã làm chuyện đó',
    category: '18+',
  },
  {
    id: 'ja94ds6bakosmu8orxzlol',
    type: 'truth',
    text: 'Bạn đã bao giờ bị từ chối vì "kích thước" không phù hợp?',
    category: '18+',
  },
  {
    id: '89tpflxtvfbw0ikiywd4',
    type: 'dare',
    text: 'Gọi điện cho nyc',
    category: '18+',
  },
  {
    id: '36rl1uu908zzngumqdlrm',
    type: 'truth',
    text: 'Bạn đã bao giờ bị phát hiện khi đang "làm chuyện ấy"?',
    category: '18+',
  },
  {
    id: 'braootb4s5v339ca2np9iq',
    type: 'truth',
    text: 'Điều gì là giới hạn của bạn trong chuyện tình cảm(k phải tình dục)',
    category: '18+',
  },
  {
    id: '7zbrvglhga8xv1ou8zvtg',
    type: 'truth',
    text: 'Bạn đã bao giờ nói dối về số người mà bạn đã "lên giường" cùng?',
    category: '18+',
  },
  {
    id: 'flwlmw4oeftxsixcthy9x',
    type: 'truth',
    text: 'Điểm nhạy cảm nhất trên cơ thể bạn là gì?',
    category: '18+',
  },
  {
    id: '9ju4d9yophkz0y7micgwtm',
    type: 'truth',
    text: 'Điều điên rồ nhất bạn từng làm trong chuyện ấy là gì?',
    category: '18+',
  },
  {
    id: 'jjpvvv5t1gdtv5k1i6flj',
    type: 'truth',
    text: 'Bạn đã từng xem phim người lớn khi nào?',
    category: '18+',
  },
  {
    id: 'nvkpps7rxsm7tfldiya8o2',
    type: 'truth',
    text: 'Bạn có thường xuyên thủ dâm không?',
    category: '18+',
  },
  {
    id: '6he2ahqsyjdg7ur4baizb8',
    type: 'truth',
    text: 'Bạn đã từng gửi ảnh sexy cho ai chưa?',
    category: '18+',
  },
  {
    id: 'baywhlzn4mbsj7eofcjay',
    type: 'truth',
    text: 'Có bao giờ bị bắt quả tang khi đang "làm chuyện ấy" chưa?',
    category: '18+',
  },
  {
    id: '3btxvdpgpps0tuflf8czkgd',
    type: 'truth',
    text: 'Bạn có thích làm chuyện ấy vào buổi sáng không?',
    category: '18+',
  },
  {
    id: '7f1dyuv9dv8b10yn7fzc8',
    type: 'truth',
    text: 'Bạn đã từng quan hệ ở nơi công cộng chưa?',
    category: '18+',
  },
  {
    id: 'gbq7wsbj779g6j6k8j1069',
    type: 'dare',
    text: 'Hôn một người bất kỳ trong nhóm 5 giây.',
    category: '18+',
  },
  {
    id: '9jsqzs7u43pd6og4xx513k',
    type: 'dare',
    text: 'Gọi điện tỏ tình với người mà bạn từng thích.',
    category: '18+',
  },
  {
    id: 'fshp2e6h7hjrlmllh6jpk',
    type: 'dare',
    text: 'Giả vờ "rên" 10 giây thật tự nhiên.',
    category: '18+',
  },
  {
    id: 'yicwubay739p2u0lm8r8f9',
    type: 'dare',
    text: 'Gửi icon 💦 hoặc 🍆 cho người bất kỳ trong danh bạ.',
    category: '18+',
  },
  {
    id: 'eurdb6lpp7us12vf86ehme',
    type: 'dare',
    text: 'Hôn một bộ phận bất kỳ trên cơ thể người bên cạnh.',
    category: '18+',
  },
  {
    id: '30mjj0wgx7nhzofgrw785w',
    type: 'dare',
    text: 'Giả làm "người quyến rũ" trong 15 giây.',
    category: '18+',
  },
  {
    id: 'cbt8s41f45hycoqh0fl81',
    type: 'dare',
    text: 'Chụp ảnh selfie sexy và đăng story (ẩn với ai đó tùy chọn).',
    category: '18+',
  },
  {
    id: '0aufz9tjy0egd0g8ojo928l',
    type: 'dare',
    text: 'Đọc to một tin nhắn "mùi mẫn" gần đây bạn gửi hoặc nhận.',
    category: '18+',
  },
  {
    id: 'jh6ewbjh9kdshgwdokf1wc',
    type: 'dare',
    text: 'Kể lý do chia tay hoặc nghỉ việc gần đây nhất',
    category: '18+',
  },
  {
    id: 'xnec2lfch3ga6toolzxe76',
    type: 'dare',
    text: 'Gọi video cho crush và nói: "Anh/em nhớ anh/em lắm!"',
    category: '18+',
  },
  {
    id: 'mh0ztmto52o5yiqo4ocn',
    type: 'dare',
    text: 'Nằm vào lòng người đối diện 1 phút.',
    category: '18+',
  },
  {
    id: 'jzhx97je686g5zrqs33bf',
    type: 'dare',
    text: 'Người tóc ngắn nhất uống với ng dài nhất',
    category: '18+',
  },
  {
    id: 'qzkklfv2jpc868t1c3394t',
    type: 'dare',
    text: 'Tạo tư thế yêu gợi cảm với gối trong 10 giây.',
    category: '18+',
  },
  {
    id: 'whmok47nt8xc47a5u3hko',
    type: 'dare',
    text: 'Nhắn tin "Anh/em muốn quá!" cho người bạn bất kỳ chọn.',
    category: '18+',
  },
  {
    id: 'bee7cu37k5yacjjlmweij',
    type: 'dare',
    text: 'Ai chưa uống ly nào thì uống',
    category: '18+',
  },
  {
    id: 'nzn0euklwt82d8g8wuuog9',
    type: 'dare',
    text: 'Thử nói chuyện gợi tình trong 30 giây.',
    category: '18+',
  },
  {
    id: 't3wz9csuregirumdql6hlg',
    type: 'dare',
    text: 'Tạo tiếng "rên" giả như đang "vui vẻ" trong 5 giây.',
    category: '18+',
  },
  {
    id: 'g5mef2paieawg9jweyrnw',
    type: 'dare',
    text: 'Hôn tay người bạn gần nhất.',
    category: '18+',
  },
  {
    id: '7ofe6t8znew0wj6x6ti7ve',
    type: 'dare',
    text: 'Kể điểm tốt nhất của người yêu cũ',
    category: '18+',
  },
  {
    id: 'xlnacju58q9cj2cvglpgww',
    type: 'dare',
    text: 'Đọc tin nhắn gần nhất trong nhóm kín hoặc riêng tư.',
    category: '18+',
  },
  {
    id: 'e2u70xy2m2mfwnnj0yilck',
    type: 'dare',
    text: 'Gọi video cho một người bất kỳ và nói: "Anh/em đang nhớ cái ôm của anh/em!"',
    category: '18+',
  },
  {
    id: 'ogq3xbm0ggsxozhhuoic8',
    type: 'dare',
    text: 'Mô phỏng lại một tư thế "nóng bỏng" nhưng chỉ dùng đồ vật (gối, khăn,...).',
    category: '18+',
  },
  {
    id: '778fm9rgh960kezwvctlfh',
    type: 'truth',
    text: 'Ai mới yêu lần đầu thì uống 1 ly',
    category: '18+',
  },
  {
    id: 'wkkuwt624ja8lb4wejubu5',
    type: 'truth',
    text: 'Nơi công cộng kỳ lạ nhất mà bạn từng muốn "làm chuyện ấy" là đâu?',
    category: '18+',
  },
  {
    id: '2l77sgsg5l20khjs4bt9t1',
    type: 'dare',
    text: 'Người cao nhất uống với ng thấp nhất',
    category: '18+',
  },
  {
    id: '1b2ftoq3linbqpukm2lkeb',
    type: 'dare',
    text: 'Đọc to tin nhắn "nhạy cảm" gần đây nhất trong điện thoại của bạn.',
    category: '18+',
  },
  {
    id: 'agddd5unape9kd6fxekko',
    type: 'dare',
    text: 'Mô tả chi tiết lần "lên đỉnh" gần đây nhất của bạn.',
    category: '18+',
  },
  {
    id: '3lyi6ksmaxwu9qoewjc5vd',
    type: 'truth',
    text: 'Bạn thích được "nói chuyện bẩn" khi "làm chuyện ấy" không?',
    category: '18+',
  },
  {
    id: 'fr4nc5ww50uvyww6cnqlm',
    type: 'dare',
    text: 'Uống một shot rượu từ cơ thể của người khác.',
    category: '18+',
  },
  {
    id: 'lgrrzp0sxsibaud4mvyti6',
    type: 'truth',
    text: 'Đăng hình nyc lên fb',
    category: '18+',
  },
  {
    id: 'zoys42h7ykihak5s5gcb5o',
    type: 'dare',
    text: 'Ngồi trên đùi người chơi khác trong 2 phút.',
    category: '18+',
  },
  {
    id: '2lae2uqsnsbsfetvl47tm9',
    type: 'dare',
    text: 'Tạo âm thanh "gợi cảm" trong 10 giây.',
    category: '18+',
  },
  {
    id: '5bu0enba3u9ehnctd5356k',
    type: 'dare',
    text: 'Massage vai cho người bên cạnh trong 30 giây.',
    category: '18+',
  },
  {
    id: '2piymdb133hu8bdjs6avwl',
    type: 'truth',
    text: 'Bạn đã bao giờ "nhìn trộm" ai đó đang thay đồ hoặc tắm chưa?',
    category: '18+',
  },
  {
    id: 'vae73r7paiuqky33rqdql',
    type: 'truth',
    text: 'Bạn đã bao giờ bị "cắm sừng" hoặc "cắm sừng" ai đó chưa?',
    category: '18+',
  },
  {
    id: 'gc9u6mdp1q9z238au7vor',
    type: 'dare',
    text: 'Diễn tả khuôn mặt "lên đỉnh" của bạn trong 5 giây.',
    category: '18+',
  },
  {
    id: 'dj2pk21v1m4b7q5wn2bw4k',
    type: 'truth',
    text: 'Bạn đã bao giờ sử dụng đồ chơi người lớn khi "tự sướng" chưa?',
    category: '18+',
  },
  {
    id: 'kmtqk2ttxiw5pchs7dwtm',
    type: 'dare',
    text: 'Nhảy sexy dance cho người chơi khác xem trong 30 giây.',
    category: '18+',
  },
  {
    id: 'yxvcdjxzb9dn409po7kuyf',
    type: 'dare',
    text: 'Để một người chơi khác vẽ lên người bạn bằng son môi.',
    category: '18+',
  },
  {
    id: 'd1dv43ru7p5alzeanq61vb',
    type: 'truth',
    text: 'Bạn đã bao giờ cảm thấy hối hận sau khi "lên giường" với ai đó chưa?',
    category: '18+',
  },
  {
    id: 'ma4vetf2ly9k1wjaraclhb',
    type: 'dare',
    text: 'Miêu tả 1 thành phố bằng hành động cho ng đối điện, nếu đoán sai thì cả 2 đều uống',
    category: '18+',
  },
  {
    id: 'uwxer9hedrrgh518g4ec4j',
    type: 'dare',
    text: 'Miêu tả 1 thứ gì đó bất kì bằng hành động cho ng đối điện, nếu đoán sai thì cả 2 đều uống',
    category: '18+',
  },
  {
    id: 'uwjr4vsfe7mnhh6v6nb6vi',
    type: 'truth',
    text: 'Bạn có thường xuyên "tự sướng" trong tuần không?',
    category: '18+',
  },
];
