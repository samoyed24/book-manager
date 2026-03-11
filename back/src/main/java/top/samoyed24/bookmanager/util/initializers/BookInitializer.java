package top.samoyed24.bookmanager.util.initializers;

import org.springframework.stereotype.Component;
import top.samoyed24.bookmanager.constant.BookStatus;
import top.samoyed24.bookmanager.entity.Book;
import top.samoyed24.bookmanager.repository.BookRepository;
import top.samoyed24.bookmanager.util.time.TimeUtil;

@Component
public class BookInitializer {
    BookRepository bookRepository;
    TimeUtil timeUtil;
    public BookInitializer(BookRepository bookRepository, TimeUtil timeUtil) {
        this.bookRepository = bookRepository;
        this.timeUtil = timeUtil;
    }
    public void run() {
        if (!bookRepository.existsByPublishNo("9787067626519")) {
            Book book = new Book();
            book.setName("百年孤独");
            book.setPrice("128.00");
            book.setAuthor("加西亚·马尔克斯");
            book.setDescription("《百年孤独》是哥伦比亚作家加西亚·马尔克斯创作的长篇小说，被誉为拉丁美洲魔幻现实主义文学的代表作。小说围绕布恩迪亚家族在虚构城镇马孔多长达七代人的历史展开，融合现实与幻想，展现了爱情、孤独、命运与历史循环的宏大叙事。作品通过鲜活的细节和富有诗意的语言，刻画了人类生存的荒诞性和深刻情感，被世界文学界广泛认为为20世纪最重要的小说之一。");
            book.setPublisher("南海出版公司");
            book.setClsNo("I247.1");
            book.setPublishNo("9787067626519");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787506365437")) {
            Book book = new Book();
            book.setName("活着");
            book.setPrice("39.00");
            book.setAuthor("余华");
            book.setDescription("《活着》是余华的代表作之一，讲述了普通农民福贵在时代洪流中历经亲人离散与人生苦难，却依然顽强活下去的故事。小说以极其克制而冷静的语言，展现了生命的坚韧与命运的残酷，被认为是中国当代文学中最具震撼力的作品之一。");
            book.setPublisher("作家出版社");
            book.setClsNo("I247.5");
            book.setPublishNo("9787506365437");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787020024759")) {
            Book book = new Book();
            book.setName("围城");
            book.setPrice("49.00");
            book.setAuthor("钱钟书");
            book.setDescription("《围城》是钱钟书创作的长篇小说，被誉为中国现代文学史上的经典讽刺小说。作品通过主人公方鸿渐的求学、恋爱与婚姻经历，深刻揭示了知识分子的精神困境与社会虚伪，语言机智幽默，思想锋利深刻。");
            book.setPublisher("人民文学出版社");
            book.setClsNo("I246.5");
            book.setPublishNo("9787020024759");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }

        if (!bookRepository.existsByPublishNo("9787536692930")) {
            Book book = new Book();
            book.setName("三体");
            book.setPrice("45.00");
            book.setAuthor("刘慈欣");
            book.setDescription("《三体》是刘慈欣创作的科幻小说，也是“三体”三部曲的第一部。小说以人类文明与外星文明的接触为起点，融合物理学、宇宙学与社会思考，探讨文明冲突与人类命运，被认为是中国科幻文学的重要里程碑。");
            book.setPublisher("重庆出版社");
            book.setClsNo("I247.7");
            book.setPublishNo("9787536692930");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787020002207")) {
            Book book = new Book();
            book.setName("红楼梦");
            book.setPrice("59.00");
            book.setAuthor("曹雪芹");
            book.setDescription("《红楼梦》是中国古典四大名著之一，以贾、史、王、薛四大家族的兴衰为背景，描绘了封建社会的复杂人情与命运悲剧。作品结构宏大，人物众多，思想深刻，被公认为中国文学史上最伟大的小说之一。");
            book.setPublisher("人民文学出版社");
            book.setClsNo("I242.4");
            book.setPublishNo("9787020002207");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787208061644")) {
            Book book = new Book();
            book.setName("追风筝的人");
            book.setPrice("42.00");
            book.setAuthor("卡勒德·胡赛尼");
            book.setDescription("《追风筝的人》是阿富汗裔美国作家卡勒德·胡赛尼的成名作。小说以阿富汗的历史变迁为背景，讲述了友情、背叛与救赎的故事，情感真挚动人，自出版以来在全球范围内引起强烈反响。");
            book.setPublisher("上海人民出版社");
            book.setClsNo("I712.45");
            book.setPublishNo("9787208061644");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787544242516")) {
            Book book = new Book();
            book.setName("白夜行");
            book.setPrice("59.00");
            book.setAuthor("东野圭吾");
            book.setDescription("《白夜行》是日本作家东野圭吾的代表作之一，通过一桩未解的命案串联起少年与少女长达数十年的人生轨迹，展现了人性深处的孤独与罪恶，被誉为社会派推理小说的巅峰之作。");
            book.setPublisher("南海出版公司");
            book.setClsNo("I313.45");
            book.setPublishNo("9787544242516");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787544242517")) {
            Book book = new Book();
            book.setName("嫌疑人X的献身");
            book.setPrice("39.00");
            book.setAuthor("东野圭吾");
            book.setDescription("《嫌疑人X的献身》讲述了一位天才数学家为保护心爱之人而精心策划完美犯罪的故事，作品在推理结构与情感深度上达到高度统一，被誉为推理小说史上的经典。");
            book.setPublisher("南海出版公司");
            book.setClsNo("I313.45");
            book.setPublishNo("9787544242517");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787544270878")) {
            Book book = new Book();
            book.setName("解忧杂货店");
            book.setPrice("49.50");
            book.setAuthor("东野圭吾");
            book.setDescription("《解忧杂货店》通过一家能穿越时空回信的杂货店，串联起多个看似独立却彼此关联的人生故事，探讨了选择、命运与善意的力量，温暖而治愈。");
            book.setPublisher("南海出版公司");
            book.setClsNo("I313.45");
            book.setPublishNo("9787544270878");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787020042494")) {
            Book book = new Book();
            book.setName("小王子");
            book.setPrice("22.00");
            book.setAuthor("安托万·德·圣埃克苏佩里");
            book.setDescription("《小王子》是一部充满诗意与哲思的童话作品，通过小王子的星际旅行，探讨了爱、责任、孤独与人生本质，被誉为适合所有年龄段阅读的经典之作。");
            book.setPublisher("人民文学出版社");
            book.setClsNo("I565.88");
            book.setPublishNo("9787020042494");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787530210291")) {
            Book book = new Book();
            book.setName("1984");
            book.setPrice("39.00");
            book.setAuthor("乔治·奥威尔");
            book.setDescription("《1984》描绘了一个极权统治下高度监控的未来社会，通过主人公的反抗与失败，深刻揭示了权力、语言与思想控制的危险性，是反乌托邦文学的代表作。");
            book.setPublisher("北京十月文艺出版社");
            book.setClsNo("I561.45");
            book.setPublishNo("9787530210291");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787020026821")) {
            Book book = new Book();
            book.setName("动物农场");
            book.setPrice("25.00");
            book.setAuthor("乔治·奥威尔");
            book.setDescription("《动物农场》以寓言形式讽刺极权政治，通过动物革命最终走向独裁的过程，揭示了权力腐化与理想破灭的必然性，语言简洁却寓意深刻。");
            book.setPublisher("人民文学出版社");
            book.setClsNo("I561.45");
            book.setPublishNo("9787020026821");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787020049295")) {
            Book book = new Book();
            book.setName("平凡的世界");
            book.setPrice("68.00");
            book.setAuthor("路遥");
            book.setDescription("《平凡的世界》以中国农村社会为背景，描绘了普通人在时代变迁中的奋斗与坚持，展现了劳动、尊严与理想的价值，是现实主义文学的经典之作。");
            book.setPublisher("人民文学出版社");
            book.setClsNo("I247.5");
            book.setPublishNo("9787020049295");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787544253994")) {
            Book book = new Book();
            book.setName("霍乱时期的爱情");
            book.setPrice("55.00");
            book.setAuthor("加西亚·马尔克斯");
            book.setDescription("《霍乱时期的爱情》讲述了一段跨越半个多世纪的爱情故事，以细腻而富有诗意的语言，探讨了爱情、时间与生命的意义，是魔幻现实主义的重要作品。");
            book.setPublisher("南海出版公司");
            book.setClsNo("I775.45");
            book.setPublishNo("9787544253994");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787508660752")) {
            Book book = new Book();
            book.setName("人类简史");
            book.setPrice("68.00");
            book.setAuthor("尤瓦尔·赫拉利");
            book.setDescription("《人类简史》从宏观视角回顾了人类从石器时代到现代社会的发展历程，融合历史、生物学与哲学思考，重新审视人类文明的起源与未来。");
            book.setPublisher("中信出版社");
            book.setClsNo("K02");
            book.setPublishNo("9787508660752");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
        if (!bookRepository.existsByPublishNo("9787535732309")) {
            Book book = new Book();
            book.setName("时间简史");
            book.setPrice("45.00");
            book.setAuthor("史蒂芬·霍金");
            book.setDescription("《时间简史》以通俗易懂的方式介绍了现代宇宙学的重要理论，包括时间、空间、黑洞与宇宙起源，是科学普及领域的经典著作。");
            book.setPublisher("湖南科学技术出版社");
            book.setClsNo("P159");
            book.setPublishNo("9787535732309");
            book.setPurchaseDate(timeUtil.getLocalDateOfDefaultOffset());
            book.setStatus(BookStatus.AVAILABLE);
            bookRepository.save(book);
        }
    }
}
