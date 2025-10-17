// --- 词汇数据 ---
const vocabulary = [
    // 水果 (fruits) - 最常用50个
    { id: 'apple', english: 'apple', chinese: '苹果', phonetic: '/ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/apple.png', example: 'I eat an apple.' },
    { id: 'banana', english: 'banana', chinese: '香蕉', phonetic: '/bəˈnænə/', themeId: 'fruits', imageUrl: '/images/fruits/banana.png', example: 'The banana is yellow.' },
    { id: 'orange', english: 'orange', chinese: '橙子', phonetic: '/ˈɔːr.ɪndʒ/', themeId: 'fruits', imageUrl: '/images/fruits/orange.png', example: 'I like orange juice.' },
    { id: 'grape', english: 'grape', chinese: '葡萄', phonetic: '/ɡreɪp/', themeId: 'fruits', imageUrl: '/images/fruits/grape.png', example: 'Grapes are sweet.' },
    { id: 'strawberry', english: 'strawberry', chinese: '草莓', phonetic: '/ˈstrɔː.bər.i/', themeId: 'fruits', imageUrl: '/images/fruits/strawberry.png', example: 'Strawberries are red.' },
    { id: 'watermelon', english: 'watermelon', chinese: '西瓜', phonetic: '/ˈwɔː.tər.mel.ən/', themeId: 'fruits', imageUrl: '/images/fruits/watermelon.png', example: 'Watermelon is juicy.' },
    { id: 'pear', english: 'pear', chinese: '梨', phonetic: '/per/', themeId: 'fruits', imageUrl: '/images/fruits/pear.png', example: 'The pear is sweet.' },
    { id: 'peach', english: 'peach', chinese: '桃子', phonetic: '/piːtʃ/', themeId: 'fruits', imageUrl: '/images/fruits/peach.png', example: 'Peaches are soft.' },
    { id: 'cherry', english: 'cherry', chinese: '樱桃', phonetic: '/ˈtʃer.i/', themeId: 'fruits', imageUrl: '/images/fruits/cherry.png', example: 'Cherries are small.' },
    { id: 'pineapple', english: 'pineapple', chinese: '菠萝', phonetic: '/ˈpaɪn.æp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/pineapple.png', example: 'Pineapple is tropical.' },
    { id: 'mango', english: 'mango', chinese: '芒果', phonetic: '/ˈmæŋ.ɡoʊ/', themeId: 'fruits', imageUrl: '/images/fruits/mango.png', example: 'Mango is delicious.' },
    { id: 'kiwi', english: 'kiwi', chinese: '猕猴桃', phonetic: '/ˈkiː.wi/', themeId: 'fruits', imageUrl: '/images/fruits/kiwi.png', example: 'Kiwi is green inside.' },
    { id: 'lemon', english: 'lemon', chinese: '柠檬', phonetic: '/ˈlem.ən/', themeId: 'fruits', imageUrl: '/images/fruits/lemon.png', example: 'Lemon is sour.' },
    { id: 'lime', english: 'lime', chinese: '青柠', phonetic: '/laɪm/', themeId: 'fruits', imageUrl: '/images/fruits/lime.png', example: 'Lime is green.' },
    { id: 'coconut', english: 'coconut', chinese: '椰子', phonetic: '/ˈkoʊ.kə.nʌt/', themeId: 'fruits', imageUrl: '/images/fruits/coconut.png', example: 'Coconut has milk.' },
    { id: 'avocado', english: 'avocado', chinese: '牛油果', phonetic: '/ˌæv.əˈkɑː.doʊ/', themeId: 'fruits', imageUrl: '/images/fruits/avocado.png', example: 'Avocado is healthy.' },
    { id: 'blueberry', english: 'blueberry', chinese: '蓝莓', phonetic: '/ˈbluː.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/blueberry.png', example: 'Blueberries are tiny.' },
    { id: 'blackberry', english: 'blackberry', chinese: '黑莓', phonetic: '/ˈblæk.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/blackberry.png', example: 'Blackberries are dark.' },
    { id: 'raspberry', english: 'raspberry', chinese: '覆盆子', phonetic: '/ˈræz.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/raspberry.png', example: 'Raspberries are red.' },
    { id: 'plum', english: 'plum', chinese: '李子', phonetic: '/plʌm/', themeId: 'fruits', imageUrl: '/images/fruits/plum.png', example: 'Plums are purple.' },
    { id: 'apricot', english: 'apricot', chinese: '杏', phonetic: '/ˈeɪ.prɪ.kɑːt/', themeId: 'fruits', imageUrl: '/images/fruits/apricot.png', example: 'Apricots are orange.' },
    { id: 'fig', english: 'fig', chinese: '无花果', phonetic: '/fɪɡ/', themeId: 'fruits', imageUrl: '/images/fruits/fig.png', example: 'Figs are sweet.' },
    { id: 'pomegranate', english: 'pomegranate', chinese: '石榴', phonetic: '/ˈpɑː.mɪ.ɡræn.ɪt/', themeId: 'fruits', imageUrl: '/images/fruits/pomegranate.png', example: 'Pomegranate has seeds.' },
    { id: 'papaya', english: 'papaya', chinese: '木瓜', phonetic: '/pəˈpaɪ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/papaya.png', example: 'Papaya is tropical.' },
    { id: 'cantaloupe', english: 'cantaloupe', chinese: '哈密瓜', phonetic: '/ˈkæn.tə.loʊp/', themeId: 'fruits', imageUrl: '/images/fruits/cantaloupe.png', example: 'Cantaloupe is sweet.' },
    { id: 'honeydew', english: 'honeydew', chinese: '蜜瓜', phonetic: '/ˈhʌn.i.duː/', themeId: 'fruits', imageUrl: '/images/fruits/honeydew.png', example: 'Honeydew is green.' },
    { id: 'grapefruit', english: 'grapefruit', chinese: '柚子', phonetic: '/ˈɡreɪp.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/grapefruit.png', example: 'Grapefruit is citrus.' },
    { id: 'cranberry', english: 'cranberry', chinese: '蔓越莓', phonetic: '/ˈkræn.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/cranberry.png', example: 'Cranberries are tart.' },
    { id: 'date', english: 'date', chinese: '枣', phonetic: '/deɪt/', themeId: 'fruits', imageUrl: '/images/fruits/date.png', example: 'Dates are sweet and chewy.' },
    { id: 'elderberry', english: 'elderberry', chinese: '接骨木莓', phonetic: '/ˈel.dər.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/elderberry.png', example: 'Elderberries are small and dark.' },
    { id: 'gooseberry', english: 'gooseberry', chinese: '醋栗', phonetic: '/ˈɡuːs.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/gooseberry.png', example: 'Gooseberries are green and sour.' },
    { id: 'guava', english: 'guava', chinese: '番石榴', phonetic: '/ˈɡwɑː.və/', themeId: 'fruits', imageUrl: '/images/fruits/guava.png', example: 'Guava is tropical fruit.' },
    { id: 'jackfruit', english: 'jackfruit', chinese: '菠萝蜜', phonetic: '/ˈdʒæk.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/jackfruit.png', example: 'Jackfruit is very large.' },
    { id: 'lychee', english: 'lychee', chinese: '荔枝', phonetic: '/ˈliː.tʃiː/', themeId: 'fruits', imageUrl: '/images/fruits/lychee.png', example: 'Lychee is sweet and juicy.' },
    { id: 'mandarin', english: 'mandarin', chinese: '橘子', phonetic: '/ˈmæn.dər.ɪn/', themeId: 'fruits', imageUrl: '/images/fruits/mandarin.png', example: 'Mandarin is like a small orange.' },
    { id: 'mulberry', english: 'mulberry', chinese: '桑葚', phonetic: '/ˈmʌl.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/mulberry.png', example: 'Mulberries grow on trees.' },
    { id: 'passion fruit', english: 'passion fruit', chinese: '百香果', phonetic: '/ˈpæʃ.ən fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/passion-fruit.png', example: 'Passion fruit is exotic.' },
    { id: 'persimmon', english: 'persimmon', chinese: '柿子', phonetic: '/pərˈsɪm.ən/', themeId: 'fruits', imageUrl: '/images/fruits/persimmon.png', example: 'Persimmon is orange fruit.' },
    { id: 'pomelo', english: 'pomelo', chinese: '柚子', phonetic: '/ˈpɑː.mə.loʊ/', themeId: 'fruits', imageUrl: '/images/fruits/pomelo.png', example: 'Pomelo is like grapefruit.' },
    { id: 'quince', english: 'quince', chinese: '榅桲', phonetic: '/kwɪns/', themeId: 'fruits', imageUrl: '/images/fruits/quince.png', example: 'Quince is hard and yellow.' },
    { id: 'star fruit', english: 'star fruit', chinese: '杨桃', phonetic: '/stɑːr fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/star-fruit.png', example: 'Star fruit looks like a star.' },
    { id: 'tamarind', english: 'tamarind', chinese: '罗望子', phonetic: '/ˈtæm.ə.rɪnd/', themeId: 'fruits', imageUrl: '/images/fruits/tamarind.png', example: 'Tamarind is sour and sweet.' },
    { id: 'tangerine', english: 'tangerine', chinese: '柑橘', phonetic: '/ˌtæn.dʒəˈriːn/', themeId: 'fruits', imageUrl: '/images/fruits/tangerine.png', example: 'Tangerine is easy to peel.' },
    { id: 'ugli fruit', english: 'ugli fruit', chinese: '丑橘', phonetic: '/ˈʌɡ.li fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/ugli-fruit.png', example: 'Ugli fruit is not pretty but tasty.' },
    { id: 'white grape', english: 'white grape', chinese: '白葡萄', phonetic: '/waɪt ɡreɪp/', themeId: 'fruits', imageUrl: '/images/fruits/white-grape.png', example: 'White grapes are green or yellow.' },
    { id: 'yellow peach', english: 'yellow peach', chinese: '黄桃', phonetic: '/ˈjel.oʊ piːtʃ/', themeId: 'fruits', imageUrl: '/images/fruits/yellow-peach.png', example: 'Yellow peach is sweet and juicy.' },
    { id: 'zucchini', english: 'zucchini', chinese: '西葫芦', phonetic: '/zuˈkiː.ni/', themeId: 'fruits', imageUrl: '/images/fruits/zucchini.png', example: 'Zucchini is green vegetable fruit.' },
    { id: 'dragon fruit', english: 'dragon fruit', chinese: '火龙果', phonetic: '/ˈdræɡ.ən fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/dragon-fruit.png', example: 'Dragon fruit is pink and white.' },
    { id: 'durian', english: 'durian', chinese: '榴莲', phonetic: '/ˈdʊr.i.ən/', themeId: 'fruits', imageUrl: '/images/fruits/durian.png', example: 'Durian has a strong smell.' },
    { id: 'rambutan', english: 'rambutan', chinese: '红毛丹', phonetic: '/ræmˈbuː.tən/', themeId: 'fruits', imageUrl: '/images/fruits/rambutan.png', example: 'Rambutan is hairy fruit.' },
    { id: 'mangosteen', english: 'mangosteen', chinese: '山竹', phonetic: '/ˈmæŋ.ɡoʊ.stiːn/', themeId: 'fruits', imageUrl: '/images/fruits/mangosteen.png', example: 'Mangosteen is purple fruit.' },
    { id: 'longan', english: 'longan', chinese: '龙眼', phonetic: '/ˈlɑːŋ.ɡən/', themeId: 'fruits', imageUrl: '/images/fruits/longan.png', example: 'Longan is like lychee.' },
    { id: 'custard apple', english: 'custard apple', chinese: '释迦', phonetic: '/ˈkʌs.tərd ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/custard-apple.png', example: 'Custard apple is creamy fruit.' },
    { id: 'breadfruit', english: 'breadfruit', chinese: '面包果', phonetic: '/ˈbred.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/breadfruit.png', example: 'Breadfruit is starchy fruit.' },
    { id: 'plantain', english: 'plantain', chinese: '大蕉', phonetic: '/ˈplæn.tɪn/', themeId: 'fruits', imageUrl: '/images/fruits/plantain.png', example: 'Plantain is like banana but bigger.' },
    { id: 'soursop', english: 'soursop', chinese: '刺果番荔枝', phonetic: '/ˈsaʊr.sɑːp/', themeId: 'fruits', imageUrl: '/images/fruits/soursop.png', example: 'Soursop is green and spiky.' },
    { id: 'cherimoya', english: 'cherimoya', chinese: '番荔枝', phonetic: '/ˌtʃer.ɪˈmoʊ.jə/', themeId: 'fruits', imageUrl: '/images/fruits/cherimoya.png', example: 'Cherimoya is sweet and creamy.' },
    { id: 'feijoa', english: 'feijoa', chinese: '费约果', phonetic: '/feɪˈdʒoʊ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/feijoa.png', example: 'Feijoa is green and oval.' },
    { id: 'kiwano', english: 'kiwano', chinese: '角瓜', phonetic: '/kiˈwɑː.noʊ/', themeId: 'fruits', imageUrl: '/images/fruits/kiwano.png', example: 'Kiwano is orange and spiky.' },
    { id: 'pitaya', english: 'pitaya', chinese: '仙人掌果', phonetic: '/pɪˈtaɪ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/pitaya.png', example: 'Pitaya grows on cactus.' },
    { id: 'salak', english: 'salak', chinese: '蛇皮果', phonetic: '/ˈsɑː.læk/', themeId: 'fruits', imageUrl: '/images/fruits/salak.png', example: 'Salak has snake-like skin.' },
    { id: 'santol', english: 'santol', chinese: '山陀儿', phonetic: '/ˈsæn.toʊl/', themeId: 'fruits', imageUrl: '/images/fruits/santol.png', example: 'Santol is yellow and round.' },
    { id: 'tamarillo', english: 'tamarillo', chinese: '树番茄', phonetic: '/ˌtæm.əˈrɪl.oʊ/', themeId: 'fruits', imageUrl: '/images/fruits/tamarillo.png', example: 'Tamarillo is like tomato but sweet.' },
    { id: 'wax apple', english: 'wax apple', chinese: '莲雾', phonetic: '/wæks ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/wax-apple.png', example: 'Wax apple is red and shiny.' },
    { id: 'yuzu', english: 'yuzu', chinese: '柚子', phonetic: '/ˈjuː.zuː/', themeId: 'fruits', imageUrl: '/images/fruits/yuzu.png', example: 'Yuzu is Japanese citrus fruit.' },
    // 动物 (animals) - 最常用50个
    { id: 'dog', english: 'dog', chinese: '狗', phonetic: '/dɔːɡ/', themeId: 'animals', imageUrl: '/images/animals/dog.png', example: 'Dogs like to play.' },
    { id: 'cat', english: 'cat', chinese: '猫', phonetic: '/kæt/', themeId: 'animals', imageUrl: '/images/animals/cat.png', example: 'The cat is sleeping.' },
    { id: 'tiger', english: 'tiger', chinese: '老虎', phonetic: '/ˈtaɪ.ɡər/', themeId: 'animals', imageUrl: '/images/animals/tiger.png', example: 'The tiger is strong.' },
    { id: 'lion', english: 'lion', chinese: '狮子', phonetic: '/ˈlaɪ.ən/', themeId: 'animals', imageUrl: '/images/animals/lion.png', example: 'The lion is brave.' },
    { id: 'bear', english: 'bear', chinese: '熊', phonetic: '/ber/', themeId: 'animals', imageUrl: '/images/animals/bear.png', example: 'Bears are big.' },
    { id: 'rabbit', english: 'rabbit', chinese: '兔子', phonetic: '/ˈræb.ɪt/', themeId: 'animals', imageUrl: '/images/animals/rabbit.png', example: 'Rabbits hop fast.' },
    { id: 'mouse', english: 'mouse', chinese: '老鼠', phonetic: '/maʊs/', themeId: 'animals', imageUrl: '/images/animals/mouse.png', example: 'The mouse is small.' },
    { id: 'horse', english: 'horse', chinese: '马', phonetic: '/hɔːrs/', themeId: 'animals', imageUrl: '/images/animals/horse.png', example: 'Horses run fast.' },
    { id: 'cow', english: 'cow', chinese: '奶牛', phonetic: '/kaʊ/', themeId: 'animals', imageUrl: '/images/animals/cow.png', example: 'Cows give milk.' },
    { id: 'pig', english: 'pig', chinese: '猪', phonetic: '/pɪɡ/', themeId: 'animals', imageUrl: '/images/animals/pig.png', example: 'Pigs are pink.' },
    { id: 'sheep', english: 'sheep', chinese: '羊', phonetic: '/ʃiːp/', themeId: 'animals', imageUrl: '/images/animals/sheep.png', example: 'Sheep have wool.' },
    { id: 'goat', english: 'goat', chinese: '山羊', phonetic: '/ɡoʊt/', themeId: 'animals', imageUrl: '/images/animals/goat.png', example: 'Goats climb mountains.' },
    { id: 'chicken', english: 'chicken', chinese: '鸡', phonetic: '/ˈtʃɪk.ɪn/', themeId: 'animals', imageUrl: '/images/animals/chicken.png', example: 'Chickens lay eggs.' },
    { id: 'duck', english: 'duck', chinese: '鸭子', phonetic: '/dʌk/', themeId: 'animals', imageUrl: '/images/animals/duck.png', example: 'Ducks swim well.' },
    { id: 'bird', english: 'bird', chinese: '鸟', phonetic: '/bɜːrd/', themeId: 'animals', imageUrl: '/images/animals/bird.png', example: 'Birds can fly.' },
    { id: 'fish', english: 'fish', chinese: '鱼', phonetic: '/fɪʃ/', themeId: 'animals', imageUrl: '/images/animals/fish.png', example: 'Fish live in water.' },
    { id: 'frog', english: 'frog', chinese: '青蛙', phonetic: '/frɔːɡ/', themeId: 'animals', imageUrl: '/images/animals/frog.png', example: 'Frogs jump high.' },
    { id: 'snake', english: 'snake', chinese: '蛇', phonetic: '/sneɪk/', themeId: 'animals', imageUrl: '/images/animals/snake.png', example: 'Snakes are long.' },
    { id: 'turtle', english: 'turtle', chinese: '乌龟', phonetic: '/ˈtɜːr.təl/', themeId: 'animals', imageUrl: '/images/animals/turtle.png', example: 'Turtles are slow.' },
    { id: 'monkey', english: 'monkey', chinese: '猴子', phonetic: '/ˈmʌŋ.ki/', themeId: 'animals', imageUrl: '/images/animals/monkey.png', example: 'Monkeys swing on trees.' },
    { id: 'panda', english: 'panda', chinese: '熊猫', phonetic: '/ˈpæn.də/', themeId: 'animals', imageUrl: '/images/animals/panda.png', example: 'Pandas eat bamboo.' },
    { id: 'koala', english: 'koala', chinese: '考拉', phonetic: '/koʊˈɑː.lə/', themeId: 'animals', imageUrl: '/images/animals/koala.png', example: 'Koalas sleep a lot.' },
    { id: 'kangaroo', english: 'kangaroo', chinese: '袋鼠', phonetic: '/ˌkæŋ.ɡəˈruː/', themeId: 'animals', imageUrl: '/images/animals/kangaroo.png', example: 'Kangaroos hop.' },
    { id: 'giraffe', english: 'giraffe', chinese: '长颈鹿', phonetic: '/dʒəˈræf/', themeId: 'animals', imageUrl: '/images/animals/giraffe.png', example: 'Giraffes are tall.' },
    { id: 'zebra', english: 'zebra', chinese: '斑马', phonetic: '/ˈziː.brə/', themeId: 'animals', imageUrl: '/images/animals/zebra.png', example: 'Zebras have stripes.' },
    { id: 'hippo', english: 'hippo', chinese: '河马', phonetic: '/ˈhɪp.oʊ/', themeId: 'animals', imageUrl: '/images/animals/hippo.png', example: 'Hippos are big.' },
    { id: 'rhino', english: 'rhino', chinese: '犀牛', phonetic: '/ˈraɪ.noʊ/', themeId: 'animals', imageUrl: '/images/animals/rhino.png', example: 'Rhinos have horns.' },
    { id: 'wolf', english: 'wolf', chinese: '狼', phonetic: '/wʊlf/', themeId: 'animals', imageUrl: '/images/animals/wolf.png', example: 'Wolves howl at night.' },
    { id: 'fox', english: 'fox', chinese: '狐狸', phonetic: '/fɑːks/', themeId: 'animals', imageUrl: '/images/animals/fox.png', example: 'Foxes are clever.' },
    { id: 'deer', english: 'deer', chinese: '鹿', phonetic: '/dɪr/', themeId: 'animals', imageUrl: '/images/animals/deer.png', example: 'Deer run fast.' },
    { id: 'squirrel', english: 'squirrel', chinese: '松鼠', phonetic: '/ˈskwɜːr.əl/', themeId: 'animals', imageUrl: '/images/animals/squirrel.png', example: 'Squirrels collect nuts.' },
    { id: 'owl', english: 'owl', chinese: '猫头鹰', phonetic: '/aʊl/', themeId: 'animals', imageUrl: '/images/animals/owl.png', example: 'Owls hunt at night.' },
    { id: 'eagle', english: 'eagle', chinese: '鹰', phonetic: '/ˈiː.ɡəl/', themeId: 'animals', imageUrl: '/images/animals/eagle.png', example: 'Eagles fly high.' },
    { id: 'penguin', english: 'penguin', chinese: '企鹅', phonetic: '/ˈpeŋ.ɡwɪn/', themeId: 'animals', imageUrl: '/images/animals/penguin.png', example: 'Penguins swim well.' },
    { id: 'dolphin', english: 'dolphin', chinese: '海豚', phonetic: '/ˈdɑːl.fɪn/', themeId: 'animals', imageUrl: '/images/animals/dolphin.png', example: 'Dolphins are smart.' },
    { id: 'whale', english: 'whale', chinese: '鲸鱼', phonetic: '/weɪl/', themeId: 'animals', imageUrl: '/images/animals/whale.png', example: 'Whales are huge.' },
    { id: 'shark', english: 'shark', chinese: '鲨鱼', phonetic: '/ʃɑːrk/', themeId: 'animals', imageUrl: '/images/animals/shark.png', example: 'Sharks live in the ocean.' },
    { id: 'octopus', english: 'octopus', chinese: '章鱼', phonetic: '/ˈɑːk.tə.pʊs/', themeId: 'animals', imageUrl: '/images/animals/octopus.png', example: 'Octopus has eight arms.' },
    { id: 'crab', english: 'crab', chinese: '螃蟹', phonetic: '/kræb/', themeId: 'animals', imageUrl: '/images/animals/crab.png', example: 'Crabs walk sideways.' },
    { id: 'butterfly', english: 'butterfly', chinese: '蝴蝶', phonetic: '/ˈbʌt̬.ɚ.flaɪ/', themeId: 'animals', imageUrl: '/images/animals/butterfly.png', example: 'Butterfly has colorful wings.' },
    { id: 'bee', english: 'bee', chinese: '蜜蜂', phonetic: '/biː/', themeId: 'animals', imageUrl: '/images/animals/bee.png', example: 'Bees make honey.' },
    { id: 'ant', english: 'ant', chinese: '蚂蚁', phonetic: '/ænt/', themeId: 'animals', imageUrl: '/images/animals/ant.png', example: 'Ants work together.' },
    { id: 'spider', english: 'spider', chinese: '蜘蛛', phonetic: '/ˈspaɪ.dər/', themeId: 'animals', imageUrl: '/images/animals/spider.png', example: 'Spiders spin webs.' },
    { id: 'ladybug', english: 'ladybug', chinese: '瓢虫', phonetic: '/ˈleɪ.di.bʌɡ/', themeId: 'animals', imageUrl: '/images/animals/ladybug.png', example: 'Ladybugs are red with spots.' },
    { id: 'dragonfly', english: 'dragonfly', chinese: '蜻蜓', phonetic: '/ˈdræɡ.ən.flaɪ/', themeId: 'animals', imageUrl: '/images/animals/dragonfly.png', example: 'Dragonflies fly fast.' },
    { id: 'grasshopper', english: 'grasshopper', chinese: '蚱蜢', phonetic: '/ˈɡræs.hɑː.pər/', themeId: 'animals', imageUrl: '/images/animals/grasshopper.png', example: 'Grasshoppers jump high.' },
    { id: 'cricket', english: 'cricket', chinese: '蟋蟀', phonetic: '/ˈkrɪk.ɪt/', themeId: 'animals', imageUrl: '/images/animals/cricket.png', example: 'Crickets make noise at night.' },
    { id: 'mosquito', english: 'mosquito', chinese: '蚊子', phonetic: '/məˈskiː.toʊ/', themeId: 'animals', imageUrl: '/images/animals/mosquito.png', example: 'Mosquitoes bite people.' },
    { id: 'fly', english: 'fly', chinese: '苍蝇', phonetic: '/flaɪ/', themeId: 'animals', imageUrl: '/images/animals/fly.png', example: 'Flies buzz around food.' },
    { id: 'worm', english: 'worm', chinese: '虫子', phonetic: '/wɜːrm/', themeId: 'animals', imageUrl: '/images/animals/worm.png', example: 'Worms live in soil.' },
    { id: 'snail', english: 'snail', chinese: '蜗牛', phonetic: '/sneɪl/', themeId: 'animals', imageUrl: '/images/animals/snail.png', example: 'Snails carry their house.' },
    { id: 'lizard', english: 'lizard', chinese: '蜥蜴', phonetic: '/ˈlɪz.ərd/', themeId: 'animals', imageUrl: '/images/animals/lizard.png', example: 'Lizards can change color.' },
    { id: 'gecko', english: 'gecko', chinese: '壁虎', phonetic: '/ˈɡek.oʊ/', themeId: 'animals', imageUrl: '/images/animals/gecko.png', example: 'Geckos can climb walls.' },
    { id: 'chameleon', english: 'chameleon', chinese: '变色龙', phonetic: '/kəˈmiː.li.ən/', themeId: 'animals', imageUrl: '/images/animals/chameleon.png', example: 'Chameleons change colors.' },
    { id: 'iguana', english: 'iguana', chinese: '鬣蜥', phonetic: '/ɪˈɡwɑː.nə/', themeId: 'animals', imageUrl: '/images/animals/iguana.png', example: 'Iguanas are green lizards.' },
    { id: 'alligator', english: 'alligator', chinese: '短吻鳄', phonetic: '/ˈæl.ə.ɡeɪ.tər/', themeId: 'animals', imageUrl: '/images/animals/alligator.png', example: 'Alligators live in swamps.' },
    { id: 'crocodile', english: 'crocodile', chinese: '鳄鱼', phonetic: '/ˈkrɑː.kə.daɪl/', themeId: 'animals', imageUrl: '/images/animals/crocodile.png', example: 'Crocodiles have sharp teeth.' },
    { id: 'elephant', english: 'elephant', chinese: '大象', phonetic: '/ˈel.ə.fənt/', themeId: 'animals', imageUrl: '/images/animals/elephant.png', example: 'Elephants are very big.' },
    { id: 'camel', english: 'camel', chinese: '骆驼', phonetic: '/ˈkæm.əl/', themeId: 'animals', imageUrl: '/images/animals/camel.png', example: 'Camels live in deserts.' },
    { id: 'donkey', english: 'donkey', chinese: '驴', phonetic: '/ˈdɑːŋ.ki/', themeId: 'animals', imageUrl: '/images/animals/donkey.png', example: 'Donkeys carry heavy things.' },
    // ... (rest of the vocabulary data remains the same)
    // 颜色 (colors) - 最常用50个
    { id: 'red', english: 'red', chinese: '红色', phonetic: '/red/', themeId: 'colors', imageUrl: '/images/colors/red.png', example: 'The apple is red.' },
    { id: 'blue', english: 'blue', chinese: '蓝色', phonetic: '/bluː/', themeId: 'colors', imageUrl: '/images/colors/blue.png', example: 'The sky is blue.' },
    { id: 'green', english: 'green', chinese: '绿色', phonetic: '/ɡriːn/', themeId: 'colors', imageUrl: '/images/colors/green.png', example: 'The grass is green.' },
    { id: 'yellow', english: 'yellow', chinese: '黄色', phonetic: '/ˈjel.oʊ/', themeId: 'colors', imageUrl: '/images/colors/yellow.png', example: 'The sun is yellow.' },
    { id: 'orange', english: 'orange', chinese: '橙色', phonetic: '/ˈɔːr.ɪndʒ/', themeId: 'colors', imageUrl: '/images/colors/orange.png', example: 'The orange is orange.' },
    { id: 'purple', english: 'purple', chinese: '紫色', phonetic: '/ˈpɜːr.pəl/', themeId: 'colors', imageUrl: '/images/colors/purple.png', example: 'Grapes are purple.' },
    { id: 'pink', english: 'pink', chinese: '粉色', phonetic: '/pɪŋk/', themeId: 'colors', imageUrl: '/images/colors/pink.png', example: 'The flower is pink.' },
    { id: 'brown', english: 'brown', chinese: '棕色', phonetic: '/braʊn/', themeId: 'colors', imageUrl: '/images/colors/brown.png', example: 'The bear is brown.' },
    { id: 'black', english: 'black', chinese: '黑色', phonetic: '/blæk/', themeId: 'colors', imageUrl: '/images/colors/black.png', example: 'The cat is black.' },
    { id: 'white', english: 'white', chinese: '白色', phonetic: '/waɪt/', themeId: 'colors', imageUrl: '/images/colors/white.png', example: 'The snow is white.' },
    { id: 'gray', english: 'gray', chinese: '灰色', phonetic: '/ɡreɪ/', themeId: 'colors', imageUrl: '/images/colors/gray.png', example: 'The rock is gray.' },
    { id: 'silver', english: 'silver', chinese: '银色', phonetic: '/ˈsɪl.vər/', themeId: 'colors', imageUrl: '/images/colors/silver.png', example: 'The coin is silver.' },
    { id: 'gold', english: 'gold', chinese: '金色', phonetic: '/ɡoʊld/', themeId: 'colors', imageUrl: '/images/colors/gold.png', example: 'The ring is gold.' },
    { id: 'beige', english: 'beige', chinese: '米色', phonetic: '/beɪʒ/', themeId: 'colors', imageUrl: '/images/colors/beige.png', example: 'The sand is beige.' },
    { id: 'ivory', english: 'ivory', chinese: '象牙色', phonetic: '/ˈaɪ.vər.i/', themeId: 'colors', imageUrl: '/images/colors/ivory.png', example: 'The piano keys are ivory.' },
    { id: 'cream', english: 'cream', chinese: '奶油色', phonetic: '/kriːm/', themeId: 'colors', imageUrl: '/images/colors/cream.png', example: 'The wall is cream color.' },
    { id: 'maroon', english: 'maroon', chinese: '栗色', phonetic: '/məˈruːn/', themeId: 'colors', imageUrl: '/images/colors/maroon.png', example: 'The sweater is maroon.' },
    { id: 'navy', english: 'navy', chinese: '海军蓝', phonetic: '/ˈneɪ.vi/', themeId: 'colors', imageUrl: '/images/colors/navy.png', example: 'The uniform is navy blue.' },
    { id: 'teal', english: 'teal', chinese: '青色', phonetic: '/tiːl/', themeId: 'colors', imageUrl: '/images/colors/teal.png', example: 'The water is teal.' },
    { id: 'cyan', english: 'cyan', chinese: '蓝绿色', phonetic: '/ˈsaɪ.æn/', themeId: 'colors', imageUrl: '/images/colors/cyan.png', example: 'Cyan is a bright blue.' },
    { id: 'magenta', english: 'magenta', chinese: '品红色', phonetic: '/məˈdʒen.tə/', themeId: 'colors', imageUrl: '/images/colors/magenta.png', example: 'Magenta is a deep pink.' },
    { id: 'fuchsia', english: 'fuchsia', chinese: '紫红色', phonetic: '/ˈfjuː.ʃə/', themeId: 'colors', imageUrl: '/images/colors/fuchsia.png', example: 'Fuchsia is vivid pink.' },
    { id: 'rose', english: 'rose', chinese: '玫瑰色', phonetic: '/roʊz/', themeId: 'colors', imageUrl: '/images/colors/rose.png', example: 'Rose is soft pink.' },
    { id: 'blush', english: 'blush', chinese: '腮红色', phonetic: '/blʌʃ/', themeId: 'colors', imageUrl: '/images/colors/blush.png', example: 'Blush is light pink.' },
    { id: 'cherry', english: 'cherry', chinese: '樱桃色', phonetic: '/ˈtʃer.i/', themeId: 'colors', imageUrl: '/images/colors/cherry.png', example: 'Cherry is bright red.' },
    { id: 'rust', english: 'rust', chinese: '铁锈色', phonetic: '/rʌst/', themeId: 'colors', imageUrl: '/images/colors/rust.png', example: 'Rust is reddish-brown.' },
    { id: 'burgundy', english: 'burgundy', chinese: '酒红色', phonetic: '/ˈbɜːr.ɡən.di/', themeId: 'colors', imageUrl: '/images/colors/burgundy.png', example: 'Burgundy is dark red.' },
    { id: 'crimson', english: 'crimson', chinese: '深红色', phonetic: '/ˈkrɪm.zən/', themeId: 'colors', imageUrl: '/images/colors/crimson.png', example: 'Crimson is deep red.' },
    { id: 'scarlet', english: 'scarlet', chinese: '猩红色', phonetic: '/ˈskɑːr.lət/', themeId: 'colors', imageUrl: '/images/colors/scarlet.png', example: 'Scarlet is bright red.' },
    { id: 'turquoise', english: 'turquoise', chinese: '绿松石色', phonetic: '/ˈtɜːr.kɔɪz/', themeId: 'colors', imageUrl: '/images/colors/turquoise.png', example: 'Turquoise is blue-green.' },
    { id: 'aqua', english: 'aqua', chinese: '水蓝色', phonetic: '/ˈæk.wə/', themeId: 'colors', imageUrl: '/images/colors/aqua.png', example: 'Aqua is light blue.' },
    { id: 'indigo', english: 'indigo', chinese: '靛蓝色', phonetic: '/ˈɪn.dɪ.ɡoʊ/', themeId: 'colors', imageUrl: '/images/colors/indigo.png', example: 'Indigo is deep blue.' },
    { id: 'violet', english: 'violet', chinese: '紫罗兰色', phonetic: '/ˈvaɪ.ə.lət/', themeId: 'colors', imageUrl: '/images/colors/violet.png', example: 'Violet is purple-blue.' },
    { id: 'lavender', english: 'lavender', chinese: '薰衣草色', phonetic: '/ˈlæv.ən.dər/', themeId: 'colors', imageUrl: '/images/colors/lavender.png', example: 'Lavender is light purple.' },
    { id: 'lilac', english: 'lilac', chinese: '丁香色', phonetic: '/ˈlaɪ.læk/', themeId: 'colors', imageUrl: '/images/colors/lilac.png', example: 'Lilac is pale purple.' },
    { id: 'mauve', english: 'mauve', chinese: '淡紫色', phonetic: '/moʊv/', themeId: 'colors', imageUrl: '/images/colors/mauve.png', example: 'Mauve is light purple.' },
    { id: 'plum', english: 'plum', chinese: '李子色', phonetic: '/plʌm/', themeId: 'colors', imageUrl: '/images/colors/plum.png', example: 'Plum is dark purple.' },
    { id: 'emerald', english: 'emerald', chinese: '翡翠绿', phonetic: '/ˈem.ə.rəld/', themeId: 'colors', imageUrl: '/images/colors/emerald.png', example: 'Emerald is bright green.' },
    { id: 'lime', english: 'lime', chinese: '酸橙绿', phonetic: '/laɪm/', themeId: 'colors', imageUrl: '/images/colors/lime.png', example: 'Lime is bright yellow-green.' },
    { id: 'olive', english: 'olive', chinese: '橄榄绿', phonetic: '/ˈɑː.lɪv/', themeId: 'colors', imageUrl: '/images/colors/olive.png', example: 'Olive is dark green.' },
    { id: 'mint', english: 'mint', chinese: '薄荷绿', phonetic: '/mɪnt/', themeId: 'colors', imageUrl: '/images/colors/mint.png', example: 'Mint is light green.' },
    { id: 'forest', english: 'forest', chinese: '森林绿', phonetic: '/ˈfɔːr.ɪst/', themeId: 'colors', imageUrl: '/images/colors/forest.png', example: 'Forest is dark green.' },
    { id: 'sage', english: 'sage', chinese: '鼠尾草绿', phonetic: '/seɪdʒ/', themeId: 'colors', imageUrl: '/images/colors/sage.png', example: 'Sage is gray-green.' },
    { id: 'khaki', english: 'khaki', chinese: '卡其色', phonetic: '/ˈkɑː.ki/', themeId: 'colors', imageUrl: '/images/colors/khaki.png', example: 'Khaki is brownish-green.' },
    { id: 'tan', english: 'tan', chinese: '棕褐色', phonetic: '/tæn/', themeId: 'colors', imageUrl: '/images/colors/tan.png', example: 'Tan is light brown.' },
    { id: 'copper', english: 'copper', chinese: '铜色', phonetic: '/ˈkɑː.pər/', themeId: 'colors', imageUrl: '/images/colors/copper.png', example: 'Copper is reddish-brown.' },
    { id: 'bronze', english: 'bronze', chinese: '青铜色', phonetic: '/brɑːnz/', themeId: 'colors', imageUrl: '/images/colors/bronze.png', example: 'Bronze is brownish-gold.' },
    { id: 'peach', english: 'peach', chinese: '桃色', phonetic: '/piːtʃ/', themeId: 'colors', imageUrl: '/images/colors/peach.png', example: 'Peach is orange-pink.' },
    { id: 'coral', english: 'coral', chinese: '珊瑚色', phonetic: '/ˈkɔːr.əl/', themeId: 'colors', imageUrl: '/images/colors/coral.png', example: 'Coral is pink-orange.' },
    { id: 'salmon', english: 'salmon', chinese: '鲑鱼色', phonetic: '/ˈsæm.ən/', themeId: 'colors', imageUrl: '/images/colors/salmon.png', example: 'Salmon is pink-orange.' },
    { id: 'apricot', english: 'apricot', chinese: '杏色', phonetic: '/ˈeɪ.prɪ.kɑːt/', themeId: 'colors', imageUrl: '/images/colors/apricot.png', example: 'Apricot is orange-yellow.' },
    { id: 'amber', english: 'amber', chinese: '琥珀色', phonetic: '/ˈæm.bər/', themeId: 'colors', imageUrl: '/images/colors/amber.png', example: 'Amber is yellow-orange.' },
    { id: 'mustard', english: 'mustard', chinese: '芥末色', phonetic: '/ˈmʌs.tərd/', themeId: 'colors', imageUrl: '/images/colors/mustard.png', example: 'Mustard is dark yellow.' },
    { id: 'lemon', english: 'lemon', chinese: '柠檬色', phonetic: '/ˈlem.ən/', themeId: 'colors', imageUrl: '/images/colors/lemon.png', example: 'Lemon is bright yellow.' },
    { id: 'canary', english: 'canary', chinese: '金丝雀色', phonetic: '/kəˈner.i/', themeId: 'colors', imageUrl: '/images/colors/canary.png', example: 'Canary is bright yellow.' },
    { id: 'chartreuse', english: 'chartreuse', chinese: '黄绿色', phonetic: '/ʃɑːrˈtruːz/', themeId: 'colors', imageUrl: '/images/colors/chartreuse.png', example: 'Chartreuse is yellow-green.' },
    { id: 'jade', english: 'jade', chinese: '翡翠色', phonetic: '/dʒeɪd/', themeId: 'colors', imageUrl: '/images/colors/jade.png', example: 'Jade is green stone color.' },
    { id: 'moss', english: 'moss', chinese: '苔藓绿', phonetic: '/mɔːs/', themeId: 'colors', imageUrl: '/images/colors/moss.png', example: 'Moss is dark green.' },
    { id: 'seafoam', english: 'seafoam', chinese: '海泡绿', phonetic: '/ˈsiː.foʊm/', themeId: 'colors', imageUrl: '/images/colors/seafoam.png', example: 'Seafoam is light blue-green.' },
    { id: 'peacock', english: 'peacock', chinese: '孔雀蓝', phonetic: '/ˈpiː.kɑːk/', themeId: 'colors', imageUrl: '/images/colors/peacock.png', example: 'Peacock is blue-green.' },
    { id: 'royal', english: 'royal', chinese: '皇家蓝', phonetic: '/ˈrɔɪ.əl/', themeId: 'colors', imageUrl: '/images/colors/royal.png', example: 'Royal is deep blue.' },
    { id: 'midnight', english: 'midnight', chinese: '午夜蓝', phonetic: '/ˈmɪd.naɪt/', themeId: 'colors', imageUrl: '/images/colors/midnight.png', example: 'Midnight is very dark blue.' },
    { id: 'slate', english: 'slate', chinese: '石板灰', phonetic: '/sleɪt/', themeId: 'colors', imageUrl: '/images/colors/slate.png', example: 'Slate is dark gray.' },
    { id: 'charcoal', english: 'charcoal', chinese: '炭灰色', phonetic: '/ˈtʃɑːr.koʊl/', themeId: 'colors', imageUrl: '/images/colors/charcoal.png', example: 'Charcoal is dark gray.' },
    { id: 'pearl', english: 'pearl', chinese: '珍珠色', phonetic: '/pɜːrl/', themeId: 'colors', imageUrl: '/images/colors/pearl.png', example: 'Pearl is white with shine.' },
    { id: 'platinum', english: 'platinum', chinese: '铂金色', phonetic: '/ˈplæt.ɪ.nəm/', themeId: 'colors', imageUrl: '/images/colors/platinum.png', example: 'Platinum is silver-white.' },
    // 数字 (numbers)
    { id: 'zero', english: 'zero', chinese: '零', phonetic: '/ˈzɪr.oʊ/', themeId: 'numbers', imageUrl: '/images/numbers/zero.png', example: 'Zero means nothing.' },
    { id: 'one', english: 'one', chinese: '一', phonetic: '/wʌn/', themeId: 'numbers', imageUrl: '/images/numbers/one.png', example: 'I have one apple.' },
    { id: 'two', english: 'two', chinese: '二', phonetic: '/tuː/', themeId: 'numbers', imageUrl: '/images/numbers/two.png', example: 'I see two cats.' },
    { id: 'three', english: 'three', chinese: '三', phonetic: '/θriː/', themeId: 'numbers', imageUrl: '/images/numbers/three.png', example: 'There are three birds.' },
    { id: 'four', english: 'four', chinese: '四', phonetic: '/fɔːr/', themeId: 'numbers', imageUrl: '/images/numbers/four.png', example: 'I have four books.' },
    { id: 'five', english: 'five', chinese: '五', phonetic: '/faɪv/', themeId: 'numbers', imageUrl: '/images/numbers/five.png', example: 'Five fingers on my hand.' },
    { id: 'six', english: 'six', chinese: '六', phonetic: '/sɪks/', themeId: 'numbers', imageUrl: '/images/numbers/six.png', example: 'Six legs on an insect.' },
    { id: 'seven', english: 'seven', chinese: '七', phonetic: '/ˈsev.ən/', themeId: 'numbers', imageUrl: '/images/numbers/seven.png', example: 'Seven days in a week.' },
    { id: 'eight', english: 'eight', chinese: '八', phonetic: '/eɪt/', themeId: 'numbers', imageUrl: '/images/numbers/eight.png', example: 'Eight legs on a spider.' },
    { id: 'nine', english: 'nine', chinese: '九', phonetic: '/naɪn/', themeId: 'numbers', imageUrl: '/images/numbers/nine.png', example: 'Nine planets in our system.' },
    { id: 'ten', english: 'ten', chinese: '十', phonetic: '/ten/', themeId: 'numbers', imageUrl: '/images/numbers/ten.png', example: 'Ten toes on my feet.' },
    { id: 'eleven', english: 'eleven', chinese: '十一', phonetic: '/ɪˈlev.ən/', themeId: 'numbers', imageUrl: '/images/numbers/eleven.png', example: 'Eleven players on a team.' },
    { id: 'twelve', english: 'twelve', chinese: '十二', phonetic: '/twelv/', themeId: 'numbers', imageUrl: '/images/numbers/twelve.png', example: 'Twelve months in a year.' },
    { id: 'thirteen', english: 'thirteen', chinese: '十三', phonetic: '/ˌθɜːrˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/thirteen.png', example: 'Thirteen is a teen number.' },
    { id: 'fourteen', english: 'fourteen', chinese: '十四', phonetic: '/ˌfɔːrˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/fourteen.png', example: 'Fourteen days in two weeks.' },
    { id: 'fifteen', english: 'fifteen', chinese: '十五', phonetic: '/ˌfɪfˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/fifteen.png', example: 'Fifteen minutes is a quarter hour.' },
    { id: 'sixteen', english: 'sixteen', chinese: '十六', phonetic: '/ˌsɪksˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/sixteen.png', example: 'Sixteen candles on the cake.' },
    { id: 'seventeen', english: 'seventeen', chinese: '十七', phonetic: '/ˌsev.ənˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/seventeen.png', example: 'Seventeen years old.' },
    { id: 'eighteen', english: 'eighteen', chinese: '十八', phonetic: '/ˌeɪˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/eighteen.png', example: 'Eighteen is adult age.' },
    { id: 'nineteen', english: 'nineteen', chinese: '十九', phonetic: '/ˌnaɪnˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/nineteen.png', example: 'Nineteen is almost twenty.' },
    { id: 'twenty', english: 'twenty', chinese: '二十', phonetic: '/ˈtwen.ti/', themeId: 'numbers', imageUrl: '/images/numbers/twenty.png', example: 'Twenty fingers and toes.' },
    { id: 'thirty', english: 'thirty', chinese: '三十', phonetic: '/ˈθɜːr.ti/', themeId: 'numbers', imageUrl: '/images/numbers/thirty.png', example: 'Thirty days in some months.' },
    { id: 'forty', english: 'forty', chinese: '四十', phonetic: '/ˈfɔːr.ti/', themeId: 'numbers', imageUrl: '/images/numbers/forty.png', example: 'Forty hours of work.' },
    { id: 'fifty', english: 'fifty', chinese: '五十', phonetic: '/ˈfɪf.ti/', themeId: 'numbers', imageUrl: '/images/numbers/fifty.png', example: 'Fifty states in America.' },
    { id: 'sixty', english: 'sixty', chinese: '六十', phonetic: '/ˈsɪks.ti/', themeId: 'numbers', imageUrl: '/images/numbers/sixty.png', example: 'Sixty seconds in a minute.' },
    { id: 'seventy', english: 'seventy', chinese: '七十', phonetic: '/ˈsev.ən.ti/', themeId: 'numbers', imageUrl: '/images/numbers/seventy.png', example: 'Seventy years is old age.' },
    { id: 'eighty', english: 'eighty', chinese: '八十', phonetic: '/ˈeɪ.ti/', themeId: 'numbers', imageUrl: '/images/numbers/eighty.png', example: 'Eighty degrees is hot.' },
    { id: 'ninety', english: 'ninety', chinese: '九十', phonetic: '/ˈnaɪn.ti/', themeId: 'numbers', imageUrl: '/images/numbers/ninety.png', example: 'Ninety percent is almost all.' },
    { id: 'hundred', english: 'hundred', chinese: '一百', phonetic: '/ˈhʌn.drəd/', themeId: 'numbers', imageUrl: '/images/numbers/hundred.png', example: 'One hundred cents in a dollar.' },
    { id: 'thousand', english: 'thousand', chinese: '一千', phonetic: '/ˈθaʊ.zənd/', themeId: 'numbers', imageUrl: '/images/numbers/thousand.png', example: 'A thousand years is a millennium.' },
    { id: 'million', english: 'million', chinese: '一百万', phonetic: '/ˈmɪl.jən/', themeId: 'numbers', imageUrl: '/images/numbers/million.png', example: 'A million dollars is a lot.' },
    // 家庭 (family)
    { id: 'father', english: 'father', chinese: '父亲', phonetic: '/ˈfɑː.ðər/', themeId: 'family', imageUrl: '/images/family/father.png', example: 'My father is tall.' },
    { id: 'mother', english: 'mother', chinese: '母亲', phonetic: '/ˈmʌð.ər/', themeId: 'family', imageUrl: '/images/family/mother.png', example: 'My mother is kind.' },
    { id: 'son', english: 'son', chinese: '儿子', phonetic: '/sʌn/', themeId: 'family', imageUrl: '/images/family/son.png', example: 'He is their son.' },
    { id: 'daughter', english: 'daughter', chinese: '女儿', phonetic: '/ˈdɔː.tər/', themeId: 'family', imageUrl: '/images/family/daughter.png', example: 'She is their daughter.' },
    { id: 'brother', english: 'brother', chinese: '兄弟', phonetic: '/ˈbrʌð.ər/', themeId: 'family', imageUrl: '/images/family/brother.png', example: 'My brother is older.' },
    { id: 'sister', english: 'sister', chinese: '姐妹', phonetic: '/ˈsɪs.tər/', themeId: 'family', imageUrl: '/images/family/sister.png', example: 'My sister is younger.' },
    { id: 'grandfather', english: 'grandfather', chinese: '祖父', phonetic: '/ˈɡrænd.fɑː.ðər/', themeId: 'family', imageUrl: '/images/family/grandfather.png', example: 'My grandfather has glasses.' },
    { id: 'grandmother', english: 'grandmother', chinese: '祖母', phonetic: '/ˈɡrænd.mʌð.ər/', themeId: 'family', imageUrl: '/images/family/grandmother.png', example: 'My grandmother bakes cookies.' },
    { id: 'grandson', english: 'grandson', chinese: '孙子', phonetic: '/ˈɡrænd.sʌn/', themeId: 'family', imageUrl: '/images/family/grandson.png', example: 'He is her grandson.' },
    { id: 'granddaughter', english: 'granddaughter', chinese: '孙女', phonetic: '/ˈɡrænd.dɔː.tər/', themeId: 'family', imageUrl: '/images/family/granddaughter.png', example: 'She is his granddaughter.' },
    { id: 'uncle', english: 'uncle', chinese: '叔叔', phonetic: '/ˈʌŋ.kəl/', themeId: 'family', imageUrl: '/images/family/uncle.png', example: 'My uncle tells funny jokes.' },
    { id: 'aunt', english: 'aunt', chinese: '阿姨', phonetic: '/ænt/', themeId: 'family', imageUrl: '/images/family/aunt.png', example: 'My aunt gives me gifts.' },
    { id: 'cousin', english: 'cousin', chinese: '堂/表兄弟姐妹', phonetic: '/ˈkʌz.ən/', themeId: 'family', imageUrl: '/images/family/cousin.png', example: 'I play with my cousin.' },
    { id: 'nephew', english: 'nephew', chinese: '侄子', phonetic: '/ˈnef.juː/', themeId: 'family', imageUrl: '/images/family/nephew.png', example: 'My nephew is small.' },
    { id: 'niece', english: 'niece', chinese: '侄女', phonetic: '/niːs/', themeId: 'family', imageUrl: '/images/family/niece.png', example: 'My niece is cute.' },
    { id: 'husband', english: 'husband', chinese: '丈夫', phonetic: '/ˈhʌz.bənd/', themeId: 'family', imageUrl: '/images/family/husband.png', example: 'He is her husband.' },
    { id: 'wife', english: 'wife', chinese: '妻子', phonetic: '/waɪf/', themeId: 'family', imageUrl: '/images/family/wife.png', example: 'She is his wife.' },
    { id: 'parent', english: 'parent', chinese: '父母', phonetic: '/ˈper.ənt/', themeId: 'family', imageUrl: '/images/family/parent.png', example: 'My parents love me.' },
    { id: 'child', english: 'child', chinese: '孩子', phonetic: '/tʃaɪld/', themeId: 'family', imageUrl: '/images/family/child.png', example: 'The child is playing.' },
    { id: 'baby', english: 'baby', chinese: '婴儿', phonetic: '/ˈbeɪ.bi/', themeId: 'family', imageUrl: '/images/family/baby.png', example: 'The baby is crying.' },
    { id: 'toddler', english: 'toddler', chinese: '幼儿', phonetic: '/ˈtɑːd.lər/', themeId: 'family', imageUrl: '/images/family/toddler.png', example: 'The toddler is learning to walk.' },
    { id: 'teenager', english: 'teenager', chinese: '青少年', phonetic: '/ˈtiːn.eɪ.dʒər/', themeId: 'family', imageUrl: '/images/family/teenager.png', example: 'A teenager goes to high school.' },
    { id: 'adult', english: 'adult', chinese: '成年人', phonetic: '/əˈdʌlt/', themeId: 'family', imageUrl: '/images/family/adult.png', example: 'An adult has a job.' },
    { id: 'friend', english: 'friend', chinese: '朋友', phonetic: '/frend/', themeId: 'family', imageUrl: '/images/family/friend.png', example: 'He is my best friend.' },
    { id: 'neighbor', english: 'neighbor', chinese: '邻居', phonetic: '/ˈneɪ.bər/', themeId: 'family', imageUrl: '/images/family/neighbor.png', example: 'My neighbor is friendly.' },
    { id: 'family', english: 'family', chinese: '家庭', phonetic: '/ˈfæm.əl.i/', themeId: 'family', imageUrl: '/images/family/family.png', example: 'Family is important.' },
    { id: 'relative', english: 'relative', chinese: '亲戚', phonetic: '/ˈrel.ə.tɪv/', themeId: 'family', imageUrl: '/images/family/relative.png', example: 'Relatives visit on holidays.' },
    // 身体 (body)
    { id: 'head', english: 'head', chinese: '头', phonetic: '/hed/', themeId: 'body', imageUrl: '/images/body/head.png', example: 'My head is round.' },
    { id: 'face', english: 'face', chinese: '脸', phonetic: '/feɪs/', themeId: 'body', imageUrl: '/images/body/face.png', example: 'I wash my face.' },
    { id: 'eye', english: 'eye', chinese: '眼睛', phonetic: '/aɪ/', themeId: 'body', imageUrl: '/images/body/eye.png', example: 'I see with my eyes.' },
    { id: 'nose', english: 'nose', chinese: '鼻子', phonetic: '/noʊz/', themeId: 'body', imageUrl: '/images/body/nose.png', example: 'I smell with my nose.' },
    { id: 'mouth', english: 'mouth', chinese: '嘴巴', phonetic: '/maʊθ/', themeId: 'body', imageUrl: '/images/body/mouth.png', example: 'I eat with my mouth.' },
    { id: 'ear', english: 'ear', chinese: '耳朵', phonetic: '/ɪr/', themeId: 'body', imageUrl: '/images/body/ear.png', example: 'I hear with my ears.' },
    { id: 'hair', english: 'hair', chinese: '头发', phonetic: '/her/', themeId: 'body', imageUrl: '/images/body/hair.png', example: 'My hair is long.' },
    { id: 'neck', english: 'neck', chinese: '脖子', phonetic: '/nek/', themeId: 'body', imageUrl: '/images/body/neck.png', example: 'A giraffe has a long neck.' },
    { id: 'shoulder', english: 'shoulder', chinese: '肩膀', phonetic: '/ˈʃoʊl.dər/', themeId: 'body', imageUrl: '/images/body/shoulder.png', example: 'I carry a bag on my shoulder.' },
    { id: 'arm', english: 'arm', chinese: '手臂', phonetic: '/ɑːrm/', themeId: 'body', imageUrl: '/images/body/arm.png', example: 'My arms are strong.' },
    { id: 'hand', english: 'hand', chinese: '手', phonetic: '/hænd/', themeId: 'body', imageUrl: '/images/body/hand.png', example: 'I wave my hand.' },
    { id: 'finger', english: 'finger', chinese: '手指', phonetic: '/ˈfɪŋ.ɡər/', themeId: 'body', imageUrl: '/images/body/finger.png', example: 'I have five fingers on my hand.' },
    { id: 'thumb', english: 'thumb', chinese: '拇指', phonetic: '/θʌm/', themeId: 'body', imageUrl: '/images/body/thumb.png', example: 'The thumb is the biggest finger.' },
    { id: 'chest', english: 'chest', chinese: '胸部', phonetic: '/tʃest/', themeId: 'body', imageUrl: '/images/body/chest.png', example: 'My heart is in my chest.' },
    { id: 'back', english: 'back', chinese: '背部', phonetic: '/bæk/', themeId: 'body', imageUrl: '/images/body/back.png', example: 'I sleep on my back.' },
    { id: 'stomach', english: 'stomach', chinese: '肚子', phonetic: '/ˈstʌm.ək/', themeId: 'body', imageUrl: '/images/body/stomach.png', example: 'Food goes to the stomach.' },
    { id: 'leg', english: 'leg', chinese: '腿', phonetic: '/leɡ/', themeId: 'body', imageUrl: '/images/body/leg.png', example: 'I walk with my legs.' },
    { id: 'knee', english: 'knee', chinese: '膝盖', phonetic: '/niː/', themeId: 'body', imageUrl: '/images/body/knee.png', example: 'My knee bends when I walk.' },
    { id: 'foot', english: 'foot', chinese: '脚', phonetic: '/fʊt/', themeId: 'body', imageUrl: '/images/body/foot.png', example: 'I stand on my feet.' },
    { id: 'toe', english: 'toe', chinese: '脚趾', phonetic: '/toʊ/', themeId: 'body', imageUrl: '/images/body/toe.png', example: 'I have ten toes on my feet.' },
    { id: 'elbow', english: 'elbow', chinese: '肘部', phonetic: '/ˈel.boʊ/', themeId: 'body', imageUrl: '/images/body/elbow.png', example: 'My elbow bends my arm.' },
    { id: 'wrist', english: 'wrist', chinese: '手腕', phonetic: '/rɪst/', themeId: 'body', imageUrl: '/images/body/wrist.png', example: 'A watch goes on the wrist.' },
    { id: 'ankle', english: 'ankle', chinese: '脚踝', phonetic: '/ˈæŋ.kəl/', themeId: 'body', imageUrl: '/images/body/ankle.png', example: 'The ankle connects the foot to the leg.' },
    { id: 'heel', english: 'heel', chinese: '脚跟', phonetic: '/hiːl/', themeId: 'body', imageUrl: '/images/body/heel.png', example: 'The heel is the back of the foot.' },
    { id: 'palm', english: 'palm', chinese: '手掌', phonetic: '/pɑːm/', themeId: 'body', imageUrl: '/images/body/palm.png', example: 'The palm is the inside of the hand.' },
    { id: 'forehead', english: 'forehead', chinese: '额头', phonetic: '/ˈfɔːr.hed/', themeId: 'body', imageUrl: '/images/body/forehead.png', example: 'My forehead is above my eyes.' },
    { id: 'cheek', english: 'cheek', chinese: '脸颊', phonetic: '/tʃiːk/', themeId: 'body', imageUrl: '/images/body/cheek.png', example: 'My cheeks turn red when I am shy.' },
    { id: 'chin', english: 'chin', chinese: '下巴', phonetic: '/tʃɪn/', themeId: 'body', imageUrl: '/images/body/chin.png', example: 'My chin is below my mouth.' },
    { id: 'lip', english: 'lip', chinese: '嘴唇', phonetic: '/lɪp/', themeId: 'body', imageUrl: '/images/body/lip.png', example: 'My lips are around my mouth.' },
    { id: 'tooth', english: 'tooth', chinese: '牙齿', phonetic: '/tuːθ/', themeId: 'body', imageUrl: '/images/body/tooth.png', example: 'You should brush your teeth daily.' },
    { id: 'tongue', english: 'tongue', chinese: '舌头', phonetic: '/tʌŋ/', themeId: 'body', imageUrl: '/images/body/tongue.png', example: 'My tongue tastes food.' },
    { id: 'eyebrow', english: 'eyebrow', chinese: '眉毛', phonetic: '/ˈaɪ.braʊ/', themeId: 'body', imageUrl: '/images/body/eyebrow.png', example: 'Eyebrows protect the eyes.' },
    { id: 'eyelash', english: 'eyelash', chinese: '睫毛', phonetic: '/ˈaɪ.læʃ/', themeId: 'body', imageUrl: '/images/body/eyelash.png', example: 'Eyelashes are pretty.' },
    { id: 'beard', english: 'beard', chinese: '胡须', phonetic: '/bɪrd/', themeId: 'body', imageUrl: '/images/body/beard.png', example: 'My dad has a beard.' },
    { id: 'mustache', english: 'mustache', chinese: '胡子', phonetic: '/ˈmʌs.tæʃ/', themeId: 'body', imageUrl: '/images/body/mustache.png', example: 'A mustache is above the lip.' },
    { id: 'waist', english: 'waist', chinese: '腰部', phonetic: '/weɪst/', themeId: 'body', imageUrl: '/images/body/waist.png', example: 'A belt goes around the waist.' },
    { id: 'hip', english: 'hip', chinese: '臀部', phonetic: '/hɪp/', themeId: 'body', imageUrl: '/images/body/hip.png', example: 'Hips help us dance.' },
    { id: 'thigh', english: 'thigh', chinese: '大腿', phonetic: '/θaɪ/', themeId: 'body', imageUrl: '/images/body/thigh.png', example: 'The thigh is the upper leg.' },
    { id: 'calf', english: 'calf', chinese: '小腿', phonetic: '/kæf/', themeId: 'body', imageUrl: '/images/body/calf.png', example: 'The calf is the lower leg.' },
    { id: 'shin', english: 'shin', chinese: '胫骨', phonetic: '/ʃɪn/', themeId: 'body', imageUrl: '/images/body/shin.png', example: 'The shin is the front of the leg.' },
    { id: 'muscle', english: 'muscle', chinese: '肌肉', phonetic: '/ˈmʌs.əl/', themeId: 'body', imageUrl: '/images/body/muscle.png', example: 'Muscles make us strong.' },
    { id: 'bone', english: 'bone', chinese: '骨头', phonetic: '/boʊn/', themeId: 'body', imageUrl: '/images/body/bone.png', example: 'Bones support our body.' },
    { id: 'skin', english: 'skin', chinese: '皮肤', phonetic: '/skɪn/', themeId: 'body', imageUrl: '/images/body/skin.png', example: 'Skin covers our body.' },
    { id: 'blood', english: 'blood', chinese: '血液', phonetic: '/blʌd/', themeId: 'body', imageUrl: '/images/body/blood.png', example: 'Blood flows in our veins.' },
    { id: 'heart', english: 'heart', chinese: '心脏', phonetic: '/hɑːrt/', themeId: 'body', imageUrl: '/images/body/heart.png', example: 'My heart pumps blood.' },
    { id: 'brain', english: 'brain', chinese: '大脑', phonetic: '/breɪn/', themeId: 'body', imageUrl: '/images/body/brain.png', example: 'My brain helps me think.' },
    { id: 'lung', english: 'lung', chinese: '肺', phonetic: '/lʌŋ/', themeId: 'body', imageUrl: '/images/body/lung.png', example: 'Lungs help us breathe.' },
    { id: 'liver', english: 'liver', chinese: '肝脏', phonetic: '/ˈlɪv.ər/', themeId: 'body', imageUrl: '/images/body/liver.png', example: 'The liver cleans our blood.' },
    { id: 'kidney', english: 'kidney', chinese: '肾脏', phonetic: '/ˈkɪd.ni/', themeId: 'body', imageUrl: '/images/body/kidney.png', example: 'Kidneys filter waste.' },
    { id: 'spine', english: 'spine', chinese: '脊柱', phonetic: '/spaɪn/', themeId: 'body', imageUrl: '/images/body/spine.png', example: 'The spine supports the back.' },
    { id: 'rib', english: 'rib', chinese: '肋骨', phonetic: '/rɪb/', themeId: 'body', imageUrl: '/images/body/rib.png', example: 'Ribs protect our organs.' },
    // 食物 (food)
    { id: 'bread', english: 'bread', chinese: '面包', phonetic: '/bred/', themeId: 'food', imageUrl: '/images/food/bread.png', example: 'I eat bread for breakfast.' },
    { id: 'rice', english: 'rice', chinese: '米饭', phonetic: '/raɪs/', themeId: 'food', imageUrl: '/images/food/rice.png', example: 'Rice is white and fluffy.' },
    { id: 'noodle', english: 'noodle', chinese: '面条', phonetic: '/ˈnuː.dəl/', themeId: 'food', imageUrl: '/images/food/noodle.png', example: 'Noodles are long and thin.' },
    { id: 'pizza', english: 'pizza', chinese: '披萨', phonetic: '/ˈpiːt.sə/', themeId: 'food', imageUrl: '/images/food/pizza.png', example: 'Pizza has cheese and tomato.' },
    { id: 'hamburger', english: 'hamburger', chinese: '汉堡包', phonetic: '/ˈhæm.bɜːr.ɡər/', themeId: 'food', imageUrl: '/images/food/hamburger.png', example: 'A hamburger is delicious.' },
    { id: 'sandwich', english: 'sandwich', chinese: '三明治', phonetic: '/ˈsænd.wɪtʃ/', themeId: 'food', imageUrl: '/images/food/sandwich.png', example: 'A sandwich has meat and vegetables.' },
    { id: 'salad', english: 'salad', chinese: '沙拉', phonetic: '/ˈsæl.əd/', themeId: 'food', imageUrl: '/images/food/salad.png', example: 'Salad is healthy and fresh.' },
    { id: 'soup', english: 'soup', chinese: '汤', phonetic: '/suːp/', themeId: 'food', imageUrl: '/images/food/soup.png', example: 'Soup is warm and tasty.' },
    { id: 'egg', english: 'egg', chinese: '鸡蛋', phonetic: '/eɡ/', themeId: 'food', imageUrl: '/images/food/egg.png', example: 'I like to eat eggs.' },
    { id: 'cheese', english: 'cheese', chinese: '奶酪', phonetic: '/tʃiːz/', themeId: 'food', imageUrl: '/images/food/cheese.png', example: 'Mice like to eat cheese.' },
    { id: 'meat', english: 'meat', chinese: '肉', phonetic: '/miːt/', themeId: 'food', imageUrl: '/images/food/meat.png', example: 'Lions eat meat.' },
    { id: 'chicken', english: 'chicken', chinese: '鸡肉', phonetic: '/ˈtʃɪk.ɪn/', themeId: 'food', imageUrl: '/images/food/chicken.png', example: 'I like fried chicken.' },
    { id: 'beef', english: 'beef', chinese: '牛肉', phonetic: '/biːf/', themeId: 'food', imageUrl: '/images/food/beef.png', example: 'Beef comes from cows.' },
    { id: 'pork', english: 'pork', chinese: '猪肉', phonetic: '/pɔːrk/', themeId: 'food', imageUrl: '/images/food/pork.png', example: 'Pork comes from pigs.' },
    { id: 'fish', english: 'fish', chinese: '鱼肉', phonetic: '/fɪʃ/', themeId: 'food', imageUrl: '/images/food/fish.png', example: 'Fish is good for you.' },
    { id: 'vegetable', english: 'vegetable', chinese: '蔬菜', phonetic: '/ˈvedʒ.tə.bəl/', themeId: 'food', imageUrl: '/images/food/vegetable.png', example: 'Eat your vegetables.' },
    { id: 'fruit', english: 'fruit', chinese: '水果', phonetic: '/fruːt/', themeId: 'food', imageUrl: '/images/food/fruit.png', example: 'Fruit is sweet.' },
    { id: 'cake', english: 'cake', chinese: '蛋糕', phonetic: '/keɪk/', themeId: 'food', imageUrl: '/images/food/cake.png', example: 'I want a birthday cake.' },
    { id: 'cookie', english: 'cookie', chinese: '饼干', phonetic: '/ˈkʊk.i/', themeId: 'food', imageUrl: '/images/food/cookie.png', example: 'I love chocolate cookies.' },
    { id: 'ice cream', english: 'ice cream', chinese: '冰淇淋', phonetic: '/aɪs kriːm/', themeId: 'food', imageUrl: '/images/food/ice-cream.png', example: 'Ice cream is cold.' },
    { id: 'chocolate', english: 'chocolate', chinese: '巧克力', phonetic: '/ˈtʃɔːk.lət/', themeId: 'food', imageUrl: '/images/food/chocolate.png', example: 'Chocolate is sweet.' },
    { id: 'candy', english: 'candy', chinese: '糖果', phonetic: '/ˈkæn.di/', themeId: 'food', imageUrl: '/images/food/candy.png', example: 'Too much candy is bad.' },
    { id: 'juice', english: 'juice', chinese: '果汁', phonetic: '/dʒuːs/', themeId: 'food', imageUrl: '/images/food/juice.png', example: 'I drink orange juice.' },
    { id: 'water', english: 'water', chinese: '水', phonetic: '/ˈwɔː.tər/', themeId: 'food', imageUrl: '/images/food/water.png', example: 'Drink a lot of water.' },
    { id: 'milk', english: 'milk', chinese: '牛奶', phonetic: '/mɪlk/', themeId: 'food', imageUrl: '/images/food/milk.png', example: 'Milk makes bones strong.' },
    { id: 'donut', english: 'donut', chinese: '甜甜圈', phonetic: '/ˈdoʊ.nʌt/', themeId: 'food', imageUrl: '/images/food/donut.png', example: 'Donuts are round and sweet.' },
    { id: 'pretzel', english: 'pretzel', chinese: '椒盐脆饼', phonetic: '/ˈpret.səl/', themeId: 'food', imageUrl: '/images/food/pretzel.png', example: 'Pretzels are twisted and salty.' },
    { id: 'popcorn', english: 'popcorn', chinese: '爆米花', phonetic: '/ˈpɑːp.kɔːrn/', themeId: 'food', imageUrl: '/images/food/popcorn.png', example: 'Popcorn pops when heated.' },
    { id: 'chips', english: 'chips', chinese: '薯片', phonetic: '/tʃɪps/', themeId: 'food', imageUrl: '/images/food/chips.png', example: 'Chips are crispy and salty.' },
    { id: 'french fries', english: 'french fries', chinese: '薯条', phonetic: '/frentʃ fraɪz/', themeId: 'food', imageUrl: '/images/food/french-fries.png', example: 'French fries are golden.' },
    { id: 'nuts', english: 'nuts', chinese: '坚果', phonetic: '/nʌts/', themeId: 'food', imageUrl: '/images/food/nuts.png', example: 'Nuts are healthy snacks.' },
    { id: 'seeds', english: 'seeds', chinese: '种子', phonetic: '/siːdz/', themeId: 'food', imageUrl: '/images/food/seeds.png', example: 'Seeds grow into plants.' },
    { id: 'beans', english: 'beans', chinese: '豆子', phonetic: '/biːnz/', themeId: 'food', imageUrl: '/images/food/beans.png', example: 'Beans are full of protein.' },
    // 玩具 (toys)
    { id: 'ball', english: 'ball', chinese: '球', phonetic: '/bɔːl/', themeId: 'toys', imageUrl: '/images/toys/ball.png', example: 'I play with a ball.' },
    { id: 'doll', english: 'doll', chinese: '娃娃', phonetic: '/dɑːl/', themeId: 'toys', imageUrl: '/images/toys/doll.png', example: 'The doll has pretty hair.' },
    { id: 'teddy bear', english: 'teddy bear', chinese: '泰迪熊', phonetic: '/ˈted.i ber/', themeId: 'toys', imageUrl: '/images/toys/teddy-bear.png', example: 'My teddy bear is soft and cuddly.' },
    { id: 'car', english: 'car', chinese: '玩具车', phonetic: '/kɑːr/', themeId: 'toys', imageUrl: '/images/toys/car.png', example: 'The toy car is red.' },
    { id: 'train', english: 'train', chinese: '火车', phonetic: '/treɪn/', themeId: 'toys', imageUrl: '/images/toys/train.png', example: 'The train goes choo-choo.' },
    { id: 'airplane', english: 'airplane', chinese: '飞机', phonetic: '/ˈer.pleɪn/', themeId: 'toys', imageUrl: '/images/toys/airplane.png', example: 'The airplane flies in the sky.' },
    { id: 'boat', english: 'boat', chinese: '船', phonetic: '/boʊt/', themeId: 'toys', imageUrl: '/images/toys/boat.png', example: 'The boat floats on water.' },
    { id: 'bicycle', english: 'bicycle', chinese: '自行车', phonetic: '/ˈbaɪ.sɪ.kəl/', themeId: 'toys', imageUrl: '/images/toys/bicycle.png', example: 'I ride my bicycle.' },
    { id: 'scooter', english: 'scooter', chinese: '滑板车', phonetic: '/ˈskuː.tər/', themeId: 'toys', imageUrl: '/images/toys/scooter.png', example: 'A scooter has two wheels.' },
    { id: 'skateboard', english: 'skateboard', chinese: '滑板', phonetic: '/ˈskeɪt.bɔːrd/', themeId: 'toys', imageUrl: '/images/toys/skateboard.png', example: 'Skateboarding is fun.' },
    { id: 'blocks', english: 'blocks', chinese: '积木', phonetic: '/blɑːks/', themeId: 'toys', imageUrl: '/images/toys/blocks.png', example: 'I build towers with blocks.' },
    { id: 'puzzle', english: 'puzzle', chinese: '拼图', phonetic: '/ˈpʌz.əl/', themeId: 'toys', imageUrl: '/images/toys/puzzle.png', example: 'This puzzle has many pieces.' },
    { id: 'kite', english: 'kite', chinese: '风筝', phonetic: '/kaɪt/', themeId: 'toys', imageUrl: '/images/toys/kite.png', example: 'The kite flies high in the wind.' },
    { id: 'yo-yo', english: 'yo-yo', chinese: '悠悠球', phonetic: '/ˈjoʊ.joʊ/', themeId: 'toys', imageUrl: '/images/toys/yo-yo.png', example: 'A yo-yo goes up and down.' },
    { id: 'top', english: 'top', chinese: '陀螺', phonetic: '/tɑːp/', themeId: 'toys', imageUrl: '/images/toys/top.png', example: 'The top spins very fast.' },
    { id: 'marbles', english: 'marbles', chinese: '弹珠', phonetic: '/ˈmɑːr.bəlz/', themeId: 'toys', imageUrl: '/images/toys/marbles.png', example: 'Marbles are small and round.' },
    { id: 'jump rope', english: 'jump rope', chinese: '跳绳', phonetic: '/dʒʌmp roʊp/', themeId: 'toys', imageUrl: '/images/toys/jump-rope.png', example: 'I use a jump rope for exercise.' },
    { id: 'hula hoop', english: 'hula hoop', chinese: '呼啦圈', phonetic: '/ˈhuː.lə huːp/', themeId: 'toys', imageUrl: '/images/toys/hula-hoop.png', example: 'A hula hoop spins around your waist.' },
    { id: 'frisbee', english: 'frisbee', chinese: '飞盘', phonetic: '/ˈfrɪz.bi/', themeId: 'toys', imageUrl: '/images/toys/frisbee.png', example: 'A frisbee flies through the air.' },
    { id: 'boomerang', english: 'boomerang', chinese: '回旋镖', phonetic: '/ˈbuː.mə.ræŋ/', themeId: 'toys', imageUrl: '/images/toys/boomerang.png', example: 'A boomerang comes back to you.' },
    { id: 'slinky', english: 'slinky', chinese: '弹簧玩具', phonetic: '/ˈslɪŋ.ki/', themeId: 'toys', imageUrl: '/images/toys/slinky.png', example: 'A slinky walks down stairs.' },
    { id: 'jack-in-the-box', english: 'jack-in-the-box', chinese: '弹跳盒', phonetic: '/dʒæk ɪn ðə bɑːks/', themeId: 'toys', imageUrl: '/images/toys/jack-in-the-box.png', example: 'Jack pops out of the box.' },
    { id: 'kaleidoscope', english: 'kaleidoscope', chinese: '万花筒', phonetic: '/kəˈlaɪ.də.skoʊp/', themeId: 'toys', imageUrl: '/images/toys/kaleidoscope.png', example: 'A kaleidoscope shows pretty patterns.' },
    { id: 'magic wand', english: 'magic wand', chinese: '魔法棒', phonetic: '/ˈmædʒ.ɪk wɑːnd/', themeId: 'toys', imageUrl: '/images/toys/magic-wand.png', example: 'A magic wand does tricks.' },
    { id: 'puppet', english: 'puppet', chinese: '木偶', phonetic: '/ˈpʌp.ɪt/', themeId: 'toys', imageUrl: '/images/toys/puppet.png', example: 'A puppet dances on strings.' },
    { id: 'robot', english: 'robot', chinese: '机器人', phonetic: '/ˈroʊ.bɑːt/', themeId: 'toys', imageUrl: '/images/toys/robot.png', example: 'The robot moves and talks.' },
    { id: 'action figure', english: 'action figure', chinese: '动作人偶', phonetic: '/ˈæk.ʃən ˈfɪɡ.jər/', themeId: 'toys', imageUrl: '/images/toys/action-figure.png', example: 'This action figure is a superhero.' },
    { id: 'toy soldier', english: 'toy soldier', chinese: '玩具士兵', phonetic: '/tɔɪ ˈsoʊl.dʒər/', themeId: 'toys', imageUrl: '/images/toys/toy-soldier.png', example: 'The toy soldier stands guard.' },
    { id: 'rocking horse', english: 'rocking horse', chinese: '摇摆木马', phonetic: '/ˈrɑː.kɪŋ hɔːrs/', themeId: 'toys', imageUrl: '/images/toys/rocking-horse.png', example: 'The rocking horse rocks back and forth.' },
    { id: 'swing', english: 'swing', chinese: '秋千', phonetic: '/swɪŋ/', themeId: 'toys', imageUrl: '/images/toys/swing.png', example: 'The swing goes high and low.' },
    { id: 'slide', english: 'slide', chinese: '滑梯', phonetic: '/slaɪd/', themeId: 'toys', imageUrl: '/images/toys/slide.png', example: 'I slide down the slide.' },
    { id: 'seesaw', english: 'seesaw', chinese: '跷跷板', phonetic: '/ˈsiː.sɔː/', themeId: 'toys', imageUrl: '/images/toys/seesaw.png', example: 'The seesaw goes up and down.' },
    { id: 'sandbox', english: 'sandbox', chinese: '沙盒', phonetic: '/ˈsænd.bɑːks/', themeId: 'toys', imageUrl: '/images/toys/sandbox.png', example: 'I play in the sandbox.' },
    { id: 'bucket', english: 'bucket', chinese: '桶', phonetic: '/ˈbʌk.ɪt/', themeId: 'toys', imageUrl: '/images/toys/bucket.png', example: 'A bucket holds sand and water.' },
    { id: 'shovel', english: 'shovel', chinese: '铲子', phonetic: '/ˈʃʌv.əl/', themeId: 'toys', imageUrl: '/images/toys/shovel.png', example: 'A shovel digs in the sand.' },
    { id: 'whistle', english: 'whistle', chinese: '哨子', phonetic: '/ˈwɪs.əl/', themeId: 'toys', imageUrl: '/images/toys/whistle.png', example: 'A whistle makes a loud sound.' },
    { id: 'harmonica', english: 'harmonica', chinese: '口琴', phonetic: '/hɑːrˈmɑː.nɪ.kə/', themeId: 'toys', imageUrl: '/images/toys/harmonica.png', example: 'A harmonica plays music.' },
    { id: 'drum', english: 'drum', chinese: '鼓', phonetic: '/drʌm/', themeId: 'toys', imageUrl: '/images/toys/drum.png', example: 'A drum makes a boom sound.' },
    { id: 'xylophone', english: 'xylophone', chinese: '木琴', phonetic: '/ˈzaɪ.lə.foʊn/', themeId: 'toys', imageUrl: '/images/toys/xylophone.png', example: 'A xylophone has colorful keys.' },
    { id: 'tambourine', english: 'tambourine', chinese: '铃鼓', phonetic: '/ˌtæm.bəˈriːn/', themeId: 'toys', imageUrl: '/images/toys/tambourine.png', example: 'A tambourine jingles when shaken.' },
    { id: 'maracas', english: 'maracas', chinese: '沙锤', phonetic: '/məˈrɑː.kəz/', themeId: 'toys', imageUrl: '/images/toys/maracas.png', example: 'Maracas shake and rattle.' },
    { id: 'coloring book', english: 'coloring book', chinese: '涂色书', phonetic: '/ˈkʌl.ər.ɪŋ bʊk/', themeId: 'toys', imageUrl: '/images/toys/coloring-book.png', example: 'A coloring book has pictures to color.' },
    { id: 'crayons', english: 'crayons', chinese: '蜡笔', phonetic: '/ˈkreɪ.ɑːnz/', themeId: 'toys', imageUrl: '/images/toys/crayons.png', example: 'Crayons come in many colors.' },
    { id: 'markers', english: 'markers', chinese: '马克笔', phonetic: '/ˈmɑːr.kərz/', themeId: 'toys', imageUrl: '/images/toys/markers.png', example: 'Markers draw bright lines.' },
    { id: 'paint', english: 'paint', chinese: '颜料', phonetic: '/peɪnt/', themeId: 'toys', imageUrl: '/images/toys/paint.png', example: 'Paint makes colorful pictures.' },
    { id: 'paintbrush', english: 'paintbrush', chinese: '画笔', phonetic: '/ˈpeɪnt.brʌʃ/', themeId: 'toys', imageUrl: '/images/toys/paintbrush.png', example: 'A paintbrush spreads paint.' },
    { id: 'easel', english: 'easel', chinese: '画架', phonetic: '/ˈiː.zəl/', themeId: 'toys', imageUrl: '/images/toys/easel.png', example: 'An easel holds paper for painting.' },
    // 学校 (school)
    { id: 'school', english: 'school', chinese: '学校', phonetic: '/skuːl/', themeId: 'school', imageUrl: '/images/school/school.png', example: 'I go to school every day.' },
    { id: 'teacher', english: 'teacher', chinese: '老师', phonetic: '/ˈtiː.tʃər/', themeId: 'school', imageUrl: '/images/school/teacher.png', example: 'My teacher is very kind.' },
    { id: 'student', english: 'student', chinese: '学生', phonetic: '/ˈstuː.dənt/', themeId: 'school', imageUrl: '/images/school/student.png', example: 'I am a good student.' },
    { id: 'classroom', english: 'classroom', chinese: '教室', phonetic: '/ˈklæs.ruːm/', themeId: 'school', imageUrl: '/images/school/classroom.png', example: 'Our classroom is bright.' },
    { id: 'desk', english: 'desk', chinese: '课桌', phonetic: '/desk/', themeId: 'school', imageUrl: '/images/school/desk.png', example: 'I sit at my desk.' },
    { id: 'chair', english: 'chair', chinese: '椅子', phonetic: '/tʃer/', themeId: 'school', imageUrl: '/images/school/chair.png', example: 'The chair is comfortable.' },
    { id: 'blackboard', english: 'blackboard', chinese: '黑板', phonetic: '/ˈblæk.bɔːrd/', themeId: 'school', imageUrl: '/images/school/blackboard.png', example: 'The teacher writes on the blackboard.' },
    { id: 'chalk', english: 'chalk', chinese: '粉笔', phonetic: '/tʃɔːk/', themeId: 'school', imageUrl: '/images/school/chalk.png', example: 'White chalk writes on blackboard.' },
    { id: 'eraser', english: 'eraser', chinese: '橡皮擦', phonetic: '/ɪˈreɪ.sər/', themeId: 'school', imageUrl: '/images/school/eraser.png', example: 'I use an eraser to fix mistakes.' },
    { id: 'pencil', english: 'pencil', chinese: '铅笔', phonetic: '/ˈpen.səl/', themeId: 'school', imageUrl: '/images/school/pencil.png', example: 'I write with a pencil.' },
    { id: 'pen', english: 'pen', chinese: '钢笔', phonetic: '/pen/', themeId: 'school', imageUrl: '/images/school/pen.png', example: 'A pen has blue ink.' },
    { id: 'paper', english: 'paper', chinese: '纸', phonetic: '/ˈpeɪ.pər/', themeId: 'school', imageUrl: '/images/school/paper.png', example: 'I write on white paper.' },
    { id: 'notebook', english: 'notebook', chinese: '笔记本', phonetic: '/ˈnoʊt.bʊk/', themeId: 'school', imageUrl: '/images/school/notebook.png', example: 'I write notes in my notebook.' },
    { id: 'book', english: 'book', chinese: '书', phonetic: '/bʊk/', themeId: 'school', imageUrl: '/images/school/book.png', example: 'I read a book every day.' },
    { id: 'backpack', english: 'backpack', chinese: '背包', phonetic: '/ˈbæk.pæk/', themeId: 'school', imageUrl: '/images/school/backpack.png', example: 'I carry my books in a backpack.' },
    { id: 'lunchbox', english: 'lunchbox', chinese: '饭盒', phonetic: '/ˈlʌntʃ.bɑːks/', themeId: 'school', imageUrl: '/images/school/lunchbox.png', example: 'My lunchbox has sandwiches.' },
    { id: 'ruler', english: 'ruler', chinese: '尺子', phonetic: '/ˈruː.lər/', themeId: 'school', imageUrl: '/images/school/ruler.png', example: 'A ruler measures length.' },
    { id: 'calculator', english: 'calculator', chinese: '计算器', phonetic: '/ˈkæl.kjə.leɪ.tər/', themeId: 'school', imageUrl: '/images/school/calculator.png', example: 'A calculator does math.' },
    { id: 'computer', english: 'computer', chinese: '电脑', phonetic: '/kəmˈpjuː.tər/', themeId: 'school', imageUrl: '/images/school/computer.png', example: 'I use a computer for homework.' },
    { id: 'library', english: 'library', chinese: '图书馆', phonetic: '/ˈlaɪ.brer.i/', themeId: 'school', imageUrl: '/images/school/library.png', example: 'The library has many books.' },
    { id: 'gym', english: 'gym', chinese: '体育馆', phonetic: '/dʒɪm/', themeId: 'school', imageUrl: '/images/school/gym.png', example: 'We play sports in the gym.' },
    { id: 'playground', english: 'playground', chinese: '操场', phonetic: '/ˈpleɪ.ɡraʊnd/', themeId: 'school', imageUrl: '/images/school/playground.png', example: 'I play on the playground at recess.' },
    { id: 'cafeteria', english: 'cafeteria', chinese: '食堂', phonetic: '/ˌkæf.əˈtɪr.i.ə/', themeId: 'school', imageUrl: '/images/school/cafeteria.png', example: 'I eat lunch in the cafeteria.' },
    { id: 'office', english: 'office', chinese: '办公室', phonetic: '/ˈɑː.fɪs/', themeId: 'school', imageUrl: '/images/school/office.png', example: 'The principal works in the office.' },
    { id: 'principal', english: 'principal', chinese: '校长', phonetic: '/ˈprɪn.sə.pəl/', themeId: 'school', imageUrl: '/images/school/principal.png', example: 'The principal runs the school.' },
    { id: 'homework', english: 'homework', chinese: '家庭作业', phonetic: '/ˈhoʊm.wɜːrk/', themeId: 'school', imageUrl: '/images/school/homework.png', example: 'I do my homework after school.' },
    { id: 'test', english: 'test', chinese: '考试', phonetic: '/test/', themeId: 'school', imageUrl: '/images/school/test.png', example: 'I study hard for the test.' },
    { id: 'grade', english: 'grade', chinese: '成绩', phonetic: '/ɡreɪd/', themeId: 'school', imageUrl: '/images/school/grade.png', example: 'I got a good grade on my test.' },
    { id: 'recess', english: 'recess', chinese: '课间休息', phonetic: '/ˈriː.ses/', themeId: 'school', imageUrl: '/images/school/recess.png', example: 'I play during recess.' },
    { id: 'bell', english: 'bell', chinese: '铃声', phonetic: '/bel/', themeId: 'school', imageUrl: '/images/school/bell.png', example: 'The bell rings for class.' },
    { id: 'locker', english: 'locker', chinese: '储物柜', phonetic: '/ˈlɑː.kər/', themeId: 'school', imageUrl: '/images/school/locker.png', example: 'I keep my books in my locker.' },
    { id: 'bus', english: 'bus', chinese: '校车', phonetic: '/bʌs/', themeId: 'school', imageUrl: '/images/school/bus.png', example: 'I ride the school bus.' },
    { id: 'science', english: 'science', chinese: '科学', phonetic: '/ˈsaɪ.əns/', themeId: 'school', imageUrl: '/images/school/science.png', example: 'Science class is fun.' },
    { id: 'math', english: 'math', chinese: '数学', phonetic: '/mæθ/', themeId: 'school', imageUrl: '/images/school/math.png', example: 'Math helps me count.' },
    { id: 'english', english: 'english', chinese: '英语', phonetic: '/ˈɪŋ.ɡlɪʃ/', themeId: 'school', imageUrl: '/images/school/english.png', example: 'I learn English at school.' },
    { id: 'art', english: 'art', chinese: '美术', phonetic: '/ɑːrt/', themeId: 'school', imageUrl: '/images/school/art.png', example: 'I paint pictures in art class.' },
    { id: 'music', english: 'music', chinese: '音乐', phonetic: '/ˈmjuː.zɪk/', themeId: 'school', imageUrl: '/images/school/music.png', example: 'I sing songs in music class.' },
    { id: 'history', english: 'history', chinese: '历史', phonetic: '/ˈhɪs.tər.i/', themeId: 'school', imageUrl: '/images/school/history.png', example: 'History tells us about the past.' },
    { id: 'geography', english: 'geography', chinese: '地理', phonetic: '/dʒiˈɑː.ɡrə.fi/', themeId: 'school', imageUrl: '/images/school/geography.png', example: 'Geography teaches us about countries.' },
    { id: 'physical education', english: 'physical education', chinese: '体育', phonetic: '/ˈfɪz.ɪ.kəl ˌed.jʊˈkeɪ.ʃən/', themeId: 'school', imageUrl: '/images/school/physical-education.png', example: 'Physical education keeps us healthy.' },
    // 交通工具 (transportation)
    { id: 'car', english: 'car', chinese: '汽车', phonetic: '/kɑːr/', themeId: 'transportation', imageUrl: '/images/transportation/car.png', example: 'I ride in a car to school.' },
    { id: 'bus', english: 'bus', chinese: '公交车', phonetic: '/bʌs/', themeId: 'transportation', imageUrl: '/images/transportation/bus.png', example: 'The bus takes me to school.' },
    { id: 'train', english: 'train', chinese: '火车', phonetic: '/treɪn/', themeId: 'transportation', imageUrl: '/images/transportation/train.png', example: 'The train goes very fast.' },
    { id: 'airplane', english: 'airplane', chinese: '飞机', phonetic: '/ˈer.pleɪn/', themeId: 'transportation', imageUrl: '/images/transportation/airplane.png', example: 'The airplane flies in the sky.' },
    { id: 'boat', english: 'boat', chinese: '船', phonetic: '/boʊt/', themeId: 'transportation', imageUrl: '/images/transportation/boat.png', example: 'The boat floats on water.' },
    { id: 'ship', english: 'ship', chinese: '轮船', phonetic: '/ʃɪp/', themeId: 'transportation', imageUrl: '/images/transportation/ship.png', example: 'A big ship crosses the ocean.' },
    { id: 'bicycle', english: 'bicycle', chinese: '自行车', phonetic: '/ˈbaɪ.sɪ.kəl/', themeId: 'transportation', imageUrl: '/images/transportation/bicycle.png', example: 'I ride my bicycle to the park.' },
    { id: 'motorcycle', english: 'motorcycle', chinese: '摩托车', phonetic: '/ˈmoʊ.tər.saɪ.kəl/', themeId: 'transportation', imageUrl: '/images/transportation/motorcycle.png', example: 'A motorcycle has two wheels.' },
    { id: 'scooter', english: 'scooter', chinese: '滑板车', phonetic: '/ˈskuː.tər/', themeId: 'transportation', imageUrl: '/images/transportation/scooter.png', example: 'A scooter is fun to ride.' },
    { id: 'skateboard', english: 'skateboard', chinese: '滑板', phonetic: '/ˈskeɪt.bɔːrd/', themeId: 'transportation', imageUrl: '/images/transportation/skateboard.png', example: 'I skate on my skateboard.' },
    { id: 'taxi', english: 'taxi', chinese: '出租车', phonetic: '/ˈtæk.si/', themeId: 'transportation', imageUrl: '/images/transportation/taxi.png', example: 'I take a taxi to the airport.' },
    { id: 'truck', english: 'truck', chinese: '卡车', phonetic: '/trʌk/', themeId: 'transportation', imageUrl: '/images/transportation/truck.png', example: 'The truck carries heavy things.' },
    { id: 'van', english: 'van', chinese: '面包车', phonetic: '/væn/', themeId: 'transportation', imageUrl: '/images/transportation/van.png', example: 'A van carries many people.' },
    { id: 'ambulance', english: 'ambulance', chinese: '救护车', phonetic: '/ˈæm.bjə.ləns/', themeId: 'transportation', imageUrl: '/images/transportation/ambulance.png', example: 'An ambulance helps sick people.' },
    { id: 'fire truck', english: 'fire truck', chinese: '消防车', phonetic: '/ˈfaɪər trʌk/', themeId: 'transportation', imageUrl: '/images/transportation/fire-truck.png', example: 'A fire truck puts out fires.' },
    { id: 'police car', english: 'police car', chinese: '警车', phonetic: '/pəˈliːs kɑːr/', themeId: 'transportation', imageUrl: '/images/transportation/police-car.png', example: 'A police car catches bad people.' },
    { id: 'helicopter', english: 'helicopter', chinese: '直升机', phonetic: '/ˈhel.ɪ.kɑːp.tər/', themeId: 'transportation', imageUrl: '/images/transportation/helicopter.png', example: 'A helicopter flies with spinning blades.' },
    { id: 'subway', english: 'subway', chinese: '地铁', phonetic: '/ˈsʌb.weɪ/', themeId: 'transportation', imageUrl: '/images/transportation/subway.png', example: 'The subway runs underground.' },
    { id: 'tram', english: 'tram', chinese: '有轨电车', phonetic: '/træm/', themeId: 'transportation', imageUrl: '/images/transportation/tram.png', example: 'A tram runs on tracks in the city.' },
    { id: 'ferry', english: 'ferry', chinese: '渡轮', phonetic: '/ˈfer.i/', themeId: 'transportation', imageUrl: '/images/transportation/ferry.png', example: 'A ferry carries people across water.' },
    { id: 'yacht', english: 'yacht', chinese: '游艇', phonetic: '/jɑːt/', themeId: 'transportation', imageUrl: '/images/transportation/yacht.png', example: 'A yacht is a fancy boat.' },
    { id: 'sailboat', english: 'sailboat', chinese: '帆船', phonetic: '/ˈseɪl.boʊt/', themeId: 'transportation', imageUrl: '/images/transportation/sailboat.png', example: 'A sailboat uses wind to move.' },
    { id: 'canoe', english: 'canoe', chinese: '独木舟', phonetic: '/kəˈnuː/', themeId: 'transportation', imageUrl: '/images/transportation/canoe.png', example: 'A canoe is a small boat.' },
    { id: 'kayak', english: 'kayak', chinese: '皮划艇', phonetic: '/ˈkaɪ.æk/', themeId: 'transportation', imageUrl: '/images/transportation/kayak.png', example: 'A kayak is for one person.' },
    { id: 'jet ski', english: 'jet ski', chinese: '水上摩托', phonetic: '/dʒet skiː/', themeId: 'transportation', imageUrl: '/images/transportation/jet-ski.png', example: 'A jet ski is fast on water.' },
    { id: 'hot air balloon', english: 'hot air balloon', chinese: '热气球', phonetic: '/hɑːt er bəˈluːn/', themeId: 'transportation', imageUrl: '/images/transportation/hot-air-balloon.png', example: 'A hot air balloon floats in the sky.' },
    { id: 'rocket', english: 'rocket', chinese: '火箭', phonetic: '/ˈrɑː.kɪt/', themeId: 'transportation', imageUrl: '/images/transportation/rocket.png', example: 'A rocket goes to space.' },
    { id: 'space shuttle', english: 'space shuttle', chinese: '航天飞机', phonetic: '/speɪs ˈʃʌt.əl/', themeId: 'transportation', imageUrl: '/images/transportation/space-shuttle.png', example: 'A space shuttle goes to space.' },
    { id: 'sled', english: 'sled', chinese: '雪橇', phonetic: '/sled/', themeId: 'transportation', imageUrl: '/images/transportation/sled.png', example: 'A sled slides on snow.' },
    { id: 'snowmobile', english: 'snowmobile', chinese: '雪地摩托', phonetic: '/ˈsnoʊ.mə.biːl/', themeId: 'transportation', imageUrl: '/images/transportation/snowmobile.png', example: 'A snowmobile drives on snow.' },
    { id: 'horse', english: 'horse', chinese: '马', phonetic: '/hɔːrs/', themeId: 'transportation', imageUrl: '/images/transportation/horse.png', example: 'People used to ride horses.' },
    { id: 'camel', english: 'camel', chinese: '骆驼', phonetic: '/ˈkæm.əl/', themeId: 'transportation', imageUrl: '/images/transportation/camel.png', example: 'A camel carries people in the desert.' },
    { id: 'elephant', english: 'elephant', chinese: '大象', phonetic: '/ˈel.ə.fənt/', themeId: 'transportation', imageUrl: '/images/transportation/elephant.png', example: 'An elephant can carry people.' },
    { id: 'donkey', english: 'donkey', chinese: '驴', phonetic: '/ˈdɑːŋ.ki/', themeId: 'transportation', imageUrl: '/images/transportation/donkey.png', example: 'A donkey carries things.' },
    { id: 'wheelchair', english: 'wheelchair', chinese: '轮椅', phonetic: '/ˈwiːl.tʃer/', themeId: 'transportation', imageUrl: '/images/transportation/wheelchair.png', example: 'A wheelchair helps people move.' },
    { id: 'stroller', english: 'stroller', chinese: '婴儿车', phonetic: '/ˈstroʊ.lər/', themeId: 'transportation', imageUrl: '/images/transportation/stroller.png', example: 'A stroller carries babies.' },
    { id: 'wagon', english: 'wagon', chinese: '手推车', phonetic: '/ˈwæɡ.ən/', themeId: 'transportation', imageUrl: '/images/transportation/wagon.png', example: 'A wagon carries toys.' },
    { id: 'wheelbarrow', english: 'wheelbarrow', chinese: '独轮车', phonetic: '/ˈwiːl.bær.oʊ/', themeId: 'transportation', imageUrl: '/images/transportation/wheelbarrow.png', example: 'A wheelbarrow carries dirt.' },
    { id: 'tractor', english: 'tractor', chinese: '拖拉机', phonetic: '/ˈtræk.tər/', themeId: 'transportation', imageUrl: '/images/transportation/tractor.png', example: 'A tractor works on farms.' },
    { id: 'bulldozer', english: 'bulldozer', chinese: '推土机', phonetic: '/ˈbʊl.doʊ.zər/', themeId: 'transportation', imageUrl: '/images/transportation/bulldozer.png', example: 'A bulldozer moves dirt.' },
    { id: 'crane', english: 'crane', chinese: '起重机', phonetic: '/kreɪn/', themeId: 'transportation', imageUrl: '/images/transportation/crane.png', example: 'A crane lifts heavy things.' },
    { id: 'excavator', english: 'excavator', chinese: '挖掘机', phonetic: '/ˈek.skə.veɪ.tər/', themeId: 'transportation', imageUrl: '/images/transportation/excavator.png', example: 'An excavator digs holes.' },
    { id: 'forklift', english: 'forklift', chinese: '叉车', phonetic: '/ˈfɔːrk.lɪft/', themeId: 'transportation', imageUrl: '/images/transportation/forklift.png', example: 'A forklift lifts boxes.' },
    { id: 'golf cart', english: 'golf cart', chinese: '高尔夫球车', phonetic: '/ɡɑːlf kɑːrt/', themeId: 'transportation', imageUrl: '/images/transportation/golf-cart.png', example: 'A golf cart carries golfers.' },
    { id: 'go-kart', english: 'go-kart', chinese: '卡丁车', phonetic: '/ˈɡoʊ.kɑːrt/', themeId: 'transportation', imageUrl: '/images/transportation/go-kart.png', example: 'A go-kart is a small racing car.' },
    { id: 'roller skates', english: 'roller skates', chinese: '轮滑鞋', phonetic: '/ˈroʊ.lər skeɪts/', themeId: 'transportation', imageUrl: '/images/transportation/roller-skates.png', example: 'Roller skates have wheels.' },
    { id: 'ice skates', english: 'ice skates', chinese: '冰鞋', phonetic: '/aɪs skeɪts/', themeId: 'transportation', imageUrl: '/images/transportation/ice-skates.png', example: 'Ice skates slide on ice.' },
    { id: 'skis', english: 'skis', chinese: '滑雪板', phonetic: '/skiːz/', themeId: 'transportation', imageUrl: '/images/transportation/skis.png', example: 'Skis slide on snow.' },
    { id: 'snowboard', english: 'snowboard', chinese: '滑雪板', phonetic: '/ˈsnoʊ.bɔːrd/', themeId: 'transportation', imageUrl: '/images/transportation/snowboard.png', example: 'A snowboard slides on snow.' },
    // 天气 (weather)
    { id: 'sunny', english: 'sunny', chinese: '晴天', phonetic: '/ˈsʌn.i/', themeId: 'weather', imageUrl: '/images/weather/sunny.png', example: 'It is sunny today.' },
    { id: 'cloudy', english: 'cloudy', chinese: '多云', phonetic: '/ˈklaʊ.di/', themeId: 'weather', imageUrl: '/images/weather/cloudy.png', example: 'The sky is cloudy.' },
    { id: 'rainy', english: 'rainy', chinese: '雨天', phonetic: '/ˈreɪ.ni/', themeId: 'weather', imageUrl: '/images/weather/rainy.png', example: 'It is rainy outside.' },
    { id: 'snowy', english: 'snowy', chinese: '雪天', phonetic: '/ˈsnoʊ.i/', themeId: 'weather', imageUrl: '/images/weather/snowy.png', example: 'It is snowy in winter.' },
    { id: 'windy', english: 'windy', chinese: '刮风', phonetic: '/ˈwɪn.di/', themeId: 'weather', imageUrl: '/images/weather/windy.png', example: 'It is windy today.' },
    { id: 'foggy', english: 'foggy', chinese: '雾天', phonetic: '/ˈfɑː.ɡi/', themeId: 'weather', imageUrl: '/images/weather/foggy.png', example: 'It is foggy in the morning.' },
    { id: 'stormy', english: 'stormy', chinese: '暴风雨', phonetic: '/ˈstɔːr.mi/', themeId: 'weather', imageUrl: '/images/weather/stormy.png', example: 'It is stormy tonight.' },
    { id: 'hot', english: 'hot', chinese: '炎热', phonetic: '/hɑːt/', themeId: 'weather', imageUrl: '/images/weather/hot.png', example: 'It is hot in summer.' },
    { id: 'cold', english: 'cold', chinese: '寒冷', phonetic: '/koʊld/', themeId: 'weather', imageUrl: '/images/weather/cold.png', example: 'It is cold in winter.' },
    { id: 'warm', english: 'warm', chinese: '温暖', phonetic: '/wɔːrm/', themeId: 'weather', imageUrl: '/images/weather/warm.png', example: 'It is warm in spring.' },
    { id: 'cool', english: 'cool', chinese: '凉爽', phonetic: '/kuːl/', themeId: 'weather', imageUrl: '/images/weather/cool.png', example: 'It is cool in autumn.' },
    { id: 'sun', english: 'sun', chinese: '太阳', phonetic: '/sʌn/', themeId: 'weather', imageUrl: '/images/weather/sun.png', example: 'The sun shines bright.' },
    { id: 'moon', english: 'moon', chinese: '月亮', phonetic: '/muːn/', themeId: 'weather', imageUrl: '/images/weather/moon.png', example: 'The moon glows at night.' },
    { id: 'star', english: 'star', chinese: '星星', phonetic: '/stɑːr/', themeId: 'weather', imageUrl: '/images/weather/star.png', example: 'Stars twinkle in the sky.' },
    { id: 'cloud', english: 'cloud', chinese: '云', phonetic: '/klaʊd/', themeId: 'weather', imageUrl: '/images/weather/cloud.png', example: 'White clouds float in the sky.' },
    { id: 'rain', english: 'rain', chinese: '雨', phonetic: '/reɪn/', themeId: 'weather', imageUrl: '/images/weather/rain.png', example: 'Rain falls from the sky.' },
    { id: 'snow', english: 'snow', chinese: '雪', phonetic: '/snoʊ/', themeId: 'weather', imageUrl: '/images/weather/snow.png', example: 'Snow is white and cold.' },
    { id: 'wind', english: 'wind', chinese: '风', phonetic: '/wɪnd/', themeId: 'weather', imageUrl: '/images/weather/wind.png', example: 'Wind blows the leaves.' },
    { id: 'fog', english: 'fog', chinese: '雾', phonetic: '/fɑːɡ/', themeId: 'weather', imageUrl: '/images/weather/fog.png', example: 'Fog makes it hard to see.' },
    { id: 'storm', english: 'storm', chinese: '暴风雨', phonetic: '/stɔːrm/', themeId: 'weather', imageUrl: '/images/weather/storm.png', example: 'A storm has thunder and lightning.' },
    { id: 'lightning', english: 'lightning', chinese: '闪电', phonetic: '/ˈlaɪt.nɪŋ/', themeId: 'weather', imageUrl: '/images/weather/lightning.png', example: 'Lightning flashes in the sky.' },
    { id: 'thunder', english: 'thunder', chinese: '雷声', phonetic: '/ˈθʌn.dər/', themeId: 'weather', imageUrl: '/images/weather/thunder.png', example: 'Thunder makes a loud sound.' },
    { id: 'rainbow', english: 'rainbow', chinese: '彩虹', phonetic: '/ˈreɪn.boʊ/', themeId: 'weather', imageUrl: '/images/weather/rainbow.png', example: 'A rainbow has many colors.' },
    { id: 'umbrella', english: 'umbrella', chinese: '雨伞', phonetic: '/ʌmˈbrel.ə/', themeId: 'weather', imageUrl: '/images/weather/umbrella.png', example: 'I use an umbrella in the rain.' },
    { id: 'raincoat', english: 'raincoat', chinese: '雨衣', phonetic: '/ˈreɪn.koʊt/', themeId: 'weather', imageUrl: '/images/weather/raincoat.png', example: 'I wear a raincoat when it rains.' },
    { id: 'thermometer', english: 'thermometer', chinese: '温度计', phonetic: '/θərˈmɑː.mə.tər/', themeId: 'weather', imageUrl: '/images/weather/thermometer.png', example: 'A thermometer measures temperature.' },
    { id: 'temperature', english: 'temperature', chinese: '温度', phonetic: '/ˈtem.pər.ə.tʃər/', themeId: 'weather', imageUrl: '/images/weather/temperature.png', example: 'The temperature is high today.' },
    { id: 'weather', english: 'weather', chinese: '天气', phonetic: '/ˈweð.ər/', themeId: 'weather', imageUrl: '/images/weather/weather.png', example: 'The weather is nice today.' },
    { id: 'season', english: 'season', chinese: '季节', phonetic: '/ˈsiː.zən/', themeId: 'weather', imageUrl: '/images/weather/season.png', example: 'Spring is my favorite season.' },
    { id: 'spring', english: 'spring', chinese: '春天', phonetic: '/sprɪŋ/', themeId: 'weather', imageUrl: '/images/weather/spring.png', example: 'Spring has flowers and rain.' },
    { id: 'summer', english: 'summer', chinese: '夏天', phonetic: '/ˈsʌm.ər/', themeId: 'weather', imageUrl: '/images/weather/summer.png', example: 'Summer is hot and sunny.' },
    { id: 'autumn', english: 'autumn', chinese: '秋天', phonetic: '/ˈɑː.təm/', themeId: 'weather', imageUrl: '/images/weather/autumn.png', example: 'Autumn has colorful leaves.' },
    { id: 'winter', english: 'winter', chinese: '冬天', phonetic: '/ˈwɪn.tər/', themeId: 'weather', imageUrl: '/images/weather/winter.png', example: 'Winter is cold and snowy.' },
    { id: 'ice', english: 'ice', chinese: '冰', phonetic: '/aɪs/', themeId: 'weather', imageUrl: '/images/weather/ice.png', example: 'Ice is cold and slippery.' },
    { id: 'frost', english: 'frost', chinese: '霜', phonetic: '/frɑːst/', themeId: 'weather', imageUrl: '/images/weather/frost.png', example: 'Frost covers the grass in winter.' },
    { id: 'hail', english: 'hail', chinese: '冰雹', phonetic: '/heɪl/', themeId: 'weather', imageUrl: '/images/weather/hail.png', example: 'Hail falls from storm clouds.' },
    { id: 'sleet', english: 'sleet', chinese: '雨夹雪', phonetic: '/sliːt/', themeId: 'weather', imageUrl: '/images/weather/sleet.png', example: 'Sleet is rain mixed with snow.' },
    { id: 'dew', english: 'dew', chinese: '露水', phonetic: '/duː/', themeId: 'weather', imageUrl: '/images/weather/dew.png', example: 'Dew forms on grass in the morning.' },
    { id: 'mist', english: 'mist', chinese: '薄雾', phonetic: '/mɪst/', themeId: 'weather', imageUrl: '/images/weather/mist.png', example: 'Mist makes everything look soft.' },
    { id: 'haze', english: 'haze', chinese: '霾', phonetic: '/heɪz/', themeId: 'weather', imageUrl: '/images/weather/haze.png', example: 'Haze makes the air look gray.' },
    { id: 'humidity', english: 'humidity', chinese: '湿度', phonetic: '/hjuːˈmɪd.ə.ti/', themeId: 'weather', imageUrl: '/images/weather/humidity.png', example: 'High humidity makes the air feel sticky.' },
    { id: 'pressure', english: 'pressure', chinese: '气压', phonetic: '/ˈpreʃ.ər/', themeId: 'weather', imageUrl: '/images/weather/pressure.png', example: 'Air pressure affects the weather.' },
    { id: 'forecast', english: 'forecast', chinese: '天气预报', phonetic: '/ˈfɔːr.kæst/', themeId: 'weather', imageUrl: '/images/weather/forecast.png', example: 'The weather forecast says it will rain.' },
    { id: 'meteorologist', english: 'meteorologist', chinese: '气象学家', phonetic: '/ˌmiː.ti.əˈrɑː.lə.dʒɪst/', themeId: 'weather', imageUrl: '/images/weather/meteorologist.png', example: 'A meteorologist studies the weather.' },
    { id: 'climate', english: 'climate', chinese: '气候', phonetic: '/ˈklaɪ.mət/', themeId: 'weather', imageUrl: '/images/weather/climate.png', example: 'The climate in this area is warm.' },
    { id: 'global warming', english: 'global warming', chinese: '全球变暖', phonetic: '/ˈɡloʊ.bəl ˈwɔːr.mɪŋ/', themeId: 'weather', imageUrl: '/images/weather/global-warming.png', example: 'Global warming affects the climate.' },
    { id: 'greenhouse effect', english: 'greenhouse effect', chinese: '温室效应', phonetic: '/ˈɡriːn.haʊs ɪˈfekt/', themeId: 'weather', imageUrl: '/images/weather/greenhouse-effect.png', example: 'The greenhouse effect warms the Earth.' },
    { id: 'ozone layer', english: 'ozone layer', chinese: '臭氧层', phonetic: '/ˈoʊ.zoʊn ˈleɪ.ər/', themeId: 'weather', imageUrl: '/images/weather/ozone-layer.png', example: 'The ozone layer protects us from the sun.' },
    { id: 'pollution', english: 'pollution', chinese: '污染', phonetic: '/pəˈluː.ʃən/', themeId: 'weather', imageUrl: '/images/weather/pollution.png', example: 'Air pollution affects the weather.' },
    { id: 'environment', english: 'environment', chinese: '环境', phonetic: '/ɪnˈvaɪ.rən.mənt/', themeId: 'weather', imageUrl: '/images/weather/environment.png', example: 'We should protect the environment.' },
    { id: 'nature', english: 'nature', chinese: '自然', phonetic: '/ˈneɪ.tʃər/', themeId: 'weather', imageUrl: '/images/weather/nature.png', example: 'Nature provides us with weather.' },
    { id: 'earth', english: 'earth', chinese: '地球', phonetic: '/ɜːrθ/', themeId: 'weather', imageUrl: '/images/weather/earth.png', example: 'The Earth has different weather patterns.' },
    { id: 'atmosphere', english: 'atmosphere', chinese: '大气层', phonetic: '/ˈæt.mə.sfɪr/', themeId: 'weather', imageUrl: '/images/weather/atmosphere.png', example: 'The atmosphere surrounds the Earth.' },
    { id: 'sky', english: 'sky', chinese: '天空', phonetic: '/skaɪ/', themeId: 'weather', imageUrl: '/images/weather/sky.png', example: 'The sky is blue and clear.' },
    { id: 'horizon', english: 'horizon', chinese: '地平线', phonetic: '/həˈraɪ.zən/', themeId: 'weather', imageUrl: '/images/weather/horizon.png', example: 'The sun sets on the horizon.' },
    { id: 'sunrise', english: 'sunrise', chinese: '日出', phonetic: '/ˈsʌn.raɪz/', themeId: 'weather', imageUrl: '/images/weather/sunrise.png', example: 'The sunrise is beautiful in the morning.' },
    { id: 'sunset', english: 'sunset', chinese: '日落', phonetic: '/ˈsʌn.set/', themeId: 'weather', imageUrl: '/images/weather/sunset.png', example: 'The sunset is colorful in the evening.' },
    { id: 'dawn', english: 'dawn', chinese: '黎明', phonetic: '/dɔːn/', themeId: 'weather', imageUrl: '/images/weather/dawn.png', example: 'Dawn is the beginning of the day.' },
    { id: 'dusk', english: 'dusk', chinese: '黄昏', phonetic: '/dʌsk/', themeId: 'weather', imageUrl: '/images/weather/dusk.png', example: 'Dusk is the end of the day.' },
    { id: 'day', english: 'day', chinese: '白天', phonetic: '/deɪ/', themeId: 'weather', imageUrl: '/images/weather/day.png', example: 'The day is bright and sunny.' },
    { id: 'night', english: 'night', chinese: '夜晚', phonetic: '/naɪt/', themeId: 'weather', imageUrl: '/images/weather/night.png', example: 'The night is dark and quiet.' },
    { id: 'morning', english: 'morning', chinese: '早晨', phonetic: '/ˈmɔːr.nɪŋ/', themeId: 'weather', imageUrl: '/images/weather/morning.png', example: 'The morning is fresh and cool.' },
    { id: 'afternoon', english: 'afternoon', chinese: '下午', phonetic: '/ˌæf.tərˈnuːn/', themeId: 'weather', imageUrl: '/images/weather/afternoon.png', example: 'The afternoon is warm and bright.' },
    { id: 'evening', english: 'evening', chinese: '傍晚', phonetic: '/ˈiːv.nɪŋ/', themeId: 'weather', imageUrl: '/images/weather/evening.png', example: 'The evening is peaceful and calm.' },
    { id: 'midnight', english: 'midnight', chinese: '午夜', phonetic: '/ˈmɪd.naɪt/', themeId: 'weather', imageUrl: '/images/weather/midnight.png', example: 'Midnight is the middle of the night.' },
    { id: 'noon', english: 'noon', chinese: '中午', phonetic: '/nuːn/', themeId: 'weather', imageUrl: '/images/weather/noon.png', example: 'Noon is the middle of the day.' },
    // 服装 (clothing)
    { id: 'shirt', english: 'shirt', chinese: '衬衫', phonetic: '/ʃɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/shirt.png', example: 'I wear a shirt to school.' },
    { id: 't-shirt', english: 't-shirt', chinese: 'T恤', phonetic: '/ˈtiː.ʃɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/t-shirt.png', example: 'I wear a t-shirt when it is hot.' },
    { id: 'dress', english: 'dress', chinese: '连衣裙', phonetic: '/dres/', themeId: 'clothing', imageUrl: '/images/clothing/dress.png', example: 'I wear a dress in summer.' },
    { id: 'skirt', english: 'skirt', chinese: '裙子', phonetic: '/skɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/skirt.png', example: 'I wear a skirt in summer.' },
    { id: 'pants', english: 'pants', chinese: '裤子', phonetic: '/pænts/', themeId: 'clothing', imageUrl: '/images/clothing/pants.png', example: 'I wear pants when it is cool.' },
    { id: 'shorts', english: 'shorts', chinese: '短裤', phonetic: '/ʃɔːrts/', themeId: 'clothing', imageUrl: '/images/clothing/shorts.png', example: 'I wear shorts in summer.' },
    { id: 'jeans', english: 'jeans', chinese: '牛仔裤', phonetic: '/dʒiːnz/', themeId: 'clothing', imageUrl: '/images/clothing/jeans.png', example: 'Jeans are blue pants.' },
    { id: 'jacket', english: 'jacket', chinese: '夹克', phonetic: '/ˈdʒæk.ɪt/', themeId: 'clothing', imageUrl: '/images/clothing/jacket.png', example: 'I wear a jacket when it is cool.' },
    { id: 'coat', english: 'coat', chinese: '外套', phonetic: '/koʊt/', themeId: 'clothing', imageUrl: '/images/clothing/coat.png', example: 'I wear a coat in winter.' },
    { id: 'sweater', english: 'sweater', chinese: '毛衣', phonetic: '/ˈswet.ər/', themeId: 'clothing', imageUrl: '/images/clothing/sweater.png', example: 'I wear a sweater when it is cold.' },
    { id: 'hoodie', english: 'hoodie', chinese: '连帽衫', phonetic: '/ˈhʊd.i/', themeId: 'clothing', imageUrl: '/images/clothing/hoodie.png', example: 'A hoodie has a hood.' },
    { id: 'blouse', english: 'blouse', chinese: '女式衬衫', phonetic: '/blaʊs/', themeId: 'clothing', imageUrl: '/images/clothing/blouse.png', example: 'A blouse is a fancy shirt.' },
    { id: 'tank top', english: 'tank top', chinese: '背心', phonetic: '/tæŋk tɑːp/', themeId: 'clothing', imageUrl: '/images/clothing/tank-top.png', example: 'A tank top has no sleeves.' },
    { id: 'polo shirt', english: 'polo shirt', chinese: ' polo衫', phonetic: '/ˈpoʊ.loʊ ʃɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/polo-shirt.png', example: 'A polo shirt has a collar.' },
    { id: 'cardigan', english: 'cardigan', chinese: '开襟毛衣', phonetic: '/ˈkɑːr.dɪ.ɡən/', themeId: 'clothing', imageUrl: '/images/clothing/cardigan.png', example: 'A cardigan opens in the front.' },
    { id: 'vest', english: 'vest', chinese: '马甲', phonetic: '/vest/', themeId: 'clothing', imageUrl: '/images/clothing/vest.png', example: 'A vest has no sleeves.' },
    { id: 'suit', english: 'suit', chinese: '西装', phonetic: '/suːt/', themeId: 'clothing', imageUrl: '/images/clothing/suit.png', example: 'A suit is formal clothing.' },
    { id: 'tie', english: 'tie', chinese: '领带', phonetic: '/taɪ/', themeId: 'clothing', imageUrl: '/images/clothing/tie.png', example: 'A tie goes around the neck.' },
    { id: 'bow tie', english: 'bow tie', chinese: '蝴蝶结', phonetic: '/boʊ taɪ/', themeId: 'clothing', imageUrl: '/images/clothing/bow-tie.png', example: 'A bow tie looks like a bow.' },
    { id: 'uniform', english: 'uniform', chinese: '制服', phonetic: '/ˈjuː.nə.fɔːrm/', themeId: 'clothing', imageUrl: '/images/clothing/uniform.png', example: 'Students wear uniforms to school.' },
    { id: 'overalls', english: 'overalls', chinese: '工装裤', phonetic: '/ˈoʊ.vər.ɔːlz/', themeId: 'clothing', imageUrl: '/images/clothing/overalls.png', example: 'Overalls cover the whole body.' },
    { id: 'leggings', english: 'leggings', chinese: '紧身裤', phonetic: '/ˈleɡ.ɪŋz/', themeId: 'clothing', imageUrl: '/images/clothing/leggings.png', example: 'Leggings are tight pants.' },
    { id: 'sweatpants', english: 'sweatpants', chinese: '运动裤', phonetic: '/ˈswet.pænts/', themeId: 'clothing', imageUrl: '/images/clothing/sweatpants.png', example: 'Sweatpants are comfortable pants.' },
    { id: 'cargo pants', english: 'cargo pants', chinese: '工装裤', phonetic: '/ˈkɑːr.ɡoʊ pænts/', themeId: 'clothing', imageUrl: '/images/clothing/cargo-pants.png', example: 'Cargo pants have many pockets.' },
    { id: 'capri pants', english: 'capri pants', chinese: '七分裤', phonetic: '/kəˈpriː pænts/', themeId: 'clothing', imageUrl: '/images/clothing/capri-pants.png', example: 'Capri pants are short pants.' },
    { id: 'cargo shorts', english: 'cargo shorts', chinese: '工装短裤', phonetic: '/ˈkɑːr.ɡoʊ ʃɔːrts/', themeId: 'clothing', imageUrl: '/images/clothing/cargo-shorts.png', example: 'Cargo shorts have many pockets.' },
    { id: 'swim trunks', english: 'swim trunks', chinese: '游泳裤', phonetic: '/swɪm trʌŋks/', themeId: 'clothing', imageUrl: '/images/clothing/swim-trunks.png', example: 'Swim trunks are for swimming.' },
    { id: 'bikini', english: 'bikini', chinese: '比基尼', phonetic: '/bɪˈkiː.ni/', themeId: 'clothing', imageUrl: '/images/clothing/bikini.png', example: 'A bikini is a swimsuit.' },
    { id: 'swimsuit', english: 'swimsuit', chinese: '泳衣', phonetic: '/ˈswɪm.suːt/', themeId: 'clothing', imageUrl: '/images/clothing/swimsuit.png', example: 'A swimsuit is for swimming.' },
    { id: 'underwear', english: 'underwear', chinese: '内衣', phonetic: '/ˈʌn.dər.wer/', themeId: 'clothing', imageUrl: '/images/clothing/underwear.png', example: 'Underwear goes under clothes.' },
    { id: 'bra', english: 'bra', chinese: '胸罩', phonetic: '/brɑː/', themeId: 'clothing', imageUrl: '/images/clothing/bra.png', example: 'A bra supports the chest.' },
    { id: 'panties', english: 'panties', chinese: '内裤', phonetic: '/ˈpæn.tiz/', themeId: 'clothing', imageUrl: '/images/clothing/panties.png', example: 'Panties are underwear for girls.' },
    { id: 'briefs', english: 'briefs', chinese: '内裤', phonetic: '/briːfs/', themeId: 'clothing', imageUrl: '/images/clothing/briefs.png', example: 'Briefs are underwear for boys.' },
    { id: 'boxers', english: 'boxers', chinese: '平角内裤', phonetic: '/ˈbɑːk.sərz/', themeId: 'clothing', imageUrl: '/images/clothing/boxers.png', example: 'Boxers are loose underwear.' },
    { id: 'socks', english: 'socks', chinese: '袜子', phonetic: '/sɑːks/', themeId: 'clothing', imageUrl: '/images/clothing/socks.png', example: 'I wear socks with my shoes.' },
    { id: 'stockings', english: 'stockings', chinese: '长筒袜', phonetic: '/ˈstɑː.kɪŋz/', themeId: 'clothing', imageUrl: '/images/clothing/stockings.png', example: 'Stockings are long socks.' },
    { id: 'tights', english: 'tights', chinese: '紧身袜', phonetic: '/taɪts/', themeId: 'clothing', imageUrl: '/images/clothing/tights.png', example: 'Tights are tight stockings.' },
    { id: 'shoes', english: 'shoes', chinese: '鞋子', phonetic: '/ʃuːz/', themeId: 'clothing', imageUrl: '/images/clothing/shoes.png', example: 'I wear shoes every day.' },
    { id: 'sneakers', english: 'sneakers', chinese: '运动鞋', phonetic: '/ˈsniː.kərz/', themeId: 'clothing', imageUrl: '/images/clothing/sneakers.png', example: 'Sneakers are comfortable shoes.' },
    { id: 'boots', english: 'boots', chinese: '靴子', phonetic: '/buːts/', themeId: 'clothing', imageUrl: '/images/clothing/boots.png', example: 'Boots cover the ankle.' },
    { id: 'sandals', english: 'sandals', chinese: '凉鞋', phonetic: '/ˈsæn.dəlz/', themeId: 'clothing', imageUrl: '/images/clothing/sandals.png', example: 'Sandals are open shoes.' },
    { id: 'flip flops', english: 'flip flops', chinese: '人字拖', phonetic: '/ˈflɪp flɑːps/', themeId: 'clothing', imageUrl: '/images/clothing/flip-flops.png', example: 'Flip flops are beach shoes.' },
    { id: 'high heels', english: 'high heels', chinese: '高跟鞋', phonetic: '/haɪ hiːlz/', themeId: 'clothing', imageUrl: '/images/clothing/high-heels.png', example: 'High heels make you taller.' },
    { id: 'flats', english: 'flats', chinese: '平底鞋', phonetic: '/flæts/', themeId: 'clothing', imageUrl: '/images/clothing/flats.png', example: 'Flats have no heel.' },
    { id: 'loafers', english: 'loafers', chinese: '乐福鞋', phonetic: '/ˈloʊ.fərz/', themeId: 'clothing', imageUrl: '/images/clothing/loafers.png', example: 'Loafers are slip-on shoes.' },
    { id: 'hat', english: 'hat', chinese: '帽子', phonetic: '/hæt/', themeId: 'clothing', imageUrl: '/images/clothing/hat.png', example: 'I wear a hat in the sun.' },
    { id: 'cap', english: 'cap', chinese: '棒球帽', phonetic: '/kæp/', themeId: 'clothing', imageUrl: '/images/clothing/cap.png', example: 'A cap has a visor.' },
    { id: 'beanie', english: 'beanie', chinese: '毛线帽', phonetic: '/ˈbiː.ni/', themeId: 'clothing', imageUrl: '/images/clothing/beanie.png', example: 'A beanie is a warm hat.' },
    { id: 'scarf', english: 'scarf', chinese: '围巾', phonetic: '/skɑːrf/', themeId: 'clothing', imageUrl: '/images/clothing/scarf.png', example: 'I wear a scarf when it is cold.' },
    { id: 'gloves', english: 'gloves', chinese: '手套', phonetic: '/ɡlʌvz/', themeId: 'clothing', imageUrl: '/images/clothing/gloves.png', example: 'I wear gloves in winter.' },
    { id: 'mittens', english: 'mittens', chinese: '连指手套', phonetic: '/ˈmɪt.ənz/', themeId: 'clothing', imageUrl: '/images/clothing/mittens.png', example: 'Mittens keep fingers together.' },
    { id: 'belt', english: 'belt', chinese: '腰带', phonetic: '/belt/', themeId: 'clothing', imageUrl: '/images/clothing/belt.png', example: 'A belt holds up pants.' },
    { id: 'suspenders', english: 'suspenders', chinese: '背带', phonetic: '/səˈspen.dərz/', themeId: 'clothing', imageUrl: '/images/clothing/suspenders.png', example: 'Suspenders hold up pants.' },
    { id: 'apron', english: 'apron', chinese: '围裙', phonetic: '/ˈeɪ.prən/', themeId: 'clothing', imageUrl: '/images/clothing/apron.png', example: 'An apron protects clothes.' },
    { id: 'pajamas', english: 'pajamas', chinese: '睡衣', phonetic: '/pəˈdʒæ.məz/', themeId: 'clothing', imageUrl: '/images/clothing/pajamas.png', example: 'I wear pajamas to bed.' },
    { id: 'nightgown', english: 'nightgown', chinese: '睡袍', phonetic: '/ˈnaɪt.ɡaʊn/', themeId: 'clothing', imageUrl: '/images/clothing/nightgown.png', example: 'A nightgown is a long dress.' },
    { id: 'robe', english: 'robe', chinese: '浴袍', phonetic: '/roʊb/', themeId: 'clothing', imageUrl: '/images/clothing/robe.png', example: 'A robe is worn after bathing.' },
    { id: 'bathrobe', english: 'bathrobe', chinese: '浴衣', phonetic: '/ˈbæθ.roʊb/', themeId: 'clothing', imageUrl: '/images/clothing/bathrobe.png', example: 'A bathrobe is worn after bathing.' },
    { id: 'sunglasses', english: 'sunglasses', chinese: '太阳镜', phonetic: '/ˈsʌn.ɡlæs.ɪz/', themeId: 'clothing', imageUrl: '/images/clothing/sunglasses.png', example: 'I wear sunglasses in the sun.' },
    { id: 'glasses', english: 'glasses', chinese: '眼镜', phonetic: '/ˈɡlæs.ɪz/', themeId: 'clothing', imageUrl: '/images/clothing/glasses.png', example: 'Glasses help you see better.' },
    { id: 'watch', english: 'watch', chinese: '手表', phonetic: '/wɑːtʃ/', themeId: 'clothing', imageUrl: '/images/clothing/watch.png', example: 'A watch tells time.' },
    { id: 'bracelet', english: 'bracelet', chinese: '手镯', phonetic: '/ˈbreɪ.slət/', themeId: 'clothing', imageUrl: '/images/clothing/bracelet.png', example: 'A bracelet goes on the wrist.' },
    { id: 'necklace', english: 'necklace', chinese: '项链', phonetic: '/ˈnek.ləs/', themeId: 'clothing', imageUrl: '/images/clothing/necklace.png', example: 'A necklace goes around the neck.' },
    { id: 'earrings', english: 'earrings', chinese: '耳环', phonetic: '/ˈɪr.ɪŋz/', themeId: 'clothing', imageUrl: '/images/clothing/earrings.png', example: 'Earrings go in the ears.' },
    { id: 'ring', english: 'ring', chinese: '戒指', phonetic: '/rɪŋ/', themeId: 'clothing', imageUrl: '/images/clothing/ring.png', example: 'A ring goes on the finger.' },
 // 动作动词 (actions)
 { id: 'run', english: 'run', chinese: '跑', phonetic: '/rʌn/', themeId: 'actions', imageUrl: '/images/actions/run.png', example: 'I run in the park.' },
 { id: 'jump', english: 'jump', chinese: '跳', phonetic: '/dʒʌmp/', themeId: 'actions', imageUrl: '/images/actions/jump.png', example: 'I jump high.' },
 { id: 'eat', english: 'eat', chinese: '吃', phonetic: '/iːt/', themeId: 'actions', imageUrl: '/images/actions/eat.png', example: 'I eat breakfast.' },
 { id: 'play', english: 'play', chinese: '玩', phonetic: '/pleɪ/', themeId: 'actions', imageUrl: '/images/actions/play.png', example: 'I play with friends.' },
 { id: 'sing', english: 'sing', chinese: '唱', phonetic: '/sɪŋ/', themeId: 'actions', imageUrl: '/images/actions/sing.png', example: 'I sing a song.' },
 { id: 'dance', english: 'dance', chinese: '跳舞', phonetic: '/dæns/', themeId: 'actions', imageUrl: '/images/actions/dance.png', example: 'I dance at the party.' },
 { id: 'walk', english: 'walk', chinese: '走', phonetic: '/wɔːk/', themeId: 'actions', imageUrl: '/images/actions/walk.png', example: 'I walk to school.' },
 { id: 'swim', english: 'swim', chinese: '游泳', phonetic: '/swɪm/', themeId: 'actions', imageUrl: '/images/actions/swim.png', example: 'I swim in the pool.' },
 { id: 'sleep', english: 'sleep', chinese: '睡觉', phonetic: '/sliːp/', themeId: 'actions', imageUrl: '/images/actions/sleep.png', example: 'I sleep at night.' },
 { id: 'read', english: 'read', chinese: '读', phonetic: '/riːd/', themeId: 'actions', imageUrl: '/images/actions/read.png', example: 'I read a book.' },
 { id: 'write', english: 'write', chinese: '写', phonetic: '/raɪt/', themeId: 'actions', imageUrl: '/images/actions/write.png', example: 'I write my name.' },
 { id: 'draw', english: 'draw', chinese: '画', phonetic: '/drɔː/', themeId: 'actions', imageUrl: '/images/actions/draw.png', example: 'I draw a picture.' },
 { id: 'cook', english: 'cook', chinese: '做饭', phonetic: '/kʊk/', themeId: 'actions', imageUrl: '/images/actions/cook.png', example: 'I cook dinner.' },
 { id: 'drink', english: 'drink', chinese: '喝', phonetic: '/drɪŋk/', themeId: 'actions', imageUrl: '/images/actions/drink.png', example: 'I drink water.' },
 { id: 'talk', english: 'talk', chinese: '说话', phonetic: '/tɔːk/', themeId: 'actions', imageUrl: '/images/actions/talk.png', example: 'I talk to my mom.' },
 { id: 'listen', english: 'listen', chinese: '听', phonetic: '/ˈlɪs.ən/', themeId: 'actions', imageUrl: '/images/actions/listen.png', example: 'I listen to music.' },
 { id: 'watch', english: 'watch', chinese: '看', phonetic: '/wɑːtʃ/', themeId: 'actions', imageUrl: '/images/actions/watch.png', example: 'I watch TV.' },
 { id: 'smile', english: 'smile', chinese: '微笑', phonetic: '/smaɪl/', themeId: 'actions', imageUrl: '/images/actions/smile.png', example: 'I smile when I am happy.' },
 { id: 'laugh', english: 'laugh', chinese: '笑', phonetic: '/læf/', themeId: 'actions', imageUrl: '/images/actions/laugh.png', example: 'I laugh at jokes.' },
 { id: 'cry', english: 'cry', chinese: '哭', phonetic: '/kraɪ/', themeId: 'actions', imageUrl: '/images/actions/cry.png', example: 'I cry when I am sad.' },
 { id: 'hug', english: 'hug', chinese: '拥抱', phonetic: '/hʌɡ/', themeId: 'actions', imageUrl: '/images/actions/hug.png', example: 'I hug my family.' },
 { id: 'wave', english: 'wave', chinese: '挥手', phonetic: '/weɪv/', themeId: 'actions', imageUrl: '/images/actions/wave.png', example: 'I wave goodbye.' },
 { id: 'clap', english: 'clap', chinese: '拍手', phonetic: '/klæp/', themeId: 'actions', imageUrl: '/images/actions/clap.png', example: 'I clap my hands.' },
 { id: 'point', english: 'point', chinese: '指', phonetic: '/pɔɪnt/', themeId: 'actions', imageUrl: '/images/actions/point.png', example: 'I point at the bird.' },
 { id: 'sit', english: 'sit', chinese: '坐', phonetic: '/sɪt/', themeId: 'actions', imageUrl: '/images/actions/sit.png', example: 'I sit on the chair.' },
 { id: 'stand', english: 'stand', chinese: '站', phonetic: '/stænd/', themeId: 'actions', imageUrl: '/images/actions/stand.png', example: 'I stand up straight.' },
 { id: 'climb', english: 'climb', chinese: '爬', phonetic: '/klaɪm/', themeId: 'actions', imageUrl: '/images/actions/climb.png', example: 'I climb the tree.' },
 { id: 'throw', english: 'throw', chinese: '扔', phonetic: '/θroʊ/', themeId: 'actions', imageUrl: '/images/actions/throw.png', example: 'I throw the ball.' },
 { id: 'catch', english: 'catch', chinese: '接', phonetic: '/kætʃ/', themeId: 'actions', imageUrl: '/images/actions/catch.png', example: 'I catch the ball.' },
 { id: 'kick', english: 'kick', chinese: '踢', phonetic: '/kɪk/', themeId: 'actions', imageUrl: '/images/actions/kick.png', example: 'I kick the ball.' },
 { id: 'ride', english: 'ride', chinese: '骑', phonetic: '/raɪd/', themeId: 'actions', imageUrl: '/images/actions/ride.png', example: 'I ride my bike.' },
 { id: 'fly', english: 'fly', chinese: '飞', phonetic: '/flaɪ/', themeId: 'actions', imageUrl: '/images/actions/fly.png', example: 'Birds fly in the sky.' },
 { id: 'drive', english: 'drive', chinese: '开车', phonetic: '/draɪv/', themeId: 'actions', imageUrl: '/images/actions/drive.png', example: 'I drive the car.' },
 { id: 'open', english: 'open', chinese: '打开', phonetic: '/ˈoʊ.pən/', themeId: 'actions', imageUrl: '/images/actions/open.png', example: 'I open the door.' },
 { id: 'close', english: 'close', chinese: '关闭', phonetic: '/kloʊz/', themeId: 'actions', imageUrl: '/images/actions/close.png', example: 'I close the window.' },
 { id: 'push', english: 'push', chinese: '推', phonetic: '/pʊʃ/', themeId: 'actions', imageUrl: '/images/actions/push.png', example: 'I push the cart.' },
 { id: 'pull', english: 'pull', chinese: '拉', phonetic: '/pʊl/', themeId: 'actions', imageUrl: '/images/actions/pull.png', example: 'I pull the rope.' },
 { id: 'lift', english: 'lift', chinese: '举起', phonetic: '/lɪft/', themeId: 'actions', imageUrl: '/images/actions/lift.png', example: 'I lift the box.' },
 { id: 'carry', english: 'carry', chinese: '携带', phonetic: '/ˈkær.i/', themeId: 'actions', imageUrl: '/images/actions/carry.png', example: 'I carry my bag.' },
 { id: 'drop', english: 'drop', chinese: '掉落', phonetic: '/drɑːp/', themeId: 'actions', imageUrl: '/images/actions/drop.png', example: 'I drop the pencil.' },
 { id: 'pick', english: 'pick', chinese: '捡', phonetic: '/pɪk/', themeId: 'actions', imageUrl: '/images/actions/pick.png', example: 'I pick up the toy.' },
 { id: 'hold', english: 'hold', chinese: '握住', phonetic: '/hoʊld/', themeId: 'actions', imageUrl: '/images/actions/hold.png', example: 'I hold the cup.' },
 { id: 'touch', english: 'touch', chinese: '触摸', phonetic: '/tʌtʃ/', themeId: 'actions', imageUrl: '/images/actions/touch.png', example: 'I touch the cat.' },
 { id: 'feel', english: 'feel', chinese: '感觉', phonetic: '/fiːl/', themeId: 'actions', imageUrl: '/images/actions/feel.png', example: 'I feel the soft fur.' },
 { id: 'taste', english: 'taste', chinese: '品尝', phonetic: '/teɪst/', themeId: 'actions', imageUrl: '/images/actions/taste.png', example: 'I taste the soup.' },
 { id: 'smell', english: 'smell', chinese: '闻', phonetic: '/smel/', themeId: 'actions', imageUrl: '/images/actions/smell.png', example: 'I smell the flowers.' },
 { id: 'see', english: 'see', chinese: '看见', phonetic: '/siː/', themeId: 'actions', imageUrl: '/images/actions/see.png', example: 'I see the rainbow.' },
 { id: 'look', english: 'look', chinese: '看', phonetic: '/lʊk/', themeId: 'actions', imageUrl: '/images/actions/look.png', example: 'I look at the picture.' },
 { id: 'think', english: 'think', chinese: '想', phonetic: '/θɪŋk/', themeId: 'actions', imageUrl: '/images/actions/think.png', example: 'I think about my homework.' },
 { id: 'remember', english: 'remember', chinese: '记住', phonetic: '/rɪˈmem.bər/', themeId: 'actions', imageUrl: '/images/actions/remember.png', example: 'I remember my friend.' },
 { id: 'forget', english: 'forget', chinese: '忘记', phonetic: '/fərˈɡet/', themeId: 'actions', imageUrl: '/images/actions/forget.png', example: 'I forget my keys.' },
 { id: 'learn', english: 'learn', chinese: '学习', phonetic: '/lɜːrn/', themeId: 'actions', imageUrl: '/images/actions/learn.png', example: 'I learn new words.' },
 { id: 'teach', english: 'teach', chinese: '教', phonetic: '/tiːtʃ/', themeId: 'actions', imageUrl: '/images/actions/teach.png', example: 'I teach my sister.' },
 { id: 'help', english: 'help', chinese: '帮助', phonetic: '/help/', themeId: 'actions', imageUrl: '/images/actions/help.png', example: 'I help my mom.' },
 { id: 'work', english: 'work', chinese: '工作', phonetic: '/wɜːrk/', themeId: 'actions', imageUrl: '/images/actions/work.png', example: 'I work hard.' },
 { id: 'study', english: 'study', chinese: '学习', phonetic: '/ˈstʌd.i/', themeId: 'actions', imageUrl: '/images/actions/study.png', example: 'I study for the test.' },
 { id: 'practice', english: 'practice', chinese: '练习', phonetic: '/ˈpræk.tɪs/', themeId: 'actions', imageUrl: '/images/actions/practice.png', example: 'I practice piano.' },
 { id: 'try', english: 'try', chinese: '尝试', phonetic: '/traɪ/', themeId: 'actions', imageUrl: '/images/actions/try.png', example: 'I try my best.' },
 { id: 'win', english: 'win', chinese: '赢', phonetic: '/wɪn/', themeId: 'actions', imageUrl: '/images/actions/win.png', example: 'I win the game.' },
 { id: 'lose', english: 'lose', chinese: '输', phonetic: '/luːz/', themeId: 'actions', imageUrl: '/images/actions/lose.png', example: 'I lose the game.' },
 { id: 'start', english: 'start', chinese: '开始', phonetic: '/stɑːrt/', themeId: 'actions', imageUrl: '/images/actions/start.png', example: 'I start my homework.' },
 { id: 'stop', english: 'stop', chinese: '停止', phonetic: '/stɑːp/', themeId: 'actions', imageUrl: '/images/actions/stop.png', example: 'I stop the car.' },
 { id: 'finish', english: 'finish', chinese: '完成', phonetic: '/ˈfɪn.ɪʃ/', themeId: 'actions', imageUrl: '/images/actions/finish.png', example: 'I finish my work.' },
 { id: 'begin', english: 'begin', chinese: '开始', phonetic: '/bɪˈɡɪn/', themeId: 'actions', imageUrl: '/images/actions/begin.png', example: 'I begin to read.' },
 { id: 'end', english: 'end', chinese: '结束', phonetic: '/end/', themeId: 'actions', imageUrl: '/images/actions/end.png', example: 'The story ends.' },
 { id: 'continue', english: 'continue', chinese: '继续', phonetic: '/kənˈtɪn.juː/', themeId: 'actions', imageUrl: '/images/actions/continue.png', example: 'I continue reading.' },
 { id: 'wait', english: 'wait', chinese: '等待', phonetic: '/weɪt/', themeId: 'actions', imageUrl: '/images/actions/wait.png', example: 'I wait for the bus.' },
 { id: 'hurry', english: 'hurry', chinese: '匆忙', phonetic: '/ˈhɜːr.i/', themeId: 'actions', imageUrl: '/images/actions/hurry.png', example: 'I hurry to school.' },
 { id: 'slow', english: 'slow', chinese: '慢', phonetic: '/sloʊ/', themeId: 'actions', imageUrl: '/images/actions/slow.png', example: 'I slow down.' },
 { id: 'fast', english: 'fast', chinese: '快', phonetic: '/fæst/', themeId: 'actions', imageUrl: '/images/actions/fast.png', example: 'I run fast.' },
 { id: 'turn', english: 'turn', chinese: '转', phonetic: '/tɜːrn/', themeId: 'actions', imageUrl: '/images/actions/turn.png', example: 'I turn left.' },
 { id: 'move', english: 'move', chinese: '移动', phonetic: '/muːv/', themeId: 'actions', imageUrl: '/images/actions/move.png', example: 'I move the chair.' },
 { id: 'stay', english: 'stay', chinese: '停留', phonetic: '/steɪ/', themeId: 'actions', imageUrl: '/images/actions/stay.png', example: 'I stay home.' },
 { id: 'leave', english: 'leave', chinese: '离开', phonetic: '/liːv/', themeId: 'actions', imageUrl: '/images/actions/leave.png', example: 'I leave the house.' },
 { id: 'arrive', english: 'arrive', chinese: '到达', phonetic: '/əˈraɪv/', themeId: 'actions', imageUrl: '/images/actions/arrive.png', example: 'I arrive at school.' },
 { id: 'return', english: 'return', chinese: '返回', phonetic: '/rɪˈtɜːrn/', themeId: 'actions', imageUrl: '/images/actions/return.png', example: 'I return home.' },
 { id: 'visit', english: 'visit', chinese: '访问', phonetic: '/ˈvɪz.ɪt/', themeId: 'actions', imageUrl: '/images/actions/visit.png', example: 'I visit my grandma.' },
 { id: 'meet', english: 'meet', chinese: '遇见', phonetic: '/miːt/', themeId: 'actions', imageUrl: '/images/actions/meet.png', example: 'I meet my friend.' },
 { id: 'greet', english: 'greet', chinese: '问候', phonetic: '/ɡriːt/', themeId: 'actions', imageUrl: '/images/actions/greet.png', example: 'I greet my teacher.' },
 { id: 'say', english: 'say', chinese: '说', phonetic: '/seɪ/', themeId: 'actions', imageUrl: '/images/actions/say.png', example: 'I say hello.' },
 { id: 'tell', english: 'tell', chinese: '告诉', phonetic: '/tel/', themeId: 'actions', imageUrl: '/images/actions/tell.png', example: 'I tell a story.' },
 { id: 'ask', english: 'ask', chinese: '问', phonetic: '/æsk/', themeId: 'actions', imageUrl: '/images/actions/ask.png', example: 'I ask a question.' },
 { id: 'answer', english: 'answer', chinese: '回答', phonetic: '/ˈæn.sər/', themeId: 'actions', imageUrl: '/images/actions/answer.png', example: 'I answer the question.' },
 { id: 'call', english: 'call', chinese: '叫', phonetic: '/kɔːl/', themeId: 'actions', imageUrl: '/images/actions/call.png', example: 'I call my mom.' },
 { id: 'phone', english: 'phone', chinese: '打电话', phonetic: '/foʊn/', themeId: 'actions', imageUrl: '/images/actions/phone.png', example: 'I phone my friend.' },
 { id: 'text', english: 'text', chinese: '发短信', phonetic: '/tekst/', themeId: 'actions', imageUrl: '/images/actions/text.png', example: 'I text my friend.' },
 { id: 'email', english: 'email', chinese: '发邮件', phonetic: '/ˈiː.meɪl/', themeId: 'actions', imageUrl: '/images/actions/email.png', example: 'I email my teacher.' },
 { id: 'send', english: 'send', chinese: '发送', phonetic: '/send/', themeId: 'actions', imageUrl: '/images/actions/send.png', example: 'I send a message.' },
 { id: 'receive', english: 'receive', chinese: '接收', phonetic: '/rɪˈsiːv/', themeId: 'actions', imageUrl: '/images/actions/receive.png', example: 'I receive a gift.' },
 { id: 'give', english: 'give', chinese: '给', phonetic: '/ɡɪv/', themeId: 'actions', imageUrl: '/images/actions/give.png', example: 'I give a present.' },
 { id: 'take', english: 'take', chinese: '拿', phonetic: '/teɪk/', themeId: 'actions', imageUrl: '/images/actions/take.png', example: 'I take my book.' },
 { id: 'get', english: 'get', chinese: '得到', phonetic: '/ɡet/', themeId: 'actions', imageUrl: '/images/actions/get.png', example: 'I get a prize.' },
 { id: 'buy', english: 'buy', chinese: '买', phonetic: '/baɪ/', themeId: 'actions', imageUrl: '/images/actions/buy.png', example: 'I buy a toy.' },
 { id: 'sell', english: 'sell', chinese: '卖', phonetic: '/sel/', themeId: 'actions', imageUrl: '/images/actions/sell.png', example: 'I sell my old bike.' },
 { id: 'pay', english: 'pay', chinese: '付钱', phonetic: '/peɪ/', themeId: 'actions', imageUrl: '/images/actions/pay.png', example: 'I pay for lunch.' },
 { id: 'cost', english: 'cost', chinese: '花费', phonetic: '/kɔːst/', themeId: 'actions', imageUrl: '/images/actions/cost.png', example: 'The toy costs ten dollars.' },
 { id: 'save', english: 'save', chinese: '节省', phonetic: '/seɪv/', themeId: 'actions', imageUrl: '/images/actions/save.png', example: 'I save money.' },
 { id: 'spend', english: 'spend', chinese: '花费', phonetic: '/spend/', themeId: 'actions', imageUrl: '/images/actions/spend.png', example: 'I spend time reading.' },
 { id: 'earn', english: 'earn', chinese: '赚取', phonetic: '/ɜːrn/', themeId: 'actions', imageUrl: '/images/actions/earn.png', example: 'I earn money.' },
 { id: 'borrow', english: 'borrow', chinese: '借', phonetic: '/ˈbɑːr.oʊ/', themeId: 'actions', imageUrl: '/images/actions/borrow.png', example: 'I borrow a book.' },
 { id: 'lend', english: 'lend', chinese: '借出', phonetic: '/lend/', themeId: 'actions', imageUrl: '/images/actions/lend.png', example: 'I lend my pencil.' },
 { id: 'return', english: 'return', chinese: '归还', phonetic: '/rɪˈtɜːrn/', themeId: 'actions', imageUrl: '/images/actions/return.png', example: 'I return the book.' },
 { id: 'keep', english: 'keep', chinese: '保持', phonetic: '/kiːp/', themeId: 'actions', imageUrl: '/images/actions/keep.png', example: 'I keep my room clean.' },
 { id: 'lose', english: 'lose', chinese: '丢失', phonetic: '/luːz/', themeId: 'actions', imageUrl: '/images/actions/lose.png', example: 'I lose my keys.' },
 { id: 'find', english: 'find', chinese: '找到', phonetic: '/faɪnd/', themeId: 'actions', imageUrl: '/images/actions/find.png', example: 'I find my keys.' },
 { id: 'search', english: 'search', chinese: '搜索', phonetic: '/sɜːrtʃ/', themeId: 'actions', imageUrl: '/images/actions/search.png', example: 'I search for my book.' },
 { id: 'look', english: 'look', chinese: '寻找', phonetic: '/lʊk/', themeId: 'actions', imageUrl: '/images/actions/look.png', example: 'I look for my toy.' },
 { id: 'hide', english: 'hide', chinese: '隐藏', phonetic: '/haɪd/', themeId: 'actions', imageUrl: '/images/actions/hide.png', example: 'I hide behind the tree.' },
 { id: 'show', english: 'show', chinese: '显示', phonetic: '/ʃoʊ/', themeId: 'actions', imageUrl: '/images/actions/show.png', example: 'I show my drawing.' },
 { id: 'share', english: 'share', chinese: '分享', phonetic: '/ʃer/', themeId: 'actions', imageUrl: '/images/actions/share.png', example: 'I share my cookies.' },
 { id: 'choose', english: 'choose', chinese: '选择', phonetic: '/tʃuːz/', themeId: 'actions', imageUrl: '/images/actions/choose.png', example: 'I choose the red one.' },
 { id: 'decide', english: 'decide', chinese: '决定', phonetic: '/dɪˈsaɪd/', themeId: 'actions', imageUrl: '/images/actions/decide.png', example: 'I decide to go home.' },
 { id: 'plan', english: 'plan', chinese: '计划', phonetic: '/plæn/', themeId: 'actions', imageUrl: '/images/actions/plan.png', example: 'I plan my day.' },
 { id: 'prepare', english: 'prepare', chinese: '准备', phonetic: '/prɪˈper/', themeId: 'actions', imageUrl: '/images/actions/prepare.png', example: 'I prepare my lunch.' },
 { id: 'organize', english: 'organize', chinese: '组织', phonetic: '/ˈɔːr.ɡə.naɪz/', themeId: 'actions', imageUrl: '/images/actions/organize.png', example: 'I organize my desk.' },
 { id: 'clean', english: 'clean', chinese: '清洁', phonetic: '/kliːn/', themeId: 'actions', imageUrl: '/images/actions/clean.png', example: 'I clean my room.' },
 { id: 'wash', english: 'wash', chinese: '洗', phonetic: '/wɑːʃ/', themeId: 'actions', imageUrl: '/images/actions/wash.png', example: 'I wash my hands.' },
 { id: 'brush', english: 'brush', chinese: '刷', phonetic: '/brʌʃ/', themeId: 'actions', imageUrl: '/images/actions/brush.png', example: 'I brush my teeth.' },
 { id: 'comb', english: 'comb', chinese: '梳', phonetic: '/koʊm/', themeId: 'actions', imageUrl: '/images/actions/comb.png', example: 'I comb my hair.' },
 { id: 'cut', english: 'cut', chinese: '切', phonetic: '/kʌt/', themeId: 'actions', imageUrl: '/images/actions/cut.png', example: 'I cut the paper.' },
 { id: 'paste', english: 'paste', chinese: '粘贴', phonetic: '/peɪst/', themeId: 'actions', imageUrl: '/images/actions/paste.png', example: 'I paste the picture.' },
 { id: 'glue', english: 'glue', chinese: '胶水', phonetic: '/ɡluː/', themeId: 'actions', imageUrl: '/images/actions/glue.png', example: 'I glue the pieces.' },
 { id: 'tie', english: 'tie', chinese: '系', phonetic: '/taɪ/', themeId: 'actions', imageUrl: '/images/actions/tie.png', example: 'I tie my shoes.' },
 { id: 'untie', english: 'untie', chinese: '解开', phonetic: '/ʌnˈtaɪ/', themeId: 'actions', imageUrl: '/images/actions/untie.png', example: 'I untie my shoes.' },
 { id: 'button', english: 'button', chinese: '扣', phonetic: '/ˈbʌt.ən/', themeId: 'actions', imageUrl: '/images/actions/button.png', example: 'I button my shirt.' },
 { id: 'unbutton', english: 'unbutton', chinese: '解扣', phonetic: '/ʌnˈbʌt.ən/', themeId: 'actions', imageUrl: '/images/actions/unbutton.png', example: 'I unbutton my shirt.' },
 { id: 'zip', english: 'zip', chinese: '拉链', phonetic: '/zɪp/', themeId: 'actions', imageUrl: '/images/actions/zip.png', example: 'I zip my jacket.' },
 { id: 'unzip', english: 'unzip', chinese: '拉开', phonetic: '/ʌnˈzɪp/', themeId: 'actions', imageUrl: '/images/actions/unzip.png', example: 'I unzip my jacket.' },
 { id: 'snap', english: 'snap', chinese: '按扣', phonetic: '/snæp/', themeId: 'actions', imageUrl: '/images/actions/snap.png', example: 'I snap my fingers.' },
 { id: 'click', english: 'click', chinese: '点击', phonetic: '/klɪk/', themeId: 'actions', imageUrl: '/images/actions/click.png', example: 'I click the button.' },
 { id: 'press', english: 'press', chinese: '按', phonetic: '/pres/', themeId: 'actions', imageUrl: '/images/actions/press.png', example: 'I press the doorbell.' },
 { id: 'squeeze', english: 'squeeze', chinese: '挤压', phonetic: '/skwiːz/', themeId: 'actions', imageUrl: '/images/actions/squeeze.png', example: 'I squeeze the lemon.' },
 { id: 'pinch', english: 'pinch', chinese: '捏', phonetic: '/pɪntʃ/', themeId: 'actions', imageUrl: '/images/actions/pinch.png', example: 'I pinch my nose.' },
 { id: 'scratch', english: 'scratch', chinese: '抓', phonetic: '/skrætʃ/', themeId: 'actions', imageUrl: '/images/actions/scratch.png', example: 'I scratch my head.' },
 { id: 'rub', english: 'rub', chinese: '摩擦', phonetic: '/rʌb/', themeId: 'actions', imageUrl: '/images/actions/rub.png', example: 'I rub my eyes.' },
 { id: 'pat', english: 'pat', chinese: '拍', phonetic: '/pæt/', themeId: 'actions', imageUrl: '/images/actions/pat.png', example: 'I pat the dog.' },
    // 情绪表达 (emotions)
    { id: 'happy', english: 'happy', chinese: '开心', phonetic: '/ˈhæp.i/', themeId: 'emotions', imageUrl: '/images/emotions/happy.png', example: 'I am happy when I play.' },
    { id: 'sad', english: 'sad', chinese: '伤心', phonetic: '/sæd/', themeId: 'emotions', imageUrl: '/images/emotions/sad.png', example: 'I feel sad when I cry.' },
    { id: 'angry', english: 'angry', chinese: '生气', phonetic: '/ˈæŋ.ɡri/', themeId: 'emotions', imageUrl: '/images/emotions/angry.png', example: 'I get angry when I am mad.' },
    { id: 'tired', english: 'tired', chinese: '疲倦', phonetic: '/ˈtaɪərd/', themeId: 'emotions', imageUrl: '/images/emotions/tired.png', example: 'I am tired after playing.' },
    { id: 'excited', english: 'excited', chinese: '兴奋', phonetic: '/ɪkˈsaɪ.tɪd/', themeId: 'emotions', imageUrl: '/images/emotions/excited.png', example: 'I am excited about my birthday.' },
    { id: 'scared', english: 'scared', chinese: '害怕', phonetic: '/skerd/', themeId: 'emotions', imageUrl: '/images/emotions/scared.png', example: 'I am scared of the dark.' },
    { id: 'surprised', english: 'surprised', chinese: '惊讶', phonetic: '/sərˈpraɪzd/', themeId: 'emotions', imageUrl: '/images/emotions/surprised.png', example: 'I am surprised by the gift.' },
    { id: 'worried', english: 'worried', chinese: '担心', phonetic: '/ˈwɜːr.id/', themeId: 'emotions', imageUrl: '/images/emotions/worried.png', example: 'I am worried about my test.' },
    { id: 'proud', english: 'proud', chinese: '骄傲', phonetic: '/praʊd/', themeId: 'emotions', imageUrl: '/images/emotions/proud.png', example: 'I am proud of my drawing.' },
    { id: 'shy', english: 'shy', chinese: '害羞', phonetic: '/ʃaɪ/', themeId: 'emotions', imageUrl: '/images/emotions/shy.png', example: 'I feel shy around new people.' },
    { id: 'confused', english: 'confused', chinese: '困惑', phonetic: '/kənˈfjuːzd/', themeId: 'emotions', imageUrl: '/images/emotions/confused.png', example: 'I am confused by the puzzle.' },
    { id: 'calm', english: 'calm', chinese: '平静', phonetic: '/kɑːm/', themeId: 'emotions', imageUrl: '/images/emotions/calm.png', example: 'I feel calm when I rest.' },
    { id: 'nervous', english: 'nervous', chinese: '紧张', phonetic: '/ˈnɜːr.vəs/', themeId: 'emotions', imageUrl: '/images/emotions/nervous.png', example: 'I am nervous before the show.' },
    { id: 'jealous', english: 'jealous', chinese: '嫉妒', phonetic: '/ˈdʒel.əs/', themeId: 'emotions', imageUrl: '/images/emotions/jealous.png', example: 'I feel jealous of my friend\'s toy.' },
    { id: 'lonely', english: 'lonely', chinese: '孤独', phonetic: '/ˈloʊn.li/', themeId: 'emotions', imageUrl: '/images/emotions/lonely.png', example: 'I feel lonely when I am alone.' },
    { id: 'brave', english: 'brave', chinese: '勇敢', phonetic: '/breɪv/', themeId: 'emotions', imageUrl: '/images/emotions/brave.png', example: 'I am brave when I try new things.' },
    { id: 'embarrassed', english: 'embarrassed', chinese: '尴尬', phonetic: '/ɪmˈber.əst/', themeId: 'emotions', imageUrl: '/images/emotions/embarrassed.png', example: 'I feel embarrassed when I make a mistake.' },
    { id: 'grateful', english: 'grateful', chinese: '感激', phonetic: '/ˈɡreɪt.fəl/', themeId: 'emotions', imageUrl: '/images/emotions/grateful.png', example: 'I am grateful for my family.' },
    { id: 'disappointed', english: 'disappointed', chinese: '失望', phonetic: '/ˌdɪs.əˈpɔɪn.tɪd/', themeId: 'emotions', imageUrl: '/images/emotions/disappointed.png', example: 'I am disappointed when I lose.' },
    { id: 'relaxed', english: 'relaxed', chinese: '放松', phonetic: '/rɪˈlækst/', themeId: 'emotions', imageUrl: '/images/emotions/relaxed.png', example: 'I feel relaxed on vacation.' }
];

const themeMap = {
    fruits: '水果 (Fruits)',
    animals: '动物 (Animals)',
    colors: '颜色 (Colors)',
    numbers: '数字 (Numbers)',
    family: '家庭 (Family)',
    body: '身体 (Body)',
    food: '食物 (Food)',
    toys: '玩具 (Toys)',
    school: '学校 (School)',
    transportation: '交通工具 (Transportation)',
    weather: '天气 (Weather)',
    clothing: '服装 (Clothing)',
    actions: '动作 (Actions)',
    emotions: '情绪表达 (Emotions)'
};

const data = {};
for (const theme in themeMap) {
    data[themeMap[theme]] = [];
}

vocabulary.forEach(word => {
    if (word && word.themeId && themeMap[word.themeId]) {
        data[themeMap[word.themeId]].push({
            en: word.english,
            cn: word.chinese,
            phonetic: word.phonetic || '',
            example: word.example || '',
            imageUrl: word.imageUrl || ''
        });
    }
});

// --- App State ---
const appState = {
    currentCategory: Object.keys(data)[0],
    currentMode: 'flashcards',
    currentQuestion: null,
    isGameLoading: false
};

// --- DOM Elements ---
const categoryNav = document.getElementById('category-nav');
const flashcardContainer = document.getElementById('flashcard-container');
const gameContainer = document.getElementById('game-container');
const modeFlashcardsBtn = document.getElementById('mode-flashcards');
const modeGameBtn = document.getElementById('mode-game');
const appSubtitle = document.getElementById('app-subtitle');
const gameQuestionWordEl = document.getElementById('game-question-word');
const gameChoicesGridEl = document.getElementById('game-choices-grid');
const menuToggle = document.getElementById('menu-toggle');
const menuBackdrop = document.getElementById('menu-backdrop');


// --- Core Functions ---

function speak(text, rate = 0.9, pitch = 1.2) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.pitch = pitch;
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Browser does not support Speech Synthesis.');
    }
}

function speakWordAndExample(word, example) {
    // 先阅读单词
    speak(word, 0.8, 1.2);
    
    // 延迟一秒后阅读例句
    setTimeout(() => {
        speak(example, 0.7, 1.0);
    }, 1000);
}


// --- UI Rendering & Progressive Loading ---

function displayFlashcardsProgressively(category) {
    const words = data[category];
    flashcardContainer.innerHTML = '';

    words.forEach(item => {
        const card = document.createElement('div');
        const cardId = `card-${category.replace(/[^a-zA-Z0-9]/g, '')}-${item.en.replace(/[^a-zA-Z0-9]/g, '')}`;
        card.id = cardId;
        card.className = 'flashcard flex flex-col items-center justify-start rounded-2xl shadow-lg p-3 bg-white text-center';

        const imageContent = `<img src="${item.imageUrl}" alt="${item.en}" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                              <div class="flex items-center justify-center w-full h-full text-6xl bg-gray-100 rounded-lg" style="display:none;">📷</div>`;

        card.innerHTML = `
            <div class="image-container">${imageContent}</div>
            <div class="flex flex-col flex-grow justify-between">
                <div>
                    <p class="text-lg font-bold text-gray-800">${item.en}</p>
                    <p class="text-sm text-gray-500">${item.phonetic}</p>
                    <p class="text-md font-semibold text-sky-600 mt-1">${item.cn}</p>
                </div>
                <p class="text-xs text-gray-400 mt-2 italic text-center w-full">"${item.example}"</p>
            </div>
        `;

        card.addEventListener('click', () => speakWordAndExample(item.en, item.example));
        flashcardContainer.appendChild(card);
    });

}

function renderGameChoices(choices) {
    gameChoicesGridEl.innerHTML = '';
    choices.forEach(item => {
        const card = document.createElement('div');
        card.className = 'game-choice-card aspect-square rounded-2xl shadow-lg p-2 flex items-center justify-center';

        const imageContent = `<img src="${item.imageUrl}" alt="${item.en}" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                              <div class="flex items-center justify-center w-full h-full text-6xl bg-gray-100 rounded-lg" style="display:none;">📷</div>`;
        card.innerHTML = imageContent;

        card.addEventListener('click', () => handleChoiceClick(item, card));
        gameChoicesGridEl.appendChild(card);
    });
}

// --- Game Logic ---

function generateQuestion() {
    const words = [...data[appState.currentCategory]];
    if (words.length < 4) {
        gameChoicesGridEl.innerHTML = '<p class="text-center col-span-full text-gray-500 p-8">这个类别单词太少，无法开始游戏哦！</p>';
        gameQuestionWordEl.textContent = '';
        return;
    }

    for (let i = words.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [words[i], words[j]] = [words[j], words[i]]; }
    const choices = words.slice(0, 4);
    appState.currentQuestion = choices[Math.floor(Math.random() * 4)];

    gameQuestionWordEl.textContent = appState.currentQuestion.en;
    speak(appState.currentQuestion.en, 0.8, 1);

    renderGameChoices(choices);
}

function handleChoiceClick(selectedItem, cardElement) {
    if (appState.isGameLoading) return;
    const isCorrect = selectedItem.en === appState.currentQuestion.en;
    gameChoicesGridEl.style.pointerEvents = 'none';
    cardElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
        // 先读单词和例句，然后读"Great!"
        speakWordAndExample(selectedItem.en, selectedItem.example);
        setTimeout(() => {
            speak('Great!', 1.2, 1.3);
        }, 2500); // 等待单词和例句读完
        setTimeout(() => {
            generateQuestion();
            gameChoicesGridEl.style.pointerEvents = 'auto';
        }, 4000); // 总等待时间
    } else {
        speak('Try again!', 1.2, 1);
        setTimeout(() => {
            cardElement.classList.remove('incorrect');
            gameChoicesGridEl.style.pointerEvents = 'auto';
        }, 1200);
    }
}

// --- Mode & Category & Menu Management ---

function updateActiveUI() {
    modeFlashcardsBtn.classList.toggle('active', appState.currentMode === 'flashcards');
    modeGameBtn.classList.toggle('active', appState.currentMode === 'game');
    document.querySelectorAll('#category-nav .category-button').forEach(button => {
        button.classList.toggle('active-category', button.textContent.trim() === appState.currentCategory);
    });
    appSubtitle.textContent = appState.currentMode === 'flashcards' 
        ? '点击卡片学习单词吧！'
        : '听声音，选择正确的图片！';
}

async function setMode(mode) {
    appState.currentMode = mode;
    flashcardContainer.classList.toggle('hidden', mode !== 'flashcards');
    gameContainer.classList.toggle('hidden', mode !== 'game');
    await selectCategory(appState.currentCategory);
}

async function selectCategory(category) {
    appState.currentCategory = category;
    updateActiveUI();

    if (appState.currentMode === 'flashcards') {
        displayFlashcardsProgressively(category);
    } else {
        generateQuestion();
    }

    if (window.innerWidth < 768) {
        toggleMenu();
    }
}

function toggleMenu() {
    categoryNav.classList.toggle('-translate-x-full');
    menuBackdrop.classList.toggle('hidden');
}

// --- Initialization ---
function init() {

    const categories = Object.keys(data);
    categoryNav.innerHTML = '<h2 class="px-2 text-2xl font-bold text-sky-600 mb-4">主题分类</h2>';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'category-button w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 rounded-lg transition-colors';
        button.addEventListener('click', () => selectCategory(category));
        categoryNav.appendChild(button);
    });

    modeFlashcardsBtn.addEventListener('click', () => setMode('flashcards'));
    modeGameBtn.addEventListener('click', () => setMode('game'));
    
    menuToggle.addEventListener('click', toggleMenu);
    menuBackdrop.addEventListener('click', toggleMenu);

    gameQuestionWordEl.addEventListener('click', () => { 
        if(appState.currentQuestion) speak(appState.currentQuestion.en, 0.8, 1); 
    });
    
    setMode('flashcards');
}

window.onload = init;


