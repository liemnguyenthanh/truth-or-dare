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

// Mapping từ categoryId đến bộ câu hỏi tương ứng
export const DRINK_QUESTIONS_BY_CATEGORY: Record<
  DrinkCategoryId,
  DrinkQuestion[]
> = {
  '18+': EIGHTEEN_PLUS_QUESTIONS,
  '18+_tao_bao': TAO_BAO_QUESTIONS,
};

// Merge tất cả các bộ câu hỏi lại
export const DRINK_QUESTIONS: DrinkQuestion[] = [
  ...EIGHTEEN_PLUS_QUESTIONS,
  ...TAO_BAO_QUESTIONS,
];
