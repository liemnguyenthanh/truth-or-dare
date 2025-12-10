export type DrinkQuestion = {
  category: string;
  text: string;
};

// Định nghĩa các category có sẵn
export const DRINK_CATEGORIES = [
  {
    id: '18+',
    name: '18+',
    description: 'Những câu hỏi dành cho người trên 18 tuổi',
  },
  {
    id: '18+_tao_bao',
    name: 'Táo Bạo',
    description: 'Những câu hỏi táo bạo và mạnh mẽ hơn',
  },
  {
    id: 'tinh_ban',
    name: 'Tình Bạn',
    description: 'Câu hỏi gắn kết bạn bè, vui vẻ',
  },
  {
    id: 'cong_so',
    name: 'Công Sở',
    description: 'Câu hỏi nhậu công sở vui vẻ',
  },
] as const;

export type DrinkCategoryId = (typeof DRINK_CATEGORIES)[number]['id'];

// Bộ câu hỏi 18+
export const EIGHTEEN_PLUS_QUESTIONS: DrinkQuestion[] = [
  {
    category: '18+',
    text: `giữ lại lá bài và có quyền cộng một ly của người khác trong lượt bất kỳ `,
  },
  {
    category: '18+',
    text: `người nắm giữ lá bài bị bịt mắt, sờ tay, và đoán người, đoán sai thì uống`,
  },
  {
    category: '18+',
    text: `Người nắm giữ lá bài được quyết định người cùng uống ly đó với mình (50/50)`,
  },
  {
    category: '18+',
    text: `Chơi nối từ bắt đầu từ người nắm giữ lá bài ai thua thì uống`,
  },
  {
    category: '18+',
    text: `Hai người bên cạnh người nắm giữ lá bài này thì uống`,
  },
  {
    category: '18+',
    text: ` giữ lại lá bài và có quyền chỉ định một người uống thay mình một lần`,
  },
  { category: '18+', text: ` ai chơi Xì Dách dằn dơ thì uống` },
  { category: '18+', text: ` ai đã từng bị cắm sừng thì uống` },
  { category: '18+', text: ` ai mới có buồn mới có bồ thì uống` },
  {
    category: '18+',
    text: ` cả bàn cùng đoán màu đồ lót của người khác giới ai đoán sai thì uống`,
  },
  {
    category: '18+',
    text: ` người nắm giữ lá bài chọn một người bất kỳ hỏi về: "sở thích, người yêu cũ, tính cách,...của mình" nếu không biết thì người được chọn uống, nếu biết thì tự uống.`,
  },
  {
    category: '18+',
    text: ` thi kể ca dao tục ngữ Việt Nam ai bí thì uống`,
  },
  { category: '18+', text: ` ai hay đi làm muộn thì uống` },
  { category: '18+', text: ` ai đã từng ngồi sổ đầu bài thì uống ` },
  { category: '18+', text: `ai chưa uống ly nào thì uống` },
  { category: '18+', text: ` Ai có mối tình dài nhất thì uống` },
  {
    category: '18+',
    text: ` người ít tuổi nhất uống với người lớn tuổi nhất`,
  },
  { category: '18+', text: ` người hay chửi thề nhất thì uống` },
  { category: '18+', text: ` ai theo tình yêu bỏ cuộc chơi thì uống` },
  { category: '18+', text: ` ai từng bị mời phụ huynh thì uống` },
  {
    category: '18+',
    text: ` gửi tóc ngắn nhất cùng với người tóc dài nhất`,
  },
  { category: '18+', text: ` ai hay cho mọi người leo cây thì uống` },
  {
    category: '18+',
    text: ` Đã bao giờ bạn thả rông ra đường chưa (không trả lời thì uống)`,
  },
  {
    category: '18+',
    text: ` chia sẻ liên kết của thathaythach.xyz lên trang cá nhân, kèm cap web chơi thật hay thách đỉnh nhất (không làm thì uống)`,
  },
  {
    category: '18+',
    text: `Nói về ba điểm sexy nhất của bạn (không nói thì uống)`,
  },
  {
    category: '18+',
    text: ` Ai không biết Peter là gì thì uống (nếu biết thì giải thích là gì)`,
  },
  {
    category: '18+',
    text: ` Hát và múa phụ họa một bài hát do 1 người khác chọn`,
  },
  {
    category: '18+',
    text: ` mũi chạm mũi người đối diện 10 giây hoặc uống`,
  },
  {
    category: '18+',
    text: ` để người bên trái chọn một người khác giới trong danh sách bạn bè, bạn phải Thả tim 15 bức ảnh của người đó hoặc uống`,
  },
  {
    category: '18+',
    text: ` gọi cho một người bạn khác giới trong danh bạ nó là mình đang say hoặc uống`,
  },
  {
    category: '18+',
    text: ` Kể tên 5 hãng mỹ phẩm của con gái (nếu bạn là con trai)/ 5 hãng mỹ phẩm của con trai (nếu bạn là con gái)`,
  },
  {
    category: '18+',
    text: ` giữ lại là bài và có quyền chọn người khác thực hiện thử thách thay một lần`,
  },
  { category: '18+', text: ` Đăng ảnh người yêu cũ lên Facebook hoặc uống` },
  { category: '18+', text: ` Ai không biết J97 thì uống` },
  {
    category: '18+',
    text: ` gửi tin nhắn thoại cho người yêu cũ nói xin lỗi anh/em, em/anh tệ quá  (không làm thì uống)`,
  },
  {
    category: '18+',
    text: ` đọc to rõ ràng Năm điều Bác Hồ dạy đọc sai hoặc không đọc thì uống`,
  },
  { category: '18+', text: ` thơm vào má người bên trái hoặc uống ` },
  {
    category: '18+',
    text: `Ai mặc áo ngoài cùng màu thì uống nếu không bạn uống một mình`,
  },
  {
    category: '18+',
    text: ` đổi áo với người bên phải Và mặc trong ba lượt liên tiếp`,
  },
  {
    category: '18+',
    text: ` vào nhà vệ sinh mang ra một món đồ và chụp ảnh`,
  },
  {
    category: '18+',
    text: ` Nhắn tin cho mẹ/vợ/chồng/người yêu đêm nay không về`,
  },
  {
    category: '18+',
    text: ` show toàn bộ đồ trong cặp/túi/ví đang mang theo bên người hoặc uống`,
  },
  {
    category: '18+',
    text: `Gửi giày hoặc tắt của một người bất kỳ được chỉ định hoặc uống`,
  },
  {
    category: '18+',
    text: ` Nhìn chăm chú và một người lạ bất kỳ cho tới khi họ nhìn lại và cười thật tươi hoặc uống`,
  },
  {
    category: '18+',
    text: ` trả lời câu hỏi chủ tịch nước Việt Nam là ai trả lời sai thì uống`,
  },
  {
    category: '18+',
    text: ` tẩy trang đối với nữ, đánh son đối với nam, Nếu không làm được thì uống`,
  },
  { category: '18+', text: ` kể năm tư thế 18+ bạn thích` },
  {
    category: '18+',
    text: ` không ai được nói câu nào có 3 từ "uống", "bia", "rượu" trong vòng 9 phút ai vi phạm thì uống`,
  },
  { category: '18+', text: ` xin info người lạ trên facebook hoặc uống` },
  { category: '18+', text: ` gọi điện tỏ tình với Crush hoặc uống` },
  { category: '18+', text: ` kể Lý do chia tay hoặc là nghỉ việc gần nhất` },
  { category: '18+', text: ` kể về ba sở thích quái dị của bạn hoặc uống` },
  {
    category: '18+',
    text: ` những người trong bàn chơi trò truyền giấy bằng miệng theo vòng tròn,  ai làm rơi hoặc rách giấy thì uống`,
  },
  {
    category: '18+',
    text: ` việc mờ ám nào bạn đã từng làm giữa bạn và người khác giới`,
  },
  {
    category: '18+',
    text: ` người nắm giữ lá bài được bỏ qua một lượt chơi hoặc một lần uống`,
  },
  { category: '18+', text: ` đổi Avatar Facebook  hình và cap ngu như lợn` },
  { category: '18+', text: ` show lịch sử web điện thoại hoặc uống` },
  {
    category: '18+',
    text: ` đứng lên Nói to rõ ràng Hôm nay tôi trả hoặc uống`,
  },
  { category: '18+', text: ` ôm người bên phải 1 phút hoặc uống` },
  {
    category: '18+',
    text: ` cả bàn cúi đầu đếm 3 2 1 mọi người sẽ ngẩng đầu và nhìn 1 người bất kỳ, nếu 2 người cùng nhìn nhau thì uống`,
  },
  {
    category: '18+',
    text: `Người nắm giữ lá bài diễn tả một câu hát trên bằng body language, mọi người cùng đoán, đoán sai thì uống`,
  },
  {
    category: '18+',
    text: ` hôn một người khác rồi bất kỳ trên bàn hoặc uống`,
  },
  {
    category: '18+',
    text: ` người nắm giữ lá bài đến 123 tất cả phải đóng băng ngay lập tức, ai cử động trước thì uống`,
  },
  {
    category: '18+',
    text: ` trả lời câu hỏi ngày sinh của Bác Hồ là bao nhiêu. Trả lời sai hoặc không trả lời được thì uống`,
  },
  {
    category: '18+',
    text: ` hát một bài với tông giọng trái với giới tính của bạn hoặc uống`,
  },
  {
    category: '18+',
    text: ` chơi Vật Tay với người đối diện ai thua thì uống`,
  },
  {
    category: '18+',
    text: `Gọi điện cho bạn thân bảo thích người yêu của nó`,
  },
  { category: '18+', text: ` gọi cho người yêu cũ xin quay lại hoặc uống` },
  { category: '18+', text: ` Kể tên 5 vị anh hùng dân tộc hoặc uống` },
  { category: '18+', text: ` hôn một người cùng giới bất kỳ hoặc uống` },
  { category: '18+', text: ` gọi điện cho bố mẹ báo nợ 1 tỏi hoặc uống` },
  {
    category: '18+',
    text: ` trả lời câu hỏi có muốn quay lại với người yêu cũ hay không`,
  },
  {
    category: '18+',
    text: ` người nắm giữ lá bài được quyết định bỏ một lần uống của một người bất kỳ trừ bản thân`,
  },
  {
    category: '18+',
    text: ` nhắn tin với Bố Mẹ/Sếp là con muốn bỏ học/ em muốn bỏ việc,  rồi chặn họ cho đến khi hết cuộc nhậu`,
  },
  {
    category: '18+',
    text: ` nhìn vào mắt người đối diện ai chớp mắt trước thì uống`,
  },
  { category: '18+', text: ` Kể tên 5 brand bcs hoặc uống` },
  { category: '18+', text: ` chạy quanh phòng bắt chước con khỉ hoặc uống` },
  {
    category: '18+',
    text: ` gọi cho bố hoặc mẹ nhắn bạn gái con có bầu rồi (đối với nam) Hoặc con có bầu rồi (đối với nữ)`,
  },
  {
    category: '18+',
    text: ` kể về bí mật của bạn mà chưa ai biết hoặc uống`,
  },
  { category: '18+', text: ` mọi người đều uống trừ người nắm giữ lá bài` },
  {
    category: '18+',
    text: ` gọi điện cho người yêu cũ hỏi anh/em có khỏe không hoặc uống`,
  },
  {
    category: '18+',
    text: ` gửi 15 lời mời kết bạn cho người khác giới bất kỳ trên Facebook hoặc uống`,
  },
  {
    category: '18+',
    text: ` Diễn lại biểu cảm mèo méo meo meo meo của Trần Đức Bo hoặc uống `,
  },
  {
    category: '18+',
    text: `Khoe 3 bức ảnh gần nhất trong điện thoại hoặc uống`,
  },
  { category: '18+', text: ` Kể tên 5 món đồ chơi tình dục` },
  { category: '18+', text: ` kể về 1 kỉ niệm "đội quần" của bạn` },
  {
    category: '18+',
    text: ` kể những gì bạn nghĩ khi ngồi trong nhà vệ sinh hoặc uống`,
  },
  {
    category: '18+',
    text: ` giữ lại lá bài và có quyền chọn uống nhấp môi một lần`,
  },
  { category: '18+', text: ` gọi điện mời cưới người yêu cũ hoặc uống` },
  { category: '18+', text: ` show Số dư tài khoản hoặc uống` },
  {
    category: '18+',
    text: ` bạn sẽ làm gì khi có siêu năng lực tàn hình hoặc uống`,
  },
  {
    category: '18+',
    text: ` kể ba điểm tốt nhất của người yêu cũ hoặc uống`,
  },
  {
    category: '18+',
    text: ` ai đã từng yêu đơn phương không dám tỏ tình thì uống`,
  },
  { category: '18+', text: ` I richkid nhất ở đây thì uống` },
  {
    category: '18+',
    text: ` người đối diện hôn má một người do cả bàn chỉ định`,
  },
  { category: '18+', text: `Ai một giây không rời điện thoại thì uống` },
  { category: '18+', text: `Ai hay hủy kèo phút cuối thì uống` },
  { category: '18+', text: ` ai đã từng trốn học bị bắt được thì uống` },
  {
    category: '18+',
    text: ` Chưa có người yêu uống 2 ly có người yêu rồi thì uống 1 ly`,
  },
  {
    category: '18+',
    text: `Hát nối chữ bắt đầu từ người nắm giữ lá bài ai thua thì uống`,
  },
  { category: '18+', text: ` ai đã từng cho chó ăn chè thì uống` },
  {
    category: '18+',
    text: ` cả bàn không dùng tay uống 1 ly, ai không làm được uống thêm 1 ly `,
  },
  {
    category: '18+',
    text: `Người nắm giữ lá bài nói chuyện 2 môi không chạm nhau trong 3 phút,  thua thì uống`,
  },
  { category: '18+', text: `Người chơi hệ cao su (trễ giờ) thì uống` },
  { category: '18+', text: ` ai đã từng dùng tinder thì uống` },
  { category: '18+', text: ` ai đen bạc đen cả tình thì uống ` },
];

// Bộ câu hỏi Táo Bạo
export const TAO_BAO_QUESTIONS: DrinkQuestion[] = [
  {
    category: '18+_tao_bao',
    text: ` cởi áo và mặc lại, trong lúc cởi phải kể về lần đầu tiên bạn quan hệ hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể chi tiết về lần quan hệ đầu tiên của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi video cho người yêu cũ và nói "em/anh nhớ anh/em" rồi tắt máy ngay hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng story trên Instagram/ Facebook kể về kỷ niệm "nóng" nhất của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả bằng hành động một tư thế quan hệ mà bạn thích, mọi người đoán hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ ở nơi công cộng hoặc nơi bất thường nhất hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho crush "anh/em muốn làm tình với em/anh" và chụp màn hình gửi nhóm hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đọc to một đoạn truyện người lớn mà người khác chọn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ dài nhất của bạn (bao lâu) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả chi tiết về điểm nhạy cảm nhất trên cơ thể bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi cho người yêu cũ và hỏi "anh/em còn nhớ lần cuối chúng ta làm tình không?" rồi tắt máy hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mạnh mẽ nhất/điên cuồng nhất của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô phỏng bằng cử chỉ một tư thế quan hệ với người đối diện (không chạm vào) hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về số lượng người bạn đã từng quan hệ hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng story trên mạng xã hội "Đêm nay em/anh muốn được làm tình" hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho một người bất kỳ trong danh bạ "anh/em muốn được sờ em/anh" hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ với nhiều người cùng lúc hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả chi tiết về màn dạo đầu lý tưởng của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi điện cho bố/mẹ và nói "con đang quan hệ" rồi tắt máy ngay hoặc uống 5 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ với người lạ hoặc one night stand hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng ảnh selfie chỉ mặc đồ lót lên story với caption "Đêm nay em/anh sẵn sàng" hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả về kích thước "của quý" hoặc "vòng 1/vòng 3" của bạn một cách chi tiết hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn đạt cực khoái nhất hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho crush "em/anh đang tưởng tượng làm tình với anh/em" và chụp màn hình gửi nhóm hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đọc to một câu nói người lớn mà người khác viết ra hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn bị bắt gặp hoặc gần như bị bắt gặp hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả chi tiết về giấc mơ tình dục đáng nhớ nhất của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi video call cho người yêu cũ và làm động tác gợi cảm trong 5 giây rồi tắt máy hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ với đồ chơi tình dục hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng status lên Facebook "Đêm nay ai muốn được làm tình với em/anh thì inbox" hoặc uống 5 ly`,
  },
  // Thêm 30 câu hỏi mới cho Táo Bạo
  {
    category: '18+_tao_bao',
    text: ` kể chi tiết về lần bạn làm tình ở nơi công cộng nhất hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả bằng ngôn ngữ body một tư thế quan hệ mà bạn muốn thử nhất hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi điện cho crush và nói "em/anh đang nghĩ về anh/em" rồi tắt máy ngay hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng story kể về lần quan hệ "nóng" nhất của bạn với emoji 🔥 hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn không thể quên được (chi tiết) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả chi tiết về điểm G hoặc điểm nhạy cảm nhất của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho người yêu cũ "anh/em còn nhớ chúng ta làm tình lần cuối không?" hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn đạt đỉnh nhất (chi tiết cảm giác) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng ảnh selfie chỉ mặc nội y lên story với caption gợi cảm hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi video call cho crush và làm động tác khiêu gợi trong 3 giây hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ với người lạ mà bạn không biết tên hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả chi tiết về màn dạo đầu khiến bạn "phát điên" nhất hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng status "Em/anh cần được thỏa mãn ngay bây giờ" lên Facebook hoặc uống 5 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về số lượng người bạn đã từng quan hệ (cụ thể) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho một người bất kỳ "Anh/em muốn em/anh ngay bây giờ" hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả về kích thước và hình dáng "của quý" của bạn một cách chi tiết hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ thử nghiệm điều mới lạ nhất của bạn hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi cho bố/mẹ và nói "Con đang làm tình" rồi tắt máy ngay hoặc uống 5 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng ảnh gợi cảm lên Instagram với hashtag #hot #sexy hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ với nhiều người cùng lúc (chi tiết) hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả về cách bạn thích được chạm vào nhất hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho crush "Em/anh đang tưởng tượng làm tình với anh/em ngay bây giờ" hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đọc to một đoạn truyện người lớn mà người khác chọn (ít nhất 3 câu) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn không dùng bao cao su (nếu có) hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả chi tiết về lần quan hệ đầu tiên của bạn (từng bước) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` gọi video call cho người yêu cũ và hôn màn hình rồi tắt máy hoặc uống 3 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng story "Em/anh đang cần ai đó đến với em/anh ngay" hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn bị "đỉnh" nhiều lần nhất hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` mô tả về tư thế quan hệ mà bạn thích nhất (chi tiết từng động tác) hoặc uống 2 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` nhắn tin cho một người lạ trên mạng xã hội "Anh/em muốn em/anh" hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` đăng ảnh chỉ mặc đồ lót lên story với caption khiêu khích hoặc uống 4 ly`,
  },
  {
    category: '18+_tao_bao',
    text: ` kể về lần quan hệ mà bạn phát ra tiếng kêu to nhất hoặc uống 2 ly`,
  },
];

// Bộ câu hỏi Tình Bạn
export const FRIENDSHIP_QUESTIONS: DrinkQuestion[] = [
  {
    category: 'tinh_ban',
    text: ` kể kỷ niệm "quê" nhất bạn từng có với nhóm này`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là người hay trễ giờ nhất nhóm? người đó nói lý do hoặc uống`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần bạn được một người trong bàn cứu kèo toang nhất`,
  },
  {
    category: 'tinh_ban',
    text: ` đặt biệt danh hài cho người đối diện, họ có quyền từ chối và bạn uống`,
  },
  { category: 'tinh_ban', text: ` chia sẻ 3 điểm bạn thích ở người bên trái` },
  {
    category: 'tinh_ban',
    text: ` kể lần bạn giúp ai trong nhóm và thấy vui nhất`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay quên sinh nhật? người bị gọi tên giải thích trong 15 giây hoặc uống`,
  },
  {
    category: 'tinh_ban',
    text: ` diễn tả bằng hành động thói quen lầy của nhóm, mọi người đoán`,
  },
  {
    category: 'tinh_ban',
    text: ` nhắn một câu cảm ơn thật lòng đến một người trong bàn (nói miệng cũng được)`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần cả nhóm xém toang nhưng đã xử lý được`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay hủy kèo phút cuối? người đó uống hoặc kể lý do hài hước`,
  },
  {
    category: 'tinh_ban',
    text: ` kể một bí mật nhỏ mà nhóm chưa biết (hoặc uống)`,
  },
  { category: 'tinh_ban', text: ` mô tả người bạn bên phải bằng 3 tính từ` },
  { category: 'tinh_ban', text: ` kể lần bạn cười xỉu với người trong nhóm` },
  {
    category: 'tinh_ban',
    text: ` ai là cây hài của nhóm? người đó kể chuyện cười ngắn`,
  },
  {
    category: 'tinh_ban',
    text: ` kể thói quen kỳ cục của bạn khi đi chơi với nhóm`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm giúp bạn vượt qua deadline/toang vụ lớn`,
  },
  {
    category: 'tinh_ban',
    text: ` nếu phải chọn đồng đội duy nhất để đi "cứu bạn", bạn chọn ai?`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần bạn và ai đó trong nhóm vô tình ăn mặc đôi`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay quên đồ? người đó kể món quên "đỉnh" nhất`,
  },
  {
    category: 'tinh_ban',
    text: ` kể playlist hoặc bài hát chung gắn với nhóm`,
  },
  { category: 'tinh_ban', text: ` mô tả chuyến đi nhớ nhất cùng nhóm` },
  {
    category: 'tinh_ban',
    text: ` nếu cả nhóm lập band nhạc, bạn sẽ chơi nhạc cụ gì?`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm bị lạc đường hoặc toang lịch trình`,
  },
  {
    category: 'tinh_ban',
    text: ` ai trong bàn sống thật nhất? giải thích ngắn gọn`,
  },
  {
    category: 'tinh_ban',
    text: ` kể một thói quen tốt bạn học được từ người trong nhóm`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là người "mềm lòng" nhất? người đó kể lần yếu lòng gần đây`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm làm bạn ngạc nhiên nhất` },
  {
    category: 'tinh_ban',
    text: ` kể lần bạn làm nhóm "mất mặt" nhẹ và đã xử lý sao`,
  },
  {
    category: 'tinh_ban',
    text: ` chọn một người trong bàn để đi phượt 2 ngày và nói lý do`,
  },
  { category: 'tinh_ban', text: ` kể món ăn nhóm hay gọi nhất khi tụ tập` },
  {
    category: 'tinh_ban',
    text: ` ai trong nhóm hay chụp ảnh xấu? người đó chụp một pose hài ngay`,
  },
  {
    category: 'tinh_ban',
    text: ` kể câu nói cửa miệng của nhóm hoặc một thành viên`,
  },
  {
    category: 'tinh_ban',
    text: ` nếu nhóm là một bộ phim, tên phim sẽ là gì?`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần cả nhóm cười "điên" vì một chuyện nhỏ xíu`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là người gào thét trên xe/ karaoke to nhất? người đó hát 1 câu`,
  },
  {
    category: 'tinh_ban',
    text: ` kể một thử thách nhóm từng vượt qua cùng nhau`,
  },
  {
    category: 'tinh_ban',
    text: ` nếu phải tặng quà cho người đối diện, bạn sẽ tặng gì?`,
  },
  { category: 'tinh_ban', text: ` kể lần bạn cảm thấy được nhóm bảo vệ nhất` },
  {
    category: 'tinh_ban',
    text: ` ai là người "tỉnh táo" nhất sau mọi cuộc nhậu? người đó uống/nhường`,
  },
  { category: 'tinh_ban', text: ` kể kế hoạch đi chơi mơ ước của nhóm` },
  {
    category: 'tinh_ban',
    text: ` ai hay ôm việc/ôm deadline cho nhóm? cảm ơn họ 1 câu`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm họp mà biến thành buổi tâm sự dài`,
  },
  {
    category: 'tinh_ban',
    text: ` ai thường là người "gác cổng" kéo mọi người về khi quá trễ?`,
  },
  {
    category: 'tinh_ban',
    text: ` kể chuyện nhỏ khiến bạn nhận ra nhóm rất thân`,
  },
  {
    category: 'tinh_ban',
    text: ` ai trong nhóm chuyên tổ chức? người đó nói mẹo quản lý kèo`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần bạn và nhóm chơi boardgame/bài và kết quả ra sao`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay chọc cười lúc nhóm đang căng? cảm ơn họ`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần cả nhóm "đụng độ" thời tiết xấu và vượt qua`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay spam meme trong nhóm chat? người đó gửi/diễn lại 1 meme`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm nổi hứng làm điều bốc đồng` },
  {
    category: 'tinh_ban',
    text: ` ai là người trả lời chậm nhất trong nhóm chat? giải thích`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần bạn hiểu lầm một người trong nhóm và đã giải quyết`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay nhắc mọi người uống nước/ăn uống? người đó được miễn 1 lượt`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm xem phim chung và phản ứng hài hước nhất`,
  },
  {
    category: 'tinh_ban',
    text: ` ai trong nhóm sẽ sống sót nếu bị lạc? mọi người vote, người được vote kể lý do`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm thức khuya nhất và đang làm gì` },
  {
    category: 'tinh_ban',
    text: ` ai là người hay "quên ví"? người đó chia sẻ bài học rút ra`,
  },
  {
    category: 'tinh_ban',
    text: ` kể một inside joke của nhóm (không quá riêng tư)`,
  },
  {
    category: 'tinh_ban',
    text: ` ai dễ cười nhất? người đó giữ mặt nghiêm 10 giây, cười là uống`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm "đổi vai" (ví dụ: nghiêm túc thành lầy)`,
  },
  {
    category: 'tinh_ban',
    text: ` nếu cả nhóm tham gia gameshow, ai làm MC? ai làm thí sinh trùm?`,
  },
  { category: 'tinh_ban', text: ` kể một điều bạn muốn cảm ơn cả nhóm` },
  {
    category: 'tinh_ban',
    text: ` ai hay check-in đúng giờ? người đó giao một thử thách nhẹ cho bàn`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm chụp ảnh xấu nhưng vẫn đăng` },
  {
    category: 'tinh_ban',
    text: ` ai là "ngân hàng" hay cho vay? người đó nhận 1 lời tri ân`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm "ăn hành" tập thể (thi, công việc, dự án)`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay gợi ý quán xịn? người đó chia sẻ bí kíp tìm quán`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm thử món mới và phản ứng ra sao` },
  {
    category: 'tinh_ban',
    text: ` ai là người "tỉnh rượu" lo cho nhóm? người đó giao 1 thử thách vui`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm cosplay/đóng vai (nếu có) hoặc tưởng tượng sẽ đóng vai gì`,
  },
  {
    category: 'tinh_ban',
    text: ` ai thích chụp ảnh candid? người đó chụp nhanh 1 tấm cho bàn`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm gặp sự cố giao thông và đã xoay xở thế nào`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay "đi lạc" trong mall? người đó kể hành trình tìm đường`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm chơi trò vận động (plank, squat) và kết quả`,
  },
  {
    category: 'tinh_ban',
    text: ` ai luôn mang đồ cứu nguy (băng cá nhân, kẹo, sạc)? cảm ơn họ`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm "đổi chỗ ngồi" trên xe và chuyện phát sinh`,
  },
  {
    category: 'tinh_ban',
    text: ` ai sưu tầm meme nhiều nhất? người đó diễn lại meme yêu thích`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm đi nhầm ngày/nhầm quán nhưng vẫn vui`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay làm MC giới thiệu món ăn? người đó review món tưởng tượng`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm giúp bạn học/ôn thi/làm việc hiệu quả hơn`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là người "né drama" giỏi nhất? chia sẻ bí quyết`,
  },
  {
    category: 'tinh_ban',
    text: ` kể một kế hoạch bất chợt bạn muốn rủ nhóm làm ngay`,
  },
  {
    category: 'tinh_ban',
    text: ` ai trong nhóm hay quên mang áo khoác? người đó khoe cách giữ ấm bất đắc dĩ`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm tổ chức sinh nhật bất ngờ cho ai đó`,
  },
  {
    category: 'tinh_ban',
    text: ` ai hay chụp ảnh đồ ăn? người đó bày pose chụp nhanh trong 5 giây`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm chơi trò nối chữ tên thành viên và kết quả`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là người "đầy năng lượng buổi sáng"? chia sẻ mẹo`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm giúp bạn bình tĩnh khi stress` },
  {
    category: 'tinh_ban',
    text: ` ai là người "giải thích luật chơi" giỏi nhất? người đó giải thích luật bất kỳ trong 15 giây`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm dọn dẹp/chuẩn bị cho một buổi tụ tập lớn`,
  },
  {
    category: 'tinh_ban',
    text: ` ai luôn mang pin dự phòng? người đó được chọn miễn 1 lượt`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm "nghiêm túc bất thường" và vì sao`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là người hát sai lời nhiều nhất? hát thử 1 câu`,
  },
  { category: 'tinh_ban', text: ` kể một lời hứa nhỏ bạn muốn làm với nhóm` },
  {
    category: 'tinh_ban',
    text: ` ai hay "làm slide" cho nhóm? người đó kể tip trình bày đẹp`,
  },
  {
    category: 'tinh_ban',
    text: ` kể lần nhóm chơi trò kể chuyện nối tiếp và đoạn của bạn là gì`,
  },
  {
    category: 'tinh_ban',
    text: ` ai là "bách khoa toàn thư" của nhóm? hỏi họ một câu vui`,
  },
  { category: 'tinh_ban', text: ` kể lần nhóm suýt lỡ chuyến xe/tàu/máy bay` },
  {
    category: 'tinh_ban',
    text: ` ai hay gợi ý nhạc nền chill? người đó bật/ hát giai điệu 5 giây`,
  },
];

// Bộ câu hỏi Công Sở
export const CONG_SO_QUESTIONS: DrinkQuestion[] = [
  {
    category: 'cong_so',
    text: ` kể kỷ niệm overtime nhớ đời cùng đồng nghiệp`,
  },
  {
    category: 'cong_so',
    text: ` ai hay trễ họp nhất? người đó nói lý do vui hoặc uống`,
  },
  {
    category: 'cong_so',
    text: ` ai gửi email dài nhất? người đó tóm tắt lại trong 10 giây`,
  },
  {
    category: 'cong_so',
    text: ` pitch KPI/OKR tuần này trong 10 giây, không thì uống`,
  },
  {
    category: 'cong_so',
    text: ` kể lần bạn được sếp/đồng nghiệp khen bất ngờ`,
  },
  {
    category: 'cong_so',
    text: ` ai hay mang snack/đồ ăn vặt cho team? cảm ơn họ`,
  },
  {
    category: 'cong_so',
    text: ` đặt biệt danh hài cho team lead (được phép veto, bạn uống)`,
  },
  {
    category: 'cong_so',
    text: ` ai reply "đã nhận" nhanh nhất? người đó được miễn 1 lượt`,
  },
  {
    category: 'cong_so',
    text: ` kể pha toang production/staging nhưng đã cứu kịp`,
  },
  { category: 'cong_so', text: ` đóng vai sếp nhắc deadline trong 10 giây` },
  {
    category: 'cong_so',
    text: ` ai mở camera họp đẹp nhất? người đó chọn người uống`,
  },
  { category: 'cong_so', text: ` kể lần họp mà cả team cười không ngừng` },
  {
    category: 'cong_so',
    text: ` ai spam meme ở kênh chung nhiều nhất? diễn lại 1 meme`,
  },
  { category: 'cong_so', text: ` kể lần team cháy sprint nhưng vẫn ship` },
  {
    category: 'cong_so',
    text: ` ai thích offsite/team building nhất? nói lý do`,
  },
  { category: 'cong_so', text: ` kể lần daily standup vượt 1 phút và vì sao` },
  {
    category: 'cong_so',
    text: ` ai hay quên mute mic? người đó uống hoặc xin lỗi`,
  },
  {
    category: 'cong_so',
    text: ` kể lần bạn nhắn nhầm channel (client/đồng nghiệp)`,
  },
  {
    category: 'cong_so',
    text: ` ai sống sót qua mùa chốt quý/quý 4 giỏi nhất? chia sẻ mẹo`,
  },
  {
    category: 'cong_so',
    text: ` kể trick né meeting mà bạn từng dùng (vui vẻ)`,
  },
  {
    category: 'cong_so',
    text: ` ai đang mở nhiều tab nhất? họ phải đóng 3 tab hoặc uống`,
  },
  { category: 'cong_so', text: ` kể lần deploy đêm đáng nhớ` },
  {
    category: 'cong_so',
    text: ` ai hay order trà sữa/cafe cho team? mời một người uống`,
  },
  { category: 'cong_so', text: ` kể lần cứu bug phút 89 trước demo` },
  {
    category: 'cong_so',
    text: ` ai hay "bận nhưng vẫn join" họp? chia sẻ bí quyết`,
  },
  { category: 'cong_so', text: ` kể lần training/onboarding fail hài hước` },
  {
    category: 'cong_so',
    text: ` ai giữ năng lượng tích cực nhất trong team? cảm ơn họ`,
  },
  {
    category: 'cong_so',
    text: ` kể lần bạn nhầm file/nhầm branch giữa staging và prod`,
  },
  {
    category: 'cong_so',
    text: ` ai thích retro meeting nhất? họ nêu 1 ý kiến cải thiện`,
  },
  { category: 'cong_so', text: ` kể lần retro gay cấn nhưng hữu ích` },
  {
    category: 'cong_so',
    text: ` ai là "phòng IT" bất đắc dĩ sửa mọi thiết bị? họ được miễn 1 lượt`,
  },
  {
    category: 'cong_so',
    text: ` kể lần cả team bàn chuyện lương/bonus trong bữa trưa`,
  },
  {
    category: 'cong_so',
    text: ` ai hay quên log work/timesheet? người đó uống`,
  },
  {
    category: 'cong_so',
    text: ` kể lần team dính KPI/đầu việc "trên trời" nhưng vẫn xử lý`,
  },
  {
    category: 'cong_so',
    text: ` ai mang đồ cứu nguy (sạc, băng cá nhân, thuốc)? cảm ơn họ`,
  },
  {
    category: 'cong_so',
    text: ` kể bài nhạc/playlist chung của team khi tăng ca`,
  },
  {
    category: 'cong_so',
    text: ` ai hay xin nghỉ phép gấp? kể lý do hài hước gần nhất`,
  },
  { category: 'cong_so', text: ` kể lần đi onsite/công tác đáng nhớ` },
  {
    category: 'cong_so',
    text: ` ai chịu trách nhiệm văn nghệ/MC của team? họ hát 1 câu`,
  },
  { category: 'cong_so', text: ` kể lần team ăn mừng release thành công` },
  {
    category: 'cong_so',
    text: ` ai hay ping sau giờ làm? người đó nêu quy tắc ping hợp lý`,
  },
  {
    category: 'cong_so',
    text: ` kể lần bạn bị ping 12h đêm và cảm xúc ra sao`,
  },
  {
    category: 'cong_so',
    text: ` ai dùng slide đẹp nhất? chia sẻ 1 mẹo trình bày`,
  },
  { category: 'cong_so', text: ` kể lần demo fail và cách cứu vãn` },
  {
    category: 'cong_so',
    text: ` ai là QA khó tính nhất? họ chọn 1 lỗi hay gặp`,
  },
  {
    category: 'cong_so',
    text: ` kể lần review code "căng" nhưng học được nhiều`,
  },
  {
    category: 'cong_so',
    text: ` ai hay drop link tài liệu hữu ích? chọn người uống`,
  },
  { category: 'cong_so', text: ` kể lần onboarding đồng nghiệp mới hài hước` },
  {
    category: 'cong_so',
    text: ` ai giữ văn hóa gọn gàng bàn làm việc? họ chia sẻ 1 mẹo`,
  },
  { category: 'cong_so', text: ` kể lần công ty chuyển văn phòng và kỷ niệm` },
  { category: 'cong_so', text: ` ai hay đặt lịch họp quá muộn? người đó uống` },
  { category: 'cong_so', text: ` kể lần team được thưởng/ngợi khen tập thể` },
  {
    category: 'cong_so',
    text: ` ai hay làm MC họp tuần? giao nhiệm vụ giới thiệu vui`,
  },
  { category: 'cong_so', text: ` kể lần brainstorm bùng nổ ý tưởng nhất` },
  {
    category: 'cong_so',
    text: ` ai ít nói nhất? hỏi họ 1 câu, họ trả lời hoặc uống`,
  },
  {
    category: 'cong_so',
    text: ` kể lần bạn hứa "ship nhanh" rồi học được bài học`,
  },
  {
    category: 'cong_so',
    text: ` ai hay chỉnh grammar email? họ sửa 1 câu vui`,
  },
  {
    category: 'cong_so',
    text: ` kể lần share tip năng suất giúp team đỡ toang`,
  },
  { category: 'cong_so', text: ` ai hay mang quà vặt từ chuyến đi? cảm ơn họ` },
  {
    category: 'cong_so',
    text: ` kể lần team fail vì assumption sai và bài học`,
  },
  {
    category: 'cong_so',
    text: ` ai là "đại sứ thương hiệu" công ty? họ nói 1 câu PR`,
  },
  { category: 'cong_so', text: ` kể lần phỏng vấn ứng viên đáng nhớ` },
  {
    category: 'cong_so',
    text: ` ai hay quên bật camera? lần tới phải bật 10 giây hoặc uống`,
  },
  {
    category: 'cong_so',
    text: ` kể lần lỡ gọi sếp/đồng nghiệp bằng tên/ đại từ hài`,
  },
  { category: 'cong_so', text: ` ai hay gửi GIF phản hồi? gửi/diễn tả 1 GIF` },
  { category: 'cong_so', text: ` kể lần bạn bị mute nhưng vẫn nói hăng` },
  {
    category: 'cong_so',
    text: ` ai sợ trình bày? phát biểu 1 câu bất kỳ hoặc uống`,
  },
  { category: 'cong_so', text: ` kể lần team cứu nhau khỏi một drama nội bộ` },
  {
    category: 'cong_so',
    text: ` ai nhớ sinh nhật đồng nghiệp tốt nhất? họ chọn người uống`,
  },
  { category: 'cong_so', text: ` kể lần team tham gia charity/CSR đáng nhớ` },
  {
    category: 'cong_so',
    text: ` ai hay quên check inbox? họ phải kiểm tra ngay hoặc uống`,
  },
  { category: 'cong_so', text: ` kể lần workshop nội bộ thú vị` },
  {
    category: 'cong_so',
    text: ` ai đặt câu hỏi khó nhất trong họp? đặt 1 câu nhẹ`,
  },
  { category: 'cong_so', text: ` kể lần team sai KPI nhưng kịp sửa` },
  { category: 'cong_so', text: ` ai thích OKR nhất? nêu 1 lợi ích` },
  { category: 'cong_so', text: ` kể lần nghỉ mát công ty vui nhất` },
  {
    category: 'cong_so',
    text: ` ai hay gửi meeting note chuẩn? họ tóm tắt lại 1 dòng`,
  },
  { category: 'cong_so', text: ` kể lần pair programming vui/khó quên` },
  {
    category: 'cong_so',
    text: ` ai "điều phối taxi/xe" mỗi kèo? giao 1 thử thách nhỏ`,
  },
  {
    category: 'cong_so',
    text: ` kể một điều bạn muốn cảm ơn đồng nghiệp hôm nay`,
  },
];

// Mapping từ categoryId đến bộ câu hỏi tương ứng
export const DRINK_QUESTIONS_BY_CATEGORY: Record<
  DrinkCategoryId,
  DrinkQuestion[]
> = {
  '18+': EIGHTEEN_PLUS_QUESTIONS,
  '18+_tao_bao': TAO_BAO_QUESTIONS,
  tinh_ban: FRIENDSHIP_QUESTIONS,
  cong_so: CONG_SO_QUESTIONS,
};

// Merge tất cả các bộ câu hỏi lại
export const DRINK_QUESTIONS: DrinkQuestion[] = [
  ...EIGHTEEN_PLUS_QUESTIONS,
  ...TAO_BAO_QUESTIONS,
  ...FRIENDSHIP_QUESTIONS,
  ...CONG_SO_QUESTIONS,
];
